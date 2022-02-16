import styles from './index.module.css'

export default function InputType({ type, value, placeholder,className }) {
  return (
    <>
      <input className={`${styles.inputType} ${className}`} type={type} value={value} placeholder={placeholder} autoComplete="new-password"></input>
    </>
  )
}
