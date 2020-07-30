import Head from "next/head";
import Link from "next/link";
import utilStyles from "~styles/utils.module.scss";
import Layout from "~components/layout";
import { getSortedPostsData, Post } from "~lib/post";
import { GetServerSideProps } from "next";
import { getUser, getUsers, getUserPaginate } from "~src/request/user";
import Date from "~components/date";
import { ServerResponse, ClientRequest } from "http";
import { useRouter } from "next/dist/client/router";
import { isBrowser } from "~lib/is-browser";
import { getToken } from "~lib/auth";

// // eslint-disable-next-line @typescript-eslint/no-unused-expressions
// // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
// export async function getStaticProps() {
//   const allPostsData = getSortedPostsData();
//   return {
//     props: {
//       allPostsData,
//     },
//   };
// }

export default () => {
  if (isBrowser) {
    // redirect to the post page.
    const router = useRouter();
    router.push("/posts");
  }

  return (
    <div></div>
  );
};
