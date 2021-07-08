const getBlogCollectionsQuery = /* GraphQL */ `
  query getBlogs($first: Int!) {
    blogs(first: $first) {
      edges {
        node {
          id
          title
          handle
        }
      }
    }
  }
`;
export default getBlogCollectionsQuery;
