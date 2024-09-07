"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { Product } from "@/interfaces/product";
import { generateNewId } from "@/lib/helper/generateNewId";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { addProduct, editProduct } from "@/redux/productSlice";
import { SetStateAction } from "react";

interface Props {
  product?: Product;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
  setIsOpenPopover?: React.Dispatch<SetStateAction<boolean>>;
}

const FormSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  price: z
    .union([
      z.string().transform((x) => x.replace(/[^0-9.-]+/g, "")),
      z.number(),
    ])
    .pipe(z.coerce.number().min(0.0001).max(999999999)),
  stock: z
    .union([
      z.string().transform((x) => x.replace(/[^0-9.-]+/g, "")),
      z.number(),
    ])
    .pipe(z.coerce.number().min(1).max(999999999)),
});

export function ProductForm({ product, setIsOpen, setIsOpenPopover }: Props) {
  const { products } = useAppSelector((state) => state.products);

  const dispatch = useAppDispatch();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: product?.title || "",
      price: product?.price,
      stock: product?.stock,
    },
  });

  function handleAddProduct(data: z.infer<typeof FormSchema>) {
    const { price, stock, title } = data;
    const payload: Product = {
      id: generateNewId(products),
      title,
      price,
      stock,
      thumbnail: "https://placehold.jp/200x200.png",
      category: "New Product",
      description: "lorem ipsum",
    };
    dispatch(addProduct(payload));
    toast({
      title: "Success!",
      description: "Product added successfully",
    });
    setIsOpen(false);
  }

  function handleEditProduct(data: z.infer<typeof FormSchema>) {
    if (!product) return;
    const { price, stock, title } = data;
    const payload = {
      id: product.id,
      title,
      price,
      stock,
    };
    dispatch(editProduct(payload));
    toast({
      title: "Success!",
      description: "Product edited successfully",
    });
    setIsOpen(false);
    if (setIsOpenPopover) {
      setIsOpenPopover(false);
    }
  }

  function onSubmit(data: z.infer<typeof FormSchema>) {
    if (product) {
      handleEditProduct(data);
    } else {
      handleAddProduct(data);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Title</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input placeholder="99" type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="stock"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Stock</FormLabel>
              <FormControl>
                <Input placeholder="20" type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
