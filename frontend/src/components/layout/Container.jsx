import React from 'react';
import styles from './Container.module.css';
import Navbar from './Navbar';

export default function Container({ children }) {
  return (
    <main className={styles.container}>
      <Navbar />
      { children }
    </main>
  )
}