import styles from "./layout.module.css";
import Head from "next/head";

import { Nav } from ".";

export const siteTitle = "Ridge Charts and Graphs";
const description = "Codename DANIOOOOO";

// pick random emoji as favicon
const sample = (arr) => arr[Math.floor(Math.random() * arr.length)];
const EMOJI_OF_BUILD = ["🐕", "👨‍🚀", "👨‍💻", "🖼", "🚀"];

const Layout = ({ children, showNav = true }) => {
  return (
    <>
      <div className={styles.container}>
        <Head>
          <link
            rel="icon"
            href={`data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>${sample(
              EMOJI_OF_BUILD
            )}</text></svg>`}
          />
          <title>{siteTitle}</title>
          <meta name="description" content={description} />
          <meta property="og:type" content="website" />
          <meta name="og:title" content={siteTitle} />
          <meta name="og:description" content={description} />
        </Head>
        {showNav && (
          <header>
            <Nav />
          </header>
        )}
        <main>{children}</main>
      </div>
      <footer className={styles.footer}>
        Footer content from the 🏔 of Colorado
      </footer>
    </>
  );
};

export default Layout;
