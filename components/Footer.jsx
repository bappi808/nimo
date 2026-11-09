import Link from 'next/link';
export default function Footer(){return <footer className="site-footer"><div className="container footer-layout">
 <div><img src="/nimo-logo.png" alt="NIMO official logo" width="132"/><p>Everyday food products from Bangladesh, made for markets around the world.</p><small>NIMO is the flagship consumer brand of MAAK FOOD.</small></div>
 <div><h4>Explore</h4><Link href="/">Home</Link><Link href="/products">Our Products</Link><Link href="/about">About MAAK FOOD</Link><Link href="/export">Export Partnerships</Link></div>
 <div><h4>Talk to us</h4><p>Importers, distributors & wholesale buyers</p><a href="mailto:maakfood22@gmail.com">maakfood22@gmail.com</a><Link href="/contact" className="footer-action">Send an inquiry ↗</Link></div>
 </div><div className="container footer-bottom"><span>© {new Date().getFullYear()} MAAK FOOD. All rights reserved.</span><span>Made in Bangladesh · Connected to the world</span></div></footer>}
