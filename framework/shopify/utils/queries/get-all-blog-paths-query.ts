const getAllBlogsPathsQuery = /* GraphQL */ `
  query getAllBlogPaths($first: Int = 250, $cursor: String) {
    blogs(first: $first, after: $cursor) {
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
      edges {
        node {
          handle
        }
        cursor
      }
    }
  }
`;
export default getAllBlogsPathsQuery;
