import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';
import commerce from '@lib/api/commerce';
import { Layout } from '@components/common';

export async function getStaticProps({ params }: GetStaticPropsContext<{ blog: string }>) {
  const { blog } = await commerce.getBlog({ variables: { slug: params!.blog } });

  if (!blog) {
    throw new Error(`Blog with slug '${params!.blog}' not found`);
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

export default function News({ blog }: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  return router.isFallback ? (
    <h1>Loading...</h1>
  ) : (
    <>
      <div className="container mx-auto">
        <div className="px-4">
          <h1>{blog!.title} Blog</h1>
          <p>Entity ID: {blog!.id}</p>
          <p>Handle/Slug: {blog!.handle}</p>
        </div>
      </div>
    </>
  );
}

News.Layout = Layout;
