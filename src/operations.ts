import { skus } from "../data/2-27-25";
import { Product, ProductUpdateData } from "./schema";

export type Operation = {
  name: string;
  onBeforeProductUpdates: (allProducts: Product[]) => void; //useful for running checks on the existing data before running updates. can throw from here if a check fails. if shouldUpdateProduct always returns false, this could even be used on its own to do some kind of complex analysis of product data.
  getProductUpdateData: (
    product: Product,
    allProducts: Product[]
  ) => ProductUpdateData | null; //return null to skip the product completely
};

export const operations: Operation[] = [
  {
    name: "Hide unneeded products 2/27/25",
    onBeforeProductUpdates: (products) => {
      for (const sku of skus) {
        if (
          !products.find(
            (product) =>
              product.sku.toLocaleLowerCase() === sku.toLocaleLowerCase()
          )
        ) {
          throw new Error(`Product ${sku} does not exist in the database!`);
        }
      }
    },
    getProductUpdateData: (product) => {
      const shouldUpdate = !!skus.find(
        (sku) => sku.toLocaleLowerCase() === product.sku.toLocaleLowerCase()
      );
      if (!shouldUpdate) return null;

      return {
        basicData: {
          name: product.name.includes("discontinued")
            ? product.name
            : product.name + " (discontinued)",
          status: "draft",
        },
      };
    },
  },
];
