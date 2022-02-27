// import Image from 'next/image'
import { useState } from 'react'
import AlertBox from '../components/compose/alertBox'
import InputTypeForm from '../components/compose/inputTypeForm'
import Layout from '../components/layout'
import styles from './leaveform.module.css'
export default function LeaveForm(props) {
  const [ showAlert, setShowAlert ] = useState(false);
  const [state, setState] = useState({
    w_at:"โรงเรียนบ้านวังกะพ้อ เพียรอนุสรณ์",
    date:new Date().getDate(),
    mouth:new Date().getMonth()+1,
    year:new Date().getFullYear()+543,
    ...props.UserDataDetail
  });
  const handleChange = e => {
    const { name, value } = e.target;
    setState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
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
                <InputTypeForm type="text"></InputTypeForm>
              </div>
            </div>
          </div>
        </div>
        <div className={`${styles.mb15}`}>
          <div className={`${styles.lineWarper}`}>
            <div className={`${styles.lineWarper}`}>
              <p className={`${styles.textFont}`}>เรียน</p>
              <div className={`${styles.inputWarper} ${styles.vw15}`}>
                <InputTypeForm type="text"></InputTypeForm>
              </div>
            </div>
          </div>
        </div>
        <div className={`${styles.mb15}`}>
          <div className={`${styles.lineWarper} ${styles.lineWarperRight}`}>
            <div className={`${styles.lineWarper}`}>
              <p className={`${styles.textFont}`}>ข้าพเจ้า</p>
              <div className={`${styles.inputWarper} ${styles.vw25}`}>
                <InputTypeForm type="text"></InputTypeForm>
              </div>
            </div>
            <div className={`${styles.lineWarper}`}>
              <p className={`${styles.textFont}`}>ตำแหน่ง</p>
              <div className={`${styles.inputWarper} ${styles.vw20}`}>
                <InputTypeForm type="text" value={props.UserDataDetail.position}></InputTypeForm>
              </div>
            </div>
          </div>
        </div>
        <div className={`${styles.mb15}`}>
          <div className={`${styles.lineWarper}`}>
            <div className={`${styles.lineWarper}`}>
              <p className={`${styles.textFont}`}>สังกัด</p>
              <div className={`${styles.inputWarper} ${styles.vw15}`}>
                <InputTypeForm type="text"></InputTypeForm>
              </div>
            </div>
          </div>
        </div>
        <div className={`${styles.mb15}`}>
          <div className={`${styles.lineWarper}`}>
            <div className={`${styles.lineWarper}`}>
              <p className={`${styles.textFont}`}>ขอลา</p>
              <div className={`${styles.radioWarper} ${styles.vw10}`}>
                <div className={`${styles.lineWarper} ${styles.textFont}`}><InputTypeForm className={`${styles.radioBox}`} name="leavework" type="radio"></InputTypeForm> <span>ลาป่วย</span></div>
                <div className={`${styles.lineWarper} ${styles.textFont}`}><InputTypeForm className={`${styles.radioBox}`} name="leavework" type="radio"></InputTypeForm> <span>ลากิจส่วนตัว</span></div>
                <div className={`${styles.lineWarper} ${styles.textFont}`}><InputTypeForm className={`${styles.radioBox}`} name="leavework" type="radio"></InputTypeForm> <span>ลาคลอดบุตร</span></div>
              </div>
            </div>
            <div className={`${styles.lineWarper} ${styles.wp100}`}>
              <p className={`${styles.textFont}`}>เนื่องจาก</p>
              <div className={`${styles.inputWarper} ${styles.wp100}`}>
                <InputTypeForm type="text"></InputTypeForm>
              </div>
            </div>
          </div>
        </div>
        <div className={`${styles.mb15}`}>
          <div className={`${styles.lineWarper} ${styles.lineWarperBetween}`}>
            <div className={`${styles.lineWarper}`}>
              <p className={`${styles.textFont}`}>ตั้งแต่วันที่</p>
              <div className={`${styles.inputWarper} ${styles.vw18}`}>
                <InputTypeForm type="text"></InputTypeForm>
              </div>
            </div>
            <div className={`${styles.lineWarper}`}>
              <p className={`${styles.textFont}`}>ถึงวันที่</p>
              <div className={`${styles.inputWarper} ${styles.vw18}`}>
                <InputTypeForm type="text"></InputTypeForm>
              </div>
            </div>
            <div className={`${styles.lineWarper}`}>
              <p className={`${styles.textFont}`}>มีกำหนด</p>
              <div className={`${styles.inputWarper} ${styles.vw15}`}>
                <InputTypeForm type="text"></InputTypeForm>
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
                <div className={`${styles.lineWarper} ${styles.textFont}`}><InputTypeForm className={`${styles.radioBoxInline}`} name="leavework" type="radio"></InputTypeForm> <span>ลาป่วย</span></div>
                <div className={`${styles.lineWarper} ${styles.textFont}`}><InputTypeForm className={`${styles.radioBoxInline}`} name="leavework" type="radio"></InputTypeForm> <span>ลากิจส่วนตัว</span></div>
                <div className={`${styles.lineWarper} ${styles.textFont}`}><InputTypeForm className={`${styles.radioBoxInline}`} name="leavework" type="radio"></InputTypeForm> <span>ลาคลอดบุตร</span></div>
              </div>
            </div>
            <div className={`${styles.lineWarper}`}>
              <p className={`${styles.textFont}`}>ครั้งสุดท้ายตั้งแต่วันที่</p>
              <div className={`${styles.inputWarper} ${styles.vw20}`}>
                <InputTypeForm type="text"></InputTypeForm>
              </div>
            </div>
          </div>
        </div>
        <div className={`${styles.mb15}`}>
          <div className={`${styles.lineWarper}`}>
            <div className={`${styles.lineWarper}`}>
              <p className={`${styles.textFont}`}>ถึงวันที่</p>
              <div className={`${styles.inputWarper} ${styles.vw18}`}>
                <InputTypeForm type="text"></InputTypeForm>
              </div>
            </div>
            <div className={`${styles.lineWarper}`}>
              <p className={`${styles.textFont}`}>มีกำหนด</p>
              <div className={`${styles.inputWarper} ${styles.vw15}`}>
                <InputTypeForm type="text"></InputTypeForm>
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
                <InputTypeForm type="text"></InputTypeForm>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className={`${styles.lineWarper} ${styles.alignBaseline} ${styles.lineWarperBetween}`}>
            <div className={`${styles.lineWarper}`}>
              <div className={`${styles.clipfile}`}>
                <img src={`/menuicon/clip.png`} alt="icon menu" width="6" height="18" />
              </div>
              <p className={`${styles.textFont}`}>เอกสารแนบ</p>
            </div>
            <div className={`${styles.lineWarper} ${styles.flexColumn} ${styles.lineWarperBetween}`}>
              <p className={`${styles.textFont}`}>ขอแสดงความนับถือ</p>
              <div className={`${styles.signature} ${styles.mb15} ${styles.mt15}`}>
                <img className={styles.imgSignature} src={props.UserDataDetail.Signature}/>
              </div>
              <div className={`${styles.lineWarper}`}>
                <p className={`${styles.textFont}`}>ลงชื่อ</p>
                <div className={`${styles.inputWarper} ${styles.vw18}`}>
                  <InputTypeForm type="text"></InputTypeForm>
                </div>
              </div>
            </div>
            <div onClick={()=>setShowAlert(true)} className={`${styles.lineWarper} ${styles.sendBTNWarper}`}>
              <div className={`${styles.sendBTN}`}>Send</div>
            </div>
          </div>
        </div>
      </div>
      {showAlert ?
        <AlertBox clickOut={(e)=>setShowAlert(!e)}>
          <p>การเข้าใช้งานไม่ถูกต้อง ไม่สามารถบันทึกเวลาของท่านลงในระบบได้
            โปรดตรวจสอบอินเตอร์เน็ตอีกครั้งว่าเป็นของโรงเรียนแล้ว</p>
        </AlertBox>
        : null}

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
