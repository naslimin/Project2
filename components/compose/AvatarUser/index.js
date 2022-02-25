import Image from 'next/image'
import styles from './index.module.css'

export default function AvatarUser({ big }) {
  if (big) {
    return (
      <div className={styles.avatarBig}>
        <Image src="/demoImage/39cd1f2a-6b6b-4199-98ab-a80f629e5e51.jpeg" alt="Avatar" width="120" height="120" />
      </div>
    )
  } else {
    return (
      <div className={styles.avatar}>
        <Image src="/demoImage/39cd1f2a-6b6b-4199-98ab-a80f629e5e51.jpeg" alt="Avatar" width="60" height="60" />
      </div>
    )
  }

}
