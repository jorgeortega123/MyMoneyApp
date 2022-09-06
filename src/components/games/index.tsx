import "./index.scss";
import React, { useEffect, useRef } from "react";

export default function Games() {
  var qs = (function (a: any): { name: string } {
    //Para que funcione el router, es necesario usar el formato:
    // router/ruta?event=1234&token=kajsdn123&yeah=false
    // el & se usa para dividir las rutas entre si
    if (a === "") return { name: "a" };
    var b = {} as { name: string };
    for (var i = 0; i < a.length; ++i) {
      var p = a[i].split("=", 2);
      if (p.length === 1) b[p[0]] = "";
      else b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
    }
    return b;
  })(window.location.search.substr(1).split("&"));
  const ref = useRef()
  useEffect(() => {

        var ctx = ref.current.getContext('2d')
        ctx.moveTo(192, 160);
        ctx.lineTo(500, 100);
        ctx.stroke();
  }, [])
  
 

  if (qs?.name === "semaforo")
    return (
      <div className="w-screen h-screen game-main-container">
        <div className="absolute w-full h-full flex  justify-center">
          <p className="game-title ">{qs.name + " game"}</p>

        </div>
        <div className="w-full h-full flex  justify-center items-center">
            <div className="w-[500px] h-[500px] text-center bg-slate-800" ><p>canvas</p>
            <canvas id="canvas" ref={ref}></canvas>
            </div>
            </div>
      </div>
    );
}
