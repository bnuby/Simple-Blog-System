import fetcher from "~lib/fetcher";
import useSWR from "swr";

export interface LoginReq {
  email: string;
  password: string;
}

/**
 * Login User
 * @param opts
 */
export const loginUser = async (opts: LoginReq): Promise<any> => {
  try {
    const query = `
      mutation {
        loginUser(login: {
          email: "${opts.email}"
          password: "${opts.password}"
        }) {
          data
          status
        }
      }
  `;

    // eslint-disable-next-line react-hooks/rules-of-hooks
    return (await fetcher(query)).loginUser;
  } catch (e) {
    console.error(e.message);
    return null;
  }
};

/**
 * Validate Token
 * @param token
 */
export const validateToken = (token: string): any => {
  try {
    const query = `
      mutation {
        validateToken(token:"${token}") {
          id
          first_name
          last_name
          full_name
          age
          email
          created_at
          last_login_date
          posts {
            totalCount
          }
        }
      }
  `;

    return useSWR([query], fetcher);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    // return (await fetcher(query)).validateToken;
  } catch (e) {
    console.error(e.message);
    return null;
  }
};
