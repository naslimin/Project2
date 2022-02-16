import styles from './index.module.css'

export default function RadioType({ name, value, checked, children ,onChange}) {
  return (
    <div className={`${styles.redioWarper}`}>
      <input name={name} checked={checked} type="radio" value={value} onChange={onChange}/> <span className={styles.fontText}>{children}</span>
    </div>
  )
}
