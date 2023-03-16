import Layout from "components/Layout";
import { CartProvider } from "contexts/CartContext";
import type { AppProps } from "next/app";
import "styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </CartProvider>
  );
}

export default MyApp;
