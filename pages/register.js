import Layout from '../components/layoutLogin'
import InputType from '../components/compose/inputType'
import styles from './index.module.css'
import fire from '../config/firebase'
import { useRef, useState } from 'react'
import { useRouter } from 'next/router'

export default function Register(props) {
  const [nextRegister, setNextRegister] = useState(false)
  const [state, setState] = useState({ Name: "", Surname: "", Email: "", Password: "", CPassword: "", position: "" });
  const [fileRef, setFileRef] = useState(false);
  const upload = useRef(null)
  const [imagePreviewRef, setImagePreviewRef] = useState(false)
  const router = useRouter()

  const handleChange = e => {
    const { name, value } = e.target;
    setState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const registerSend = () => {
    props.setAlertInner(<><img width={60} height={60} src='/icon/loading-buffering.gif' /></>)
    props.setShowAlert(true);
    fire.auth().createUserWithEmailAndPassword(state.Email, state.Password)
      .then(async (userCredential) => {
        var user = userCredential.user;
        await fire.auth().signOut()
        uploadBTN(user)
      })
      .catch((error) => {
        props.setAlertInner(<>
          <p>มีผู้ใช้งานนี้อยู่ในระบบเรียบร้อยแล้ว</p>
        </>)
        props.setShowAlert(true);
      });
  }

  const uploadBTN = (user) => {
    var storage = fire.storage().ref(`${state.Email}/${fileRef.name}`);
    storage.put(fileRef).then((snapshot) => {
      snapshot.ref.getDownloadURL().then(url => {
        fire.firestore().collection(state.Email).doc("userinfo").set({ ...state, Signature: url, uid: user.uid })
          .then(() => {
            props.setShowAlert(false);
            setTimeout(()=>{
              router.push('/')
            },1500)
            console.log("Document successfully written!");
          })
      })
    });
  }

  const onChangeImage = (e) => {
    var file = e.target.files[0];
    setFileRef(file)
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function (e) {
      setImagePreviewRef(reader.result)
    };

  }

  const nextRegisterSetp = () => {
    if (!state.Name || !state.Surname || !state.Email || !state.Password || !state.CPassword) {
      props.setAlertInner(<>
        <p>กรุณากรอกข้อมูลให้ครบ</p>
      </>)
      props.setShowAlert(true);
    } else {
      if (state.Password == state.CPassword) {
        setNextRegister(true)
      } else {
        props.setAlertInner(<>
          <p>รหัสผ่านไม่ตรงกัน</p>
        </>)
        props.setShowAlert(true);
      }
    }
  }

  const nextRegisterSetp2 = () => {
    if (!state.position || !fileRef) {
      props.setAlertInner(<>
        <p>กรุณากรอกข้อมูลให้ครบ</p>
      </>)
      props.setShowAlert(true);
    } else {
      registerSend()
    }
  }

  return (
    <>
      {
        nextRegister ?
          <>
            < h2 className={styles.textTitle} > Register</h2 >
            <InputType className={styles.spacer} value={state.position} onChange={handleChange} type="text" name="position" placeholder="ตำแหน่ง" />
            <div className={`${styles.imagePreview} ${styles.spacer}`}>
              {imagePreviewRef ?
                <img className={styles.imagePreviewRef} src={imagePreviewRef}></img> :
                <>- รูปภาพลายเช็น -</>
              }
            </div>
            <div className={styles.boxBtnUpload}>
              <input onChange={onChangeImage} className={styles.hidden} ref={upload} type='file' multiple={false} accept="image/*"></input>
              <div onClick={() => upload.current.click()} className={styles.uploadBtn}>
                อัพโหลดรูปภาพ
              </div>
              {/* <div className={styles.uploadBtn}>ถ่ายภาพ</div> */}
            </div>
            <div onClick={() => nextRegisterSetp2()} className={`${styles.loginBTN} fontText`}>Register</div>
          </>
          :
          <>
            <h2 className={styles.textTitle}>Register</h2>
            <InputType className={styles.spacer} value={state.Name} onChange={handleChange} type="text" name="Name" placeholder="Name" />
            <InputType className={styles.spacer} value={state.Surname} onChange={handleChange} type="text" name="Surname" placeholder="Surname" />
            <InputType className={styles.spacer} value={state.Email} onChange={handleChange} type="email" name="Email" placeholder="Email" />
            <InputType className={styles.spacer} value={state.Password} onChange={handleChange} type="password" name="Password" placeholder="Password" />
            <InputType className={styles.spacer} value={state.CPassword} onChange={handleChange} type="password" name="CPassword" placeholder="Confirm password" />
            <div onClick={() => nextRegisterSetp()} className={`${styles.loginBTN} fontText`}>Next</div>
          </>
      }
    </>

  )
}

Register.getLayout = function getLayout(page) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}