import React, { useEffect, useState } from "react";
import axios from "axios";
import useGlobalContext from "../context/useGlobalContext";
import useMessageContext from "../context/Modal/useMessageContext";
export default function () {
  const { context } = useGlobalContext();
   const { message } = useMessageContext();
  const [showTable, setshowTable] = useState(false);
  const [tableData, settableData] = useState([]);
  const [toDayCosts, settoDayCosts] = useState([]);
  const [cashWasted, setcashWasted ]= useState(0);
  
  const server = context.server;
 
  useEffect(() => {
    settoDayCosts(context.data.history.today);
    //settableData(context.data.history.today)
    var arr = context.data.history.today
    console.log(context.data.history.today)
    var d = new Date();
    var dayName = d.toString().split(" ")[0];
    var monthDay = d.toString().split(" ")[1];
    var numberDay = d.toString().split(" ")[2];
    var yearDay = d.toString().split(" ")[3];
    var idOfCost = numberDay + yearDay + monthDay;
    //numberDay + yearDay + monthDay
    var CashWasted = 0;
    var countData = 0;
   arr.map((e) => {
    if (e.day===dayName) { 
      if(e.id===idOfCost){
        countData += 1;
          setcashWasted((a)=> a + e.value)
          settableData([...tableData, e])
      }
    }
          
    });
      if (countData != 0 ) {
      setshowTable(true);
    }
    
  }, [context.data]);

  // format server
  /*
  var formJsonDa = {
    day: dayName,
    id: numberDay + yearDay,
    extra: id,
    value: valueEdit,
    costName: l[arrNumberFound].title,
    before: beforeCredits,
    after: beforeCredits - valueEdit,
  };*/
  //

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
        message({
          type: "error",
          title: "Error desconocido",
          description: "No se completo la copia de seguridad",
        });
      });
  };
  //
  return (
    <div className="p-3 mb-0 flex justify-left flex-col sm:justify-center items-start border rounded-xl bg-slate-100 m-0 ">
      <p>
        Dinero gastado hoy dia: <a>$ {cashWasted}</a>
      </p>
      {showTable ? (
        <table className="w-full text-sm text-left text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr>
              <th scope="col" className="px-3 py-1">
                Costo
              </th>
              <th scope="col" className="px-3 py-1">
                Valor
              </th>
              <th scope="col" className="px-3 py-1">
                Antes
              </th>
              <th scope="col" className="px-3 py-1">
                Después
              </th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((d) => ( 
                <tr
                  key={d.extra + "key"}
                  className="border-b   odd:bg-white even:bg-gray-50 "
                >
                  <th
                    scope="row"
                    className="capitalize px-3 py-2 font-medium text-gray-900  whitespace-nowrap"
                  >
                    {d.costName} 
                  </th>
                  <td className="px-2 py-1">{d.value}</td>
                  <td className="px-2 py-1">
                    {d.before.toFixed(2)}
                  </td>
                  <td className="px-2 py-1">{d.after.toFixed(2)}</td>
                </tr>
              ))}
          </tbody>
        </table>
      ) : (
        <>Nada que mostrar</>
      )}

      <button
        className="mt-2 w-full h-9  px-5 mr-2 mb-2 font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-200 hover:text-blue-800 focus:z-10 focus:ring-1 focus:ring-gray-900    "
        onClick={() => securityCopy()}
      >
        Hacer copia de seguridad de los datos
      </button>
    </div>
  );
}
