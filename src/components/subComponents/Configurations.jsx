import React, { useEffect, useState } from "react";
import useGlobalContext from "../../context/useGlobalContext";

export default function Configurations(data) {
  const [showSioNo, setshowSioNo] = useState(false);
  const { context } = useGlobalContext();
  /*useEffect(() => {
    var a = context.showConfiguration();
    setshowSioNo(a);
  }, [context.ashowConfiguration]);

  //showConfiguration
*/
  //if (showSioNo) {
  return (
    <div
      onClick={() => context.showConfiguration(false)}
      className="fixed w-full h-screen flex justify-center z-[3000] py-14 top-0"
    >
      <div className="overflow-auto flex justify-center p-4  w-[280px]  border border-slate-400 rounded-xl bg-tranparent backdrop-blur-xl ">
        <div className="flex justify-start" >
          <div className="justify-start ">
            <p>Configuración</p>
             <div className="flex justify-center ">
            <button
              className="mt-2 w-max h-9  px-5 mb-2 font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-200 hover:text-blue-800 focus:z-10 focus:ring-1 focus:ring-gray-900    "
              onClick={(e) => addMove(e)}
            >
              {"Cerrar sesión"}
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
