import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { serverRes } from "../dataSimulateServer";
export default function DetailsExpendsWeek(data) {
  const [aboutAccount, setaboutAccount] = useState();
  const [savings, setsavings] = useState(0);
  const [debstCount, setdebstCount] = useState(0);
  const [totalFixedAndVariables, settotalFixedAndVariables] = useState();
  const [maxFixedAndVariables, setmaxFixedAndVariables] = useState();

  useEffect(() => {
    const toWork = data.data;
    const aboutTo = () => {
      var perWeek = toWork.perWeek;
      var inicialNum = 0;
      setsavings(toWork.savings[0]);

      ////////
      const sumDebst = toWork.debts.reduce((accumulator, object) => {
        return accumulator + object.mount;
      }, 0);
      cons paid = toWork.debts.reduce((accumulator, object) => {
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
  }, []);

  const borrow = () => {
    var p = data.data.perWeek;
    console.log(totalFixedAndVariables, maxFixedAndVariables);
    var a = p - totalFixedAndVariables;
    var b = p - maxFixedAndVariables;
    console.log(a, b);
    return [{ min: a, max: b }];
  };

  return (
    <div className="p-3 flex justify-left sm:justify-center items-start border rounded-xl bg-slate-100 ">
      <div className="">
        <div className="font-sans">
          <p>
            Hi{" "}
            <a className="underline decoration-sky-500">{serverRes[0].name}</a>{" "}
            there's your account balance{" "}
          </p>
          <div className="text-center pt-1 sm:text-left sm:ml-1">
            <p className="font-light">Account management: </p>
          </div>
        </div>
        <div className="grow  pt-2 capitalize">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
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
                <th scope="col" className="px-3 py-1">
                  paid
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700">
                <th
                  scope="row"
                  className="px-3 py-2 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                >
                  net worth:
                </th>
                <td className="px-2 py-1">{aboutAccount} </td>
                <td className="px-2 py-1">0 </td>
                <td className="px-2 py-1">0</td>
              </tr>
              <tr className="border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700">
                <th
                  scope="row"
                  className="px-3 py-2 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                >
                  savings:
                </th>
                <td className="px-2 py-1">{savings.value} </td>
                <td className="px-2 py-1">0 </td>
                <td className="px-2 py-1">0</td>
              </tr>
              <tr className="border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700">
                <th
                  scope="row"
                  className="px-3 py-2 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                >
                  debts:
                </th>
                <td className="px-2 py-1">{debstCount} </td>
                <td className="px-2 py-1">0 </td>
                <td className="px-2 py-1">0</td>
              </tr>
              <tr className="border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700">
                <th
                  scope="row"
                  className="px-3 py-2 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                >
                  ability to borrow:
                </th>
                <td className="px-2 py-1">{borrow()[0].min.toFixed(2)} </td>
                <td className="px-2 py-1">{borrow()[0].max.toFixed(2)} </td>
                <td className="px-2 py-1">{borrow()[0].min.toFixed(2) * 4}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
