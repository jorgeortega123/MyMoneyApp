import { AnimatePresence } from "framer-motion";
import React from "react";
import Alert from "./Alert";
import Error from "./Error";
import Sucess from "./Sucess";
import Warning from "./Warning";

function TypeMessage(props: {
  type: string;
  title: string;
  description: string;
  setShow: any;
  show: boolean;
}): JSX.Element {
  React.useEffect(() => {
    const res = setTimeout(() => {
      props.setShow(false);
    }, 5000);
    return () => {
      clearTimeout(res);
    };
  }, []);
  if (props.type === "success") {
    return (
      <>
        <Sucess
          show={props.show}
          title={props.title}
          description={props.description}
        />
      </>
    );
  }
  if (props.type === "warning") {
    return <Warning title={props.title} description={props.description} />;
  }
  if (props.type === "error") {
    return <Error title={props.title} description={props.description} />;
  }
  if (props.type === "alert") {
    return <Alert title={props.title} description={props.description} />;
  }
  return <></>;
}

export default TypeMessage;
