'use client';

import {Suspense, useEffect, useState} from 'react';
import Script from 'next/script';
import {useSearchParams} from 'next/navigation';
import {products} from '@/data/products';
import styles from '../premium-pages.module.css';

const liveInquiryEnabled = process.env.NEXT_PUBLIC_INQUIRY_FORM_ENABLED === 'true' &&
  Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY);
const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '';

function ContactForm() {
  const params = useSearchParams();
  const incomingProduct = params.get('product') || '';
  const [form, setForm] = useState({name:'',company:'',email:'',country:'',product:incomingProduct,message:''});
  const [notice, setNotice] = useState('');
  const [state, setState] = useState('idle');

  useEffect(() => {
    setForm(previous => ({...previous, product:incomingProduct}));
  }, [incomingProduct]);

  function change(event) {
    setForm(previous => ({...previous,[event.target.name]:event.target.value}));
    if (notice) setNotice('');
  }

  function createMailto() {
    const subject = 'NIMO Business Inquiry — ' + form.company;
    const body = [
      'Full name: ' + form.name,
      'Company: ' + form.company,
      'Email: ' + form.email,
      'Country / market: ' + form.country,
      'Product interest: ' + (form.product || 'General inquiry'),
      '',
      'Requirements:',
      form.message,
    ].join('\n');
    return 'mailto:maakfood22@gmail.com?subject=' +
      encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
  }

  async function submit(event) {
    event.preventDefault();
    if (!liveInquiryEnabled) {
      setNotice('Your email application should open with a prepared inquiry. Please press Send there to finish. Nothing has been submitted by the website.');
      window.location.href = createMailto();
      return;
    }

    const formData = new FormData(event.currentTarget);
    const turnstileToken = String(formData.get('cf-turnstile-response') || '');
    if (!turnstileToken) {
      setNotice('Please complete the security check before sending.');
      setState('error');
      return;
    }

    setState('sending');
    setNotice('');
    try {
      const response = await fetch('/api/inquiry', {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({...form, website:String(formData.get('website') || ''),turnstileToken}),
      });
      const result = await response.json();
      if (!response.ok || result.ok !== true) throw new Error(result.error || 'Unable to send right now.');

      setForm({name:'',company:'',email:'',country:'',product:'',message:''});
      setState('sent');
      setNotice('Thank you. Your inquiry has been submitted to our business email.');
      if (window.turnstile) window.turnstile.reset();
    } catch (error) {
      setState('error');
      setNotice(error.message || 'Unable to send. Please email our team directly.');
      if (window.turnstile) window.turnstile.reset();
    }
  }

  return <form className={styles.formCard} onSubmit={submit}>
    <h2 className={styles.formTitle}>Tell us about your business.</h2>
    <p className={styles.formIntro}>Introduce your market and requirements. We'll help you start the right conversation.</p>

    <div className={styles.formGrid}>
      <label className={styles.field}>Full name *<input required autoComplete="name" name="name" value={form.name} onChange={change} placeholder="Your full name" maxLength={100}/></label>
      <label className={styles.field}>Company name *<input required autoComplete="organization" name="company" value={form.company} onChange={change} placeholder="Your business or organization" maxLength={130}/></label>
      <label className={styles.field}>Business email *<input required type="email" autoComplete="email" name="email" value={form.email} onChange={change} placeholder="name@company.com" maxLength={180}/></label>
      <label className={styles.field}>Country / market *<input required autoComplete="country-name" name="country" value={form.country} onChange={change} placeholder="Your country" maxLength={100}/></label>
    </div>

    <label className={styles.field}>Product of interest
      <select name="product" value={form.product} onChange={change}>
        <option value="">General business inquiry</option>
        {products.map(product => <option key={product.slug} value={product.name}>{product.name}</option>)}
      </select>
    </label>
    <label className={styles.field}>Tell us about your requirements *
      <textarea required rows={5} name="message" value={form.message} onChange={change} placeholder="Your products of interest, market, estimated volumes, or questions" minLength={10} maxLength={2200}/>
    </label>

    <div className={styles.honeypot} aria-hidden="true"><label>Website<input tabIndex={-1} autoComplete="off" name="website"/></label></div>
    {liveInquiryEnabled && <>
      <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="afterInteractive"/>
      <div className={styles.securityCheck}><div className="cf-turnstile" data-sitekey={turnstileSiteKey}/></div>
    </>}
    <button disabled={state === 'sending'} type="submit" className={styles.formSubmit}>
      {state === 'sending' ? 'Sending your inquiry…' : liveInquiryEnabled ? 'Send business inquiry' : 'Prepare email inquiry'}
      <span aria-hidden="true">↗</span>
    </button>
    <p className={styles.formNote}>
      {liveInquiryEnabled
        ? 'Your information is used to respond to this business inquiry. Please review our privacy notice.'
        : 'Online submission is being configured. For now, this button opens your email application; you must press Send there to contact us.'}
      {' '}<a href="/privacy">Privacy notice</a>
    </p>
    {notice && <p className={styles.formNotice} role={state === 'error' ? 'alert' : 'status'}>{notice}</p>}
  </form>;
}

export default function Contact() {
  return <div className={styles.shell}>
    <section className={styles.hero + ' ' + styles.contactHero}>
      <div className={'container ' + styles.heroGrid}>
        <div>
          <p className={styles.kicker}>Get in touch · MAAK FOOD &amp; NIMO</p>
          <h1 className={styles.title}>Great partnerships<br/><em>start here.</em></h1>
          <p className={styles.lead}>Looking for NIMO products for your country or business? Tell us what you need, and let's begin the conversation.</p>
        </div>
        <div className={styles.panel}>
          <p className={styles.panelEyebrow}>Business enquiries welcome</p>
          <h2 className={styles.panelTitle}>Let's connect<br/>across markets.</h2>
          <p className={styles.panelCaption}>Import · Wholesale · Distribution</p>
        </div>
      </div>
    </section>

    <section className={styles.contactSection}>
      <div className={'container ' + styles.contactLayout}>
        <div>
          <p className={styles.kicker}>Business contact</p>
          <h2 className={styles.sectionTitle}>We'd love to hear<br/><em>from you.</em></h2>
          <p className={styles.prose} style={{marginTop:23}}>Share a few details about your company and market. For product specifications, availability and trade enquiries, contact our team.</p>
          <div className={styles.detailList}>
            <div className={styles.detail}><span>Email</span><a href="mailto:maakfood22@gmail.com">maakfood22@gmail.com</a></div>
            <div className={styles.detail}><span>Based in</span><strong>Bangladesh</strong></div>
            <div className={styles.detail}><span>Enquiries</span><strong>Import · Wholesale · Distribution</strong></div>
          </div>
          <p className={styles.prose} style={{marginTop:31,fontSize:13}}>You can email us directly using the address above if the form cannot send your message.</p>
        </div>
        <Suspense fallback={<div className={styles.formCard}>Loading inquiry form...</div>}><ContactForm/></Suspense>
      </div>
    </section>
  </div>;
}
