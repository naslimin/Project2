import Image from 'next/image'
import styles from './index.module.css'

export default function UserLoginBox({ }) {
  return (
    <div className={styles.warper}>
      <div className={styles.notic}>
        <Image src="/icon/comment.png" alt="Comment" width="20" height="20" />
        <Image src="/icon/alert.png" alt="Alert" width="20" height="20" />
      </div>
      <div className={styles.user}>
        <div className={styles.username}>ภาตีเมาะ ดือรามะ</div>
        <div className={styles.avatar}>
          <Image src="/demoImage/39cd1f2a-6b6b-4199-98ab-a80f629e5e51.jpeg" alt="Avatar" width="60" height="60" />
        </div>
      </div>
    </div>
  )
}
