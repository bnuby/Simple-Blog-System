import {
  MouseEventHandler,
  CSSProperties,
  FunctionComponent,
  Ref,
  createRef,
} from "react";
import { ThemeType } from "~src/types/theme.type";

interface ButtonProp {
  iconName?: string;
  onClick?: MouseEventHandler;
  style?: CSSProperties;
  buttonType?: ThemeType;
  buttonRef?: Ref<HTMLButtonElement>;
}

const IconButton: FunctionComponent<ButtonProp> = ({
  iconName,
  onClick,
  style,
  buttonType,
  buttonRef,
}: ButtonProp) => {
  return (
    <button
      type="button"
      className={`icon-button ${buttonType}`}
      style={style}
      onClick={onClick}
      ref={buttonRef}
    >
      <i className={`fa ${iconName}`} />
    </button>
  );
};

IconButton.defaultProps = {
  iconName: "fa-pencil",
  onClick: () => {},
  style: {},
  buttonType: "primary",
  buttonRef: createRef(),
};

export default IconButton;
