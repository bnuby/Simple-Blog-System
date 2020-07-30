/* eslint-disable react-hooks/rules-of-hooks */
import { convertObjToQuery, Paginate, NodePaginate } from "~src/request/common";
import fetcher from "~lib/fetcher";
import useSWR from "swr";
import { isBrowser } from "~lib/is-browser";

export interface PostFilter {
  id?: string;
  title?: string;
  description?: string;
  likeGte?: number;
  user_id?: string;
}

export interface PostsFilter extends PostFilter, Paginate {}

export interface PostPaginateFilter extends PostFilter, NodePaginate {}

export interface CreatePostReq {
  id?: string;
  title?: string;
  description?: string;
  keywords?: string[];
}

export interface UpdatePostReq {
  id?: string;
  title?: string;
  description?: string;
  keywords?: string[];
}

/**
 * Get User
 * @param opts
 * @param columns
 */
export const getPost = (
  opts: PostFilter = {},
  columns: string[] = [
    "id",
    "title",
    "description",
    "likes",
    "like_users { id first_name last_name }",
    "user_id",
    "user { first_name last_name }",
    "keywords",
    "created_at",
    "updated_at",
  ]
): any => {
  const args = convertObjToQuery(opts);

  const query = `
  {
    post
      ${args.length ? `(${args})` : ""} 
      {
        ${columns.join("\n")}
    }
  }
`;

  if (isBrowser) {
    return useSWR([query], fetcher);
  }

  return fetcher(query);
};
/**
 * Get User
 * @param opts
 * @param columns
 */
export const getPosts = (
  opts: PostsFilter = {},
  columns: string[] = [
    "id",
    "title",
    "description",
    "likes",
    "like_users { id first_name last_name }",
    "user { first_name last_name }",
    "user_id",
    "keywords",
    "created_at",
    "updated_at",
  ]
): any => {
  const args = convertObjToQuery(opts);

  const query = `
  {
    posts
      ${args.length ? `(${args})` : ""} 
      {
        total
        page
        totalPage
        data {
          ${columns.join("\n")}
        }
      }
  }
`;

  return useSWR([query], fetcher);
};

/**
 * Create Post
 * @param opts
 */
export const createPost = async (
  create: CreatePostReq,
  token: string
): Promise<any> => {
  const args = convertObjToQuery(create);

  try {
    const query = `
      mutation {
        createPost(create: {
          ${args}
        }) {
          data {
            id
            title
            description
            likes
          }
          status
        }
      }
  `;

    // eslint-disable-next-line react-hooks/rules-of-hooks
    return (await fetcher(query, token)).createPost;
  } catch (e) {
    console.error(e.message);
    return null;
  }
};

/**
 * Delete Post
 * @param opts
 */
export const deletePost = async (
  post_id: string,
  token: string
): Promise<any> => {
  try {
    const query = `
      mutation {
        deletePost(post_id: "${post_id}") {
          status
        }
      }
  `;

    // eslint-disable-next-line react-hooks/rules-of-hooks
    return (await fetcher(query, token)).deletePost;
  } catch (e) {
    console.error(e.message);
    return null;
  }
};

/**
 * Update Post
 * @param opts
 */
export const updatePost = async (
  opts: UpdatePostReq,
  token: string
): Promise<any> => {
  opts = { ...opts };
  const post_id = opts.id;
  delete opts.id;
  const args = convertObjToQuery(opts);

  try {
    const query = `
      mutation {
        updatePost(
          post_id: "${post_id}"
          update: {
            ${args}
          }) {
          status
        }
      }
  `;

    // eslint-disable-next-line react-hooks/rules-of-hooks
    return (await fetcher(query, token)).updatePost;
  } catch (e) {
    console.error(e.message);
    return null;
  }
};

export const likePost = async (
  post_id: string,
  token: string
): Promise<any> => {
  try {
    const query = `
    mutation {
      likePost(post_id:"${post_id}") {
          status
      }
    }
  `;

    // eslint-disable-next-line react-hooks/rules-of-hooks
    return (await fetcher(query, token)).likePost;
  } catch (e) {
    console.error(e.message);
    return null;
  }
};

export const unLikePost = async (
  post_id: string,
  token: string
): Promise<any> => {
  try {
    const query = `
    mutation {
      unlikePost(post_id:"${post_id}") {
          status
      }
    }
  `;

    // eslint-disable-next-line react-hooks/rules-of-hooks
    return (await fetcher(query, token)).unlikePost;
  } catch (e) {
    console.error(e.message);
    return null;
  }
};
