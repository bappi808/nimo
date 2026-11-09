import Link from 'next/link';

export const metadata = {
  title:'Privacy Notice',
  description:'How NIMO and MAAK FOOD handle contact and business inquiry information.',
};

export default function PrivacyNotice() {
  return <div style={{background:'#f7f3e9',minHeight:'70vh',padding:'85px 0'}}>
    <div className="container" style={{maxWidth:840}}>
      <p style={{letterSpacing:2,fontSize:11,color:'#98332e',fontWeight:800,textTransform:'uppercase'}}>Information &amp; privacy</p>
      <h1 style={{fontFamily:'Georgia,Times New Roman,serif',fontSize:'clamp(43px,5vw,66px)',fontWeight:400,letterSpacing:-1.8,margin:'22px 0 20px'}}>Privacy notice</h1>
      <p style={{lineHeight:1.85,color:'#6f675b',fontSize:16}}>MAAK FOOD operates this NIMO website. If you contact us about products, importing or distribution, we use the information you provide to respond to your inquiry and continue the requested business conversation.</p>
      <div style={{background:'#fff',padding:'32px 33px',margin:'35px 0',lineHeight:1.85,fontSize:14,color:'#4e473f'}}>
        <h2 style={{fontSize:21,marginTop:0}}>Information you share</h2>
        <p>Business inquiries may include your name, company, email address, country, product interest and message. Please do not enter payment card details or other sensitive personal information.</p>
        <h2 style={{fontSize:21}}>How inquiries are processed</h2>
        <p>When direct website submission is enabled, your details are transmitted to our business email using a third-party email delivery service. The inquiry form may also use Cloudflare Turnstile to help prevent automated spam. When online submission is not enabled, the form opens your email application instead, and you decide whether to send your message.</p>
        <h2 style={{fontSize:21}}>Access, retention and requests</h2>
        <p>Authorized members of our business team may access inquiry emails to handle your request. Data may also be processed by the email and security providers involved. Please contact us to ask about an inquiry or request deletion of information, subject to applicable recordkeeping obligations.</p>
        <h2 style={{fontSize:21}}>Contact</h2>
        <p>For privacy-related questions, contact <a href="mailto:maakfood22@gmail.com" style={{color:'#98332e',textDecoration:'underline'}}>maakfood22@gmail.com</a>.</p>
      </div>
      <p style={{fontSize:12,color:'#786f64',lineHeight:1.8}}>This notice describes the current planned inquiry workflow and should be checked by the business owner before the official domain launch. It may be updated as functionality or service providers change.</p>
      <Link href="/contact" style={{display:'inline-block',color:'#98332e',fontWeight:800,marginTop:25}}>← Back to contact</Link>
    </div>
  </div>;
}
