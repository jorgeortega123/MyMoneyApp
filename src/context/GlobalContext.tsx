import { createContext, useEffect, useState } from "react";
import axios from "axios";
const server = "https://mymone.azurewebsites.net";
//@ts-ignore
export const GlobalContext = createContext();
export function GlobalContextComponent({ children }) {
  const [globalDataa, setglobalDataa] = useState();
  const [endServerRes, setendServerRes] = useState(false);
  const [reconnect, setreconnect] = useState(false);
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
        console.log("ERRIR EN EK SERVIDOR");
        console.log(err);
      });
  }, [reconnect, endServerRes]);
  const update = () => {
    setreconnect(true);
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
      value={{ data: globalDataa, server, update, endServerRes, showConfiguration, ashowConfiguration  }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
