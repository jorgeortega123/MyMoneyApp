import { motion } from "framer-motion";
import React from "react";
function HeroMain({
  images,
  className,
}: {
  images: string[] | undefined;
  className?: string;
}) {
  const delay = 2500;
  const [index, setIndex] = React.useState(0);
  const timeoutRef = React.useRef(null);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }
  React.useEffect(() => {
    resetTimeout();
    //@ts-ignore
    timeoutRef.current = setTimeout(
      () =>
        setIndex(
          (
            prevIndex //@ts-ignore
          ) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1)
        ),
      delay
    );

    return () => {
      resetTimeout();
    };
  }, [index]);
  return (
    <div className="max-w-[500px] w-full overflow-hidden mx-auto relative">
      <div
        style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
        className="whitespace-nowrap duration-1000"
      >
        {images?.map((backgroundColor: any, index: number) => (
          <motion.div
            className={`inline-block w-full ${className} rounded-sm`}
            key={index}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            //@ts-ignore
            onDragEnd={(e: { x: number }) => {
              if (e.x < 500) {
                setIndex((prevIndex) =>
                  prevIndex === images.length - 1 ? 0 : prevIndex + 1
                );
              }
              if (e.x > 500) {
                setIndex((prevIndex) =>
                  prevIndex === 0 ? images.length - 1 : prevIndex - 1
                );
              }
            }}
          >
            <motion.img
              loading="lazy"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              //@ts-ignore
              onDragEnd={(e: { x: number }) => {
                if (e.x < 500) {
                  setIndex((prevIndex) =>
                    prevIndex === images.length - 1 ? 0 : prevIndex + 1
                  );
                }
                if (e.x > 500) {
                  setIndex((prevIndex) =>
                    prevIndex === 0 ? images.length - 1 : prevIndex - 1
                  );
                }
              }}
              key={index}
              src={backgroundColor}
              className="w-full h-[250px] sm:h-[500px] object-cover rounded-xl"
            />
          </motion.div>
        ))}
      </div>
      <div className=" text-center absolute bottom-2 left-0 right-0">
        {images?.map((_: any, idx: number) => (
          <div
            key={idx}
            className={`mx-[3px] inline-block h-[15px] w-[20px] rounded-full  ${
              index === idx ? "bg-slate-900 border-2 border-cyan-600" : "bg-white"
            }`}
            onClick={() => {
              setIndex(idx);
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}
export default HeroMain;