import { useState } from "react";

function Container1({ children, ...props }) {

  return (
    <div className="p-3 shadow-md border-[1px] border-gray-400 rounded-xl bg-white m-1 w-full h-full">
        {children}
    </div>
  );
}
export default Container1;
