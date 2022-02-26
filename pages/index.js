import Layout from '../components/layoutLogin'
import UserBlank from '../components/compose/userBlank'
import InputType from '../components/compose/inputType'
import styles from './index.module.css'
import RadioType from '../components/compose/radioType'
// import Link from 'next/link'
import fire from '../config/firebase'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import moment from 'moment'
moment.locale('en-GB');
export default function Index(props) {
  const [state, setState] = useState({ Email: "", Password: "" });
  const [resetPass, setResetPass] = useState(false);
  const router = useRouter()
  useEffect(() => {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        props.setUserData(user)
        router.push('/home')
      }
    });
  },[props.UserData])
  const loginCheck = async () => {
    if (resetPass) {
      sendResetPass()
    } else {
      await fire.auth().signOut()
      if (!state.Email || !state.Password) {
        props.setAlertInner(<>
          <p>กรุณากรอกข้อมูลให้ครบ</p>
        </>)
        props.setShowAlert(true);
      } else {
        props.setAlertInner(<><img width={60} height={60} src='/icon/loading-buffering.gif' /></>)
        props.setShowAlert(true);
        fire.auth().setPersistence(fire.auth.Auth.Persistence.SESSION)
          .then(() => {
            fire.auth().signInWithEmailAndPassword(state.Email, state.Password)
              .then((userCredential) => {
                var weekdays = moment().day()
                var user = userCredential.user;
                console.log(user.email,weekdays)
                fire.firestore().collection(`${user.email}/history/${moment().format('YYYY-MM')}`).doc(`${moment().format('DD')}`).set(
                  {
                    desc: 'Check In',
                    start: moment().toDate(),
                    end: null,
                    type: 'checkin'
                  }
                )
                  .then(() => {
                    props.setShowAlert(false);
                    setTimeout(() => {
                      router.push('/home')
                    }, 1500)
                  })
                  .catch((error) => {
                    console.log(error)
                    props.setAlertInner(<>
                      <p>{error.message}</p>
                    </>)
                    props.setShowAlert(true);
                  });

              })
              .catch((error) => {
                props.setAlertInner(<>
                  <p>อีเมล์หรือรหัสผ่านไม่ถูกต้อง</p>
                </>)
                props.setShowAlert(true);
              });
          })
          .catch((error) => {
            props.setAlertInner(<>
              <p>{error.message}</p>
            </>)
            props.setShowAlert(true);
          });
      }
    }
  }

  const sendResetPass = () => {
    props.setAlertInner(<><img width={60} height={60} src='/icon/loading-buffering.gif' /></>)
    props.setShowAlert(true);
    setResetPass(false)
    fire.auth().sendPasswordResetEmail(state.Email)
      .then(() => {
        props.setAlertInner(<>
          <p>ระบบได้ส่งอีเมลสำหรับตั้งรหัสผ่านใหม่ไปทางอีเมลเรียบร้อยแล้ว</p>
        </>)
        props.setShowAlert(true);
      })
      .catch((error) => {
        props.setAlertInner(<>
          <p>{error.message}</p>
        </>)
        props.setShowAlert(true);
      });
  }

  const handleChange = e => {
    const { name, value } = e.target;
    setState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <>
      <UserBlank className={styles.spacer} />
      <InputType className={styles.spacer} value={state.Email} onChange={handleChange} type="email" name="Email" placeholder="Username (Email)" />
      <InputType className={styles.spacer} value={state.Password} onChange={handleChange} type="password" name="Password" placeholder="Password" />
      <div className={styles.redioWarper}>
        <RadioType name="loginType" checked={true} value="remember_me" onChange={e => setResetPass(false)}>Remember me</RadioType>
        <RadioType name="loginType" value='forgot_password' onChange={e => setResetPass(true)}>Forgot password</RadioType>
      </div>
      {/* <Link href={'home'}> */}
      <div onClick={() => loginCheck()} className={`${styles.loginBTN} fontText`}>Login</div>
      {/* </Link> */}
    </>
  )
}

Index.getLayout = function getLayout(page) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}