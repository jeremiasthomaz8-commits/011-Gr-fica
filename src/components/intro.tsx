'use client';
import {useCallback,useEffect,useRef,useState,type ReactNode} from 'react';
const KEY='grafica011-intro-v2';
export function Intro({children}:{children:ReactNode}) {
 const [active,setActive]=useState(true);
 const [leaving,setLeaving]=useState(false);
 const [source,setSource]=useState<string|null>(null);
 const video=useRef<HTMLVideoElement>(null);
 const dismiss=useCallback(()=>{setActive(false);try{sessionStorage.setItem(KEY,'seen')}catch{}},[]);
 const finish=useCallback(()=>setLeaving(true),[]);
 useEffect(()=>{if(!leaving)return;const timer=setTimeout(dismiss,650);return()=>clearTimeout(timer)},[leaving,dismiss]);
 useEffect(()=>{
  let seen=false;try{seen=sessionStorage.getItem(KEY)==='seen'}catch{}
  if(seen||window.matchMedia('(prefers-reduced-motion: reduce)').matches){dismiss();return}
  setSource(window.matchMedia('(max-width: 767px)').matches?'/videos/intro-mobile.mp4':'/videos/intro-desktop-v2.mp4');
  const timeout=setTimeout(finish,12000);
  return()=>clearTimeout(timeout);
 },[finish,dismiss]);
 useEffect(()=>{
  if(!active)return;
  const original=document.body.style.overflow;document.body.style.overflow='hidden';
  const key=(e:KeyboardEvent)=>{if(e.key==='Escape')finish()};window.addEventListener('keydown',key);
  return()=>{document.body.style.overflow=original;window.removeEventListener('keydown',key)};
 },[active,finish]);
 useEffect(()=>{if(source&&active){video.current?.play()?.catch(finish)}},[source,active,finish]);
 return <><div inert={active} aria-hidden={active||undefined}>{children}</div>{active&&<section className={`site-intro${leaving?' site-intro-leaving':''}`} role="dialog" aria-modal="true" aria-label="Animação de abertura da Gráfica 011">{source&&<video ref={video} src={source} autoPlay muted playsInline preload="auto" onEnded={finish} onError={finish} aria-hidden="true"/>}<button className="intro-skip" autoFocus onClick={finish}>Pular intro <span aria-hidden="true">↗</span></button></section>}</>;
}
