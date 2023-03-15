import { gql } from "@apollo/client";
import { client } from "gql/client";
import type { GetProductsQuery } from "gql/graphql";
import type { InferGetStaticPropsType } from "next";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export default function ProductListPage(props: Props) {
  return <pre>{JSON.stringify(props.products, null, 2)}</pre>;
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
