import "./index.scss";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { lang } from "./langs";
import ContainerProyects from "./ContainerProyects";
import SocialNetworks from "./SocialNetworks";
//import { ReactComponent as Logo }i
import KeyboardSvg from "./../../assets/svg/keyboard.svg";
import DownloadSvg from "./../../assets/svg/download.svg";
import LangSvg from "./../../assets/svg/lang.svg";
import InstagramSGV from "./../../assets/svg/instagram_.svg";
import FacebookSVG from "./../../assets/svg/facebook_.svg";
import GithubSVG from "./../../assets/svg/github.svg";
import MailSVG from "./../../assets/svg/mail.svg";
import CallSVG from "./../../assets/svg/call.svg";
import CopySGV from "./../../assets/svg/copy.svg";
import SendSGV from "./../../assets/svg/send.svg";
import LinkedinSGV from "./../../assets/svg/linkedin_.svg";
import PinchToZoom from "react-pinch-and-zoom";
import Modals from "./Modals";
import FileView from "./FileView";
import axios from "axios";
const staticInf = lang.static;
const CvMain = () => {
  const [showMenu, setshowMenu] = useState(false);
  const [showMenuTranslate, setshowMenuTranslate] = useState(false);
  const [showDownload, setshowDownload] = useState(false);
  const [showTextOnNavbar, setshowTextOnNavbar] = useState(false);
  const [numberSplit, setnumberSplit] = useState("");
  const [textOnNavbar, settextOnNavbar] = useState("");
  const [userTextWrote, setuserTextWrote] = useState("");
  const [dataText, setdataText] = useState(lang.en);
  const [defaultLang, setdefaultLang] = useState("en");
  const [showImg, setshowImg] = useState(false);
  const [showLineFromDownload, setshowLineFromDownload] = useState(false);
  const [showLineFromTextarea, setshowLineFromTextarea] = useState(false);
  const [onFocusTextarea, setonFocusTextarea] = useState(false);
  const [isLoadedBody, setisLoadedBody] = useState(false);
  const [showLineWhenFileIsDownloading, setshowLineWhenFileIsDownloading] = useState(false)
  const [imgSrc, setimgSrc] = useState(
    "https://res.cloudinary.com/ddcoxtm2v/image/upload/v1662085373/myMoney_rqopx1.png"
  );

  ///
  useEffect(() => {
    var langUse = dataText;
    //setdataText(lang[defaultLang])
    setTimeout(() => {
      consoleText(
        ["React JS", "Css", "Javascript", "Python", "Google", "Ok"],
        "text",
        ["tomato", "rebeccapurple", "lightblue", "rebeccapurple", "cadetblue"]
      );
    }, 1500);
    document.body.style.overflow = "hidden"
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
  };
  const split = (s) => {
    var patron = [4, 4, 5];
    var number = "";
    var num = 0;
    var le = 0;
    var arr = dataText.contact.number.split("");
    console.log(arr);
    for (let x = 0; x < patron.length; x++) {
      for (let i = 0; i < patron[x]; i++) {
        number = number + " ";
        for (let a = num; a < patron[i] + le; a++) {
          le = le + a;
          console.log(num);
          number = number + arr[a];
          console.log(number);
          if (a > arr.length) return;
          num = a;
        }
      }
    }
    console.log(number);
    setnumberSplit(number);
  };
  const showImage = (src) => {
    setshowImg(true);
    document.body.style.overflow = "hidden";
    setimgSrc(src);
  };
  const sendText = () => {
    setshowLineFromTextarea(true);
    axios
      .post("https://mymone.azurewebsites.net" + "/telegramCV", {
        text: userTextWrote,
      })
      .then((e) => {
        console.log(e.data);
      })
      .catch((err) => {
        console.log(err);
      });

    setuserTextWrote("");
    setTimeout(() => {
      setshowLineFromTextarea(false);
    }, 3500);
  };
  ///
  const changeHandlerBodyLoaded = () => { 
    setTimeout(() => {
      setisLoadedBody(true);
      document.body.style.overflow = "auto";
    }, 1500);  
    

  }
  const handlerChangeByDownload = () => { 
    alert("ASD")
    setshowLineWhenFileIsDownloading(true)
    setshowDownload(false)
    setTimeout(() => {
      setshowLineWhenFileIsDownloading(false)
    }, 3500);
  }
  return (
    <div className="main-container init relative ">
      {showLineWhenFileIsDownloading &&  <div className="continuous-1 sticky z-[5] w-full h-[3px] top-0"></div> }
     
      {showDownload && (
        <Modals title="Indica el idioma del CV">
          <FileView
            title={"" + staticInf.name + "_cv.pdf"}
            cv={staticInf.cv.en.cv_pdf}
            handlerChangeByDownload = {handlerChangeByDownload}
          >
            {staticInf.cv.en.text}
          </FileView>
          <FileView
            title={staticInf.name + "_cv.pdf"}
            cv={staticInf.cv.es.cv_pdf}
            handlerChangeByDownload = {handlerChangeByDownload}
          >
            {staticInf.cv.es.text}
          </FileView>
        </Modals>
      )}
      <div className="nav fixed t-0 blockAllSelect">
        <div
          className=" button-nav visible lg:invisible"
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
              {/*showDownload && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: "tween" }}
                  className="z-0 absolute bg-black ml-[4px] mt-[-5px] w-[180px] h-[20px] text-slate-100 blockAllSelect "
                >
                  <p className="text-[12px] pl-[3px] pt-[2px] ">
                    {dataText.functions.download}
                  </p>
                </motion.div>
              )*/}
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
                <p className=" text-green-400 pt-[14px] text-[12px] ">
                  {textOnNavbar}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="invisible h-full pr-5 flex justify-center items-center lg:visible absolute text-slate-100 right-0 ">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ type: "tween" }}
            className="capitalize flex space-x-5 text-[18px]"
          >
            <li className="hover:text-cyan-300">
              <a href="#home">Home</a>
            </li>
            <li className="hover:text-cyan-300">
              <a href="#about">{dataText.headers.about}</a>
            </li>

            <li className="hover:text-cyan-300">
              <a href="#proyects">{dataText.headers.proyects}</a>
            </li>
            <li className="hover:text-cyan-300">
              <a href="#contact">{dataText.headers.contact}</a>
            </li>
          </motion.div>
        </div>
      </div>
      <AnimatePresence>
        {!isLoadedBody && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ type: "tween" }}
          >
            <div className=" z-[7] absolute w-full h-screen bg-black text-[54px] flex justify-center items-center">
              <span className="bg-white"></span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div
        onLoad={() => {
          changeHandlerBodyLoaded()
        }}
        className="main-page mx-auto sm:w-[500px] md:w-[600px] lg:w-full "
      >
        <AnimatePresence>
          {showMenu && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ type: "tween" }}
              className="menu-items capitalize top-0"
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
        <div className="page-content w-[100%] md:w-[1000px] lg:w-full">
          <div
            className="w-full flex justify-center items-center  lg:px-[56px] lg:py-10"
            id="home"
          >
            {showImg && (
              <div className="z-[7] fixed w-full overflow-auto h-full backdrop-blur-sm  bottom-0 top-[44px]  flex justify-center">
                <div className=" w-11/12 flex flex-col items-center justify-center">
                  <div className="relative">
                    <div
                      className="right-0 top-[-28px] lg:top-[140px] z-[8] absolute cursor-pointer hover:text-black backdrop-blur-2xl px-2 text-[19px] rounded-[5px] font-bold bg-[#fe0000db] "
                      onClick={() => {
                        document.body.style.overflow = "auto";
                        setshowImg(false);
                      }}
                    >
                      CLOSE
                    </div>
                    <PinchToZoom>
                      <img className="w-screen" src={imgSrc} alt="" />
                    </PinchToZoom>
                  </div>
                </div>
              </div>
            )}
            <div className="pt-4     ">
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ type: "tween", duration: 1 }}
                className=""
              >
                <div className=" w-max h-max nameFontBold  ">
                  <h1 className="title-name-cv text-[34px] lg:text-[54px] lg:font-bold">
                    Jorge Ortega
                  </h1>{" "}
                </div>
              </motion.div>

              <div className="pt-[13px] pb-[13px] text-[24px] flex">
                <p className="pt-[3px] lg:text-[28px] ">Developer</p>
                <img className="fill-slate-200 pl-1" src={KeyboardSvg} alt="" />
              </div>
            </div>
            <div className="flex items-center">
              <div className="flex flex-col ml-2 mt-[17px] ">
                <SocialNetworks
                  url={"https://www.instagram.com/jorgeandresyts/"}
                  img={InstagramSGV}
                  classNamee={"ml-2"}
                  number={1}
                ></SocialNetworks>

                <SocialNetworks
                  url={"https://www.facebook.com/mateo.garrido.5268"}
                  img={FacebookSVG}
                  classNamee={"ml-[-4px]"}
                  number={2}
                ></SocialNetworks>
                <SocialNetworks
                  url={"https://github.com/jorgeortega123"}
                  img={LinkedinSGV}
                  classNamee={"ml-2"}
                  number={3}
                ></SocialNetworks>
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ type: "tween", duration: 2 }}
                className="mt-[18px] relative w-[110px] h-[110px] lg:w-[148px] lg:h-[148px] flex flex-col justify-center items-center"
              >
                <div className="cvImage  w-full h-full flex flex-col items-center ">
                  <div className="hidden absolute z-[0] animated-text"></div>
                  <div className=" w-full h-full border-[3px] border-dashed  rounded-full"></div>
                </div>
              </motion.div>
            </div>
          </div>
          <div className="lg:hidden console-containerr w-full flex justify-center">
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
          <div id="about" className="textWrote w-11/12 lg:full mx-auto ">
            <div className="w-full flex flex-col  justify-center items-center">
              <div className="relative flex flex-col space-y-5 mb-5 w-full lg:lg:w-5/12">
                <p className="titleText">{dataText.headers.about}</p>
                <div
                  className="normalText containerText"
                  dangerouslySetInnerHTML={{
                    __html: dataText.headers.aboutInfo,
                  }}
                ></div>
              </div>
            </div>
            <div id="proyects">
              <p className="titleText mb-5 mt-1 ">Proyects</p>
              <div className="flex-col space-y-4 lg:space-y-7 w-full">
                {dataText.proyects.map((e, n) => {
                  return (
                    <ContainerProyects
                      index={n}
                      title={e.title}
                      about={e.about}
                      img={e.img}
                      web={e.web}
                      langs={e.tags}
                      inGroup={e.onGroup}
                      showImage={showImage}
                    />
                  );
                })}
              </div>
            </div>
            <div id="contact" className="mb-[40px] lg:w-[600px]">
              <p className="titleText mt-5 mb-3 ">{dataText.headers.contact}</p>
              <div className="m-2 ">
                <p className="mb-3">{dataText.contact.about}</p>
                <div className="bg-[#3672ffe9] rounded-[15px] w-full items-center flex flex-col justify-center">
                  <div
                    className="flex cursor-pointer"
                    onClick={() => copyToClipBoard("number")}
                  >
                    <div className="">
                      <img
                        className="w-[36px] h-[36px] "
                        src={CallSVG}
                        alt=""
                      />
                    </div>
                    <p className="text-[16px] pt-[5px] pl-2 w-[238px] text-center hover:text-green-400">
                      {"+593 9627  16235"}
                    </p>
                    <img
                      className="w-[22px] h-[22px] mt-[2px]"
                      src={CopySGV}
                      alt=""
                    />
                  </div>
                  <div
                    className="flex cursor-pointer"
                    onClick={() => copyToClipBoard("email")}
                  >
                    <img className="w-[36px] h-[36px]" src={MailSVG} alt="" />
                    <p className="text-[16px] pt-[5px]  w-[238px]  pl-2 underline hover:text-green-400">
                      {dataText.contact.email}
                    </p>
                    <div className="w-[22px] h-[22px]  mt-[2px] fill:[#21319203]">
                      <img
                        className="w-[22px] h-[22px] mt-[2px]"
                        src={CopySGV}
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative w-full flex justify-center mt-3 ml-2">
                {onFocusTextarea && (
                  <div className="px-2 indent-9 absolute bottom-[-50px] rounded-md z-[4]  text-[12px] text-black bg-[#ffd000] rectangule">
                    Todo lo que escribas aqui sera enviado de{" "}
                    <span className="font-bold">manera anonima</span> . A no ser
                    que especifiques tu nombre o alguna manera de indentificarte
                  </div>
                )}
                <div className="w-full flex relative overflow-x-hidden overflow-y-auto ">
                  {showLineFromTextarea && (
                    <div className="transition continuous-2 absolute z-[5] w-full h-[1px] bottom-0 right-[48px]"></div>
                  )}
                  <textarea
                    id="textareOfFooter"
                    placeholder={dataText.extras.footer.input}
                    value={userTextWrote}
                    className="focus:border-cyan-500 px-2 input-sender hover:border-cyan-600 active:border-cyan-600 h-max  border-[1px] rounded-t-[6px] "
                    type="text"
                    name=""
                    onFocus={() => {
                      setonFocusTextarea(true);
                    }}
                    onBlur={() => {
                      setonFocusTextarea(false);
                    }}
                    onChange={(e) => {
                      setuserTextWrote(e.target.value);
                    }}
                  />
                  <div className="active:text-blue-700">
                    <div
                      onClick={() => sendText()}
                      className="fill-cyan-400 active:fill-blue-700 text-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill=""
                        height="48"
                        width="48"
                      >
                        <path d="M8 37V11l30.85 13Zm1.55-2.4L34.85 24 9.55 13.3v8.4L19.3 24l-9.75 2.25Zm0 0V13.3v12.95Z" />
                      </svg>
                      <p className="text-[16px] font-serif  cursor-pointer">
                        {!showLineFromTextarea ? "Send" : "..."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        id="bottomPage"
        className="text-slate-50 px-1 text-[12px] lg:text-[13px] flex mt-[20px] mb-[20px] bg-[#03224a] justify-around "
      >
        <div className="w-[250px] mb-[40px]">
          <p className="pb-3">Gracias por visitar el portafolio</p>
          <p>
            Si quieres dejar alguna recomendacion, critica o propuesta de
            trabajo puedes mandar un{" "}
            <span
              onClick={() => document.getElementById("textareOfFooter").focus()}
              className="underline cursor-pointer"
            >
              mensaje aqui:
            </span>{" "}
          </p>
        </div>
        <div className="flex-col capitalize ">
          <p className="mb-2">Redes sociales:</p>
          {staticInf.social.map((socialMedia, indexNum) => {
            return (
              <div
                onClick={() => {
                  goToUrl(socialMedia.url);
                }}
                className="underline hover:text-green-400 cursor-pointer"
                key={"socialData" + indexNum}
              >
                {socialMedia.name}
                <img src={socialMedia.svg} alt="" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CvMain;
