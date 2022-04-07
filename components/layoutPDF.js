import Head from 'next/head'
import fire from '../config/firebase';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import AlertBox from './compose/alertBox';
export default function LayoutPDF({ children, title }) {
  const router = useRouter()
  useEffect(() => {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        children.props.setUserData(user)
      } else {
        router.push('/')
      }
    });
  }, [children.props.UserData])
  if (children.props.UserData) {
    return (
      <>
        <Head>
          <title>{title}</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
          <link rel="stylesheet" href="/pdf.css"/>
          <script src="https://smtpjs.com/v3/smtp.js"></script>
        </Head>
        {children}
        {
            children.props.showAlert ?
              <AlertBox clickOut={(e) => children.props.setShowAlert(!e)}>
                {children.props.AlertInner}
              </AlertBox>
              : null
          }
      </>
    )
  } else {
    return (<>Not Login...</>)
  }
}
