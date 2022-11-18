import React, { useState } from 'react';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../../utils/api';

export default function MyPets() {

  const [pets, setPets] = useState([]);
  const [token] = useState(localStorage.getItem('token') || null);
  const navigate = useNavigate();

  useEffect(() => {

    (async function request() {
      await api.get('/pets/mypets', { 
        headers: {
          'Authorization': `Bearer ${JSON.parse(token)}`
        }
      }).then(response => {
        setPets(response.data.userPets);
      })
    }())

    if(!token) navigate('/login');
  }, [token])

  return (
    <section>
      <h1>MyPets</h1>
      <Link to="/pet/add">Cadastrar Pet</Link>
      <div>
        {
          pets.length ? 
          <>
            <p>Meus Pets cadastrados</p> 
            <ul>
              {
                pets.map(pet => (
                  <li key={pet._id}>
                    Nome: {pet.name} <br />
                    idade: {pet.age}
                  </li>
                ))
              }
            </ul>
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