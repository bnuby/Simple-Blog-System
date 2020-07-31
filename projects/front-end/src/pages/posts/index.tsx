import {
  FunctionComponent,
  useState,
  createRef,
  RefObject,
  KeyboardEventHandler,
} from "react";
import { getPosts, PostsFilter } from "~src/request/post";
import PostModel from "~src/model/post.model";
import PostCard from "~components/post-card";
import styles from "~styles/pages/post/index.module.scss";
import Layout from "~components/layout";
import { getNotEmptyFilter } from "~lib/query-helper";
import InputField from "~components/input-field";
import { isBrowser } from "~lib/is-browser";
import Button from "~components/button";

/**
 * Post Index Page Props
 */
interface PostIndexProps {
  customRefs?: {
    title: RefObject<HTMLInputElement>;
    likeGte: RefObject<HTMLInputElement>;
    keywords: RefObject<HTMLInputElement>;
  };
}

/**
 * Post Index Page
 * @param param
 */
const PostIndex: FunctionComponent<PostIndexProps> = ({
  customRefs,
}: PostIndexProps) => {
  if (!customRefs) {
    throw new Error("Refs must be empty");
  }

  /**
   * declare page variable
   */
  let res: {
    total: number;
    page: number;
    totalPage: number;
    posts: PostModel[];
  } = {
    total: 0,
    page: 1,
    totalPage: 1,
    posts: [],
  };

  /**
   * Declare State for filtering, pagination
   */
  const [pageOptions, setPageOptions] = useState<{
    totalData: number;
    filters: PostsFilter;
    posts: PostModel[];
  }>({
    totalData: 0,
    filters: {
      page: 1,
      title: "",
      likeGte: 0,
    },
    posts: [] as PostModel[],
  });

  // declare temporary filter
  let postsFilter: PostsFilter = pageOptions.filters;

  /**
   * Search Post Function
   * @param page
   */
  const searchPost = (page: number) => {
    if (
      customRefs?.title.current &&
      customRefs?.likeGte.current &&
      customRefs?.keywords.current
    ) {
      postsFilter = {
        title: customRefs.title.current.value,
        likeGte: +customRefs.likeGte.current.value,
        keywords: customRefs.keywords.current.value,
      };
    }

    if (
      pageOptions.filters.title === postsFilter.title &&
      pageOptions.filters.likeGte === postsFilter.likeGte &&
      pageOptions.filters.keywords === postsFilter.keywords &&
      pageOptions.filters.page === page
    ) {
      return;
    }

    // Update State
    setPageOptions({
      ...pageOptions,
      filters: {
        page,
        title: postsFilter.title,
        likeGte: postsFilter.likeGte,
        keywords: postsFilter.keywords,
      },
      posts: res.posts,
    });
  };

  // Key Enter Handler
  const onKeyEnter: KeyboardEventHandler = (e) => {
    if (e.key === "Enter") {
      searchPost(1);
    }
  };

  // check is browser or not
  if (isBrowser) {
    // Get not empty queries
    const filter = getNotEmptyFilter(pageOptions.filters);

    // fetch post
    const { data, error } = getPosts(filter);

    // check the response is valid.
    if (data && data.posts && data.posts.data) {
      if (pageOptions.totalData !== +data.posts.total) {
        // success
        res = {
          total: data.posts.total,
          page: data.posts.page,
          totalPage: data.posts.totalPage,
          posts: [...pageOptions.posts, ...data.posts.data],
        };
        toastr.success("Fetch Post Successul");
      }
    } else if (error) {
      // fail
      toastr.error("Fetch Data Failed");
    }
  }

  // return pages.
  return (
    <Layout titleName="Home Page">
      {/* Search */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          marginBottom: "30px",
          padding: "10px",
        }}
      >
        <InputField
          style={{ width: "200px" }}
          labelText="Title"
          name="title"
          inputRef={customRefs.title}
          onKeyDown={onKeyEnter}
        />
        <InputField
          style={{ width: "200px" }}
          inputStyle={{ width: "40px" }}
          placeholder="Input Number"
          labelText="Like >="
          name="likeGte"
          type="number"
          inputRef={customRefs.likeGte}
          min={0}
          onKeyDown={onKeyEnter}
        />
        <InputField
          style={{ width: "300px" }}
          inputStyle={{ width: "40px" }}
          placeholder="Input Keyword"
          labelText="Keyword"
          name="keywords"
          type="text"
          inputRef={customRefs.keywords}
          min={0}
          onKeyDown={onKeyEnter}
        />

        <Button
          text="Search"
          onClick={() => {
            res.posts = [];
            searchPost(1);
          }}
        />
      </div>

      <div className={styles.postList}>
        {res.posts.map((post, idx) => (
          <PostCard
            href={`/posts/${post.id}`}
            post={post}
            // eslint-disable-next-line react/no-array-index-key
            key={`post-card-${idx}`}
          />
        ))}

        {res.total === res.posts.length ? (
          <p> No More Data</p>
        ) : (
          <button type="button" onClick={() => searchPost(res.page + 1)}>
            Load More
          </button>
        )}
      </div>
    </Layout>
  );
};

PostIndex.defaultProps = {
  customRefs: {
    title: createRef<HTMLInputElement>(),
    likeGte: createRef<HTMLInputElement>(),
    keywords: createRef<HTMLInputElement>(),
  },
};

export default PostIndex;
