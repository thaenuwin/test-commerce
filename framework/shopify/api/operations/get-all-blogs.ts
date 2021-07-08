import type { OperationContext, OperationOptions } from '@commerce/api/operations';
import { BlogEdge, GetBlogsQueryVariables, GetBlogsQuery } from '../../schema';
import { normalizeBlogs } from '../../utils';
import type { ShopifyConfig, Provider } from '..';
import type { GetAllBlogsOperation } from '../../types/blog';
import getAllBlogsQuery from '../../utils/queries/get-all-blogs-query';

export default function getAllBlogsOperation({ commerce }: OperationContext<Provider>) {
  async function getAllBlogs<T extends GetAllBlogsOperation>(opts?: {
    variables?: T['variables'];
    config?: Partial<ShopifyConfig>;
    preview?: boolean;
  }): Promise<T['data']>;

  async function getAllBlogs<T extends GetAllBlogsOperation>(
    opts: {
      variables?: T['variables'];
      config?: Partial<ShopifyConfig>;
      preview?: boolean;
    } & OperationOptions
  ): Promise<T['data']>;

  async function getAllBlogs<T extends GetAllBlogsOperation>({
    query = getAllBlogsQuery,
    config,
    variables,
  }: {
    url?: string;
    config?: Partial<ShopifyConfig>;
    variables?: GetBlogsQueryVariables;
    preview?: boolean;
    query?: string;
  } = {}): Promise<T['data']> {
    const { fetch } = commerce.getConfig(config);

    const { data } = await fetch<GetBlogsQuery, GetBlogsQueryVariables>(query, {
      variables,
    });

    return {
      blogs: normalizeBlogs(data.blogs.edges as BlogEdge[]),
    };
  }

  return getAllBlogs;
}
