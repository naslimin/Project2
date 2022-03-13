import styles from './index.module.css'

export default function InputTypeForm({ type, value, placeholder, className, name, onChange, checked }) {
  return (
    <>
      {
        type == "radio" ?
          <input disabled checked={checked} className={`${styles.inputType} ${className}`} name={name} type={type} onChange={onChange} value={value} placeholder={placeholder} autoComplete="new-password">{value}</input>
          :
          <p className={`${styles.inputType} ${className}`}>{value}</p>
      }

    </>
  )
}
