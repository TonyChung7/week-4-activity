import Image from "next/image";
import ProductList from "@/component/ProductList";

export default function Home() {
  return (
    <main>
      <h1>Welcome to the Home Page</h1>
      <ProductList />
    </main>
  );
}
