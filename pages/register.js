import Layout from '../components/layoutLogin'
import InputType from '../components/compose/inputType'
import styles from './index.module.css'
import Link from 'next/link'
export default function Register() {
  return (
    <>
      <h2 className={styles.textTitle}>Register</h2>
      <InputType className={styles.spacer} type="text" placeholder="Name" />
      <InputType className={styles.spacer} type="text" placeholder="Subname" />
      <InputType className={styles.spacer} type="email" placeholder="Email" />
      <InputType className={styles.spacer} type="password" placeholder="Password" />
      <InputType className={styles.spacer} type="password" placeholder="Confirm password" />
      <Link href={'register-next'}>
        <div className={`${styles.loginBTN} fontText`}>Next</div>
      </Link>
    </>
  )
}

Register.getLayout = function getLayout(page) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}