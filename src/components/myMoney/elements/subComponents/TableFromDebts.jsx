import React, { useEffect, useState } from "react";
import useMessageContext from "../../../../context/Modal/useMessageContext";
import axios from "axios";
//import useGlobalContext from "../../../../context/useGlobalContext";
import useGlobalContext from "../../../../context/useGlobalContext";
import ShowHistoryDebst from "./ShowHistoryDebst";

export default function TableFromDebts(lang) {
  const langg = lang.lang
  const { message } = useMessageContext();
  const { context } = useGlobalContext();
  const server = context.server;
  const [mountToAcredit, setmountToAcredit] = useState();
  const [accountToAcreadit, setaccountToAcreadit] = useState();
  const [contentOfBotton, setcontentOfBotton] = useState("Actualizar datos");
  const [destinyAccount, setdestinyAccount] = useState();
  const [clickInputRadio, setclickInputRadio] = useState(false);
  const [dicreaseOrIncrease, setdicreaseOrIncrease] = useState();
  const [showMoreDetailDebts, setshowMoreDetailDebts] = useState(false);
  const [thereAccountsToShow, setthereAccountsToShow] = useState(true)
  const [showHistoryTable, setshowHistoryTable] = useState(null)
  useEffect(() => {
    const toAcredit = () => {
      var a = [];
      var s = context.data.restOfLastWeek;
      var c = context.data.savings[1].values;
      if (context.data.debts.length === 0 ) {setthereAccountsToShow(false)}
      a.push([{ name: "Patrimonio", value: s }]);
      a.push([{ name: "Ahorro", value: c }]);
      setallruberaccount(a);
    };
    toAcredit();
  }, [context.data.debts]);

  const [allruberaccount, setallruberaccount] = useState([
    { name: "Patrimonio", value: 0 },
    { name: "Ahorro", value: 0 },
  ]);
  const debts = context.data.debts;

  const UpdateDateDebts = () => {
    var val = mountToAcredit;
    var affect =
      accountToAcreadit || document.getElementById("firstAccount").value;
    var destiny =
      destinyAccount || document.getElementById("destinatario").value;

    ///////
    var name = "jorge593";
    ///
    if (!affect) {
      message({
        type: "error",
        title: "COMPLETA",
        description: "Seleccija la cuentas",
      });
      return true;
    }
    if (!val) {
      message({
        type: "error",
        title: "COMPLETA",
        description: "Pon un numero",
      });
      return true;
    }
    axios
      .post(server + "/udapteDebts", {
        name: name,
        val: Number(val),
        from: affect,
        to: destiny,
        action: document.getElementById("sumOrRes").value||dicreaseOrIncrease,
      })
      .then((res) => {
        console.log(res)
        message({
          type: res.data.message,
          title: res.data.title,
          description: res.data.data,
        });
        context.update();
        setcontentOfBotton("Add");
      })
      .catch((err) => {
        console.log(err);
        message({
          type: "error",
          title: "Server error",
          description: "El servidor respondio con estado " + err.request.status,
        });
        //context.update()
        setcontentOfBotton("Actualizar datos");
      });
    ///////
  };
  const whatSelect = (e) => {
    console.log(e, dicreaseOrIncrease);
    if (e === dicreaseOrIncrease) {
      return true;
    } else {
      return false;
    }
  };
  var twoDecimal = (a, b) => {
    var s = a - b;
    return s.toFixed(2);
  };
  if (thereAccountsToShow===false) { 
    return <></>
  }
  return (
    <><p>{langg.components.debts.title[0]}</p>
    <div className="p-2 relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
          <tr>
            <th scope="col" className="px-3 py-1">
              {langg.components.debts.name[0]}
            </th>
            
            <th scope="col" className="px-3 py-1">
            {langg.components.debts.mountToPay[0]}
            </th>
            <th scope="col" className="px-3 py-1">
            {langg.components.debts.paid[0]} 
            </th>
            <th scope="col" className="px-3 py-1">
            {langg.components.debts.cashLeft[0]} 
            </th>
          </tr>
        </thead>
        <tbody>
          {debts.map((debtsAccounts) => {
            return (
              <tr key={debtsAccounts.relationship + "key"} className="border-b   odd:bg-white even:bg-gray-50 ">
                <th
                onClick={()=>{setshowHistoryTable(debtsAccounts.name)}}
                  scope="row"
                  className="capitalize px-3 py-2 font-medium text-gray-900  whitespace-nowrap"
                >
                  {debtsAccounts.name}
                </th>
                
                <td className="px-2 py-1">{debtsAccounts.mount.toFixed(2)}</td>
                <td className="px-2 py-1">{debtsAccounts.paid.toFixed(2)}</td>
                <td className="px-2 py-1">
                  {twoDecimal(debtsAccounts.mount, debtsAccounts.paid)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="flex capitalize">
        <button
          className="mt-2 w-full h-9  px-5  mb-2 font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-200 hover:text-blue-800 focus:z-10 focus:ring-1 focus:ring-gray-900 "
          onClick={() => {
            setshowMoreDetailDebts(true);
            setdicreaseOrIncrease("in");
            setTimeout(() => {
              window.scrollTo({
                top: document.documentElement.scrollHeight,
                behavior: "smooth",
              });
            }, 100);
            
          }}
        >
          {lang.lang.buttons.increase[0]}
        </button>
        <button
          className="mt-2 w-full h-9  px-5  mb-2 font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-200 hover:text-blue-800 focus:z-10 focus:ring-1 focus:ring-gray-900  "
          onClick={() => {
            setshowMoreDetailDebts(true);
            setdicreaseOrIncrease("de");
            
            setTimeout(() => {
              window.scrollTo({
                top: document.documentElement.scrollHeight,
                behavior: "smooth",
              });
            }, 100)
          }}
        >
         {lang.lang.buttons.decrease[0]}
        </button>
      </div>
      {showMoreDetailDebts === true ? (
        <div className="flex-col">
          <div>
            <p className="pb-1">{lang.lang.components.debts.modify[0]}</p>
            <div className="mr-1  flex items-center border rounded-lg border-slate-400 focus:ring-1 focus:ring-v ">
              <div className="removeArrowSelect">
                <select
                  name=""
                  id="sumOrRes"
                  className="text-orange-700 ml-1 mt-0 pb-[3px] removeAlloulines bg-transparent outline-hidden"
                  onChange={(e) => setdicreaseOrIncrease(e.target.value)}
                >
                  <option value="in" className="text-green-700">
                  {lang.lang.components.debts.pay[0]}
                  </option>
                  <option value="de" className="text-orange-700">
                  {lang.lang.components.debts.aum[0]}
                  </option>
                </select>
              </div>
              <p className="ml-1 text-green-600">$</p>
              <input
                type="number"
                onChange={(e) => setmountToAcredit(e.target.value)}
                className=" grow  w-[55px] p-[2px] outline-none bg-transparent  "
                id="inputNumber"
                required
              />
            </div>
          </div>
          <div className="flex pt-2 pb-1  ">
            <p className="pt-1 pb-1 pr-1">{lang.lang.components.debts.inf[0]}</p>
            <select
              name=""
              id="firstAccount"
              className="capitalize removeAlloulines grow pt-1 mb-1 pb-1 bg-slate-200 rounded-md"
              onLoad={(e) => setaccountToAcreadit(e.target.value)}
              onChange={(e) => setaccountToAcreadit(e.target.value)}
            >
              <option
                value="patrimonio"
                className="capitalize"
                onChange={(e) => setaccountToAcreadit(e.target.value)}
                
              >
                patrimonio
              </option>
              <option
                value="savings"
                className="capitalize"
                onChange={(e) => setaccountToAcreadit(e.target.value)}
              >
                savings
              </option>
            </select>
          </div>
          <div className="flex">
            <p className="pr-1">{lang.lang.components.debts.destiny[0]} </p>
            <select
              id="destinatario"
              className="grow removeAlloulines capitalize bg-slate-200 rounded-md"
              onChange={(e) => setdestinyAccount(e.target.value)}
              onLoad={(e) => setdestinyAccount(e.target.value)}
            >
              {debts.map((e) => {
                return (
                  <>
                    <option key={e.name + "key"} value={e.name}>
                      {" "}
                      {e.name}
                    </option>
                  </>
                );
              })}
            </select>
            <div
              className="flex grow "
              onClick={() => {
                if (clickInputRadio) {
                  setclickInputRadio(false);
                } else {
                  setclickInputRadio(true);
                }
              }}
            >
              <input
                id={"radioinputo"}
                type="radio"
                className="ml-4 mr-1"
                checked={clickInputRadio}
              />
              <label htmlFor="radioinputo" className="grow">
                A todos
              </label>
            </div>
          </div>
          <button
            onClick={() => UpdateDateDebts()}
            className="mt-3 w-full h-9  px-5  mb-2 font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-200 hover:text-blue-800 focus:z-10 focus:ring-1 focus:ring-gray-900 "
          >
            {contentOfBotton}
          </button>
        </div>
      ) : (
        <p></p>
      )}
      {showHistoryTable !=null && <ShowHistoryDebst nameUser={showHistoryTable}/>}
    </div>
    </>
  );
}
