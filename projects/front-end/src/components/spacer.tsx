import { FunctionComponent } from "react";
import dynamic from "next/dynamic";

interface SpacerProps {
  width?: number;
}

const spacer: FunctionComponent<SpacerProps> = ({ width }) => {
  return <div style={{ display: "inline-block", width: `${width}px` }} />;
};

spacer.defaultProps = {
  width: 5,
};

const Spacer = dynamic(() => Promise.resolve(spacer), {
  ssr: false,
});

export default Spacer;
