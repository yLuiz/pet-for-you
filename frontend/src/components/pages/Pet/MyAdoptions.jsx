import React from 'react';

import api from '../../../utils/api';
import styles from './Dashboard.module.css';

import RoundedImage from '../../layout/RoundedImage';
import { useState } from 'react';
import { useEffect } from 'react';
import useFlashMessage from '../../../hooks/useFlashMessage';
import environment from '../../../environment/environment';

export default function MyAdoptions() {
  
  const [pets, setPets] = useState([]);
  const [token] = useState(localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(true);
  const { setFlashMessage } = useFlashMessage();

  useEffect(() => {
    if(token) {
      api.get('/pets/myadoptions', {
        headers: {
          'Authorization': `Bearer ${JSON.parse(token)}`
        }
      })
      .then(response => {
        setPets(response.data.pets);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setFlashMessage(err.data.message, 'error');
      })
    }
  }, []);

  return (
    <section>
      <div className={styles.petslist_header}>
        <h1>Minhas adoções!</h1>
      </div>
      <div className={`${styles.petslist_container} ${styles.gridAuto}`}>
        { pets.length ? pets.map( pet  => (
          <div className={`${styles.petlist_row} ${styles.nomargin_right}`} key={pet._id}>
            <div className={styles.flexColumn}>
              <RoundedImage
                src={`${environment.REACT_APP_API}/images/pets/${pet.images[0]}`}
                alt={pet.name}
                className={styles.image}
                width="px75"
              />
              <span className='bold'>{pet.name}</span>
              
              <div className={styles.contacts}>
                <p>
                  <span className='bold'>Ligue para: </span> { pet.user.phone}
                </p>
                <p>
                  <span className='bold'>Fale com: </span> { pet.user.name}
                </p>
              </div>

              <div className={styles.actions}>
                { pet.available ? 
                  <p>Adoção em processo.</p> : 
                  <p>Parabéns por fazer está adoção.</p>
                }
              </div>
            </div>
          </div>
          )) : null
        }
        {
          loading ? <div className={styles.loader_row}><span className={styles.loader}></span></div> : !pets.length ? <p>Não há pets em adoção ainda.</p> : null
        }
      </div>
    </section>
  )
}