import type { OperationContext, OperationOptions } from '@commerce/api/operations';
import { ArticleEdge, GetArticlesQueryVariables, GetArticlesQuery } from '../../schema';
import { normalizeArticles } from '../../utils';
import type { ShopifyConfig, Provider } from '..';
import type { GetAllArticlesOperation, Article } from '../../types/article';
import getAllArticlesQuery from '../../utils/queries/get-all-articles-query';

export default function getAllArticlesOperation({ commerce }: OperationContext<Provider>) {
  async function getAllArticles<T extends GetAllArticlesOperation>(opts?: {
    config?: Partial<ShopifyConfig>;
    preview?: boolean;
  }): Promise<T['data']>;

  async function getAllArticles<T extends GetAllArticlesOperation>(
    opts: {
      config?: Partial<ShopifyConfig>;
      preview?: boolean;
    } & OperationOptions
  ): Promise<T['data']>;

  async function getAllArticles<T extends GetAllArticlesOperation>({
    query = getAllArticlesQuery,
    config,
    variables,
  }: {
    url?: string;
    config?: Partial<ShopifyConfig>;
    variables?: GetArticlesQueryVariables;
    preview?: boolean;
    query?: string;
  } = {}): Promise<T['data']> {
    const { fetch } = commerce.getConfig(config);

    const { data } = await fetch<GetArticlesQuery, GetArticlesQueryVariables>(query, {
      variables,
    });

    return {
      articles: normalizeArticles(data.articles.edges as ArticleEdge[]),
    };
  }

  return getAllArticles;
}
