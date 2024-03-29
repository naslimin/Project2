import Head from 'next/head'
import ActivityBox from './compose/activityBox'
import UserLoginBox from './compose/userLoginBox'
import styles from './layout.module.css'
import AlertBox from './compose/alertBox';
import Sidebar from './sidebar'
import fire from '../config/firebase';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Layout({ children, title }) {
  const router = useRouter()
  useEffect(() => {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        children.props.setUserData(user)
      } else {
        router.push('/')
      }
    });
  },[children.props.UserData])
  if (children.props.UserData) {
    return (
      <>
        <Head>
          <title>{title}</title>
          {/* <meta name="viewport" content="width=device-width, initial-scale=1.0"/> */}
          <meta content="width=1280, initial-scale=1.0; " name="viewport"></meta>
        </Head>
        <main className={styles.main}>
          <Sidebar props={children.props} />
          {children}
          <div className={styles.secbar}>
            <UserLoginBox props={children.props} />
            <ActivityBox />
          </div>
          {
            children.props.showAlert ?
              <AlertBox clickOut={(e) => children.props.setShowAlert(!e)}>
                {children.props.AlertInner}
              </AlertBox>
              : null
          }
          {
            children.props.showAlertNoClick ?
              <AlertBox disableClick={true} clickOut={(e) => children.props.setShowAlertNoClick(!e)}>
                {children.props.AlertInner}
              </AlertBox>
              : null
          }
        </main>
      </>
    )
  } else {
    return (<>Not Login...</>)
  }
}
