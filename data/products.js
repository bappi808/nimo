// Product names and sizes verified from the public nimofood.com catalogue on 2026-11-09.
// Source image URLs temporarily reference the CURRENT nimofood.com website.
// IMPORTANT: Copy the official images into public/products/cutouts BEFORE moving
// nimofood.com to this Vercel project, then set IMAGE_BASE = '' below.
export const IMAGE_BASE = 'https://www.nimofood.com';

export const products = [
  {slug:'mango-pickle', name:'NIMO Mango Pickle', category:'Pickles & Condiments', size:'Ask for pack size', image:'mango-pickle.webp'},
  {slug:'litchi-drinks-285ml',name:'NIMO Litchi Drinks',category:'Beverages',size:'285 ml',image:'litchi-drink-285ml.webp'},
  {slug:'puffed-rice-400g',name:'NIMO Puffed Rice',category:'Rice & Rice Products',size:'400 gm',image:'puffed-rice-400g.webp'},
  {slug:'aromatic-rice-1kg',name:'NIMO Aromatic Rice',category:'Rice & Rice Products',size:'1000 gm',image:'aromatic-rice-1kg.webp'},
  {slug:'chanachur-jar-300g',name:'NIMO Chanachur (Hot) Jar',category:'Snacks',size:'300 gm',image:'chanachur-jar-300g.webp'},
  {slug:'flattened-rice-ball-360g',name:'NIMO Flattened Rice Ball',category:'Snacks',size:'360 gm · 20 pcs jar',image:'flattened-rice-ball-360g.webp'},
  {slug:'puffed-rice-ball-300g',name:'NIMO Puffed Rice Ball',category:'Snacks',size:'300 gm · 20 pcs jar',image:'puffed-rice-ball-300g.webp'},
  {slug:'special-toast-300g',name:'NIMO Special Toast',category:'Bakery',size:'300 gm',image:'special-toast-300g.webp'},
  {slug:'sweet-toast-300g',name:'NIMO Sweet Toast',category:'Bakery',size:'300 gm',image:'sweet-toast-300g.webp'},
  {slug:'chilli-powder-200g',name:'NIMO Chilli Powder Jar',category:'Spices & Seasonings',size:'200 gm',image:'chilli-powder-200g.webp'},
  {slug:'turmeric-powder-200g',name:'NIMO Turmeric Powder Jar',category:'Spices & Seasonings',size:'200 gm',image:'turmeric-powder-200g.webp'},
  {slug:'chilli-flake-200g',name:'NIMO Chilli Flake (Hot)',category:'Spices & Seasonings',size:'200 gm',image:'chilli-flakes-200g.webp'},
  {slug:'bay-leaf-50g',name:'NIMO Bay Leaf',category:'Herbs & Pantry',size:'50 gm',image:'bay-leaves-50g.webp'},
  {slug:'mustard-oil-400ml',name:'NIMO Mustard Oil',category:'Oils',size:'400 ml',image:'mustard-oil-400ml.webp'},
];

export const imageUrl = (product) => `${IMAGE_BASE}/products/cutouts/${product.image}`;
export const categories = ['All Products',...new Set(products.map((product)=>product.category))];
export const highlights = [products[7],products[3],products[0],products[4],products[9],products[2]];
