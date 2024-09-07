import { Product } from "@/interfaces/product";
import Image from "next/image";
import { Button } from "./ui/button";
import { EllipsisVertical } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import DeleteButton from "./delete-button";

interface Props {
  data: Product;
}

export default function ProductItem({ data }: Props) {
  return (
    <div className="flex bg-white border border-border shadow-sm rounded-lg flex-col">
      <div className="flex justify-center bg-gray-100 relative">
        <Image src={data.thumbnail} width={200} height={200} alt={data.title} />
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"ghost"}
              size={"icon"}
              className="absolute right-0 top-1"
            >
              <EllipsisVertical className="w-5 h-5" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-24 p-0">
            <div className="flex flex-col items-start rounded-none">
              <Button
                variant={"ghost"}
                className="w-full flex justify-start text-md"
              >
                Edit
              </Button>
              <DeleteButton id={data.id} />
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <div className="p-4">
        <p className="text-muted-foreground/70 font-bold text-xs">
          {data.category?.toUpperCase()}
        </p>
        <h3 className="font-bold line-clamp-1">{data.title}</h3>
        <p className="font-bold text-lg">${data.price}</p>
      </div>
    </div>
  );
}
