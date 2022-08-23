import React from "react";
import { motion } from "framer-motion";
function Tables({
  title = "",
  children = "",
  className = "",
  ...props
}: {
  className?: any;
  children?: any;
  title?: any;
}) {
console.log(children[0])
  return (
    <table className={`w-full text-sm text-left text-gray-500 ${className}`}>
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
        <tr>
          {title.map(({ t }: any) => {
            return <th scope="col" className="px-3 py-1"></th>;
          })}
        </tr>
      </thead>
      <tbody>
        <tr className="border-b   odd:bg-white even:bg-gray-50 ">
          {children[0].map(({ g }: any) => {
            console.log(children[0][0])
            return (
              <>
                <td className="px-2 py-1">{JSON.stringify(g.name)}</td>
                {
                //    <td className="px-2 py-1">{t[2]}</td>
                //<td className="px-2 py-1">{t[1]}</td>

                }
              </>
            );
          })}
        </tr>
      </tbody>
    </table>
  );
}
export default Tables;
