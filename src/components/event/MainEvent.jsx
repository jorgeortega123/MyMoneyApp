import React, { useCallback, useEffect, useState } from "react";
import "./style.css";
import "./hearth.css";
import { AnimatePresence, motion } from "framer-motion";
import Card from "./card/Card";
import EarthPlanet from "./earth/EarthPlanet";
import axios from "axios";
import TextSlide from "./slideText/TextSlide";
export default function MainEvent() {
  const server = "https://mymone.azurewebsites.net";
  const [continuee, setcontinuee] = useState(false);
  const [loadingServer, setloadingServer] = useState(false);
  const [textToShow, settextToShow] = useState("");
  const [finalHearth, setfinalHearth] = useState(false);
  const [texttareaShow, settexttareaShow] = useState(false);
  const [isAccepted, setisAccepted] = useState(false);
  const [onWork, setonWork] = useState(false);
  const [newName, setnewName] = useState("Hola");
  const iitems = document.querySelectorAll(".item");
  const retroCount = () => {
    setTimeout(() => {
      setfinalHearth(true)
    }, 30200);
  };
  //if (isAccepted === false) {
    if (continuee=== false) {
    return (
      <div className=" relative overflow-hidden w-screen h-screen bg-[#1d151598] backdrop-blur-[10px] flex flex-col items-center justify-center border-4 border-dashed border-spacing-4 border-cyan-500">
        <div id="asdasd" className="w-full h-full overflow-y-hidden">
          <div className="backk overflow-hidden "></div>
          <p className="absolute text-[14px] left-1 bottom-0">Creado exclusivamente para Danna</p>
          <div className="lovee "></div>
          <div className="love-11 "></div>
          <div className="love-22"></div>
        </div>
        
        <div className="absolute bottom-[200px] justify-center flex flex-col items-center text-center">
         
          <p className="text-slate-900 text-[20px]">Ajusta la pantalla :{')'}</p>
          <button
            className="mt-4 w-max h-9  px-5 mb-2 font-medium text-gray-900 focus:outline-none bg-transparent rounded-full border border-gray-900  hover:text-blue-900 focus:z-10 focus:ring-[2px] focus:ring-gray-900    "
            onClick={() => {
              axios.get(server + "/eventt").then((res) => console.log(res));
              navigator.vibrate(350);
              document.getElementById("asdasd").classList.add("eneableEffect");
              setTimeout(() => {
                setcontinuee(true);
                retroCount()
              }, 500);
            }}
          >
            {"Hecho"}
          </button>
        </div>
      </div>
    );
  } else { 
    return(
    <motion.div
          initial={{ opacity: 0, x: 0 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0 }}
          boxShadow={"10px 10px 0 rgba(0, 0, 0, 0.2)"}
          transition={{
            duration: 2,
          }}
          className="relative overflow-hidden w-full h-screen  backGrounEvent"
        >
          {finalHearth ? (
            
            <motion.div
              initial={{ opacity: 0, y:-250 }}
              animate={{ opacity: 1, y:0 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 2,
              }}
              className="w-full h-full"
            >
               <p className="absolute text-[14px] text-slate-100 left-1 top-0">Creado exclusivamente para Danna<span className="text-red-800"> ❤️</span> </p>
              <EarthPlanet />
              <div className="absolute w-full h-full bottom-2 flex justify-center  ">
                <div className="absolute h-auto bottom-0 mx-auto flex blockAllSelect ">
                  <Card />
                </div>
              </div>{" "}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 3,
              }}
              className="w-full flex items-center justify-center"
            >
               <p className="absolute text-[14px] left-1 text-slate-100 top-0">Creado exclusivamente para Danna<span className="text-red-800"> ❤️</span> </p>
              <TextSlide />
            </motion.div>
          )}
        </motion.div>)
  }
}
/*
  return (
    <div className="w-full h-full overflow-y-hidden">
      {continuee ? (
        <div className=" relative overflow-hidden w-screen h-screen bg-[#1d151598] backdrop-blur-[2px] flex flex-col items-center justify-center border-4 border-dashed border-spacing-4 border-cyan-300">
          <div id="asdasd" className="w-full h-full overflow-y-hidden">
            <Hearth />
          </div>
          <div className="absolute justify-center flex flex-col items-center">
            <p className="text-slate-900 text-[20px]">Ajusta la pantalla</p>
            <button
              className="mt-4 w-max h-9  px-5 mb-2 font-medium text-gray-900 focus:outline-none bg-transparent rounded-full border border-gray-900  hover:text-blue-900 focus:z-10 focus:ring-[2px] focus:ring-gray-900    "
              onClick={() => {
                //axios.get(server + "/eventt").then((res) => console.log(res));
                navigator.vibrate(350);
                document
                  .getElementById("asdasd")
                  .classList.add("eneableEffect");
                setTimeout(() => {
                  setcontinuee(true);
                }, 500);
              }}
            >
              {"Hecho"}
            </button>
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, x: 0 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0 }}
          boxShadow={"10px 10px 0 rgba(0, 0, 0, 0.2)"}
          transition={{
            duration: 2,
          }}
          className="relative overflow-hidden bg-black w-full h-screen"
        >
          {finalHearth ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 3,
              }}
              className="w-full h-full"
            >
              <EarthPlanet />
              <div className="absolute w-full h-full bottom-2 flex justify-center  ">
                <div className="absolute h-auto bottom-0 mx-auto flex blockAllSelect ">
                  <Card />
                </div>
              </div>{" "}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 3,
              }}
              className="bg-transparent"
            >
              <TextSlide />
            </motion.div>
          )}
        </motion.div>
      )}
    </div>
  );
}
*/
