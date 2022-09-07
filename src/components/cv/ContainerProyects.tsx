import React, { useEffect } from "react";
//@ts-ignore
import newWindow from "../../assets/svg/newWindow.svg";
export default function ContainerProyects({
  title = "Semaforos ",
  img = "IMG",
  about = "Trata acerca de dos cosas que sulen sesr importante el uno del otro para convivir de mejor manera siuuuu",
  langs = ["Javascript", "Python"],
  web = "https://www.example.com",
  index = 0,
  ...props
}: {
  title: string;
  img: string;
  about: string;
  langs: string[];
  web: string;
  index: number
}) {
  const colors = [
    {
      b: "#D36B00",
      t: "#2A0944",
    },
    {
      b: "#3B9AE1",
      t: "#42032C",
    },
    {
      b: "#533483",
      t: "#FFEA11",
    },
    {
      b: "#E94560",
      t: "#FFFFFF",
    },
    {
      b: "#FECD70",
      t: "#472D2D",
    },
    {
      b: "#B9FFF8",
      t: "#781C68",
    },
    {
      b: "#A7D2CB",
      t: "#874C62",
    },
    {
      b: "#A7D2CB",
      t: "#874C62",
    },
    {
      b: "#A7D2CB",
      t: "#874C62",
    },
  ];
  const elemets = () => {
    langs.map((lan, indexNumber) => {
      var elementCreate = document.createElement("p");
      elementCreate.textContent = lan;
      elementCreate.classList.add("tagsLanguajes", "num" + indexNumber);
      elementCreate.style.color = colors[indexNumber].t;
      elementCreate.style.backgroundColor = colors[indexNumber].b;
      document.getElementById("appendp" + index)?.append(elementCreate);
    });
  };
  useEffect(() => {
    if (document.readyState === "complete") {
      elemets();
    } else {
      window.addEventListener("load", () => elemets());
      return () => document.removeEventListener("load", () => elemets());
    }
  }, []);

 
  /*
      {langs.map((lan, index) => {
              console.log(index)
              console.log(colors[index])
                      var elementCreate = document.createElement("p")
  elementCreate.classList.add('tagsLanguajes', 'num' + index)
  elementCreate.setAttribute('style', `background-color: ${colors[index].b};color: ${colors[index].t}`)
  document.getElementById("appendp")?.append(elementCreate)
}
              return (
                <p key={lan + "Child" + index} className="tagsLanguajes">
                  {lan}
                </p>
              );
            })}
*/

  //window.addEventListener('load', ()=> elemets())
  return (
    <div className="w-full border pl-2 pr-2">
      <div className="items-center flex justify-center">
        <div className="w-max h-max flex rotate180 flex-col-reverse justify-right">
          <span className="linesTitle oneTitle"></span>
          <span className="linesTitle twoTitle"></span>
          <span className="linesTitle thrTitle"></span>
        </div>
        <p>{title}</p>
        <img
          className="w-7 h-7 ml-1"
          src={newWindow}
          alt=""
          onClick={() => {
            var link = document.createElement("a");
            link.href = web;
            link.target = "_blank";
            link.click();
          }}
        />
      </div>
      <div className="flex-col sm:flex-row w-full">
        <div className="w-full items-center flex justify-center p-2">
          <img src={img} className="imageExamples " alt="" />
        </div>
        <div className="h-full flex flex-col justify-end">
          <p className="text-[17px]">{about}</p>
          <div id={"appendp" + index } className="flex flex-wrap mt-2 mb-2"></div>
        </div>
      </div>
    </div>
  );
}

/*
    <div className="w-full border pl-2 pr-2">
      <div className="items-center flex justify-left">
        <p>{title}</p>
        <img className="w-7 h-7 ml-1" src={newWindow} alt="" />
      </div>
      <div className="flex">
        <div className=" w-[150px] h-[170px] items-center flex justify-left">
          FOTO
        </div>
        <div className="h-full flex flex-col justify-end">
          <p className="text-[17px]">{about}</p>
          {langs.map((lan,index) => (
            <p key={lan + "Child" + index} className="tagsLanguajes">
              {lan}
            </p>
          ))}
        </div>
      </div>
    </div>
*/
