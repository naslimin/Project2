import BarChart from '../components/compose/BarChart'
import Layout from '../components/layout'
import fire from '../config/firebase'
import styles from './dashboard.module.css'
import moment from 'moment';
import { useEffect, useState } from 'react';

import { useRouter } from 'next/router'
export default function Dashboard(props) {
  const [listM, setM] = useState(["มกราคม", "กุมภาพันธ์", "มีนาคม",
    "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน",
    "ตุลาคม", "พฤศจิกายน", "ธันวาคม"])
    
  const [listData, setListData] = useState(false)
  const router = useRouter()
  var total_days_sum = 0
  useEffect(() => {
    if (props.UserDataDetail) {
      fire.firestore().collection(`${props.UserDataDetail.Email}/leavehistory/${moment().format('YYYY')}`).get().then((querySnapshot) => {
        var listDashBoard = []
        querySnapshot.forEach((doc) => {
          var d = doc.data()
          var mouth = moment(moment().format(`YYYY-${doc.id}-DD`)).month()
          listDashBoard.push({
            [mouth]: d
          })
        });
        props.setDashboardData(listDashBoard)
      })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });

      fire.firestore().collection(`${props.UserData.email}/dashboard/${moment().format('YYYY')}`).get().then((querySnapshot) => {
        var listDashBoard = {
          "ลาป่วย": {
            hit: 0,
            data: []
          },
          "ลากิจส่วนตัว": {
            hit: 0,
            data: []
          },
          "ลาคลอดบุตร": {
            hit: 0,
            data: []
          }
        }
        querySnapshot.forEach((doc) => {
          var d = doc.data()
          listDashBoard[d.type].hit = listDashBoard[d.type].hit + 1
          listDashBoard[d.type].data.push(d)
        });
        setListData(listDashBoard)
      })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    }
  }, [props.UserDataDetail])


  // useEffect(()=>{
  //   if (listData) {
  //     console.log(listData)
  //   listData.forEach(element => {
  //     console.log(element)
  //   });
  //   }
  // },[listData])

  const renderList = (listData,title) => {
    
    return (
      <>
        <p className={styles.titleText}>{title} {listData.hit} ครั้ง</p>
        <div className={styles.mt10}>
          {
            listData.data.map((listD,index) => {
              var mouth = moment(moment().format(`YYYY-${listD.month}-DD`)).month()
              total_days_sum+=listD.total_days
              return (
                <p onClick={() => router.push(`/pdf?id=${listD.refid}`)} className={styles.titleText2}>ครั้งที่ {index + 1} เดือน{listM[mouth]}   เป็นจำนวน {listD.total_days} วัน</p>
              )
            })
          }
        </div>
      </>
    )

  }

  return (
    <>
      {
        props.dashboardData ?
          <section>
            <h2 className={styles.HeaderTitleBox}>สรุปสถิติการลาเพื่อพิจารณาความดีความชอบในการเลื่อนขั้นเงินเดือน</h2>
            <BarChart data={props.dashboardData} />
            <div className={`${styles.form}`}>
              {
                listData && listData["ลาป่วย"].data.length > 0 ?
                  renderList(listData["ลาป่วย"],'ลาป่วย')
                  : null
              }
              {
                listData && listData["ลากิจส่วนตัว"].data.length > 0?
                  renderList(listData["ลากิจส่วนตัว"],'ลากิจส่วนตัว')
                  : null
              }
              {
                listData && listData["ลาคลอดบุตร"].data.length > 0?
                  renderList(listData["ลาคลอดบุตร"],'ลาคลอดบุตร')
                  : null
              }

              <div className={styles.oneYearDay}>
              รวมการลางานใน 1 ปีงบประมาณ จำนวน {total_days_sum} วัน
              </div>
            </div>
          </section>
          :
          <></>
      }
    </>

  )
}

Dashboard.getLayout = function getLayout(page) {
  return (
    <Layout title={'Dashboard'}>
      {page}
    </Layout>
  )
}
