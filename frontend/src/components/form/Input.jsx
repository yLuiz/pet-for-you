import React from 'react';
import styles from './Input.module.css';
import { GrGallery } from 'react-icons/gr';

export default function Input({ type = 'text', fileType = '', disabled = false, text, name, placeholder, handleChange, value, multiple, required = false }) {
  return (

    (type === 'file' && fileType === 'image') ? 
    <div className={styles.form_control}>
      <label className={styles.image_select} htmlFor={name}>
        <span> Seleciona a imagem </span>
        <GrGallery />
      </label>
      <input
        style={{
          display: 'none'
        }}
        type={type} 
        name={name} 
        id={name}
        required={required}
        placeholder={placeholder} 
        onChange={handleChange}
        value={value}
        disabled={disabled}
        {...(multiple ? { multiple } : '')}
      />
    </div>
    
    :

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