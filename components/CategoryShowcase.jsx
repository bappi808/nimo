import Link from 'next/link';
import { products, imageUrl } from '@/data/products';
import styles from './CategoryShowcase.module.css';

const items = [
  ['Pickles & Condiments', 'Pickles', 'mango-pickle', 'Bold, familiar flavours', 'pink'],
  ['Beverages', 'Beverages', 'litchi-drinks-285ml', 'Refreshingly NIMO', 'yellow'],
  ['Rice & Rice Products', 'Rice', 'aromatic-rice-1kg', 'Everyday pantry favourites', 'cream'],
  ['Snacks', 'Snacks', 'chanachur-jar-300g', 'Everyday crunch', 'peach'],
  ['Bakery', 'Bakery', 'special-toast-300g', 'Your tea-time favourite', 'cream'],
  ['Spices & Seasonings', 'Spices', 'turmeric-powder-200g', 'A flavourful touch', 'yellow'],
  ['Herbs & Pantry', 'Herbs', 'bay-leaf-50g', 'Pantry essentials', 'pink'],
  ['Oils', 'Oils', 'mustard-oil-400ml', 'Everyday cooking', 'peach'],
];
const Arrow=()=> <svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18" fill="none"><path d="M5 19 19 5M7 5h12v12" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/></svg>;

export default function CategoryShowcase() {
 return <section className={styles.section} aria-labelledby="collection-heading">
  <div className="container">
   <div className={styles.intro}>
     <div>
       <p className={styles.eyebrow}>EXPLORE THE COLLECTION</p>
       <h2 id="collection-heading">One brand. <em>Many favourites.</em></h2>
       <p className={styles.lead}>From your daily pantry to your favourite snacks, explore the NIMO collection.</p>
     </div>
     <Link className={styles.cta} href="/products">Explore all products <Arrow /></Link>
   </div>
   <div className={styles.grid}>
     {items.map(([category, title, slug, blurb, tone],index) => {
       const product=products.find(p=>p.slug===slug);
       if (!product) return null;
       return <Link href={`/products?category=${encodeURIComponent(category)}`} className={`${styles.card} ${styles[tone]}`} key={category}>
         <div className={styles.cardTop}><span>{String(index+1).padStart(2,'0')}</span><span className={styles.arrow}><Arrow/></span></div>
         <div className={styles.pack}><img src={imageUrl(product)} alt={`${product.name} original packaging`} width="230" height="210" loading="lazy"/></div>
         <div className={styles.copy}><h3>{title}</h3><p>{blurb}</p></div>
       </Link>;
     })}
   </div>
   <div className={styles.foot}><span>Discover more from NIMO</span><Link href="/products">Full catalogue <Arrow/></Link></div>
  </div>
 </section>;
}
