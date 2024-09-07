import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/interfaces/product";

interface ProductState {
  products: Product[];
}

let initialProducts: Product[] = [];

const initialState: ProductState = {
  products: initialProducts,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
      localStorage.setItem("products", JSON.stringify(action.payload));
    },
    deleteProduct: (state, action: PayloadAction<number>) => {
      const products = [...state.products];
      const filteredProducts = products.filter(
        (item) => item.id !== action.payload
      );
      state.products = filteredProducts;
      localStorage.setItem("products", JSON.stringify(filteredProducts));
    },
    addProduct: (state, action: PayloadAction<Product>) => {
      const newProduct = action.payload;
      const products = [...state.products, newProduct];
      state.products = products;
      localStorage.setItem("products", JSON.stringify(products));
    },
    editProduct: (
      state,
      action: PayloadAction<{
        id: number;
        title: string;
        price: number;
        stock: number;
      }>
    ) => {
      const { id, title, price, stock } = action.payload;
      const newProducts = state.products.map((item) => {
        if (item.id === id) {
          item = { ...item, title, price, stock };
        }
        return item;
      });
      state.products = newProducts;
      localStorage.setItem("products", JSON.stringify(newProducts));
    },
  },
});

export const { setProducts, deleteProduct, addProduct, editProduct } =
  productSlice.actions;

export default productSlice.reducer;
