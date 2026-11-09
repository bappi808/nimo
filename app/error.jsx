'use client';

import {useEffect} from 'react';

export default function Error({error, reset}) {
  useEffect(() => {
    console.error('NIMO page error', error?.message || 'Unknown error');
  }, [error]);

  return <section style={{background:'#f7f3e9',minHeight:'60vh',display:'flex',alignItems:'center',padding:'70px 0'}}>
    <div className="container" style={{maxWidth:760,textAlign:'center'}}>
      <p style={{color:'#98332e',letterSpacing:2,fontSize:11,fontWeight:900}}>SOMETHING WENT WRONG</p>
      <h1 style={{fontFamily:'Georgia,Times New Roman,serif',fontWeight:400,fontSize:'clamp(36px,5vw,55px)',lineHeight:1.15}}>We couldn't load this page.</h1>
      <p style={{color:'#6b645a',lineHeight:1.8}}>Please try again. If the problem persists, contact our team at maakfood22@gmail.com.</p>
      <button className="button button-red" type="button" onClick={reset} style={{marginTop:16}}>Try again ↻</button>
    </div>
  </section>;
}
