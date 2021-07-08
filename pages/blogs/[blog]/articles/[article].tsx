import type { GetStaticPathsContext, GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';
import commerce from '@lib/api/commerce';
import { Layout } from '@components/common';
import ReactHtmlParser from 'react-html-parser';

export async function getStaticProps({ params }: GetStaticPropsContext<{ blog: string; article: string }>) {
  const { article } = await commerce.getArticle({ variables: { blog: params!.blog, article: params!.article } });

  if (!article) {
    throw new Error(`Article with slug '${params!.article}' not found`);
  }

  return {
    props: {
      article: article,
    },
    revalidate: 200,
  };
}

export async function getStaticPaths() {
  const { articles } = await commerce.getAllArticlePaths();

  return {
    paths: articles.map((article) => `/blogs/${article.blog}/articles/${article.handle}`),
    fallback: 'blocking',
  };
}

export default function Slug({ article }: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  return router.isFallback ? (
    <h1>Loading...</h1>
  ) : (
    <>
      <div className="container mx-auto">
        <div className="px-4">
          <h1 className="text-lg mb-8">{article.title}</h1>
          <div>{ReactHtmlParser(article.contentHtml)}</div>
        </div>
      </div>
    </>
  );
}

Slug.Layout = Layout;
