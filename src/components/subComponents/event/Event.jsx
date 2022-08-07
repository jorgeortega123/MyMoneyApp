import React, { useEffect, useState } from "react";
import "./eventScreen.scss";
import Landscape from "./Landscape";
import MainEvent from "./MainEvent";

export default function Event() {
     const [event, setEvent] = useState(false);
     const [contenido, setcontenido] = useState("Verificando evento...")
     const [querybar, setquerybar] = useState("")
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
 
  if(qs.id==="812D301313") { 
           setEvent(true)
  } else { 
     setcontenido("Evento no reconocido")
  }
  console.log(qs.id); 
       
     }, [])
     
  
  if (event) {
     return <MainEvent />;
   }
  return (
    <div className="w-full h-screen overflow-x-hidden items-center">
      <Landscape />
      <div className="w-screen h-screen flex justify-center items-center relative ">
      <div className="bg-transparent w-[300px] mt-[-400px] flex flex-col justify-center   z-[4000]  ">
        <div class="container">
          <div class="circle">
            <div class="loader"></div>
          </div>
        </div>
        <p className="z-[4000] w-max">{contenido}</p>
      </div>
      </div>
    </div>
  );
}
