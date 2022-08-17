import { useEffect, useState } from "react";
import "./index.css";
import "./data.json";
import DetailsExpendsWeek from "./components/DetailsExpendsWeek";
import ServerOut from "./components/subComponents/ServerOut";
import { SpinnerInfinity } from "spinners-react";
import Skeleton from "@mui/material/Skeleton";
import { PieDiagramHome } from "./components/PieDiagramHome";
//import PieDiagramTextInfo from "./components/PieDiagramTextInfo";
import AddMoveCash from "./components/AddMoveCash";
//import { data, serverRes } from "./dataSimulateServer";
import axios from "axios";
import useGlobalContext from "./context/useGlobalContext";
import { GlobalContextComponent } from "./context/GlobalContext";
import { MessageContextComponent } from "./context/Modal/MessageContext";
import { lang, phrases } from "./dataSimulateServer";

import { display } from "@mui/system";
import { AnimatePresence, motion } from "framer-motion";
import Login from "./components/Login";
import CahrgingData from "./components/subComponents/CahrgingData";
import ToDay from "./components/ToDay";
import Configurations from "./components/subComponents/Configurations";
import Wave from "./UI/Wave";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Event from "./components/subComponents/event/Event";
import { render } from "react-dom";
import MainPage from "./MainPage";
import MainEvent from "./components/subComponents/event/MainEvent";
//import useGlobalContext from "../context/useGlobalContext";
const server = "https://mymone.azurewebsites.net";

function App() {
  const { context } = useGlobalContext();
  const [onErrorServerOut, setonErrorServerOut] = useState(false);
  const [serverResponsive, setserverResponsive] = useState();
  const [endServerRes, setendServerRes] = useState(false);
  const [textLoading, settextLoading] = useState("Verificando...");
  const [finalLang, setfinalLang] = useState(lang.es);
  const [langByUser, setlangByUser] = useState("es");
  const [falsetrue, setfalsetrue] = useState(false);
  const [langFromBotton, setlangFromBotton] = useState(lang.en);
  const [loginValidation, setloginValidation] = useState(false);
  const [showConfigg, setshowConfigg] = useState(false);
  const [frase, setfrase] = useState("...");
  ///////
  useEffect(() => {
    if (langByUser === "en") {
      setfinalLang(lang.es);
      setlangByUser("es");
    } else if (langByUser === "es") {
      setfinalLang(lang.en);
      setlangByUser("en");
    }
    var d = new Date();
    var dayName = d.toString().split(" ")[0];
    //var monthDay = d.toString().split(" ")[1];
    //var numberDay = d.toString().split(" ")[2];
    //var yearDay = d.toString().split(" ")[3];
    //console.log(context.data);
    if (context.data != undefined) {
      if (context.endServerRes === true) {
        if (dayName === "Sun") {
          //console.log(context.data.isValueSunday)
          if (context.data.isValueSunday === false) {
            console.log("si x2");
            axios.post(context.server + "/newContabilitie", {
              name: localStorage.getItem("token"),
              reset: true,
            });
          }
        }
        //DEL- setloginValidation(localStorage.getItem("token"));
        //DEL- setendServerRes(true);
        frases();
      }
    }
  }, []);

  const frases = () => {
    var max = phrases.length;
    var min = 0;
    var arr = Math.floor(Math.random() * 21);
    setfrase(phrases.es[arr]);
    console.log(frase);
  };
  setTimeout(() => {
    settextLoading("Buscando el servidor...");
    setTimeout(() => {
      settextLoading("Ten paciencia...");
    }, 4000);
  }, 7000);
  const MainScreen = () => {};
  //<
  /* if (endServerRes === true) {}

   */
  return(
    <Router>
      <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<Login />} />
        <Route path="/event" element={<MainEvent />} />
      </Routes>
    </Router>
  );
}

/*    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path="teams" element={<Teams />}>
        <Route path=":teamId" element={<Team />} />
        <Route path="new" element={<NewTeamForm />} />
        <Route index element={<LeagueStandings />} />
      </Route>
    </Route>
  </Routes>*/
/*


*/

export default App;
