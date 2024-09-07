"use client";

import { useAppDispatch } from "@/hooks/redux";
import { Button } from "./ui/button";
import { deleteProduct } from "@/redux/productSlice";

interface Props {
  id: number;
}

export default function DeleteButton({ id }: Props) {
  const dispatch = useAppDispatch();

  return (
    <Button
      variant={"ghost"}
      className="w-full flex justify-start text-md hover:bg-red-50"
      onClick={() => dispatch(deleteProduct(id))}
    >
      Delete
    </Button>
  );
}
