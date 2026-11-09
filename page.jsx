import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import {highlights,imageUrl,products} from '@/data/products';
const categories=[['Rice & Rice Products','Rice'],['Snacks','Snacks'],['Pickles & Condiments','Pickles'],['Bakery','Bakery'],['Spices & Seasonings','Spices']];
export default function Home(){return <>
 <section className="hero hero-premium" aria-labelledby="hero-title"><div className="container hero-grid">
  <div className="hero-copy">
   <p className="hero-topline"><span className="hero-topline-dot"/> NIMO · A MAAK FOOD BRAND <span className="hero-topline-rule"/></p>
   <p className="hero-eyebrow">BANGLADESH-MADE FOOD · GLOBAL AMBITION</p>
   <h1 id="hero-title">Made in<br/><strong>Bangladesh.</strong><br/><span>Ready for the world.</span></h1>
   <p className="hero-lead">Discover everyday food favourites created for real shelves, real households and growing international partnerships.</p>
   <div className="hero-actions"><Link href="/products" className="button button-red hero-primary-cta">Explore our products <span aria-hidden="true">↗</span></Link><Link href="/contact" className="button hero-secondary-cta">Partner with NIMO <span aria-hidden="true">↗</span></Link></div>
   <div className="hero-signatures" aria-label="Business focus"><span><i/> Made in Bangladesh</span><span><i/> FMCG portfolio</span><span><i/> Export enquiries</span></div>
  </div>
  <div className="hero-stage" aria-label="Selected authentic NIMO product packaging">
   <div className="hero-visual-card"><div className="hero-light-circle"/><div className="hero-display-surface"/>
    <p className="hero-visual-overline">THE NIMO COLLECTION <span>—</span> SELECTED PRODUCTS</p>
    <img className="hero-feature-pack hero-feature-pack-left" src={imageUrl(products[3])} alt={products[3].name}/>
    <img className="hero-feature-pack hero-feature-pack-center" src={imageUrl(products[7])} alt={products[7].name}/>
    <img className="hero-feature-pack hero-feature-pack-right" src={imageUrl(products[4])} alt={products[4].name}/>
    <img className="hero-feature-pack hero-feature-pack-front" src={imageUrl(products[2])} alt={products[2].name}/>
    <div className="hero-visual-caption"><span>YOUR NEXT SHELF FAVOURITES</span><strong>Explore the NIMO range</strong></div>
   </div>
   <div className="hero-floating-label"><span className="hero-floating-mark">✳</span><span>Made with care.<br/><strong>Made to share.</strong></span></div>
  </div>
 </div><div className="hero-bottom-rule"/></section>
 <section className="trust-strip"><div className="container trust-grid"><div><strong>Bangladesh</strong><span>Manufacturing origin</span></div><div><strong>Multi-category</strong><span>FMCG food portfolio</span></div><div><strong>Buyer focused</strong><span>International coordination</span></div><div><strong>Product-led</strong><span>Export conversations</span></div></div></section>
 <section className="section section-cats"><div className="container"><div className="section-head"><div><p className="eyebrow red">EXPLORE THE COLLECTION</p><h2>Something for <em>every shelf.</em></h2></div><Link href="/products" className="text-link">View all products ↗</Link></div><div className="category-row">{categories.map(([key,label],i)=><Link href={`/products?category=${encodeURIComponent(key)}`} key={key} className="category-pill"><span className="category-num">0{i+1}</span><strong>{label}</strong><span>↗</span></Link>)}</div></div></section>
 <section className="section section-products"><div className="container"><div className="section-head"><div><p className="eyebrow red">POPULAR PICKS</p><h2>Discover the NIMO <em>range.</em></h2><p className="section-desc">Explore our food portfolio. Product specifications and trade details are available on request.</p></div><Link href="/products" className="text-link">Explore full catalogue ↗</Link></div><div className="product-grid">{highlights.map(p=><ProductCard key={p.slug} product={p}/>)}</div></div></section>
 <section className="section story-section"><div className="container story-grid"><div className="story-visual"><div className="story-deco">N</div><img src="/nimo-logo.png" width="238" alt="NIMO logo"/><span>FLAGSHIP CONSUMER BRAND</span></div><div className="story-copy"><p className="eyebrow red">OUR STORY</p><h2>Rooted in Bangladesh.<br/><em>Connected to the world.</em></h2><p>MAAK FOOD brings food manufacturing, processing and export coordination together. NIMO is our consumer-facing brand—sharing familiar, everyday foods with new markets.</p><Link href="/about" className="button button-red">Meet MAAK FOOD ↗</Link></div></div></section>
 <section className="export-banner"><div className="container export-banner-grid"><div><p className="eyebrow">PARTNERSHIPS THAT TRAVEL</p><h2>Let's bring NIMO<br/>to <em>your market.</em></h2></div><div><p>Whether you are an importer, distributor or wholesale buyer, we would love to hear what products your market needs.</p><Link href="/contact" className="button button-yellow">Start a Business Inquiry ↗</Link></div></div></section>
 </>}
