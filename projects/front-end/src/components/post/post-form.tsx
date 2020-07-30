import styles from "~src/styles/form.module.scss";
import { FunctionComponent, ChangeEvent, MouseEventHandler } from "react";
import InputField from "~components/input-field";
import Divider from "~components/divider";
import Button from "~components/button";
import dynamic from "next/dynamic";
import { CreatePostReq, UpdatePostReq, getPost } from "~src/request/post";
import { useRouter, Router } from "next/dist/client/router";
import { isBrowser } from "~lib/is-browser";
import PostModel from "~src/model/post.model";

interface PostFormProps {
  formTitle: string;
  req: CreatePostReq | UpdatePostReq;
  setModel: (key: string, value: any) => void;
  onClickHandler: MouseEventHandler;
}

const postForm: FunctionComponent<PostFormProps> = ({
  formTitle,
  req,
  setModel,
  onClickHandler,
}) => {
  /**
   * On Input Change
   * @param e
   */
  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    let tempValue: string | string[] = e.currentTarget.value;
    if (e.currentTarget.name === "keywords") {
      tempValue = tempValue.split(/ *, */);
    }

    /**
     * Set Model
     */
    setModel(e.currentTarget.name, tempValue);
  };

  return (
    <form className={styles.form}>
      <h2>{formTitle}</h2>
      <Divider height={30} />
      <div className={styles.formRow}>
        <InputField
          labelStyle={{ width: "90px" }}
          placeholder="Insert title"
          labelText="Title"
          name="title"
          value={req.title}
          onChange={onInputChange}
        />
      </div>
      <div className={styles.formRow}>
        <InputField
          labelStyle={{ width: "90px" }}
          placeholder="Insert description"
          labelText="Description"
          name="description"
          type="textarea"
          value={req.description}
          onChange={onInputChange}
        />
      </div>
      <div className={styles.formRow}>
        <InputField
          labelStyle={{ width: "90px" }}
          placeholder="Input multiple with comma"
          labelText="Keywords"
          name="keywords"
          value={(req.keywords || []).join(",")}
          onChange={onInputChange}
        />
      </div>

      <Divider height={50} />

      <div style={{ textAlign: "right" }}>
        <Button text={req.id ? "Update" : "Create"} onClick={onClickHandler} />
      </div>
    </form>
  );
};

const PostForm = dynamic(() => Promise.resolve(postForm), {
  ssr: false,
});

export default PostForm;
