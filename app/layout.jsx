import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const launched = process.env.NEXT_PUBLIC_SITE_LAUNCHED === 'true';
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.nimofood.com';

export const metadata = {
  metadataBase:new URL(siteUrl),
  title:{default:'NIMO | Food Products from Bangladesh',template:'%s | NIMO'},
  description:'NIMO is the flagship food brand of MAAK FOOD in Bangladesh. Discover FMCG food products, export opportunities and wholesale partnerships.',
  icons:{icon:'/nimo-logo.png'},
  robots:{
    index:launched,
    follow:launched,
    googleBot:{index:launched,follow:launched},
  },
  openGraph:{
    type:'website',
    locale:'en_US',
    url:siteUrl,
    title:'NIMO | Food Products from Bangladesh',
    description:'Discover NIMO food products and connect with MAAK FOOD for wholesale and international distribution inquiries.',
    siteName:'NIMO',
    images:[{url:'/nimo-logo.png',alt:'NIMO official logo'}],
  },
  twitter:{card:'summary',title:'NIMO | Food Products from Bangladesh'},
};

export default function RootLayout({children}) {
  return <html lang="en"><body><Header/><main id="main-content">{children}</main><Footer/></body></html>;
}
