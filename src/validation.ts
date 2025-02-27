import { z } from "zod";
import { productSchema } from "./schema";

export function validateProducts(json: any) {
  return z.array(productSchema).parse(json);
}
