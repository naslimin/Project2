import Head from 'next/head'
import styles from './layoutLogin.module.css'
import { useRouter } from "next/router";
import Link from 'next/link';
export default function LayoutLogin({ children, href }) {
  const router = useRouter();
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
          </div>
          {
            router.pathname == `/` ? <>
              <p className={styles.textNotCreateNow}>Don’t have any account yet?</p>
              <Link href={'register'}>
              <p className={styles.textCreateNow}>Create account</p>
              </Link>
            </>
              : null
          }
        </div>

      </main>
    </>
  )
}
