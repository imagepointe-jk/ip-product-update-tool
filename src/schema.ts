import { z } from "zod";

export const productSchema = z.object({
  id: z.number(),
  sku: z.string(),
  name: z.string(),
});

export type Product = z.infer<typeof productSchema>;
export type ProductUpdateData = {
  basicData?: {
    name?: string;
    status?: "draft" | "publish";
  };
};
