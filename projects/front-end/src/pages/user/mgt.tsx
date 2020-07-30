import Head from "next/head";
import { GetServerSideProps } from "next";
import { checkLogin, getToken } from "~lib/auth";
import { useRouter } from "next/dist/client/router";
import { FunctionComponent } from "react";
import GuardProps from "~src/types/guard.prop";
import { get } from "https";
import { withAuth } from "~components/withAuth";
import { validateToken } from "~src/request/auth";
import Loading from "~components/loading";
import { isBrowser } from "~lib/is-browser";
import { getUser } from "~src/request/user";
import Layout from "~components/layout";

const UserMGT: FunctionComponent = () => {
  return (
    <Layout>
      <div>
        <Head>
          <title>User Management Page</title>
        </Head>
      </div>
    </Layout>
  );
};

export default withAuth(UserMGT);
