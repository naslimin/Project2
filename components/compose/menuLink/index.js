import Image from 'next/image'
import styles from './index.module.css'
import Link from 'next/link'
import { useRouter } from "next/router";
import { useState } from 'react'
export default function MenuLink({ to, icon, iconHover, children }) {
  const [isHovering, setIsHovered] = useState(false);
  const onMouseEnter = () => setIsHovered(true);
  const onMouseLeave = () => setIsHovered(false);
  const router = useRouter();
  return (
    <Link href={to}>
      <div onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave} className={router.pathname == `/${to}` ? `${styles.menuLink} ${styles.active}` : styles.menuLink}>
        {
          isHovering || router.pathname == `/${to}`?
            <Image src={iconHover} alt="icon menu" width="30" height="30" />
            :
            <Image src={icon} alt="icon menu" width="30" height="30" />
        }

        <div className={styles.menuLabel}>{children}</div>
      </div>
    </Link>
  )
}
