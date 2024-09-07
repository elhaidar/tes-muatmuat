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
  const { products }: { products: any[] } = await getProducts();
  const formattedProducts: Product[] = products.map((item) => ({
    id: item.id,
    category: item.category,
    description: item.description,
    price: item.price,
    stock: item.stock,
    thumbnail: item.thumbnail,
    title: item.title,
  }));

  return (
    <ReduxProvider>
      <Products products={formattedProducts} />
    </ReduxProvider>
  );
}
