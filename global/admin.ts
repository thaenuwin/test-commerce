export const buildAdminURL = (resource: string) => {
  const baseURL = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
  const apiKey = process.env.NEXT_PUBLIC_SHOPIFY_ADMIN_API_KEY;
  const password = process.env.NEXT_PUBLIC_SHOPIFY_ADMIN_PASSWORD;
  const apiVersion = process.env.SHOPIFY_API_VERSION;

  return `https://${apiKey}:${password}@${baseURL}/admin/api/${apiVersion}/${resource}.json`;
};
