'use client';

import {Suspense, useEffect, useState} from 'react';
import {useSearchParams} from 'next/navigation';
import {products} from '@/data/products';
import styles from '../premium-pages.module.css';

function ContactForm() {
  const params = useSearchParams();
  const incomingProduct = params.get('product') || '';
  const [form, setForm] = useState({name:'', company:'', email:'', country:'', product:incomingProduct, message:''});
  const [notice, setNotice] = useState('');

  useEffect(() => {
    setForm(previous => ({...previous, product:incomingProduct}));
  }, [incomingProduct]);

  function change(event) {
    setForm(previous => ({...previous, [event.target.name]:event.target.value}));
    if (notice) setNotice('');
  }

  function submit(event) {
    event.preventDefault();
    const subject = 'NIMO Business Inquiry — ' + form.company;
    const body = [
      'Full name: ' + form.name,
      'Company: ' + form.company,
      'Email: ' + form.email,
      'Country / market: ' + form.country,
      'Product interest: ' + (form.product || 'General'),
      '',
      'Requirements:',
      form.message
    ].join('\n');
    setNotice('Your email application should open with a prepared message. Please press Send in that application to submit the inquiry. Nothing has been sent by this website.');
    window.location.href = 'mailto:maakfood22@gmail.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
  }

  return <form className={styles.formCard} onSubmit={submit}>
    <h2 className={styles.formTitle}>Tell us about your business.</h2>
    <p className={styles.formIntro}>Introduce your market and requirements. We'll help you start the right conversation.</p>

    <div className={styles.formGrid}>
      <label className={styles.field}>Full name *<input required autoComplete="name" name="name" value={form.name} onChange={change} placeholder="Your full name"/></label>
      <label className={styles.field}>Company name *<input required autoComplete="organization" name="company" value={form.company} onChange={change} placeholder="Your business or organization"/></label>
      <label className={styles.field}>Business email *<input required type="email" autoComplete="email" name="email" value={form.email} onChange={change} placeholder="name@company.com"/></label>
      <label className={styles.field}>Country / market *<input required autoComplete="country-name" name="country" value={form.country} onChange={change} placeholder="Your country"/></label>
    </div>

    <label className={styles.field}>Product of interest
      <select name="product" value={form.product} onChange={change}>
        <option value="">General business inquiry</option>
        {products.map(product => <option key={product.slug} value={product.name}>{product.name}</option>)}
      </select>
    </label>
    <label className={styles.field}>Tell us about your requirements *
      <textarea required rows={5} name="message" value={form.message} onChange={change} placeholder="Your products of interest, market, estimated volumes, or questions"/>
    </label>
    <button type="submit" className={styles.formSubmit}>Prepare email inquiry <span aria-hidden="true">↗</span></button>
    <p className={styles.formNote}>This preview uses your device's email application. It does not store or submit information directly. Review the drafted message and press Send in your email application.</p>
    {notice && <p className={styles.formNotice} role="status">{notice}</p>}
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
          <p className={styles.prose} style={{marginTop:31,fontSize:13}}>You can also email us directly using the address above if the form cannot open your email application.</p>
        </div>
        <Suspense fallback={<div className={styles.formCard}>Loading inquiry form...</div>}><ContactForm/></Suspense>
      </div>
    </section>
  </div>;
}
