import { Fragment } from "react";
import { React, useEffect, useState } from "react";
import { PieChart } from "react-minimal-pie-chart";
import PieDiagramTextInfo from "./PieDiagramTextInfo";
import { AnimatePresence, motion } from "framer-motion";
import useGlobalContext from "../../../context/useGlobalContext";
//import { data, serverRes } from "../dataSimulateServer";
export const PieDiagramHome = (dataPie) => {
  const { context } = useGlobalContext();
  const [followPage, setfollowPage] = useState(false);
  const [dataBasic, setdataBasic] = useState([]);

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
      console.log(dataBasic)
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
  //PARA EL TEXTO EN EL PIECHART
  //label={({ dataEntry }) =>
  // `${dataEntry."title"} ${Math.round(dataEntry.percentage)}%`
  const options = {
    exportEnabled: true,
    animationEnabled: true,
    title: {
      text: "Website Traffic Sources"
    },
    data: [{
      type: "pie",
      startAngle: 75,
      toolTipContent: "<b>{title}</b>: {value}%",
      showInLegend: "true",
      legendText: "{title}",
      indexLabelFontSize: 16,
      indexLabel: "{title} - {value}%",
      dataPoints: [
        dataBasic
        /*
        { y: 18, label: "Direct" },
        { y: 49, label: "Organic Search" },
        { y: 9, label: "Paid Search" },
        { y: 5, label: "Referral" },
        { y: 19, label: "Social" }
      */
      ]
    }]
  }

  return (
    <Fragment>
      <motion.div
              initial={{ opacity: 0, rotate: 0 }}
              animate={{opacity: 1, rotate: 0 }}
              transition={{
                duration: 1,
              }}
            >
      <div className="p-2 shadow-md shadow-slate-300  mb-2 flex justify-evenly items-center border rounded-xl bg-slate-100   ">
        <div className="relative flex justify-center items-center">
          <div className="w-[150px] sm:w-[225px] lg:w-[400px] md:p-3  items-center">
            <motion.div
              initial={{ opacity: 0, rotate: 360 }}
              animate={{opacity: 1, rotate: 0 }}
              transition={{
                duration: 2,
              }}
             
            >
              {followPage ? (
                <PieChart
                className="piechartToEdit  "
                  animation={true}
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
                  rounded={0}
                  startAngle={120}
                  viewBoxSize={[100, 100]}
                />
              ) : (
                <p>CARGANDO MONO QLIAO MONONEURONAL</p>
              )}
            </motion.div>
          </div>
        </div>
        <PieDiagramTextInfo dataToTransform={dataBasic} />
      </div>
      </motion.div>
    </Fragment>
  );
};
