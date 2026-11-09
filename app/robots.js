const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.nimofood.com';
const launched = process.env.NEXT_PUBLIC_SITE_LAUNCHED === 'true';

export default function robots() {
  return {
    rules: launched ? {userAgent:'*',allow:'/'} : {userAgent:'*',disallow:'/'},
    sitemap: launched ? siteUrl + '/sitemap.xml' : undefined,
  };
}
