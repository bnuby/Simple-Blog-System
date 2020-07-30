import Link from "next/link";
import Head from "next/head";
import { useAmp } from "next/amp";
import { PageConfig } from "next";
import Card from "../../components/card";
import Layout from "../../components/layout";

export const config: PageConfig = { amp: "hybrid" };

function FirstPost(): JSX.Element {
  const isAmp = useAmp();
  return (
    <Layout>
      <div>
        {isAmp ? <h1>USING AMP!!</h1> : <h1>Normal Rendering!</h1>}
        <Head>
          <title>First Post</title>
          <meta property="og:title" content="My page title" key="title" />
          <meta property="keyword" content="" />
          <div>tset</div>
        </Head>

        {isAmp ? (
          <a href="/posts/first-post">USING AMP!!</a>
        ) : (
          <a href="/posts/first-post?amp=1">Normal Rendering!</a>
        )}
        <h1>Hello World</h1>
        <h2>
          <Link href="/">
            <a>Back to home</a>
          </Link>
        </h2>

        <Card h1="Title" content="123124" />
      </div>
    </Layout>
  );
}

export default FirstPost;
