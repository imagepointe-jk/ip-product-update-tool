import { Product } from "./schema";

type Operation = {
  name: string;
  shouldUpdateProduct: (product: Product, allProducts: Product[]) => boolean;
};

export const operations: Operation[] = [
  {
    name: "test",
    shouldUpdateProduct: (product) => product.id === 22435,
  },
];
