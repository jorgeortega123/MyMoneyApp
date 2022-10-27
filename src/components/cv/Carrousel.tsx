import { motion } from "framer-motion";
import React from "react";
import PinchToZoom from 'react-pinch-and-zoom';
function HeroMain({
  images,
  className,
  showImage
}: {
  images: string[] | undefined;
  className?: string;
  showImage: (data: string)=>void;
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
    <div className="min-w-[300px] max-w-full max-h-full overflow-hidden mx-auto relative rounded-xl overflow-y-hidden">
       <div onClick={()=>{if (index===0) {return;}  setIndex(index - 1)}}  className="cursor-pointer z-[5] absolute flex justify-center left-0 items-center w-12 carrousel-pilar bg-[#69696920] hover:bg-[#69696949] hover:text-green-300 ">{"<"}</div>
       
       <div onClick={()=>{if (index >= images?.length) {return;} setIndex(index + 1)}} className="cursor-pointer z-[5] absolute flex justify-center right-0 items-center w-12 carrousel-pilar2 bg-[#69696920] hover:bg-[#69696949] hover:text-green-300  ">{"<"}</div>
       <div
        style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
        className="whitespace-nowrap duration-1000"
      >
        
        {images?.map((backgroundColor: any, index: number) => (
          <motion.div
            className={`relative inline-block w-full ${className} rounded-sm`}
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
              className="w-full h-full object-cover rounded-xl"
              onClick={()=>showImage(backgroundColor)}
            />
          </motion.div>
        ))}
      </div>
      <div className=" text-center absolute bottom-2 left-0 right-0 ">
        {images?.map((_: any, idx: number) => (
          <div
            key={idx}
            className={`cursor-pointer mx-[3px] inline-block h-[16px] w-[20px] rounded-full  ${
              index === idx ? "bg-slate-900 border-cyan-600 text-white" : "bg-[#cfb8b85c] text-black"
            }`}
            onClick={() => {
              setIndex(idx);
            }}
          ><p className={`text-[10px]  `}>{idx + 1}</p></div>
        ))}
      </div>
    </div>
  );
}
export default HeroMain;