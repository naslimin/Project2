// import Image from 'next/image'
import AvatarUser from '../components/compose/AvatarUser'
import Layout from '../components/layout'
import styles from './userinfo.module.css'

export default function UserInfo() {
  return (
    <section>
      <h2>ข้อมูลส่วนตัว</h2>
      <div className={`${styles.form}`}>
        <div className={`${styles.mb}`}>
          <AvatarUser big={true} />
        </div>

        <div className={`${styles.warperbox}`}>
          <div className={`${styles.iconWarper}`}>
            <img width={20} height={20} src="/icon/menu.png"></img>
          </div>
          <p className={`${styles.title}`}>ข้อมูลพื้นฐาน</p>
        </div>
        <div className={`${styles.warperboxitem} ${styles.mb}`}>
          <div className={`${styles.warperboxbody}`}>
            <p className={`${styles.title}`}>ชื่อ-สกุล : นาง ภาตีเมาะ ดือรามะ</p>
            <p className={`${styles.title}`}>ตำหน่ง : ผู้อำนวยการโรงเรียน</p>
            <p className={`${styles.title}`}>ประเภท : ข้าราชการครู</p>
            <p className={`${styles.title}`}>วิทยฐานะ : ชำนาญการพิเศษ</p>
            <p className={`${styles.title}`}>สังกัด : สพป.ปัตตานี เขต 3</p>
            <p className={`${styles.title}`}>โรงเรียน : บ้านวังกะพ้อ(เพียรอนุสรณ์)</p>
          </div>
        </div>

        <div className={`${styles.warperbox}`}>
          <div className={`${styles.iconWarper}`}>
            <img width={20} height={20} src="/icon/menu.png"></img>
          </div>
          <p className={`${styles.title}`}>ข้อมูลด้านการสอน</p>
        </div>
        <div className={`${styles.warperboxitem} ${styles.mb}`}>
          <div className={`${styles.warperboxbody}`}>
            <p className={`${styles.title}`}>ระดับชั่นที่สอน : ไม่ได้กำหนดการสอน</p>
            <p className={`${styles.title}`}>กลุ่มสาระฯ : -</p>
          </div>
        </div>
      </div>
    </section>
  )
}

UserInfo.getLayout = function getLayout(page) {
  return (
    <Layout title={'ข้อมูลส่วนตัว'}>
      {page}
    </Layout>
  )
}
