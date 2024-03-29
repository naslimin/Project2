// import Image from 'next/image'
import styles from './index.module.css'
import moment from 'moment';
moment.locale('en-GB');
export default function EventBox({ element, props }) {
  const ShowStatus = () => {
    if (element.type == 'checkin') {
      return <span className={`${styles.textMain} ${styles.checkintype} ${styles.textBold} ${styles.checkin}`}>{element.desc}</span>
    } else if (element.type == 'checkrate') {
      return <span className={`${styles.textMain} ${styles.checkintype} ${styles.textBold} ${styles.checkrate}`}>{element.desc}</span>
    } else if (element.type == 'leavework') {
      return <span className={`${styles.textMain} ${styles.checkintype} ${styles.textBold} ${styles.leavework}`}>{element.desc}</span>
    } else {
      return <span className={`${styles.textMain} ${styles.checkintype} ${styles.textBold} ${styles.checkin}`}>{element.desc}</span>
    }
  }
  return (
    <div className={styles.warper}>
      {/* <div className={styles.warperOptions}>
        <img src='/icon/options.png' width={20} height={20} ></img>
      </div> */}
      <div className={`${styles.warperBox}`}>
        <div className={`${styles.warperBoxBody}`}>
          <p className={`${styles.text} ${styles.textMain}`}>วันที่/เดือน/ปี</p>
          <p className={`${styles.text} ${styles.textSub} ${styles.textIndexDate}`}>{moment(element.start).format('DD/MM/YYYY')}</p>
          <p className={`${styles.text} ${styles.textMain}`}>เวลา</p>
          <p className={`${styles.text} ${styles.textIndexTime}`}>
            <span className={`${styles.textSub} ${styles.textP}`}>เข้า</span>
            <span className={`${styles.textMain} ${styles.textBold} ${styles.textP}`}>{
            element.type == "leavework" ?
            '--:--'
            :moment(element.start).format('HH:mm')}</span>
            <span className={`${styles.textSub} ${styles.textP}`}>ออก</span>
            {
              element.type == "leavework" ?
              '--:--'
              :
              element.end ?
                <span className={`${styles.textMain} ${styles.textBold}`}>{moment(element.end).format('HH:mm')}</span>
                :
                <span className={`${styles.textMain} ${styles.textBold}`}>--:--</span>
            }
          </p>
          <p className={`${styles.text} ${styles.mtauto}`}>
            <span className={`${styles.textSub} ${styles.textP}`}>สถานะ:</span>
            <ShowStatus />
          </p>
        </div>
        <div className={`${styles.warperBoxBodyImage}`}>
          <img src={props.UserDataDetail.Signature} height={91}></img>
          <p className={`${styles.text} {styles.textMain}`}>-Signature-</p>
        </div>
      </div>
    </div>
  )
}
