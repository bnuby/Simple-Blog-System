/* eslint-disable react-hooks/rules-of-hooks */
import { convertObjToQuery, Paginate, NodePaginate } from "~src/request/common";
import fetcher from "~lib/fetcher";
import useSWR from "swr";
import { testAuth } from "~src/config.json";

interface UserFilter {
  first_name?: string;
  last_name?: string;
  email?: string;
  ageGte?: number;
}

interface UsersFilter extends UserFilter, Paginate {}

interface UserPaginateFilter extends UserFilter, NodePaginate {}

/**
 * Get User
 * @param opts
 * @param columns
 */
export const getUser = (
  opts: UserFilter = {},
  columns: string[] = ["full_name", "first_name", "last_name", "email", "age"]
): any => {
  const args = convertObjToQuery(opts);

  const query = `
  {
    user
      ${args.length ? `(${args})` : ""} 
      {
        ${columns.join("\n")}
    }
  }
`;

  return useSWR([query], fetcher);
};

/**
 * Get Users With Paginate
 * @param opts
 * @param columns
 */
export const getUsers = (
  opts: UsersFilter = {},
  columns: string[] = ["full_name", "first_name", "last_name", "email", "age"],
  authToken?: string
): any => {
  const queries = convertObjToQuery(opts);

  const query = `
  {
    users
      ${queries.length ? `(${queries})` : ""} 
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

  return useSWR([query, authToken], fetcher);
};

/**
 * Get Users With Node Paginate
 * @param opts
 * @param columns
 */
export const getUserPaginate = (
  opts: UserPaginateFilter = {},
  columns: string[] = ["full_name", "first_name", "last_name", "email", "age"],
  authToken?: string
): any => {
  const queries = convertObjToQuery(opts);

  const query = `
    {
      userPaginate
        ${queries.length ? `(${queries})` : ""} 
        {
          hasNextPage
          totalCount
          currentCursor

          edges {
            cursor
            node {
              ${columns.join("\n")}
            }
          }
        }
    }
  `;

  return useSWR([query, authToken], fetcher);
};

interface CreateUserReq {
  fisrt_name: string;
  last_name: string;
  email: string;
  password: string;
  age: number;
}

/**
 * Create User
 * @param create
 */
export const createUser = (create: CreateUserReq, authToken: string): any => {
  const dto = convertObjToQuery(create);

  const query = `
    mutation {
      createUser(create: {
        ${dto}
      })
    } {
      status
      code
    }
  `;

  return useSWR([query, testAuth], fetcher);
};
