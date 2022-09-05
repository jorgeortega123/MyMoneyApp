import React, { useEffect, useState } from "react";
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
      setendServerRes(true);
    }
    var d = new Date();
    var dayName = d.toString().split(" ")[0];
    //var monthDay = d.toString().split(" ")[1];
    //var numberDay = d.toString().split(" ")[2];
    //var yearDay = d.toString().split(" ")[3];
    console.log(context.data);

    if (context.data != undefined) {
      if (context.endServerRes === true) {
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

  if (endServerRes === true) {
    if (loginValidation) {
      return (
        <MessageContextComponent>
          <div className="blockAllSelect  h-full w-full absolute top-0   ">
            <div
              id="topMenu"
              className="relative h-[40px]  flex  items-center border border-slate-600  bg-transparent pb-2 justify-between overflow-hidden"
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
                Lang: <a className="text-lime-600">{langByUser} </a>
              </div>
              <div className="text-3xl font-bold underline">MyMoney</div>

              <div className=" text-xs pr-2 pt-2 flex ">
                <div
                  onClick={() => context.showConfiguration(true)}
                  className="border border-gray-50 rounded-full hover:border-gray-200 active:bg-slate-400 "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    className="bi bi-three-dots fill-slate-800 active:fill-slate-50"
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
                <div className="p-2 w-full h-auto flex flex-col sm:space-y-2 md:space-y-0 space-y-2 justify-center space-x-0 sm:space-x-0 md:space-x-2 sm:flex-col  lg:flex-row ">
                  <div className="sm:w-[50%]">
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
      <div className="w-screen h-screen backGroundImage">
        <div className="flex items-center justify-center">
          <div className="pt-12 ">
            <SpinnerInfinity
              size={200}
              thickness={60}
              сolor={"#a384649a"}
              secondaryColor="rgba(0,0,0,0.24)"
              speed={190}
              className="mr-auto ml-auto"
            />
            <div className="text-center">
              <p className="pt-4 text-slate-600 text-slate-100 text-[20px] mb-[40px]">
                {textLoading}
              </p>
              <div class="animate-pulse flex space-x-4 pt-3 w-[300px]">
                <div class="flex-1 space-y-6 py-1">
                  <div class="h-2 bg-slate-300 rounded"></div>
                  <div class="space-y-3">
                    <div class="grid grid-cols-3 gap-4">
                      <div class="h-2 bg-slate-300 rounded col-span-2"></div>

                      <div class="h-2 bg-slate-300 rounded col-span-1"></div>
                      <div class="h-2 bg-slate-300 rounded col-span-1"></div>
                      <div class="h-2 bg-slate-300 rounded col-span-2"></div>
                    </div>
                    <div class="h-2 bg-slate-300 rounded"></div>
                    <div class="h-2 bg-slate-300 rounded"></div>
                  </div>
                </div>
              </div>
              <p
                className="mt-[20px] w-[250px] text-slate-700 text-slate-200 text-center pt-4 text-[19px] mr-auto ml-auto"
                onLoad={() => frases()}
                onClick={() => frases()}
              >
                {frase}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
