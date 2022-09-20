import React from "react";
import { AnimatePresence, motion } from "framer-motion";
export default function SocialNetworks({
  img = "sad",
  url = "sddsa",
  classNamee = '',
  intoImg = '',
  number = 0,
  ...props
}: {
  img: any;
  url: string;
  classNamee: any;
  intoImg: any; 
  number: number
}) { 
    const goToUrl = (linkOpen:any) => { 
        var link = document.createElement("a");
        link.href = linkOpen;
        link.target = "_blank";
        link.click();
    }
  var n = (number:number) => { 

    if (number % 2 ===0 ) {
      return (-36) 
    } 
    return -12
  }
  return (
    <motion.div
    initial={{ opacity: 0, x: n(number)}}
    animate={{ opacity: 1, x: 0 }}
    transition={{ type: "tween" ,duration:1}}
    className=""
  >
    <div className={classNamee}>
    <img
      src={img}
      className={`Social ${intoImg}`}
      onClick={() => {
        goToUrl(url)
      }}
    />
    </div>
    </motion.div>
  );
}
