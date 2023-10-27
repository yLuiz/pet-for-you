import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import api from '../../../utils/api'
import styles from './PetDetails.module.css';
import useFlashMessage from "../../../hooks/useFlashMessage";
import { useState } from "react";
import { REACT_APP_API } from "../../../environment/environment";

export default function PetDetails() {

  const [token] = useState(localStorage.getItem('token') || null);
  const [pet, setPet] = useState({});
  const { id } = useParams();
  const { setFlashMessage } = useFlashMessage();

  const headers = {
    'Authorization': `Bearer ${JSON.parse(token)}`
  }

  async function schedule() {
    await api.patch(`pets/schedule/${pet._id}`, null, { headers })
    .then(response => {
      setFlashMessage(response.data.message, 'success')
    })
    .catch(err => {
      console.error(err);
      setFlashMessage(err.response.data.message, 'error');
    });
  }

  useEffect(() => {
    (async () => {
      await api.get(`/pets/${id}`, { headers })
      .then(response => setPet(response.data.pet))
      .catch(err => setFlashMessage(err.response.message, 'error'));
    })()
  }, []);


  return (
    <>
      {pet.name && (
        <section className={styles.pet_details_container}>
          <div className={styles.petdetails_header}>
            <h1>Conhecendo o Pet: {pet.name}</h1>
            <p>Se tiver interesse, marque uma visita para conhecê-lo!</p>
          </div>
          <div className={styles.pet_images}>
            {pet.images.map((image, index) => (
              <img
                key={index}
                src={`${REACT_APP_API}/images/pets/${image}`}
                alt={pet.name}
              />
            ))}
          </div>
          <p>
            <span className="bold">Peso:</span> {pet.weight}kg
          </p>
          <p>
            <span className="bold">Idade:</span> {pet.age} anos
          </p>
          {token ? (
            <button onClick={schedule}>Solicitar uma Visita</button>
          ) : (
            <p>
              Você precisa <Link to="/register">criar uma conta</Link> para
              solicitar a visita.
            </p>
          )}
        </section>
      )}
    </>
  )
};