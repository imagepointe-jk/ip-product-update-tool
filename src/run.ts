import "dotenv/config";
import { getProducts } from "./fetch";
import { inspect } from "util";
import { validateProducts } from "./validation";
import { operations } from "./functions";

const OPERATION_TO_RUN = "test";

(async function run() {
  try {
    const operation = operations.find((op) => op.name === OPERATION_TO_RUN);
    if (!operation)
      throw new Error(`Couldn't find operation with name ${OPERATION_TO_RUN}`);

    const productsJson = await getProducts();
    const parsed = validateProducts(productsJson);

    for (const product of parsed) {
      if (!operation.shouldUpdateProduct(product, parsed)) continue;
      console.log(`Preparing to update product ${product.id}`);
    }
  } catch (error) {
    console.error(error);
  }
})();
