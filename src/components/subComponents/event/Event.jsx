import axios from "axios";
import React, { useEffect, useState } from "react";
import useGlobalContext from "../../../context/useGlobalContext";
import "./eventScreen.scss";
import Landscape from "./Landscape";
import MainEvent from "./MainEvent";

export default function Event() {
  const { context } = useGlobalContext();
  const server = context.server;
  const [event, setEvent] = useState(false);
  const [contenido, setcontenido] = useState("Verificando evento...");
  const [hostsms, sethostsms] = useState(null)
  const [querybar, setquerybar] = useState("");
  useEffect(() => {
    var qs = (function (a) {
      //Para que funcione el router, es necesario usar el formato:
      // router/ruta?event=1234&token=kajsdn123&yeah=false
      // el & se usa para dividir las rutas entre si
      if (a === "") return {};
      var b = {};
      for (var i = 0; i < a.length; ++i) {
        var p = a[i].split("=", 2);
        if (p.length === 1) b[p[0]] = "";
        else b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
      }
      return b;
    })(window.location.search.substr(1).split("&"));

    axios
      .post(server + "/event", {
        data: {
          name: qs.name,
          id: qs.id,
        },
      })
      .then((res) => {
        if (res.data.isValid === false) {
          setcontenido("Preparando un espacio para ti...");
          setTimeout(() => {
            setEvent(true);
          }, 2200);
        } else { 
          setcontenido(`Te dirigire a otra pagina para que sigas con esto...`);
         sethostsms(`JAJAJAJ perdon enserio no supe como arreglarlo`)
         setTimeout(() => {
          location.href = "https://1aa38f3e.mymoneyapp.pages.dev/"
         }, 4500);
        }
      })
      .catch(() => {
        setcontenido("Error desconocido");
        setTimeout(() => {
          window.location = "/";
       }, 2200);
    
      });

    console.log(qs.id);
  }, []);

  if (event) {
    return <MainEvent />;
  }
  return (
    <div className="w-full h-screen overflow-x-hidden items-center">
      {
        //<Landscape />
      }
      <div className="w-screen h-screen flex justify-center items-center relative ">
        <div className="bg-transparent w-[300px] mt-[-400px] flex flex-col justify-center   ">
          <div class="container">
            <div class="circle">
              <div class="loader"></div>
              
            </div>
          </div>
          <div className="w-full items-center  flex justify-center items-center relative ">
            <p className="z-[4000] w-[200px] text-center">{contenido}</p>
             {hostsms !== null && <p className="p-3 w-[200px] text-center items-center">{hostsms}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
