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
import { addProduct } from "@/redux/productSlice";

interface Props {
  product?: Product;
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

export function ProductForm({ product }: Props) {
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

  function onSubmit(data: z.infer<typeof FormSchema>) {
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
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(payload, null, 2)}</code>
        </pre>
      ),
    });
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
