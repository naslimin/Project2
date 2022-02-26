// import Image from 'next/image'
import styles from './index.module.css'
import Link from 'next/link'
import { useRouter } from "next/router";
import fire from '../../../config/firebase';
export default function MenuLink({ to, icon, children , props}) {

  const router = useRouter();
  const logoutFN = async () => {
    props.props.setAlertInner(<><img width={60} height={60} src='/icon/loading-buffering.gif' /></>)
    props.props.setShowAlert(true);
    await fire.auth().signOut()
    setTimeout(()=>{
      props.props.setShowAlert(false);
      router.push('/')
    },1500)
  }
  if (to == '/logout') {
    return (
      <div
        onClick={() => logoutFN()}
        className={router.pathname == `/${to}` ? `${styles.menuLink} ${styles.active}` : styles.menuLink}>
        <img src={icon} alt="icon menu" width="30" height="30" />
        <div className={styles.menuLabel}>{children}</div>
      </div>
    )
  } else {
    return (
      <Link href={to}>
        <div
          className={router.pathname == `/${to}` ? `${styles.menuLink} ${styles.active}` : styles.menuLink}>
          <img src={icon} alt="icon menu" width="30" height="30" />
          <div className={styles.menuLabel}>{children}</div>
        </div>
      </Link>
    )
  }
}
