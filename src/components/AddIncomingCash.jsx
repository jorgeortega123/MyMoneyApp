import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import useMessageContext from "../context/Modal/useMessageContext";
import useGlobalContext from "../context/useGlobalContext";
import axios from "axios";
export default function AddIncomingCash(allResources) {
  const { context } = useGlobalContext();
  const server = context.server;
  const [resources, setresources] = useState([]);
  const [pageLoad, setpageLoad] = useState(false);
  const [numberMount, setnumberMount] = useState();
  const { message } = useMessageContext();

  useEffect(() => {
    const array = [];
    const data = () => {
      array.push({ title: "patrimonio", value: 0, cost: 0, max: 0 });
      //context.data.cost[0].fixed.map((e) => array.push(e));
      //context.data.cost[0].variables.map((b) => array.push(b));
      array.push(context.data.savings[1]);
      console.log(array);
      setresources(array);
      setpageLoad(true);
    };
    data();
  }, [context.data]);

  const send = () => {
    var mount = numberMount;
    var account = document.getElementById("selectIncoming").value;
    if (account==="ahorro") {account="savings"}
    if (!mount) {
      message({
        type: "error",
        title: "El casillero del monto esta vacio" ,
        description: "Escribe una cifra adecuada para continuar",
      });
      return true;
    }
    var name = "jorge593";
    axios.post(server + "/acredit", {
        name: name,
        value: Number(mount),
        account: account,
    })
    .then((res) => {
      context.update();
        message({
          type: "success",
          title: "somethig went well",
          description: res.data.data,
        });
      setcontentOfBotton(langg.buttons.add[0]);
    }).catch((err) => {
      message({
        type: "error",
        title: "Internal server error",
        description: "Error: " +  err.request.status,
      })});
  };

  return (
    <div className="p-3 border rounded-xl bg-slate-100 ">
     
        <p>Add incoming cash</p>
        <div className="flex items-center space-x-2 ">
          <div className="mr-1 flex items-center border rounded-lg border-slate-400 focus:ring-1 focus:ring-v ">
            <p className="ml-1 text-green-600">$</p>
            <input
              type="number"
              className=" grow  w-[55px] p-[2px] outline-none bg-transparent  "
              id=""
              onChange={(e) => setnumberMount(e.target.value)}
            />
          </div>

          <p className="">Destiny to: </p>
          <select name="" id="selectIncoming" className="grow">
            {pageLoad ? (
              resources.map((e) => {
                return (
                  <option
                    id={e.title + "Id"}
                    value={e.title}
                    key={e.title + "keyapp"}
                  >
                    {e.title}
                  </option>
                );
              })
            ) : (
              <option>Loading...</option>
            )}
          </select>
        </div>

        <button 
        onClick={()=> send()}
        className="mt-2 w-full h-9  px-5  mb-2 font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-200 hover:text-blue-800 focus:z-10 focus:ring-1 focus:ring-gray-900 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
          pay weekly
        </button>
      
    </div>
  );
}
