import dynamic from "next/dynamic";
import { FunctionComponent } from "react";

const loading: FunctionComponent = () => {
  return <div>Loading...</div>;
};

const Loading = dynamic(() => Promise.resolve(loading), {
  ssr: false,
});

export default Loading;
