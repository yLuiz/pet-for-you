import React from 'react';
import { GrGallery } from 'react-icons/gr';
import styles from './RoundedImage.module.css';

export default function RoundedImage({ src, alt, width }) {

  return (
    src ? 
      <img 
        className={`${styles.rounded_image} ${styles[width]}`}
        src={src} alt={alt} 
      />
      : 
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%'

        }}
      >
        <div 
          className={styles.none_image_template}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '200px',
            height: '200px',
            borderRadius: '100%',
            backgroundColor: '#CECECE',
          }}
        >
          <GrGallery />
        </div>
      </div>
  )
}