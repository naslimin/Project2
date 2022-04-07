// import Image from 'next/image'
import { useEffect, useState } from 'react'
import InputTypeForm from '../components/compose/inputTypeForm'
import Layout from '../components/layout'
import fire from '../config/firebase'
import styles from './leaveform.module.css'
import moment from 'moment';
import { useRouter } from 'next/router'
export default function LeaveForm(props) {
  const [state, setState] = useState({
    w_at: props.UserDataDetail.school,
    i_am: `${props.UserDataDetail.Name} ${props.UserDataDetail.Subname}`,
    contact_at: props.UserDataDetail.Email,
    date: new Date().getDate(),
    mouth: new Date().getMonth() + 1,
    year: new Date().getFullYear() + 543,
    position: props.UserDataDetail.position,
    department: props.UserDataDetail.department,
    UserDataDetail: props.UserDataDetail,
  });
  const router = useRouter()
  useEffect(() => {
    setState({
      w_at: props.UserDataDetail.school,
      i_am: `${props.UserDataDetail.Name} ${props.UserDataDetail.Subname}`,
      contact_at: props.UserDataDetail.Email,
      date: new Date().getDate(),
      mouth: new Date().getMonth() + 1,
      year: new Date().getFullYear() + 543,
      position: props.UserDataDetail.position,
      department: props.UserDataDetail.department,
      UserDataDetail: props.UserDataDetail,
    })
  }, [props.UserDataDetail])

  useEffect(() => {
    var start = moment(state.start_date)
    if (state.end_date) {
      var end = moment(state.end_date)
      var totalDays = moment.duration(end.diff(start)).asDays()

      setState(prevState => ({
        ...prevState,
        total_days: totalDays >= 0 ? totalDays + 1 : 0
      }));
    }
  }, [state.start_date, state.end_date])

  useEffect(() => {
    var start = moment(state.last_leave_start_date)
    if (state.last_leave_end_date) {
      var end = moment(state.last_leave_end_date)
      var totalDays = moment.duration(end.diff(start)).asDays()

      setState(prevState => ({
        ...prevState,
        last_leave_total_days: totalDays >= 0 ? totalDays + 1 : 0
      }));
    }
  }, [state.last_leave_start_date, state.last_leave_end_date])


  const handleChange = e => {
    const { name, value } = e.target;
    setState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleChangeDate = e => {
    const { name, value } = e.target;
    if (value.length > 9) {
      if (moment(value).isValid()) {
        setState(prevState => ({
          ...prevState,
          [name]: value
        }));
      } else {
        props.setAlertInner(<>
          <p>รูปแบบวันที่ไม่ถูกต้อง<br />
            เช่น 20/04/2022</p>
        </>)
        props.setShowAlert(true)
      }
    }
  };

  const sendForm = async () => {

    props.setAlertInner(<><img width={60} height={60} src='/icon/loading-buffering.gif' /></>)
    props.setShowAlert(true)

    var start = moment(state.start_date)
    var end = moment(state.end_date)
    var totalDays = moment.duration(end.diff(start)).asDays()

    for (let index = 0; index <= totalDays; index++) {
      var date = moment(state.start_date).add(index, 'd')
      fire.firestore().collection(`${props.UserData.email}/history/${moment(date).format('YYYY-MM')}`)
        .doc(`${moment(date).format('DD')}`).set({
          desc: 'Leave Work',
          start: moment(date).toDate(),
          end: moment(date).toDate(),
          type: 'leavework'
        })
        .then(() => {
          console.log("Document successfully written!");
        })
    }
    await fire.firestore().collection(`${props.UserData.email}/leavehistory/${moment(state.start_date).format('YYYY')}`)
      .doc(`${moment(state.start_date).format('MM')}`).get().then(async (doc) => {
        if (doc.exists) {
          await fire.firestore().collection(`${props.UserData.email}/leavehistory/${moment(state.start_date).format('YYYY')}`)
            .doc(`${moment(state.start_date).format('MM')}`)
            .update({
              [state.leavework]: fire.firestore.FieldValue.increment(state.total_days)
            })
            .then(() => {
              console.log("Document successfully written!");
            })
        } else {
          await fire.firestore().collection(`${props.UserData.email}/leavehistory/${moment(state.start_date).format('YYYY')}`)
            .doc(`${moment(state.start_date).format('MM')}`)
            .set({
              [state.leavework]: fire.firestore.FieldValue.increment(state.total_days)
            })
            .then(() => {
              console.log("Document successfully written!");
            })
        }
      }).catch((error) => {
        console.log("Error getting document:", error);
      });
    var docRef = await fire.firestore().collection(`${props.UserData.email}/leave/data`).add({
      ...state
    })

    // await fire.firestore().collection(`${props.UserData.email}/dashboard/${moment(state.start_date).format('YYYY')}`)
    //   .doc(`${state.leavework}`).get().then(async (doc) => {
    var month = moment(state.start_date).format('MM')
    //     if (doc.exists) {
    await fire.firestore().collection(`${props.UserData.email}/dashboard/${moment(state.start_date).format('YYYY')}`)
      .add({
        type: state.leavework,
        month: month,
        total_days: state.total_days,
        refid: docRef.id
      })
      .then(() => {
        console.log("Document successfully update written!");
      })
    //   } else {
    //     await fire.firestore().collection(`${props.UserData.email}/dashboard/${moment(state.start_date).format('YYYY')}`)
    //       .doc(`${state.leavework}`)
    //       .set({
    //         [month]: {
    //           hit: fire.firestore.FieldValue.increment(1),
    //           total_days: fire.firestore.FieldValue.increment(state.total_days)
    //         }
    //       })
    //       .then(() => {
    //         console.log("Document successfully set written!");
    //       })
    //   }
    // }).catch((error) => {
    //   console.log("Error getting document:", error);
    // });



    router.push(`/pdf?id=${docRef.id}`)
    props.setShowAlert(false);

  }
  return (
    <section>
      <h2>แบบฟร์อมการลางาน</h2>
      <div className={`${styles.form}`}>
        <div className={`${styles.mb15}`}>
          <div className={`${styles.lineWarper} ${styles.lineWarperRight}`}>
            <div className={`${styles.lineWarper}`}>
              <p className={`${styles.textFont}`}>(เขียนที่)</p>
              <div className={`${styles.inputWarper} ${styles.vw15}`}>
                <InputTypeForm value={state.w_at} onChange={handleChange} name="w_at" type="text"></InputTypeForm>
              </div>
            </div>
          </div>
        </div>
        <div className={`${styles.mb15}`}>
          <div className={`${styles.lineWarper} ${styles.lineWarperRight}`}>
            <div className={`${styles.lineWarper}`}>
              <p className={`${styles.textFont}`}>วันที่</p>
              <div className={`${styles.inputWarper} ${styles.vw4}`}>
                <InputTypeForm value={state.date} onChange={handleChange} name="date" type="text"></InputTypeForm>
              </div>
            </div>
            <div className={`${styles.lineWarper}`}>
              <p className={`${styles.textFont}`}>เดือน</p>
              <div className={`${styles.inputWarper} ${styles.vw6}`}>
                <InputTypeForm value={state.mouth} onChange={handleChange} name="mouth" type="text"></InputTypeForm>
              </div>
            </div>
            <div className={`${styles.lineWarper}`}>
              <p className={`${styles.textFont}`}>พ.ศ.</p>
              <div className={`${styles.inputWarper} ${styles.vw4}`}>
                <InputTypeForm value={state.year} onChange={handleChange} name="year" type="text"></InputTypeForm>
              </div>
            </div>
          </div>
        </div>
        <div className={`${styles.mb15}`}>
          <div className={`${styles.lineWarper}`}>
            <div className={`${styles.lineWarper}`}>
              <p className={`${styles.textFont}`}>เรื่อง</p>
              <div className={`${styles.inputWarper} ${styles.vw15}`}>
                <InputTypeForm value={state.subject} onChange={handleChange} name="subject" type="text"></InputTypeForm>
              </div>
            </div>
          </div>
        </div>
        <div className={`${styles.mb15}`}>
          <div className={`${styles.lineWarper}`}>
            <div className={`${styles.lineWarper}`}>
              <p className={`${styles.textFont}`}>เรียน</p>
              <div className={`${styles.inputWarper} ${styles.vw15}`}>
                <InputTypeForm value={state.notice} onChange={handleChange} name="notice" type="text"></InputTypeForm>
              </div>
            </div>
          </div>
        </div>
        <div className={`${styles.mb15}`}>
          <div className={`${styles.lineWarper} ${styles.lineWarperRight}`}>
            <div className={`${styles.lineWarper}`}>
              <p className={`${styles.textFont}`}>ข้าพเจ้า</p>
              <div className={`${styles.inputWarper} ${styles.vw25}`}>
                <InputTypeForm value={state.i_am} onChange={handleChange} name="i_am" type="text"></InputTypeForm>
              </div>
            </div>
            <div className={`${styles.lineWarper}`}>
              <p className={`${styles.textFont}`}>ตำแหน่ง</p>
              <div className={`${styles.inputWarper} ${styles.vw20}`}>
                <InputTypeForm value={state.position} onChange={handleChange} name="position" type="text"></InputTypeForm>
              </div>
            </div>
          </div>
        </div>
        <div className={`${styles.mb15}`}>
          <div className={`${styles.lineWarper}`}>
            <div className={`${styles.lineWarper}`}>
              <p className={`${styles.textFont}`}>สังกัด</p>
              <div className={`${styles.inputWarper} ${styles.vw15}`}>
                <InputTypeForm value={state.department} onChange={handleChange} name="department" type="text"></InputTypeForm>
              </div>
            </div>
          </div>
        </div>
        <div className={`${styles.mb15}`}>
          <div className={`${styles.lineWarper}`}>
            <div className={`${styles.lineWarper}`}>
              <p className={`${styles.textFont}`}>ขอลา</p>
              <div className={`${styles.radioWarper} ${styles.vw10}`}>
                <div className={`${styles.lineWarper} ${styles.textFont}`}>
                  <InputTypeForm onChange={handleChange} className={`${styles.radioBox}`} name="leavework" type="radio" value={`ลาป่วย`}></InputTypeForm> <span>ลาป่วย</span>
                </div>
                <div className={`${styles.lineWarper} ${styles.textFont}`}>
                  <InputTypeForm onChange={handleChange} className={`${styles.radioBox}`} name="leavework" type="radio" value={`ลากิจส่วนตัว`}></InputTypeForm> <span>ลากิจส่วนตัว</span>
                </div>
                <div className={`${styles.lineWarper} ${styles.textFont}`}>
                  <InputTypeForm onChange={handleChange} className={`${styles.radioBox}`} name="leavework" type="radio" value={`ลาคลอดบุตร`}></InputTypeForm> <span>ลาคลอดบุตร</span>
                </div>
              </div>
            </div>
            <div className={`${styles.lineWarper} ${styles.wp100}`}>
              <p className={`${styles.textFont}`}>เนื่องจาก</p>
              <div className={`${styles.inputWarper} ${styles.wp100}`}>
                <InputTypeForm value={state.due_to} onChange={handleChange} name="due_to" type="text"></InputTypeForm>
              </div>
            </div>
          </div>
        </div>
        <div className={`${styles.mb15}`}>
          <div className={`${styles.lineWarper} ${styles.lineWarperBetween}`}>
            <div className={`${styles.lineWarper}`}>
              <p className={`${styles.textFont}`}>ตั้งแต่วันที่</p>
              <div className={`${styles.inputWarper} ${styles.vw18}`}>
                <InputTypeForm value={state.start_date} onChange={handleChangeDate} name="start_date" type="date"></InputTypeForm>
              </div>
            </div>
            <div className={`${styles.lineWarper}`}>
              <p className={`${styles.textFont}`}>ถึงวันที่</p>
              <div className={`${styles.inputWarper} ${styles.vw18}`}>
                <InputTypeForm value={state.end_date} onChange={handleChangeDate} name="end_date" type="date"></InputTypeForm>
              </div>
            </div>
            <div className={`${styles.lineWarper}`}>
              <p className={`${styles.textFont}`}>มีกำหนด</p>
              <div className={`${styles.inputWarper} ${styles.vw4}`}>
                <InputTypeForm readOnly={true} value={state.total_days} onChange={handleChange} name="total_days" type="number"></InputTypeForm>
              </div>
              <p className={`${styles.textFont}`}>วัน</p>
            </div>
          </div>
        </div>
        <div className={`${styles.mb15}`}>
          <div className={`${styles.lineWarper} ${styles.lineWarperBetween}`}>
            <div className={`${styles.lineWarper}`}>
              <div className={`${styles.lineWarper}`}>
                <p className={`${styles.textFont}`}>ข้าพเจ้าได้</p>
              </div>
              <div className={`${styles.inputWarper} ${styles.lineWarper}`}>
                <div className={`${styles.lineWarper} ${styles.textFont}`}>
                  <InputTypeForm onChange={handleChange} className={`${styles.radioBoxInline}`} name="last_leavework" type="radio" value={`ลาป่วย`}></InputTypeForm> <span>ลาป่วย</span>
                </div>
                <div className={`${styles.lineWarper} ${styles.textFont}`}>
                  <InputTypeForm onChange={handleChange} className={`${styles.radioBoxInline}`} name="last_leavework" type="radio" value={`ลากิจส่วนตัว`}></InputTypeForm> <span>ลากิจส่วนตัว</span>
                </div>
                <div className={`${styles.lineWarper} ${styles.textFont}`}>
                  <InputTypeForm onChange={handleChange} className={`${styles.radioBoxInline}`} name="last_leavework" type="radio" value={`ลาคลอดบุตร`}></InputTypeForm> <span>ลาคลอดบุตร</span>
                </div>
              </div>
            </div>
            <div className={`${styles.lineWarper}`}>
              <p className={`${styles.textFont}`}>ครั้งสุดท้ายตั้งแต่วันที่</p>
              <div className={`${styles.inputWarper} ${styles.vw20}`}>
                <InputTypeForm value={state.last_leave_start_date} onChange={handleChangeDate} name="last_leave_start_date" type="date"></InputTypeForm>
              </div>
            </div>
          </div>
        </div>
        <div className={`${styles.mb15}`}>
          <div className={`${styles.lineWarper}`}>
            <div className={`${styles.lineWarper}`}>
              <p className={`${styles.textFont}`}>ถึงวันที่</p>
              <div className={`${styles.inputWarper} ${styles.vw18}`}>
                <InputTypeForm value={state.last_leave_end_date} onChange={handleChangeDate} name="last_leave_end_date" type="date"></InputTypeForm>
              </div>
            </div>
            <div className={`${styles.lineWarper}`}>
              <p className={`${styles.textFont}`}>มีกำหนด</p>
              <div className={`${styles.inputWarper} ${styles.vw15}`}>
                <InputTypeForm readOnly={true} value={state.last_leave_total_days} onChange={handleChange} name="last_leave_total_days" type="number"></InputTypeForm>
              </div>
              <p className={`${styles.textFont}`}>วัน</p>
            </div>
          </div>
        </div>
        <div className={`${styles.mb30}`}>
          <div className={`${styles.lineWarper}`}>
            <div className={`${styles.lineWarper} ${styles.wp100}`}>
              <p className={`${styles.textFont} ${styles.wp30}`}>ในระหว่างลาจะติดต่อข้าพเจ้าได้ที่</p>
              <div className={`${styles.inputWarper} ${styles.wp100}`}>
                <InputTypeForm value={state.contact_at} onChange={handleChange} name="contact_at" type="text"></InputTypeForm>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className={`${styles.lineWarper} ${styles.alignBaseline} ${styles.lineWarperBetween}`}>
            <div className={`${styles.lineWarper}`}>
              {/* <div className={`${styles.clipfile}`}>
                <img src={`/menuIcon/clip.png`} alt="icon menu" width="6" height="18" />
              </div>
              <p className={`${styles.textFont}`}>เอกสารแนบ</p> */}
            </div>
            <div className={`${styles.lineWarper} ${styles.flexColumn} ${styles.lineWarperBetween}`}>
              <p className={`${styles.textFont}`}>ขอแสดงความนับถือ</p>
              <div className={`${styles.signature} ${styles.mb15} ${styles.mt15}`}>
                <img className={styles.imgSignature} src={props.UserDataDetail.Signature} />
              </div>
              <div className={`${styles.lineWarper}`}>
                <p className={`${styles.textFont}`}>ลงชื่อ</p>
                <div className={`${styles.inputWarper} ${styles.vw18}`}>
                  <InputTypeForm value={state.i_am_signature} onChange={handleChange} name="i_am_signature" type="text"></InputTypeForm>
                </div>
              </div>
            </div>
            <div onClick={() => sendForm()} className={`${styles.lineWarper} ${styles.sendBTNWarper}`}>
              <div className={`${styles.sendBTN}`}>Send</div>
            </div>
          </div>
        </div>
      </div>

    </section>
  )
}

LeaveForm.getLayout = function getLayout(page) {
  return (
    <Layout title={'แบบฟร์อมการลางาน'}>
      {page}
    </Layout>
  )
}
