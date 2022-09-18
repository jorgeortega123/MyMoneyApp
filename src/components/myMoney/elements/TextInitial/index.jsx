import React, { useEffect, useState } from "react";
import useGlobalContext from "../../../../context/useGlobalContext";

export default function TextInitial() {
  const { context } = useGlobalContext();
   var name = context.data.name
   const [text, settext] = useState()
   useEffect(() => {
     var d = new Date();
   
    var hourDay = d.toString().split(" ")[4];
    var hour = hourDay.slice(0,2) 
    if (hour < 12 ) { 
        settext('Buenos dias')
    }
    else if (hour < 18 ) { 
      settext('Buenas tardes')
  }  else if (hour < 24 ) { 
    settext('Buenas noches')
}

   }, [ ])
   
  
  return (
    <div className="absolute w-full">
      <p className="pl-2 pt-[1px] absolute text-[12px]">
        {text} {name}! 
        
      </p>
    </div>
  );
}
