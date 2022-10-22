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
    <div {...props} className=" fixed mt-[45px] w-full h-max z-[3] mx-auto bottom-0 top-0 flex flex-col items-center ">
     <div  className="absolute" onClick={()=> setshowmodal(false)}>X</div>
      <div className="w-[280px] bg-[#000000] rounded-b-xl  backdrop-blur-sm mx-auto  ">
        <div className="font-semibold">{title}</div>
        <div className="m-2">{children}</div>
      </div>
    </div>
  );
}
