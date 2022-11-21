import React, { useState } from 'react';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../../utils/api';
import environment from '../../../environment/environment';
import RoundedImage from '../../layout/RoundedImage';
import styles from './Dashboard.module.css';

import  useFlashMessage from '../../../hooks/useFlashMessage';
 
export default function MyPets() {

  const [pets, setPets] = useState([]);
  const [token] = useState(localStorage.getItem('token') || null);
  const navigate = useNavigate();
  const { setFlashMessage } = useFlashMessage();

  useEffect(() => {

    (async function request() {
      await api.get('/pets/mypets', /* { 
        headers: {
          'Authorization': `Bearer ${JSON.parse(token)}`
        }
      } */
      ).then(response => {
        setPets(response.data.userPets);
      })
    }())

    console.log('Rendered')


    if(!token) navigate('/login');
  }, [token])

  async function removePet(_id) {
    await api.delete('/pets/' + _id).then(response => {
      const listPets = pets.filter(pet => pet._id !== _id);
      setPets(listPets);

      setFlashMessage(response.data.message, "success");
    });
  }


  return (
    <section>
      <div className={styles.petslist_header}>
        <h1>Meus Pets</h1>
        <Link to="/pet/add">Cadastrar Pet</Link>
      </div>
      
      <div className={styles.petslist_container}>
        {
          pets.length ? 
          <>
            <p>Meus Pets cadastrados</p> 
            <div>
              {
                pets.map(pet => (
                  <div className={styles.petlist_row} key={pet._id}>
                    <RoundedImage 
                      key={pet.images[0]} 
                      src={environment.REACT_APP_API + `/images/pets/${pet.images[0]}`} 
                      width='px75' 
                      alt={pet.name} 
                    />

                    <span className="bold">
                      {pet.name}
                    </span>
                    <div className={styles.actions}>
                      { pet.available ? 
                        <>
                         { pet.adopter ? <button className={styles.conclude_btn}>Concluir adoção</button> : null}
                         <Link to={`/pet/edit/${pet._id}`}>Editar</Link>
                         <button className={styles.delete} onClick={() => removePet(pet._id)}>Excluir</button>
                        </>
                        : <p>Pet já adotado!</p>
                      }
                    </div>
                  </div>
                ))
              }
            </div>
          </>
          : null
        }
        {
          !pets.length ? <p>Não há Pets cadastrados</p> : null
        }
      </div>
    </section>
  )
}