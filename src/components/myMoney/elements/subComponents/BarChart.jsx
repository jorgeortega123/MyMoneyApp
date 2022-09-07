import React, { useState } from "react";
import { useEffect } from "react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import useGlobalContext from "../../../../context/useGlobalContext";

/* 
formato para obtener que un gasto o costo se genero en un dia especifico:
 id: bodyReq.edit.numberDay + yearDay + bodyReq.edit.monthDay,

*/
export default function BarChart() {
  const [dataArr, setdataArr] = useState([]);
  const { context } = useGlobalContext();
  const daysWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  useEffect(() => {
    var totalLength = context.data.history.today.length;
    var arr = context.data.history.today;
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
        jsonToShowuser.push({costName:daysWeek[i],value: value })
        console.log(jsonToShowuser)
       // jsonToShowuserFinal.push()

      }
    }


      ;
    setdataArr(jsonToShowuser);
  }, []);
  //
  return (
    <div className="w-full h-full">
      <LineChart width={400} height={200} data={dataArr}>
        <Line type="monotone" dataKey="value" stroke="#8884d8" />
        <XAxis dataKey="costName" />
        <YAxis dataKey="value" />
      </LineChart>
    </div>
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
);*/
