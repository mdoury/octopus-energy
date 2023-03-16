import { render, fireEvent } from "@testing-library/react";
import Layout from "components/Layout";
import { CartProvider } from "contexts/CartContext";
import ProductPage from "pages/products/[id]";
import mockProduct from "./mocks/product.json";

test("should be able to view product details", async () => {
  const specifications = {
    Brand: mockProduct.brand,
    "Item weight": mockProduct.weight,
    Dimensions: `${mockProduct.height} cm x ${mockProduct.width} cm x ${mockProduct.length} cm`,
    "Item model number": mockProduct.model_code,
    Colour: mockProduct.colour,
  };

  const { getByText, getByRole, getByTestId } = render(
    <CartProvider>
      <Layout>
        <ProductPage {...mockProduct} />
      </Layout>
    </CartProvider>
  );

  const name = getByRole("heading", { level: 1 });
  expect(name).toHaveTextContent(mockProduct.name);

  const subtitle = name.nextSibling;
  expect(subtitle).toHaveTextContent(mockProduct.power);
  expect(subtitle).toHaveTextContent(`Packet of ${mockProduct.quantity}`);

  const price = getByTestId("price");
  expect(price).toHaveTextContent(`£${mockProduct.price / 100}`);

  const description = getByText("Description").nextSibling;
  expect(description).toHaveTextContent(mockProduct.description);

  const specificationSectionContent = getByText("Specifications").nextSibling;
  Object.keys(specifications).forEach((label) => {
    expect(specificationSectionContent).toHaveTextContent(label);
    const value = getByText(label).nextSibling;
    expect(value).toHaveTextContent(specifications[label]);
  });
});

test("should be able to increase and decrease product quantity", async () => {
  const { getByText, getByLabelText } = render(
    <CartProvider>
      <Layout>
        <ProductPage {...mockProduct} />
      </Layout>
    </CartProvider>
  );

  const currentQuantity = getByLabelText("Qty");
  const increaseQuantity = getByText("+");
  const decreaseQuantity = getByText("-");

  expect(currentQuantity).toHaveValue(1);

  fireEvent.click(increaseQuantity);
  expect(currentQuantity).toHaveValue(2);

  fireEvent.click(decreaseQuantity);
  expect(currentQuantity).toHaveValue(1);
});

// TODO: Check that the user is not able to set a quantity below 1
test("should not be able to set invalid quantity values", async () => {
  const { getByText, getByLabelText } = render(
    <CartProvider>
      <Layout>
        <ProductPage {...mockProduct} />
      </Layout>
    </CartProvider>
  );

  const currentQuantity = getByLabelText("Qty");
  const increaseQuantity = getByText("+");
  const decreaseQuantity = getByText("-");

  expect(decreaseQuantity).toBeDisabled();

  fireEvent.click(increaseQuantity);
  fireEvent.click(decreaseQuantity);
  expect(decreaseQuantity).toBeDisabled();

  fireEvent.click(decreaseQuantity);
  expect(currentQuantity).toHaveValue(1);

  fireEvent.change(currentQuantity, { target: { value: 0 } });
  expect(currentQuantity).toHaveValue(1);

  fireEvent.change(currentQuantity, { target: { value: -100 } });
  expect(currentQuantity).toHaveValue(1);

  fireEvent.change(currentQuantity, { target: { value: "invalid" } });
  expect(currentQuantity).toHaveValue(1);
});

test("should be able to add items to the basket", async () => {
  const { getByText, getByTestId, getByLabelText } = render(
    <CartProvider>
      <Layout>
        <ProductPage {...mockProduct} />
      </Layout>
    </CartProvider>
  );

  const increaseQuantity = getByText("+");

  const currentQuantity = getByLabelText("Qty");

  fireEvent.click(increaseQuantity);
  fireEvent.click(increaseQuantity);
  fireEvent.click(increaseQuantity);

  expect(currentQuantity).toHaveValue(4);

  const addToBasketElement = getByText("Add to cart");
  fireEvent.click(addToBasketElement);

  const basketItems = getByTestId("items-in-cart");
  expect(basketItems).toHaveTextContent("4");
});
