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
import { lang } from "./dataSimulateServer";
import { display } from "@mui/system";
import { AnimatePresence, motion } from "framer-motion";
const server = "http://127.0.0.1:4000";

function App() {
  const [onErrorServerOut, setonErrorServerOut] = useState(false);
  const [serverResponsive, setserverResponsive] = useState();
  const [endServerRes, setendServerRes] = useState(false);
  const [finalLang, setfinalLang] = useState();
  ///////
  useEffect(() => {
    var langByUser = localStorage.getItem("lang");
    if (!langByUser) {
      setfinalLang(lang.en);
    } else {
      if (!lang[langByUser]) {
        setfinalLang(lang.en);
      }
      setfinalLang(lang[langByUser]);
    }
    axios
      .post(server + "/money", {
        name: "jorge593",
      })
      .then((res) => {
        setserverResponsive(res.data);
        setTimeout(() => {
          setendServerRes(true);
        }, 1000);

        //console.log(res.data);
      })
      .catch((err) => {
        setonErrorServerOut(true);
      });
  }, []);
  const animate = () => {};
  //console.log(serverResponsive);
  //const { context } = useGlobalContext();
  //console.log(context);

  //////

  return (
    <MessageContextComponent>
      {" "}
      <GlobalContextComponent>
        <div className="blockAllSelect h-screen w-full absolute top-0 bg-white dark:bg-black">
          <div className="relative h-[40px] text-3xl font-bold underline flex justify-center border  bg-slate-200">
            <motion.p
              initial={{ x: "-100vh", opacity: 0, rotateX: 420 }}
              animate={{ x: 0, opacity: 5, rotateX: 0 }}
              exit={{ y: "-100vw", opacity: 0 }}
              transition={{
                type: "spring",
                duration: 1,
              }}
              className="absolute blockAllSelect underline "
            >
              MyMoney
            </motion.p>
            <div class="pb-0 mx-auto flex flex-col w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <div
                class="mb-0 bg-blue-600 h-0.5 rounded-full"
                style={{
                  width: "60%",
                  display: "none",
                  scrollBehavior: "smooth",
                }}
              ></div>
            </div>
          </div>

          {!onErrorServerOut ? (
            <>
              <div className="p-2 w-full h-auto flex flex-col  sm:space-y-2 md:space-y-0 space-y-2 justify-center space-x-0 sm:space-x-0 md:space-x-2 sm:flex-col  lg:flex-row ">
                {endServerRes ? (
                  <PieDiagramHome lang={finalLang} />
                ) : (
                  <div className="pt-12 mr-auto ml-auto">
                    <SpinnerDiamond size={120} />
                  </div>
                )}
                {endServerRes ? (
                  
                    <DetailsExpendsWeek lang={finalLang} />
                 
                ) : (
                  <p></p>
                )}
              </div>
              <div className=" p-3 flex justify-center w-full border-spacing-2 rounded sm:justify-left  ">
                {endServerRes ? (
                 
                  <div className="grow md:grow-0">
                     <motion.div
                  initial={{ y: "100vh", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 2,
                  }}
                 >
                    <AddMoveCash lang={finalLang} />
                    </motion.div>
                  </div>
                  
                ) : (
                  <p></p>
                )}
              </div>
            </>
          ) : (
            <ServerOut />
          )}
        </div>
      </GlobalContextComponent>
    </MessageContextComponent>
  );
}

export default App;
