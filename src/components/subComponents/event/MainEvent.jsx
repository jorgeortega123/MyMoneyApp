import React, { useCallback, useEffect, useState } from "react";
import "./style.css";
import "./hearth.css";
import "./neon.css";
import "./slideText.css";
import { AnimatePresence, motion } from "framer-motion";
import Neon from "./Neon";
import Card from "./Card";
import EarthPlanet from "./EarthPlanet";
export default function MainEvent() {
  const [continuee, setcontinuee] = useState(false);
  const [loadingServer, setloadingServer] = useState(false);
  const [textToShow, settextToShow] = useState("");
  const [finalHearth, setfinalHearth] = useState(false);
  const [texttareaShow, settexttareaShow] = useState(false);
  // ANIMATIONS
  /*
  const spans = document.querySelectorAll(".letterPerLetter span");
  spans.forEach((span, idx) => {
    span.addEventListener("click", (e) => {
      e.target.classList.add("active");
    });
    span.addEventListener("animationend", (e) => {
      e.target.classList.remove("active");
    });
    // Initial animation
    setTimeout(() => {
      span.classList.add("active");
    }, 750 * (idx + 1));
  });
  setTimeout(() => {
    document.getElementById("mainBack").classList.add("black-enterrazi");
    document.getElementById("mainBack").classList.remove("normal-back");
  }, 12000);*/
  //ANIMATIONS
  const [newName, setnewName] = useState("Hola");
  //const names = document.querySelectorAll(".slide");
  const iitems = document.querySelectorAll(".item");
  setTimeout(() => {
    setfinalHearth(true);
  }, 27500);
  console.log(17500);
  //}, 3600 * names.length + 2500 );

  useEffect(() => {
    document.body.style.backgroundColor = "#000000";
    //const intervalID = setInterval(shuffle, 3500);
    //return () => clearInterval(intervalID);
  }, []);

  const Hearth = () => {
    return (
      <>
        <div class="back"></div>
        <div class="love"></div>
        <div class="love-1"></div>
        <div class="love-2"></div>
      </>
    );
  };
  const Hola = () => {
    return (
      <div>
        <p>Esperando confirmación del servidor...</p>
      </div>
    );
  };
  //
  /*
   var text =[
    "Hola", "I made this for u", "Never forget that i love you"
   ]
   for (let a=0;a<text.length;a++){ 
    setTimeout(() => {
      settextToShow(text[a])
    }, 3000);
   }*/
  //document.getElementsByTagNameNS("body")[0].

  // SLIDE START
  if (continuee) {
    if (!finalHearth) {
      var index = 1;
      setInterval(function () {
        let items = document.querySelectorAll(".item");
        console.log(items.length);
        if (index == 0) {
          items[items.length - 1].classList.remove("active");
        }
        if (index > 0) {
          items[index - 1].classList.remove("active");
        }
        items[index].classList.add("active");
        index++;
        if (index == items.length) {
          index = 0;
        }
      }, 4600);
    }
  }

  // SLIDE ENF

  if (continuee) {
    return (
      <motion.div
        initial={{ opacity: 0, x: 0 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0 }}
        boxShadow={"10px 10px 0 rgba(0, 0, 0, 0.2)"}
        transition={{
          duration: 4,
        }}
        className="relative overflow-hidden bg-black w-full h-screen"
      >
        {finalHearth ? (
          <div className="absolute w-full h-full bottom-2 flex justify-center  ">
            <div className="absolute h-auto bottom-0 mx-auto flex ">
              <Card />
            </div>
          </div>
        ) : (
          <div className="relative">
            <div className="absolute w-screen h-screen flex items-center  justify-center">
              <div className="mt-[-39px] text-[22px] sm:text-[30px] text-slate-50">
                <span class="slide">
                  <span class="item active">Sabes...</span>
                  <span class="item">Jamas, pensé hacer algo asi</span>
                  <span class="item">pero... tú</span>
                  <span class="item">gracias por existir xd</span>
                  <span class="item">te amo</span>
                  <b></b>
                </span>
              </div>
            </div>
          </div>
        )}
        <AnimatePresence>
          {!finalHearth && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 3,
              }}
            >
              <Neon />
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {finalHearth && (
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
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  } else {
    return (
      <div className="overflow-x-hidden w-full h-screen bg-slate-200 flex flex-col items-center justify-center border-4 border-dashed border-spacing-4 border-cyan-900">
        <p className="text-slate-900">Ajusta la pantalla</p>
        <button
          className="mt-2 w-max h-9  px-5 mb-2 font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-200 hover:text-blue-800 focus:z-10 focus:ring-1 focus:ring-gray-900    "
          onClick={(e) => {
            setcontinuee(true);
            navigator.vibrate(350);
          }}
        >
          {"Hecho"}
        </button>
      </div>
    );
  }
  /*
  return (
    <div id="mainBack" className="h-screen w-screen background normal-back">
      <div className="h-full w-full flex items-center justify-center">
        <div className="letterPerLetter font-mono">
          <motion.span
            initial={{ opacity: 0, x: -300, y:1, scale:(7) }}
            animate={{ opacity: 2, x: 0, y:0, scale:(1) }}
            exit={{ opacity: 0 }}
            boxShadow={"10px 10px 0 rgba(0, 0, 0, 0.2)"}
            transition={{
              duration: 4,
            }}
          >
            D
          </motion.span> 
          <motion.span
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 2, x: 0 }}
            exit={{ opacity: 0 }}
            boxShadow={"10px 10px 0 rgba(0, 0, 0, 0.2)"}
            transition={{
              duration: 4,
            }}
          >
            B
          </motion.span>
          <motion.span
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 2, x: 0 }}
            exit={{ opacity: 0 }}
            boxShadow={"10px 10px 0 rgba(0, 0, 0, 0.2)"}
            transition={{
              duration: 4,
            }}
          >
            C
          </motion.span>
          <motion.span
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 2, x: 0 }}
            exit={{ opacity: 0 }}
            boxShadow={"10px 10px 0 rgba(0, 0, 0, 0.2)"}
            transition={{
              duration: 4,
            }}
          >
            D
          </motion.span>
          <motion.span
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 2, x: 0 }}
            exit={{ opacity: 0 }}
            boxShadow={"10px 10px 0 rgba(0, 0, 0, 0.2)"}
            transition={{
              duration: 4,
            }}
          >
            A
          </motion.span>
        </div>
      </div>
    </div>
  );*/
}
