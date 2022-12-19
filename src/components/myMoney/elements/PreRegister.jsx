import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PreRegister() {
  const [onError, setonError] = useState(false);
  const [main, setmain] = useState({});
  let navigate = useNavigate();
  useEffect(() => {
    var data = localStorage.getItem("tokenInf");
    if (data) {
      setmain(JSON.parse(data));
    } else {
      setonError(true);
    }
    setTimeout(() => {
      localStorage.setItem("token", "demo123")
      navigate("/", { replace: true });
    }, 5500);
  }, []);

  if (onError) {
    return <p>Error</p>;
  }
  return (
    <div className="w-screen h-screen flex flex-col items-center init">
      <div className="pt-[100px] relative flex-col items-center justify-center">
        <div className="h-[100px] flex items-center justify-center">
          <p className="absolute pt-[37px] z-[1]  text-[60px] mb-[40px]">
            M<span className="text-green-400">$</span>M
          </p>
        </div>
      </div>

      <div className="pt-[40px]">
        <div className="w-full bg-slate-200 px-4 border-[1px] border-slate-700 rounded-xl">
          <p className="text-center text-[30px]">Demo account</p>
        </div>
        <div className=" w-full items-center justify-center flex pt-6">
          <img src={main.picture} className="w-12 h-auto rounded-full" alt="" />
        </div>
        <div className="pt-1 w-[250px] flex flex-col text-left">
          <p className="text-center">
            Hi{" "}
            <span className="text-blue-400 font-bold">{main.given_name}</span>
          </p>
          <p></p>
          <p className="py-4">
            Currently the form to complete user data is not finished yet. 
          </p>

          <p className="py-3">
            So, you going to Log in as Demo account{" "}
          </p>
          <p className="py-3 text-center">
            In 5 seconds we will direct you to <span className="underline text-blue-600">MyMoneyApp</span> 
          </p>
        </div>
      </div>
    </div>
  );
}
