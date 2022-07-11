import React, { useContext } from 'react'
import { GlobalContext } from './GlobalContext'

function useGlobalContext() {
     const context=useContext(GlobalContext)
  return {context}
}

export default useGlobalContext