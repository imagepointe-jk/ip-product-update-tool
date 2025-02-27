import "dotenv/config";
import { getProducts } from "./fetch";
import { inspect } from "util";
import { validateProducts } from "./validation";
import { operations } from "./operations";
import { tryUpdateProduct } from "./helpers";

const OPERATION_TO_RUN = "Hide unneeded products 2/27/25";

(async function run() {
  try {
    const operation = operations.find((op) => op.name === OPERATION_TO_RUN);
    if (!operation)
      throw new Error(`Couldn't find operation with name ${OPERATION_TO_RUN}`);

    const productsJson = await getProducts();
    const parsed = validateProducts(productsJson);

    operation.onBeforeProductUpdates(parsed);

    for (const product of parsed) {
      const updateData = operation.getProductUpdateData(product, parsed);
      if (!updateData) continue;

      await tryUpdateProduct(product, updateData);
    }
  } catch (error) {
    console.error(error);
  }
})();
