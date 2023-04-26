import React, { useEffect, useState } from "react";
import useGlobalContext from "../../../../context/useGlobalContext";
import axios from "axios";
import useMessageContext from "../../../../context/Modal/useMessageContext";
import { useNavigate } from "react-router-dom";

export default function Configurations(data) {
  useEffect(() => {
    document.body.style.overflowY = "hidden"
  }, [])
  
  const [showSioNo, setshowSioNo] = useState(false);
  const { message } = useMessageContext();
  const { context } = useGlobalContext();
  const server = context.server;
  let navigate = useNavigate();
    const closeModeal = () => { 
      context.showConfiguration(false)
      document.body.style.overflowY = "scroll"
    }
    const relaodDataCost =()=> { 
      axios
      .post(server + "/newContabilitie", {
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
          description:  err.message,
        });
      });
    }
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
    <div className="absolute left-0 w-screen h-screen bg-[#241f1f7a]  flex justify-center z-[39] py-14 top-0 ">
      <div className="overflow-auto h-[92%] shadow-2xl bg-slate-200 shadow-slate-500 flex justify-center p-4 sm:w-[320px] w-[300px]  border border-slate-400 rounded-xl bg-tranparent backdrop-blur-xl ">
        <div className="flex flex-col">
          <div className="flex justify-between ">
            <p className="text-[15px]">Configuración</p>
            <div>
            <button
              type="button"
              className="ml-auto -mx-1.5 -my-1.5 bg-red-200 text-red-500 rounded-lg focus:ring-1 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex h-8 w-8 "
              data-dismiss-target="#alert-1"
              aria-label="Close"
              onClick={()=>closeModeal()}
            >
              <span class="sr-only">Close</span>
              <svg
                aria-hidden="true"
                class="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
            </div>
            </div>
            <div className="flex justify-center items-center flex-col ">
              <button
                className="mt-2 w-max h-9  px-5 mb-2 font-medium text-gray-900 focus:outline-none bg-blue-200 rounded-full border border-gray-200 hover:bg-red-200 hover:text-red-800 focus:z-10 focus:ring-1 focus:ring-gray-900    "
                onClick={(e) => {
                  localStorage.removeItem("token");
                  location.reload();
                }}
              >
                {"Cerrar sesión"}
              </button>
              <textarea className="scrollSmall h-[360px] removeOUTLINES border-y-[1px] border-slate-300 " name="" id="" cols="30" rows="10" spellCheck={false}>
                {JSON.stringify(context.data)}
              </textarea>
              <button
                className="mt-2 w-max h-9  px-5 mb-2 sm:font-medium font-[12px] text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-200 hover:text-blue-800 focus:z-10 focus:ring-1 focus:ring-gray-900    "
                onClick={(e) =>
                  navigator.clipboard.writeText(JSON.stringify(context.data))
                }
              >
                {"Copiar mis datos"}
              </button>
              <button
                className="mt-2 w-full h-max  p- mr-2 mb-2 sm:font-medium font-[10px] text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-200 hover:text-blue-800 focus:z-10 focus:ring-1 focus:ring-gray-900    "
                onClick={() => securityCopy()}
              >
                Hacer copia de seguridad
              </button>
              <button
                className="mt-2 w-full h-max  px-5 mr-2 mb-2 sm:font-medium font-[10px] text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-200 hover:text-blue-800 focus:z-10 focus:ring-1 focus:ring-gray-900    "
                onClick={() =>   {
                  context.showConfiguration(false)
                  navigate("/app/myMoney/form", { replace: true })}
                }
                  
              >
                Editar datos
              </button>
              <button
                className="mt-2 w-full h-max  px-5 mr-2 mb-2 sm:font-medium font-[10px] text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-200 hover:text-blue-800 focus:z-10 focus:ring-1 focus:ring-gray-900    "
                onClick={()=>relaodDataCost()}
              >
                Resetar costos y gastos
              </button>
            </div>
        
        </div>
      </div>
    </div>
  );
  //} else {
  //  return <></>;
  // }
}
