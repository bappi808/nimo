'use client';

import {Suspense, useEffect, useState} from 'react';
import Link from 'next/link';
import {useSearchParams} from 'next/navigation';
import {categories, imageUrl, products} from '@/data/products';
import styles from './catalogue.module.css';

function ProductImage({product}) {
  const [failed, setFailed] = useState(false);
  return (
    <div className={styles.photo}>
      {failed ? (
        <div className={styles.imageFallback} role="img" aria-label={product.name + ' packaging image unavailable'}>
          <span>NIMO</span>
          <small>Packaging photograph coming soon</small>
        </div>
      ) : (
        <img src={imageUrl(product)} alt={product.name + ' official packaging'} loading="lazy"
          onError={() => setFailed(true)}/>
      )}
    </div>
  );
}

function CatalogueCard({product, index}) {
  return (
    <Link href={'/products/' + product.slug} className={styles.card}>
      <ProductImage key={product.slug} product={product}/>
      <div className={styles.cardBody}>
        <div className={styles.cardMeta}><span>{product.category}</span><span>{String(index + 1).padStart(2, '0')}</span></div>
        <h3>{product.name}</h3>
        <div className={styles.cardFooter}><span>{product.size}</span><span aria-hidden="true">↗</span></div>
      </div>
    </Link>
  );
}

function CatalogueContents() {
  const params = useSearchParams();
  const incoming = params.get('category');
  const [filter, setFilter] = useState(categories.includes(incoming) ? incoming : 'All Products');

  useEffect(() => {
    setFilter(categories.includes(incoming) ? incoming : 'All Products');
  }, [incoming]);

  const shown = filter === 'All Products' ? products : products.filter(p => p.category === filter);

  return (
    <>
      <div className={styles.filterHeading}>
        <div>
          <p className={styles.kicker}>Explore by category</p>
          <h2>Find your next <em>favourite.</em></h2>
        </div>
        <p className={styles.count}>{shown.length} {shown.length === 1 ? 'product' : 'products'} in view</p>
      </div>
      <div className={styles.filters} role="group" aria-label="Filter products by category">
        {categories.map(category => (
          <button key={category} type="button" onClick={() => setFilter(category)}
            className={filter === category ? styles.filterActive : styles.filter}
            aria-pressed={filter === category}>{category}</button>
        ))}
      </div>
      <div className={styles.grid}>
        {shown.map((product, index) => <CatalogueCard key={product.slug} product={product} index={index}/>)}
      </div>
      <div className={styles.bottomCta}>
        <div><p className={styles.kicker}>For trade & distribution</p>
          <h2>Looking for the right products<br/>for your market?</h2>
          <p>Talk to our export team about specifications, packaging, and distribution opportunities.</p>
        </div>
        <Link href="/contact" className={styles.cta}>Start a business inquiry <span aria-hidden="true">↗</span></Link>
      </div>
    </>
  );
}

export default function Products() {
  return (
    <>
      <section className={styles.hero}>
        <div className={'container ' + styles.heroContent}>
          <div>
            <p className={styles.kicker}>The NIMO collection <span className={styles.dot}/></p>
            <h1>Good food.<br/><em>Great possibilities.</em></h1>
            <p className={styles.lead}>Everyday favourites from Bangladesh, presented for people who love them and partners who bring them to new markets.</p>
          </div>
          <div className={styles.heroArt} aria-hidden="true">
            <div className={styles.heroArtCircle}/>
            <span className={styles.heroArtLabel}>NIMO / MAAK FOOD</span>
            <strong>Everyday<br/>food stories.</strong>
            <span className={styles.heroArtFooter}>Made in Bangladesh · Shared worldwide</span>
          </div>
        </div>
      </section>
      <section className={styles.catalogue}>
        <div className="container"><Suspense fallback={<p>Loading products...</p>}><CatalogueContents/></Suspense></div>
      </section>
    </>
  );
}
