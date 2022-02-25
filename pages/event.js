import EventBox from '../components/compose/EventBox'
import Layout from '../components/layout'
import events from '../components/compose/BigCalendarCustom/events'

const ListEvents = () => {
  return events.map((element,i) => {
    return <EventBox key={`ListEvents_${i}`} element={element}></EventBox>
  });
}

export default function Event() {
  return (
    <section>
      <h2>บันทึกการมาโรงเรียนประจำวัน</h2>
      <ListEvents/>
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
