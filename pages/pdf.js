// import Image from 'next/image'
import styles from './pdf.module.css'
import Layout from '../components/layoutPDF'
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
import { useEffect, useState } from 'react';
import fire from '../config/firebase';
import moment from 'moment';
import { useRouter } from 'next/router'
import InputTypeForm from '../components/compose/inputTypeFormText';
moment.locale('th')
export default function PDF(props) {
  const queryParams = new URLSearchParams(window.location.search);
  const router = useRouter()
  const [state, setState] = useState(false)

  const _exportPdf = () => {
    props.setAlertInner(<><img width={60} height={60} src='/icon/loading-buffering.gif' /></>)
    props.setShowAlert(true)
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
      pdf.save(`แบบฟร์อมการลางานของ ${state.i_am} เรื่อง ${state.subject}.pdf`);
      document.getElementById('canvas_pdf').remove()
      props.setShowAlert(false)
    });
  }

  // const _sharePdf = () => {
  //   props.setAlertInner(<><img width={60} height={60} src='/icon/loading-buffering.gif' /></>)
  //   props.setShowAlert(true)
  //   window.scrollTo(0, document.body.scrollHeight);
  //   html2canvas(document.querySelector("#capture"), {
  //     allowTaint: true,
  //     useCORS: true,
  //     scale: 1
  //   }).then(canvas => {
  //     canvas.id = "canvas_pdf"
  //     document.body.appendChild(canvas);
  //     const imgData = canvas.toDataURL('image/png');

  //     var storage = fire.storage().ref(`${props.UserData.email}/${queryParams.get('id')}.png`);
  //     storage.putString(imgData, 'data_url').then((snapshot) => {
  //       snapshot.ref.getDownloadURL().then(url => {
  //         window.open(url,'popUpWindow','height=500,width=400,left=100,top=100,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no, status=yes')
  //         props.setAlertInner(<>
  //           <textarea readOnly rows="5" cols="50">{url}</textarea>
  //         </>)
  //         props.setShowAlert(true)
  //       })
  //     });
  //     document.getElementById('canvas_pdf').remove()
  //   });
  // }

  const _exportToEmail = () => {
    props.setAlertInner(<><img width={60} height={60} src='/icon/loading-buffering.gif' /></>)
    props.setShowAlert(true)
    window.scrollTo(0, document.body.scrollHeight);
    html2canvas(document.querySelector("#capture"), {
      allowTaint: true,
      useCORS: true,
      scale: 1
    }).then(canvas => {
      canvas.id = "canvas_pdf"
      document.body.appendChild(canvas);
      const imgData = canvas.toDataURL('image/png');

      var storage = fire.storage().ref(`${props.UserData.email}/${queryParams.get('id')}.png`);
      storage.putString(imgData, 'data_url').then((snapshot) => {
        snapshot.ref.getDownloadURL().then(url => {
          Email.send({
            Host: "smtp.elasticemail.com",
            Username: "naslimin.fw@gmail.com",
            Password: "BD50A95877E231CB34123AE1E1748A61CE91",
            To: props.UserData.email,
            From: 'naslimin.fw@gmail.com',
            Subject: `แบบฟร์อมการลางานของ ${state.i_am} เรื่อง ${state.subject}`,
            Body: `
            <p>(เขียนที่) ${state.w_at}</p>
            <p>วันที่ ${state.date}/${state.mouth}/${state.year}</p>
            <p>เรื่อง ${state.subject}</p>
            <p>เรียน ${state.notice}</p>
            <p>ข้าพเจ้า ${state.i_am}</p>
            <p>ตำแหน่ง ${state.position}</p>
            <p>สังกัด ${state.department}</p>
            <p>ขอลา ${state.leavework}</p>
            <p>เนื่องจาก ${state.due_to}</p>
            <p>ตั้งแต่วันที่ ${moment(state.start_date.seconds * 1000).add(543, 'year').format('DD/MM/YYYY')}</p>
            <p>ถึงวันที่ ${moment(state.end_date.seconds * 1000).add(543, 'year').format('DD/MM/YYYY')}</p>
            <p>มีกำหนด ${state.total_days} วัน</p>
            <p>ข้าพเจ้าได้ ${state.last_leavework ? state.last_leavework:'-'} ครั้งสุดท้ายตั้งแต่วันที่ ${state.last_leave_start_date ? moment(state.last_leave_start_date.seconds * 1000).add(543, 'year').format('DD/MM/YYYY') : '-'} ถึงวันที่ ${state.last_leave_end_date ? moment(state.last_leave_end_date.seconds * 1000).add(543, 'year').format('DD/MM/YYYY') : '-'} มีกำหนด ${state.last_leave_total_days?state.last_leave_total_days:'-'} วัน</p>
            <p>ในระหว่างลาจะติดต่อข้าพเจ้าได้ที่ ${state.contact_at}</p>
            <p>ขอแสดงความนับถือ</p>
            <img width="200" height="200" src="${state.UserDataDetail.Signature}"/>
            <p>ลงชื่อ ${state.i_am_signature}</p>
            `,
            Attachments: [
              {
                name: `แบบฟร์อมการลางานของ ${state.i_am} เรื่อง ${state.subject}.png`,
                path: url
              }]
          }).then(
            message => {
              if (message == 'OK') {
                props.setAlertInner(<>
                  <p>
                    ส่งอีเมลเรียบร้อยแล้ว<br />
                    กรุณาตรวจสอบในถังขยะของอีเมล์ด้วย
                  </p>
                </>)
                props.setShowAlert(true)
              } else {
                props.setAlertInner(<>
                  <p>ไม่สามารถส่งอีเมลได้</p>
                </>)
                props.setShowAlert(true)
              }

            }
          );
        })
      });

      // window.open(`mailto:test@example.com?subject=แบบฟร์อมการลางาน&body=<img src=\"${imgData}\">`);
      // const pdf = new jsPDF({
      //   orientation: "p",
      //   unit: "cm",
      //   format: [29.7, 21],
      //   compress: true
      // });
      // pdf.addImage(imgData, 'PNG', 0, 0);
      // pdf.to

      document.getElementById('canvas_pdf').remove()
    });
  }

  useEffect(() => {
    if (!state) {
      fire.firestore().collection(`${props.UserData.email}/leave/data`).doc(`${queryParams.get('id')}`).get()
        .then(async (doc) => {
          if (doc.exists) {
            console.log(doc.data())
            setState(doc.data())
          }
        })
    }
  }, [])

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
              {/* <div onClick={() => _sharePdf()} className={`${styles.lineWarper} ${styles.sendBTNWarper}`}>
                <div className={`${styles.sendBTNShare}`}>Share PDF</div>
              </div> */}
              <div onClick={() => _exportToEmail()} className={`${styles.lineWarper} ${styles.sendBTNWarper}`}>
                <div className={`${styles.sendBTNEmail}`}>Send Email to {props.UserData.email}</div>
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
                          <input checked={state.leavework == 'ลาป่วย' ? true : false} className={`${styles.radioBox}`} name="leavework" type="radio" value={`ลาป่วย`}></input> <span>ลาป่วย</span>
                        </div>
                        <div className={`${styles.lineWarper} ${styles.textFont}`}>
                          <input checked={state.leavework == 'ลากิจส่วนตัว' ? true : false} className={`${styles.radioBox}`} name="leavework" type="radio" value={`ลากิจส่วนตัว`}></input> <span>ลากิจส่วนตัว</span>
                        </div>
                        <div className={`${styles.lineWarper} ${styles.textFont}`}>
                          <input checked={state.leavework == 'ลาคลอดบุตร' ? true : false} className={`${styles.radioBox}`} name="leavework" type="radio" value={`ลาคลอดบุตร`}></input> <span>ลาคลอดบุตร</span>
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
                        <InputTypeForm value={moment(state.start_date.seconds * 1000).add(543, 'year').format('DD/MM/YYYY')} name="start_date" type="text"></InputTypeForm>
                      </div>
                    </div>
                    <div className={`${styles.lineWarper}`}>
                      <p className={`${styles.textFont}`}>ถึงวันที่</p>
                      <div className={`${styles.inputWarper} ${styles.vw18}`}>
                        <InputTypeForm value={moment(state.end_date.seconds * 1000).add(543, 'year').format('DD/MM/YYYY')} name="end_date" type="text"></InputTypeForm>
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
                        <InputTypeForm value={state.last_leave_start_date ? moment(state.last_leave_start_date.seconds * 1000).add(543, 'year').format('DD/MM/YYYY') : '-'} name="last_leave_start_date" type="text"></InputTypeForm>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={`${styles.mb15}`}>
                  <div className={`${styles.lineWarper}`}>
                    <div className={`${styles.lineWarper}`}>
                      <p className={`${styles.textFont}`}>ถึงวันที่</p>
                      <div className={`${styles.inputWarper} ${styles.vw18}`}>
                        <InputTypeForm value={state.last_leave_end_date ? moment(state.last_leave_end_date.seconds * 1000).add(543, 'year').format('DD/MM/YYYY') : '-'} name="last_leave_end_date" type="text"></InputTypeForm>
                      </div>
                    </div>
                    <div className={`${styles.lineWarper}`}>
                      <p className={`${styles.textFont}`}>มีกำหนด</p>
                      <div className={`${styles.inputWarper} ${styles.vw15}`}>
                        <InputTypeForm value={state.last_leave_total_days ? state.last_leave_total_days : '-'} name="last_leave_total_days" type="text"></InputTypeForm>
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
                        <img className={styles.imgSignature} src={state.UserDataDetail.Signature} />
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
