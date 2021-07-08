export const getArticleQuery = /* GraphQL */ `
  query getArticleByHandle($blog: String!, $article: String!) {
    blogByHandle(handle: $blog) {
      articleByHandle(handle: $article) {
        id
        title
        tags
        handle
        excerptHtml
        contentHtml
        content
        excerpt
        publishedAt
        url
      }
    }
  }
`;
export default getArticleQuery;
