import type { OperationContext, OperationOptions } from '@commerce/api/operations';
import { normalizeArticle } from '../../utils';
import type { ShopifyConfig, Provider } from '..';
import { Article as ShopifyArticle, GetArticleByHandleQueryVariables, GetArticleByHandleQuery } from '../../schema';
import { GetArticleOperation } from '../../types/article';
import getArticleQuery from '../../utils/queries/get-article-query';

export default function getArticleOperation({ commerce }: OperationContext<Provider>) {
  async function getArticle<T extends GetArticleOperation>(opts: {
    variables: T['variables'];
    config?: Partial<ShopifyConfig>;
    preview?: boolean;
  }): Promise<T['data']>;

  async function getArticle<T extends GetArticleOperation>(
    opts: {
      variables: T['variables'];
      config?: Partial<ShopifyConfig>;
      preview?: boolean;
    } & OperationOptions
  ): Promise<T['data']>;

  async function getArticle<T extends GetArticleOperation>({
    query = getArticleQuery,
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
    } = await fetch<GetArticleByHandleQuery, GetArticleByHandleQueryVariables>(query, {
      variables,
    });

    return {
      ...(blogByHandle!.articleByHandle && {
        article: normalizeArticle(blogByHandle!.articleByHandle as ShopifyArticle),
      }),
    };
  }

  return getArticle;
}
