export const getBlogQuery = /* GraphQL */ `
  query getBlog($slug: String!) {
    blogByHandle(handle: $slug) {
      id
      handle
      title
      url
      seo {
        description
        title
      }
    }
  }
`;
export default getBlogQuery;
