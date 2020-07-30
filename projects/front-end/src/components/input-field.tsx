import dynamic from "next/dynamic";
import {
  createRef,
  RefObject,
  CSSProperties,
  FunctionComponent,
  ChangeEvent,
  KeyboardEvent,
  ChangeEventHandler,
  KeyboardEventHandler,
} from "react";
import GetId from "~lib/get-id";

interface InputFieldProp {
  noLabel?: boolean;
  labelText?: string;
  value?: string;
  name: string;
  type?: string;
  placeholder?: string;
  inputRef?: RefObject;
  onChange?: ChangeEventHandler;
  onKeyDown?: KeyboardEventHandler;
  style?: CSSProperties;
  labelStyle?: CSSProperties;
  inputStyle?: CSSProperties;
  autocomplete?: string;
  min?: number;
}

const inputField: FunctionComponent<InputFieldProp> = ({
  noLabel,
  labelText,
  value,
  name,
  type,
  placeholder,
  inputRef,
  onChange,
  onKeyDown,
  style,
  labelStyle,
  inputStyle,
  autocomplete,
  min,
}: InputFieldProp) => {
  const id = GetId("input-");

  const input = (
    <input
      id={id}
      style={inputStyle}
      ref={inputRef}
      name={name}
      type={type}
      onChange={onChange}
      onKeyDown={onKeyDown}
      placeholder={placeholder}
      defaultValue={value}
      autoComplete={autocomplete}
      min={min}
    />
  );

  const textArea = (
    <textarea
      id={id}
      style={inputStyle}
      itemRef={inputRef}
      onChange={onChange}
      onKeyDown={onKeyDown}
      name={name}
      type={type}
      placeholder={placeholder}
      defaultValue={value}
      autoComplete={autocomplete}
      rows={3}
    />
  );

  return (
    <div className="input-group" style={style}>
      {noLabel ? null : (
        <label style={labelStyle} htmlFor={id}>
          {labelText}
        </label>
      )}
      {type === "textarea" ? textArea : input}
    </div>
  );
};

inputField.defaultProps = {
  noLabel: false,
  labelText: "Label",
  value: "",
  type: "text",
  placeholder: "Input Text",
  inputRef: createRef(),
  onChange: () => {},
  onKeyDown: () => {},
  style: {},
  labelStyle: {},
  inputStyle: {},
  autocomplete: "off",
  min: -999,
};

const InputField = dynamic(() => Promise.resolve(inputField), {
  ssr: false,
});

export default InputField;
