// import Image from 'next/image'
import AvatarUser from '../AvatarUser'
import styles from './index.module.css'

export default function UserLoginBox({ props}) {
  return (
    <div className={styles.warper}>
      <div className={styles.notic}>
        <img src="/icon/comment.png" alt="Comment" width="20" height="20" />
        <img src="/icon/alert.png" alt="Alert" width="20" height="20" />
      </div>
      <div className={styles.user}>
        <div className={styles.username}>{props.UserDataDetail.Name} {props.UserDataDetail.Subname}</div>
        <AvatarUser src={props.UserDataDetail.Image}/>
      </div>
    </div>
  )
}
