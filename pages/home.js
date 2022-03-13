import Layout from '../components/layout'
import BigCalendarCustom from '../components/compose/BigCalendarCustom'
import moment from 'moment';

import { useEffect } from 'react';
export default function Home(props) {
  useEffect(() => {
    if (moment().startOf('month').format('YYYY-MM') != props.EventDataM) {
      props.setEventDataM(moment().startOf('month').format('YYYY-MM'))
    }
  }, [])
  return (
    <section>
      <BigCalendarCustom props={props} />
    </section>
  )
}

Home.getLayout = function getLayout(page) {
  return (
    <Layout title={"Home"}>
      {page}
    </Layout>
  )
}
