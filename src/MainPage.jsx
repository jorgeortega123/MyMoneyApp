import React, { useEffect, useState } from "react";
import AddMoveCash from "./components/AddMoveCash";
import DetailsExpendsWeek from "./components/DetailsExpendsWeek";
import Login from "./components/Login";
import CahrgingData from "./components/subComponents/CahrgingData";
import ServerOut from "./components/subComponents/ServerOut";
import useGlobalContext from "./context/useGlobalContext";
import { PieDiagramHome } from "./components/PieDiagramHome";
import { AnimatePresence, motion } from "framer-motion";
import { MessageContextComponent } from "./context/Modal/MessageContext";
import { useNavigate } from "react-router-dom";
import { lang, phrases } from "./dataSimulateServer";

import { SpinnerInfinity } from "spinners-react";
import ToDay from "./components/ToDay";
import Configurations from "./components/subComponents/Configurations";
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
    if (!userName) {
      navigate("/login", { replace: true });
    } else {
      setloginValidation(userName);
      if (context.endServerRes === true) {setendServerRes(true)} 
      
    }
  }, [context.endServerRes]);
  const frases = () => {
     var arr = Math.floor(Math.random() * 21);
     setfrase(phrases.es[arr]);
   };
  if (endServerRes === true) {
    if (loginValidation) {
      return (
        <MessageContextComponent>
          <div className="blockAllSelect  h-full w-full absolute top-0   ">
            <div className="relative h-[40px]  flex  items-center border  bg-transparent pb-2 justify-between overflow-hidden">
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
              <>
                <div className="p-2 w-full h-auto flex flex-col  sm:space-y-2 md:space-y-0 space-y-2 justify-center space-x-0 sm:space-x-0 md:space-x-2 sm:flex-col  lg:flex-row ">
                  {endServerRes ? (
                    <>
                      <PieDiagramHome lang={finalLang} />
                      {
                        //<p className="  absolute" onClick={()=>frases()}>{frase}</p>}
                      }
                    </>
                  ) : (
                    <>
                      <div className="pt-12 mr-auto ml-auto">
                        <SpinnerInfinity
                          size={100}
                          thickness={50}
                          сolor={"#191919"}
                          secondaryColor="rgba(0,0,0,0.14)"
                          speed={120}
                        />
                      </div>
                      <CahrgingData />
                    </>
                  )}
                  {endServerRes ? (
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
                  ) : (
                    <p></p>
                  )}
                </div>
                <div className="pt-[2px] mt-0 pl-2 pr-2 flex justify-center w-full border-spacing-2 rounded sm:justify-left  ">
                  {endServerRes ? (
                    <div className="grow md:grow-0">
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
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
        </MessageContextComponent>
      );
    } else {
      return (
        <div className="overflow-hidden w-screen">
          <Login />
        </div>
      );
    }
  } else {
    return (
      <div className="flex items-center justify-center">
        <div className="pt-12 mr-auto ml-auto">
          <SpinnerInfinity
            size={200}
            thickness={50}
            сolor={"#a384649a"}
            secondaryColor="rgba(0,0,0,0.24)"
            speed={120}
          />
          <div className="text-center">
            <p className="pt-4 text-slate-600">{textLoading}</p>
            <div class="animate-pulse flex space-x-4 pt-3">
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
              className="w-[200px] text-slate-700 text-center pt-4 text-[12px] absolute"
              onLoad={() => frases()}
              onClick={() => frases()}
            >
              {frase}
            </p>
          </div>
        </div>
      </div>
    );
  }
}
