import React from 'react';
import { GrGallery } from 'react-icons/gr';
import styles from './RoundedImage.module.css';

export default function RoundedImage({ src, alt, size }) {

  return (
    src ? 
      <img 
        style={{
          maxWidth: `${size || '75px'}`,
          width: '100%',
          height: `${size || '75px'}`,
        }}
        className={`${styles.rounded_image}`}
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