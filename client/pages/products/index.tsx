import { gql } from "@apollo/client";
import ProductImage from "components/product/ProductImage";
import { client } from "gql/client";
import type { GetProductsQuery } from "gql/graphql";
import type { InferGetStaticPropsType } from "next";
import Link from "next/link";
import styles from "./ProductList.module.css";
import buttonStyles from "components/Button.module.css";
import cls from "utils/cls";

type Props = Omit<InferGetStaticPropsType<typeof getStaticProps>, "__typename">;

export default function ProductListPage({ products }: Props) {
  return (
    <section className="page-section">
      <h1 className={styles.title}>Octoproducts</h1>
      <ul className={styles.productList}>
        {products.map((product) => (
          <li key={product.id}>
            <ProductImage src={product.img_url} alt={product.name} />
            <h1>{product.name}</h1>
            <Link href={`/products/${product.id}`}>
              <a
                className={cls(
                  styles.productLink,
                  buttonStyles.button,
                  buttonStyles.large
                )}
              >
                Discover more
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export async function getStaticProps() {
  const { data } = await client.query<GetProductsQuery>({
    query: gql`
      query GetProducts {
        allProducts {
          id
          img_url
          height
          name
          price
          width
        }
      }
    `,
  });
  return {
    props: {
      products: data.allProducts,
    },
  };
}
