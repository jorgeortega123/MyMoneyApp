import { useContext } from "react";
import { IMessageContext, MessageContext } from "./MessageContext";

function useMessageContext() {
  const { message } = useContext(MessageContext) as IMessageContext;
  return { message };
}

export default useMessageContext;
