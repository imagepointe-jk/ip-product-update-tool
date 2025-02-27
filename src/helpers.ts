import { updateProduct } from "./fetch";
import { Product, ProductUpdateData } from "./schema";

export async function tryUpdateProduct(
  product: Product,
  updateData: ProductUpdateData
) {
  try {
    console.log(`Updating product ${product.sku}...`);
    const response = await updateProduct(product.id, updateData);
    if (!response.ok)
      throw new Error(
        `The request to update product ${product.sku} FAILED with status ${response.status}`
      );
  } catch (error) {
    console.error(error);
  }
}
