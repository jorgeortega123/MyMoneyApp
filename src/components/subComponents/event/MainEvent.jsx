import React, { useCallback, useEffect, useState } from "react";
import "./style.css";
import "./hearth.css";
import "./neon.css";
import { AnimatePresence, motion } from "framer-motion";
import Neon from "./Neon";
export default function MainEvent() {
  const [continuee, setcontinuee] = useState(false);
  const [loadingServer, setloadingServer] = useState(false);
  const [textToShow, settextToShow] = useState("");
  const [finalHearth, setfinalHearth] = useState(true);
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
  const names = ["Nunca olvides que te amo", "He hecho esto para ti"];
  setTimeout(() => {
    setfinalHearth(false)
  }, 3600 );
  //}, 3600 * names.length + 2500 );
  const shuffle = useCallback(() => {
    const index = Math.floor(Math.random() * names.length);

    setnewName(names[index]);
  }, []);
   
  useEffect(() => {
    const intervalID = setInterval(shuffle, 15500);
    return () => clearInterval(intervalID);
  }, [shuffle]);

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

  //
  if (!continuee) {
    return (
      
      finalHearth?(
        <motion.div
        initial={{ opacity: 0, x: 0 }}
        animate={{ opacity: 2, x: 0 }}
        exit={{ opacity: 0 }}
        boxShadow={"10px 10px 0 rgba(0, 0, 0, 0.2)"}
        transition={{
          duration: 4,
        }}
        className="overflow-hidden"
      >
        <div className="relative">
          <div className="absolute w-screen h-screen flex items-center  justify-center">
            <div className="mt-[-39px]">{newName}</div>{" "}
          </div>
          <Neon />
        </div>
      </motion.div>
      ):(
        <Hearth />
      )

      
    );
  }
  return (
    <div id="mainBack" className="h-screen w-screen background normal-back">
      <div className="h-full w-full flex items-center justify-center">
        <div className="letterPerLetter font-mono">
          <span>D</span>
          <span>A</span>
          <span>B</span>
          <span>C</span>
          <span>D</span>
        </div>
      </div>
    </div>
  );
}
