import { createContext, useEffect, useState } from "react";
import axios from "axios";
const server = "https://que-pasa-tronco.koyeb.app";
const serve = 'http://127.0.0.1:5000'
//@ts-ignore
export const GlobalContext = createContext();
export function GlobalContextComponent({ children }) {
  const [globalDataa, setglobalDataa] = useState();
  const [endServerRes, setendServerRes] = useState(false);
  const [reconnect, setreconnect] = useState(false);
  const [addMoveCashTrans, setaddMoveCashTrans] = useState(0)
 const [ashowConfiguration, asetshowConfiguration] = useState(false)
  useEffect(() => {
    //localStorage.getItem("token")
    //
    var d = new Date();
    var dayName = d.toString().split(" ")[0];
    axios
      .post(server + "/money", {
        name: localStorage.getItem("token"),
        date: { 
          day: dayName
        }
      })
      .then((res) => {
        setglobalDataa(res.data);
        setendServerRes(true);
        //console.log(globalData)
      })
      .catch((err) => {
        console.log('server error')
        console.log(err);
      });
  }, [reconnect, endServerRes]);
  const update = () => {
     setaddMoveCashTrans((e)=> e + 1)
    setreconnect(true);
    setendServerRes(false)
  };
const showConfiguration = (s:boolean) => { 
  console.log(s)
  if (s===true) { 
    asetshowConfiguration(true)
    return true
  } else { 
    asetshowConfiguration(false)
    return false
  }
}
  return (
    <GlobalContext.Provider
      value={{ data: globalDataa, server, update, endServerRes, showConfiguration, ashowConfiguration, addMoveCashTrans  }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
