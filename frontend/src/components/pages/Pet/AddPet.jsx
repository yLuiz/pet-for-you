import React, { useState } from 'react';
import styles from './AddPet.module.css';
import api from '../../../utils/api';
import PetForm from '../../form/PetForm';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function AddPet() {

  const [token] = useState(localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function registerPet(pet) {
    const formData =  new FormData(); 
    Object.keys(pet).forEach(key => {
      if(key === 'images') {
        for(let i = 0; i < pet[key].length; i++) {
          formData.append('images', pet[key][i]);
        }
      } else {
        formData.append(key, pet[key]);
      }
    })
    
    setLoading(true);

    if (loading) {
      toast('Aguarde o pet ser cadastrado.', {
        type: 'error'
      });

      return;
    };

    await api.post('pets/register', formData, {
      headers: {
        'Authorization': `Bearer ${JSON.parse(token)}`,
        'Content-Type': 'multipart/form-data'
      }
    }
    )
    .then(response => { 
      toast(response.data.message, {
        type: 'success'
      });
      navigate('/pet/mypets');
      return response.data.data;
    })
    .catch(err => {
      toast(err.response.data.error || 'Houve um erro ao fazer o cadastro, verifique se os campos estão preenchidos corretamente.', {
        type: 'error',
        autoClose: 2500
      });
      console.error(err);
      return err.response.data;
    })
    .finally(() => {
      setLoading(false);
    })
  }

  return (
    <section>
      <div className={styles.addpet_header}>
        <h1>Cadastre um Pet</h1>
      </div>

      <PetForm
        createPet={true}
        handleSubmit={registerPet}
        loading={loading}
      />
    </section>
  )
}