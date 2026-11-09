import Link from 'next/link';

export default function NotFound() {
  return <section style={{background:'#f7f3e9',minHeight:'65vh',display:'flex',alignItems:'center',padding:'70px 0'}}>
    <div className="container" style={{textAlign:'center'}}>
      <p style={{color:'#98332e',fontWeight:900,letterSpacing:2,fontSize:12}}>PAGE NOT FOUND / 404</p>
      <h1 style={{fontFamily:'Georgia,Times New Roman,serif',fontWeight:400,letterSpacing:-2,fontSize:'clamp(44px,6vw,70px)',margin:'15px 0 18px'}}>Let's find your way back.</h1>
      <p style={{color:'#6b645a',fontSize:15,lineHeight:1.8,maxWidth:480,margin:'0 auto 29px'}}>The page may have moved or no longer exists. Explore the NIMO collection or return to the homepage.</p>
      <div style={{display:'flex',justifyContent:'center',gap:18,flexWrap:'wrap'}}>
        <Link className="button button-red" href="/">Back to home ↗</Link>
        <Link href="/products" className="button" style={{background:'#fff',border:'1px solid #e3d8c6',color:'#98332e'}}>Browse products ↗</Link>
      </div>
    </div>
  </section>;
}
