import {categories} from '@/lib/catalog';
import {CatalogPage} from '@/components/pages';
import {notFound} from 'next/navigation';
export function generateStaticParams(){return categories.map(c=>({slug:c.slug}))}
export default async function Page({params}:{params:Promise<{slug:string}>}){const {slug}=await params;if(!categories.some(c=>c.slug===slug))notFound();return <CatalogPage category={slug}/>}
