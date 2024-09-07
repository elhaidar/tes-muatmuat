"use client";

import { Product } from "@/interfaces/product";
import Searchbar from "./searchbar";
import ProductItem from "./product-item";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { setProducts } from "@/redux/productSlice";
import AddProduct from "./add-product";

interface Props {
  products: Product[];
}

export default function Products({ products }: Props) {
  const dispatch = useAppDispatch();
  const { products: productsState } = useAppSelector((state) => state.products);

  useEffect(() => {
    const getDataOnLocalStorage = localStorage.getItem("products");
    if (getDataOnLocalStorage) {
      dispatch(setProducts(JSON.parse(getDataOnLocalStorage)));
    } else {
      dispatch(setProducts(products));
    }
  }, [products, setProducts]);

  return (
    <div className="mx-4">
      <div className="flex gap-2 w-full items-center bg-white z-[41] sticky top-0 py-6">
        <Searchbar />
        <AddProduct />
      </div>
      <div className="grid grid-cols-2 gap-4">
        {productsState?.map((item) => (
          <ProductItem key={item.id} data={item} />
        ))}
      </div>
    </div>
  );
}
