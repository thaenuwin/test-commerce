const getArticleCollectionsQuery = /* GraphQL */ `
  query getArticles($first: Int!) {
    articles(first: $first) {
      edges {
        node {
          id
          handle
          title
          tags
          excerpt
          publishedAt
        }
      }
    }
  }
`;
export default getArticleCollectionsQuery;
