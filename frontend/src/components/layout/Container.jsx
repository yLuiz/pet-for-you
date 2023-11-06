import React, { useContext, useEffect } from 'react';
import styles from './Container.module.css';
import { Context } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';

export default function Container({ children }) {

  const location = useNavigate();
  const { isValidToken, logout } = useContext(Context);
  const token = localStorage.getItem('token');

  useEffect(() => {

    if (!isValidToken(token)) {
      logout();
    }
    
  }, [location]);

  return (
    <main className={styles.container}>
      { children }
    </main>
  )
}