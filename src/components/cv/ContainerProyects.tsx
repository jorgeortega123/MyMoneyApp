import React from "react";
//@ts-ignore
import newWindow from "../../assets/svg/newWindow.svg";
export default function ContainerProyects({
  title = "Semaforos ",
  img = "IMG",
  about = "Trata acerca de dos cosas que sulen sesr importante el uno del otro para convivir de mejor manera siuuuu",
  langs = ["Javascript", "Python"],
  web = "https://www.example.com",
  ...props
}: {
  title: string;
  img: string;
  about: string;
  langs: string[];
  web: string;
}) {
  return (
    <div className="w-full border pl-2 pr-2">
      <div className="items-center flex justify-center">
        <div className="w-max h-max flex rotate180 flex-col-reverse justify-right">
          <span className="linesTitle oneTitle"></span>
          <span className="linesTitle twoTitle"></span>
          <span className="linesTitle thrTitle"></span>
        </div>
        <p>{title}</p>
        <img className="w-7 h-7 ml-1" src={newWindow} alt="" onClick={()=>{
          var link = document.createElement("a")
          link.href = web
          link.target = "_blank"
          link.click()
        }
          
        }/>
      </div>
      <div className="flex-col sm:flex-row w-full">
        <div className="grow w-full h-[170px] items-center flex justify-center">
          FOTO
        </div>
        <div className="h-full flex flex-col justify-end">
          <p className="text-[17px]">{about}</p>
          <div className="flex flw-wrap mt-2 mb-2">
          {langs.map((lan,index) => (
            <p key={lan + "Child" + index} className='tagsLanguajes'>
              {lan}
            </p>
          ))}
          </div>
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