import styles from './index.module.css'

export default function InputTypeForm({ type, value, placeholder,className,name,onChange }) {
  return (
    <>
      <input className={`${styles.inputType} ${className}`} name={name} type={type} onChange={onChange} value={value} placeholder={placeholder} autoComplete="new-password"></input>
    </>
  )
}
