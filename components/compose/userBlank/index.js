// import Image from 'next/image'
import styles from './index.module.css'

export default function UserBlank({className}) {
  return (
    <div className={`${styles.userBlank} ${className}`}>
      <img src="/user_blank.png" alt="UserBlank" width="90" height="90" />
    </div>
  )
}
