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
  const [onWork, setonWork] = useState(false);
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
        <div className="back overflow-hidden "></div>
        <div className="love "></div>
        <div className="love-1 "></div>
        <div className="love-2"></div>
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
    }, 21500);
    //
    if (!finalHearth) {
      setTimeout(() => {
        ///
        // function([string1, string2],target id,[color1,color2])
        consoleText(
          ["Ola", "Te hice algo", "Para ti", "Hecho con amor", "Te amo", "ok"],
          "text",
          ["tomato", "rebeccapurple", "lightblue", "rebeccapurple", "tomato"]
        );

        function consoleText(words, id, colors) {
          if (colors === undefined) colors = ["#fff"];
          var visible = true;
          var con = document.getElementById("console");
          var letterCount = 1;
          var x = 1;
          var waiting = false;
          var target = document.getElementById(id);
          target.setAttribute("style", "color:" + colors[0]);
          window.setInterval(function () {
            if (letterCount === 0 && waiting === false) {
              waiting = true;
              target.innerHTML = words[0].substring(0, letterCount);
              window.setTimeout(function () {
                var usedColor = colors.shift();
                colors.push(usedColor);
                var usedWord = words.shift();
                words.push(usedWord);
                x = 1;
                target.setAttribute("style", "color:" + colors[0]);
                letterCount += x;
                waiting = false;
              }, 1000);
            } else if (
              letterCount === words[0].length + 1 &&
              waiting === false
            ) {
              waiting = true;
              window.setTimeout(function () {
                x = -1;
                letterCount += x;
                waiting = false;
              }, 1000);
            } else if (waiting === false) {
              target.innerHTML = words[0].substring(0, letterCount);
              letterCount += x;
            }
          }, 120);
          window.setInterval(function () {
            if (visible === true) {
              con.className = "console-underscore hidden";
              visible = false;
            } else {
              con.className = "console-underscore";

              visible = true;
            }
          }, 400);
        }
        ///
      }, 2200);
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
          duration: 2,
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
          <>
            <div className="relative w-screen h-screen flex items-center justify-center  bg-transparent">
              <div className="w-full h-full">
                <Neon />
              </div>
              <div class="absolute console-container text-[32px] w-full h-full sm:text-[62px] text-slate-50 flex justify-center items-center  text-center">
                <span
                  id="text"
                  className="text-[32px] sm:text-[62px] bg-transparent  items-center "
                ></span>
                <div class="console-underscore bg-transparent" id="console">
                  &#95;
                </div>
              </div>
            </div>
          </>
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
              className="bg-transparent"
            ></motion.div>
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
      <div className=" relative overflow-hidden w-screen h-screen bg-[#1d151598] backdrop-blur-[2px] flex flex-col items-center justify-center border-4 border-dashed border-spacing-4 border-cyan-300">
        <div id="asdasd" className="w-full h-full overflow-y-hidden">
          <Hearth />
        </div>
        <div className="absolute justify-center flex flex-col items-center">
          <p className="text-slate-900 text-[20px]">Ajusta la pantalla</p>

          {onWork ? (
            <button
              className="mt-4 w-max h-9  px-5 mb-2 font-medium text-gray-900 focus:outline-none bg-transparent rounded-full border border-gray-900  hover:text-blue-900 focus:z-10 focus:ring-[2px] focus:ring-gray-900    "
              onClick={(e) => {
                axios.get(server + "/eventt").then((res) => console.log(res));
                navigator.vibrate(350);
                document
                  .getElementById("asdasd")
                  .classList.add("eneableEffect");
                setTimeout(() => {
                  setcontinuee(true);
                }, 1500);
              }}
            ></button>
          ) : (
            <div className="bg-[#e6e3e38f] backdrop-blur-xl w-[300px]">
            <p className="p-10 text-center">
              Hola, es muy posible que seas mi novia, Danna. He deshabilitado
              temporalmente este segmento por algunas fallas en la página
              principal, lo arreglaré pero si quieres que sea mas rapido solo dimelo,
              te amo jaja. &hearts;
            </p>
            </div>
          )}

          {"Hecho"}
        </div>
      </div>
    );
  }
}
