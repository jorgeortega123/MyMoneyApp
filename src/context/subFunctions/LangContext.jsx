import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalContext from "../useGlobalContext";
//@ts-ignore
export const LangContext = createContext();
export function LangContextComponent({ children }) {
  const { context } = useGlobalContext();
  const [data, setdata] = useState({});
  const [reload, setreload] = useState(false)
  const [finish, setfinish] = useState(false)
  const [weeklySpent, setweeklySpent] = useState(0)
  useEffect(() => {
    if (!context.data||!localStorage.getItem('token')||!context.data.fixed ) {
      setreload(true)
      return;
    }
    if (typeof context.data != "object" ) { 
      window.location.href="/"
      return
    }
    var dataUser = context.data;
    if (!dataUser.fixed==="" ||!dataUser.fixed===undefined ) { 
      return;
    }
    var userSalarey = dataUser.perWeek * 4;
    var globalData = new Map();
    //Suma las deudas fijas como ortodoncia, laptop, etc..
    var sumDebst = dataUser.fixed.reduce((accumulator, object) => {
      return accumulator + object.value;
    }, 0);
    // Suma las deudas fijas adquiridas que se pagan si o si en un plazo de tiempo
    var sumAllTotalFixedDebst = dataUser.fixedDebst.reduce(
      (accumulator, object) => {
        return accumulator + object.total;
      },
      0
    );
    // Suma el total pagado de las deudas fijas adquiridas
    var sumAllPaidFixedDebst = dataUser.fixedDebst.reduce(
      (accumulator, object) => {
        return accumulator + object.paid;
      },
      0
    );
    // Suma el monto inicial total de las deudas bajo un nombre
    const sumDebst0 = context.data.debts.reduce((accumulator, object) => {
      return accumulator + object.mount;
    }, 0);
    // Suma el monto pagado total de las deudas bajo un nombre
    const paid0 = context.data.debts.reduce((accumulator, object) => {
      return accumulator + object.paid;
    }, 0);
    var dinner = [];
    context.data.fixedDebst.map((data) => {
      var presentWeek = data.week - data.timesWeek;
      var toPay = data.total - data.paid;
      var remaining = toPay / presentWeek;
      dinner.push({ value: remaining, name: data.name, extra: toPay });
    });
    //Devueleve el valor total a pagar de las deudas fijas adquiridas en base a la semana
    var sumaDeDeudasFijasPorPagarALaSemana = dinner.reduce(
      (accumulator, object) => {
        return accumulator + object.value;
      },
      0
    );
  
    var initial = sumDebst / 4 + sumaDeDeudasFijasPorPagarALaSemana + 0;
    var valueTo = context.data.perWeek - initial;
    //Calcula el valor a pagar total de las deudas bajo un nombre
    var aPagarDeudas = sumDebst0 - paid0;
    //Calcula el valor a pagar de las deudas fijas adquiridas
    var totalMountFixedDebst = sumAllTotalFixedDebst - sumAllPaidFixedDebst;
    // globalData.set("aPagarDeudasFijas", totalMountFixedDebst);
    // globalData.set("aPagarDeudas", aPagarDeudas);
    // globalData.set("sumaFixedDebstAcquired", sumAllTotalFixedDebst);
    // globalData.set("sumaFixedDebst", sumDebst);
    // globalData.set("userSalarey", userSalarey);
    var dataOfi = { 
      aPagarDeudasFijas: totalMountFixedDebst,
      aPagarDeudas: aPagarDeudas , 
      sumaFixedDebstAcquired: sumAllTotalFixedDebst,
      sumaFixedDebst: sumDebst,
      userSalarey: userSalarey, 
      valueTo: valueTo, 
      initial: initial
    }
    console.log(dataOfi)
    setdata(dataOfi);
    setfinish(true)
  }, [context.endServerRes]);
  const weeklySet = (val) => {
setweeklySpent((Number(val).toFixed(2)))
  }
  return (
    <LangContext.Provider value={{ lang: "en", data: data, onLoad: finish||false, weekly: weeklySpent,  weeklySet }}>
      {children}
    </LangContext.Provider>
  );
}
