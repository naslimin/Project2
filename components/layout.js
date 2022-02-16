import Head from 'next/head'
import styles from './layout.module.css'

export default function Layout({ children ,title}) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <main className={styles.main}>{children}</main>
    </>
  )
}
