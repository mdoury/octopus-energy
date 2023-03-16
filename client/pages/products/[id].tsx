import { gql } from "@apollo/client";
import ProductDescription from "components/product/ProductDescription";
import ProductCard from "components/product/ProductCard";
import ProductSpecifications from "components/product/ProductSpecifications";
import { client } from "gql/client";
import type { GetProductIdsQuery, GetProductQuery } from "gql/graphql";
import type { GetStaticPropsContext, InferGetStaticPropsType } from "next";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export default function ProductPage({
  id,
  img_url,
  name,
  power,
  quantity,
  price,
  description,
  brand,
  colour,
  height,
  length,
  model_code,
  weight,
  width,
}: Props) {
  return (
    <article>
      <ProductCard
        id={id}
        img_url={img_url}
        name={name}
        power={power}
        quantity={quantity}
        price={price}
      />
      <ProductDescription description={description} />
      <ProductSpecifications
        brand={brand}
        colour={colour}
        height={height}
        length={length}
        model_code={model_code}
        weight={weight}
        width={width}
      />
    </article>
  );
}

export async function getStaticPaths() {
  const { data } = await client.query<GetProductIdsQuery>({
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
  const { data } = await client.query<GetProductQuery>({
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

  return { props: data.Product };
}
