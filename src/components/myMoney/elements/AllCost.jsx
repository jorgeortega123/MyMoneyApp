import React, { useEffect, useState } from "react";
import { Doughnut } from 'react-chartjs-2';
import { PieChart } from "react-minimal-pie-chart";

import useLangContext from "../../../context/subFunctions/useLangContext";
import useGlobalContext from "../../../context/useGlobalContext";

export default function AllCost() {
  const { context } = useGlobalContext();
  const { langs } = useLangContext();
  const [showData, setshowData] = useState(false);
  const [dataBasic, setdataBasic] = useState();
  const [pieCharAnalisis, setpieCharAnalisis] = useState()
  useEffect(() => {
    if (!langs?.lang) {
      setshowData(false);
      return;
    }
    if (langs?.onLoad === false) {
      return;
    }

    var [debst, fixDebst, other] = [
      langs.data.aPagarDeudas,
      langs.data.aPagarDeudasFijas,
      langs.data.sumaFixedDebst,
    ];
    Number(debst);
    Number(fixDebst);
    var rest = langs.data.userSalarey - fixDebst;

    const allArray = [];
    const basedArr = []
    basedArr.push({
      title: "Libre",
      color: "#242d3d",
      value: rest,
    });
    var fixed = {
      title: "Fijas",
      color: "#722d3d",
      value: other,
      total: false,
    }
    var fixedAc = {
      title: "Fijas adquiridas",
      color: "#100d3d",
      value: fixDebst,
      total: false,
    }
    basedArr.push(fixed, fixedAc)
    setpieCharAnalisis(basedArr)
    allArray.push(fixed);
    allArray.push(fixedAc);
    allArray.push({
      title: "Bajo un titular",
      color: "#100d3d",
      value: debst,
      total: false,
    });
    allArray.push({
      title: "Total",
      color: "#100d3d",
      value: other + fixDebst + debst,
      total: true,
    });
    
    
    setdataBasic(allArray);
    setshowData(true);
  }, [langs.onLoad]);
  const func = (a, b) => {
    var summ = (b * 100) / a;
    var sum = summ;
    return sum.toFixed(0) + "%";
  };
  const data = {
    labels: ["Red", "Green", "Yellow", "Color 1", "Color 2", "Color 3"],
    datasets: [
      {
        data: [300, 50, 100, 20, 80, 200],
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#db3d44",
          "#4257b2",
          "#FFCE56"
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#db3d44",
          "#4257b2",
          "#36A2EB"
        ]
      }
    ]
  };

  if (!showData) {
    return (
      <>
        <p>...</p>
      </>
    );
  }
  return (
    <div className="p-3 shadow-md border rounded-xl bg-slate-100">
      <div className=" grid gap-2 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 ">
        <p>Adittional data</p>
        {langs.lang}
        <div>
          <div>
            <table className="w-full text-sm text-left text-gray-500 ">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                <tr>
                  <td scope="col" className="px-3 py-1">
                    {"Deudas tipo"}
                  </td>
                  <td scope="col" className="px-3 py-1">
                    {"Valor"}
                  </td>
                  <td scope="col" className="px-3 py-1">
                    {"Porcentaje"}
                  </td>
                </tr>
              </thead>
              <tbody>
                {dataBasic.map((a, i) => {
                  return (
                    <tr
                      key={"key" + i}
                      className={`border-b   odd:bg-white even:bg-gray-50 ${
                        a.total == true && "even:bg-slate-200 odd:bg-slate-200"
                      } `}
                    >
                      <th
                        onClick={() => {
                          setshowHistoryTable(debtsAccounts.name);
                        }}
                        scope="row"
                        className="capitalize px-3 py-2 font-medium text-gray-900  whitespace-nowrap"
                      >
                        {a.title}
                      </th>
                      <td className="px-2 py-1">{a.value}</td>
                      <td className="px-2 py-1">
                        {func(langs.data.userSalarey, a.value)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div>
         
            </div>
          </div>
          <p></p>
        </div>
      </div>
    </div>
  );
}
