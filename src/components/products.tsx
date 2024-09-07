"use client";

import { Product } from "@/interfaces/product";
import Searchbar from "./searchbar";
import ProductItem from "./product-item";
import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { setProducts } from "@/redux/productSlice";
import AddProduct from "./add-product";
import { Button } from "./ui/button";
import { SortAsc } from "lucide-react";
import SortProducts from "./sort-products";

interface Props {
  products: Product[];
}

export default function Products({ products }: Props) {
  const { products: productsState } = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<"asc" | "desc" | "">("");

  const filteredSearch = useMemo(() => {
    return productsState.filter((item) => {
      return item.title.toLowerCase().includes(search.toLowerCase());
    });
  }, [productsState, search, sort]);

  const sortedProducts = useMemo(() => {
    if (!sort) return filteredSearch;
    if (sort === "asc") {
      return filteredSearch.sort((a, b) => a.price - b.price);
    } else if (sort === "desc") {
      return filteredSearch.sort((a, b) => b.price - a.price);
    }
  }, [filteredSearch]);

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
      <div className="bg-white z-[41] sticky top-0 py-6 flex flex-col gap-3">
        <div className="flex gap-2 w-full items-center ">
          <Searchbar search={search} setSearch={setSearch} />
          <AddProduct />
        </div>
        <SortProducts sort={sort} setSort={setSort} />
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {sortedProducts?.map((item) => (
          <ProductItem key={item.id} data={item} />
        ))}
      </div>
    </div>
  );
}
