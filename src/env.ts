//make TS treat all as defined, but immediately check the values at runtime
export const env = {
  WP_APPLICATION_USERNAME: process.env.WP_APPLICATION_USERNAME!,
  WP_APPLICATION_PASSWORD: process.env.WP_APPLICATION_PASSWORD!,
  STORE_URL: process.env.STORE_URL!,
};

for (const [key, value] of Object.entries(env)) {
  if (value === undefined) {
    throw new Error(`Missing environment variable "${key}"!`);
  }
}
