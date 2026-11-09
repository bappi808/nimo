'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
const links=[['/','Home'],['/products','Products'],['/about','Our Story'],['/export','Export'],['/contact','Contact']];
export default function Header(){
 const pathname=usePathname(); const [open,setOpen]=useState(false);
 return <header className="site-header"><div className="header-inner container">
  <Link href="/" className="brand" onClick={()=>setOpen(false)}><img src="/nimo-logo.png" alt="NIMO official logo" width="124" height="53"/><span className="brand-note">A BRAND OF<br/><strong>MAAK FOOD</strong></span></Link>
  <nav className={open?'main-nav nav-open':'main-nav'} aria-label="Main navigation">{links.map(([href,label])=><Link onClick={()=>setOpen(false)} className={pathname===href||href!=='/'&&pathname.startsWith(href+'/')?'active':''} key={href} href={href}>{label}</Link>)}<Link href="/contact" className="button button-red nav-inquiry" onClick={()=>setOpen(false)}>Business Inquiry <span aria-hidden>↗</span></Link></nav>
  <button className="menu-toggle" aria-label="Toggle menu" aria-expanded={open} onClick={()=>setOpen(!open)}>{open?'✕':'☰'}</button>
 </div></header>
}
