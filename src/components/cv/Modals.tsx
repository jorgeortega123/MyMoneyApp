import React, { useState } from "react";

export default function Modals({
  title = "as",
  children = "",
  ...props
}: {
  title: string;
  children: any;
}) {
  const [showmodal, setshowmodal] = useState(true)
  if (!showmodal) { 
    return;
  }
  return (
    <div {...props} className=" fixed mt-[47px] rounded-md w-full h-max z-[3] mx-auto bottom-0 top-0 flex flex-col items-center ">
    
      <div className="w-[280px] rounded-md  bg-[#000000] rounded-b-xl  backdrop-blur-sm mx-auto  ">
      <div  className="absolute text-slate-200 w-full items-end flex justify-end pr-2 cursor-pointer" onClick={()=> setshowmodal(false)}>X</div>
        <div className=" text-green-300 pt-2 pl-2">{title}</div>
        <div className="m-2">{children}</div>
      </div>
    </div>
  );
}
