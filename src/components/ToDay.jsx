import React from "react";
import axios from "axios";
import useGlobalContext from "../context/useGlobalContext";
import useMessageContext from "../context/Modal/useMessageContext";
export default function () {
  const { context } = useGlobalContext();
  const server = context.server;
  const { message } = useMessageContext();
  var securityCopy = () => {
    axios
      .post(server + "/download", {
        user: context.user,
      })
      .then((res) => {
        message({
          type: res.data.message,
          title: res.data.title,
          description: res.data.data,
        });
      }).catch((err)=>{ 
          message({
               type: "error",
               title: "Error desconocido",
               description: "No se completo la copia de seguridad",
             });
      })
  };
  //
  return (
    <div className="p-3 mb-0 flex justify-left flex-col sm:justify-center items-start border rounded-xl bg-slate-100 m-0 ">
      <p>Dinero gastado hoy dia:</p>

      <button
        className="mt-2 w-full h-9  px-5 mr-2 mb-2 font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-200 hover:text-blue-800 focus:z-10 focus:ring-1 focus:ring-gray-900    "
        onClick={() => securityCopy()}
      >
        Hacer copia de seguridad de los datos
      </button>
    </div>
  );
}
