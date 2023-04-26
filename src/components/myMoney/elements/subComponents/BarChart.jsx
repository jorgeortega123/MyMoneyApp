import React, { useState } from "react";
import { useEffect } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import useGlobalContext from "../../../../context/useGlobalContext";
import dayjs from "dayjs";
import Container1 from "../Container/Container";
import useLangContext from "../../../../context/subFunctions/useLangContext";
const init = dayjs(dayjs().endOf("week").$d);
const date = init.toString();
const datee = date.split(" ");
const [mes, dia, anio] = [datee[1], datee[2], datee[3]];
const toDayString = mes + dia + anio;
const dayNumber = dayjs().day()
export default function BarChart() {
  const [dataArr, setdataArr] = useState({});
  const [lastArr, setlastArr] = useState({});
  const { context } = useGlobalContext();
  const [weeklyWaste, setweeklyWaste] = useState(0);
  const [follow, setFollow] = useState(false);
  const daysWeek = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes","Sabado","Domingo"];
  const { langs } = useLangContext();
  useEffect(() => {
    var arr = [];
    var arr_other = { w0: [], w1: [], w2: [], w3: [], w4: [], w5: [], w6: [] };

    for (let index = 0; index < 7; index++) {
      var newWest = dayjs(init).subtract((5 - index), "day");
      var date = dayjs(newWest).$d.toString();
      var datee = date.split(" ");
      var [mes, dia, anio] = [datee[1], datee[2], datee[3]];
      var hoyDiaEs = mes + dia + anio;
      arr.push({ day: newWest, n: index, local: hoyDiaEs, data: [] });
    }

    for (let i = 0; i < 6; i++) {
      var dataCompare = arr[i].local;
      context.data.history.today.map((e, index) => {
        if (e.date === undefined) return;
        var dataCompareE = dayjs(e.date);
        var datee1 = dataCompareE.toString().split(" ");
        var [me1s, di1a, ani1o] = [datee1[1], datee1[2], datee1[3]];
        var hoyDiaEs = di1a + me1s + ani1o;
        if (hoyDiaEs === dataCompare) {
          var s = dayjs(dayjs(e.date)).day();
          arr[s].data.push(e);
        }
      });
    }
  
    const arr2 = [];
    arr.map((a, ind) => {
      var subarr = [];
      var sum = 0;
      var name = "";
      var date=""
      for (let i = 0; i < a.data.length; i++) {
        sum = a.data[i].value + sum;
        name = a.data[i].costName;
      
        //subarr.push(a.data[i])
      }

      arr2.push({ costName: daysWeek[ind ], value: sum, date: a.local });
    });
    setdataArr(arr2);
    var gastadoSemanalmente = arr2.reduce((accumulator, object) => {
      return accumulator + object.value;
    }, 0);
    setweeklyWaste(gastadoSemanalmente);
    langs.weeklySet(gastadoSemanalmente)
    setFollow(true);
  }, [context.data]);
  //
  if (follow === false) {
    return <p></p>;
  }
  return (
    <Container1>
      <div className=" ml-[-44px] z-[0] flex flex-col items-center justify-center">
        <LineChart width={400} height={200} data={dataArr}>
          <Line type="monotone" dataKey="value" stroke="#8884d8" />
          <Tooltip />

          <XAxis dataKey="costName" />
          <YAxis dataKey="value" />
        </LineChart>
      </div>
      <p>
        Total gastado esta semana:{" "}
        <span className="text-cyan-600">{weeklyWaste.toFixed(2)}</span>{" "}
      </p>
      <table className="w-full text-sm text-left text-gray-500  border border-[#1d1d1d2f] ">
        <thead className="text-[.8rem]  rounded-md text-gray-700 uppercase bg-white ">
          <tr className="bg-[#1b1b1b25]">
            <th
              scope="row"
              className="w-[100px] capitalize font-medium px-3 py-2 text-gray-900  whitespace-nowrap"
            >
              Day
            </th>
            <th
              scope="row"
              className="capitalize px-3 py-2 font-medium text-gray-900  whitespace-nowrap"
            >
              Wasted
            </th>
            <th
              scope="row"
              className="capitalize px-3 py-2 font-medium text-gray-900  whitespace-nowrap"
            >
              Dates
            </th>
          </tr>
        </thead>
        <tbody>
          {dataArr.map((siu, num) => {
            return (
              <>
            
                <tr key={`table-from-bar ${num}`} className="border-b   odd:bg-white even:bg-gray-50 ">
                  <th
                    scope="row"
                    className={`capitalize px-3 py-2 font-medium text-gray-900 ${dayNumber===num && 'text-red-900 bg-slate-200'} whitespace-nowrap`}
                  >
                    {siu.costName}
                  </th>
                  <th
                    scope="row"
                    className={`capitalize px-3 py-2 font-medium text-gray-900 ${dayNumber===num && 'text-red-900 bg-slate-200'} whitespace-nowrap`}>
                    {siu.value.toFixed(2)}
                  </th>
                  <th
                    scope="row"
                    className={`relative overflow-x-auto capitalize px-3 py-2 font-medium text-gray-900 ${dayNumber===num && 'text-red-900 bg-slate-200'} whitespace-nowrap`}>
                    {siu.date} <p className="absolute top-2 pr-1 right-0">{dayNumber===num && 'Actual Day'}</p>
                  </th>
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
      <p>Ultimas 3 semanas: </p>
    </Container1>
  );
}
/*
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
const data = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400}, ...];

const renderLineChart = (
  <LineChart width={600} height={300} data={data}>
    <Line type="monotone" dataKey="uv" stroke="#8884d8" />
    <CartesianGrid stroke="#ccc" />
    <XAxis dataKey="name" />
    <YAxis />
  </LineChart>
);
//old
   var totalLength = context.data.history.today.length;
    var arr = context.data.history.today;
    console.log(arr)
    var newArray = [];
    var d = new Date();
    var monthDay = d.toString().split(" ")[1];
    var numberDay = d.toString().split(" ")[2];
    var yearDay = d.toString().split(" ")[3];
    var dayName = d.toString().split(" ")[0];
    // id: bodyReq.edit.numberDay + yearDay + bodyReq.edit.monthDay,
    //var presentDay = numberDay + yearDay + monthDay
    var maxLimit = 4;
    var alreadyExplored = [];
    var jsonToShowuser = []
    var jsonToShowuserFinal = []
    for (let s = 0; s < daysWeek.length; s++) {
      if (daysWeek[s] === dayName) {
        maxLimit = s;
      }
    }
    for (let i = arr.length -1; i > arr.length - maxLimit ; i--) {
      let entry = arr[i].id;
      if (alreadyExplored.includes(entry)) {
        maxLimit = -1;
      } else {
        alreadyExplored.push(arr[i].id);
        let value = 0
        for (let j = 0; j < arr.length; j++) {
          if (arr[j].id === entry) {
            value = value + arr[j].value
            //jsonToShowuser.push({costName:daysWeek[i],value: value });
            //  jsonToShowuser.push({day: daysWeek[i] })
          }
        }
        jsonToShowuser.push({costName:[arr[i].day],value: value })
        console.log(jsonToShowuser)
       // jsonToShowuserFinal.push()

      }
    }

//old
*/
