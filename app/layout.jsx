import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
export const metadata={
 title:{default:'NIMO | Food Products from Bangladesh',template:'%s | NIMO'},
 description:'Discover NIMO, the flagship food brand of MAAK FOOD. Explore products and connect with our team for international distribution and wholesale inquiries.',
 icons:{icon:'/nimo-logo.png'},
 metadataBase:new URL('https://www.nimofood.com'),
};
export default function RootLayout({children}){return <html lang="en"><body><Header/><main>{children}</main><Footer/></body></html>}
