import { Product } from "gql/graphql";

type Props = Pick<Product, "description">;
export default function Description({ description }: Props) {
  return (
    <section className="page-section alternate-section">
      <h2>Description</h2>
      <p className="section-content">{description}</p>
    </section>
  );
}
