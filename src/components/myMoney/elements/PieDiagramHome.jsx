import { Fragment } from "react";
import { React, useEffect, useState } from "react";
import { PieChart } from "react-minimal-pie-chart";
import PieDiagramTextInfo from "./PieDiagramTextInfo";
import { AnimatePresence, motion } from "framer-motion";
import useGlobalContext from "../../../context/useGlobalContext";
import StrictMode from "./StrictMode";
import Container1 from "./Container/Container";
//import { data, serverRes } from "../dataSimulateServer";
export const PieDiagramHome = (dataPie) => {
  const { context } = useGlobalContext();
  const [followPage, setfollowPage] = useState(false);
  const [dataBasic, setdataBasic] = useState([]);
  const [overDebst, setoverDebst] = useState('...')

  //console.log(context.update());
  useEffect(() => {
    //console.log(context);
    //console.log(context.data);
    const principalRes = context.data;
    const perWeek = principalRes.perWeek;
    const sum = principalRes.cost[0].fixed.reduce((accumulator, object) => {
      return accumulator + object.value;
    }, 0);
    const sum2 = principalRes.cost[0].variables.reduce(
      (accumulator, object) => {
        return accumulator + object.value;
      },
      0
    );
    const model = () => {
      var patrimonio = principalRes.restOfLastWeek[1].value;
      var dataToChange = principalRes.cost[0].fixed;
      //console.log(dataToChange)
      const allArray = [];
      allArray.push({
        title: "Disponible",
        color: "#249d3d",
        value: patrimonio,
        cost: 3,
        max: 4,
      });
      dataToChange.forEach((array) => {
        allArray.push(array);
      });
      allArray.push({
        title: "Costos fijos",
        color: "#79D7EC",
        value: sum2,
        cost: 3,
        max: 4,
      });
      //console.log(sum - perWeek)
      console.log(dataBasic);
      setdataBasic(allArray);
    };
    model();
    setfollowPage(true);
  }, [context.data]);

  const Text = async () => {
    data.map((n) => {
      return <p key={n.color}>{n.title}</p>;
    });
  };
  const callOver = (e) => { 
    setoverDebst(e)
  }
  //PARA EL TEXTO EN EL PIECHART
  //label={({ dataEntry }) =>
  // `${dataEntry."title"} ${Math.round(dataEntry.percentage)}%`
  const options = {
    exportEnabled: true,
    animationEnabled: true,
    title: {
      text: "Website Traffic Sources",
    },
    data: [
      {
        type: "pie",
        startAngle: 75,
        toolTipContent: "<b>{title}</b>: {value}%",
        showInLegend: "true",
        legendText: "{title}",
        indexLabelFontSize: 16,
        indexLabel: "{title} - {value}%",
        dataPoints: [
          dataBasic,
          /*
        { y: 18, label: "Direct" },
        { y: 49, label: "Organic Search" },
        { y: 9, label: "Paid Search" },
        { y: 5, label: "Referral" },
        { y: 19, label: "Social" }
      */
        ],
      },
    ],
  };
  const func = (a, b) =>  { 
    var summ =  (b * 100) / a
    var sum = summ  
    setoverDebst(((sum.toFixed(0) - 100) * -1 + "%"))
  } 
  
  return (
   
      <motion.div
        initial={{ opacity: 0, rotate: 0 }}
        animate={{ opacity: 1, rotate: 0 }}
        transition={{
          duration: 1,
        }}
      >
        <Container1>
        <div className="shadow-slate-300  mb-2 flex justify-end items-center    ">
          <div className="flex justify-between w-full">
            <div className="grow">
              <StrictMode func={func}></StrictMode>
            </div>
            <div className="w-max flex justify-end items-start  ">
          
              <div className=" ">
                <div className="flex justify-center">
                <motion.div
                  initial={{ opacity: 0, rotate: 0 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  transition={{
                    duration: 2,
                  }}
                  className='relative w-[135px] sm:w-[225px] lg:w-[150px]    '
                >
                  {followPage ? (
                    <>
                    <div className="absolute  items-center justify-center w-full h-full text-slate-900 flex flex-col space-y-0  "><p className="pt-1">Wasted: </p><p className="text-center w-full text-[21px] pl-1 ">{overDebst}</p></div>
                    <PieChart
                      className="piechartToEdit  "
                      animation={true}
                      animationDuration={3500}
                      animationEasing="ease-in"
                      data={dataBasic}
                      labelPosition={90}
                      lineWidth={25}
                      paddingAngle={0}
                      labelStyle={{
                        fontSize: "5px",
                        underline: true,
                        fill: "#000",
                      }}
              
                
                     
                    
                    /></>
                  ) : (
                    <p>CARGANDO MONO QLIAO MONONEURONAL</p>
                  )}
                </motion.div></div>
                 <PieDiagramTextInfo dataToTransform={dataBasic} />
              </div>
             
            </div>
          </div>
        </div>
        </Container1>
      </motion.div>
    
  );
};
