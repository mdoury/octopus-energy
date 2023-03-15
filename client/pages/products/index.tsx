import { gql } from "@apollo/client";
import { client } from "gql/client";
import type { GetProductsQuery } from "gql/graphql";
import type { InferGetStaticPropsType } from "next";
import Link from "next/link";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export default function ProductListPage({ products }: Props) {
  return (
    <main>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <figure>
              <img src={product.img_url} alt={product.name} />
            </figure>
            <h2>{product.name}</h2>
            <Link href={`/products/${product.id}`}>Discover more</Link>
          </li>
        ))}
      </ul>
    </main>
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
