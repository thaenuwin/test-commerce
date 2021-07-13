import { Layout } from '@components/common';
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import commerce from '@lib/api/commerce';
import Link from 'next/link';
import ProductCard from 'components/product/ProductCard';

export async function getStaticProps({ preview, locale, locales }: GetStaticPropsContext<{}>) {
  const config = { locale, locales };

  const hero = {
    title: 'Site name here',
    tagline: 'Sample Tagline can be put here.',
  };

  const { products } = await commerce.getAllProducts({
    variables: { first: 6 }, // TODO: Put all the available params that can passed in here.
    config,
    preview,
  });

  return { props: { hero, products }, revalidate: 200 };
}

export default function Home({ hero, products }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <div className="bg-gray-400 h-96 flex items-end">
        <div className="container mx-auto px-3 my-16 text-white">
          <h1 className="text-5xl mb-2">{hero.title}</h1>
          <p className="text-2xl">{hero.tagline}</p>
        </div>
      </div>
      <div className="container mx-auto px-3 py-8">
        <h2 className="text-4xl mb-8 text-center">Products</h2>
        <div className="grid grid-cols-3 gap-4">
          {products?.map((item) => (
            <ProductCard product={item} variant="simple" />
          ))}
        </div>
      </div>
    </>
  );
}

Home.Layout = Layout;
