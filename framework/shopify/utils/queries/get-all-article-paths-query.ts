const getAllArticlesPathsQuery = /* GraphQL */ `
  query getAllArticlePaths($first: Int = 250, $cursor: String) {
    articles(first: $first, after: $cursor) {
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
      edges {
        node {
          handle
          blog {
            handle
          }
        }
        cursor
      }
    }
  }
`;
export default getAllArticlesPathsQuery;
