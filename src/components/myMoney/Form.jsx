import React, { useEffect, useState } from "react";
import "./forms.scss";
import useGlobalContext from "../../context/useGlobalContext";
import { useNavigate } from "react-router-dom";
export default function Form() {
  const [isLoadData, setisLoadData] = useState(false);
  const { context } = useGlobalContext();
  let navigate = useNavigate();
  useEffect(() => {
    if (context.endServerRes === false) {
      setisLoadData(false);
    } else {
      setisLoadData(true);
    }
  }, [context.endServerRes]);

  console.log(context);
  if (!isLoadData) {
    return <></>;
  }
  return (
    <div className="blockAllSelect  h-full w-full absolute top-0   ">
      <div
        id="topMenu"
        className="relative h-[40px]  flex  text-center items-center border border-slate-600  bg-transparent pb-2 justify-between overflow-hidden"
      >
        <div className="flex" onClick={()=> navigate('/app/myMoney')}>
          {" "}
          <p className="text-3xl font-bold underline pt-1">MyMoney</p>
          <p className="pt-[13px]">Forms</p>{" "}
        </div>
        <div className="border border-gray-50 rounded-full hover:border-gray-200 active:bg-slate-400 "></div>
        <div className=" text-xs pr-2 pt-2 flex ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            className="bi bi-three-dots fill-slate-800 active:fill-slate-50"
            viewBox="0 0 16 16"
          >
            <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />{" "}
          </svg>
        </div>
      </div>
      <div className="p-3">
        <div>
          <h1 className="titleForms ">Nombre: </h1>
          <input className="inputForms" />

          <h1 className="titleForms ">Monto que recibes a la semana: </h1>
          <div className="flex">
            <input className="inputForms mr-4" /> <p> Al mes: </p> <p>2</p>
          </div>
          <h1 className="titleForms ">Gastos Costos</h1>
          <div>
            <div class="overflow-x-auto relative">
              <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead class="text-[10px] text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr >
                    <th scope="col" class="py-2 w-[130px] ">
                      Product name
                    </th>
                    <th scope="col" class="py-2  w-[70px]  ">
                      Valor
                    </th>
                    <th scope="col" class="py-2 ">
                      Maximo
                    </th>
                    <th scope="col" class="py-2">
                      Color
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {context.data.cost[0].fixed.map((dataCost, number) => {
                    return (
                      <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th
                          scope="row"
                          class="py-4 pr-2 font-medium text-gray-900 whitespace-nowrap dark:text-white capitalize"
                        >
                          <input type="text" name="" id="" className="w-[90px]" value={dataCost.title}/>
                         
                        </th>
                        <td class="py-4 pr-2 w-2"><input type="number" className="w-[50px]" value={dataCost.value}/></td>
                        <td class="py-4 ">{dataCost.max}</td>
                        <td class="py-4 flex left">
                          <p id={"change" + number} className='w-[73px]'>{dataCost.color}</p>

                          <input
                            value={dataCost.color}
                            type="color"
                            onChange={(e) => {
                              document.getElementById(
                                "change" + number
                              ).textContent = e.target.value;
                              document.getElementById(
                                "changeInput" + number
                              ).style.backgroundColor = e.target.value;
                            }}
                          />
                          <div className="">
                            <p className="absolute text-[9px] right-[2px] mt-[-10px] ">new!</p>
                            <div id={"changeInput" + number}  className="absolute m-1 block w-5 h-[19px] right-0">
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
