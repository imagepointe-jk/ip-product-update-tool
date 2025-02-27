import { env } from "./env";

export async function getProducts() {
  console.log(`Getting all WooCommerce products from ${env.STORE_URL}`);

  let results: any[] = [];
  let page = 1;

  while (page < 999) {
    console.log(`Getting page ${page}`);
    const response = await getProductsPage(page, 100);
    const json = await response.json();
    if (Array.isArray(json)) {
      results = results.concat(json);
      if (json.length < 100) break;
    }

    page++;
  }

  console.log(`Got ${results.length} products`);
  return results;
}

async function getProductsPage(page: number, perPage: number) {
  return fetch(
    `${env.STORE_URL}/wp-json/wc/v3/products?page=${page}&per_page=${perPage}`,
    {
      headers: {
        Authorization: `Basic ${btoa(
          `${env.WP_APPLICATION_USERNAME}:${env.WP_APPLICATION_PASSWORD}`
        )}`,
      },
    }
  );
}
