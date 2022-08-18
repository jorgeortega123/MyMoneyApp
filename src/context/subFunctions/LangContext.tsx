import { createContext, useEffect, useState } from "react";
export const LangContext = createContext();
export default function LangContextComponent({ langg }) {
  return (
    <LangContext.Provider value={{ lang: "es" }}>{langg}</LangContext.Provider>
  );
}
