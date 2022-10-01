import axios from "axios";
import React, { useEffect, useState } from "react";
import { SpinnerInfinity } from "spinners-react";
import useGlobalContext from "../../context/useGlobalContext";
import "./eventScreen.scss";
import MainEvent from "./MainEvent";

export default function EventMain() {
  const { context } = useGlobalContext();
  const server = context.server;
  const [event, setEvent] = useState(false);
  const [contenido, setcontenido] = useState("Connecting to server...");
  const [hostsms, sethostsms] = useState(null);
  useEffect(() => {}, []);

  if (event) {
    return <MainEvent />;
  }
  return (
    <div className="w-screen h-screen bg-[#000000]">
      <div className="flex items-center justify-center ">
        <div className="pt-12 init text-white text-[18px] ">
          <div className="alert w-[300px] hidden">
            <p className="w-full flex justify-left px-2 bg-red-800 ">Hola</p>
            <p className='w-full flex justify-left px-2 bg-yellow-800 rounded-t-none'>Danna recuerda que esto solo debes leerlo en caso de emergencia. No lo leas si nos encontramos bien</p>
          </div>
          <div className="cart px-3 w-[90%] flex-col justify-center mx-[8%]">
            <p>Es raro escribir esto... Quiero en esta carta escribirte todo aquello que no te dije. No se el
              motivo que te trajo aqui, pero supongo que no ha de ser bueno.
            </p>
            <p>Siempre tuve el presentimiento de que lo nuestro no esta hecho para durar, mas sin embargo 
              siempre intente hacer que todo lo nuestro funcione y reirme de mi mismo por estar equivocado. 
              Al final no se porque estas aqui, es confuso, a lo mejor terminamos o estare muerto xd, Si aun 
              lees esta carta es porque... aun te amo, de manera fisica y mental tu huella aun sigue dentro de mi. 

            </p>
            <p>Dentro de mis pensamientos siempre toque la idea de que no soy lo que quieres. 
              Habia veces donde te salian palabras que las decias tan naturalmente que no podian interpretarse como una
               broma; 
              lo decias porque era un pensamiento valido y completamente al margen de lo que piensas.
               podia notar el transfondo en el cual sutilmente decias 'podria merecer algo mejor'. 
               Tengo en constancia que a lo mejor llegue ser aburrido muchas veces, los silencios eternos el no
               saber que decir y no saber como tratarte de la mejor manera. Si al leer esta carta eres tu la que quiere
               poner punto final a esta historia, toma esto como una senial de que lo hagas, eres una persona muy 
               sociable que pierde ese brillo cuando estas conmigo. 
            </p>
            <p>Lamento profundamente no lograr ser todo lo que querias, pero te juro que yo si lo intente. 
              Te ame, te amo y te amare siento que ya no existen palabras para darte a entender lo mucho
              que te aprecio, lo mucho que te admiro por ser una gran persona y saber que a pesar de que yo no este ahi,
              tu seguiras siendo la mejor version de ti. 
            </p>
            <p>No me arrepiento en lo absoluto de compartir momentos malos y buenos contigo. Al final siempre te considere
              como un riesgo que vale la pena, ame todo de ti: tu cuerpo, tu sonrisa, tu ojos y sobre todo ver como te 
              esforzabas por todo lo que una vez te pedi que hicieras, realmente ver como una persona hace cosas
              para que te sientas bien y feliz, no tiene precio. Me diste literalmente todo lo que buscaba y perdon 
              por no amarte bien, por no decirte mas 'te quiero' en su momento.
               Admiro tu esfuerzo por las ganas que ponias, al final 
              si fueron fingidas... lo hiciste muy bien. 
            </p>
            <p>Yo nunca quere tener un final contigo, pero si ya es algo inevitable que se puede hacer. 
              Si aun existe el chance de los dos estar junto, abarcare con todas las ganas esa posibilidad
              de ser tu y yo, claro si tu igual. 

            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
