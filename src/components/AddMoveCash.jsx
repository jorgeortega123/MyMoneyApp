import React from "react";
import { useState } from "react";
import AddIncomingCash from "./AddIncomingCash";
import TableFromDebts from "./subComponents/TableFromDebts";
import axios from "axios";
import useGlobalContext from "../context/useGlobalContext";
import AddOptionAboutCost from "./subComponents/AddOptionAboutCost";
import useMessageContext from "../context/Modal/useMessageContext";
const server = "http://127.0.0.1:4000";

export default function AddMoveCash(dataServer) {
  const { message } = useMessageContext();
  const { context } = useGlobalContext();
  //console.log(context.update());

  const [clickedSelect, setclickedSelect] = useState(null);
  const [toPayValue, settoPayValue] = useState();
  const [contentOfBotton, setcontentOfBotton] = useState("Add");

  const addMove = (e) => {
    e.preventDefault();
    setcontentOfBotton("Sending...");
    //var clicked = clickedSelect || document.getElementById().value
    if (clickedSelect === null) {
      message({
        type: "error",
        title: "Select an option",
        description: "Select a category to send a mount",
      });
      setcontentOfBotton("Add");
      return true;
    }
    var nameEdit = clickedSelect.target.value;
    var typeCost = clickedSelect.target.selectedOptions[0].id;
    var valueEdit = toPayValue;
    if (!valueEdit) {
      message({
        type: "error",
        title: "Number missing",
        description: "You must have to put a number",
      });
      setcontentOfBotton("Add");
      return true;
    }
    if(Math.sign(valueEdit) === -1) {
      message({
        type: "error",
        title: "Number are negative",
        description: "Consider use Incoming Cash segment",
      });
      setcontentOfBotton("Add");
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
        },
      })
      .then((res) => {
        context.update();
        if (res.data.extra === 102) {
          message({
            type: "error",
            title: "Max suppered",
            description: "The number exceded the limite",
          });
        }
        setcontentOfBotton("Add");
      })
      .catch((err) => {
        //context.update()
        setcontentOfBotton("ERROR xd");
      });
    ///
  
  };

  return (
    <div className="grid gap-2 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 ">
      <div className="p-3 border rounded-xl bg-slate-100">
        <form onSubmit={(e) => addMove(e)}>
          <div>
            <div className="capitalize">
              <p className="blockAllSelect">add cost or expense </p>
            </div>
            <div className="flex p-1">
              <div className="mr-1 flex items-center border rounded-lg border-slate-400 focus:ring-1 focus:ring-v ">
                <p className="ml-1 text-green-600">$</p>
                <input
                  type="number"
                  onChange={(e) => settoPayValue(e.target.value)}
                  className=" grow  w-[55px] p-[2px] outline-none bg-transparent  "
                  id=""
                  required
                />
              </div>
              <select
                className="grow outline-hidden capitalize border rounded-lg border-slate-200"
                onChange={(e) => setclickedSelect(e)}
                onClick={(e) => setclickedSelect(e)}
              >
                {dataServer.dataServer.cost[0].fixed.map((e) => {
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
                {dataServer.dataServer.cost[0].variables.map((e) => {
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
                <button className="h-8 w-6 ml-1 mr-1 font-medium text-gray-900 focus:outline-none bg-white rounded-md border border-gray-200 hover:bg-gray-200 hover:text-blue-800 focus:z-10 focus:ring-1 focus:ring-gray-900 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                  +
                </button>
              </div>
            </div>
            <button
              className="mt-2 w-full h-9  px-5 mr-2 mb-2 font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-200 hover:text-blue-800 focus:z-10 focus:ring-1 focus:ring-gray-900 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
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
      <div key="INCMING CASH">
        <AddIncomingCash allResources={dataServer.dataServer} />
      </div>
      <div className="col-span-1 p-3 md:col-span-1 border rounded-xl bg-slate-100 ">
        <div className="">
          <p>About debts</p>
          <TableFromDebts debtsNames={dataServer.dataServer} />
        </div>
      </div>
    </div>
  );
}
