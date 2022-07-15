import React, { useEffect, useState } from "react";

export default function () {
  useEffect(() => {
    setTimeout(() => {
      setfirst("Comprobando Token...");
      setTimeout(() => {
        setfirst("Recolectando datos...");
        setTimeout(() => {
          setfirst("Resolviendo logica interna...");
        }, 3000);
      }, 4000);
    }, 5000);
  }, []);

  const [first, setfirst] = useState("Verificando servidor...");

  return (
    <div className="flex justify-start mt-5 pl-3">
      <p className="text-[14px]">{first}</p>
    </div>
  );
}
