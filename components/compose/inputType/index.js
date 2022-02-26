import styles from './index.module.css'

export default function InputType({ type, value, placeholder,className ,name ,onChange}) {
  return (
    <>
      <input className={`${styles.inputType} ${className}`} name={name} type={type} onChange={onChange} value={value} placeholder={placeholder} autoComplete="new-password"></input>
    </>
  )
}
