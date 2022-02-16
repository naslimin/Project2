import Layout from '../components/layoutLogin'
import UserBlank from '../components/compose/userBlank'
import InputType from '../components/compose/inputType'
import styles from './index.module.css'
import RadioType from '../components/compose/radioType'
import Link from 'next/link'
export default function Index() {
  return (
    <>
      <UserBlank className={styles.spacer} />
      <InputType className={styles.spacer} type="text" placeholder="Username (Email)" />
      <InputType className={styles.spacer} type="password" placeholder="Password" />
      <div className={styles.redioWarper}>
        <RadioType name="loginType" checked={true} value="remember_me" onChange={e => console.log(e)}>Remember me</RadioType>
        <RadioType name="loginType" value='forgot_password' onChange={e => console.log(e)}>Forgot password</RadioType>
      </div>
      <Link href={'home'}>
        <div className={`${styles.loginBTN} fontText`}>Login</div>
      </Link>
    </>
  )
}

Index.getLayout = function getLayout(page) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}