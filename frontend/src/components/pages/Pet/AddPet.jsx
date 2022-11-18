import React, { useState } from 'react';
import styles from './AddPet.module.css';
import api from '../../../utils/api';
import useFlashMessage from '../../../hooks/useFlashMessage';
import PetForm from '../../form/PetForm';
import { useNavigate } from 'react-router-dom';

export default function AddPet() {

  const [token] = useState(localStorage.getItem('token') || null);
  const { setFlashMessage } = useFlashMessage();
  const navigate = useNavigate();

  async function registerPet(pet) {
    let msgType = "success";

    const formData =  new FormData(); 
    Object.keys(pet).forEach(key => {
      if(key === 'image') {
        for(let i = 0; i < pet.length; i++) {
          formData.append('images', pet[key][i]);
        }
      } else {
        formData.append(key, pet[key]);
      }
    })

    const data = await api.post('pets/register', formData, {
      headers: {
        'Authorization': `Bearer ${JSON.parse(token)}`,
        'Content-Type': 'multipart/form-data'
      }
    }).then(response => {
      setFlashMessage(response.data.message, "success"); 
      navigate('/pet/mypets');
      return response.data.data;
    })
    .catch(err => {
      setFlashMessage(err.response.data.error, "error");
      console.log(err);
      return err.response.data;
    })
  }

  return (
    <section>
      <div className={styles.addpet_header}>
        <h1>Cadastre um Pet</h1>
        <p>Depois ele ficará disponível para adoção</p>
      </div>

      <PetForm
        handleSubmit={registerPet}
      />
    </section>
  )
}