import React, { useContext, useEffect } from 'react';
import styles from './Container.module.css';
import Navbar from './Navbar';
import { Context } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';

export default function Container({ children }) {

  const location = useNavigate();
  const { isValidToken, logout, authenticated } = useContext(Context);
  const token = localStorage.getItem('token');

  useEffect(() => {

    if (authenticated && !isValidToken(token)) {
      logout();
    }
    
  }, [location]);

  return (
      <>
        <Navbar />
        <main className={styles.container}>
          { children }
        </main>
      </>
  )
}