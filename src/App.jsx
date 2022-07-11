import { useEffect, useState } from "react";
import "./index.css";
import "./data.json";
import DetailsExpendsWeek from "./components/DetailsExpendsWeek";
import ServerOut from "./components/subComponents/ServerOut";
import { SpinnerDiamond } from "spinners-react";
import Skeleton from "@mui/material/Skeleton";
import { PieDiagramHome } from "./components/PieDiagramHome";
//import PieDiagramTextInfo from "./components/PieDiagramTextInfo";
import AddMoveCash from "./components/AddMoveCash";
//import { data, serverRes } from "./dataSimulateServer";
import axios from "axios";
import useGlobalContext from "./context/useGlobalContext";
import { GlobalContextComponent } from "./context/GlobalContext";
import { MessageContextComponent } from "./context/Modal/MessageContext";
const server = "http://127.0.0.1:4000";

function App() {
  const [onErrorServerOut, setonErrorServerOut] = useState(false)
  const [serverResponsive, setserverResponsive] = useState();
  const [endServerRes, setendServerRes] = useState(false);
  ///////
  useEffect(() => {
    axios
      .post(server + "/money", {
        name: "jorge593",
      })
      .then((res) => {
        setserverResponsive(res.data);
        setendServerRes(true);
        //console.log(res.data);
      })
      .catch((err) => {
        setonErrorServerOut(true)
      });
  }, []);
  //console.log(serverResponsive);
  //const { context } = useGlobalContext();
  //console.log(context);

  //////

  return (

    <MessageContextComponent>    <GlobalContextComponent>
      <div className="blockAllSelect h-screen w-full absolute top-0 bg-white dark:bg-black">
        <div className=" h-[40px] text-3xl font-bold underline flex justify-center border rounded-xl bg-slate-200">
          <p className="blockAllSelect ">MyMoney</p>
        </div>
     {!onErrorServerOut ? (
      <>
        <div className="p-2 w-full h-auto flex flex-col  space-y-2 justify-center space-x-2 sm:flex-col sm:space-y-2 lg:flex-row ">
          {endServerRes ? (
            <PieDiagramHome dataPie={serverResponsive} />
          ) : (
            <div className="pt-12 mr-auto ml-auto">
              <SpinnerDiamond size={120} />
            </div>
          )}
          {endServerRes ? (
            <DetailsExpendsWeek data={serverResponsive} />
          ) : (
            <p></p>
          )}
        </div>
        <div className="p-3 flex justify-center w-full border-spacing-2 rounded sm:justify-left  ">
          {endServerRes ? (
            <div className="grow md:grow-0">
            <AddMoveCash dataServer={serverResponsive} />
            </div>
          ) : (
            <p></p>
          )}
        </div></>
      ) : <ServerOut />} 
      </div>
    </GlobalContextComponent>
    </MessageContextComponent>

  );
}

export default App;
