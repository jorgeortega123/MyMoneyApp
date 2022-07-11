import { createContext, useEffect, useState } from "react";
import axios from "axios";
const server = "http://127.0.0.1:4000";
export const GlobalContext = createContext({});
export function GlobalContextComponent({children}) {
  
  const [globalData, setglobalData] = useState()
  const [endServerRes, setendServerRes] = useState(false);

  useEffect(() => {
    axios
      .post(server + "/money", {
        name: "jorge593",
      })
      .then((res) => {
        setglobalData(res.data);
        setendServerRes(true);
      })
      .catch((err) => {
        console.log(err)
      });
  }, []);
 const update=()=>{
  console.log("FUNCCCCCCCCCCCAKSDASKNDATION")
  axios
      .post(server + "/money", {
        name: "jorge593",
      })
      .then((res) => {
        setglobalData(res.data);
        setendServerRes(true);
        console.log("UPDATEE")
      })
      .catch((err) => {
        console.log(err)
      });

 }
 console.log(globalData)
  return (
    <GlobalContext.Provider value={{ data: globalData , update}}>{children}</GlobalContext.Provider>
  );
}
