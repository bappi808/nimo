import {products} from '@/data/products';

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.nimofood.com').replace(/\/+$/, '');

export default function sitemap() {
  const routes = ['', '/products', '/about', '/export', '/contact', '/privacy'];
  return [
    ...routes.map(path => ({
      url:siteUrl + path,
      changeFrequency:path === '/products' ? 'weekly' : 'monthly',
      priority:path === '' ? 1 : path === '/products' ? .9 : .6,
    })),
    ...products.map(product => ({
      url:siteUrl + '/products/' + product.slug,
      changeFrequency:'monthly',
      priority:.7,
    })),
  ];
}
