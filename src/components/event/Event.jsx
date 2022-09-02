import axios from "axios";
import React, { useEffect, useState } from "react";
import { SpinnerInfinity } from "spinners-react";
import useGlobalContext from "../../context/useGlobalContext";
import "./eventScreen.scss";
import MainEvent from "./MainEvent";

export default function EventMain() {
  const { context } = useGlobalContext();
  const server = context.server;
  const [event, setEvent] = useState(false);
  const [contenido, setcontenido] = useState("Connecting to server...");
  const [hostsms, sethostsms] = useState(null);
  useEffect(() => {
    console.log("hamksdlas")
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
          sethostsms("Lo que buscas, no existe o no estas autorizado");
        } else {
          setcontenido(`Ola Danna`);
          sethostsms(`Recuerda que lo hice con amor ∞ `);
           setTimeout(() => {
            setEvent(true);
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
            <p className="pt-4 text-slate-600 text-slate-100 text-[20px] mb-[40px]">
              {contenido}
            </p>
            <div className="animate-pulse flex space-x-4 pt-3 w-[300px]">
              <div className="flex-1 space-y-6 py-1">
                <div className="h-2 bg-slate-300 rounded"></div>
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="h-2 bg-slate-300 rounded col-span-2"></div>

                    <div className="h-2 bg-slate-300 rounded col-span-1"></div>
                    <div className="h-2 bg-slate-300 rounded col-span-1"></div>
                    <div className="h-2 bg-slate-300 rounded col-span-2"></div>
                  </div>
                  <div className="h-2 bg-slate-300 rounded"></div>
                  <div className="h-2 bg-slate-300 rounded"></div>
                </div>
              </div>
            </div>
            <p className="mt-[20px] w-[250px] text-slate-700 text-slate-200 text-center pt-4 text-[19px] mr-auto ml-auto">
              {hostsms !== null && <p>{hostsms}</p> }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
