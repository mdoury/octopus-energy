import Button from "components/Button";
import Image from "components/Image";
import { useCartContext } from "contexts/CartContext";
import { Product } from "gql/graphql";
import { ChangeEvent, FormEvent, useCallback, useState } from "react";
import { formatCurrency } from "utils/format";
import productStyles from "./Product.module.css";
import productCardStyles from "./ProductCard.module.css";

type Props = Pick<
  Product,
  "id" | "img_url" | "name" | "power" | "quantity" | "price"
>;

// TODO: Persist cart in session instead of localStorage to enable progressive enhancement:
// - make a POST request to the server if JS is enabled and fully-loaded
// - fallback to a POST form submission followed by a redirect (full page reload) otherwise
export default function ProductCard({
  id,
  img_url,
  name,
  power,
  quantity,
  price,
}: Props) {
  const { addToCart } = useCartContext();
  const [productQuantity, setProductQuantity] = useState(1);
  const [error, setError] = useState<string>();

  const incrementQuantity = useCallback(() => {
    setProductQuantity((q) => (q ? Math.max(q + 1, 1) : 1));
  }, []);
  const decrementQuantity = useCallback(() => {
    setProductQuantity((q) => (q ? Math.max(q - 1, 1) : 1));
  }, []);

  const handleError = useCallback((value: string) => {
    setError(`Invalid quantity value: "${value}".`);
    setProductQuantity(1);
  }, []);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    try {
      console.log({ v: e.target.value });
      setProductQuantity(Math.max(parseInt(e.target.value || "1"), 1));
    } catch {
      handleError(e.target?.value ?? "");
    }
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addToCart(id, productQuantity);
    setProductQuantity(1);
  };

  return (
    <section className="page-section">
      <Image src={img_url} alt={name} />
      <h1>{name}</h1>
      <span className={productCardStyles.subtitle}>
        {power} // Packet of {quantity}
      </span>
      <form className={productStyles.productForm} onSubmit={handleSubmit}>
        <span className={productStyles.price} data-testid="price">
          {formatCurrency(price / 100)}
        </span>
        <span className={productStyles.quantity}>
          <Button
            disabled={productQuantity <= 1 || !productQuantity}
            onClick={decrementQuantity}
            size="small"
            type="button"
          >
            -
          </Button>
          <label>
            <span>Qty</span>
            <input
              type="number"
              name="productQuantity"
              value={productQuantity}
              onChange={handleChange}
              min={1}
              required
            />
          </label>
          <Button onClick={incrementQuantity} size="small" type="button">
            +
          </Button>
        </span>
        <Button className={productStyles.addToCart}>Add to cart</Button>
        <span>{error}</span>
      </form>
    </section>
  );
}
