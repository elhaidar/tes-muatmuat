import { SortAsc, SortDesc } from "lucide-react";
import { Button } from "./ui/button";
import { Dispatch, SetStateAction } from "react";
import { cn } from "@/lib/utils";

interface Props {
  sort: "asc" | "desc" | "";
  setSort: Dispatch<SetStateAction<"desc" | "asc" | "">>;
}

export default function SortProducts({ sort, setSort }: Props) {
  return (
    <Button
      className="w-fit"
      onClick={() => {
        if (sort === "asc") setSort("desc");
        else if (sort === "desc") setSort("");
        else setSort("asc");
      }}
    >
      Sort by Price
      <SortAsc
        className={cn(
          "w-0 h-4 ml-2 transition-all",
          sort === "asc" ? "scale-100 w-4" : "scale-0 w-0"
        )}
      />
      <SortDesc
        className={cn(
          "w-0 h-4 ml-2 transition-all",
          sort === "desc" ? "scale-100 w-4" : "scale-0 w-0"
        )}
      />
    </Button>
  );
}
