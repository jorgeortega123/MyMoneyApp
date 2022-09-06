import "./index.scss";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import keyboardSvg from "./../../assets/svg/keyboard.svg";
import downloadSvg from "./../../assets/svg/download.svg";
import langSvg from "./../../assets/svg/lang.svg";
import ContainerProyects from "./ContainerProyects";
import { lang } from "./langs";
const CvMain = () => {
  const [showMenu, setshowMenu] = useState(false);
  const [showMenuTranslate, setshowMenuTranslate] = useState(false);
  const [dataText, setdataText] = useState(lang.en);
  const [defaultLang, setdefaultLang] = useState("en");

  ///
  useEffect(() => {
    //setdataText(lang[defaultLang])
    setTimeout(() => {
      consoleText(
        ["React JS", "Css", "Javascript", "Python", "Google", "Ok"],
        "text",
        ["tomato", "rebeccapurple", "lightblue", "rebeccapurple", "cadetblue"]
      );
    }, 1500);
  }, []);

  ///
  // function([string1, string2],target id,[color1,color2])

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
      } else if (letterCount === words[0].length + 1 && waiting === false) {
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

  ///
  return (
    <div className="main-container">
      <div className="nav blockAllSelect">
        <div
          className="absolute button-nav"
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
        <div className="flex blockAllSelect ">
          <img
            src={downloadSvg}
            title={"Download cv"}
            style={{ fill: "#FFFFFF" }}
            fill="red"
            stroke="green"
            className="svgDefaultColor w-[30px] h-[30px] m-2"
            alt=""
          />
          <div>
            <img
              src={langSvg}
              title={"Translate"}
              fill="red"
              stroke="green"
              className="svgDefaultColor w-[30px] h-[30px] m-2"
              alt=""
              onClick={() => {
                if (showMenuTranslate === false) {
                  setshowMenuTranslate(true);
                } else {
                  setshowMenuTranslate(false);
                }
              }}
            />
            <AnimatePresence>
              {showMenuTranslate && (
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ type: "tween" }}
                  className="z-0 absolute pl-3 w-[60px] ml-3 text-slate-100 bg-cyan-900 blockAllSelect "
                >
                  <p
                    className="pb-1 pt-1 hover:text-blue-400"
                    onClick={() => {
                      setdataText(lang.es);
                      setshowMenuTranslate(false);
                    }}
                  >
                    ES
                  </p>
                  <p
                    className="pb-1 hover:text-blue-400"
                    onClick={() => {
                      setdataText(lang.en);
                      setshowMenuTranslate(false);
                    }}
                  >
                    EN
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
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
            <div className="flex-col pl-6 pt-6">
              <div className=" w-max h-max nameFontBold">Jorge Ortega</div>
              <div className="pt-[13px] pb-[13px] text-[27px] flex">
                <p className="pt-[3px] ">Developer</p>
                <img className="fill-slate-200 pl-1" src={keyboardSvg} alt="" />
              </div>
            </div>
            <div className="pt-6 pr-5 pl-1">
              <div className="cvImage"></div>
            </div>
          </div>
          <div className="console-containerr w-full flex justify-center">
            {
              //<span className="absolute rigth-[40px]">{">> "}</span>
            }{" "}
            <div className="w-[200px] flex justify-center">
              <span id="text" className=" "></span>
              <div
                className="w-full console-underscoree bg-transparent"
                id="console"
              >
                &#95;
              </div>
            </div> 
          </div>
          <div id="about" className="textWrote w-10/12 mx-auto">
            <div className="w-full flex flex-col space-y-5 mb-5">
              <p className="titleText">{dataText.headers.about}</p>
              <p className="normalText containerText">
                {dataText.headers.aboutInfo}
              </p>
            </div>
            <div id="proyects">
              <p className="titleText mb-5 mt-1 ">Proyects</p>
              <div className="flex-col space-y-4">
                {dataText.proyects.map((e, n) => {
                  return (
                    <ContainerProyects
                      index={n}
                      title={e.title}
                      about={e.about}
                      img={e.img}
                      web={e.web}
                      langs={e.tags}
                    />
                  );
                })}
              </div>
            </div>
            <div id="contact" className="mb-[60px]">
              <p className="titleText mt-5 mb-3">Contact</p>
              <p>{dataText.contact.about} <span>{dataText.contact.number}</span></p>
               
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CvMain;
