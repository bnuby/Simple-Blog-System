import { FunctionComponent, MouseEventHandler } from "react";
import dynamic from "next/dynamic";

interface LikeBtnProp {
  number: number;
  clickHandler?: MouseEventHandler<HTMLDivElement>;
}

const likeBtn: FunctionComponent<LikeBtnProp> = ({
  number,
  clickHandler,
}: LikeBtnProp) => {
  return (
    <div
      style={{
        borderRadius: "5px",
        padding: "5px 10px",
        display: "inline-block",
        backgroundColor: "#2689ef",
        color: "white",
        cursor: "pointer",
      }}
      onClick={clickHandler}
      aria-hidden="true"
    >
      <i className="fa fa-thumbs-up" /> {number}
    </div>
  );
};

likeBtn.defaultProps = {
  clickHandler: () => {},
};

const LikeBtn = dynamic(() => Promise.resolve(likeBtn), {
  ssr: false,
});

export default LikeBtn;
