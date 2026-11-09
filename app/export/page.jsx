import Link from 'next/link';
import styles from '../premium-pages.module.css';

export const metadata = {
  title: 'Export Partnerships',
  description: 'Explore NIMO FMCG food products for international wholesale, import and distribution opportunities.',
};

const steps = [
  ['01', 'Explore the collection', 'Discover the NIMO categories that are most relevant to your customers and sales channels.'],
  ['02', 'Tell us your market', 'Share your country, business profile, product interests and estimated requirements.'],
  ['03', 'Review trade details', 'Discuss product specifications, packaging, order volumes and relevant documentation.'],
  ['04', 'Plan the next steps', 'Continue availability, pricing and logistics discussions with the MAAK FOOD team.'],
];

const topics = ['Product specifications', 'Packaging options', 'Order requirements', 'Export documentation', 'Distribution enquiries'];

export default function Export() {
  return <main className={styles.shell}>
    <section className={styles.hero}>
      <div className={'container ' + styles.heroGrid}>
        <div>
          <p className={styles.kicker}>International business · NIMO</p>
          <h1 className={styles.title}>From our portfolio<br/><em>to your market.</em></h1>
          <p className={styles.lead}>Explore new business possibilities with NIMO. We connect international importers, wholesalers and distributors with food products from Bangladesh.</p>
          <Link className={styles.link} href="/products">Explore our products <span aria-hidden="true">↗</span></Link>
        </div>
        <div className={styles.panel}>
          <p className={styles.panelEyebrow}>Global trade conversations</p>
          <h2 className={styles.panelTitle}>Bangladesh<br/><span aria-hidden="true">↗</span><br/>Your market</h2>
          <p className={styles.panelCaption}>Food · Trade · Partnerships</p>
        </div>
      </div>
    </section>

    <section className={styles.section}>
      <div className="container">
        <div className={styles.sectionIntro}>
          <div><p className={styles.kicker}>A straightforward approach</p><h2 className={styles.sectionTitle}>Partnerships begin<br/><em>with a conversation.</em></h2></div>
          <p className={styles.lead}>Whether you're exploring a new brand or a new category, here's how we can start working together.</p>
        </div>
        <div className={styles.steps}>
          {steps.map(([n, title, description]) => <article key={n} className={styles.step}>
            <span className={styles.stepNumber}>{n} / 04</span><h3>{title}</h3><p>{description}</p>
          </article>)}
        </div>
      </div>
    </section>

    <section className={styles.section + ' ' + styles.sectionLight}>
      <div className={'container ' + styles.split}>
        <div>
          <p className={styles.kicker}>For importers &amp; distributors</p>
          <h2 className={styles.sectionTitle}>The details that<br/><em>make business work.</em></h2>
        </div>
        <div>
          <p className={styles.prose}>Good trade relationships start with clear information. Tell us what your business needs, and we can discuss the relevant product and commercial details.</p>
          <div className={styles.tagRow}>{topics.map(t => <span key={t} className={styles.tag}>{t}</span>)}</div>
          <Link href="/contact" className={styles.link}>Discuss your requirements <span aria-hidden="true">↗</span></Link>
        </div>
      </div>
    </section>

    <section className={styles.band}>
      <div className={'container ' + styles.bandGrid}>
        <div><p className={styles.kicker}>Your next opportunity</p><h2 className={styles.bandTitle}>Let's bring NIMO<br/><em>closer to your customers.</em></h2></div>
        <div><p className={styles.bandText}>Introduce your company and target market. Our team can follow up on suitable products and the next commercial steps.</p><Link href="/contact" className={styles.bandButton}>Send a business inquiry <span aria-hidden="true">↗</span></Link></div>
      </div>
    </section>
  </main>;
}
