import React from "react";
import { motion } from "framer-motion";

function Error(props: any) {
  return (
    <>
      <motion.div
        initial={{ x: "-100vw", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{
          type: "spring",
          duration: 1,
        }}
        className="fixed z-40 top-20 flex left-2 w-full max-w-sm mx-auto overflow-hidden border rounded-xl bg-slate-200 shadow-md dark:bg-gray-800"
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
        <div className="px-4 py-2 -mx-3">
          <div className="mx-3">
            <span className="font-semibold text-red-500 dark:text-red-400">
              {props.title}
            </span>
            <p className="text-sm text-gray-600 dark:text-gray-200">
              {props.description}
            </p>
          </div>
        </div>
      </motion.div>
    </>
  );
}

export default Error;
