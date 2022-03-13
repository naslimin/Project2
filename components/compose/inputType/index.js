import styles from './index.module.css'

export default function InputType({ type, value, placeholder,className ,name ,onChange,onBlur,defaultValue}) {
  return (
    <>
      <input onBlur={onBlur} className={`${styles.inputType} ${className}`} name={name} type={type} onChange={onChange} defaultValue={defaultValue} value={value} placeholder={placeholder} autoComplete="new-password"></input>
    </>
  )
}
