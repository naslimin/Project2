// import Image from 'next/image'
import MenuLink from './compose/menuLink'
import styles from './sidebar.module.css'
export default function Sidebar(props) {

  const menuItem = [
    {
      to: 'home',
      icon: '/menuIcon/home.png',
      name: 'Home'
    },
    {
      to: 'dashboard',
      icon: '/menuIcon/dashboard.png',
      name: 'Dashboard'
    },
    {
      to: 'table',
      icon: '/menuIcon/dashboard.png',
      name: 'ตารางสรุปวันลา'
    },
    {
      to: 'event',
      icon: '/menuIcon/events.png',
      name: 'Event'
    },
    {
      to: 'userInfo',
      icon: '/user_blank.png',
      name: 'ข้อมูลส่วนตัว'
    },
    {
      to: 'leaveform',
      icon: '/menuIcon/leaveform.png',
      name: 'แบบฟอร์มการลางาน'
    },
    {
      to: 'setting',
      icon: '/menuIcon/setting.png',
      name: 'Setting'
    },
    {
      to: '/logout',
      icon: '/menuIcon/logout.png',
      name: 'Log out'
    }
  ]

  return (
    <nav className={styles.nav}>
      <div>
        <div className={styles.logoClass}>
          <div className={styles.logoText}>
            BWK School
          </div>
          <img className={styles.zIndex} src="/logo.png" alt="Logo" width="73" height="68" ></img>
        </div>

        {
          menuItem.map((item, i) => {
            return <MenuLink key={i} to={item.to} icon={item.icon} props={props}>
              {item.name}
            </MenuLink>
          })
        }
      </div>
      <div className={styles.imageClassRoom}>
        <img src="/demoImage/pexels-max-fischer-5212345.jpeg" alt="Logo" width="203" height="154" ></img>
      </div>
    </nav>
  )
}
