import React from 'react';
import styles from './Select.module.css';

export default function Select({ text, name, options, handleChange, value }) {
  return (
    <div className={styles.form_control}>
      <label htmlFor={name}>{text}</label>
      <select name={name} id={name} onChange={handleChange} value={value || ''}>
        <option>Selecione uma opção</option>
        {
          options.map((option) => (
            <option value={option} key={option}> 
              {option} 
            </option>
          ))
        }
      </select>
    </div>
  )
}