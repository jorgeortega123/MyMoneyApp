import React from "react";

export default function SocialNetworks({
  img = "sad",
  url = "sddsa",
  classNamee = '',
  intoImg = '',
  ...props
}: {
  img: any;
  url: string;
  classNamee: any;
  intoImg: any
}) { 
    const goToUrl = (linkOpen:any) => { 
        var link = document.createElement("a");
        link.href = linkOpen;
        link.target = "_blank";
        link.click();
    }
  return (
    <div className={classNamee}>
    <img
      src={img}
      className={`Social ${intoImg}`}
      onClick={() => {
        goToUrl(url)
      }}
    />
    </div>
  );
}
