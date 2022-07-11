import { Fragment } from "react";
import { React, useEffect, useState } from "react";
import { PieChart } from "react-minimal-pie-chart";
import PieDiagramTextInfo from "./PieDiagramTextInfo";
import useGlobalContext from "../context/useGlobalContext";
//import { data, serverRes } from "../dataSimulateServer";
export const PieDiagramHome = (dataPie) => {
  const { context } = useGlobalContext();
    const [followPage, setfollowPage] = useState(false);
  const [dataBasic, setdataBasic] = useState([]);

  //console.log(context.update());
  useEffect(() => {
    
    console.log(context)
    console.log(context.data)
    const principalRes = context.data
    const perWeek = principalRes.perWeek
    const sum = principalRes.cost[0].fixed.reduce((accumulator, object) => {
      return accumulator + object.value;
    }, 0);
    const sum2 = principalRes.cost[0].variables.reduce((accumulator, object) => {
      return accumulator + object.value;
    }, 0);
    const model = () => {
      var patrimonio =  principalRes.restOfLastWeek[1].value
      var dataToChange = principalRes.cost[0].fixed;
      //console.log(dataToChange)
      const allArray=[]
      allArray.push({ "title": "Disponible", "color":"#249d3d", value: patrimonio + perWeek - sum -sum2 , cost: 3, max: 4})
      dataToChange.forEach(array => {
        allArray.push(array)
      });
      //console.log(sum - perWeek)
      setdataBasic(allArray);
    };
    model()
    setfollowPage(true);
  }, [context.data]);

  const Text = async () => {
    data.map((n) => {
      return <p key={n.color}>{n.title}</p>;
    });
  };
  //PARA EL TEXTO EN EL PIECHART
  //label={({ dataEntry }) =>
  // `${dataEntry."title"} ${Math.round(dataEntry.percentage)}%`

  return (
    <Fragment>
    <div className="p-2 flex justify-center items-center border rounded-xl bg-slate-100 ">
      <div className="relative flex justify-center items-center">
        <div className="w-[200px] mr-6 sm:w-auto sm:mr-auto items-center">
        {followPage ? (
          <PieChart
            animation
            animationDuration={1500}
            animationEasing="ease-out"
            center={[50, 50]}
            data={dataBasic}
            labelPosition={90}
            lengthAngle={360}
            lineWidth={25}
            paddingAngle={0}
            labelStyle={{
              fontSize: "5px",
              underline: true,
              fill: "#000",
            }}
            radius={50}
            rounded={1}
            startAngle={120}
            viewBoxSize={[100, 100]}
          />
        ) : (
          <p>CARGANDO MONO QLIAO MONONEURONAL</p>
        )}
        </div>
       
      </div>
       <PieDiagramTextInfo dataToTransform={dataBasic}/>
    </div>
    
    </Fragment>
  );
};
