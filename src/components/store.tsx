'use client';
import {createContext,useContext,useEffect,useState,ReactNode} from 'react';
import {CartItem,validateItem} from '@/lib/quote';
type Profile={name:string;email:string;phone?:string;company?:string};
type Request={id:string;date:string;message:string};
type Store={cart:CartItem[];setCart:(v:CartItem[])=>void;favorites:string[];toggleFavorite:(id:string)=>void;profile:Profile|null;setProfile:(p:Profile|null)=>void;requests:Request[];saveRequest:(m:string)=>void;notify:(m:string)=>void;ready:boolean};
const Context=createContext<Store|null>(null);
export function StoreProvider({children}:{children:ReactNode}) {
 const [cart,setCart]=useState<CartItem[]>([]),[favorites,setFavorites]=useState<string[]>([]),[profile,setProfile]=useState<Profile|null>(null),[requests,setRequests]=useState<Request[]>([]),[ready,setReady]=useState(false),[toast,setToast]=useState('');
 useEffect(()=>{try{const data=JSON.parse(localStorage.getItem('grafica011-demo-v1')||'{}');setCart((data.cart||[]).filter(validateItem));setFavorites(data.favorites||[]);setProfile(data.profile||null);setRequests(data.requests||[]);}catch{}setReady(true);},[]);
 useEffect(()=>{if(ready)try{localStorage.setItem('grafica011-demo-v1',JSON.stringify({cart,favorites,profile,requests}));}catch{setToast('O navegador não permitiu salvar os dados. Mantenha esta página aberta.');}},[cart,favorites,profile,requests,ready]);
 useEffect(()=>{if(toast){const timer=setTimeout(()=>setToast(''),4500);return()=>clearTimeout(timer)}},[toast]);
 return <Context.Provider value={{cart,setCart,favorites,toggleFavorite:(id)=>setFavorites(a=>a.includes(id)?a.filter(x=>x!==id):[...a,id]),profile,setProfile,requests,saveRequest:(message)=>{setRequests(a=>[{id:crypto.randomUUID(),date:new Date().toISOString(),message},...a]);setToast('Rascunho salvo neste navegador. Nenhuma mensagem foi enviada.');},notify:setToast,ready}}>{children}{toast&&<div className="toast" role="status">{toast}<button aria-label="Fechar aviso" onClick={()=>setToast('')}>×</button></div>}</Context.Provider>;
}
export function useStore(){const ctx=useContext(Context);if(!ctx)throw Error('Store missing');return ctx;}
