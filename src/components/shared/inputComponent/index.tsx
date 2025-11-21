import { InputHTMLAttributes } from "react";
import styles from "./style.module.scss";

interface IInputComponentProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  placeholder?: string;
  error?: string;
}

export default function InputComponent({ label, placeholder, ...inputProps }: IInputComponentProps) {
  return (
    <div
      className={styles.InputWrapper}
    >
      <label htmlFor={label}>
        {label}
        <input id={label} {...inputProps} placeholder={placeholder} />
      </label>
    </div>
  )
}
