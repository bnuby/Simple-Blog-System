/* eslint-disable no-param-reassign */
import React, { FunctionComponent } from "react";
import { checkLogin } from "~lib/auth";
import { isBrowser } from "~lib/is-browser";
import Loading from "~components/loading";
import { useRouter } from "next/dist/client/router";

export const withAuth = (C: FunctionComponent): FunctionComponent => {
  const WithAuth: FunctionComponent = () => {
    // Validate Auth
    if (isBrowser) {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const router = useRouter();
      // Guard Need Login
      try {
        if (!checkLogin()) {
          return <Loading />;
        }
      } catch (e) {
        router.replace("/login");
      }
    }

    return <C />;
  };

  return WithAuth;
};

export default withAuth;
