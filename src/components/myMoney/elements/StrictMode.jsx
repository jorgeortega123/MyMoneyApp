import React, { useEffect, useState } from "react";

import useGlobalContext from "../../../context/useGlobalContext";
import axios from "axios";
import dayjs from "dayjs";
import KnowDay from "./knowDaysWeeks";
import useMessageContext from "../../../context/Modal/useMessageContext";
export default function StrictMode({ func }) {
  const [showAddFixedDebst, setshowAddFixedDebst] = useState(false);
  const [whatModal, setwhatModal] = useState("edit");
  const [nameFixedDebst, setnameFixedDebst] = useState("");
  const [totalMount, settotalMount] = useState(0);
  const [payWeekly, setpayWeekly] = useState(0);
  const [divideWeek, setdivideWeek] = useState(5);
  const [totalMountOfFixedDebst, settotalMountOfFixedDebst] = useState(0);
  const [toweekCostToSpend, setweekCostToSpend] = useState(0);
  const [onlyfixedDebst, setonlyfixedDebst] = useState(0);
  const [todayCostSpend, settodayCostSpend] = useState(0);
  const [showMessageAlert, setshowMessageAlert] = useState(false);
  const [toPayWeekly, settoPayWeekly] = useState(0);
  const [onlyUserFixedDebst, setonlyUserFixedDebst] = useState(0);
  const [debstCount, setdebstCount] = useState(0);
  const [simuladorPayDaily, setsimuladorPayDaily] = useState(0)
  const { context } = useGlobalContext();
  const { message } = useMessageContext();
  const server = context.server;
  const {data} = KnowDay()
  var date = dayjs().$d.toString()
  var datee =date.split(' ')
  var [mes, dia, anio ] = [datee[1],datee[2],datee[3]]
  var toDayString = (mes + dia + anio)


  useEffect(() => {
    var presentDay = dayjs().$d;
    if (data) {setshowMessageAlert(true)}
    var dataUser = context.data;
    var userSalarey = dataUser.perWeek * 4;
    //Suma las deudas fijas como ortodoncia, laptop, etc..
    var sumDebst = dataUser.fixed.reduce((accumulator, object) => {
      return accumulator + object.value;
    }, 0);
    // Suma las deudas fijas adquiridas que se pagan si o si en un plazo de tiempo
    var sumAllTotalFixedDebst = dataUser.fixedDebst.reduce(
      (accumulator, object) => {
        return accumulator + object.total;
      },
      0
    );
    // Suma el total pagado de las deudas fijas adquiridas
    var sumAllPaidFixedDebst = dataUser.fixedDebst.reduce(
      (accumulator, object) => {
        return accumulator + object.paid;
      },
      0
    );
    // Suma el monto inicial total de las deudas bajo un nombre
    const sumDebst0 = context.data.debts.reduce((accumulator, object) => {
      return accumulator + object.mount;
    }, 0);
    // Suma el monto pagado total de las deudas bajo un nombre
    const paid0 = context.data.debts.reduce((accumulator, object) => {
      return accumulator + object.paid;
    }, 0);
    //Calcula el valor a pagar total de las deudas bajo un nombre
    setdebstCount(sumDebst0 - paid0);
    //Calcula el valor a pagar de las deudas fijas adquiridas
    var totalMountFixedDebst = sumAllTotalFixedDebst - sumAllPaidFixedDebst;
    //Divide el monto a pagar de las deudas fijas en 4 semanass
    var monthValueTotalMountFixedDebst = totalMountFixedDebst / 4;
    setonlyfixedDebst(sumDebst);
    // Suma las deudas fijas con las deudas fijas adquiridas
    settotalMountOfFixedDebst(sumDebst + totalMountFixedDebst);

    var dinner = [];
    // Anade al array el monto que falta pagar y lo divide de acuerdo a la semana del pago de las deudas fijas adquiridas
    dataUser.fixedDebst.map((data) => {
      var presentWeek = data.week - data.timesWeek;
      var toPay = data.total - data.paid;
      var remaining = toPay / presentWeek;
      dinner.push({ value: remaining, name: data.name, extra: toPay });
    });
    //Devueleve el valor total a pagar de las deudas fijas adquiridas en base a la semana
    var sumaDeDeudasFijasPorPagarALaSemana = dinner.reduce(
      (accumulator, object) => {
        return accumulator + object.value;
      },
      0
    );
    //Devuelve el valor a pagar sin filtrar la semana ni los dias de las deudas fijas adquiridas
    var sumaDeDeudasFijasAdquiridas = dinner.reduce((accumulator, object) => {
      return accumulator + object.extra;
    }, 0);
    setonlyUserFixedDebst(sumaDeDeudasFijasAdquiridas);
    console.log(sumaDeDeudasFijasPorPagarALaSemana);
    //
    /*settoPayWeekly(
      (sumDebst + monthValueTotalMountFixedDebst) / 4 + sumaDeDeudasFijasPorPagarALaSemana
    );*/

    //new
    var dayServer = dayjs(dataUser.history.rest.date);
    var costThisDay = [];
    
    dataUser.history.today.map((data) => {
      if (data.date === undefined) return false;
      var dataManipulate = dayjs(data.date).$d.toString().split(' ')
      var [mes0, dia0, anio0 ] = [dataManipulate[1],dataManipulate[2],dataManipulate[3]]
      var idFecha = (mes0 + dia0 + anio0)
      if (idFecha === toDayString) {
        costThisDay.push({ value: data.value, name: data.costName });
      }
    });
    var costosDeHoyDia = costThisDay.reduce((accumulator, object) => {
      return accumulator + object.value;
    }, 0);
    //dayServer.diff(presentDay);
    //alert(dayServer.diff(presentDay))
    console.log(sumaDeDeudasFijasPorPagarALaSemana)
    console.log(userSalarey , sumDebst, (userSalarey - sumDebst), ((userSalarey - sumDebst) / 4 ))
    var initial =  ((sumDebst) / 4 ) + sumaDeDeudasFijasPorPagarALaSemana + 0;
    var valueTo =  dataUser.perWeek - initial  ;
    console.log(initial, valueTo)
    settoPayWeekly( initial)
    console.log( valueTo)
    func(
      ( valueTo) / 7,
      ( valueTo) / 7 - costosDeHoyDia
    );
    setsimuladorPayDaily(( valueTo ) / 7 )
    var valueToDay = ( valueTo) / 7 - costosDeHoyDia;
    console.log(costosDeHoyDia)
    //new
var ae = valueToDay * dayServer.diff(presentDay) + dataUser.history.rest.value
    if (dataUser.history.rest.value != ae ) {
      axios
        .post(server + "/overCost", {
          name: nameFixedDebst,
          value: valueToDay,
          date: dayjs().$d,
          user: "jorge593",
        })
        .then((e) => console.log(e))
        .catch((e) => alert(e));
    } 
    //new
    if (dataUser.history.rest.value === undefined) { 
      dataUser.history.rest.value = 0
    }
    if (dayServer.diff(presentDay) > 2) {
    
      if (dataUser.history.rest.value != 0) {
        settodayCostSpend(
          valueToDay * dayServer.diff(presentDay) + dataUser.history.rest.value
        );
        setweekCostToSpend(valueTo);
      } else {
        settodayCostSpend(valueToDay * dayServer.diff(presentDay));
        setweekCostToSpend(valueTo);
      }
    } else {
      settodayCostSpend(valueToDay + dataUser.history.rest.value);
      setweekCostToSpend(valueTo);
    }
    //new
  }, [context.data]);
  
  const sendServer = () => {
    if (whatModal === "add") {
      if (nameFixedDebst === "") {
        message({
          type: "error",
          title: "Incompleto",
          description: "Completa el campo del nombre",
        });
        return;
      }
      if (totalMount === 0) {
        message({
          type: "error",
          title: "Incompleto",
          description: "Escribe el monto",
        });
        return;
      }
      axios.post(server + "/fixedDebst", {
          name: nameFixedDebst.toLowerCase(),
          week: divideWeek,
          paid: 0,
          total: totalMount,
          action: whatModal,
          user: "jorge593",
          date: dayjs().$d,
        }).then((res) => {
          context.update();
          message({
            type: res.data.message,
            title: res.data.data,
            description: res.data.title,
          });
          return;
        }).catch((error) => {
          console.log(error)
          message({
            type: 'error',
            title: 'error',
            description: error.message,
          });
          return;
        })
    } else if (whatModal === "edit") {

      axios.post(server + "/fixedDebst", {
        name: document.getElementById('valueEditSelect').value,
        action: whatModal,
        user: "jorge593",
        mount: payWeekly,
        date: dayjs().$d,
      }).then((res) => {
        context.update();
        message({
          type: res.data.message,
          title: res.data.data,
          description: res.data.title,
        });
        return;
      }).catch((error) => {
        message({
          type: 'error',
          title: 'error',
          description: error.message,
        });
        return;
      })

    }
  };

  return (
    <div className="s mr-0 text-[14px] mb-[8px] h-full flex justify-left flex-col sm:justify-center items-start  rounded-xl bg-slate-100 m-0 ">
      <div className="flex items-center justify-between w-full ">
        <p>
          Semana:{" "}
          <span className="text-green-600">${context.data.perWeek}</span>, Mes:{" "}
          <span className="text-green-600">${context.data.perWeek * 4} </span>
        </p>
      </div>
      <div className="flex-col w-full">
        <div className="flex w-full justify-center">
          <p className=" bg-slate-200 px-5 rounded-t-lg">Por pagar:</p>
        </div>

        <p className="text-violet-600 pt-[5px] text-center bg-slate-200 px-5 rounded-lg mb-2">
          <span title="Deudas fijas">${onlyfixedDebst.toFixed(2)}</span>
          <span className="text-blue-600">
            <span className="text-green-600"> ~ </span>
            <span title="Deudas fijas adquiridas">
              ${onlyUserFixedDebst.toFixed(2)}
            </span>{" "}
            ~{" "}
          </span>
          <span title="Deudas bajo un nombre" className="text-violet-600">
            ${debstCount.toFixed(2)}
          </span>
          <span className="text-violet-600">
            {" "}
            <span className="text-cyan-900"> = </span>
            <span title="Valor total de todas las deudas">
              ${(onlyfixedDebst + debstCount + onlyUserFixedDebst).toFixed(2)}
            </span>
          </span>
        </p>
      </div>
      <div className="flex justify-between h-[20px] w-full">
        <div className="flex bg-slate-200 rounded-md px-2 pt-[1px]">
          <p className="w-[48px]">Daily:</p>{" "}
          <p className="text-green-600"> ${todayCostSpend.toFixed(2)}</p>
        </div>{" "}
      </div>
      <div className="flex">
        <p className="w-[54px]">Weekly:</p>
        <span className="text-green-600">${toweekCostToSpend.toFixed(2)}</span>
      </div>
      {showMessageAlert && (
        <div className="mt-2 py-5 px-2 w-full h-full bg-red-500 rounded-xl items-center">
          <p className="w-full text-center text-[22px] text-yellow-500">
            !ALERTA
          </p>
          <p>
            Se necesita{" "}
            <span className="text-green-400 font-bold text-[16px]">
              ${toPayWeekly}
            </span>{" "}
            esta semana para cubrir gastos y deudas
          </p>
          <div className="w-full flex items-center justify-end">
            <button
              onClick={() => setshowMessageAlert(false)}
              className="bg-red-400 p-1 rounded-full right-0 text-green-300 font-black"
            >
              HECHO
            </button>
          </div>
        </div>
      )}
      {showAddFixedDebst && (
        <div className="w-full rounded-md p-2   ">
          
          {whatModal === "add" && (
            <>
              <div className="flex ">
                <p className="text-blue-800 font-light w-full text-center mb-2">
                  Agregar deuda fija
                </p>
                <p onClick={() => setshowAddFixedDebst(false)}>X</p>
              </div>
              <div className="flex-col">
                <div className="w-full  mb-1 flex items-center border rounded-lg border-slate-400 focus:ring-1 focus:ring-v ">
                  <p className="ml-1 text-slate-600">Name:</p>
                  <input
                    onChange={(e) => setnameFixedDebst(e.target.value)}
                    type="text"
                    className="w-full p-[2px] outline-none bg-transparent capitalize "
                  />
                </div>
                <div>
                  <div className="w-full mr-1 mb-1 flex items-center border rounded-lg border-slate-400 focus:ring-1 focus:ring-v ">
                    <p className="ml-1 text-green-600">Total:</p>
                    <input
               
                      onChange={(e) => settotalMount(e.target.value)}
                      type="number"
                      className="grow p-[2px] outline-none bg-transparent "
                    />
                  </div>
                  <div className="flex ">
                    <div className="w-[70%] mr-1 flex items-center border rounded-lg border-slate-400 focus:ring-1 focus:ring-v ">
                      <p className="ml-1 text-cyan-700">Weekly:</p>
                      <input
                        value={(totalMount / divideWeek).toFixed(2)}
                        id="weekValue"
                        type="number"
                        className="w-[35%] p-[2px] outline-none bg-transparent "
                      />
                    </div>
                    <p className="pt-1  h-max items-center ">Weeks:</p>
                    <input
                      defaultValue={5}
                      placeholder="1-8"
                      type="number"
                      onChange={(e) => setdivideWeek(e.target.value)}
                      className="pl-[2px] w-[30px] ml-2 outline-none bg-transparent border-[1px] border-slate-500 rounded-lg "
                    />
                  </div>
                </div>
                <p className="mt-[10px]">
                  Con estos datos, podras gastar al dia:{" "}
                  {simuladorPayDaily.toFixed(2) - ((totalMount / divideWeek).toFixed(2) / 7).toFixed(2)}
                </p>
                <button
                  onClick={() => sendServer()}
                  className="mt-2 w-full h-9  px-5 mr-2 mb-2 font-medium text-gray-900 focus:outline-none bg-transparent rounded-full border-2 border-gray-200 hover:bg-gray-200 hover:text-blue-800 focus:z-10 focus:ring-1 focus:ring-gray-900    "
                >
                  Agregar
                </button>
              </div>
              
            </>
          )}
          
          {whatModal === "edit" && (
            <>
              <div className="flex">
                <p className="text-blue-800 font-light w-full text-center mb-2">
                  Editar deuda fija
                </p>
                <p onClick={() => setshowAddFixedDebst(false)}>X</p>
              </div>
              <div className="flex">
                <p>Deuda fija: </p>
                <select id="valueEditSelect" className="grow outline-hidden capitalize border-[1px] removeOutlines rounded-lg border-slate-200">
                  {context.data.fixedDebst.map((e, index) => {
                    return (
                      <option  key={"ASDASD" + index} value={e.name}>
                        {e.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="flex items-center">
                <p className="pt-[2px] mr-2">Monto que vas a pagar: </p>
                <div className="mr-1 mt-1 w-[60px] flex items-center border rounded-lg border-slate-400 focus:ring-1 focus:ring-v ">
                  <p className="ml-1 text-green-600">$</p>
                  <input
                    type="number"
                    onChange={(e) => setpayWeekly(e.target.value)}
                    className=" w-[40px] p-[2px] outline-none bg-transparent  "
                    id="inputToPutNumber"
                    required
                  />
                </div>
              </div>
              <button
                onClick={() => sendServer()}
                className="mt-2 w-full h-9  px-5 mr-2 mb-2 font-medium text-gray-900 focus:outline-none bg-transparent rounded-full border-2 border-gray-500 hover:bg-gray-200 hover:text-blue-800 focus:z-10 focus:ring-1 focus:ring-gray-900    "
              >
                Agregar
              </button>
            </>
          )}
        </div>
      )}
      <div className="flex justify-end space-x-1 items-end bottom-0 b-0 sticky h-full ">
        <button
          className="ml-1 rounded-full bg-slate-200 px-1"
          onClick={() => {
            setwhatModal("add");
            setshowAddFixedDebst(true);
          }}
        >
          Agregar deuda fija
        </button>
        <button
          className="rounded-full bg-slate-200 px-1 mt-[3px]"
          onClick={() => {
            setwhatModal("edit");
            setshowAddFixedDebst(true);
          }}
        >
          Editar
        </button>
      </div>
      
    </div>
  );
}
