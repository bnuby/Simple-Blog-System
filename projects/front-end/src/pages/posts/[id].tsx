import Layout from "~components/layout";
import Head from "next/head";
import Date from "~components/date";
import utilStyles from "~styles/utils.module.scss";
import { GetServerSideProps } from "next";
import { getPost, likePost, unLikePost } from "~src/request/post";
import PostModel from "~src/model/post.model";
import { get } from "lodash";
import LikeBtn from "~components/likebtn";
import Divider from "~components/divider";
import DisLikeBtn from "~components/dis-like-btn";
import Spacer from "~components/spacer";
import { getToken } from "~lib/auth";
import Router from "next/router";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  let postData = null;
  if (params) {
    const id = params.id as string;
    postData = (await getPost({ id })).post;
  }

  return {
    props: {
      postData,
    },
  };
};

export default function DynamicPost({
  postData,
}: {
  postData: PostModel;
}): JSX.Element {
  const fullName = `${get(postData, "user.first_name", "")} ${get(
    postData,
    "user.last_name",
    ""
  )}`;

  const token = getToken() as string;

  const likeHandler: any = async (post_id: string) => {
    const res = await likePost(post_id, token);
    if (res.status) {
      Router.reload();
      toastr.success("Post Liked!");
    }
  };

  const unLikeHandler: any = async (post_id: string) => {
    const res = await unLikePost(post_id, token);
    if (res.status) {
      Router.reload();
      toastr.success("Post unLiked!");
    }
  };

  return (
    <Layout titleName={`${postData.title} - ${fullName}`}>
      <Head>
        <meta name="description" content={postData.description} />
        <meta name="keywords" content={postData.keywords.join(", ")} />
        <meta name="author" content={fullName} />
      </Head>
      <div
        style={{
          margin: "auto",
          maxWidth: "900px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h1 className={utilStyles.heading2Xl}>{fullName}</h1>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        {postData.created_at ? (
          <div className={utilStyles.lightText}>
            <Date
              dateString={postData.created_at}
              dateFormat="yyyy/MM/dd HH:mm:ss"
            />
          </div>
        ) : null}
        <Divider height={15} />
        {token ? (
          <div>
            <LikeBtn
              clickHandler={() => likeHandler(postData.id)}
              number={postData.likes}
            />
            <Spacer />
            <DisLikeBtn clickHandler={() => unLikeHandler(postData.id)} />
          </div>
        ) : null}

        <div className={utilStyles.content}>
          <div
            className={utilStyles.headingMd}
            dangerouslySetInnerHTML={{ __html: postData.description }}
          />
        </div>
      </div>
    </Layout>
  );
}
