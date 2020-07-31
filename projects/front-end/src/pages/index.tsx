import { useRouter } from "next/dist/client/router";
import { isBrowser } from "~lib/is-browser";

/**
 * Do Redirect routes
 */
export default (): JSX.Element => {
  if (isBrowser) {
    // redirect to the post page.
    const router = useRouter();
    router.push("/posts");
  }

  return <div />;
};
