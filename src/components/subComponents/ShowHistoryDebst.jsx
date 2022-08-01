import React from 'react'
import useMessageContext from "../../context/Modal/useMessageContext";
import useGlobalContext from "../../context/useGlobalContext";
export default function ShowHistoryDebst(nameUser) {
     if (!nameUser) {return false} 

     const { message } = useMessageContext();
     const { context } = useGlobalContext();
     const history= context.data.historyDebst
     console.log(history)
     if (history==={}) return <p>No hay nada que mostrar</p> 
     if (history===undefined) return <p>No hay nada que mostrar</p> 
    // if(history.nameUser===undefined) return <p>Nombre no encontrado</p>
  return (
    <div><table className="w-full text-sm text-left text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
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
              if (d.name === nameUser) {
                  return (
                    <tr
                      key={d.incoming + "key"}
                      className="border-b   odd:bg-white even:bg-gray-50 "
                    >
                      <th
                        scope="row"
                        className="capitalize px-3 py-2 font-medium text-gray-900  whitespace-nowrap"
                      >
                        {d.type}
                      </th>
                      <th
                        scope="row"
                        className="capitalize px-3 py-2 font-medium text-gray-900  whitespace-nowrap"
                      >
                        {d.name}
                      </th>
                      <td className="px-2 py-1">{d.incoming}</td>
                      <td className="px-2 py-1">{d.beforeDebst.toFixed(2)}</td>
                      <td className="px-2 py-1">{d.afterDebst.toFixed(2)}</td>
                    </tr>
                  );
                  //   settableData([...tableData, e])
                
              } else {
                return <></>;
              }
            })}
          </tbody>
        </table></div>
  )
}
