import React, { useEffect, useState } from "react";

export default function PreRegister() {
  const [onError, setonError] = useState(false);
  const [main, setmain] = useState({});
  useEffect(() => {
    var data = localStorage.getItem("tokenInf");
    if (data) {
      setmain(JSON.parse(data));
    } else {
      setonError(true);
    }
  }, []);

  if (onError) {
    return <p>Error</p>;
  }
  return (
    <div className="w-screen h-screen flex flex-col items-center init">
      <div className="pt-[100px] relative flex-col items-center justify-center">
        <div className="h-[100px] flex items-center justify-center">
          <p className="absolute pt-[37px] z-[1]  text-[60px] mb-[40px]">
            M<span className="text-green-400">$</span>M
          </p>
        </div>
      </div>

      <div className="pt-[40px]">
        <div className="w-full bg-slate-200 px-4 border-[1px] border-slate-700 rounded-xl">
          <p className="text-center text-[30px]">Pre-Registro </p>
        </div>
        <div className=" w-full items-center justify-center flex pt-6">
          <img src={main.picture} className="w-12 h-auto rounded-full" alt="" />
        </div>
        <div className="pt-1 w-[250px] items-center flex flex-col justify-center text-center">
          <p>
            Hola{" "}
            <span className="text-blue-400 font-bold">{main.given_name}</span>
          </p>
          <p>Muchas gracias por ingresar.</p>
          <p className="py-4">
            Actualmente estamos trabajando en pequenios detalles para que todo
            funcione.
          </p>

          <p className="py-3">
            Cuando este todo listo te enviaremos una invitacion a:{" "}
            <span className="underline">{main.email}</span>{" "}
          </p>
        </div>
      </div>
    </div>
  );
}
