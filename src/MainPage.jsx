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
import AllCost from "./components/myMoney/elements/AllCost.jsx";
import Modal from "./components/myMoney/elements/Modal/Modal.jsx";
export default function MainPage() {
  const { context } = useGlobalContext();
  const [showConfigg, setshowConfigg] = useState(false);
  const [onErrorServerOut, setonErrorServerOut] = useState(false);
  const [endServerResNext, setendServerResNext] = useState(false);
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
    if (!context?.data?.cost) {
      context.update();
    }

    if (context.endServerRes === true) {
      if (context.data.data != "No se econtro información del usuario") {
        setTimeout(() => {
          setendServerResNext(true);
        }, 400);
      } else {
        setendServerResNext(false);
      }
    }

    /*      if (document.readyState === "complete") {
        frases();
      } else {
        window.addEventListener("load", () => frases());
        return () => document.removeEventListener("load", () => frases());
      }*/
  }, [context.endServerRes]);
  if (endServerResNext) {
    if (loginValidation) {
      return (
        <MessageContextComponent>
          <div className="hidden absolute top-0 w-screen h-[3020px] bg-red-500 z-[1] init  ">
            <div>
              <p className="p-1">Something went wrong</p>
            </div>
            <div
              className="w-full h-full flex flex-col items-center mt-[160px]
            t"
            >
              <p className="text-[140px] relative mr-[-40px] ">
                <span className="absolute ml-[-26px] mt-[-15px]">:</span>(
              </p>
              <p>The math into code has caused an infinite loop. </p>
              <p>Page have been disabled for avoid bugs.</p>
            </div>
          </div>
          <div className="blockAllSelect  h-full w-full absolute top-0 bodyLetter text-[14px]   ">
            <div
              id="topMenu"
              className=" h-[38px] flex justify-between items-center border-b-2 border-blue-700  bg-white pb-3  "
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
                className=" text-xs pl-2 pt-2 hidden "
              >
                <a className="text-cyan-600">{langByUser} </a>
              </div>
              <div className="text-[25px] lg:text-[33px] pt-[10px] font-bold underline w-full text-center init">
                <span className="font-extralight text-green-400 ">
                  $
                </span>
                MyMoney
              </div>

              <div className=" text-xs pr-2 pt-3 flex ">
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
                <Modal>
                  <p>Hola</p>
                </Modal>

                <div className="pl-1 pr-2  w-full flex flex-col md:space-y-2 justify-center space-x-0 md:space-x-2 sm:flex-col  lg:flex-col ">
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
                  <div className="flex flex-col sm:flex-row">
                    <div className="flex-row">
                      <AddMoveCash lang={finalLang} />

                      <AddIncomingCash lang={finalLang} />

                      <div className="items-center">
                        {context.data?.debts?.length === 0 ? (
                          <></>
                        ) : (
                          <div className="col-span-1 md:col-span-1 ">
                            <TableFromDebts lang={finalLang} />
                          </div>
                        )}
                      </div>
                    </div>
                    <AllCost />
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
        <div className="h-full flex flex-col items-center justify-center">
          <div className="h-[500px] flex flex-col items-center ">
            <div className=" pt-[37px] z-[1]  text-[60px] mb-[40px]">
              M<span className="text-green-400">$</span>M
            </div>
            <div className="relative w-24 h-1 rounded-2xl bg-[#12312322]">
              <div className=" loadServer h-1 bg-black rounded-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
