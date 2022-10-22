import React from "react";
import DownloadSvg from "./../../assets/svg/download.svg";
export default function FileView({
  title = "as",
  children = "",
}: {
  title: string;
  children: any;
}) {
  return (
    <div className="text-white w-full my-2 rounded-[3px] p-1 flex border-[1px] border-cyan-400 justify-center items-center">
      <div className="grow flex flex-col">
         <p className="font-normal underline hover:text-slate-300 ">Jorge Ortega hola.pdf</p>
         <p className="font-light">{children}</p> 
        </div>
      <div className="">
      <button
        type="button"
        className="bg-transparent mr-[2px] text-white rounded-lg ring-[1.2px] ring-white focus:ring-red-400 p-[2px] hover:ring-green-400 inline-flex h-8 w-8 "
        data-dismiss-target="#alert-1"
        aria-label="Close"
      >
        <span className="sr-only">Close</span>
        <img src={DownloadSvg} className='w-12' alt="" />
      </button></div>
    </div>
  );
}