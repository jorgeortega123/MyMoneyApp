import React, { useEffect, useState } from "react";

import useGlobalContext from "../../../context/useGlobalContext";
import axios from "axios";
import dayjs from "dayjs";
import useMessageContext from "../../../context/Modal/useMessageContext";
export default function StrictMode({func}) {
  
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
  const { context } = useGlobalContext();
  const { message } = useMessageContext();
  const server = context.server;
  const toDayString = dayjs().$d.toISOString()
  useEffect(() => {
    var presentDay = dayjs().$d;
    var dataUser = context.data;
    var userSalarey = dataUser.perWeek * 4;
    var sumDebst = dataUser.fixed.reduce((accumulator, object) => {
      return accumulator + object.value;
    }, 0);
    var sumAllTotalFixedDebst = dataUser.fixedDebst.reduce(
      (accumulator, object) => {
        return accumulator + object.total;
      },
      0
    );
    var sumAllPaidFixedDebst = dataUser.fixedDebst.reduce(
      (accumulator, object) => {
        return accumulator + object.paid;
      },
      0
    );
    const sumDebst0 = context.data.debts.reduce((accumulator, object) => {
      return accumulator + object.mount;
    }, 0);
    const paid0 = context.data.debts.reduce((accumulator, object) => {
      return accumulator + object.paid;
    }, 0);

    setdebstCount(sumDebst0 - paid0); //total deudas - ya Se cuenta el valor de deudas bajo el nombre de la x persona|
    var totalMountFixedDebst = sumAllTotalFixedDebst - sumAllPaidFixedDebst;
    var monthValueTotalMountFixedDebst = totalMountFixedDebst / 4;
    setonlyfixedDebst(sumDebst);
    settotalMountOfFixedDebst(sumDebst + totalMountFixedDebst);

    var dinner = [];

    dataUser.fixedDebst.map((data) => {
      var presentWeek = data.week - data.timesWeek;
      var toPay = data.total - data.paid;
      var remaining = toPay / presentWeek;
      dinner.push({ value: remaining, name: data.name, extra: toPay });
    });
    var sumaDeDeudasFijasPorPagarALaSemana = dinner.reduce(
      (accumulator, object) => {
        return accumulator + object.value;
      },
      0
    );
    var sumaDeDeudasFijasAdquiridas = dinner.reduce((accumulator, object) => {
      return accumulator + object.extra;
    }, 0);
    setonlyUserFixedDebst(sumaDeDeudasFijasAdquiridas);
    console.log(sumaDeDeudasFijasPorPagarALaSemana);
    settoPayWeekly(
      (sumDebst + monthValueTotalMountFixedDebst) / 4 +
        sumaDeDeudasFijasPorPagarALaSemana
    );
    var initial =
      (userSalarey - sumDebst) / 4 + sumaDeDeudasFijasPorPagarALaSemana;

    //new
    var dayServer = dayjs(dataUser.history.rest.date);
    var costThisDay = []
   
    dataUser.history.today.map((data) => {
      if (data.date === undefined) return false
      if (data.date.slice(0,10) === toDayString.slice(0,10)) {
            costThisDay.push({ value: data.value, name: data.costName});  
      }
    });
    var costosDeHoyDia = costThisDay.reduce(
      (accumulator, object) => {
        return accumulator + object.value;
      },
      0
    );
    //dayServer.diff(presentDay);
    //alert(dayServer.diff(presentDay))
    
    var valueTo = dataUser.perWeek - initial;
    func((dataUser.perWeek - initial)/ 7, ((dataUser.perWeek - initial)/ 7) - costosDeHoyDia ) 
    var valueToDay =  ((dataUser.perWeek - initial)/ 7) - costosDeHoyDia;
    //new
    if (Math.sign(valueToDay) === -1) {
      axios
      .post(server + "/overCost", {
        name: nameFixedDebst,
        value: valueToDay,
        date: dayjs().$d,
      })
    }
    //new
    if (dayServer.diff(presentDay) > 2) {
      if (dataUser.history.rest.value != 0) {
        settodayCostSpend(((valueToDay) * dayServer.diff(presentDay) ) + dataUser.history.rest.value  );
        setweekCostToSpend(valueTo);
      } else {
        settodayCostSpend(((valueToDay) * dayServer.diff(presentDay)));
        setweekCostToSpend(valueTo);
      }
    } else { 
      settodayCostSpend(valueToDay);
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
          description: "Completa",
        });
        return;
      }
      if (totalMount === 0) {
        message({
          type: "error",
          title: "Incompleto",
          description: "Completa",
        });
        return;
      }
      axios
        .post(server + "/fixed/debst", {
          name: nameFixedDebst,
          week: document.getElementById("weekValue").value | 6,
          paid: 0,
          total: totalMount,
          action: whatModal,
          user: "jorge593",
          date: dayjs().$d,
        })
        .then((res) => {
          message({
            type: res.message,
            title: res.data,
            description: res.title,
          });
          return;
        })
        .catch((e) => console.log(e));
    } else if (whatModal === "edit") {
      console.log(server + "/fixedDebst");
      axios.post(server + "/fixedDebst", {
        name: nameFixedDebst,
        action: whatModal,
        user: "jorge593",
        mount: payWeekly,
        date: dayjs().$d,
      });
    }
  };

  return (
    <div className=" mr-0 text-[13px] mb-[8px] h-full flex justify-left flex-col sm:justify-center items-start  rounded-xl bg-slate-100 m-0 ">
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
          ${onlyfixedDebst.toFixed(2)}
          <span className="text-blue-600">
            <span className="text-green-600"> ~ </span>$
            {onlyUserFixedDebst.toFixed(2)} ~{" "}
          </span>
          <span className="text-violet-600">${debstCount.toFixed(2)}</span>
          <span className="text-violet-600">
            {" "}
            <span className="text-cyan-900"> = </span> $
            {(onlyfixedDebst + debstCount + onlyUserFixedDebst).toFixed(2)}
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
                    <p className="pt-1 h-max items-center">Weeks:</p>
                    <input
                      placeholder="1-12"
                      type="number"
                      onChange={(e) => setdivideWeek(e.target.value)}
                      className="w-[30px] ml-2 outline-none bg-transparent border-[1px] border-slate-500 rounded-lg "
                    />
                  </div>
                </div>
                <p className="mt-[10px]">
                  Con estos datos, podras gastar al dia:{" "}
                  {todayCostSpend.toFixed(2) -
                    ((totalMount / divideWeek).toFixed(2) / 7).toFixed(2)}{" "}
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
                <select className="grow outline-hidden capitalize border-[1px] removeOutlines rounded-lg border-slate-200">
                  {context.data.fixedDebst.map((e, index) => {
                    return (
                      <option key={"ASDASD" + index} value={e.name}>
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
      {showMessageAlert && (
        <div className="mt-2 py-5 px-2 w-full bg-red-500 rounded-xl">
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
    </div>
  );
}
