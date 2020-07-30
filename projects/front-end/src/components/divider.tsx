import { FunctionComponent } from "react";
import dynamic from "next/dynamic";

interface DividerProps {
  height?: number;
}

const divider: FunctionComponent<DividerProps> = ({ height }) => {
  return <div style={{ height: `${height}px` }} />;
};

divider.defaultProps = {
  height: 5,
};

const Divider = dynamic(() => Promise.resolve(divider), {
  ssr: false,
});

export default Divider;
