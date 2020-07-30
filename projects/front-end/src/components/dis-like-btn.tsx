import { FunctionComponent, MouseEventHandler } from "react";
import dynamic from "next/dynamic";

interface DisLikeBtnProp {
  clickHandler?: MouseEventHandler<HTMLDivElement>;
}

const disLikeBtn: FunctionComponent<DisLikeBtnProp> = ({
  clickHandler,
}: DisLikeBtnProp) => {
  return (
    <div
      style={{
        borderRadius: "5px",
        padding: "5px 15px",
        display: "inline-block",
        backgroundColor: "#ef2670",
        color: "white",
        cursor: "pointer",
      }}
      onClick={clickHandler}
      aria-hidden="true"
    >
      <i className="fa fa-thumbs-down" />
    </div>
  );
};

disLikeBtn.defaultProps = {
  clickHandler: () => {},
};

const DisLikeBtn = dynamic(() => Promise.resolve(disLikeBtn), {
  ssr: false,
});

export default DisLikeBtn;
