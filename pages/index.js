import Link from "next/link";
import styles from "../styles/Home.module.css";

import { LINKS } from "../components/Nav";

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="#">Ridge</a>
        </h1>

        <h2>
          <pre>
            AKA Project{" "}
            <Link href="https://danpowell.dev/">
              <a>Danio!</a>
            </Link>
          </pre>
        </h2>

        <p className={styles.description}>
          This project is currently <em>very</em> in development.
        </p>

        <div className={styles.grid}>
          {LINKS.map((item) => (
            <Link key={item.href} href={item.href}>
              <a className={styles.card}>
                <h3>
                  {item.label}
                  {` →`}
                </h3>
                <p>{item.description}</p>
              </a>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
