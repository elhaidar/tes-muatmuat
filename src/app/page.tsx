import Products from "@/components/products";
import ReduxProvider from "@/components/provider";
import { Product } from "@/interfaces/product";

async function getProducts() {
  const res = await fetch("https://dummyjson.com/products", {
    cache: "no-store",
  });
  const json = await res.json();
  return json;
}

export default async function Home() {
  const { products }: { products: Product[] } = await getProducts();

  return (
    <ReduxProvider>
      <Products products={products} />
    </ReduxProvider>
  );
}
