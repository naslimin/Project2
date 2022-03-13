import moment from 'moment';
import { useEffect } from 'react';
import EventBox from '../components/compose/EventBox'
import Layout from '../components/layout'
import _ from 'lodash'
// import events from '../components/compose/BigCalendarCustom/events'
import styles from './event.module.css'
const ListEvents = ({ props }) => {
  var event = _.clone(props.EventData)
  return event.reverse().map((element, i) => {
    return <EventBox key={`ListEvents_${i}`} props={props} element={element}></EventBox>
  });
}

export default function Event(props) {
  useEffect(() => {
    if (moment().startOf('month').format('YYYY-MM') != props.EventDataM) {
      props.setEventDataM(moment().startOf('month').format('YYYY-MM'))
    }
  }, [])
  return (
    <section>
      <div className={styles.warperBox}>
        <h2>บันทึกการมาโรงเรียนประจำวัน</h2>
        <div className="select">
          <select value={props.EventDataM} onChange={e => { props.setEventDataM(e.target.value) }}>
            {
              moment.months().map((e, i) => {
                var month = moment().month(i).format('YYYY-MM')
                return <option key={i}>{month}</option>
              })
            }
          </select>
        </div>
      </div>
      <ListEvents props={props} />
    </section>
  )
}

Event.getLayout = function getLayout(page) {
  return (
    <Layout title={'บันทึกการมาโรงเรียนประจำวัน'}>
      {page}
    </Layout>
  )
}
