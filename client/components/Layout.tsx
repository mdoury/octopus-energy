import type { PropsWithChildren } from "react";

type Props = PropsWithChildren<{}>;

export default function Layout({ children }: Props) {
  return (
    <>
      <header>
        <figure>
          <img
            src="https://static.octopuscdn.com/logos/logo.svg"
            alt="Octopus Energy Logo"
          />
        </figure>
        <img src="/basket.svg" alt="Basket" />
      </header>
      <main>{children}</main>
      <footer>
        Octopus Energy Ltd is a company registered in England and Wales.
        Registered number: 09263424. Registered office: 33 Holborn, London, EC1N
        2HT. Trading office: 20-24 Broadwick Street, London, W1F 8HT.
      </footer>
    </>
  );
}
