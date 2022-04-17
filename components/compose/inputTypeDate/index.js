import styles from './index.module.css'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import th from 'date-fns/locale/th';
import { registerLocale, setDefaultLocale } from  "react-datepicker";
registerLocale('th', th)
export default function InputTypeDate({ value, minDate, maxDate, className, name, onChange }) {

  const isWeekday = (date) => {
    const day = moment(date).weekday();
    return day !== 0 && day !== 6;
  };

  return (
    <>
      <DatePicker filterDate={isWeekday} locale="th" minDate={minDate ? new Date() : null} maxDate={maxDate ? new Date() : null} dateFormat="dd/MM/yyyy" className={`${styles.inputType} ${className}`} selected={value} onChange={date => onChange(name, date)} />
    </>
  )
}
