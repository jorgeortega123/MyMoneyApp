import React, { useState } from "react";
import TypeMessage from "../messages/TypeMessage"
function useM() {
  const [show, setShow] = useState<boolean>(false);
  const [data, setData] = useState<{
    type: string;
    title: string;
    description: string;
  }>({
    type: "",
    title: "",
    description: "",
  });
  const showMessage = () => {
    return show ? (
      <TypeMessage
        type={data.type}
        title={data.title}
        description={data.description}
        setShow={setShow}
        show={show}
      />
    ) : (
      ""
    );
  };
  const changeProps = (data: {
    type: string;
    title: string;
    description: string;
  }|undefined) => {
    if (data == undefined) {
      return "";
    } else {
      setData(data);
      setShow(true);
    }
  };
  return { showMessage, changeProps };
}

export default useM;
