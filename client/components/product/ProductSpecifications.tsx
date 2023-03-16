import { Product } from "gql/graphql";

type Props = Pick<
  Product,
  "brand" | "colour" | "height" | "length" | "model_code" | "weight" | "width"
>;

export default function Specifications({
  brand,
  colour,
  height,
  length,
  model_code,
  weight,
  width,
}: Props) {
  return (
    <section className="page-section">
      <h2>Specifications</h2>
      <p className="section-content table">
        <span>Brand</span>
        <span>{brand}</span>
        <span>Item weight</span>
        <span>{weight} g</span>
        <span>Dimensions</span>
        <span>
          {height} cm x {width} cm x {length} cm
        </span>
        <span>Item model number</span>
        <span>{model_code}</span>
        <span>Colour</span>
        <span>{colour}</span>
      </p>
    </section>
  );
}
