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
import { isPointInPolygon } from '../components/compose/isPointInPolygon'
moment.locale('en-GB');
export default function Index(props) {
  const [state, setState] = useState({ Email: "", Password: "" });
  const [resetPass, setResetPass] = useState(false);
  const [latitude_longitude, set_latitude_longitude] = useState(false)
  const [isDev, setIsDev] = useState(true)
  const router = useRouter()
  useEffect(() => {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        props.setUserData(user)
        router.push('/home')
      }
    });
  }, [props.UserData])
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
        fire.auth().setPersistence(fire.auth.Auth.Persistence.LOCAL)
          .then(() => {
            fire.auth().signInWithEmailAndPassword(state.Email, state.Password)
              .then((userCredential) => {
                props.setShowAlert(false);
                setTimeout(() => {
                  router.push('/home')
                }, 1500)
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

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      x.innerHTML = "Geolocation is not supported by this browser.";
    }
  }

  function showPosition(position) {
    set_latitude_longitude({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    })
  }

  useEffect(() => {
    if (!latitude_longitude) {
      getLocation()
    }
  }, [latitude_longitude])

  const checkLocation = () => {
    console.log('school')
    return isPointInPolygon(latitude_longitude.latitude, latitude_longitude.longitude, polygon_school) ? 'Yes' : 'No'
  }

  const checkLocation_dev = () => {
    console.log('dev')
    return isPointInPolygon(latitude_longitude.latitude, latitude_longitude.longitude, polygon_dev) ? 'Yes' : 'No'
  }

  const polygon_school = [
    [6.564073, 101.5362088],
    [6.564462, 101.5364828],
    [6.563956, 101.5373548],
    [6.563631, 101.5374778],
    [6.563394, 101.5373278],
    [6.5641932, 101.5366668],
  ]

  const polygon_dev = [
    [
      100.6724414,
      14.0125973
    ],
    [
      100.6720471,
      14.012488
    ],
    [
      100.6722429,
      14.0118609
    ],
    [
      100.6733104,
      14.0121757
    ],
    [
      100.6731441,
      14.0127665
    ],
    [
      100.6724414,
      14.0125973
    ]
  ]

  return (
    <>
      {
        latitude_longitude ?
          <>
            <UserBlank className={styles.spacer} />
            <InputType className={styles.spacer} value={state.Email} onChange={handleChange} type="email" name="Email" placeholder="Username (Email)" />
            {resetPass ?
              null
              :
              <InputType className={styles.spacer} value={state.Password} onChange={handleChange} type="password" name="Password" placeholder="Password" />
            }

            <div className={styles.redioWarper}>
              <RadioType name="loginType" checked={!resetPass} value="remember_me" onChange={e => setResetPass(false)}>Remember me</RadioType>
              <RadioType name="loginType" checked={resetPass} value='forgot_password' onChange={e => setResetPass(true)}>Forgot password</RadioType>
            </div>
            <small>lat:{latitude_longitude.latitude}</small><br />
            <small>lng:{latitude_longitude.longitude}</small><br />
            {
              isDev ?
                <>
                  <small>inPolygon Dev:{checkLocation_dev()}</small><br />
                </>
                :
                <>
                  <small>inPolygon School:{checkLocation()}</small><br />
                </>
            }

            <button onClick={() => setIsDev(true)}>Dev Location</button>
            <button onClick={() => setIsDev(false)}>School Location</button>
            <div onClick={() => router.push('/')} className={`${styles.loginBTN_new} fontText`}>Nornal</div>
          </>
          :
          <p className='text-center'>กำลังตรวจสอบตำแหน่ง</p>
      }
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