import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from '../../../utils/api'
import styles from './PetDetails.module.css';
import { useState } from "react";
import environment, { REACT_APP_API } from "../../../environment/environment";
import { toast } from "react-toastify";
import { Context } from '../../../context/UserContext'
import RoundedImage from "../../layout/RoundedImage";

export default function PetDetails() {

  const [token] = useState(localStorage.getItem('token') || null);
  const { getUserInformation } = useContext(Context);
  const [userInformation, setUserInformation] = useState(null);
  const [pet, setPet] = useState({});
  const { id } = useParams();
  const [isLoadingSchedule, setLoadingSchedule] = useState(false);
  const [isLoadingPetInformations, setLoadingPetInformations] = useState(true);
  const [isLoadingOwnerInformation, setLoadingOwnerInformation] = useState(true);
  const [ownerInformations, setOwnerInformations] = useState(null);

  const headers = {
    'Authorization': `Bearer ${JSON.parse(token)}`
  }

  async function schedule() {

    setLoadingSchedule(true);

    await api.patch(`pets/schedule/${pet._id}`, null, { headers })
    .then(response => {
      toast(response.data.message, {
        type: 'success'
      });
    })
    .catch(err => {
      console.error(err);
      toast(err.response.data.message || 'Houve um error ao concluir a ação', {
        type: 'error'
      });
    })
    .finally(() => {
      getPetInformations()
      .finally(() => {
        setLoadingSchedule(false);
      });
    })
  }

  function getOwnerInformations(ownerId) {

    setLoadingOwnerInformation(true);

    api.get(`users/${ownerId}`)
    .then(response => {
      console.log(response);
      setOwnerInformations(response.data.data);
    })
    .catch(err => {
      console.error(err);
      toast(err.response.data.message || 'Houve um error ao obter o perfil do dono.', {
        type: 'error'
      });
    })
    .finally(() => {
      
      setLoadingOwnerInformation(false);
      
    })

  }

  function getPetInformations() {

    setLoadingPetInformations(true);

    return new Promise((resolve, reject) => {
      api.get(`/pets/${id}`, { headers })
      .then(response => {
        const petResponse = response.data.pet;
        setPet(petResponse);
        setUserInformation(getUserInformation());
        getOwnerInformations(response.data.pet.user._id);
        resolve(petResponse);
      })
      .catch(err => {
        reject(err)
        toast(err.response?.message, {
          type: 'error'
        }); 
      })
      .finally(() => {
        setLoadingPetInformations(false);
        setTimeout(() => {
          console.log(pet);
        }, 2000)
      })
    })

    
  }

  useEffect(() => {
    getPetInformations();
  }, []);


  return (
    <>
      { isLoadingPetInformations ? 
        <div className={styles.loader_container}>
          <span className={styles.loader}></span>
        </div>
        
      : (
        <section className={styles.pet_details_container}>
          <div className={styles.petdetails_header}>
            <h1>Conhecendo o {pet.name}</h1>
            <p>Se tiver interesse, marque uma visita para conhecê-lo!</p>
          </div>
          <div className={styles.pet_images}>
            <div className={styles.pet_images_carousel}>
              {pet.images.map((image, index) => (
                <img
                  key={index}
                  src={`${REACT_APP_API}/images/pets/${image}`}
                  alt={pet.name}
                />
              ))}
            </div>
          </div>
          <p>
            <span className="bold">Peso:</span> {pet.weight}kg
          </p>
          <p>
            <span className="bold">Idade:</span> {pet.age} anos
          </p>
          { isLoadingSchedule ? 
            <>
              <div className={styles.loader_container}>
                <span className={styles.loader}></span>
              </div>
            </>
          : 
          !(userInformation?.id === pet.adopter?._id) ? (
            <button onClick={schedule}>Solicitar uma Visita</button>
          ) : (
            isLoadingOwnerInformation ? 
            <>
              <div className={`${styles.skeleton_container} skeleton`}></div>
            </> 
            : <div className={styles.owner_container}>
            <div className={styles.owner_content}>
              <RoundedImage
                src={`${environment.REACT_APP_API}/images/users/${ownerInformations.image}`}
                size={'75px'}
              />
              <div className={styles.owner_informations}>
                <p>Você já fez uma solicitação para este pet.</p>
                <p>Responsável: {ownerInformations.name}</p>
                <p>Contato: {ownerInformations.phone}</p>
                </div>
            </div>
          </div>
          )}
        </section>
      )}
    </>
  )
};