import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import useGlobalContext from "../context/useGlobalContext";
import { AnimatePresence, motion } from "framer-motion";
export default function DetailsExpendsWeek(lang) {
  const { context } = useGlobalContext();
  const [aboutAccount, setaboutAccount] = useState();
  const [savings, setsavings] = useState(0);
  const [debstCount, setdebstCount] = useState(0);
  const [totalFixedAndVariables, settotalFixedAndVariables] = useState();
  const [maxFixedAndVariables, setmaxFixedAndVariables] = useState();
 const langg = lang.lang
  useEffect(() => {
    console.log(context)
    const toWork = context.data;

    const aboutTo = () => {
      var perWeek = toWork.perWeek;
      var inicialNum = 0;
      setsavings(toWork.savings[1]);

      ////////
      const sumDebst = toWork.debts.reduce((accumulator, object) => {
        return accumulator + object.mount;
      }, 0);
      const paid = toWork.debts.reduce((accumulator, object) => {
        return accumulator + object.paid;
      }, 0);

      setdebstCount(sumDebst - paid);
      ////////

      const sumFixed = toWork.cost[0].fixed.reduce((accumulator, object) => {
        return accumulator + object.max;
      }, 0);
      const sumVariables = toWork.cost[0].variables.reduce(
        (accumulator, object) => {
          return accumulator + object.max;
        },
        0
      );
      const sumFixed_cost = toWork.cost[0].fixed.reduce(
        (accumulator, object) => {
          return accumulator + object.cost;
        },
        0
      );
      const sumVariables_cost = toWork.cost[0].variables.reduce(
        (accumulator, object) => {
          return accumulator + object.cost;
        },
        0
      );

      settotalFixedAndVariables(sumFixed_cost + sumVariables_cost);
      setmaxFixedAndVariables(sumFixed + sumVariables);
      var totally =
        sumFixed + sumVariables / 2 + sumFixed_cost + sumVariables_cost / 2;
      setaboutAccount(totally);
    };
    aboutTo();
  }, [context.data, context.endServerRes]);

  const borrow = () => {
    var p = context.data?.perWeek;
    var a = p - totalFixedAndVariables;
    var b = p - maxFixedAndVariables;
    return [{ min: a, max: b }];
  };

  return (
   
    <div className="p-3 mt-[2px] mb-0 flex justify-left flex-col sm:justify-center items-start border rounded-xl bg-slate-100 m-0 ">
  
        <div className="font-sans p-0">
          <p className="">
            {langg.components.detailsWeek.greeting[0]}{" "}
            <a className="capitalize underline decoration-sky-500">{context.data?.name}</a>{" "}
            {langg.components.detailsWeek.infFirst[0]}{" "}
          </p>
          <div className="text-center pt-1 sm:text-left sm:ml-1">
            <p className="font-light">{langg.components.detailsWeek.AccountStats[0]} </p>
          </div>
        </div>
        <div className="w-full pt-2 capitalize p2">
          <table className="w-full text-sm text-left text-gray-500 ">
            <thead className="hidden text-xs text-gray-700 uppercase bg-gray-50 ">
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
                <th scope="col" className="px-3 py-1">
                  paid
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b  odd:bg-white even:bg-gray-50 ">
                <th
                  scope="row"
                  className="px-3 py-2 font-medium text-gray-900  whitespace-nowrap"
                >
                  {langg.components.detailsWeek.netWorth[0]}
                </th>
                <td className="px-2 py-1">{aboutAccount} </td>
                <td className="px-2 py-1">0 </td>
                <td className="px-2 py-1">0</td>
              </tr>
              <tr className="border-b  odd:bg-white even:bg-gray-50 ">
                <th
                  scope="row"
                  className="px-3 py-2 font-medium text-gray-900  whitespace-nowrap"
                >
                  {langg.components.detailsWeek.savings[0]}
                </th>
                <td className="px-2 py-1">{savings.value} </td>
                <td className="px-2 py-1">0 </td>
                <td className="px-2 py-1">0</td>
              </tr>
              <tr className="border-b  odd:bg-white even:bg-gray-50 ">
                <th
                  scope="row"
                  className="px-3 py-2 font-medium text-gray-900  whitespace-nowrap"
                >
                  {langg.components.detailsWeek.debts[0]}
                </th>
                <td className="px-2 py-1">{debstCount.toFixed(2)} </td>
                <td className="px-2 py-1">0 </td>
                <td className="px-2 py-1">0</td>
              </tr>
              <tr className="border-b  odd:bg-white even:bg-gray-50 ">
                <th
                  scope="row"
                  className="px-3 py-2 font-medium text-gray-900  whitespace-nowrap"
                >
                  {langg.components.detailsWeek.abilityToBorrow[0]}
                </th>
                <td className="px-2 py-1">{borrow()[0].min.toFixed(2)} </td>
                <td className="px-2 py-1">{borrow()[0].max.toFixed(2)} </td>
                <td className="px-2 py-1">{borrow()[0].min.toFixed(2) * 4}</td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
  );
}
