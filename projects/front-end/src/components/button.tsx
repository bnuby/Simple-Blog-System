import { MouseEventHandler, CSSProperties, FunctionComponent, Ref, createRef } from "react";
import { ThemeType } from "~src/types/theme.type";

interface ButtonProp {
  text?: string;
  onClick?: MouseEventHandler;
  style?: CSSProperties;
  buttonType?: ThemeType;
  buttonRef?: Ref<HTMLButtonElement>;
}

const Button: FunctionComponent<ButtonProp> = ({
  text,
  onClick,
  style,
  buttonType,
  buttonRef,
}: ButtonProp) => {
  return (
    <button
      type="button"
      className={`button ${buttonType}`}
      style={style}
      onClick={onClick}
      ref={buttonRef}
    >
      {text}
    </button>
  );
};

Button.defaultProps = {
  text: "Button",
  onClick: () => {},
  style: {},
  buttonType: "primary",
  buttonRef: createRef(),
};

export default Button;
