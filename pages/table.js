// import BarChart from '../components/compose/BarChart'
import Layout from '../components/layout'
import fire from '../config/firebase'
import styles from './table.module.css'
import moment from 'moment';
import { useEffect, useState } from 'react';

import { useRouter } from 'next/router'
export default function TablePage(props) {
  // const [listM, setM] = useState(["มกราคม", "กุมภาพันธ์", "มีนาคม",
  //   "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน",
  //   "ตุลาคม", "พฤศจิกายน", "ธันวาคม"])
  const [listMS, setMS] = useState(false)
  const [listData, setListData] = useState(false)
  const [listDataAll, setListDataAll] = useState(false)
  const router = useRouter()
  var total_days_sum = 0
  useEffect(() => {
    if (props.UserDataDetail) {
      setMS(["ม.ค.", "ก.พ.", "มี.ค.",
        "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.",
        "ต.ค.", "พ.ย.", "ธ.ค."])
      fire.firestore().collection(`collection`).get().then((querySnapshot) => {
        var listAllDashBoard = []
        var i = 0
        querySnapshot.forEach(async (doc) => {
          var d = doc.data()
          var userData = await fire.firestore().collection(`${d.user_email}`).doc(`userinfo`).get()
          listAllDashBoard.push(
            {
              user: userData.data(),
              listDashBoard: await getUserHistory(userData.data().Email)
            }
          )
          i++;
          if (i == querySnapshot.size) {
            setListDataAll(listAllDashBoard)
          }
        });

      })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });


    }
  }, [props.UserDataDetail])

  const getUserHistory = (email) => {
    return new Promise(rest => {
      fire.firestore().collection(`${email}/dashboard/${moment().format('YYYY')}`).get().then((querySnapshot) => {
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
          },
          "มาสาย": {
            hit: 0,
            data: []
          }
        }
        if (querySnapshot.size == 0) {
          rest(listDashBoard)
        } else {
          var i = 0
          querySnapshot.forEach((doc) => {
            var d = doc.data()
            listDashBoard[d.type].hit = listDashBoard[d.type].hit + 1
            listDashBoard[d.type].data.push(d)
            i++;
            if (i == querySnapshot.size) {
              rest(listDashBoard)
            }
          });
        }
      })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    })
  }

  const renderTable = (listData) => {
    listData.total = 0
    var listMdata = []

    listData.data.map((listD, index) => {
      var mouth = moment(moment().format(`YYYY-${listD.month}-DD`)).month()
      listMdata.push({
        m: mouth,
        t: listD.total_days
      })
      listData.total += listD.total_days
    })
    return (
      <>
        {
          listData.data.length == 0 ?
            <>
              {
                listMS.map((e, i) => {
                  return (
                    <>
                      <td key={e}>{
                        '-'
                      }</td>
                    </>
                  )
                })
              }
              <td>-</td>
            </>
            :
            <>
              {
                listMS.map((e, i) => {
                  var data = listMdata.find(e=>e.m==i)
                  return (
                    <>
                      <td key={e}>{
                         data ? data.t : '-'
                      }</td>
                    </>
                  )
                })
              }
              <td>{listData.total}</td>
            </>
        }
      </>
    )
  }
  const renderList = (data) => {
    return (
      <>
        <tr>
          <td rowSpan="4">{data.user.Name} {data.user.Surname}</td>
          <td>ลาป่วย</td>
          <td>-</td>
          {
            renderTable(data.listDashBoard["ลาป่วย"])
          }
          <td>--</td>
        </tr>
        <tr>
          <td>กิจ</td>
          <td>-</td>

          {
            renderTable(data.listDashBoard["ลากิจส่วนตัว"])
          }

          <td>--</td>
        </tr>
        <tr>
          <td>คลอด</td>
          <td>-</td>

          {
            renderTable(data.listDashBoard["ลาคลอดบุตร"])
          }

          <td>--</td>
        </tr>
        <tr>
          <td>สาย</td>
          <td>-</td>

          {
            renderTable(data.listDashBoard["มาสาย"])
          }

          <td>--</td>
        </tr>
      </>
    )
  }

  return (
    <>
      {
        listDataAll ?
          <section>
            <h2 className={styles.HeaderTitleBox}>สรุปสถิติการลาเพื่อพิจารณาความดีความชอบในการเลื่อนขั้นเงินเดือน</h2>
            <div className={`${styles.form}`}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th rowSpan="2">ชื่อ-สกุล</th>
                    <th rowSpan="2">ประเภท<br />การลา</th>
                    <th rowSpan="2">วันลา<br />ยกมา</th>
                    <th colSpan="12">เดือน</th>
                    <th rowSpan="2">รวมวันลา<br />ทุกประเภท</th>
                    <th rowSpan="2">หมายเหตุ</th>
                  </tr>
                  <tr>
                    {
                      listMS.map(e => {
                        return (
                          <>
                            <th key={e}>{e}</th>
                          </>
                        )
                      })
                    }
                  </tr>
                </thead>
                <tbody>
                  {
                    listDataAll.map(e => {
                      return (renderList(e))
                    })
                  }
                </tbody>
              </table>
            </div>
            {/* <BarChart data={props.dashboardData} />
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
            </div> */}
          </section>
          :
          <></>
      }
    </>

  )
}

TablePage.getLayout = function getLayout(page) {
  return (
    <Layout title={'Table'}>
      {page}
    </Layout>
  )
}
