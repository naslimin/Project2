import React from 'react';
import events from './events';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import styles from './index.module.css'
moment.locale('en-GB');
const localizer = momentLocalizer(moment);
const NameDay = { "Sun": "S", "Mon": "M", "Tue": "T", "Wed": "W", "Thu": "T", "Fri": "F", "Sat": "S" }
let MyCustomHeader = ({ label }) => {
  
  return (
    <div className={styles.fontDay}>{NameDay[label]}</div>
  )
}
class MyCustomDateHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      www: null,
      hhh: null
    }
    this.div = React.createRef();
    this.item = events.findIndex(e => {
      // if (this.props.date >= e.start && this.props.date <= e.end) {
      //   return true
      // }

      if (this.props.date.getDate() >= e.start.getDate() && this.props.date.getDate() <= e.end.getDate()) {
        return true
      }
    })
    this.setM = false
  }
  componentDidMount() {
    if (this.div.current.offsetHeight <= this.div.current.offsetWidth) {
      this.setState({
        www: this.div.current.offsetHeight
      })

      this.forceUpdate()
    }
    if (this.div.current.offsetHeight >= this.div.current.offsetWidth) {
      this.setState({
        hhh: this.div.current.offsetWidth
      })

      this.forceUpdate()
    }
  }

  render() {
    if (this.item != -1)
      return (
        <div ref={this.div} style={{ width: this.state.www, height: this.state.hhh }} className={`${styles.fontDate} ${events[this.item].type == "checkin" ? styles.checkin : events[this.item].type == "checkrate" ? styles.checkrate : ''} ${styles.focusDate}`}>{this.props.label}</div>
      )
    else return (
      <div ref={this.div} style={{ width: this.state.www, height: this.state.hhh }} className={styles.fontDate}>{this.props.label}</div>
    )
  }
}

const ListEvents = () => {
  return events.map((element,i) => {
    return <div key={`ListEvents_${i}`} className={`${styles.eventWarper}`}>
      <div className={`${styles.eventWarperTitle}`}>
        <p className={`${styles.eventTitle}`}>{element.desc}</p>
        <p className={`${styles.eventMonth}`}>{moment(element.start).format("MMM")} {NameDay[moment(element.start).format('ddd')]}</p>
      </div>
      <div className={`${styles.eventDate}`}>{moment(element.start).format('dddd Do h:mm')}</div>
    </div>
  });
}

class CustomToolbar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <>
        <div className={`${styles.warperCalendarHeader} ${styles.boxNav}`}>
          <div onClick={() => this.props.onNavigate ? this.props.onNavigate('PREV') : undefined} className={`${styles.navbtn} ${styles.prev}`}>&#60;</div>
          <div className={`${styles.CalendarHeaderText} text-center`}>{this.props.label}</div>
          <div onClick={() => this.props.onNavigate ? this.props.onNavigate('NEXT') : undefined} className={`${styles.navbtn} ${styles.next}`}>&#62;</div>
        </div>
      </>
    )
  }
}

export default function BigCalendarCustom() {
  return (
    <div className={styles.bgCalenDarOuter}>
      <div className={styles.bgCalenDar}>
        <div className={styles.warperCalendarHeader}>
          <div className={`${styles.CalendarHeader1} ${styles.CalendarHeaderBox}`}>&#9776;</div>
          <div className={`${styles.CalendarHeader2} ${styles.CalendarHeaderBox}`}>&#43;</div>
        </div>

        <Calendar
          localizer={localizer}
          views={{ month: true }}
          events={[]}
          step={60}
          style={{ height: 500, width: '100%' }}
          defaultDate={moment().toDate()}
          components={{
            month: { header: MyCustomHeader, dateHeader: MyCustomDateHeader },
            toolbar: CustomToolbar
          }}
        />
        <div className={`${styles.eventBox}`}>
          <p className={`${styles.upcommingHeader}`}>Upcomming events this month</p>

          <ListEvents />
        </div>
      </div>
    </div>
  )
}