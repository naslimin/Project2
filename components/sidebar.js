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
      icon: '/menuIcon/home.png',
      iconHover: "/menuIcon/home_hover.png",
      name: 'Dashboard'
    },
    {
      to: 'event',
      icon: '/menuIcon/home.png',
      iconHover: "/menuIcon/home_hover.png",
      name: 'Event'
    },
    {
      to: 'userInfo',
      icon: '/menuIcon/home.png',
      iconHover: "/menuIcon/home_hover.png",
      name: 'ข้อมูลส่วนตัว'
    },
    {
      to: 'setting',
      icon: '/menuIcon/home.png',
      iconHover: "/menuIcon/home_hover.png",
      name: 'Setting'
    },
    {
      to: 'logout',
      icon: '/menuIcon/home.png',
      iconHover: "/menuIcon/home_hover.png",
      name: 'Log out'
    }
  ]

  return (
    <nav className={styles.nav}>
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

    </nav>
  )
}
