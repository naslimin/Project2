import React, { useEffect, useState } from 'react';
// import events from './events';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import styles from './index.module.css'
moment.locale('en-GB');
const localizer = momentLocalizer(moment);
const NameDay = { "Sun": "S", "Mon": "M", "Tue": "T", "Wed": "W", "Thu": "T", "Fri": "F", "Sat": "S" }
var events = []
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
      hhh: null,
      item: -1
    }
    this.div = React.createRef();
    this.setM = false
  }

  componentDidMount() {
    if (this.div.current.offsetHeight <= this.div.current.offsetWidth) {
      this.setState({
        www: this.div.current.offsetHeight
      })
    }
    if (this.div.current.offsetHeight >= this.div.current.offsetWidth) {
      this.setState({
        hhh: this.div.current.offsetWidth
      })
    }

    this.setState({
      item: this.props.events.findIndex(e => {
        if (this.props.date.getDate() == e.start.getDate() && this.props.date.getMonth() == e.start.getMonth()) {
          return true
        }
      })
    })
  }

  render() {
    return (
      <>
        {this.state.item != -1 ?
          <div ref={this.div} style={{ width: this.state.www, height: this.state.hhh }} className={`${styles.fontDate} ${events[this.state.item].type == "checkin" ? styles.checkin : events[this.state.item].type == "checkrate" ? styles.checkrate : ''} ${styles.focusDate}`}>{this.props.label}</div>
          :
          <div ref={this.div} style={{ width: this.state.www, height: this.state.hhh }} className={styles.fontDate}>{this.props.label}</div>
        }
      </>
    )
  }
}

const ListEvents = () => {
  return events.map((element, i) => {
    return <div key={`ListEvents_${i}`} className={`${styles.eventWarper}`}>
      <div className={`${styles.eventWarperTitle}`}>
        <p className={`${styles.eventTitle}`}>{element.desc}</p>
        <p className={`${styles.eventMonth}`}>{moment(element.start).format("LL")}</p>
      </div>
      <div className={`${styles.eventDate}`}>{moment(element.start).format('HH:mm')}</div>
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

export default function BigCalendarCustom({ props }) {
  events = props.EventData
  return (
    <div className={styles.bgCalenDarOuter}>
      <div className={styles.bgCalenDar}>
        <div className={styles.warperCalendarHeader}>
          <div className={`${styles.CalendarHeader1} ${styles.CalendarHeaderBox}`}></div>
          <div className={`${styles.CalendarHeader2} ${styles.CalendarHeaderBox}`}></div>
        </div>

        <Calendar
          localizer={localizer}
          views={{ month: true }}
          events={[]}
          step={60}
          style={{ height: 500, width: '100%' }}
          defaultDate={moment().toDate()}
          components={{
            month: { header: MyCustomHeader, dateHeader: (e) => <MyCustomDateHeader events={events} {...e} /> },
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