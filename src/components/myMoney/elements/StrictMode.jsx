import React, { useEffect, useState } from "react";
import useGlobalContext from "../../../context/useGlobalContext";
import axios from "axios";
import dayjs from "dayjs";
import { KnowDay, LeftMoney } from "./knowDaysWeeks";

import useLangContext from "../../../context/subFunctions/useLangContext";
// import useGlobalContext from "../../../context/useGlobalContext";
import useMessageContext from "../../../context/Modal/useMessageContext";
import Container1 from "./Container/Container";
import Button from "./Modal/Button";
import Button2 from "./Modal/Button2";
import TextInitial from "./TextInitial";
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
  const [simuladorPayDaily, setsimuladorPayDaily] = useState(0);
  const [tableFromFixedDebst, settableFromFixedDebst] = useState("");
  const { context } = useGlobalContext();
  const { langs } = useLangContext();
  const { message } = useMessageContext();
  const server = context.server;
  const { data } = KnowDay();
  var date = dayjs().$d.toString();
  var datee = date.split(" ");
  var [mes, dia, anio] = [datee[1], datee[2], datee[3]];
  var toDayString = mes + dia + anio;

  useEffect(() => {
    var presentDay = dayjs().$d;
    if (data) {
      setshowMessageAlert(true);
    }
    var dataUser = context.data;
    if (!dataUser?.fixed === "" || !dataUser?.fixed === undefined) {
      return;
    }
    var userSalarey = dataUser.perWeek * 4;
    var sumDebst = dataUser.fixed.reduce((accumulator, object) => {
      return accumulator + object.value;
    }, 0);
    if (!langs.data) {
      return;
    }
    setdebstCount(langs.data.aPagarDeudas);
    var totalMountFixedDebst = langs.data.aPagarDeudasFijas;
    setonlyfixedDebst(langs.data.sumaFixedDebst);
    settotalMountOfFixedDebst(langs.data.sumaFixedDebst + totalMountFixedDebst);
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

    var dayServer = dayjs(dataUser.history.rest.date);
    var costThisDay = [];
    dataUser.history.today.map((data) => {
      if (data.date === undefined) return false;
      var dataManipulate = dayjs(data.date).$d.toString().split(" ");
      var [mes0, dia0, anio0] = [
        dataManipulate[1],
        dataManipulate[2],
        dataManipulate[3],
      ];
      var idFecha = mes0 + dia0 + anio0;
      if (idFecha === toDayString) {
        costThisDay.push({ value: data.value, name: data.costName });
      }
    });
    var costosDeHoyDia = costThisDay.reduce((accumulator, object) => {
      return accumulator + object.value;
    }, 0);

    // console.log(sumaDeDeudasFijasPorPagarALaSemana);
    // console.log(
    //   userSalarey,
    //   sumDebst,
    //   userSalarey - sumDebst,
    //   (userSalarey - sumDebst) / 4
    // );
    var initial = langs.data.initial;
    var valueTo = langs.data.valueTo;

    settoPayWeekly(initial);

    func(valueTo / 7, valueTo / 7 - costosDeHoyDia);
    setsimuladorPayDaily(valueTo / 7);
    var valueToDay = valueTo / 7 - costosDeHoyDia;

    var restDay = parseInt(dataUser.history.rest[0].value);
    var res = LeftMoney(
      context.data.history.rest[0].date,
      valueTo / 7,
      restDay,
      valueToDay
    );
    if (res) {
      axios
        .post(server + "/overCost", {
          name: nameFixedDebst,
          value: valueToDay,
          date: dayjs().$d,
          user: localStorage.getItem("token"),
        })
        .then((res) => console.log(res.data))
        .catch((e) => alert(e));
    }
    settodayCostSpend(valueToDay + res);
    if (dataUser.history.rest[0].value === undefined) {
      settodayCostSpend(0.0);
    }
    // settodayCostSpend(valueToDay + dataUser.history.rest.value);
    setweekCostToSpend(valueTo);
  }, [context.data, langs.data]);

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
      axios
        .post(server + "/fixedDebst", {
          name: nameFixedDebst.toLowerCase(),
          week: divideWeek,
          paid: 0,
          total: totalMount,
          action: whatModal,
          user: localStorage.getItem("token"),
          date: dayjs().$d,
        })
        .then((res) => {
          context.update();
          message({
            type: res.data.message,
            title: res.data.data,
            description: res.data.title,
          });
          return;
        })
        .catch((error) => {
          console.log(error);
          message({
            type: "error",
            title: "error",
            description: error.message,
          });
          return;
        });
    } else if (whatModal === "edit") {
      if (
        !document.getElementById("inputToPutNumber")?.value ||
        !document.getElementById("valueEditSelect")?.value
      ) {
        alert("no number");
        return;
      }
      if (Number(document.getElementById("inputToPutNumber").value) === false) {
        alert("no number");
        return;
      }
      axios
        .post(server + "/fixedDebst", {
          name: document.getElementById("valueEditSelect").value,
          action: whatModal,
          user: localStorage.getItem("token"),
          mount: document.getElementById("inputToPutNumber").value,
          date: dayjs().$d,
        })
        .then((res) => {
          context.update();
          message({
            type: res.data.message,
            title: res.data.data,
            description: res.data.title,
          });
          return;
        })
        .catch((error) => {
          message({
            type: "error",
            title: "error",
            description: error.message,
          });
          return;
        });
    }
  };

  const resumenDeDeudas = [
    { title: "Articulos", value: onlyUserFixedDebst },
    {
      title: "Debiendo",
      value: debstCount,
    },
    {
      title: "Total a pagar",
      id: "si",
      value: onlyfixedDebst + debstCount + onlyUserFixedDebst,
    },
  ];

  return (
    <div className=" mr-0 text-[12px] mb-[8px] h-full flex flex-col  justify-left sm:justify-center items-start bg-transparent m-0 ">
      <div className="flex items-center justify-between w-full ">
        <p>
          Ingresos estimados:
          <span className="text-green-600 pl-1">
            ${(context.data.perWeek * 4).toFixed(2)}{" "}
          </span>
        </p>
      </div>
      <div className="flex-col w-full rounded-[6px] my-1 p-1 bg-[#f1f5f9]">
        <div className="flex w-full justify-center">
          <p className="">Deudas:</p>
        </div>
        <table className="w-full">
          <thead className=" text-xs text-gray-700 uppercase ">
            <tr>
              {resumenDeDeudas.map((data) => (
                <td
                  scope="col"
                  className="p-[1px] text-[11px] tracking-tighter"
                >
                  {data.title}
                </td>
              ))}
            </tr>
          </thead>
          <tbody className="">
            <tr className=" odd:bg-transparent  even:bg-slate-100">
              {resumenDeDeudas.map((n) => {
                return (
                  <td
                    className={`px-[1px] py-[1px] text-[12px] sm:text-[15px] ${
                      n.id ? "text-[red]" : ""
                    }`}
                  >
                    ${n.value.toFixed(2)}
                  </td>
                );
              })}
            </tr>
          </tbody>
        </table>
      </div>
      <div className="flex my-1 gap-2">
        <div className="flex justify-between  w-full">
          <div className="flex bg-slate-200 rounded-md px-2 pt-[1px]">
            <p className="">Diario:</p>
            <p className="text-green-600 px-2"> ${todayCostSpend.toFixed(2)}</p>
          </div>
        </div>
        <div className="flex">
          <p className="flex gap-1">
            Mensual:{" "}
            <span className="text-green-600">
              ${(toweekCostToSpend * 4).toFixed(2)}
            </span>
          </p>
        </div>
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
      {!showAddFixedDebst && <TextInitial></TextInitial>}
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
                  {simuladorPayDaily.toFixed(2) -
                    ((totalMount / divideWeek).toFixed(2) / 7).toFixed(2)}
                </p>
                <Button2 onClick={() => sendServer()}>Agregar</Button2>
              </div>
            </>
          )}

          {whatModal === "edit" && (
            <>
              {context.data.fixedDebst.lenght =! 0 ? (
                <div>
                  {" "}
                  <div className="flex">
                    <p className="text-blue-800 font-light w-full text-center mb-2">
                      Editar deuda fija
                    </p>
                    <p onClick={() => setshowAddFixedDebst(false)}>X</p>
                  </div>
                  <div className="flex">
                    <p>Deuda fija: </p>
                    <select
                      id="valueEditSelect"
                      className="grow outline-hidden capitalize border-[1px] removeOutlines rounded-lg border-slate-200"
                      onChange={(e) => settableFromFixedDebst(true)}
                      onLoad={(e) => settableFromFixedDebst(true)}
                      onClick={(e) => settableFromFixedDebst(true)}
                    >
                      {context.data.fixedDebst.map((e, index) => {
                        return (
                          <option key={"ASDASD" + index} value={e.name}>
                            {e.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="mt-1">
                    <table className="w-full  rounded-xl">
                      <thead className="text-xs font-light text-gray-700 uppercase  bg-slate-200 ">
                        <tr>
                          <th scope="col" className=" px-1 py-1 ">
                            Remaing:
                          </th>
                          <th scope="col" className=" px-1 py-1 ">
                            Pay weekly:
                          </th>
                          <th scope="col" className=" px-1 py-1 ">
                            Paid
                          </th>
                          <th
                            scope="col"
                            className="px-1 py-1 truncate w-[20px]"
                          >
                            Total
                          </th>
                          <th
                            scope="col"
                            className="px-1 py-1 truncate w-[20px]"
                          >
                            N
                          </th>
                        </tr>
                      </thead>
                      <tbody className="rounded">
                        {context.data.fixedDebst.map((e, index) => {
                          return (
                            <tr
                              key={e.color + "color"}
                              className=" odd:bg-gray-50  even:bg-slate-200"
                            >
                              <td className="px-0 sm:px-1 py-1 ">
                                {e.total - e.paid}
                              </td>
                              <td
                                scope="row"
                                className="px-1 py-1  sm:h-[20px]  h-[12px]  text-gray-900 dark:text-white "
                              >
                                {e.total / e.week}
                              </td>
                              <td className="px-0 sm:px-1 py-1 ">{e.paid}</td>
                              <td className="px-0 sm:px-1 py-1  ">{e.total}</td>
                              <td className="px-0 sm:px-1 py-1 capitalize ">
                                {e.name}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
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
                  <Button2 onClick={() => sendServer()}>Agregar</Button2>
                </div>
              ) : (
                <p className="w-full text-center">
                  No tienes niguna deuda registrada :)
                </p>
              )}
            </>
          )}
        </div>
      )}
      <div className="flex justify-end items-end bottom-0 b-0 sticky h-full ">
        <Button
          onClick={() => {
            setwhatModal("add");
            setshowAddFixedDebst(true);
          }}
        >
          Agregar deuda fija
        </Button>
        <Button
          onClick={() => {
            setwhatModal("edit");
            setshowAddFixedDebst(true);
          }}
        >
          Editar
        </Button>
      </div>
    </div>
  );
}
