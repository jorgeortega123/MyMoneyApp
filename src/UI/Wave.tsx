import React from 'react'

export default function Wave({
  fill = "#00cba9",
  ...props
}: {
  fill?: string;
}) {
  return (
     <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
     <path fill={fill} fill-opacity="1" d="M0,256L30,240C60,224,120,192,180,160C240,128,300,96,360,112C420,128,480,192,540,213.3C600,235,660,213,720,224C780,235,840,277,900,261.3C960,245,1020,171,1080,165.3C1140,160,1200,224,1260,240C1320,256,1380,224,1410,208L1440,192L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"></path>
   </svg>
  )
}
