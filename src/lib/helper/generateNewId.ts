import { Product } from "@/interfaces/product";

export function generateNewId(datas: Product[]) {
  return datas.reduce((acc, curr) => Math.max(acc, curr.id), 0) + 1;
}
