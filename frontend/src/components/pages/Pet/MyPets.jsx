import React, { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../../utils/api";
import environment from "../../../environment/environment";
import RoundedImage from "../../layout/RoundedImage";
import styles from "./Dashboard.module.css";
import { toast } from "react-toastify";
import PetNotFound from "./PetNotFound";

export default function MyPets() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [token] = useState(localStorage.getItem("token") || null);
  const [petIdRemoving, setPetIdRemoving] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    (async function request() {
      await api
        .get("/pets/mypets", {
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
        })
        .then((response) => {
          setPets(response.data.userPets);
          setLoading(false);
        });
    })();

    if (!token) navigate("/login");
  }, [token]);

  async function removePet(pet) {
    setPetIdRemoving(pet._id);

    const response = await api.delete("/pets/" + pet._id);

    toast(response.data.message, {
      type: "success",
    });

    setLoading(true);
    const petResponse = await api.get("/pets/mypets");
    setPets(petResponse.data.userPets);
    setLoading(false);
    setPetIdRemoving("");
  }

  async function concludeAdoption(id) {
    await api
      .patch(`/pets/conclude/${id}`, null, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        const listPets = pets.filter((pet) => pet._id !== id);
        setPets(listPets);

        toast(response.data.message, {
          type: "success",
        });
      })
      .catch((err) => {
        console.error(err);

        toast(err.response.data.message || err.message, {
          type: "error",
        });
      });
  }

  return (
    <section>
      <div className={styles.petslist_header}>
        <h1>Meus Pets</h1>
        <p>Aqui você pode visualizar e editar seus pets postados.</p>
        <Link to="/pet/add">Cadastrar Pet</Link>
      </div>

      <div className={styles.petslist_container}>
        {pets.length ? (
          <>
            <p>Meus Pets cadastrados</p>
            <div>
              { pets.map((pet) => (
                <div className={styles.petlist_row} key={pet._id}>
                  <RoundedImage
                    key={pet.images[0]}
                    src={
                      environment.REACT_APP_API +
                      `/images/pets/${pet.images[0]}`
                    }
                    width="px75"
                    alt={pet.name}
                  />

                  <span className="bold">{pet.name}</span>
                  <div className={styles.actions}>
                    {pet.available ? (
                      <>
                        {pet.adopter ? (
                          <button
                            onClick={() => concludeAdoption(pet._id)}
                            className={styles.conclude_btn}
                          >
                            {" "}
                            Concluir adoção{" "}
                          </button>
                        ) : null}
                        <Link to={`/pet/edit/${pet._id}`}>Editar</Link>
                        <button
                          className={styles.delete}
                          onClick={() => removePet(pet)}
                          disabled={petIdRemoving === pet._id}
                        >
                          {petIdRemoving === pet._id
                            ? "Removendo..."
                            : "Excluir"}
                        </button>
                      </>
                    ) : (
                      <p>Pet já adotado!</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : null}
        {loading ? (
          <div className={styles.loader_row}>
            <span className={styles.loader}></span>
          </div>
        ) : !pets.length ? (
          <PetNotFound paragraph="Não há Pets cadastrados" />
        ) : null}
      </div>
    </section>
  );
}
