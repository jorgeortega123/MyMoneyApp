import React, { useEffect, useState } from "react";
import useMessageContext from "../../../../context/Modal/useMessageContext";
import useGlobalContext from "../../../../context/useGlobalContext";
export default function ShowHistoryDebst(nameUser) {
  const { message } = useMessageContext();
  const { context } = useGlobalContext();
  const [history, sethistory] = useState(context.data.historyDebst);
  useEffect(() => {
    sethistory(context.data.historyDebst);
     setTimeout(() => {
  }, 100);
  }, [nameUser]);

  if (!nameUser) {
    return false;
  }

  //const history= context.data.historyDebst
  //console.log(history);
  if (history === undefined) return <p>No hay nada que mostrar</p>;
  // if(history.nameUser===undefined) return <p>Nombre no encontrado</p>
  var twoDecimal = (a, b) => {
    var s = a - b;
    return s.toFixed(2);
  };
 
  return (
    <div>
      <table className="w-full text-sm text-left text-gray-500 mt-2 ">
        <thead className="text-[12px]  text-gray-700 uppercase bg-gray-50 ">
          <tr>
            <th scope="col" className="px-3 py-1">
              Deudor
            </th>
            <th scope="col" className="px-3 py-1">
              Agregado
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
          {history.map((d) => {
            //console.log(d, nameUser.nameUser);
            if (d.name === nameUser.nameUser) {
              return (
                <tr
                  key={d.incoming + "key"}
                  className="border-b   odd:bg-white even:bg-gray-50 "
                >
                  <th
                    scope="row"
                    className="capitalize px-3 py-2 font-medium text-gray-900  whitespace-nowrap"
                  >
                    {d.name}
                  </th>
                  {d.type === "de" ? (
                    <th
                      scope="row"
                      className=" capitalize px-3 py-2 font-normal text-red-900  whitespace-nowrap"
                    >
                      {"+" + d.incoming}
                    </th>
                  ) : (
                    <th
                      scope="row"
                      className="capitalize px-3 py-2 font-normal text-green-900  whitespace-nowrap"
                    >
                      {"-" + d.incoming}
                    </th>
                  )}

                  <td className="px-2 py-1">
                    {twoDecimal(d.afterDebst, d.incoming)}
                  </td>
                  <td className="px-2 py-1">{d.afterDebst.toFixed(2)}</td>
                </tr>
              );
              //   settableData([...tableData, e])
            } else {
              return <></>;
            }
          })}
        </tbody>
      </table>
    </div>
  );
}
