import styles from './index.module.css'

export default function AlertBox({ children, clickOut, disableClick }) {
  return (
    <div className={`${styles.boxWarper}`} onClick={() => !disableClick && clickOut(true)}>
      <div className={`${!disableClick ? styles.box : styles.box2}`}>
        {children}
      </div>
    </div>
  )
}