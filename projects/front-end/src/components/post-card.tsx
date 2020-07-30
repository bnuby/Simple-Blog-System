/* eslint-disable react/no-array-index-key */
import { FunctionComponent } from "react";
import PostModel from "~src/model/post.model";
import styles from "~components/post-card.module.scss";
import Date from "~components/date";
import { get } from "lodash";
import Divider from "~components/divider";
import Link from "next/link";
import IconButton from "~components/icon-button";
import Spacer from "~components/spacer";
import LikeBtn from "~components/likebtn";

interface PostCardProps {
  post: PostModel;
  href?: string;
  editable?: boolean;
  clickHandler?: (eventName: string, post: PostModel) => void;
}

const PostCard: FunctionComponent<PostCardProps> = ({
  post,
  href,
  editable,
  clickHandler,
}: PostCardProps) => {
  const fullname = `${get(post, "user.first_name", "")} ${get(
    post,
    "user.last_name",
    ""
  )}`;

  const card = (
    <div className={styles.postCard}>
      <div className={styles.titleBlk}>
        <span className={styles.title}>{post.title}</span>
        <span className={styles.userInfo}>{fullname}</span>
      </div>
      <Divider height={10} />
      <div className={styles.createdAt}>
        <span>
          <Date dateString={post.created_at} dateFormat="yyyy/MM/dd HH:mm:ss" />
        </span>
      </div>
      <Divider height={10} />
      {!post.keywords || post.keywords.length === 0 ? null : (
        <div className={styles.keywords}>
          {post.keywords.map((keyword, idx) => (
            <span key={`key${post.id}word-${idx}`} className={styles.tag}>
              {keyword}
            </span>
          ))}
        </div>
      )}
      <Divider height={10} />
      <LikeBtn number={post.likes} />
      <Divider height={10} />
      {editable ? (
        <div>
          <IconButton
            buttonType="warning"
            onClick={() => clickHandler("edit", post)}
          />
          <Spacer />
          <IconButton
            iconName="fa-trash"
            buttonType="danger"
            onClick={() => clickHandler("delete", post)}
          />
          <Spacer />
          <IconButton
            iconName="fa-info"
            buttonType="info"
            onClick={() => clickHandler("info", post)}
          />
        </div>
      ) : null}
    </div>
  );

  return href ? (
    <Link href="/posts/[id].tsx" as={href}>
      {card}
    </Link>
  ) : (
    card
  );
};

PostCard.defaultProps = {
  href: undefined,
  editable: false,
  clickHandler: () => {},
};

export default PostCard;
