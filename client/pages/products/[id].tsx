import { gql } from "@apollo/client";
import { client } from "gql/client";
import type { GetStaticPropsContext, InferGetStaticPropsType } from "next";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export default function ProductPage(props: Props) {
  return <pre>{JSON.stringify(props.product, null, 2)}</pre>;
}

export async function getStaticPaths() {
  const { data } = await client.query({
    query: gql`
      query GetProductIds {
        allProducts {
          id
        }
      }
    `,
  });
  return {
    paths: data.allProducts.map(({ id }) => ({ params: { id } })),
    fallback: false,
  };
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const { data } = await client.query({
    query: gql`
      query GetProduct($id: ID!) {
        Product(id: $id) {
          id
          name
          description
          img_url
          price
          power
          quantity
          brand
          weight
          height
          width
          length
          model_code
          colour
        }
      }
    `,
    variables: { id: context.params.id },
  });

  return { props: { product: data.Product } };
}
