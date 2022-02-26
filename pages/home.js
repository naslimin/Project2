import Layout from '../components/layout'
// import BigCalendarCustom from '../components/compose/BigCalendarCustom'
// const BigCalendarCustom = dynamic(() => import('../components/compose/BigCalendarCustom'), { ssr: false })
import dynamic from 'next/dynamic'
const BigCalendarCustom = dynamic(() => import('../components/compose/BigCalendarCustom'), { ssr: false })
export default function Home(props) {
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
