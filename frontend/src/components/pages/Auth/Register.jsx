
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../../form/Form.module.css';
import Input from "../../form/Input";

import { Context } from "../../../context/UserContext";

export default function Register() {
  const [user, setUser] = useState();
  const { register } = useContext(Context);
  
  function handleChange(e) {
    setUser({...user, [e.target.name]: e.target.value})
  }
  
  function handleSubmit(e) {
    e.preventDefault()
    register(user)
  }

  return (
    <section className={styles.form_container}>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.form_inputs}>
          <Input
            text="Nome"
            type="text"
            name="name"
            placeholder="Digite seu nome"
            handleChange={handleChange}
          />

          <Input
            text="Telefone"
            type="text"
            name="phone"
            placeholder="Digite seu telefone"
            handleChange={handleChange}
          />

          <Input
            text="Email"
            type="email"
            name="email"
            placeholder="Digite seu email"
            handleChange={handleChange}
          />

          <Input
            text="Senha"
            type="password"
            name="password"
            placeholder="Digite sua senha"
            handleChange={handleChange}
          />

          <Input
            text="Confirmação de senha"
            type="password"
            name="confirmpassword"
            placeholder="Confirme sua senha"
            handleChange={handleChange}
          />
        </div>
        <input type="submit" value="Cadastrar" />
      </form>
      <p>
        Já tem conta? <Link to="/login">Clique aqui</Link>
      </p>
    </section>
  )
}