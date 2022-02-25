// import Image from 'next/image'
import styles from './index.module.css'

export default function AvatarUser({ big }) {
  if (big) {
    return (
      <div className={styles.avatarBig}>
        <img src="/icon/user.png" alt="Avatar" width="120" height="120" />
      </div>
    )
  } else {
    return (
      <div className={styles.avatar}>
        <img src="/icon/user.png" alt="Avatar" width="60" height="60" />
      </div>
    )
  }

}
