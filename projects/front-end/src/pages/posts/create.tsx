import { FunctionComponent, useState } from "react";
import Layout from "~components/layout";
import withAuth from "~components/withAuth";
import PostForm from "~components/post/post-form";
import { CreatePostReq, createPost } from "~src/request/post";
import { getToken } from "~lib/auth";
import { useRouter } from "next/dist/client/router";

const PostCreate: FunctionComponent = () => {
  const router = useRouter();

  const [create, setCreate] = useState<CreatePostReq>({
    title: "",
    description: "",
    keywords: [],
  });

  const inputHandler = (key: string, value: any) => {
    setCreate({ ...create, [key]: value });
  };

  const createHandler = async () => {
    const token = getToken() as string;

    const res = await createPost(create, token);
    if (res && res.status) {
      router.push("/posts");
      toastr.success("Post Created.");
    } else {
      toastr.error("Fail to Create Post");
    }
  };

  return (
    <Layout titleName="Create New Post">
      <PostForm
        formTitle="Create Post Form"
        req={create}
        onClickHandler={createHandler}
        setModel={inputHandler}
      />
    </Layout>
  );
};

export default withAuth(PostCreate);
