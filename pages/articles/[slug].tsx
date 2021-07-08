import type { GetStaticPathsContext, GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';
import commerce from '@lib/api/commerce';
import { Layout } from '@components/common';

export async function getStaticProps({ params, locale, locales, preview }: GetStaticPropsContext<{ slug: string }>) {
  const { blog } = await commerce.getBlog({ variables: { slug: params!.slug } });
  const test = await commerce.getAllArticlePaths();

  console.log(test);

  if (!blog) {
    throw new Error(`Blog with slug '${params!.slug}' not found`);
  }

  return {
    props: {
      blog,
    },
    revalidate: 200,
  };
}

export async function getStaticPaths() {
  const { blogs } = await commerce.getAllBlogPaths();

  return {
    paths: blogs.map((item) => `/blogs${item.slug}`),
    fallback: 'blocking',
  };
}

export default function Slug({ blog }: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  return router.isFallback ? (
    <h1>Loading...</h1>
  ) : (
    <>
      <div>Blog Detail Template</div>
    </>
  );
}

Slug.Layout = Layout;
