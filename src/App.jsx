import { useEffect, useState } from "react";
import "./index.css";
import useGlobalContext from "./context/useGlobalContext";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { lang, phrases } from "./dataSimulateServer";
import Login from "./components/login";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import MainPage from "./MainPage";
import CvMain from "./components/cv";
import EventMain from "./components/event/Event";
import Form from "./components/myMoney/Form";
import Games from "./components/games";
import PreRegister from "./components/myMoney/elements/PreRegister";
import Dedos from "./components/cv/Dedos";
import FetchComponent from "./components/cv/Dedos";
const server = "https://que-pasa-tronco.koyeb.app";
function App() {
  const { context } = useGlobalContext();
  const [onErrorServerOut, setonErrorServerOut] = useState(false);
  const [serverResponsive, setserverResponsive] = useState();
  const [endServerRes, setendServerRes] = useState(false);
  const [textLoading, settextLoading] = useState("Verificando...");
  const [finalLang, setfinalLang] = useState(lang.es);
  const [langByUser, setlangByUser] = useState("es");

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
          <Route path="/app/myMoney/preRegister" element={<PreRegister />} />
          <Route path="/games" element={<Games />} />
          <Route path="/login" element={<Login />} />
          <Route path="/event" element={<EventMain />} />
          <Route path="/cv" element={<CvMain />} />
          <Route path="/dedos" element={<FetchComponent />} />
        </Routes>
      </GoogleOAuthProvider>
      
    </Router>
  );
}


export default App;
