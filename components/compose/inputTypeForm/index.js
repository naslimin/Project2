import styles from './index.module.css'

export default function InputTypeForm({ type, value, placeholder,className,name }) {
  return (
    <>
      <input className={`${styles.inputType} ${className}`} name={name} type={type} value={value} placeholder={placeholder} autoComplete="new-password"></input>
    </>
  )
}
