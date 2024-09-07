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
import { useState } from "react";

export default function AddProduct() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant={"ghost"}>
          <SquarePlus className="mr-2" />
          Add Product
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Product</DialogTitle>
          <DialogDescription>
            Add a new product here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <ProductForm setIsOpen={setIsOpen} />
      </DialogContent>
    </Dialog>
  );
}
