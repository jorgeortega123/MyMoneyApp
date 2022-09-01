import React, { useEffect, useState } from "react";
import useGlobalContext from "../../context/useGlobalContext";
import Tables from "../models/Tables";
export default function AllTransactions() {
    const [isFinished, setisFinished] = useState(false)
    const { context } = useGlobalContext();
    useEffect(() => {
    if (context.endServerRes===true){
        console.log(context.data.dinnerMove)
        setisFinished(true)
    }
    }, [context.endServerRes])
    
  if(isFinished){
    return (
        <Tables
          title={["Costo", "Valor", "Type"]}
          children={[context.data.dinnerMove]}
        ></Tables>
     );
  } else { 
    <p>Cargando...</p>
  }

}
