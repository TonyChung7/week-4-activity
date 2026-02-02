
import ProductList from "../component/ProductList";
import { products } from "../data/products";

export default function Page() {
  return <ProductList title="Products" products={products} />;
}
