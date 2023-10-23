import React from 'react';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>
        <span className="bold">Pet For You</span> &copy; 2023
      </p>
    </footer>
  )
}