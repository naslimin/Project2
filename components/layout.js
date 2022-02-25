import Head from 'next/head'
import ActivityBox from './compose/activityBox'
import UserLoginBox from './compose/userLoginBox'
import styles from './layout.module.css'
import Sidebar from './sidebar'
export default function Layout({ children, title }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=1920"></meta>
      </Head>
      <main className={styles.main}>
        <Sidebar />
        {children}
        <div className={styles.secbar}>
          <UserLoginBox />
          <ActivityBox />
        </div>
      </main>
    </>
  )
}
