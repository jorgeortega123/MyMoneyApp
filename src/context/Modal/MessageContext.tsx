import { createContext, useEffect } from "react";
import useM from "./useM";
//@ts-ignore
const MessageContext = createContext();
export interface IMessageContext {
  message: (data: { type: string; title: string; description: string }) => void;
}
function MessageContextComponent({ children }: { children: any }) {
  const { changeProps, showMessage } = useM();
  return (
    <MessageContext.Provider value={{ message: changeProps }}>
      {showMessage()}
      {children}
    </MessageContext.Provider>
  );
}
export { MessageContext, MessageContextComponent };
