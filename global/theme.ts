export const getThemeMenuURL = (slug: string) => {
  const baseURL = process.env.NEXT_PUBLIC_SHOPIFY_MENU_API_URL;

  return `${baseURL}/${slug}`;
};

export const getThemeMenu = async (slug: string) => {
  const res = await fetch(getThemeMenuURL(slug));
  const json = await res.json();

  return json[slug];
};
