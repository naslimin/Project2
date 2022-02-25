import Layout from '../components/layout'
import styles from './setting.module.css'

export default function Setting() {
  return (
    <section>
      <h2>ข้อมูลส่วนตัว</h2>
      <div className={`${styles.form}`}>
        <div className={`${styles.titleBox}`}>
          <p className={`${styles.titleText}`}>การตั้งค่าบัญชีทั่วไป</p>
        </div>
        <div>
          <div>ชื่อผู้ใช้งาน</div>
          <div>ภาตีเมาะ ดือรามะ</div>
          <div>แก้ไข</div>
        </div>
        <div className={`${styles.titleBox}`}>
          <p className={`${styles.titleText}`}>การตั้งค่าความเป็นส่วนตัว</p>
        </div>
        <div className={`${styles.titleBox}`}>
          <p className={`${styles.titleText2}`}>ทางลัดความเป็นส่วนตัว</p>
        </div>
        <div>
          <div>จัดการโปรไฟล์ของคุณ</div>
          <div>แก้ไข</div>
        </div>
      </div>
    </section>
  )
}

Setting.getLayout = function getLayout(page) {
  return (
    <Layout title={'ข้อมูลส่วนตัว'}>
      {page}
    </Layout>
  )
}
