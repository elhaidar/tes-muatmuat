import { SquarePlus } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { ProductForm } from "./product-form";
import { SetStateAction, useState } from "react";
import { Product } from "@/interfaces/product";

interface Props {
  product: Product;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
}

export default function EditProduct({
  product,
  setIsOpen: setIsOpenPopover,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant={"ghost"} className="w-full flex justify-start text-md">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
          <DialogDescription>
            Make a change to your product here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <ProductForm
          setIsOpen={setIsOpen}
          setIsOpenPopover={setIsOpenPopover}
          product={product}
        />
      </DialogContent>
    </Dialog>
  );
}
