import React, { useEffect, useLayoutEffect, useState } from "react";
import AddMoveCash from "./components/myMoney/elements/AddMoveCash.jsx";
//src/components/myMoney/elements/AddMoveCash.jsx
import DetailsExpendsWeek from "./components/myMoney/elements/DetailsExpendsWeek";
import Login from "./components/login";
import CahrgingData from "./components/myMoney/elements/subComponents/CahrgingData";
import ServerOut from "./components/myMoney/elements/subComponents/ServerOut";
import useGlobalContext from "./context/useGlobalContext";
import { PieDiagramHome } from "./components/myMoney/elements/PieDiagramHome";
import { AnimatePresence, motion } from "framer-motion";
import { MessageContextComponent } from "./context/Modal/MessageContext";
import { useNavigate } from "react-router-dom";
import { lang, phrases } from "./dataSimulateServer";
import { SpinnerInfinity } from "spinners-react";
import ToDay from "./components/myMoney/elements/ToDay";
import Configurations from "./components/myMoney/elements/subComponents/Configurations";
import AddIncomingCash from "./components/myMoney/elements/AddIncomingCash";
import TableFromDebts from "./components/myMoney/elements/subComponents/TableFromDebts";
import axios from "axios";
import BarChart from "./components/myMoney/elements/subComponents/BarChart.jsx";
import TextInitial from "./components/myMoney/elements/TextInitial/index";
import StrictMode from "./components/myMoney/elements/StrictMode.jsx";
export default function MainPage() {
  const { context } = useGlobalContext();
  const [showConfigg, setshowConfigg] = useState(false);
  const [onErrorServerOut, setonErrorServerOut] = useState(false);
  const [endServerRes, setendServerRes] = useState(false);
  const [loginValidation, setloginValidation] = useState(false);
  const [finalLang, setfinalLang] = useState(lang.es);
  const [langByUser, setlangByUser] = useState("es");
  const [frase, setfrase] = useState("...");
  const [textLoading, settextLoading] = useState("Verificando...");

  let navigate = useNavigate();

  useEffect(() => {
    const userName = localStorage.getItem("token");
    if (context.endServerRes === true) {
      if (!userName) {
        navigate("/login", { replace: true });
      } else {
        setloginValidation(userName);
      }
    }
    var d = new Date();
    var dayName = d.toString().split(" ")[0];
    //var monthDay = d.toString().split(" ")[1];
    //var numberDay = d.toString().split(" ")[2];
    //var yearDay = d.toString().split(" ")[3];
    console.log(context.data);

    if (context.data != undefined) {
      if (context.endServerRes === true) {
        setendServerRes(true);
        if (dayName === "Sun") {
          //console.log(context.data.isValueSunday)
          if (context.data.isValueSunday === false) {
            console.log("si x2");
            axios.post(context.server + "/newContabilitie", {
              name: localStorage.getItem("token"),
              reset: true,
            });
          }
        }
      }
    }

    if (document.readyState === "complete") {
      frases();
    } else {
      window.addEventListener("load", () => frases());
      return () => document.removeEventListener("load", () => frases());
    }
  }, [context.endServerRes]);

  const frases = () => {
    var arr = Math.floor(Math.random() * phrases.es.length);
    setfrase(phrases.es[arr]);
  };

  /*window.onwheel = e => {
    if(e.deltaY >= 0){
      // Scrolling Down with mouse
      console.log('Scroll Down');
    } else {
      // Scrolling Up with mouse
      console.log('Scroll Up');
    }
  }*/

  if (endServerRes) {
    if (loginValidation) {
      return (
        <MessageContextComponent>
          <div className="blockAllSelect  h-full w-full absolute top-0   ">
            <div
              id="topMenu"
              className="relative h-[30px]  flex  items-center border border-blue-400  bg-slate-100 pb-2  overflow-hidden"
            >
              <div
                onClick={() => {
                  if (langByUser === "en") {
                    setfinalLang(lang.es);
                    setlangByUser("es");
                  } else if (langByUser === "es") {
                    setfinalLang(lang.en);
                    setlangByUser("en");
                  }
                }}
                className=" text-xs pl-2 pt-2 "
              >
                <a className="text-cyan-600">{langByUser} </a>
              </div>
              <div className="text-[20px] pt-1 font-bold underline w-full text-center">
                MyMoney
              </div>

              <div className=" text-xs pr-2 pt-2 flex ">
                <div
                  onClick={() => context.showConfiguration(true)}
                  className="border border-gray-50 rounded-full    "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    className="bi bi-three-dots fill-slate-800 active:fill-blue-600"
                    viewBox="0 0 16 16"
                  >
                    <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />{" "}
                  </svg>
                </div>
              </div>
            </div>
            {context.ashowConfiguration && (
              <Configurations data={showConfigg} />
            )}
            {!onErrorServerOut ? (
              <div className="flex flex-col">
                <TextInitial></TextInitial>
                <div className="p-2 pt-5 w-full h-auto flex flex-col sm:space-y-2 md:space-y-0 space-y-2 justify-center space-x-0 sm:space-x-0 md:space-x-2 sm:flex-col  lg:flex-row ">
                  <div className="">
                    <PieDiagramHome lang={finalLang} />
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 1,
                      }}
                    >
                      <ToDay />
                      <DetailsExpendsWeek lang={finalLang} />
                    </motion.div>
                  </div>
                  <div className="flex flex-col sm:flex-row space-y-2  space-x-2   justify-left sm:w-[50%] rounded  ">
                    <div className="p-2 flex-row">
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{
                          duration: 2,
                        }}
                        className="flex-col space-y-2  "
                      >
                        <AddMoveCash lang={finalLang} />

                        <AddIncomingCash lang={finalLang} />
                      </motion.div>
                      <div className="m-2 items-center md:pt-[30px]">
                        {context.data.debts.length === 0 ? (
                          <></>
                        ) : (
                          <div className="col-span-1 p-3 md:col-span-1 border rounded-xl bg-slate-100 ">
                            <TableFromDebts lang={finalLang} />
                          </div>
                        )}
                      </div>
                    </div>
                    <BarChart />
                  </div>
                </div>
                <div></div>
              </div>
            ) : (
              <ServerOut />
            )}
          </div>
        </MessageContextComponent>
      );
    } else {
      return <Login />;
    }
  } else {
    return (
      <div className="w-screen h-screen bg-white init " id="image">
        <div className="pt-[100px] pb-[100px] relative flex-col items-center justify-center">
          <div className="h-[200px] flex items-center justify-center">
            <div className="w-[170px] h-[170px] border-[10px]  bg-white anim rounded-full"></div>
            <p className="absolute pt-[37px] z-[1]  text-[60px] mb-[40px]">
              M<span className="text-green-400">$</span>M
            </p>
          </div>
        </div>
        <div className="relative pl-2 mx-2  rounded-xl border-[1px] border-slate-200">
          <div className="animate-pulse w-full h-max"></div>
          <p>Llamando al servidor...</p>
        </div>
      </div>
    );
  }
}
