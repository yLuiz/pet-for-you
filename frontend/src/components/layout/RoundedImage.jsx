import React from 'react';
import styles from './RoundedImage.module.css';

export default function RoundedImage({ src, alt, width }) {
  return (
    <img 
      className={`${styles.rounded_image} ${styles[width]}`}
      src={src} alt={alt} 
    />
  )
}