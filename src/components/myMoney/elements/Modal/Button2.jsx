import React from 'react'

function Button2({ children, ...props }) {

  return (
    
    <button {...props} className={'w-full mt-1 border-[1px] border-slate-900 text-slate-900 rounded-[8px] p-1 hover:bg-cyan-900 hover:text-white transition duration-200'} >
        {children}
    </button>

  )
}
export default Button2;