import type { GetStaticPathsContext, GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';
import commerce from '@lib/api/commerce';
import { Layout } from '@components/common';
import { ProductView } from '@components/product';

export async function getStaticProps({ params, locale, locales, preview }: GetStaticPropsContext<{ slug: string }>) {
  const config = { locale, locales };
  const { product } = await commerce.getProduct({
    variables: { slug: params!.slug },
    config,
    preview,
  });
  const { products } = await commerce.getAllProducts({
    variables: { first: 4 },
    config,
    preview,
  });

  console.log(products);

  if (!product) {
    throw new Error(`Product with slug '${params!.slug}' not found`);
  }

  return {
    props: {
      product,
      relatedProducts: products,
    },
    revalidate: 200,
  };
}

export async function getStaticPaths({ locales }: GetStaticPathsContext) {
  const { products } = await commerce.getAllProductPaths();

  return {
    paths: locales
      ? locales.reduce<string[]>((arr, locale) => {
          // Add a product path for every locale
          products.forEach((product) => {
            arr.push(`/${locale}/product${product.path}`);
          });
          return arr;
        }, [])
      : products.map((product) => `/product${product.path}`),
    fallback: 'blocking',
  };
}

export default function Slug({ product, relatedProducts }: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  return router.isFallback ? (
    <h1>Loading...</h1>
  ) : (
    <>
      <ProductView product={product} relatedProducts={relatedProducts} />
    </>
  );
}

Slug.Layout = Layout;
