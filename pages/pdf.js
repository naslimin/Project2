// import Image from 'next/image'
import styles from './pdf.module.css'
import Layout from '../components/layoutPDF'
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
import { useEffect, useState } from 'react';
import fire from '../config/firebase';

import { useRouter } from 'next/router'
import InputTypeForm from '../components/compose/inputTypeFormText';
export default function PDF(props) {
  const queryParams = new URLSearchParams(window.location.search);
  const router = useRouter()
  const [state, setState] = useState(false)

  const _exportPdf = () => {
    window.scrollTo(0, document.body.scrollHeight);
    html2canvas(document.querySelector("#capture"), {
      allowTaint: true,
      useCORS: true,
      scale: 1
    }).then(canvas => {
      canvas.id = "canvas_pdf"
      document.body.appendChild(canvas);
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: "p",
        unit: "cm",
        format: [29.7, 21],
        compress: true
      });
      pdf.addImage(imgData, 'PNG', 0, 0);
      pdf.save("download.pdf");
      document.getElementById('canvas_pdf').remove()
    });
  }
  fire.firestore().collection(`${props.UserData.email}/leave/data`).doc(`${queryParams.get('id')}`).get()
    .then(async (doc) => {
      if (doc.exists) {
        setState(doc.data())
      }
    })

  return (
    <>
      {
        state ?
          <>
            <div className={styles.btnGroup}>
              <div onClick={() => router.push(`/dashboard`)} className={`${styles.lineWarper} ${styles.sendBTNWarper}`}>
                <div className={`${styles.sendBTN2}`}>Dashboard</div>
              </div>
              <div onClick={() => _exportPdf()} className={`${styles.lineWarper} ${styles.sendBTNWarper}`}>
                <div className={`${styles.sendBTN}`}>Print PDF</div>
              </div>
            </div>
            <div id="capture" className={styles.page}>
              <div className={`${styles.form}`}>
                <div className={`${styles.mb15}`}>
                  <div className={`${styles.lineWarper} ${styles.lineWarperRight}`}>
                    <div className={`${styles.lineWarper}`}>
                      <p className={`${styles.textFont}`}>(เขียนที่)</p>
                      <div className={`${styles.inputWarper} ${styles.vw15}`}>
                        <InputTypeForm value={state.w_at} name="w_at" type="text"></InputTypeForm>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={`${styles.mb15}`}>
                  <div className={`${styles.lineWarper} ${styles.lineWarperRight}`}>
                    <div className={`${styles.lineWarper}`}>
                      <p className={`${styles.textFont}`}>วันที่</p>
                      <div className={`${styles.inputWarper} ${styles.vw4}`}>
                        <InputTypeForm value={state.date} name="date" type="text"></InputTypeForm>
                      </div>
                    </div>
                    <div className={`${styles.lineWarper}`}>
                      <p className={`${styles.textFont}`}>เดือน</p>
                      <div className={`${styles.inputWarper} ${styles.vw6}`}>
                        <InputTypeForm value={state.mouth} name="mouth" type="text"></InputTypeForm>
                      </div>
                    </div>
                    <div className={`${styles.lineWarper}`}>
                      <p className={`${styles.textFont}`}>พ.ศ.</p>
                      <div className={`${styles.inputWarper} ${styles.vw4}`}>
                        <InputTypeForm value={state.year} name="year" type="text"></InputTypeForm>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={`${styles.mb15}`}>
                  <div className={`${styles.lineWarper}`}>
                    <div className={`${styles.lineWarper}`}>
                      <p className={`${styles.textFont}`}>เรื่อง</p>
                      <div className={`${styles.inputWarper} ${styles.vw15}`}>
                        <InputTypeForm value={state.subject} name="subject" type="text"></InputTypeForm>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={`${styles.mb15}`}>
                  <div className={`${styles.lineWarper}`}>
                    <div className={`${styles.lineWarper}`}>
                      <p className={`${styles.textFont}`}>เรียน</p>
                      <div className={`${styles.inputWarper} ${styles.vw15}`}>
                        <InputTypeForm value={state.notice} name="notice" type="text"></InputTypeForm>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={`${styles.mb15}`}>
                  <div className={`${styles.lineWarper} ${styles.lineWarperRight}`}>
                    <div className={`${styles.lineWarper}`}>
                      <p className={`${styles.textFont}`}>ข้าพเจ้า</p>
                      <div className={`${styles.inputWarper} ${styles.vw25}`}>
                        <InputTypeForm value={state.i_am} name="i_am" type="text"></InputTypeForm>
                      </div>
                    </div>
                    <div className={`${styles.lineWarper}`}>
                      <p className={`${styles.textFont}`}>ตำแหน่ง</p>
                      <div className={`${styles.inputWarper} ${styles.vw20}`}>
                        <InputTypeForm value={state.position} name="position" type="text"></InputTypeForm>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={`${styles.mb15}`}>
                  <div className={`${styles.lineWarper}`}>
                    <div className={`${styles.lineWarper}`}>
                      <p className={`${styles.textFont}`}>สังกัด</p>
                      <div className={`${styles.inputWarper} ${styles.vw15}`}>
                        <InputTypeForm value={state.department} name="department" type="text"></InputTypeForm>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={`${styles.mb15}`}>
                  <div className={`${styles.lineWarper}`}>
                    <div className={`${styles.lineWarper} ${styles.vw25}`}>
                      <p className={`${styles.textFont}`}>ขอลา</p>
                      <div className={`${styles.radioWarper} ${styles.wp100}`}>
                        <div className={`${styles.lineWarper} ${styles.textFont}`}>
                          <input checked={state.last_leavework == 'ลาป่วย' ? true : false} className={`${styles.radioBox}`} name="leavework" type="radio" value={`ลาป่วย`}></input> <span>ลาป่วย</span>
                        </div>
                        <div className={`${styles.lineWarper} ${styles.textFont}`}>
                          <input checked={state.last_leavework == 'ลากิจส่วนตัว' ? true : false} className={`${styles.radioBox}`} name="leavework" type="radio" value={`ลากิจส่วนตัว`}></input> <span>ลากิจส่วนตัว</span>
                        </div>
                        <div className={`${styles.lineWarper} ${styles.textFont}`}>
                          <input checked={state.last_leavework == 'ลาคลอดบุตร' ? true : false} className={`${styles.radioBox}`} name="leavework" type="radio" value={`ลาคลอดบุตร`}></input> <span>ลาคลอดบุตร</span>
                        </div>
                      </div>
                    </div>
                    <div className={`${styles.lineWarper} ${styles.wp100}`}>
                      <p className={`${styles.textFont}`}>เนื่องจาก</p>
                      <div className={`${styles.inputWarper} ${styles.wp100}`}>
                        <InputTypeForm value={state.due_to} name="due_to" type="text"></InputTypeForm>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={`${styles.mb15}`}>
                  <div className={`${styles.lineWarper} ${styles.lineWarperBetween}`}>
                    <div className={`${styles.lineWarper}`}>
                      <p className={`${styles.textFont}`}>ตั้งแต่วันที่</p>
                      <div className={`${styles.inputWarper} ${styles.vw18}`}>
                        <InputTypeForm value={state.start_date} name="start_date" type="text"></InputTypeForm>
                      </div>
                    </div>
                    <div className={`${styles.lineWarper}`}>
                      <p className={`${styles.textFont}`}>ถึงวันที่</p>
                      <div className={`${styles.inputWarper} ${styles.vw18}`}>
                        <InputTypeForm value={state.end_date} name="end_date" type="text"></InputTypeForm>
                      </div>
                    </div>
                    <div className={`${styles.lineWarper}`}>
                      <p className={`${styles.textFont}`}>มีกำหนด</p>
                      <div className={`${styles.inputWarper} ${styles.vw4}`}>
                        <InputTypeForm value={state.total_days} name="total_days" type="text"></InputTypeForm>
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
                          <input checked={state.last_leavework == 'ลาป่วย' ? true : false} className={`${styles.radioBoxInline}`} name="last_leavework" type="radio" value={`ลาป่วย`}></input> <span>ลาป่วย</span>
                        </div>
                        <div className={`${styles.lineWarper} ${styles.textFont}`}>
                          <input checked={state.last_leavework == 'ลากิจส่วนตัว' ? true : false} className={`${styles.radioBoxInline}`} name="last_leavework" type="radio" value={`ลากิจส่วนตัว`}></input> <span>ลากิจส่วนตัว</span>
                        </div>
                        <div className={`${styles.lineWarper} ${styles.textFont}`}>
                          <input checked={state.last_leavework == 'ลาคลอดบุตร' ? true : false} className={`${styles.radioBoxInline}`} name="last_leavework" type="radio" value={`ลาคลอดบุตร`}></input> <span>ลาคลอดบุตร</span>
                        </div>
                      </div>
                    </div>
                    <div className={`${styles.lineWarper}`}>
                      <p className={`${styles.textFont}`}>ครั้งสุดท้ายตั้งแต่วันที่</p>
                      <div className={`${styles.inputWarper} ${styles.vw20}`}>
                        <InputTypeForm value={state.last_leave_start_date} name="last_leave_start_date" type="text"></InputTypeForm>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={`${styles.mb15}`}>
                  <div className={`${styles.lineWarper}`}>
                    <div className={`${styles.lineWarper}`}>
                      <p className={`${styles.textFont}`}>ถึงวันที่</p>
                      <div className={`${styles.inputWarper} ${styles.vw18}`}>
                        <InputTypeForm value={state.last_leave_end_date} name="last_leave_end_date" type="text"></InputTypeForm>
                      </div>
                    </div>
                    <div className={`${styles.lineWarper}`}>
                      <p className={`${styles.textFont}`}>มีกำหนด</p>
                      <div className={`${styles.inputWarper} ${styles.vw15}`}>
                        <InputTypeForm value={state.last_leave_total_days} name="last_leave_total_days" type="text"></InputTypeForm>
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
                        <InputTypeForm value={state.contact_at} name="contact_at" type="text"></InputTypeForm>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.mtAuto}>
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
                        <div className={styles.imgSignature} style={{
                          backgroundImage: `url(${props.UserDataDetail.Signature})`,
                          backgroundRepeat: 'no-repeat',
                          backgroundSize: 'contain'
                        }}></div>
                      </div>
                      <div className={`${styles.lineWarper}`}>
                        <p className={`${styles.textFont}`}>ลงชื่อ</p>
                        <div className={`${styles.inputWarper} ${styles.vw18}`}>
                          <InputTypeForm value={state.i_am_signature} name="i_am_signature" type="text"></InputTypeForm>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
          :
          <>No Data...</>
      }
    </>

  )
}

PDF.getLayout = function getLayout(page) {
  return (
    <Layout title={'แบบฟร์อมการลางาน'}>
      {page}
    </Layout>
  )
}
