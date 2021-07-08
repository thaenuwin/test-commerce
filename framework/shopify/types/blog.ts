export type Blog = {
  id: string;
  handle: string;
  title: string;
  url?: string;
  slug?: string;
  path?: string;
  articleByHandle?: any;
};

export type BlogTypes = {
  blog: Blog;
};

export type GetAllBlogsOperation<T extends BlogTypes = BlogTypes> = {
  data: { blogs: T['blog'][] };
  variables: {
    first: number;
  };
};

export type GetBlogOperation<T extends BlogTypes = BlogTypes> = {
  data: { blog?: T['blog'] };
  variables: { slug: string };
};

export type GetAllBlogPathsOperation<T extends BlogTypes = BlogTypes> = {
  data: { blogs: Pick<T['blog'], 'slug'>[] };
  variables: { first?: number };
};
