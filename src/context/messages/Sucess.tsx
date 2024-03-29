import { AnimatePresence, motion } from "framer-motion";
function Sucess(props: { show: boolean; title: string; description: string }) {
  return (
    <AnimatePresence>
      {props.show && (
        <motion.div
          initial={{ x: "100vw", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ y: "-100vw", opacity: 0 }}
          transition={{
            type: "spring",
            duration: 1,
          }}
          className="initM fixed z-40 top-20 flex right-0 w-full max-w-sm mx-auto overflow-hidden rounded-lg shadow-md   bg-slate-100  border-[1px] border-[black]"
        >
          <div className="flex items-center justify-center w-12 bg-emerald-500">
            <svg
              className="w-6 h-6 fill-white"
              viewBox="0 0 40 40"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM16.6667 28.3333L8.33337 20L10.6834 17.65L16.6667 23.6166L29.3167 10.9666L31.6667 13.3333L16.6667 28.3333Z" />
            </svg>
          </div>
          <div className="px-4 py-2 -mx-3">
            <div className="mx-3">
              <span className="font-semibold text-emerald-500 dark:text-emerald-400">
                {props.title}
              </span>
              <p className="text-sm text-black">
                {props.description}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Sucess;
