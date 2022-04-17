// import Image from 'next/image'
import AvatarUser from '../components/compose/AvatarUser'
import Layout from '../components/layout'
import styles from './userinfo.module.css'

export default function UserInfo(props) {
  return (
    <section>
      <h2>ข้อมูลส่วนตัว</h2>
      <div className={`${styles.form}`}>
        <div className={`${styles.mb}`}>
          <AvatarUser big={true} src={props.UserDataDetail.Image}/>
        </div>

        <div className={`${styles.warperbox}`}>
          <div className={`${styles.iconWarper}`}>
            <img width={20} height={20} src="/icon/menu.png"></img>
          </div>
          <p className={`${styles.title}`}>ข้อมูลพื้นฐาน</p>
        </div>
        <div className={`${styles.warperboxitem} ${styles.mb}`}>
          <div className={`${styles.warperboxbody}`}>
            <p className={`${styles.title}`}>ชื่อ-สกุล : {props.UserDataDetail.Name} {props.UserDataDetail.Surname}</p>
            <p className={`${styles.title}`}>ตำหน่ง : {props.UserDataDetail.position || '-'}</p>
            <p className={`${styles.title}`}>ประเภท : {props.UserDataDetail.userType || '-'}</p>
            <p className={`${styles.title}`}>วิทยฐานะ : {props.UserDataDetail.userLevel || '-'}</p>
            <p className={`${styles.title}`}>สังกัด : {props.UserDataDetail.department || '-'}</p>
            <p className={`${styles.title}`}>โรงเรียน : {props.UserDataDetail.school || '-'}</p>
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
            <p className={`${styles.title}`}>ระดับชั่นที่สอน : {props.UserDataDetail.Grade || '-'}</p>
            <p className={`${styles.title}`}>กลุ่มสาระฯ : {props.UserDataDetail.Group || '-'}</p>
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
