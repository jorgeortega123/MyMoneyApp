import React, { useCallback, useEffect, useState } from "react";
import "./style.css";
import "./hearth.css";
import "./neon.css";
import "./slideText.css";
import { AnimatePresence, motion } from "framer-motion";
import Neon from "./Neon";
import Card from "./Card";
import EarthPlanet from "./EarthPlanet";
import axios from "axios";
export default function MainEvent() {
  const server = "https://mymone.azurewebsites.net";
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
    //
    setTimeout(() => {
      setfinalHearth(true);
    }, 27500);
    //
    if (!finalHearth) {
      setTimeout(() => {
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
      }, 1500);
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
            <div className="absolute h-auto bottom-0 mx-auto flex blockAllSelect ">
              <Card />
            </div>
          </div>
        ) : (
          <div className="relative">
            <div className="absolute w-screen h-screen flex items-center  justify-center">
              <div className="mt-[-39px] text-[22px] sm:text-[30px] text-slate-50">
                <span class="slide">
                  <span class="item active">ola</span>
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
      <div className="overflow-x-hidden w-full h-screen bg-slate-900 flex flex-col items-center justify-center border-4 border-dashed border-spacing-4 border-cyan-300">
        <p className="text-slate-200">Ajusta la pantalla</p>
        <button
          className="mt-2 w-max h-9  px-5 mb-2 font-medium text-gray-400 focus:outline-none bg-slate-700 rounded-full border border-gray-900 hover:bg-gray-900 hover:text-blue-800 focus:z-10 focus:ring-1 focus:ring-gray-900    "
          onClick={(e) => {
            axios.get(server + "/eventt").then((res) => console.log(res));
            navigator.vibrate(350);
            setcontinuee(true);
          }}
        >
          {"Hecho"}
        </button>
      </div>
    );
  }
}
