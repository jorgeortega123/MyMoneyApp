import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { lang } from "../../dataSimulateServer";
export default function ServerOut() {
  const [langstate, setlangstate] = useState({});
  const [continuePage, setcontinuePage] = useState(false)
  useEffect(() => {
    console.log(lang);
    var setlang = localStorage.getItem("lang");
    if (!setlang) {
      setlangstate(lang.en);
	    setcontinuePage(true)
    } else {
      setlangstate(lang[setlang]);
      setcontinuePage(true)
    }
  }, []);

  return (
    <AnimatePresence> 
    <div className=" flex items-center justify-center pt-20 "> 
      <section className="border rounded-xl bg-slate-300 flex items-center h-full p-16 dark:bg-gray-900 dark:text-gray-100">
        <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
		{continuePage ? ( <motion.div
          initial={{ y: "-100vh", opacity:  0}}
          animate={{ y: 0, opacity: 5 }}
          exit={{ y: "-100vw", opacity: 0 }}
          transition={{
            type: "spring",
            duration: 2,
          }}> <div className="max-w-md text-center">
            <h2 className="mb-8 font-extrabold text-9xl text-gray-800 dark:text-gray-600">
              <span className="sr-only">Error</span>500
            </h2>
            <p className="text-2xl font-semibold md:text-3xl text-gray-600">
              {langstate.server.out[0]}
            </p>
            <p className="mt-4 mb-8 dark:text-gray-400 text-gray-500">
		  {langstate.server.out[1]}
            </p>
          </div></motion.div>) : <p></p>}
        </div>
      </section>
    </div>
    </AnimatePresence>
  );
}
