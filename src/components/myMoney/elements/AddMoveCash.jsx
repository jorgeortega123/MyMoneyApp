import React, { useEffect } from "react";
import { useState } from "react";
import AddIncomingCash from "./AddIncomingCash";
import TableFromDebts from "./subComponents/TableFromDebts";
import axios from "axios";
import useGlobalContext from "../../../context/useGlobalContext";
import AddOptionAboutCost from "./subComponents/AddOptionAboutCost";
import useMessageContext from "../../../context/Modal/useMessageContext";
import dayjs from 'dayjs'
export default function AddMoveCash(lang) {
  const { context } = useGlobalContext();
  //console.log(context)
  const server = context.server;
  const langg = lang.lang;
  const { message } = useMessageContext();


  //console.log(context.update());

  const [clickedSelect, setclickedSelect] = useState(null);
  const [toPayValue, settoPayValue] = useState();
  const [contentOfBotton, setcontentOfBotton] = useState(langg.buttons.add[0]);

  const addMove = (e) => {
    e.preventDefault();
    setcontentOfBotton(langg.buttons.sending[0]);
    //var clicked = clickedSelect || document.getElementById().value
    if (clickedSelect === null) {
      message({
        type: "error",
        title: langg.message.addMoveCash.noACategory.title[0],
        description: langg.message.addMoveCash.noACategory.body[0],
      });
      setcontentOfBotton(langg.buttons.add[0]);
      return true;
    }
    var nameEdit = clickedSelect.target.value;
    var typeCost = clickedSelect.target.selectedOptions[0].id;
    var valueEdit = toPayValue;
    if (!valueEdit) {
      message({
        type: "error",
        title: langg.message.addMoveCash.missingNumber.title[0],
        description: langg.message.addMoveCash.missingNumber.body[0],
      });
      setcontentOfBotton(langg.buttons.add[0]);
      return true;
    }
    if (Math.sign(valueEdit) === -1) {
      message({
        type: "error",
        title: langg.message.addMoveCash.numberNegative.title[0],
        description: langg.message.addMoveCash.numberNegative.body[0],
      });
      setcontentOfBotton(langg.buttons.add[0]);
      return true;
    }
    var name = "jorge593";
    ///
    axios
      .post(server + "/edit", {
        edit: {
          name: name,
          valueEdit: Number(valueEdit),
          typeCost: typeCost,
          nameEdit: nameEdit,
          date: dayjs().$d
        },
      })
      .then((res) => {
        context.update();
        /*if (res.data.extra === 102) {
          message({
            type: "error",
            title: langg.message.addMoveCash.excededLimit.title[0],
            description: langg.message.addMoveCash.excededLimit.body[0],
          });*/
        message({
          type: res.data.message,
          title: "Movimiento satisfactorio",
          description: res.data.data,
        });
        setTimeout(() => {
          document.getElementById("inputToPutNumber").value = "";
        }, 600);
        settoPayValue("");

        setcontentOfBotton(langg.buttons.add[0]);
      })
      .catch((err) => {
        message({
          type: "error",
          title: "Internal server error",
          description: "No se pudo contactar con el servidor",
        });
        setcontentOfBotton(langg.buttons.add[0]);
      });
    ///
  };

  return (
    <div className="p-3 shadow-md border rounded-xl bg-slate-100">
      <div className=" grid gap-2 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 ">
        <form onSubmit={(e) => addMove(e)}>
          <div>
            <div className="capitalize">
              <p className="blockAllSelect">{langg.components.moveCash[0]} </p>
            </div>
            <div className="flex p-1">
              <div className="mr-1 flex items-center border rounded-lg border-slate-400 focus:ring-1 focus:ring-v ">
                <p className="ml-1 text-green-600">$</p>
                <input
                  type="number"
                  onChange={(e) => settoPayValue(e.target.value)}
                  className=" grow  w-[55px] p-[2px] outline-none bg-transparent  "
                  id="inputToPutNumber"
                  required
                />
              </div>
              <select
                className="grow outline-hidden capitalize border rounded-lg border-slate-200"
                onChange={(e) => setclickedSelect(e)}
                onClick={(e) => setclickedSelect(e)}
              >
                {context.data.cost[0].fixed.map((e) => {
                  return (
                    <option
                      key={e.title + "ASDASD"}
                      id={"fixed"}
                      value={e.title}
                      onSelect={() => alert(s)}
                    >
                      {e.title}
                    </option>
                  );
                })}
                {context.data.cost[0].variables.map((e) => {
                  return (
                    <option
                      key={e.title + "ASDASD"}
                      id={"variables"}
                      value={e.title}
                      onClick={() => console.log("variables")}
                    >
                      {e.title}
                    </option>
                  );
                })}
              </select>
              <div className="flex items-center ">
                <button className="hidden h-8 w-6 ml-1 mr-1 font-medium text-gray-900 focus:outline-none bg-white rounded-md border border-gray-200 hover:bg-gray-200 hover:text-blue-800 focus:z-10 focus:ring-1 focus:ring-gray-900 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                  +
                </button>
              </div>
            </div>
            <button
              className="mt-2 w-full h-9  px-5 mr-2 mb-2 font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-200 hover:text-blue-800 focus:z-10 focus:ring-1 focus:ring-gray-900    "
              onClick={(e) => addMove(e)}
            >
              {contentOfBotton}
            </button>
          </div>
        </form>
      </div>
      <div className="hidden">
        <AddOptionAboutCost />
      </div>
    </div>
  );
}
