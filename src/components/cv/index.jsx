import "./index.scss";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
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
      <div className="main-page">
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
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">about</a>
              </li>
              <li>
                <a href="#">blogs</a>
              </li>
              <li>
                <a href="#">portfolio</a>
              </li>
              <li>
                <a href="#">contact</a>
              </li>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="page-content">
          <div className="first-header">
            <div className="flex-col p-8">
              <div className="w-full h-[50px] nameFontBold">Jorge Ortega</div>
              <div>Developer</div>
            </div>
            <div className="p-8">
              <div className="p-2">IMG</div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="console-container">
              <span id="text" className=" "></span>
              <div class="console-underscore bg-transparent" id="console">
                &#95;
              </div>
              Tecnologies
            </div>
            <div>About</div> <div>Contact</div>
          </div>
          <div>Proyects</div>
        </div>
      </div>
    </div>
  );
};

export default CvMain;
