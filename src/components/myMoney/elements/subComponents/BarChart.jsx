import React from "react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import useGlobalContext from "../../../../context/useGlobalContext";

export default function BarChart() {
     const { context } = useGlobalContext();
     //console.log(context.data.history.today.length);
     var totalLength = context.data.history.today.length
     var arr = context.data.history.today
     var data = [ arr[1], arr[totalLength +1 ],  arr[totalLength +2 ],  arr[totalLength -3],  arr[totalLength -4]  ]
     console.log(data)
  //
  return (
     <div className="">
    <LineChart  width={600} height={300} data={data}>
      <Line type="monotone" dataKey="value" stroke="#8884d8" />
      <XAxis dataKey="costName" />
      <YAxis dataKey="value" />
    </LineChart></div>
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
