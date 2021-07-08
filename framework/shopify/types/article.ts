import { Blog } from './blog';

type SEO = {
  __typename?: 'SEO' | undefined;
  description?: string | undefined | null;
  title?: string | undefined | null;
};

export type Article = {
  id: string;
  handle: string;
  title: string;
  url?: string;
  content?: string;
  contentHtml?: any;
  excerpt?: string | null;
  excerptHtml?: any;
  imageUrl?: string;
  tags?: string[];
  seo?: SEO | null;
  slug?: string;
  blog: Blog;
};

export type ArticleTypes = {
  article: Article;
};

export type GetAllArticlesOperation<T extends ArticleTypes = ArticleTypes> = {
  data: { articles: T['article'][] };
  variables: { first?: number };
};

export type GetArticleOperation<T extends ArticleTypes = ArticleTypes> = {
  data: { article?: T['article'] };
  variables: { blog: string; article: string };
};

export type ArticlePaths<T extends ArticleTypes = ArticleTypes> = {
  handle: string;
  blog: string;
};

export type GetAllArticlePathsOperation = {
  data: {
    articles: ArticlePaths[];
  };
  variables: { first?: number; blog?: string };
};
