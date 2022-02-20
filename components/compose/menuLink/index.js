import Image from 'next/image'
import styles from './index.module.css'
import Link from 'next/link'
import { useRouter } from "next/router";
import { useState } from 'react'
export default function MenuLink({ to, icon, children }) {
  const router = useRouter();
  return (
    <Link href={to}>
      <div
        className={router.pathname == `/${to}` ? `${styles.menuLink} ${styles.active}` : styles.menuLink}>
        <Image src={icon} alt="icon menu" width="30" height="30" />
        <div className={styles.menuLabel}>{children}</div>
      </div>
    </Link>
  )
}
