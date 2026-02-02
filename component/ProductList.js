import Product from "./Product";
import products from "../data/products";

export default function ProductList() {
  return (
    <ul>
      {products.map((product) => (
        <Product key={product.id} {...product} />
      ))}
    </ul>
  );
}
