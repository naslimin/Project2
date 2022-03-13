import React, { useEffect, useState } from 'react';
// import events from './events';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import styles from './index.module.css'
import fire from '../../../config/firebase';
import _ from 'lodash'
moment.locale('en-GB');
const localizer = momentLocalizer(moment);
// const NameDay = { "Sun": "S", "Mon": "M", "Tue": "T", "Wed": "W", "Thu": "T", "Fri": "F", "Sat": "S" }
var events = []
let MyCustomHeader = ({ label, date }) => {
  return (
    <div className={styles.fontDay}>{moment(date).format('ddd')}</div>
  )
}
class MyCustomDateHeader extends React.Component {
  constructor(props) {
    super(props);
    this.toDay = moment(props.date).startOf('D').format("L") == moment().startOf('D').format("L")
    this.state = {
      www: null,
      hhh: null,
      item: -1
    }
    this.div = React.createRef();
    this.setM = false
  }

  checkInDate() {
    this.props.props.setAlertInner(<><img width={60} height={60} src='/icon/loading-buffering.gif' /></>)
    this.props.props.setShowAlert(true);
    var weekdays = moment().day()
    var user = this.props.props.UserData;
    if (weekdays == 0 || weekdays == 6) {
      this.props.props.setAlertInner(<>
        <p>ขณะนี้อยู่นอกเหนือเวลาบันทึกเวลาเข้า (07:00-08:30)<br />
          และเวลาออก (15:45-18:00)<br />
          โปรดลองอีกครั้งภายหลัง</p>
      </>)
      this.props.props.setShowAlert(true);
    } else {
      fire.firestore().collection(`${user.email}/history/${moment().format('YYYY-MM')}`).doc(`${moment().format('DD')}`).get().then(doc => {
        if (!doc.exists) {
          var checkInData = {}
          if (moment().toDate().getHours() >= 7 && moment().toDate().getHours() <= 9) {
            checkInData = {
              desc: 'Check In',
              start: moment().toDate(),
              end: null,
              type: 'checkin'
            }
          } else {
            checkInData = {
              desc: 'Check Rate',
              start: moment().toDate(),
              end: null,
              type: 'checkrate'
            }
          }
          fire.firestore().collection(`${user.email}/history/${moment().format('YYYY-MM')}`)
            .doc(`${moment().format('DD')}`)
            .set(checkInData)
            .then(() => {
              this.props.props.setShowAlert(false);
              this.props.props.getEvent()
            })
            .catch((error) => {
              console.log(error)
              this.props.props.setAlertInner(<>
                <p>{error.message}</p>
              </>)
              this.props.props.setShowAlert(true);
            });
        } else {
          this.props.props.setShowAlert(false);
        }
      })
    }
  }

  stampLogoutTime(startDate) {
    this.props.props.setAlertInner(<><img width={60} height={60} src='/icon/loading-buffering.gif' /></>)
    this.props.props.setShowAlert(true);
    var stampTime = moment(startDate).hours(17).minute(0).toDate()
    if (moment(startDate).format('YYYY-MM-DD') == moment().format('YYYY-MM-DD')) {
      stampTime = moment().toDate()
    }
    fire.firestore().collection(`${this.props.props.UserData.email}/history/${moment(startDate).format('YYYY-MM')}`).doc(`${moment(startDate).format('DD')}`).update(
      {
        end: stampTime
      }
    )
      .then(() => {
        this.props.props.setShowAlert(false);
        this.props.props.getEvent()
      })
      .catch((error) => {
        this.props.props.setAlertInner(<>
          <p>{error.message}</p>
        </>)
        this.props.props.setShowAlert(true);
      });
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

  checkDateCondition(item) {
    if (events[item].type == "checkin") {
      return styles.checkin
    } else if (events[item].type == "checkrate") {
      return styles.checkrate
    } else if (events[item].type == "leavework") {
      return styles.leavework
    } else {
      return null
    }
  }

  render() {
    return (
      <>
        {
          this.toDay && this.state.item == -1 ?
            <div
              onClick={() => this.checkInDate()} ref={this.div}
              style={{ width: this.state.www, height: this.state.hhh }}
              className={`tooltip ${styles.fontDate} ${styles.focusDate} ${styles.checkintoday}`}>
              {this.props.label}
              <span class="tooltiptext">Check In</span>
            </div>
            :
            this.toDay && this.state.item != -1 && events[this.state.item].end == null ?
              <div
                onClick={() => this.stampLogoutTime(events[this.state.item].start)} ref={this.div}
                style={{ width: this.state.www, height: this.state.hhh }}
                className={`tooltip ${styles.fontDate} ${styles.focusDate} ${styles.checkouttoday}`}>
                {this.props.label}
                <span class="tooltiptext">Check Out</span>
              </div>
              :
              this.state.item != -1 ?
                <div ref={this.div} style={{ width: this.state.www, height: this.state.hhh }} className={`${styles.fontDate} ${this.checkDateCondition(this.state.item)} ${styles.focusDate}`}>{this.props.label}</div>
                :
                <div ref={this.div} style={{ width: this.state.www, height: this.state.hhh }} className={`${styles.fontDate}`}>{this.props.label}</div>
        }
      </>
    )
  }
}

const ListEvents = () => {
  const checkDateCondition = (element) => {
    if (element.type == "checkin") {
      return styles.checkin
    } else if (element.type == "checkrate") {
      return styles.checkrate
    } else if (element.type == "leavework") {
      return styles.leavework
    } else {
      return null
    }
  }
  return events.reverse().map((element, i) => {
    return <div key={`ListEvents_${i}`} className={`${styles.eventWarper}`}>
      <div className={`${styles.eventWarperTitle}`}>
        <p className={`${styles.eventTitle}`}>{element.desc}</p>
        <p className={`${styles.eventMonth}`}>{moment(element.start).format("LL")}</p>
      </div>
      <div className={`${styles.eventWarperTitle}`}>
        <p className={`${styles.eventDate}
        ${checkDateCondition(element)}
        `}>{
            element.type == "leavework" ?
              '--:--'
              :
              element.end ?
                <>
                  <span>{moment(element.start).format('HH:mm')}</span>
                  <span>{moment(element.end).format('HH:mm')}</span>
                </>
                :
                <>
                  <span>{moment(element.start).format('HH:mm')}</span>
                  <span>--:--</span>
                </>
          }</p>
      </div>
    </div>
  });
}

class CustomToolbar extends React.Component {
  constructor(props) {
    super(props);
  }
  prevM() {
    this.props.g_props.setEventDataM(moment(this.props.date).startOf('month').add(-1, 'd').format('YYYY-MM'))
    return this.props.onNavigate ? this.props.onNavigate('PREV') : undefined
  }
  nextM() {
    this.props.g_props.setEventDataM(moment(this.props.date).endOf('month').add(1, 'd').format('YYYY-MM'))
    return this.props.onNavigate ? this.props.onNavigate('NEXT') : undefined
  }
  render() {
    return (
      <>
        <div className={`${styles.warperCalendarHeader} ${styles.boxNav}`}>
          <div onClick={() => this.prevM()} className={`${styles.navbtn} ${styles.prev}`}>&#60;</div>
          <div className={`${styles.CalendarHeaderText} text-center`}>{this.props.label}</div>
          <div onClick={() => this.nextM()} className={`${styles.navbtn} ${styles.next}`}>&#62;</div>
        </div>
      </>
    )
  }
}

export default function BigCalendarCustom({ props }) {
  events = _.clone(props.EventData)

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
            month: { header: MyCustomHeader, dateHeader: (e) => <MyCustomDateHeader props={props} events={events} {...e} /> },
            toolbar: (e) => <CustomToolbar g_props={props} {...e} />
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