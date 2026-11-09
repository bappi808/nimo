import Link from 'next/link';
import {notFound} from 'next/navigation';
import {products} from '@/data/products';
import ProductDetailMedia from '@/components/ProductDetailMedia';
import styles from './detail.module.css';

export function generateStaticParams() {
  return products.map(product => ({slug:product.slug}));
}

export async function generateMetadata({params}) {
  const {slug} = await params;
  const product = products.find(item => item.slug === slug);
  return {title:product?.name || 'Product', description:product ? 'Explore ' + product.name + ' from the NIMO collection and inquire about export and distribution details.' : 'NIMO product'};
}

export default async function ProductDetail({params}) {
  const {slug} = await params;
  const product = products.find(item => item.slug === slug);
  if (!product) notFound();

  const related = products.filter(item => item.slug !== product.slug && item.category === product.category).slice(0,3);
  const suggestions = related.length > 0 ? related : products.filter(item => item.slug !== product.slug).slice(0,3);

  return <div className={styles.shell}>
    <div className="container">
      <nav className={styles.breadcrumb} aria-label="Breadcrumb">
        <Link href="/products">Our products</Link><span aria-hidden="true">/</span><span aria-current="page">{product.name}</span>
      </nav>
    </div>
    <section className={styles.hero}>
      <div className={'container ' + styles.layout}>
        <ProductDetailMedia key={product.slug} product={product}/>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>{product.category} · The NIMO collection</p>
          <h1>{product.name}</h1>
          <p className={styles.lead}>Discover this NIMO product for everyday enjoyment, retail, wholesale and international distribution conversations.</p>
          <div className={styles.facts}>
            <div className={styles.fact}><span>Pack size</span><strong>{product.size}</strong></div>
            <div className={styles.fact}><span>Brand</span><strong>NIMO by MAAK FOOD</strong></div>
            <div className={styles.fact}><span>Trade information</span><strong>Available on request</strong></div>
          </div>
          <p className={styles.note}>Ask our team about ingredients, packaging options, shelf life, order requirements and relevant export documentation. Availability and specifications are subject to confirmation.</p>
          <Link href={'/contact?product=' + encodeURIComponent(product.name)} className={styles.cta}>Request export details <span aria-hidden="true">↗</span></Link>
        </div>
      </div>
    </section>
    <section className={styles.more}>
      <div className="container">
        <div className={styles.moreHeader}>
          <div><p className={styles.eyebrow}>Keep exploring</p><h2>More from the NIMO collection.</h2></div>
          <Link href="/products">View all products ↗</Link>
        </div>
        <div className={styles.related}>
          {suggestions.map(item => <Link className={styles.relatedCard} key={item.slug} href={'/products/' + item.slug}>
            <strong>{item.name}</strong><span aria-hidden="true">↗</span>
          </Link>)}
        </div>
      </div>
    </section>
  </div>;
}
