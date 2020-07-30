import { FunctionComponent, useState } from "react";
import Layout from "~components/layout";
import withAuth from "~components/withAuth";
import PostForm from "~components/post/post-form";
import { getPost, updatePost, UpdatePostReq } from "~src/request/post";
import Head from "next/head";
import { getToken } from "~lib/auth";
import { useRouter } from "next/dist/client/router";

const PostEdit: FunctionComponent = () => {
  const router = useRouter();
  let post: any = {};

  const [update, setUpdate] = useState<UpdatePostReq>({
    id: "",
    title: "",
    description: "",
    keywords: [],
  });

  const { data, error } = getPost(
    {
      id: router.query.id as string,
    },
    ["id", "title", "description", "keywords"]
  );

  if (data) {
    post = data.post;
    if (!post) {
      toastr.error("Post Not Found.");
      router.push("/posts/me");
    }
    if (post.id !== update.id) {
      setUpdate(post);
    }
  }

  const inputHandler = (key: string, value: any) => {
    setUpdate({ ...update, [key]: value });
  };

  const updateHandler = async () => {
    const token = getToken() as string;

    const res = await updatePost(update, token);
    if (res && res.status) {
      router.push("/posts/me");
      toastr.success("Post Updated.");
    } else {
      toastr.error("Fail to Update Post");
    }
  };

  return (
    <Layout>
      <Head>
        <title>Edit Post Page</title>
      </Head>

      <PostForm
        formTitle="Edit Post Form"
        req={update}
        onClickHandler={updateHandler}
        setModel={inputHandler}
      />
    </Layout>
  );
};

export default withAuth(PostEdit);
