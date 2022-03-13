// import Image from 'next/image'
import styles from './index.module.css'

export default function AvatarUser({ big, src }) {
  if (big) {
    return (
      <div className={styles.avatarBig}>
        <img src={src ? src : `/user_blank.png`} alt="Avatar" width="120" height="120" />
      </div>
    )
  } else {
    return (
      <div className={styles.avatar}>
        <img src={src ? src : `/user_blank.png`} alt="Avatar" width="60" height="60" />
      </div>
    )
  }

}
