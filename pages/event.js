import EventBox from '../components/compose/EventBox'
import Layout from '../components/layout'
import events from '../components/compose/BigCalendarCustom/events'

const ListEvents = ({props}) => {
  return props.EventData.map((element,i) => {
    return <EventBox key={`ListEvents_${i}`} element={element}></EventBox>
  });
}

export default function Event(props) {
  return (
    <section>
      <h2>บันทึกการมาโรงเรียนประจำวัน</h2>
      <ListEvents props={props}/>
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
