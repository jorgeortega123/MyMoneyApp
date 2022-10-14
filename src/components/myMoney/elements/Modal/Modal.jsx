import { useState } from "react";

function Modal({ children, ...props }) {
  const [show, setshow] = useState(false)
  if (show===false) {return; }
  return (
    <div className="z-[3] fixed w-screen h-screen flex justify-center">
      <div className="p-2 bg-slate-100 w-[200px] h-[200px] flex flex-col rounded-md border-[1px] border-slate-800">
        <h1>no</h1> <p onClick={()=>setshow(false)}>x</p>
        {children}
      </div>
    </div>
  );
}
export default Modal;
