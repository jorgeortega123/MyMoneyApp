import React, { useEffect, useState } from "react";
import useGlobalContext from "../../context/useGlobalContext";
import axios from "axios";
import useMessageContext from "../../context/Modal/useMessageContext";


export default function Configurations(data) {
  
  const [showSioNo, setshowSioNo] = useState(false);
  const { message } = useMessageContext();
  const { context } = useGlobalContext();
  const server = context.server;
  /*useEffect(() => {
    var a = context.showConfiguration();
    setshowSioNo(a);
  }, [context.ashowConfiguration]);

  //showConfiguration
*/
  //if (showSioNo) {
    var securityCopy = () => {
      console.log(context);
      axios
        .post(server + "/download", {
          user: context.data.user,
        })
        .then((res) => {
          message({
            type: res.data.message,
            title: res.data.title,
            description: res.data.data,
          });
        })
        .catch((err) => {
          console.log(err);
          message({
            type: "error",
            title: "Error desconocido",
            description: "No se completo la copia de seguridad " + err.message,
          });
        });
    };
  return (
    <div
      
      className="fixed w-full h-screen flex justify-center z-[3000] py-14 top-0"
    >
      <div className="overflow-auto flex justify-center p-4  w-[280px]  border border-slate-400 rounded-xl bg-tranparent backdrop-blur-xl ">
        <div className="flex justify-start" >
          <div className="justify-start ">
            <p >Configuración</p>
            <p onClick={() => context.showConfiguration(false)}>X</p>
             <div className="flex justify-center flex-col ">
            <button
              className="mt-2 w-max h-9  px-5 mb-2 font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-200 hover:text-blue-800 focus:z-10 focus:ring-1 focus:ring-gray-900    "
              onClick={(e) => {localStorage.removeItem("token"); location.reload()}}
            >
              {"Cerrar sesión"}
            </button>
            <textarea name="" id="" cols="30" rows="10">{JSON.stringify(context.data)}</textarea>
            <button
              className="mt-2 w-max h-9  px-5 mb-2 font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-200 hover:text-blue-800 focus:z-10 focus:ring-1 focus:ring-gray-900    "
              onClick={(e) => navigator.clipboard.writeText(JSON.stringify(context.data))}
            >
              {"Copiar mis datos"}
            </button>
            <button
        className="mt-2 w-full h-9  px-5 mr-2 mb-2 font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-200 hover:text-blue-800 focus:z-10 focus:ring-1 focus:ring-gray-900    "
        onClick={() => securityCopy()}
      >
        Hacer copia de seguridad de los datos
      </button>
          </div>
          </div>
         
        </div>
      </div>
    </div>
  );
  //} else {
  //  return <></>;
  // }
}
