import Layout from '../components/layoutLogin'
import InputType from '../components/compose/inputType'
import styles from './index.module.css'
import Link from 'next/link'
export default function RegisterNext() {
  return (
    <>
      <h2 className={styles.textTitle}>Register</h2>
      <InputType className={styles.spacer} type="text" placeholder="ตำแหน่ง" />
      <div className={`${styles.imagePreview} ${styles.spacer}`}>
        - รูปภาพลายเช็น -
      </div>
      <div className={styles.boxBtnUpload}>
        <div className={styles.uploadBtn}>
          อัพโหลดรูปภาพ
        </div>
        <div className={styles.uploadBtn}>
          ถ่ายภาพ
        </div>
      </div>
      <Link href={'home'}>
        <div className={`${styles.loginBTN} fontText`}>Register</div>
      </Link>
    </>
  )
}

RegisterNext.getLayout = function getLayout(page) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}