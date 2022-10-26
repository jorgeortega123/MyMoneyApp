import React, { useCallback, useEffect, useState } from "react";
//@ts-ignore
import newWindow from "../../assets/svg/newWindow.svg";
import inGroupSVG from "../../assets/svg/group.svg";
import inSoloSVG from "../../assets/svg/person.svg";
import { lang } from "./langs";
import HeroMain from "./Carrousel";
const imagesFrom = lang.static.images
export default function ContainerProyects({
  title = "Semaforos ",
  img = [],
  about = "Trata acerca de dos cosas que sulen sesr importante el uno del otro para convivir de mejor manera siuuuu",
  langs = ["Javascript", "Python"],
  web = "https://www.example.com",
  index = 0,
  inGroup = false,
  showImage,
  ...props
}: {
  title: string;
  img: [];
  about: string;
  langs: string[];
  web: string;
  index: number;
  inGroup: boolean;
  showImage: (data: string) => void;
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
  const [showGroup, setshowGroup] = useState(false);
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
  const changeHandle = () => {
    if (showGroup === true) {
      setshowGroup(false);
    } else {
      setshowGroup(true);
    }
  };
  return (
    <div className="w-full border shadow-xl lg:border-0 pl-2 pr-2 lg:shadow-2xl">
      <div className="items-center flex justify-center pl-[20px] relative">
        <div
          onClick={() => {
            changeHandle();
          }}
          className="absolute right-0 mt-1 w-[36px] fill-slate-50"
        >
          {inGroup ? (
            <img
              onMouseLeave={() => {
                changeHandle();
              }}
              onMouseEnter={() => {
                changeHandle();
              }}
              src={inGroupSVG}
            ></img>
          ) : (
            <img
              onMouseEnter={() => {
                changeHandle();
              }}
              onMouseLeave={() => {
                changeHandle();
              }}
              src={inSoloSVG}
            ></img>
          )}
          {showGroup && (
            <>
              <div className=" flex items-center justify-center rounded-t-[7px] left-[-115px] lg:left-[-115px] lg:top-[-22px] lg:h-[90px]  px-[2px] top-[-50px] absolute bg-[#408198] lg:bg-transparent lg:rounded-sm lg:border-l-[1px] lg:border-yellow-300 lg:backdrop-blur-3xl  text-[14px] text-slate-800 w-[110px]">
                <p className="text-center text-yellow-200">
                  App desarrollada de manera{" "}
                  {!inGroup ? <span>individual</span> : <span>grupal</span>}
                </p>{" "}
              </div>
            </>
          )}
        </div>
        <div className="w-max h-max flex rotate180 flex-col-reverse justify-right mt-[4px]">
          <span
            className={`linesTitle oneTitle w-[${index * 2 + 0.4 * 100}px]`}
          ></span>
          <span
            className={`linesTitle twoTitle w-[${index * 2.7 + 0.6 * 100}px]`}
          ></span>
          <span
            className={`linesTitle thrTitle w-[${index * 4.7 + 0.2 * 100}px]`}
          ></span>
        </div>
        <p
          className="pt-[1px] hover:text-yellow-300 pb-[1px] cursor-pointer lg:text-[42px] lg:my-4 container-proyects"
          onClick={() => {
            var link = document.createElement("a");
            link.href = web;
            link.target = "_blank";
            link.click();
          }}
        >
          {title}
        </p>
        <img
          className=" w-7 h-7 ml-1 mt-[-2px] cursor-pointer"
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
      <div className="flex-col sm:flex-row w-full lg:flex lg:items-center">
        <div className="w-12/12 lg:h-[500px] lg:min-w-[390px] lg:w-7/12  items-center flex justify-center px-2">
          <HeroMain images={imagesFrom[index].all} showImage={showImage}></HeroMain>
        </div>
        <div className="normalText text-[12px] h-full lg:p-10 lg:w-8/12 flex flex-col lg:text-left lg:items-center lg:justify-center">
          <div
            className="normalText text-[18px] lg:text-[24px]"
            dangerouslySetInnerHTML={{ __html: about }}
          ></div>
          <div
            id={"appendp" + index}
            className="flex flex-wrap mt-2 mb-2"
          ></div>
        </div>
      </div>
      <div className="invisible lg:visible lg:flex lg:flex-col w-full items-center justify-center">
        <div className=" lg:w-[520px] h-[1px] bg-green-500"></div>
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
