import { Layout } from '@components/common';
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next';

export async function getStaticProps({}: GetStaticPropsContext<{}>) {
  const hero = {
    title: 'Homepage',
    tagline: 'Sample Tagline can be put here.',
  };

  return { props: { hero }, revalidate: 200 };
}

export default function Home({ hero }: InferGetStaticPropsType<typeof getStaticProps>) {
  return <h1>Homepage template.</h1>;
}

Home.Layout = Layout;
