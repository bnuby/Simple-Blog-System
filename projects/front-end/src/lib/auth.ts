import { isBrowser } from "./is-browser";
import { validateToken } from "~src/request/auth";
import { authTokenKey, userKey } from "~src/config.json";
import UserModel from "~src/model/user.model";
import { get } from "lodash";

/**
 * Get User Info
 */
export const getLocalUser = (): UserModel | null => {
  if (!isBrowser) {
    return {};
  }

  const userString = localStorage.getItem(userKey);
  if (!userString) return null;
  return JSON.parse(userString);
};

/**
 * Set User
 * @param user
 */
export const setUser = (user: UserModel): void => {
  localStorage.setItem(userKey, JSON.stringify(user));
};

/**
 * Set Token
 * @param token
 */
export const setToken = (token: string): void => {
  localStorage.setItem(authTokenKey, token);
};

/**
 * Set Token
 * @param token
 */
export const getToken = (): string | null => {
  if (!isBrowser) {
    return null;
  }

  return localStorage.getItem(authTokenKey);
};

/**
 * Logout Clear Storage Data
 */
export const logout: VoidFunction = () => {
  // Remove Auth Token
  localStorage.removeItem(authTokenKey);
  // Remove User Data
  localStorage.removeItem(userKey);
};

/**
 * Check token is validated or not.
 */
export const checkLogin: () => boolean = () => {
  let res;
  const token = localStorage.getItem(authTokenKey);

  // Token
  if (!token) {
    logout();
    throw new Error("Invalid Token");
  }

  let user: UserModel | null;
  // Validate User Token And get User Info;
  res = validateToken(token);
  if (res == null || (res.data == null && res.error == null)) {
    return false;
  }

  user = get(res, "data.validateToken", null);

  // User
  if (!user) {
    logout();
    throw new Error("Invalid Token");
  }

  // Save User Info
  localStorage.setItem(userKey, JSON.stringify(user));

  return true;
};
