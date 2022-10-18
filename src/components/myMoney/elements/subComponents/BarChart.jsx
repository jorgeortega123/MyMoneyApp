import React, { useState } from "react";
import { useEffect } from "react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import useGlobalContext from "../../../../context/useGlobalContext";
import dayjs from "dayjs";
import Container1 from "../Container/Container";
const init = dayjs().$d;
const date = init.toString();
const datee = date.split(" ");
const [mes, dia, anio] = [datee[1], datee[2], datee[3]];
const toDayString = mes + dia + anio;
export default function BarChart() {
  const [dataArr, setdataArr] = useState([]);
  const { context } = useGlobalContext();
  const daysWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  useEffect(() => {
    var arr = [];
    var arr_other = {w0: [],w1: [],w2: [],w3: [],w4: [],w5: [],w6: [],};
    // var [w0w, w1w, w2w, w3w, w4w, w5w, w6w] = [0, 0, 0, 0, 0, 0, 0];
    // w0w = dayjs(init).subtract(0, "day");
    // w1w = dayjs(init).subtract(1, "day");
    // w2w = dayjs(init).subtract(2, "day");
    // w3w = dayjs(init).subtract(3, "day");
    // w4w = dayjs(init).subtract(4, "day");
    // w5w = dayjs(init).subtract(5, "day");
    // w6w = dayjs(init).subtract(6, "day");
    for (let index = 0; index < 6; index++) {
      var newWest = dayjs(init).subtract(index, "day");
      var date = dayjs(newWest).$d.toString();
      var datee = date.split(" ");
      var [mes, dia, anio] = [datee[1], datee[2], datee[3]];
      var hoyDiaEs = mes + dia + anio;
      arr.push({ day: newWest, n: index, local: hoyDiaEs });
    }
    for (let i = 0; i < 6; i++) {
      var dataCompare = arr[0].local
      context.data.history.today.map((e) => {
        if (e.date === undefined) return false; 
        var dataCompareE = dayjs(e.date)
        var datee1 = (dataCompareE.toString()).split(" ")
        var [mes, dia, anio] = [datee1[1], datee1[2], datee1[3]];
        var hoyDiaEs = mes + dia + anio;
        if (hoyDiaEs===dataCompare) {
          console.log('nothing')
          //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/set
        }
      });
    }



    /*
      var data = context.data.history.today
      var [day1, day2, day3, day4, day5, day6,day7] = [dayjs().subtract(1, 'day').$d.toString(), dayjs().subtract(2, 'day').$d.toString(), dayjs().subtract(3, 'day').$d.toString(), dayjs().subtract(4, 'day').$d.toString(), dayjs().subtract(5, 'day').$d.toString(), dayjs().subtract(6, 'day').$d.toString(), dayjs().subtract(7, 'day').$d.toString()  ]
      data.map((e) => {
        if (e.date === undefined) return false;
      var dataManipulate = dayjs(e.date).$d.toString().split(' ')
      var [mes0, dia0, anio0 ] = [dataManipulate[1],dataManipulate[2],dataManipulate[3]]
      var idFecha = (mes0 + dia0 + anio0)
      console.log(idFecha, hoyDiaEs)
      if (idFecha === hoyDiaEs) {
        if (arr.includes(e.date)) return;
        arr.push(e);
      }
      })
      ;
    setdataArr(jsonToShowuser);*/
  }, []);
  //
  return (
    <Container1>
      <LineChart width={400} height={200} data={dataArr}>
        <Line type="monotone" dataKey="value" stroke="#8884d8" />
        <XAxis dataKey="costName" />
        <YAxis dataKey="value" />
      </LineChart>
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
