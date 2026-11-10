import {notFound} from 'next/navigation';
import {AccountPage,CartPage,CatalogPage,InfoPage,LaserPage} from '@/components/pages';
const routes=['produtos','busca','carrinho','gravacao-a-laser','entrar','cadastro','recuperar-senha','minha-conta','solicitacoes','favoritos','contato','sobre','faq','orientacoes','privacidade','termos'];
export function generateStaticParams(){return routes.map(page=>({page}))}
export default async function Page({params}:{params:Promise<{page:string}>}){const {page}=await params;if(!routes.includes(page))notFound();if(page==='produtos')return <CatalogPage/>;if(page==='busca')return <CatalogPage search/>;if(page==='favoritos')return <CatalogPage favorites/>;if(page==='carrinho')return <CartPage/>;if(page==='gravacao-a-laser')return <LaserPage/>;if(['entrar','cadastro','recuperar-senha','minha-conta','solicitacoes'].includes(page))return <AccountPage mode={page}/>;return <InfoPage mode={page}/>}
