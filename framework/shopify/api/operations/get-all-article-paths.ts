import type { OperationContext, OperationOptions } from '@commerce/api/operations';
import { GetAllArticlePathsOperation } from '../../types/article';
import { GetAllArticlePathsQuery, GetAllArticlePathsQueryVariables } from '../../schema';
import type { ShopifyConfig, Provider } from '..';
import { getAllArticlesPathsQuery } from '../../utils';

export default function getAllArticlePathsOperation({ commerce }: OperationContext<Provider>) {
  async function getAllArticlePaths<T extends GetAllArticlePathsOperation>(opts?: {
    variables?: T['variables'];
    config?: ShopifyConfig;
  }): Promise<T['data']>;

  async function getAllArticlePaths<T extends GetAllArticlePathsOperation>(
    opts: {
      variables?: T['variables'];
      config?: ShopifyConfig;
    } & OperationOptions
  ): Promise<T['data']>;

  async function getAllArticlePaths<T extends GetAllArticlePathsOperation>({
    query = getAllArticlesPathsQuery,
    config,
    variables,
  }: {
    query?: string;
    config?: ShopifyConfig;
    variables?: T['variables'];
  } = {}): Promise<T['data']> {
    config = commerce.getConfig(config);

    const { data } = await config.fetch<GetAllArticlePathsQuery, GetAllArticlePathsQueryVariables>(query, {
      variables,
    });

    return {
      articles: data.articles.edges.map(({ node: { handle, blog } }) => ({
        handle: handle,
        blog: blog!.handle,
      })),
    };
  }

  return getAllArticlePaths;
}
