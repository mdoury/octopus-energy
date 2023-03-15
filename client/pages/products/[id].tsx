import { gql } from "@apollo/client";
import { client } from "gql/client";
import type { GetProductIdsQuery, GetProductQuery } from "gql/graphql";
import type { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { FormEvent, useCallback, useState } from "react";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

async function handleSubmit(e: FormEvent<HTMLFormElement>) {
  e.preventDefault();
  if ("quantity" in e.currentTarget) {
    console.log({ quantity: e.currentTarget.quantity.value });
  }
}

export default function ProductPage({ product }: Props) {
  const [quantity, setQuantity] = useState(1);
  const incrementQuantity = useCallback(() => {
    setQuantity((quantity) => quantity + 1);
  }, []);
  const decrementQuantity = useCallback(() => {
    setQuantity((quantity) => Math.max(0, quantity - 1));
  }, []);

  return (
    <article>
      <section>
        <figure>
          <img src={product.img_url} />
        </figure>
        <h1>{product.name}</h1>
        <span>
          {product.power} // Packet of {product.quantity}
        </span>
        <form onSubmit={handleSubmit}>
          <span>£{product.price / 100}</span>
          <span>
            <button type="button" onClick={decrementQuantity}>
              -
            </button>
            <label>
              <span>Qty</span>
              <input
                name="quantity"
                type="number"
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                min={0}
                value={quantity}
              />
            </label>
            <button type="button" onClick={incrementQuantity}>
              +
            </button>
          </span>
          <button>Add to cart</button>
        </form>
      </section>
      <section>
        <h2>Description</h2>
        <p>{product.description}</p>
      </section>
      <section>
        <h2>Specifications</h2>
        <div>
          <span>Brand</span>
          <span>{product.brand}</span>
          <span>Item weight</span>
          <span>{product.weight}</span>
          <span>Dimensions</span>
          <span>
            {product.height} x {product.width} x {product.length}
          </span>
          <span>Item model number</span>
          <span>{product.model_code}</span>
          <span>Colour</span>
          <span>{product.colour}</span>
        </div>
      </section>
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

  return { props: { product: data.Product } };
}
