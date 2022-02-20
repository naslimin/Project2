import InputTypeForm from '../components/compose/inputTypeForm'
import Layout from '../components/layout'
import styles from './leaveform.module.css'
export default function LeaveForm() {
  return (
    <section>
      <h2>แบบฟร์อมการลางาน</h2>
      <div className={`${styles.form}`}>
        <div className={`${styles.mb15}`}>
          <div className={`${styles.lineWarper} ${styles.lineWarperRight}`}>
            <div className={`${styles.lineWarper}`}>
              <p className={`${styles.textFont}`}>(เขียนที่)</p>
              <div className={`${styles.inputWarper} ${styles.vw15}`}>
                <InputTypeForm type="text"></InputTypeForm>
              </div>
            </div>
          </div>
        </div>
        <div className={`${styles.mb15}`}>
          <div className={`${styles.lineWarper} ${styles.lineWarperRight}`}>
            <div className={`${styles.lineWarper}`}>
              <p className={`${styles.textFont}`}>วันที่</p>
              <div className={`${styles.inputWarper} ${styles.vw4}`}>
                <InputTypeForm type="text"></InputTypeForm>
              </div>
            </div>
            <div className={`${styles.lineWarper}`}>
              <p className={`${styles.textFont}`}>เดือน</p>
              <div className={`${styles.inputWarper} ${styles.vw6}`}>
                <InputTypeForm type="text"></InputTypeForm>
              </div>
            </div>
            <div className={`${styles.lineWarper}`}>
              <p className={`${styles.textFont}`}>พ.ศ.</p>
              <div className={`${styles.inputWarper} ${styles.vw4}`}>
                <InputTypeForm type="text"></InputTypeForm>
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
                <InputTypeForm type="text"></InputTypeForm>
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
          <div className={`${styles.lineWarper}`}>
            <div className={`${styles.lineWarper}`}>
              <p className={`${styles.textFont}`}>ตั้งแต่วันที่</p>
              <div className={`${styles.inputWarper} ${styles.vw19}`}>
                <InputTypeForm type="text"></InputTypeForm>
              </div>
            </div>
            <div className={`${styles.lineWarper}`}>
              <p className={`${styles.textFont}`}>ถึงวันที่</p>
              <div className={`${styles.inputWarper} ${styles.vw19}`}>
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
              <div className={`${styles.inputWarper} ${styles.vw19}`}>
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
          <div className={`${styles.lineWarper}`}>
            <div className={`${styles.lineWarper} ${styles.wp100}`}>
              <p className={`${styles.textFont} ${styles.wp30}`}>ในระหว่างลาจะติดต่อข้าพเจ้าได้ที่</p>
              <div className={`${styles.inputWarper} ${styles.wp100}`}>
                <InputTypeForm type="text"></InputTypeForm>
              </div>
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
