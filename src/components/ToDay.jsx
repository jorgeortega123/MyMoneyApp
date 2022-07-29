import React, { useEffect, useState } from "react";

import useGlobalContext from "../context/useGlobalContext";
import useMessageContext from "../context/Modal/useMessageContext";
export default function () {
  const { context } = useGlobalContext();
  const { message } = useMessageContext();
  const [showTable, setshowTable] = useState(false);
  const [tableData, settableData] = useState([]);
  const [toDayCosts, settoDayCosts] = useState([]);
  const [cashWasted, setcashWasted] = useState(0);

  const server = context.server;
  var d = new Date();
  var dayName = d.toString().split(" ")[0];
  var monthDay = d.toString().split(" ")[1];
  var numberDay = d.toString().split(" ")[2];
  var yearDay = d.toString().split(" ")[3];
  var idOfCost = numberDay + yearDay + monthDay;
  useEffect(() => {
    settoDayCosts(context.data.history.today);
    setshowTable(true);
    //settableData(context.data.history.today)
    var arr = context.data.history.today;
    console.log(context.data.history.today);
    var d = new Date();

    //numberDay + yearDay + monthDay
    var CashWasted = 0;
    var countData = 0;
    /*arr.map((e) => {
    CashWasted +=1
    if (e.day===dayName) { 
      if(e.id===idOfCost){
        countData += 1;
          setcashWasted((a)=> a + e.value)
          settableData([...tableData, e])
          
      }
    }*/

    //});
    /* if (countData >= 2 ) {
      setshowTable(true);
    }*/
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

  //
  if (cashWasted===0) {return ;} 
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
            {toDayCosts.map((d) => {
              if (d.day === dayName) {
                if (d.id === idOfCost) {
                  // countData += 1;
                  setcashWasted((a) => a + d.value);
                  return (
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
                      <td className="px-2 py-1">{d.before.toFixed(2)}</td>
                      <td className="px-2 py-1">{d.after.toFixed(2)}</td>
                    </tr>
                  );
                  //   settableData([...tableData, e])
                }
              } else {
                return <></>;
              }
            })}
          </tbody>
        </table>
      ) : (
        <>Nada que mostrar</>
      )}
    </div>
  );
}
