import Head from 'next/head'
import styles from './layoutLogin.module.css'

export default function LayoutLogin({ children }) {
  return (
    <>
      <Head>
        <title>โรงเรียนบ้านวังกะพ้อ เพียรอนุสรณ์</title>
      </Head>
      <main className={styles.main}>
        <div>
          <h1 className={`${styles.welcomeText} fontTextSC`}>WELCOME</h1>
          <h2 className={`${styles.fontText} ${styles.titleText} fontText`}>โรงเรียนบ้านวังกะพ้อ เพียรอนุสรณ์</h2>
          <div className={styles.boxLogin}>
            {children}

            <div className={`${styles.loginBTN} fontText`}>Login</div>
          </div>
        </div>

      </main>
    </>
  )
}
