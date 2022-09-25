import React, { useEffect } from "react";
import useGlobalContext from "../../../context/useGlobalContext";
import { AnimatePresence, motion } from "framer-motion";
//import { data } from "../dataSimulateServer";
export default function PieDiagramTextInfo(dataToTransform) {
  //const { context } = useGlobalContext();

  /// NO MODIFICAR ESTO PILAAAA
  const data = dataToTransform.dataToTransform;
  ///NO MODIFICAR ESTO PILAAAA

  return (
    <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{opacity: 1, x: 0 }}
              transition={{
                duration: 1,
              }}
            >
    <div className="pt-2 overflow-auto ml-1 flex justify-end items-start  h-[220px]  infoAndcolors list-inside mt-auto mb-auto ">
      <div className="rounded">
        <div className="border-dashed rounded">
          <thead className="hidden text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr>
              <th scope="col" className=" px-1 py-1">
                name
              </th>
              <th scope="col" className="hidden sm:block px-1 py-1">
                relationship
              </th>
              <th scope="col" className="px-1 py-1">
                mount to pay
              </th>
            </tr>
          </thead>
          <tbody className="rounded">
            {data.map((n) => {
              return (
                <tr
                  key={n.color + "color"}
                  className=" odd:bg-gray-50  even:bg-slate-200"
                >
                  <th
                    scope="row"
                    className="foo sm:w-[20px] sm:h-[20px] w-[12px] h-[12px]  sm:px-0 sm:py-0 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                    style={{ background: n.color }}
                  ></th>
                  <td className="px-1 py-1 text-[12px] sm:text-[15px]">${n.value.toFixed(2)}</td>
                  <td className="px-0 sm:px-1 py-1 text-[12px] capitalize sm:text-[15px] ">{n.title}</td>
                </tr>
              );
            })}
          </tbody>
        </div>
      </div>
    </div></motion.div>
  );
}
