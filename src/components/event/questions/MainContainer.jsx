import React from 'react'
import { version } from 'react-dom'
import View from './View'
const quest = [{
  title: 'Cual es la velacidad de la luz ', 
  questions: ['299 mil km/s', "299 mil m/s", '399 mil km/s'],
  correct: 3
}]
export default function MainContainer() {
  const VerifyAnswer = (user, correct) => { 
    user = user + 1
    document.getElementById('question')
    if (user===correct) { 
      alert('correct')
    }
  }
  return (
    <div className='Principal h-screen w-screen bg-[#000000] flex justify-center items-center '>
     <div className='text-white flex flex-col items-center h-[300px]'> 
      <p className='text-[35px] font-semibold'>Hola</p>
      <p>Para continear, verifica que eres tu</p>
      <div className='border-[1px] border-white p-5 flex flex-col space-y-2'>
        {quest.map((e, inde)=> { 
          return (<><p>{e.title}</p>
          {e.questions.map((d, ind)=> { 
            return (<div className='flex'><input id={"question" + inde } type="radio" name="" id="" defaultChecked={false} /><p>{d}</p></div>)
          })}
          <button onClick={()=>VerifyAnswer(e.correct, inde)}>sad</button>
         </>
            )

        })}
      </div>
     </div>
    </div>
  )
}
