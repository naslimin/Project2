// import Image from 'next/image'
import styles from './index.module.css'
import moment from 'moment';
moment.locale('en-GB');
export default function EventBox({ element }) {
  return (
    <div className={styles.warper}>
      <div className={styles.warperOptions}>
        <img src='/icon/options.png' width={20} height={20} ></img>
      </div>
      <div className={`${styles.warperBox}`}>
        <div className={`${styles.warperBoxBody}`}>
          <p className={`${styles.text} ${styles.textMain}`}>วันที่/เดือน/ปี</p>
          <p className={`${styles.text} ${styles.textSub} ${styles.textIndexDate}`}>{moment(element.start).format('L')}</p>
          <p className={`${styles.text} ${styles.textMain}`}>เวลา</p>
          <p className={`${styles.text} ${styles.textIndexTime}`}>
            <span className={`${styles.textSub} ${styles.textP}`}>เข้า</span>
            <span className={`${styles.textMain} ${styles.textBold} ${styles.textP}`}>{moment(element.start).format('HH:mm')}</span>
            <span className={`${styles.textSub} ${styles.textP}`}>ออก</span>
            <span className={`${styles.textMain} ${styles.textBold}`}>{moment(element.end).format('HH:mm')}</span>
          </p>
          <p className={`${styles.text} ${styles.mtauto}`}>
            <span className={`${styles.textSub} ${styles.textP}`}>สถานะ:</span>
            <span className={`${styles.textMain} ${styles.textBold}`}>บันทึกแล้ว</span>
          </p>
        </div>
        <div className={`${styles.warperBoxBodyImage}`}>
          <img src='/icon/Signature.png' width={160} height={91} ></img>
          <p className={`${styles.text} {styles.textMain}`}>-Signature-</p>
        </div>
      </div>
    </div>
  )
}
