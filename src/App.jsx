import { useEffect, useState } from "react";
import "./index.css";
//import { data, serverRes } from "./dataSimulateServer";
import axios from "axios";
import useGlobalContext from "./context/useGlobalContext";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { lang, phrases } from "./dataSimulateServer";
import Login from "./components/login";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
//import Event from "./components/subComponents/event/Event";
import MainPage from "./MainPage";
//import AllTransactions from "./components/myMoney/subComponents/AllTransactions";
import CvMain from "./components/cv";
import EventMain from "./components/event/Event";
import Form from "./components/myMoney/Form";
import Games from "./components/games";
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
  }, []);

  setTimeout(() => {
    settextLoading("Buscando el servidor...");
    setTimeout(() => {
      settextLoading("Ten paciencia...");
    }, 4000);
  }, 7000);

  return (
    <Router>
      <GoogleOAuthProvider clientId="436338134454-tgnq51gda1j2o6klajijdecv8soc6nhr.apps.googleusercontent.com">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/app/myMoney" element={<MainPage />}></Route>
          <Route path="/app/myMoney/form" element={<Form />} />
          <Route path="/games" element={<Games />} />
          {
            //<Route path="/data/transitions/costs" element={<AllTransactions />} />
          }

          <Route path="/login" element={<Login />} />
          <Route path="/event" element={<EventMain />} />
          <Route path="/cv" element={<CvMain />} />
        </Routes>
      </GoogleOAuthProvider>
      ;
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
