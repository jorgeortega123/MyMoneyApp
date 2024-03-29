import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

function Error(props: any) {
  const [show, setshow] = useState(true)
  return (
    <AnimatePresence>
    {show && <>
      <motion.div
        initial={{ x: "-100vw", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: "-100vw", opacity:0}}
        transition={{
          type: "spring",
          duration: 1,
        }}
        className="initM fixed  z-40 top-20 flex left-2 w-full max-w-sm mx-auto overflow-hidden  bg-slate-100  border-[1px] border-[black] rounded-xl  shadow-lg"
      >
        <div className="flex items-center justify-center w-12 bg-red-500">
          <svg
            className="w-6 h-6 text-white fill-current"
            viewBox="0 0 40 40"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M20 3.36667C10.8167 3.36667 3.3667 10.8167 3.3667 20C3.3667 29.1833 10.8167 36.6333 20 36.6333C29.1834 36.6333 36.6334 29.1833 36.6334 20C36.6334 10.8167 29.1834 3.36667 20 3.36667ZM19.1334 33.3333V22.9H13.3334L21.6667 6.66667V17.1H27.25L19.1334 33.3333Z" />
          </svg>
        </div>
        <div className="px-4 py-2 -mx-3 grow">
          <div className="mx-3">
            <span className="font-semibold text-red-500 dark:text-red-400">
              {props.title}
            </span>
            <p className="text-sm text-black">
              {props.description}
            </p>
          </div>
        </div>
        <div className="pt-[20px] pr-2">
        <button
            type="button"
            className="ml-auto -mx-1.5 mr-[2px] -my-1.5 bg-red-200 text-red-500 rounded-lg focus:ring-1 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex h-8 w-8 "
            data-dismiss-target="#alert-1"
            aria-label="Close"
            onClick={() => setshow(false)}
          >
            <span className="sr-only">Close</span>
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button></div>
      </motion.div>
    </>}
    </AnimatePresence>
  );
}

export default Error;
