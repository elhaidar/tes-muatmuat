import { SetStateAction } from "react";
import { Icons } from "./icons";
import { Input } from "./ui/input";

interface Props {
  search: string;
  setSearch: React.Dispatch<SetStateAction<string>>;
}

export default function Searchbar({ search, setSearch }: Props) {
  return (
    <div className="w-full flex justify-between items-center relative">
      <Input
        type="text"
        placeholder="Search"
        className="px-8 md:px-16 placeholder:text-foreground"
        onChange={(e) => setSearch(e.target.value)}
        value={search}
      />
      <Icons.search className="fill-foreground absolute right-12 md:right-16" />
    </div>
  );
}
