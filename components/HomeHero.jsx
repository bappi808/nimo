'use client';

import Link from 'next/link';
import {useState} from 'react';
import {imageUrl, products} from '@/data/products';
import styles from './HomeHero.module.css';

function Arrow() {
  return <svg aria-hidden="true" width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 13 13 3M3 3h10v10" stroke="currentColor" strokeWidth="1.4"/></svg>;
}

const collection = [products[3], products[7], products[4]];

function ShowcaseProduct({product, index}) {
  const [unavailable, setUnavailable] = useState(false);

  return (
    <Link href={`/products/${product.slug}`} className={styles.product}>
      <div className={styles.photograph}>
        {unavailable ? (
          <span className={styles.imageFallback}>Product image unavailable</span>
        ) : (
          <img
            src={imageUrl(product)}
            alt={`${product.name} packaging`}
            width="280"
            height="360"
            fetchPriority={index === 1 ? 'high' : 'auto'}
            ref={image => {
              if (image?.complete && image.naturalWidth === 0) setUnavailable(true);
            }}
            onError={() => setUnavailable(true)}
          />
        )}
      </div>
      <div className={styles.productCaption}>
        <span className={styles.category}>{product.category}</span>
        <span className={styles.productName}>{product.name.replace('NIMO ', '')}</span>
        <span className={styles.productSize}>{product.size} <Arrow/></span>
      </div>
    </Link>
  );
}

export default function HomeHero() {
  return (
    <section className={styles.hero} aria-labelledby="home-hero-title">
      <div className={`container ${styles.layout}`}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>From Bangladesh. For the world.</p>
          <h1 id="home-hero-title">A taste of home.<br/><em>A world of possibility.</em></h1>
          <p className={styles.description}>Familiar flavours. Everyday favourites. Discover NIMO’s food collection, bringing the taste of Bangladesh to your table—and your next market.</p>
          <div className={styles.actions}>
            <Link href="/products" className={styles.primary}>Explore the collection <Arrow/></Link>
            <Link href="/contact" className={styles.secondary}>Become a distributor <span aria-hidden="true">→</span></Link>
          </div>
          <div className={styles.signature}><span aria-hidden="true"/> A food brand by <strong>MAAK FOOD</strong></div>
        </div>

        <div className={styles.showcase} role="group" aria-label="Featured NIMO products">
          <div className={styles.collectionHeading}><span>The NIMO edit</span><span>01 — 03</span></div>
          <div className={styles.products}>
            {collection.map((product, index) => <ShowcaseProduct key={product.slug} product={product} index={index}/>)}
          </div>
          <p className={styles.collectionNote}>Everyday essentials. A collection to discover.</p>
        </div>
      </div>
      <div className={`container ${styles.bottomLine}`}><span>Rooted in Bangladesh</span><span>Made for everyday moments</span><Link href="/export">Explore trade opportunities <Arrow/></Link></div>
    </section>
  );
}
