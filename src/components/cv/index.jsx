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
    var link = document.createElement("a");
    link.href ='https://jorge-ortega.pages.dev/';
    link.target = "_blank";
    link.click();
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
    <div className="text-[12px]">
      You must have redirected to:
      <a href={"https://jorge-ortega.pages.dev/"} className='underline pl-1 hover:text-blue-600'>https://jorge-ortega.pages.dev/</a>
    </div>
  );
};

export default CvMain;
