import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday.js";
import useGlobalContext from "../../../../context/useGlobalContext";
var date = dayjs().$d.toString();
var datee = date.split(" ");
var [mes, dia, anio] = [datee[1], datee[2], datee[3]];
var toDayString = mes + dia + anio;
export function KnowDay() {
  dayjs.extend(weekday);

  var finDeSemana = dayjs().date();
  var toDay = dayjs().day();
  if (toDay < 1) {
    return { data: true, extra: toDay };
  } else {
    return { data: false, extra: toDay };
  }
}

export function LeftMoney(day, money, restMoney, todayWaste) {
  
  var use_date = dayjs().$d.toString();
  var use_datee = use_date.split(" ");
  var [use_mes, use_dia, use_anio] = [use_datee[1], use_datee[2], use_datee[3]];
  var use_toDayString = use_mes + use_dia + use_anio;
  console.log(use_toDayString, toDayString);
  if (use_toDayString === toDayString) {
    return 0;
  } else {
    console.log("dia", day, money, restMoney, todayWaste);
    var maxDays = 6;
    // console.log(day)
    var dateUser = dayjs(day).$d;
    console.log(dateUser);
    var endWeek = dayjs(dayjs().endOf("week").$d);
    var leftDays = endWeek.diff(dateUser, "days");

    // alert(leftDays)

    if (leftDays === 0) {
      leftDays = 0;
    }
    var num = (maxDays - leftDays) * restMoney;
    console.log(dateUser, endWeek, leftDays, num);
    var use_date = dayjs().$d.toString();
    var use_datee = use_date.split(" ");
    var [use_mes, use_dia, use_anio] = [
      use_datee[1],
      use_datee[2],
      use_datee[3],
    ];
    var use_toDayString = use_mes + use_dia + use_anio;
  }
  return num;
}
