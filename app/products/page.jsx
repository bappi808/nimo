'use client';
import {Suspense,useState} from 'react';
import {useSearchParams} from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import {categories,products} from '@/data/products';
function Catalogue(){const search=useSearchParams();const incoming=search.get('category');const [filter,setFilter]=useState(categories.includes(incoming)?incoming:'All Products');const shown=filter==='All Products'?products:products.filter(p=>p.category===filter);return <>
<div className="filter-list" role="group" aria-label="Product categories">{categories.map(c=><button className={filter===c?'filter active':'filter'} onClick={()=>setFilter(c)} key={c}>{c}</button>)}</div>
<p className="result-count">Showing {shown.length} products</p><div className="product-grid">{shown.map(p=><ProductCard product={p} key={p.slug}/>)}</div>
</>}
export default function Products(){return <><section className="page-intro"><div className="container"><p className="eyebrow red">THE NIMO PORTFOLIO</p><h1>Everyday food.<br/><em>Made to be shared.</em></h1><p>Explore our product categories and request the specifications that matter for your market.</p></div></section><section className="section catalogue-section"><div className="container"><Suspense fallback={<p>Loading product catalogue...</p>}><Catalogue/></Suspense></div></section></>}
