import React from 'react';
import styles from './Input.module.css';

export default function Input({ type = 'text', disabled = false, text, name, placeholder, handleChange, value, multiple, required = false }) {
  return (
    <div className={styles.form_control}>
      <input 
        type={type} 
        name={name} 
        id={name}
        required={required}
        placeholder={' '} 
        onChange={handleChange}
        value={value}
        disabled={disabled}
        {...(multiple ? { multiple } : '')}
      />
      <label htmlFor={name}>{text}</label>
    </div>
  )
}