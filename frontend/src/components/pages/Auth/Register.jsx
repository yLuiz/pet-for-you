
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../../form/Form.module.css';
import Input from "../../form/Input";

import { Context } from "../../../context/UserContext";

export default function Register() {
  const [user, setUser] = useState();
  const { register, loading } = useContext(Context);

  function handleChange(e) {
    setUser({...user, [e.target.name]: e.target.value})
  }
  
  function handleSubmit(e) {
    e.preventDefault()
    register(user)
  }

  return (
    <section className={styles.form_container}>
      <h1>Castrado</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.form_inputs}>
          <Input
            required={true}
            text="Nome"
            type="text"
            name="name"
            placeholder="Digite seu nome"
            handleChange={handleChange}
          />

          <Input
            required={true}
            text="Telefone"
            type="text"
            name="phone"
            placeholder="Digite seu telefone"
            handleChange={handleChange}
          />

          <Input
            required={true}
            text="Email"
            type="email"
            name="email"
            placeholder="Digite seu email"
            handleChange={handleChange}
          />

          <Input
            required={true}
            text="Senha"
            type="password"
            name="password"
            placeholder="Digite sua senha"
            handleChange={handleChange}
          />

          <Input
            required={true}
            text="Confirmação de senha"
            type="password"
            name="confirmpassword"
            placeholder="Confirme sua senha"
            handleChange={handleChange}
          />
        </div>
        <button 
          disabled={loading} 
          type="submit"

        > { loading ? <span className={styles.loader}></span> : 'Cadastrar'} </button>
      </form>
      <p>
        Já tem conta? <Link to="/login">Clique aqui</Link>
      </p>
    </section>
  )
}