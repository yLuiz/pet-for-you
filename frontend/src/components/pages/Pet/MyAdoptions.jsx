import React from 'react';

import api from '../../../utils/api';
import styles from './Dashboard.module.css';

import RoundedImage from '../../layout/RoundedImage';
import { useState } from 'react';
import { useEffect } from 'react';
import useFlashMessage from '../../../hooks/useFlashMessage';

export default function MyAdoptions() {
  
  const [pets, setPets] = useState();
  const [token] = useState(localStorage.getItem('token') || null);
  const { setFlashMessage } = useFlashMessage();

  useEffect(() => {
    if(token) {
      api.get('/pets/myadoptions', {
        headers: {
          'Authorization': `Bearer ${JSON.parse(token)}`
        }
      })
      .then(response => {
        setPets(response.data);
        console.log(response.data)
      })
      .catch(err => {
        setFlashMessage(err.data.message, 'error');
      })
    }
  }, [token]);

  return (
    <p>Minhas adoções!</p>
  )
}