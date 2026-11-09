import Link from 'next/link';
import { imageUrl } from '@/data/products';
export default function ProductCard({product}){return <Link href={`/products/${product.slug}`} className="product-card">
 <div className="product-image"><img src={imageUrl(product)} alt={product.name+' product packaging'} loading="lazy" onError={undefined}/></div>
 <div className="product-copy"><span className="eyebrow muted">{product.category}</span><h3>{product.name}</h3><div className="card-meta"><span>{product.size}</span><span aria-hidden="true">↗</span></div></div>
 </Link>}
