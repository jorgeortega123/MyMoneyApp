import React from "react";

export default function ContainerProyects({
  title = "Semaforos ",
  img = "IMG",
  about = "Trata acerca de dos cosas que sulen sesr importante el uno del otro para convivir de mejor manera siuuuu",
  langs = ["Javascript", "Python"],
  ...props
}: {
  title: string;
  img: string;
  about: string;
  langs: object;
}) {
  return (
    <div className="w-[350px] border pl-[19px] pr-[19px]">
      <div className="items-center flex justify-left">
        <p>{title}</p>
      </div>
      <div className="flex">
        <div className="w-[150px] h-[150px] items-center flex justify-left">
          FOTO
        </div>
        <div className="h-full">
          <p>ABOUT</p>
          <p className="b-0">LANGUAGES</p>
        </div>
      </div>
    </div>
  );
}
