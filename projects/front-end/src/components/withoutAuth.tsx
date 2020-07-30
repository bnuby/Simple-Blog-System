import { FunctionComponent } from "react";
import { useRouter } from "next/dist/client/router";
import { isBrowser } from "~lib/is-browser";
import { checkLogin } from "~lib/auth";
import Loading from "~components/loading";

const withoutAuth = (C: FunctionComponent): FunctionComponent => {
  const WithoutAuth: FunctionComponent = () => {
    // Validate Auth
    if (isBrowser) {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const router = useRouter();
      // Guard Need Login
      try {
        if (!checkLogin()) {
          return <Loading />;
        }
        router.push("/");
      } catch (e) {
      }
    }

    return <C />;
  };

  return WithoutAuth;
};

export default withoutAuth;
