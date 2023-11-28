import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../../context/UserContext';
import environment from '../../environment/environment';
import api from '../../utils/api';
import styles from './Home.module.css';
import PetNotFound from './Pet/PetNotFound';

export default function Home() {

  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getUserInformation, isValidToken } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {

    const token = localStorage.getItem('token');

    if (!isValidToken(token)) {
      navigate('/login');
    }

    api.get('pets')
      .then(response => {

        const userInformation = getUserInformation();

        const validPets = response.data.pets.filter(pet => {
          return (pet.user._id !== userInformation.id && pet.available)
        })

        setPets(validPets);
        setLoading(false);

      })
      .catch((err) => {
        console.error(err);
      }
      )
  },
    []);

  return (
    <section>
      <div className={styles.pet_home_header}>
        <h1>Adote um Pet</h1>
        <p>Veja os detalhes de cada um e conheça o tutor deles</p>
      </div>
      <div className={styles.pet_container}>
        {
          loading ? <div className={styles.loader_row}><span className={styles.loader}></span></div> : pets.length ?
            pets.map(pet => (
              <div className={styles.pet_card} key={pet._id}>

                <div style={{
                  backgroundImage: `url(${environment.REACT_APP_API}/images/pets/${pet.images[0]})`
                }}
                  className={styles.pet_card_image}
                >
                </div>

                <h3>{pet.name}</h3>
                <p>
                  <span className='bold'>
                    {pet.weight}kg
                  </span>
                </p>

                {
                  pet.available ?
                    <Link to={`pet/${pet._id}`}>Mais detalhes</Link> :
                    <p className={styles.adopted_text}>Adotado</p>
                }
              </div>
            ))
            :
            <PetNotFound paragraph='Não há pets cadastrados ou disponíveis para adoção no momento!' />
        }
      </div>
    </section>
  )
}