import Layout from '../components/layout'
import dynamic from 'next/dynamic'
const BigCalendarCustom = dynamic(() => import('../components/compose/BigCalendarCustom'), { ssr: false })
export default function Home() {
  return (
    <section>
      <div>
      <BigCalendarCustom/>
      </div>
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
