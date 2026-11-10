-- Foundation only; not deployed. Requires a trusted server to set app.user_id
-- in each transaction after verifying the session. Never expose SQL to browsers.
create schema if not exists grafica;
create function grafica.viewer_id() returns uuid language sql stable as $$
 select nullif(current_setting('app.user_id', true), '')::uuid
$$;
create table grafica.profiles (id uuid primary key, name text not null, email text not null, phone text, company text, created_at timestamptz default now());
create table grafica.categories (id uuid primary key, slug text unique not null, name text not null, visible boolean default false);
create table grafica.products (id uuid primary key, category_id uuid references grafica.categories, slug text unique not null, name text not null, description text, pricing_mode text check(pricing_mode in ('quote','fixed')) default 'quote', base_price numeric(12,2) check(base_price >= 0), visible boolean default false, featured boolean default false, availability text default 'under_review', seo jsonb default '{}');
create table grafica.product_images (id uuid primary key, product_id uuid references grafica.products on delete cascade, url text not null, alt text not null, position integer default 0);
create table grafica.product_options (id uuid primary key, product_id uuid references grafica.products on delete cascade, name text not null, required boolean default true);
create table grafica.product_option_values (id uuid primary key, option_id uuid references grafica.product_options on delete cascade, value text not null, active boolean default false);
create table grafica.product_configurations (id uuid primary key, product_id uuid references grafica.products, allowed_values jsonb not null, active boolean default false);
create table grafica.carts (id uuid primary key, user_id uuid not null references grafica.profiles, updated_at timestamptz default now(), unique(user_id));
create table grafica.cart_items (id uuid primary key, cart_id uuid not null references grafica.carts on delete cascade, product_id uuid not null references grafica.products, quantity integer check(quantity > 0 and quantity <= 1000000), configuration jsonb not null, notes text check(length(notes)<=2000));
create table grafica.favorites (user_id uuid references grafica.profiles on delete cascade, product_id uuid references grafica.products on delete cascade, primary key(user_id,product_id));
create table grafica.quote_requests (id uuid primary key, user_id uuid not null references grafica.profiles, status text not null default 'draft' check(status in ('draft','created','awaiting_service','negotiating','confirmed','completed')), created_at timestamptz default now());
create table grafica.quote_request_items (id uuid primary key, request_id uuid not null references grafica.quote_requests on delete cascade, product_id uuid references grafica.products, product_name_snapshot text not null, quantity integer check(quantity>0), configuration jsonb not null, notes text);
create table grafica.artwork_attachments (id uuid primary key, user_id uuid not null references grafica.profiles, request_id uuid references grafica.quote_requests, private_storage_key text not null, original_name text not null, content_type text not null, size_bytes bigint check(size_bytes>0 and size_bytes<=20971520), verified boolean default false);
create index cart_items_cart_idx on grafica.cart_items(cart_id);
create index quote_requests_user_idx on grafica.quote_requests(user_id);
create index quote_items_request_idx on grafica.quote_request_items(request_id);
create index products_category_idx on grafica.products(category_id);
alter table grafica.profiles enable row level security;
alter table grafica.carts enable row level security;
alter table grafica.cart_items enable row level security;
alter table grafica.favorites enable row level security;
alter table grafica.quote_requests enable row level security;
alter table grafica.quote_request_items enable row level security;
alter table grafica.artwork_attachments enable row level security;
create policy own_profile on grafica.profiles for all using(id=grafica.viewer_id()) with check(id=grafica.viewer_id());
create policy own_cart on grafica.carts for all using(user_id=grafica.viewer_id()) with check(user_id=grafica.viewer_id());
create policy own_items on grafica.cart_items for all using(exists(select 1 from grafica.carts c where c.id=cart_id and c.user_id=grafica.viewer_id())) with check(exists(select 1 from grafica.carts c where c.id=cart_id and c.user_id=grafica.viewer_id()));
create policy own_favorites on grafica.favorites for all using(user_id=grafica.viewer_id()) with check(user_id=grafica.viewer_id());
create policy read_own_requests on grafica.quote_requests for select using(user_id=grafica.viewer_id());
create policy create_own_draft on grafica.quote_requests for insert with check(user_id=grafica.viewer_id() and status='draft');
-- Status changes require an authorized server administrator; no client UPDATE policy.
create policy read_own_request_items on grafica.quote_request_items for select using(exists(select 1 from grafica.quote_requests q where q.id=request_id and q.user_id=grafica.viewer_id()));
create policy insert_own_request_items on grafica.quote_request_items for insert with check(exists(select 1 from grafica.quote_requests q where q.id=request_id and q.user_id=grafica.viewer_id() and q.status='draft'));
create policy own_artwork on grafica.artwork_attachments for select using(user_id=grafica.viewer_id());
-- Catalog writes and verified artwork inserts are server-admin-only. No client grants.
-- Enable catalog RLS; public reads are limited to visible/active records.
alter table grafica.categories enable row level security;
alter table grafica.products enable row level security;
alter table grafica.product_images enable row level security;
alter table grafica.product_options enable row level security;
alter table grafica.product_option_values enable row level security;
alter table grafica.product_configurations enable row level security;
create policy visible_categories on grafica.categories for select using(visible);
create policy visible_products on grafica.products for select using(visible);
create policy visible_images on grafica.product_images for select using(exists(select 1 from grafica.products p where p.id=product_id and p.visible));
create policy visible_options on grafica.product_options for select using(exists(select 1 from grafica.products p where p.id=product_id and p.visible));
create policy visible_values on grafica.product_option_values for select using(active and exists(select 1 from grafica.product_options o join grafica.products p on p.id=o.product_id where o.id=option_id and p.visible));
create policy visible_configurations on grafica.product_configurations for select using(active and exists(select 1 from grafica.products p where p.id=product_id and p.visible));
