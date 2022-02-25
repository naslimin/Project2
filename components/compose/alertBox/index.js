import styles from './index.module.css'

export default function AlertBox({ children, clickOut }) {
  return (
    <div className={`${styles.boxWarper}`} onClick={()=>clickOut(true)}>
      <div className={`${styles.box}`}>
        {children}
      </div>
    </div>
  )
}