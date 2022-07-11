import React, { useEffect } from "react";
import useGlobalContext from "../context/useGlobalContext";
//import { data } from "../dataSimulateServer";
export default function PieDiagramTextInfo(dataToTransform) {
  //const { context } = useGlobalContext();
  const data = dataToTransform.dataToTransform
  
  return (
    <div className="ml-1 flex justify-center items-start flex-col h-full infoAndcolors list-inside mt-auto mb-auto ">
      <div>
        <div className="border-dashed rounded-sm">
          <thead className="hidden text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-3 py-1">
                name
              </th>
              <th scope="col" className="px-3 py-1">
                relationship
              </th>
              <th scope="col" className="px-3 py-1">
                mount to pay
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((n) => {
              return (
                <tr key={n.color + "color"} className="border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-200 odd:dark:bg-gray-800 even:dark:bg-gray-700">
                  <th 
                  
                    scope="row"
                    className="foo px-0 py-0 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                    style={{background: n.color}}
                  ></th>
                  <td className="px-1 py-1">${n.value.toFixed(2)}</td>
                  <td className="px-1 py-1 capitalize">{n.title}</td>
                </tr>
              );
            })}
          </tbody>
        </div>
      </div>
    </div>
  );
}
