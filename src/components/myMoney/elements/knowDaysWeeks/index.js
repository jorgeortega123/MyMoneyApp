
import dayjs from 'dayjs'
import weekday from  'dayjs/plugin/weekday.js'
import useGlobalContext from '../../../../context/useGlobalContext'

export  function KnowDay() { 
    dayjs.extend(weekday)
    //new (verify if today is new a new day)
    // alert(leftDays)
    //new
    //dataUser.history.rest.value = 0
    // Si es domingo o lunes devolvera true
    var finDeSemana = dayjs().date()
    var toDay = dayjs().day()
    if (toDay < 1 ) { 
      return {data: true, extra:toDay  }
    } else { 
        return {data: false, extra:toDay}
        
    }
   
}

export  function LeftMoney(day, money, restMoney, todayWaste) { 
  // var maxDays = 6
  // console.log(day)
  var dateUser = dayjs(day).$d 
  // console.log(dateUser)
  // var endWeek = dayjs(dayjs().endOf('week').$d)
  // var leftDays = (endWeek.diff(dateUser, 'days'))
  // // alert(leftDays)
  // if (restMoney < todayWaste) { 
  // }
  // var num = (maxDays - (leftDays -1)) * restMoney
  // console.log(dateUser, endWeek, leftDays, num)
  if (dayjs().$d===dateUser) { 

  }

   return (0)
}   