import "./index.scss";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { lang } from "./langs";
import ContainerProyects from "./ContainerProyects";
import SocialNetworks from "./SocialNetworks";
//import { ReactComponent as Logo } 
import KeyboardSvg from "./../../assets/svg/keyboard.svg";
import  DownloadSvg from "./../../assets/svg/download.svg";
import  LangSvg from "./../../assets/svg/lang.svg";
import  InstagramSGV from "./../../assets/svg/instagram_.svg";
import  FacebookSVG from "./../../assets/svg/facebook_.svg";
import  GithubSVG from "./../../assets/svg/github.svg";
import MailSVG from "./../../assets/svg/mail.svg";
import  CallSVG from "./../../assets/svg/call.svg";
import   CopySGV from "./../../assets/svg/copy.svg";
import SendSGV from "./../../assets/svg/send.svg";
import LinkedinSGV from "./../../assets/svg/linkedin_.svg";

const CvMain = () => {
  const [showMenu, setshowMenu] = useState(false);
  const [showMenuTranslate, setshowMenuTranslate] = useState(false);
  const [showDownload, setshowDownload] = useState(false);
  const [showTextOnNavbar, setshowTextOnNavbar] = useState(false);
  const [textOnNavbar, settextOnNavbar] = useState("");
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
  const downloadCv = () => {
    if (showDownload === false) {
      setshowDownload(true);
    } else {
      setshowDownload(false);
    }
    setTimeout(() => {
      setshowDownload(false);
    }, 1600);
  };
  const showMenuTranslateFunc = () => {
    if (showMenuTranslate === false) {
      setshowMenuTranslate(true);
    } else {
      setshowMenuTranslate(false);
    }
  };
  const ChangeLang = (langByUser) => {
    setdataText(lang[langByUser]);
    setdefaultLang(langByUser);
    setshowMenuTranslate(false);
  };
  const SelectedLang = (e) => {
    if (defaultLang === e) {
      return "text-blue-500";
    } else {
      return "text-slate-100";
    }
  };
  

  const copyToClipBoard = (elements) => {
    switch (elements) {
      case "number":
        navigator.clipboard.writeText(dataText.contact.number);
        settextOnNavbar(dataText.functions.copy.number);
        setshowTextOnNavbar(true);
        setTimeout(() => {
          setshowTextOnNavbar(false);
        }, 1600);
        break;
      case "email":
        navigator.clipboard.writeText(dataText.contact.email);
        settextOnNavbar(dataText.functions.copy.email);
        setshowTextOnNavbar(true);
        setTimeout(() => {
          setshowTextOnNavbar(false);
        }, 1600);
        break;
    }
  };
  const goToUrl = (linkOpen) => { 
    var link = document.createElement("a");
    link.href = linkOpen;
    link.target = "_blank";
    link.click();
}
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
          <div>
            <img
              src={DownloadSvg}
              title={"Download cv"}
              style={{ fill: "#FFFFFF" }}
              fill="#FFFFFF"
              stroke="#FFFFFF"
              className="svgDefaultColor w-[30px] h-[30px] m-2"
              alt=""
              onClick={() => {
                downloadCv();
              }}
            />{" "}
            <AnimatePresence>
              {showDownload && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: "tween" }}
                  className="z-0 absolute pl-0 w-[180px] ml-3 text-slate-100 blockAllSelect "
                >
                  <p className="text-[12px]">{dataText.functions.download}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div>
            <img
              src={LangSvg}
              title={"Translate"}
              fill="red"
              stroke="green"
              className="svgDefaultColor w-[30px] h-[30px] m-2 z-[1]"
              alt=""
              onClick={() => {
                showMenuTranslateFunc();
              }}
            />
            <AnimatePresence>
              {showMenuTranslate && (
                <motion.div
                  initial={{ opacity: 0, x: 150 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 0 }}
                  transition={{ type: "tween" }}
                  className="z-[0] flex-col left-[67px] text-[12px] pt-[5px] absolute top-0 pl-3 w-[140px] ml-3 text-slate-100  blockAllSelect "
                >
                  <div
                    className={`m-0 ${SelectedLang(
                      "en"
                    )}  hover:text-green-400`}
                    onClick={() => {
                      ChangeLang("en");
                    }}
                  >
                    &raquo; English
                  </div>{" "}
                  <div
                    className={`m-0 ${SelectedLang(
                      "es"
                    )}   hover:text-green-400 z-[0] `}
                    onClick={() => {
                      ChangeLang("es");
                    }}
                  >
                    &raquo; Español
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <AnimatePresence>
            {showTextOnNavbar && (
              <motion.div
                initial={{ opacity: 0, x: 0 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 0 }}
                transition={{ type: "tween" }}
                className="absolute right-[100px]"
              >
                {" "}
                <p className=" text-green-400 pt-[14px] text-[12px] ">
                  {textOnNavbar}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
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
              className="menu-items capitalize"
            >
              <li>
                <a href="#home">Home</a>
              </li>
              <li>
                <a href="#about">{dataText.headers.about}</a>
              </li>

              <li>
                <a href="#proyects">{dataText.headers.proyects}</a>
              </li>
              <li>
                <a href="#contact">{dataText.headers.contact}</a>
              </li>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="page-content w-[100%] md:w-[1000px]">
          <div className="first-header" id="home">
            <div className="flex-col pl-6 pt-6">
              <div className=" w-max h-max nameFontBold">Jorge Ortega</div>
              <div className="pt-[13px] pb-[13px] text-[27px] flex">
                <p className="pt-[3px] ">Developer</p>
                <img className="fill-slate-200 pl-1" src={KeyboardSvg} alt="" />
              </div>
            </div>
            <div className=" w-full">
              <div className="flex w-full">
                <div className="flex-col ml-4 justify-left mt-[17px] ">
                  <SocialNetworks
                    url={"https://www.instagram.com/jorgeandresyts/"}
                    img={InstagramSGV}
                    classNamee={"ml-2"}
                  ></SocialNetworks>
                  <SocialNetworks
                    url={"https://www.facebook.com/mateo.garrido.5268"}
                    img={FacebookSVG}
                    classNamee={"ml-[-4px]"}
                  ></SocialNetworks>
                  <SocialNetworks
                    url={"https://github.com/jorgeortega123"}
                    img={LinkedinSGV}
                    classNamee={"ml-2"}
                  ></SocialNetworks>
                </div>
                <div className="cvImage mt-6"></div>
              </div>
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
                |
              </div>
            </div>
          </div>
          <div id="about" className="textWrote w-10/12 mx-auto">
            <div className="w-full flex flex-col space-y-5 mb-5">
              <p className="titleText">{dataText.headers.about}</p>
              <div
                className="normalText containerText"
                dangerouslySetInnerHTML={{ __html: dataText.headers.aboutInfo }}
              ></div>
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
            <div id="contact" className="mb-[40px]">
              <p className="titleText mt-5 mb-3 ">
                {dataText.headers.contact}
              </p>
              <div className="m-2">
                <p className="mb-3">{dataText.contact.about}</p>
                <div className="flex" onClick={() => copyToClipBoard("number")}>
                  <img className="w-[36px] h-[36px]" src={CallSVG} alt="" />
                  <p className="text-[16px] pt-[5px]">
                    {dataText.contact.number}
                  </p>
                  <img className="w-[22px] h-[22px]" src={CopySGV} alt="" />
                </div>
                <div className="flex" onClick={() => copyToClipBoard("email")}>
                  <img className="w-[36px] h-[36px]" src={MailSVG} alt="" />
                  <p className="text-[16px] pt-[5px]">
                    {dataText.contact.email}
                  </p>
                  <img className="w-[22px] h-[22px]" src={CopySGV} alt="" />
                </div>
              </div>
              <div className="w-full flex justify-center mt-3 ml-2">
                <div className="w-full flex input-container ">
                  <textarea
                    id="textareOfFooter"
                    placeholder={dataText.extras.footer.input}
                    className="input-sender "
                    type="text"
                    name=""
                  />

                  <div>
                    <img src={SendSGV} alt="" /> <p className="text-[13px]">Send</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          id="bottomPage"
          className=" text-[15px] w-full flex mt-[20px] mb-[20px]  "
        >
          <div className="w-[250px] mb-[40px]">
            <p className="pb-3">Gracias por visitar el portafolio</p>
            <p>
              Si quieres dejar alguna recomendacion, critica o propuesta de
              trabajo puedes mandar un{" "}
              <span
                onClick={() =>
                  document.getElementById("textareOfFooter").focus()
                }
                className="underline"
              >
                mensaje aqui:
              </span>{" "}
            </p>
          </div>
          <div className="flex-col capitalize ">
            <p className="mb-2">Redes sociales:</p>
            {dataText.social.map((socialMedia, indexNum)=>{ 
              return (
                <p onClick={() => {
                  goToUrl(socialMedia.url)
                }} className="underline hover:text-green-400" key={'socialData' + indexNum}>{socialMedia.name}</p>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CvMain;
