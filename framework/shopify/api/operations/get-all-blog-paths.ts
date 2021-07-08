import type { OperationContext, OperationOptions } from '@commerce/api/operations';
import { GetAllBlogPathsOperation } from '../../types/blog';
import { GetAllBlogPathsQueryVariables, GetAllBlogPathsQuery } from '../../schema';
import type { ShopifyConfig, Provider } from '..';
import { getAllBlogsPathsQuery } from '../../utils';

export default function getAllBlogPathsOperation({ commerce }: OperationContext<Provider>) {
  async function getAllBlogPaths<T extends GetAllBlogPathsOperation>(opts?: {
    variables?: T['variables'];
    config?: ShopifyConfig;
  }): Promise<T['data']>;

  async function getAllBlogPaths<T extends GetAllBlogPathsOperation>(
    opts: {
      variables?: T['variables'];
      config?: ShopifyConfig;
    } & OperationOptions
  ): Promise<T['data']>;

  async function getAllBlogPaths<T extends GetAllBlogPathsOperation>({
    query = getAllBlogsPathsQuery,
    config,
    variables,
  }: {
    query?: string;
    config?: ShopifyConfig;
    variables?: T['variables'];
  } = {}): Promise<T['data']> {
    config = commerce.getConfig(config);

    const { data } = await config.fetch<GetAllBlogPathsQuery, GetAllBlogPathsQueryVariables>(query, {
      variables,
    });

    return {
      blogs: data.blogs.edges.map(({ node: { handle } }) => ({
        slug: `/${handle}`,
      })),
    };
  }

  return getAllBlogPaths;
}
