import Image from 'next/image'
import MenuLink from './compose/menuLink'
import styles from './sidebar.module.css'
export default function Sidebar() {

  const menuItem = [
    {
      to: 'home',
      icon: '/menuIcon/home.png',
      iconHover: "/menuIcon/home_hover.png",
      name: 'Home'
    },
    {
      to: 'dashboard',
      icon: '/menuIcon/dashboard.png',
      iconHover: "/menuIcon/dashboard_hover.png",
      name: 'Dashboard'
    },
    {
      to: 'event',
      icon: '/menuIcon/events.png',
      iconHover: "/menuIcon/events_hover.png",
      name: 'Event'
    },
    {
      to: 'userInfo',
      icon: '/user_blank.png',
      iconHover: "/user_blank.png",
      name: 'ข้อมูลส่วนตัว'
    },
    {
      to: 'leaveform',
      icon: '/menuIcon/leaveform.png',
      iconHover: "/menuIcon/leaveform_hover.png",
      name: 'แบบฟร์อมการลางาน'
    },
    {
      to: 'setting',
      icon: '/menuIcon/setting.png',
      iconHover: "/menuIcon/setting_hover.png",
      name: 'Setting'
    },
    {
      to: '/',
      icon: '/menuIcon/logout.png',
      iconHover: "/menuIcon/logout.png",
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
          <Image src="/logo.png" alt="Logo" width="73" height="68" ></Image>
        </div>

        {
          menuItem.map((item, i) => {
            return <MenuLink key={i} to={item.to} icon={item.icon} iconHover={item.iconHover}>
              {item.name}
            </MenuLink>
          })
        }
      </div>
      <div className={styles.imageClassRoom}>
        <Image src="/demoImage/pexels-max-fischer-5212345.jpeg" alt="Logo" width="203" height="154" ></Image>
      </div>
    </nav>
  )
}
