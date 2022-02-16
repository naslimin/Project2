import Image from 'next/image'
import styles from './index.module.css'

export default function ActivityBox({ }) {
  return (
    <div className={`${styles.box}`}>
      <h2 className={`${styles.titleText}`}>กิจกรรมประจำปีการศึกษา 2564</h2>
      <ul className={styles.ulList}>
        <li className={styles.listText}>กิจกรรมพัฒนาศักยภาพทักษะภาษาต่างประเทศ</li>
        <li className={styles.listText}>กิจกรรมพัฒนางานห้องสมุด</li>
        <li className={styles.listText}>กิจกรรมสัปดาห์ห้องสมุด</li>
        <li className={styles.listText}>กิจกรรมส่งเสริมนิสัยรักการอ่าน</li>
        <li className={styles.listText}>กิจกรรมท่องโลกไซเบอร์</li>
      </ul>
    </div>
  )
}