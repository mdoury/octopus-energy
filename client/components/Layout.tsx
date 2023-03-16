import { useCartContext } from "contexts/CartContext";
import Link from "next/link";
import type { PropsWithChildren } from "react";

import styles from "./Layout.module.css";

type Props = PropsWithChildren<{}>;

export default function Layout({ children }: Props) {
  const { total } = useCartContext();
  return (
    <>
      <header className={styles.header}>
        <Link href="/">
          <img
            className={styles.logo}
            src="https://static.octopuscdn.com/logos/logo.svg"
            alt="Octopus Energy Logo"
          />
        </Link>
        <div className={styles.cart}>
          <img src="/basket.svg" alt="Basket" />
          {total ? <span className={styles.badge}>{total}</span> : null}
        </div>
      </header>
      <main className="page-content">{children}</main>
      <footer className="footer-section alternate-section">
        <p>
          Octopus Energy Ltd is a company registered in England and Wales.
          Registered number: 09263424. Registered office: 33 Holborn, London,
          EC1N 2HT. Trading office: 20-24 Broadwick Street, London, W1F 8HT.
        </p>
      </footer>
    </>
  );
}
