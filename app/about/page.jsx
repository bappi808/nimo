import Link from 'next/link';
import styles from '../premium-pages.module.css';

export const metadata = {
  title: 'Our Story',
  description: 'Discover the relationship between MAAK FOOD, a Bangladesh-based FMCG food manufacturer and exporter, and NIMO, its flagship consumer brand.',
};

const values = [
  ['01', 'Rooted in Bangladesh', 'Our story begins with familiar foods and a commitment to serving everyday needs.'],
  ['02', 'Built around products', 'A growing food portfolio designed for discovery across retail and wholesale channels.'],
  ['03', 'Open to new markets', 'We work with importers and distributors to explore commercial opportunities.'],
];

export default function About() {
  return <div className={styles.shell}>
    <section className={styles.hero}>
      <div className={'container ' + styles.heroGrid}>
        <div>
          <p className={styles.kicker}>Our story · MAAK FOOD &amp; NIMO</p>
          <h1 className={styles.title}>Rooted in Bangladesh.<br/><em>Made to be shared.</em></h1>
          <p className={styles.lead}>Meet the people and purpose behind NIMO—everyday foods brought to you by MAAK FOOD, a Bangladesh-based manufacturer and exporter.</p>
          <span className={styles.pill}>Made in Bangladesh</span>
        </div>
        <div className={styles.panel}>
          <p className={styles.panelEyebrow}>Our flagship consumer brand</p>
          <img className={styles.panelLogo} src="/nimo-logo.png" alt="Official NIMO logo" width="270" height="108"/>
          <p className={styles.panelCaption}>A food brand by MAAK FOOD</p>
        </div>
      </div>
    </section>

    <section className={styles.section}>
      <div className={'container ' + styles.split}>
        <div>
          <p className={styles.kicker}>The company behind the brand</p>
          <h2 className={styles.sectionTitle}>Good food brings<br/><em>people together.</em></h2>
          <div className={styles.brandStrip}>
            <div className={styles.brandStripItem}><strong>MAAK FOOD</strong><span>Food manufacturing &amp; export business</span></div>
            <div className={styles.brandStripItem}><strong>NIMO</strong><span>Flagship consumer brand</span></div>
          </div>
        </div>
        <div>
          <p className={styles.prose}>MAAK FOOD brings together food manufacturing, product development and international business coordination. NIMO is the name through which we share familiar food products with households, retailers and trade partners.</p>
          <p className={styles.prose}>From rice products and snacks to pantry essentials, we believe in creating food choices that feel approachable and relevant—while building meaningful connections with new markets.</p>
          <Link className={styles.link} href="/products">Explore the NIMO collection <span aria-hidden="true">↗</span></Link>
        </div>
      </div>
    </section>

    <section className={styles.section + ' ' + styles.sectionLight}>
      <div className="container">
        <div className={styles.sectionIntro}>
          <div><p className={styles.kicker}>What matters to us</p><h2 className={styles.sectionTitle}>Everyday food.<br/><em>Thoughtful relationships.</em></h2></div>
          <p className={styles.lead}>We bring a product-first approach to conversations with consumers and global business partners.</p>
        </div>
        <div className={styles.cards}>
          {values.map(([n, title, description]) => <article key={n} className={styles.card}>
            <span className={styles.cardIndex}>{n} / NIMO</span><h3>{title}</h3><p>{description}</p>
          </article>)}
        </div>
      </div>
    </section>

    <section className={styles.band}>
      <div className={'container ' + styles.bandGrid}>
        <div><p className={styles.kicker}>Let's grow together</p><h2 className={styles.bandTitle}>A shared taste.<br/><em>A wider world.</em></h2></div>
        <div><p className={styles.bandText}>Interested in bringing NIMO products to your market? We welcome conversations with importers, wholesalers and distributors.</p><Link className={styles.bandButton} href="/contact">Start a business inquiry <span aria-hidden="true">↗</span></Link></div>
      </div>
    </section>
  </div>;
}
