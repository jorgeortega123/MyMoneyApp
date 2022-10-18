import React from 'react'

function Button({ children, ...props }) {
  return (
    <button {...props} className={'mr-[3px] border-[1px] border-blue-500 text-blue-500 rounded-[4px] p-1 hover:bg-blue-700 hover:text-white transition duration-300'} >
        {children}
    </button>
  )
}
export default Button;