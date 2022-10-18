import React, { useEffect, useState } from "react";
import useGlobalContext from "../../../../context/useGlobalContext";
import { KnowDay } from "../knowDaysWeeks";

export default function TextInitial() {
  const { extra } = KnowDay();
  const { context } = useGlobalContext();
  var name = context.data.name;
  const [text, settext] = useState();
  useEffect(() => {
    var d = new Date();
 
    var hourDay = d.toString().split(" ")[4];
    var hour = hourDay.slice(0, 2);
    if (hour < 12) {
      settext("Buenos dias");
    } else if (hour < 18) {
      settext("Buenas tardes");
    } else if (hour < 24) {
      settext("Buenas noches");
    }
  }, []);

  return (
    <div className="border-[1px] text-[12px] border-slate-100 rounded-lg w-full h-full flex text-left justify-left items-center ">
      <p className="pl-2 pt-[1px] ">
        {text} {name}!<br></br>Faltan <span>{7 - extra}</span> dias para el fin de semana
      </p>
      <p> </p>
    </div>
  );
}
