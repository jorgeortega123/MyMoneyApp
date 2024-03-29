import React, { useEffect } from "react";
import useGlobalContext from "../../../context/useGlobalContext";
//import { data } from "../dataSimulateServer";
export default function PieDiagramTextInfo(dataToTransform) {
  //const { context } = useGlobalContext();

  /// NO MODIFICAR ESTO PILAAAA
  const data = dataToTransform.dataToTransform;
  ///NO MODIFICAR ESTO PILAAAA

  return (

    <div className="pt-2 overflow-auto ml-1 flex justify-end items-start  h-[220px]  infoAndcolors list-inside mt-auto mb-auto ">
      <div className="rounded">
        <div className="border-dashed rounded">
          <table>
          <thead className="hidden text-xs text-gray-700 uppercase  ">
            <tr>
              <th scope="col" className=" px-1 py-1">
                name
              </th>
              <th scope="col" className="hidden sm:block px-1 py-1">
                relationship
              </th>
              <th scope="col" className="px-1 py-1 truncate w-max">
                mount to pay
              </th>
            </tr>
          </thead>
          <tbody className="rounded">
            {data.map((n) => {
              return (
                <tr
                  key={n.color + "color"}
                  className=" odd:bg-transparent  even:bg-slate-100"
                >
                  <th
                    scope="row"
                    className="foo sm:w-[20px] sm:h-[20px] w-[12px] h-[12px]  sm:px-0 sm:py-0 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                    style={{ background: n.color }}
                  ></th>
                  <td className="px-1 py-1 text-[12px] sm:text-[15px]">${n.value.toFixed(2)}</td>
                  <td className="px-0 sm:px-1 py-1 text-[12px] capitalize sm:text-[15px] text-clip w-[20px]">{n.title}</td>
                </tr>
              );
            })}
          </tbody></table>
        </div>
      </div>
    </div>
  );
}
