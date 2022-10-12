import React, { useContext } from 'react'
import { LangContext } from './LangContext'

function useLangContext() {
     const langs=useContext(LangContext)
  return {langs}
}

export default useLangContext