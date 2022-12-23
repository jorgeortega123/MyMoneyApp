import React from 'react'

function Button2({ children, ...props }) {

  return (
    
    <button {...props} className={'w-full mt-1 border-[1px] border-[#0000001f]  text-slate-900 rounded-[8px] p-1 hover:bg-slate-200 transition duration-200'} >
        {children}
    </button>

  )
}
export default Button2;