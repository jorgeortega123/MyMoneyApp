import { createContext, useEffect, useState } from "react";
import axios from "axios";
const server = "https://mymone.azurewebsites.net";
//@ts-ignore
export const GlobalContext = createContext();
export function GlobalContextComponent({ children }) {
  const [globalDataa, setglobalDataa] = useState();
  const [endServerRes, setendServerRes] = useState(false);
  const [reconnect, setreconnect] = useState(false);

  useEffect(() => {
    //localStorage.getItem("token")
    axios
      .post(server + "/money", {
        name: localStorage.getItem("token"),
      })
      .then((res) => {
        setglobalDataa(res.data);
        setendServerRes(true);
        //console.log(globalData)
      })
      .catch((err) => {
        console.log("ERRIR EN EK SERVIDOR");
        console.log(err);
      });
  }, [reconnect, endServerRes]);
  const update = () => {
    setreconnect(true);
  };

  return (
    <GlobalContext.Provider
      value={{ data: globalDataa, server, update, endServerRes }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
