import axios from "axios";
import React, { useEffect, useState } from "react";
import { SpinnerInfinity } from "spinners-react";
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
          setcontenido("X No encontrado X");
          sethostsms("Lo que buscas, no existe o no estas autorizado")
        } else { 
          setcontenido(`Hola Danna`);
         sethostsms(`Recuerda que lo hice con amor, te amo ∞ `)
         setEvent(true)
        /* setTimeout(() => {
          location.href = "https://1aa38f3e.mymoneyapp.pages.dev/"
         }, 4500); */
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
    <div className="w-screen h-screen backGroundImage">
    <div className="flex items-center justify-center">
      <div className="pt-12 ">
        <SpinnerInfinity
          size={200}
          thickness={60}
          сolor={"#a384649a"}
          secondaryColor="rgba(0,0,0,0.24)"
          speed={190}
          className="mr-auto ml-auto"
        />
        <div className="text-center">
          <p className="pt-4 text-slate-600 text-slate-100 text-[20px] mb-[40px]">{contenido}</p>
          <div class="animate-pulse flex space-x-4 pt-3 w-[300px]">
            <div class="flex-1 space-y-6 py-1">
              <div class="h-2 bg-slate-300 rounded"></div>
              <div class="space-y-3">
                <div class="grid grid-cols-3 gap-4">
                  <div class="h-2 bg-slate-300 rounded col-span-2"></div>

                  <div class="h-2 bg-slate-300 rounded col-span-1"></div>
                  <div class="h-2 bg-slate-300 rounded col-span-1"></div>
                  <div class="h-2 bg-slate-300 rounded col-span-2"></div>
                </div>
                <div class="h-2 bg-slate-300 rounded"></div>
                <div class="h-2 bg-slate-300 rounded"></div>
              </div>
            </div>
          </div>
          <p
            className="mt-[20px] w-[250px] text-slate-700 text-slate-200 text-center pt-4 text-[19px] mr-auto ml-auto"
          
          >
            {hostsms}
            
          </p>
    
        </div>
      </div>
    </div></div>
  );
}
