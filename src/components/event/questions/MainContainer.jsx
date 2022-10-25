import axios from "axios";
import React, { useState } from "react";
import { version } from "react-dom";
import View from "./View";
const quest = [
  {
    title: "Cual es la velacidad de la luz ",
    questions: ["299 mil km/s", "299 mil m/s", "399 mil km/s"],
    correct: 3,
  },
];
export default function MainContainer() {
  const [showNormal, setshowNormal] = useState(true);
  const [credentials, setcredentials] = useState("");
  const [numberFromInput, setnumberFromInput] = useState("");
  const [names, setnames] = useState("")
  const verifyAnswer = (user, correct) => {
    user = user + 1;
    console.log(user, correct);

    if (quest[correct].correct === user) {
      console.log("correct");
    } else {
      console.log("incorect");
    }
  };
  const verifyNumber = async () => {
    var cedula = numberFromInput;
    console.log(cedula)
    await axios.get(
      `https://srienlinea.sri.gob.ec/movil-servicios/api/v1.0/deudas/porIdentificacion/${cedula}`
    ).then((data)=>{ 
      setcredentials((data.data));
      var s = data.data?.contribuyente?.nombreComercial.split(" ")
      setnames(s[2]+ " " +s[0])
      console.log(data.data)
    }).catch((err)=> { 
      setcredentials({error: "Numero de cedula no existe"})
    })
  };
  if (showNormal) {
    return (
      <div className="Principal h-screen w-screen bg-[#000000] flex justify-center items-center ">
        <div className="text-white flex flex-col items-center h-[300px]">
          <p className="text-[35px] font-semibold">Hola</p>
          <p>Digita tu numero de cedula</p>
          <input
            onChange={(e) => {
              setnumberFromInput(e.target.value);
            }}
            className="border-b-[1px] mb-6 m-2 bg-transparent removeOUTLINES text-center active:text-cyan-500 hover:text-cyan-500"
            type="text"
            placeholder="Inserta numero de cedula"
          />
          <button
            onClick={() => verifyNumber()}
            className="text-green-500 px-2 rounded-lg border-[1px] border-green-500"
          >
            Confirmar
          </button>
          {names && <p className="p-3">{names}</p>}
          <p className=" hidden capitalize p-3">
            {credentials?.contribuyente?.nombreComercial}
          </p>
          <p className="text-orange-600">{credentials?.error}</p>
        </div>
      </div>
    );
  }
  return (
    <div className="Principal h-screen w-screen bg-[#000000] flex justify-center items-center ">
      <div className="text-white flex flex-col items-center h-[300px]">
        <p className="text-[35px] font-semibold">Hola</p>
        <p>Para continear, verifica que eres tu</p>
        <div className="border-[1px] border-white p-5 flex flex-col space-y-2">
          {quest.map((e, inde) => {
            return (
              <>
                <p key={"asdasd" + inde}>{e.title}</p>
                {e.questions.map((d, ind) => {
                  return (
                    <div
                      key={"asd" + ind}
                      onClick={() => verifyAnswer(ind, inde)}
                      className="flex hover:text-green-400 px-2 border-l-[1px] border-l-slate-300 hover:border-l-green-300  "
                    >
                      <p>{d}</p>
                    </div>
                  );
                })}
                <button>sad</button>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
}
