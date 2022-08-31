import "./index.scss";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import keyboardSvg from "./../../assets/svg/keyboard.svg";
import ContainerProyects from "./ContainerProyects"
const CvMain = () => {
  const [showMenu, setshowMenu] = useState(false);
  ///
  /*
  setTimeout(() => {
    ///
    // function([string1, string2],target id,[color1,color2])
    consoleText(
      ["Ola", "Te hice algo", "Para ti", "Hecho con amor", "Te amo", "ok"],
      "text",
      ["tomato", "rebeccapurple", "lightblue", "rebeccapurple", "cadetblue"]
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
  }, 200); */
  ///
  return (
    <div className="main-container">
      <div className="nav">
        <div
          className="button-nav"
          onClick={() => {
            if (showMenu === true) {
              setshowMenu(false);
            } else {
              setshowMenu(true);
            }
          }}
        >
          <span className="line l1"></span>
          <span className="line l2"></span>
          <span className="line l3"></span>
        </div>
      </div>
      <div className="main-page mx-auto">
        <AnimatePresence>
          {showMenu && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ type: "tween" }}
              className="menu-items"
            >
              <li>
                <a href="#home">Home</a>
              </li>
              <li>
                <a href="#about">about</a>
              </li>
              <li>
                <a href="#blogs">blogs</a>
              </li>
              <li>
                <a href="#proyects">proyects</a>
              </li>
              <li>
                <a href="#contact">contact</a>
              </li>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="page-content w-[100%] md:w-[1000px]">
          <div className="first-header">
            <div className="flex-col p-8">
              <div className="pt-[20px] w-full h-[70px] nameFontBold">
                Jorge Ortega
              </div>
              <div className="pt-[13px] text-[27px] flex">
                <p className="pt-[3px]">Developer</p>
                <img className="fill-slate-200 pl-1" src={keyboardSvg} alt="" />
              </div>
            </div>
            <div className="pt-8 pr-8">
              <div className="cvImage p-2"></div>
            </div>
          </div>
          <div className="textWrote w-10/12 mx-auto">
            <div className="console-containerr">
              <span id="text" className=" "></span>
              <div class="console-underscoree bg-transparent" id="console">
                &#95;
              </div>
              Tecnologies
            </div>
            <div id="about" className="w-full flex flex-col space-y-5 mb-5">
              <p className="titleText">About</p>
              <p className="normalText containerText">Hi there, I'm a frontend developer. Since I was kid (14 years old), I have been learning and practicing
              programming form tutorials and docs. My principal lagnauges knowlegde are: Typescript, JavaScript and Python. 
              </p>
            </div>
            <div id="proyects">
              <p className="titleText mb-5 mt-1 ">Proyects</p>
              <div className="flex-col space-y-4">
              <ContainerProyects title="My Money" about="Personal proyect, manage you incoming cash, see the history wich you spent your money"/>
           </div>
            </div>
            <div id="contact">
              <p className="titleText mt-5 mb-3">Contact</p>
              <p>If you want to contssage to: +593962716235</p>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default CvMain;
