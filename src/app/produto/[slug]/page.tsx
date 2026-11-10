import {products,findProduct} from '@/lib/catalog';
import {ProductPage} from '@/components/pages';
import {notFound} from 'next/navigation';
export function generateStaticParams(){return products.map(p=>({slug:p.slug}))}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;return {title:`${findProduct(slug)?.name||'Produto'} | Gráfica 011`}}
export default async function Page({params}:{params:Promise<{slug:string}>}){const {slug}=await params;if(!findProduct(slug))notFound();return <ProductPage slug={slug}/>}
