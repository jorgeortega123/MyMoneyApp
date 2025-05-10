import React, { useState, useEffect } from "react";

const FetchComponent = () => {
  const [count, setCount] = useState(0);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const userData = {
        j_username: "tu_nombre_de_usuario",
        j_password: "tu_contraseña",
      };

      for (let i = 0; i < 2; i++) {
        try {
          const response = await fetch(
            "https://academico.uce.edu.ec/aplicacion/j_spring_security_check",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(userData),
            }
          );

          if (!response.ok) {
            throw new Error("Error en la autenticación");
          }

          const result = await response.json();
          setData(result);
          setCount((prevCount) => prevCount + 1);
        } catch (error) {
          setError(error.message);
        }

         new Promise((resolve) => resolve); // Espera 2 segundos
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Fetch Component</h1>
      <p>Requests count: {count}</p>
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default FetchComponent;
