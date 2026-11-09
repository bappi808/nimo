'use client';

import {useState} from 'react';
import {imageUrl} from '@/data/products';
import styles from '@/app/products/[slug]/detail.module.css';

export default function ProductDetailMedia({product}) {
  const [failed, setFailed] = useState(false);
  return <div className={styles.photoFrame}>
    {failed ? <div className={styles.fallback} role="img" aria-label={product.name + ' image unavailable'}>
      <strong>NIMO</strong>
      <p>Packaging photograph coming soon</p>
    </div> : <img src={imageUrl(product)} alt={product.name + ' official product packaging'} width="500" height="550" onError={() => setFailed(true)}/>}
    <span className={styles.photoNote}>Official NIMO product collection</span>
  </div>;
}
