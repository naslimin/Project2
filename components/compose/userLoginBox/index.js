import Image from 'next/image'
import AvatarUser from '../AvatarUser'
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
        <AvatarUser/>
      </div>
    </div>
  )
}
