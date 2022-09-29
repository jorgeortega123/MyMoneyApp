
import dayjs from 'dayjs'
import weekday from  'dayjs/plugin/weekday.js'
import useGlobalContext from '../../../../context/useGlobalContext'

export default function KnowDay() { 
    const { context } = useGlobalContext();
    dayjs.extend(weekday)
    // Si es domingo o lunes devolvera true
    var finDeSemana = dayjs().date()
    var toDay = dayjs().day()
    if (toDay < 1 ) { 
      return {data: true, extra:toDay  }
    } else { 
        return {data: false, extra:toDay}
        
    }
   
}