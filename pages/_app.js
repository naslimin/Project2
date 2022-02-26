import { useEffect, useState } from 'react';
import fire from '../config/firebase';
import '../global.css'
import moment from 'moment'
export default function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page)
  const [showAlert, setShowAlert] = useState(false);
  const [AlertInner, setAlertInner] = useState(false);
  const [UserData, setUserData] = useState(false);
  const [EventDataM, setEventDataM] = useState(moment().format('YYYY-MM'));
  const [EventData, setEventData] = useState([]);
  useEffect(() => {
    if (UserData) {
      EventData.length == 0 && fire.firestore().collection(`${UserData.email}/history/${EventDataM}`).get()
        .then((querySnapshot) => {
          var eventDataAllM = []
          querySnapshot.forEach((doc) => {
            var d = doc.data()
            eventDataAllM.push({ ...d, start: d.start.toDate(), end: d.end ? d.end.toDate() : null })
          });
          setEventData(eventDataAllM)
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    }
  }, [UserData])
  pageProps = {
    showAlert,
    setShowAlert,
    AlertInner,
    setAlertInner,
    UserData,
    setUserData,
    UserData,
    setUserData,
    EventDataM,
    setEventDataM,
    EventData,
    setEventData
  }
  return getLayout(<Component {...pageProps} />)
}
