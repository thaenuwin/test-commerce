import type { OperationContext, OperationOptions } from '@commerce/api/operations';
import { normalizeBlog } from '../../utils';
import type { ShopifyConfig, Provider } from '..';
import { Blog as ShopifyBlog, GetBlogQuery, GetBlogQueryVariables } from '../../schema';
import { GetBlogOperation } from '../../types/blog';
import getBlogQuery from '../../utils/queries/get-blog-query';

export default function getBlogOperation({ commerce }: OperationContext<Provider>) {
  async function getBlog<T extends GetBlogOperation>(opts: {
    variables: T['variables'];
    config?: Partial<ShopifyConfig>;
    preview?: boolean;
  }): Promise<T['data']>;

  async function getBlog<T extends GetBlogOperation>(
    opts: {
      variables: T['variables'];
      config?: Partial<ShopifyConfig>;
      preview?: boolean;
    } & OperationOptions
  ): Promise<T['data']>;

  async function getBlog<T extends GetBlogOperation>({
    query = getBlogQuery,
    variables,
    config,
  }: {
    query?: string;
    variables: T['variables'];
    config?: Partial<ShopifyConfig>;
    preview?: boolean;
  }): Promise<T['data']> {
    const { fetch } = commerce.getConfig(config);

    const {
      data: { blogByHandle },
    } = await fetch<GetBlogQuery, GetBlogQueryVariables>(query, {
      variables,
    });

    return {
      ...(blogByHandle && {
        blog: normalizeBlog(blogByHandle as ShopifyBlog),
      }),
    };
  }

  return getBlog;
}
