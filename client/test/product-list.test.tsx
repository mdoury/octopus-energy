import { render } from "@testing-library/react";
import Layout from "components/Layout";
import { CartProvider } from "contexts/CartContext";
import ProductListPage from "pages/products";
import mockProducts from "./mocks/product-list.json";

test("should be able to view product list", async () => {
  const { getAllByRole } = render(
    <CartProvider>
      <Layout>
        <ProductListPage products={mockProducts} />
      </Layout>
    </CartProvider>
  );

  const productList = getAllByRole("listitem");
  expect(productList).toHaveLength(mockProducts.length);
  productList.forEach((product, index) =>
    expect(product).toHaveTextContent(mockProducts[index].name)
  );
});
