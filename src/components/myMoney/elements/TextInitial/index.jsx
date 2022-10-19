import React, { useEffect, useState } from "react";
import useLangContext from "../../../../context/subFunctions/useLangContext";
import useGlobalContext from "../../../../context/useGlobalContext";
import { KnowDay } from "../knowDaysWeeks";

export default function TextInitial() {
  const [showTrue, setshowTrue] = useState(true);
  const { extra } = KnowDay();
  const { context } = useGlobalContext();
  const { langs } = useLangContext();
  var name = context.data.name;
  const [text, settext] = useState();
  useEffect(() => {
    if (langs.data) {
      setshowTrue(true);
    }
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
  }, [langs.data]);

  return (
    <div className="border-[1px] text-[12px] border-slate-100 rounded-lg w-full h-full flex flex-col text-left justify-left items-start ">
      <p className="pl-2 pt-[1px] ">{text + " " + name}</p>

      <div className="flex">
        <svg
          class="w-3 m-[3px] "
          role="presentation"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          aria-hidden="true"
          focusable="false"
        >
          <path
            fill-rule="evenodd"
            d="M14.485 4.347l-8.324 8.625-4.648-4.877.724-.69 3.929 4.123 7.6-7.875.72.694z"
          ></path>
        </svg>
        <p>
          {"Faltan" + " "}
          <span className="text-red-600 underline">{7 - extra}</span> dias para
          el fin de semana
        </p>
      </div>
      {showTrue && (
        <div className="flex">
          <svg
            class="w-3 m-[3px] "
            role="presentation"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            aria-hidden="true"
            focusable="false"
          >
            <path
              fill-rule="evenodd"
              d="M14.485 4.347l-8.324 8.625-4.648-4.877.724-.69 3.929 4.123 7.6-7.875.72.694z"
            ></path>
          </svg>
          <p>{langs.data.valueTo}</p>
        </div>
      )}
    </div>
  );
}
