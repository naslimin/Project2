import styles from './index.module.css'

export default function InputTypeForm({ type, value, placeholder,className,name,onChange,readOnly }) {
  return (
    <>
      <input readOnly={readOnly} className={`${styles.inputType} ${className}`} name={name} type={type} onChange={onChange} value={value} placeholder={placeholder} autoComplete="new-password"></input>
    </>
  )
}
