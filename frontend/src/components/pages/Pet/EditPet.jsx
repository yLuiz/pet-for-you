import React, { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../../utils/api';
import PetForm from '../../form/PetForm';
import useFlashMessage from '../../../hooks/useFlashMessage';
import styles from './Dashboard.module.css';


export default function EditPet() {

  const [pet, setPets] = useState({});
  const { setFlashMessage } = useFlashMessage();
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(pet) {
    console.log(pet)
    const formData =  new FormData(); 
    Object.keys(pet).forEach(key => {
      if(key === 'images') {
        for(let i = 0; i < pet[key].length; i++) {
          formData.append('images', pet[key][i]);
          console.log(pet[key][i])
        }
      } else {
        formData.append(key, pet[key]);
      }
    });

    setLoading(true);
    await api.patch('pets/' + id, formData).then(response => {
      setFlashMessage(response.data.message, "success"); 
      navigate('/pet/mypets');
      return response.data.data;
    })
    .catch(err => {
      setFlashMessage(err.response.data.error, "error");
      console.log(err);
      return err.response.data;
    })
    .finally(() => {
      setLoading(false);
    })
  }

  useEffect(() => {
    (async function getPet() {
      await api.get('/pets/' + id).then(response => {
        setPets(response.data.pet);
      })
    })()
  }, [id]);

  return (
    <>
      {
        pet.name ? 
        <section>
          <div className={styles.addpet_header}>
            <h1>
              Editando o Pet: {pet.name}
            </h1>
            <PetForm
              petData={pet}
              loading={loading}
              handleSubmit={handleSubmit}
            />
          </div>
        </section>
        : null
      }
    </>
  )
}