import React, { useEffect, useState } from "react";

import useGlobalContext from "../../../context/useGlobalContext";
import useMessageContext from "../../../context/Modal/useMessageContext";
import dayjs from "dayjs";
import Container1 from "./Container/Container";
export default function () {
  const { context } = useGlobalContext();
  const { message } = useMessageContext();
  const [showTable, setshowTable] = useState(true);
  const [tableData, settableData] = useState([]);
  const [toDayCosts, settoDayCosts] = useState([]);
  const [cashWasted, setcashWasted] = useState(0);
  const [showCon, setshowCon] = useState(true);

  const server = context.server;
  const compare = dayjs().$d.toISOString();
  var date = dayjs().$d.toString();
  var datee = date.split(" ");
  var [mes, dia, anio] = [datee[1], datee[2], datee[3]];
  var hoyDiaEs = mes + dia + anio;

  const arr = [];
  useEffect(() => {
    context.data.history.today.map((e) => {
      if (e.date === undefined) return false;
      var dataManipulate = dayjs(e.date).$d.toString().split(" ");
      var [mes0, dia0, anio0] = [
        dataManipulate[1],
        dataManipulate[2],
        dataManipulate[3],
      ];
      var idFecha = mes0 + dia0 + anio0;
      if (idFecha === hoyDiaEs) {
        if (arr.includes(e)) {
          return;
        }
        arr.push(e);
      }
    });
    //settoDayCosts((toDayCosts) => [...toDayCosts, e]);
    settoDayCosts([...arr]);
    setcashWasted(2);
    // setcashWasted((a) => a + e.value);
    //setshowTable(true)
    //
    var costosDeHoyDia = arr.reduce((accumulator, object) => {
      return accumulator + object.value;
    }, 0);
    setcashWasted(costosDeHoyDia);
  }, [context.data]);

  if (cashWasted === 0) {
    return;
  }
  if (!showCon) {
    return (
      <p
        onClick={() => setshowCon(true)}
        className="absolute text-[14px] pl-4 pb-2"
      >
        Mostrar datos
      </p>
    );
  }
  return (
    <Container1>
      <div className="absolute bg-[#63ff3ce5] w-1 h-full z-[0] left-0 top-0"></div>
      <div className=" flex justify-left flex-col sm:justify-center items-start  ">
        <div className="flex items-center justify-between w-full">
          <div className="">
            Dinero gastado hoy dia: <a>$ {cashWasted.toFixed(2)}</a>
          </div>
          <div className="w-max mr-0 pr-0 pb-[4px]">
            <button
              type="button"
              class="ml-auto -mx-1.5 -my-1.5 bg-red-200 text-red-500 rounded-lg focus:ring-1 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex h-8 w-8 "
              data-dismiss-target="#alert-1"
              aria-label="Close"
              onClick={() => setshowCon(false)}
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
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
        </div>
        {showTable ? (
          <table className="w-full text-sm text-left text-gray-500 ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
              <tr>
                <th scope="col" className="px-3 py-1 truncate ">
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
              {toDayCosts.map((d, index) => {
                return (
                  <tr
                    key={d.day + "key" + index}
                    className="border-b   odd:bg-white even:bg-gray-50 "
                  >
                    <th
                      scope="row"
                      className="truncate capitalize px-3 py-2 font-medium text-gray-900  whitespace-nowrap"
                    >
                      {d.costName}
                    </th>
                    <th
                      scope="row"
                      className="capitalize px-3 py-2 font-medium text-gray-900  whitespace-nowrap"
                    >
                      {d.value.toFixed(2)}
                    </th>
                    <td className="px-2 py-1">{d.before.toFixed(2)}</td>
                    <td className="px-2 py-1">{d.after.toFixed(2)}</td>
                  </tr>
                );
                //   settableData([...tableData, e])
              })}
            </tbody>
          </table>
        ) : (
          <>Nada que mostrar</>
        )}
      </div>
    </Container1>
  );
}
