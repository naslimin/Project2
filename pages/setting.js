import { useEffect, useRef, useState } from 'react';
import AvatarUser from '../components/compose/AvatarUser';
import InputType from '../components/compose/inputType';
import Layout from '../components/layout'
import fire from '../config/firebase';
import styles from './setting.module.css'
export default function Setting(props) {
  const [state, setState] = useState({ ...props.UserDataDetail });
  const [stateP, setStateP] = useState({});

  const [showModel, setShowModel] = useState(false)
  const [editModel, setEditModel] = useState('')
  const [saveAction, setSaveAction] = useState(false)
  const upload = useRef(null)
  const [fileRef, setFileRef] = useState(false);
  const [imagePreviewRef, setImagePreviewRef] = useState(false)
  const [saveOpenBTN, setSaveOpenBTN] = useState(false)
  const uploadSignature = useRef(null)
  const [fileRefSignature, setFileRefSignature] = useState(false);
  const [imagePreviewRefSignature, setImagePreviewRefSignature] = useState(false)

  useEffect(() => {
    setState({ ...props.UserDataDetail })
  }, [props.UserDataDetail])

  useEffect(() => {
    if (saveAction) {
      saveUserData()
    }
  }, [saveAction, state]);

  const ActionSave = async () => {
    setShowModel(false)
    setEditModel('')
    props.setAlertInner(<><img width={60} height={60} src='/icon/loading-buffering.gif' /></>)
    props.setShowAlert(true);
    if (editModel == 'UploadImageEdit') {
      await uploadBTN()
      await uploadBTNSignature()
      setSaveAction(true)
    } else if (editModel == 'PasswordEdit') {
      // await uploadBTN()
      // await uploadBTNSignature()
      // setSaveAction(true)
      var pass = true
      if (stateP.New_password != stateP.C_New_password) {
        props.setAlertInner(<><p>รหัสผ่านใหม่ ไม่ตรงกัน</p></>)
        props.setShowAlert(true);
        pass = false
      }

      if (pass) {
        fire.auth().signInWithEmailAndPassword(state.Email, stateP.Old_Password).then(() => {
          const user = fire.auth().currentUser;
          user.updatePassword(stateP.New_password).then(() => {
            props.setAlertInner(<><p>เรียนรหัสผ่านใหม่เรียบร้อยแล้ว</p></>)
            props.setShowAlert(true);
            fire.auth().signOut()
          }).catch((error) => {
            console.log(error)
          });
        }).catch(() => {
          props.setAlertInner(<><p>รหัสผ่านเก่าไม่ถูกต้อง</p></>)
          props.setShowAlert(true);
        })
      }

    } else {
      setSaveAction(true)
    }
  }

  const ActionCancel = () => {
    setShowModel(false)
    setEditModel('')
  }

  const saveUserData = () => {
    fire.firestore().collection(props.UserData.email).doc("userinfo").update({ ...state })
      .then(() => {
        props.setShowAlert(false);
        console.log("Document successfully written!");
        setSaveAction(false)
        props.getUserDetail()
      })
  }

  const uploadBTN = async () => {
    if (fileRef) {
      var storage = fire.storage().ref(`${props.UserData.email}/${fileRef.name}`);
      var snapshot = await storage.put(fileRef)
      var url = await snapshot.ref.getDownloadURL()
      setState(prevState => ({
        ...prevState,
        Image: url
      }));
      setImagePreviewRef(false)
      setFileRef(false)
    }
  }

  const uploadBTNSignature = async () => {
    if (fileRefSignature) {
      var storage = fire.storage().ref(`${props.UserData.email}/${fileRefSignature.name}`);
      var snapshot = await storage.put(fileRefSignature)
      var url = await snapshot.ref.getDownloadURL()
      setState(prevState => ({
        ...prevState,
        Signature: url
      }));
      setImagePreviewRefSignature(false)
      setFileRefSignature(false)
    }
  }

  const ActionEdit = (em) => {
    setSaveOpenBTN(false)
    setShowModel(true)
    setEditModel(em)
  }

  const ViewModel = ({ children }) => {
    return (
      <div className={styles.modelEdit}>
        <div className={styles.box}>
          <div className={`${styles.form}`}>
            <div className={`${styles.titleBox}`}>
              <p className={`${styles.titleText}`}>แก้ไขข้อมูล</p>
            </div>
            {children}
            <div className={`${styles.warperLineBTNAction}`}>
              <div className={`${styles.warperLineActionCancle}`} onClick={() => ActionCancel()}>ยกเลิก</div>
              {
                saveOpenBTN ?
                  <div className={`${styles.warperLineActionSave}`} onClick={() => ActionSave()}>บันทึก</div>
                  :
                  <div className={`${styles.warperLineActionSaveDisable}`}>บันทึก</div>
              }
            </div>
          </div>
        </div>
      </div>
    )
  }

  const handleChange = e => {
    const { name, value } = e.target;
    setState(prevState => ({
      ...prevState,
      [name]: value
    }));
    console.log(props.UserDataDetail[name] != value)
    if (props.UserDataDetail[name] != value) {
      setSaveOpenBTN(true)
    }
  };

  const handleChange_Password = e => {
    const { name, value } = e.target;
    setStateP(prevState => ({
      ...prevState,
      [name]: value
    }));

    setSaveOpenBTN(true)
  };


  const onChangeImage = (e) => {
    var file = e.target.files[0];
    setFileRef(file)
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function (e) {
      setImagePreviewRef(reader.result)
    };
    setSaveOpenBTN(true)
  }

  const onChangeImageSignature = (e) => {
    var file = e.target.files[0];
    setFileRefSignature(file)
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function (e) {
      setImagePreviewRefSignature(reader.result)
    };
    setSaveOpenBTN(true)
  }

  const InputEdit = ({ children, title }) => {
    return (
      <div className={`${styles.warperLine}`}>
        <div className={`${styles.warperLineTitle}`}>{title}</div>
        <div className={`${styles.warperLineValue}`}>
          {children}
        </div>
      </div>
    )
  }

  const UploadImageEdit = () => {
    return (
      <>
        <div className={`${styles.warperLine2}`}>
          <div className={`${styles.warperLineTitle2}`}>รูปโปรไฟล์</div>
          <div className={`${styles.warperLineValue2}`}>
            {imagePreviewRef ?
              <AvatarUser big={true} src={imagePreviewRef} /> :
              <AvatarUser big={true} src={props.UserDataDetail.Image} />
            }
            <input onChange={onChangeImage} className={styles.hidden} ref={upload} type='file' multiple={false} accept="image/*"></input>
            <div onClick={() => upload.current.click()} className={styles.uploadBtn}>
              อัพโหลดรูปภาพ
            </div>
          </div>
        </div>
        <div className={`${styles.warperLine2}`}>
          <div className={`${styles.warperLineTitle2}`}>รูปลายเซ็น</div>
          <div className={`${styles.warperLineValue2}`}>
            {imagePreviewRefSignature ?
              <AvatarUser big={true} src={imagePreviewRefSignature} /> :
              <AvatarUser big={true} src={state.Signature} />
            }
            <input onChange={onChangeImageSignature} className={styles.hidden} ref={uploadSignature} type='file' multiple={false} accept="image/*"></input>
            <div onClick={() => uploadSignature.current.click()} className={styles.uploadBtn}>
              อัพโหลดรูปภาพ
            </div>
          </div>
        </div>
      </>
    )
  }

  const PasswordEdit = () => {
    return (
      <>
        <InputEdit title={`รหัสผ่านเก่า`}>
          <InputType onBlur={handleChange_Password} className={styles.spacer} defaultValue={stateP.Old_Password} type="text" name="Old_Password" placeholder="รหัสผ่านเก่า" />
        </InputEdit>
        <InputEdit title={`รหัสผ่านใหม่`}>
          <InputType onBlur={handleChange_Password} className={styles.spacer} defaultValue={stateP.New_password} type="text" name="New_password" placeholder="รหัสผ่านใหม่" />
        </InputEdit>
        <InputEdit title={`ยืนยัน รหัสผ่านใหม่`}>
          <InputType onBlur={handleChange_Password} className={styles.spacer} defaultValue={stateP.C_New_password} type="text" name="C_New_password" placeholder="ยืนยัน รหัสผ่านใหม่" />
        </InputEdit>
      </>
    )
  }

  const GroupEdit = () => {
    return (
      <InputEdit title={`กลุ่มสาระฯ`}>
        <InputType onBlur={handleChange} className={styles.spacer} defaultValue={state.Group} type="text" name="Group" placeholder="กลุ่มสาระฯ" />
      </InputEdit>
    )
  }

  const GradeEdit = () => {
    return (
      <InputEdit title={`ระดับชั่นที่สอน`}>
        <InputType onBlur={handleChange} className={styles.spacer} defaultValue={state.Grade} type="text" name="Grade" placeholder="ระดับชั่นที่สอน" />
      </InputEdit>
    )
  }

  const SchoolEdit = () => {
    return (
      <InputEdit title={`โรงเรียน`}>
        <InputType onBlur={handleChange} className={styles.spacer} defaultValue={state.school} type="text" name="school" placeholder="โรงเรียน" />
      </InputEdit>
    )
  }

  const DepartmentEdit = () => {
    return (
      <InputEdit title={`สังกัด`}>
        <InputType onBlur={handleChange} className={styles.spacer} defaultValue={state.department} type="text" name="department" placeholder="สังกัด" />
      </InputEdit>
    )
  }

  const UserLevelEdit = () => {
    return (
      <InputEdit title={`วิทยฐานะ`}>
        <InputType onBlur={handleChange} className={styles.spacer} defaultValue={state.userLevel} type="text" name="userLevel" placeholder="วิทยฐานะ" />
      </InputEdit>
    )
  }

  const UserTypeEdit = () => {
    return (
      <InputEdit title={`ประเภท`}>
        <InputType onBlur={handleChange} className={styles.spacer} defaultValue={state.userType} type="text" name="userType" placeholder="ประเภท" />
      </InputEdit>
    )
  }
  const PositionEdit = () => {
    return (
      <InputEdit title={`ตำหน่ง`}>
        <InputType onBlur={handleChange} className={styles.spacer} defaultValue={state.position} type="text" name="position" placeholder="ตำหน่ง" />
      </InputEdit>
    )
  }

  const EmailEdit = () => {
    return (
      <InputEdit title={`ข้อมูลติดต่อ`}>
        <InputType onBlur={handleChange} className={styles.spacer} defaultValue={state.Email} type="email" name="Email" placeholder="อีเมลหลัก" />
      </InputEdit>
    )
  }

  const NameAndSubNameEdit = () => {
    return (
      <>
        <InputEdit title={`ชื่อ`}>
          <InputType onBlur={handleChange} className={styles.spacer} defaultValue={state.Name} type="text" name="Name" placeholder="ชื่อ" />
        </InputEdit>
        <InputEdit title={`สกุล`}>
          <InputType onBlur={handleChange} className={styles.spacer} defaultValue={state.Subname} type="text" name="Subname" placeholder="สกุล" />
        </InputEdit>
      </>
    )
  }

  const RenderEditModel = () => {
    switch (editModel) {
      case 'NameAndSubNameEdit':
        return <NameAndSubNameEdit />
      case 'EmailEdit':
        return <EmailEdit />
      case 'PositionEdit':
        return <PositionEdit />
      case 'UserTypeEdit':
        return <UserTypeEdit />
      case 'UserLevelEdit':
        return <UserLevelEdit />
      case 'DepartmentEdit':
        return <DepartmentEdit />
      case 'SchoolEdit':
        return <SchoolEdit />
      case 'GradeEdit':
        return <GradeEdit />
      case 'GroupEdit':
        return <GroupEdit />
      case 'PasswordEdit':
        return <PasswordEdit />
      case 'UploadImageEdit':
        return <UploadImageEdit />
      default:
        return null
    }
  }

  return (
    <section>
      <h2>Setting</h2>
      <div className={`${styles.form}`}>
        <div className={`${styles.titleBox}`}>
          <p className={`${styles.titleText}`}>การตั้งค่าบัญชีทั่วไป</p>
        </div>

        <div className={`${styles.warperLine}`}>
          <div className={`${styles.warperLineTitle}`}>ชื่อผู้ใช้งาน</div>
          <div className={`${styles.warperLineValue}`}>{props.UserDataDetail.Name} {props.UserDataDetail.Subname}</div>
          <div onClick={() => ActionEdit('NameAndSubNameEdit')} className={`${styles.warperLineAction}`}>แก้ไข</div>
        </div>

        <div className={`${styles.warperLine}`}>
          <div className={`${styles.warperLineTitle}`}>ข้อมูลติดต่อ</div>
          <div className={`${styles.warperLineValue}`}>อีเมลหลัก: {props.UserDataDetail.Email || '-'}</div>
          <div onClick={() => ActionEdit('EmailEdit')} className={`${styles.warperLineAction}`}>แก้ไข</div>
        </div>

        <div className={`${styles.warperLine}`}>
          <div className={`${styles.warperLineTitle}`}>ตำหน่ง</div>
          <div className={`${styles.warperLineValue}`}>{props.UserDataDetail.position || '-'}</div>
          <div onClick={() => ActionEdit('PositionEdit')} className={`${styles.warperLineAction}`}>แก้ไข</div>
        </div>

        <div className={`${styles.warperLine}`}>
          <div className={`${styles.warperLineTitle}`}>ประเภท</div>
          <div className={`${styles.warperLineValue}`}>{props.UserDataDetail.userType || '-'}</div>
          <div onClick={() => ActionEdit('UserTypeEdit')} className={`${styles.warperLineAction}`}>แก้ไข</div>
        </div>

        <div className={`${styles.warperLine}`}>
          <div className={`${styles.warperLineTitle}`}>วิทยฐานะ</div>
          <div className={`${styles.warperLineValue}`}>{props.UserDataDetail.userLevel || '-'}</div>
          <div onClick={() => ActionEdit('UserLevelEdit')} className={`${styles.warperLineAction}`}>แก้ไข</div>
        </div>

        <div className={`${styles.warperLine}`}>
          <div className={`${styles.warperLineTitle}`}>สังกัด</div>
          <div className={`${styles.warperLineValue}`}>{props.UserDataDetail.department || '-'}</div>
          <div onClick={() => ActionEdit('DepartmentEdit')} className={`${styles.warperLineAction}`}>แก้ไข</div>
        </div>

        <div className={`${styles.warperLine}`}>
          <div className={`${styles.warperLineTitle}`}>โรงเรียน</div>
          <div className={`${styles.warperLineValue}`}>{props.UserDataDetail.school || '-'}</div>
          <div onClick={() => ActionEdit('SchoolEdit')} className={`${styles.warperLineAction}`}>แก้ไข</div>
        </div>

        <div className={`${styles.warperLine}`}>
          <div className={`${styles.warperLineTitle}`}>ระดับชั่นที่สอน</div>
          <div className={`${styles.warperLineValue}`}>{props.UserDataDetail.Grade || '-'}</div>
          <div onClick={() => ActionEdit('GradeEdit')} className={`${styles.warperLineAction}`}>แก้ไข</div>
        </div>

        <div className={`${styles.warperLine}`}>
          <div className={`${styles.warperLineTitle}`}>กลุ่มสาระฯ</div>
          <div className={`${styles.warperLineValue}`}>{props.UserDataDetail.Group || '-'}</div>
          <div onClick={() => ActionEdit('GroupEdit')} className={`${styles.warperLineAction}`}>แก้ไข</div>
        </div>

        <div className={`${styles.titleBox}`}>
          <p className={`${styles.titleText}`}>การตั้งค่าความเป็นส่วนตัว</p>
        </div>
        <div className={`${styles.titleBox}`}>
          <p className={`${styles.titleText2}`}>ทางลัดความเป็นส่วนตัว</p>
        </div>
        <div className={`${styles.warperLine}`}>
          <div className={`${styles.warperLineTitle}`}></div>
          <div className={`${styles.warperLineValue}`}>จัดการโปรไฟล์ของคุณ</div>
          <div onClick={() => ActionEdit('UploadImageEdit')} className={`${styles.warperLineAction}`}>แก้ไข</div>
        </div>
        <div className={`${styles.warperLine}`}>
          <div className={`${styles.warperLineTitle}`}></div>
          <div className={`${styles.warperLineValue}`}>รหัสผ่าน</div>
          <div onClick={() => ActionEdit('PasswordEdit')} className={`${styles.warperLineAction}`}>แก้ไข</div>
        </div>
      </div>
      {
        showModel ?
          <ViewModel>
            <RenderEditModel />
          </ViewModel>
          : null
      }

    </section>
  )
}

Setting.getLayout = function getLayout(page) {
  return (
    <Layout title={'ข้อมูลส่วนตัว'}>
      {page}
    </Layout>
  )
}
