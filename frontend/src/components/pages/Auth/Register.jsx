
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Login.module.css';
import formStyles from '../../form/Form.module.css';

import Input from "../../form/Input";
import bgPets from '../../../assets/img/bg-pets.avif';

import { Context } from "../../../context/UserContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Register() {
  const [user, setUser] = useState();
  const { register, loading, authenticated, setAuthenticated } = useContext(Context);
  const [isShowingPassword, setIsShowingPassword] = useState({
    password: false,
    confirmpassword: false,
  });

  useEffect(() => {
    if (authenticated) {
      localStorage.removeItem('token');
      setAuthenticated(false);
    }
  }, [authenticated, setAuthenticated]);

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    register(user)
  }

  function handleViewPassword(field) {

    setIsShowingPassword({
      ...isShowingPassword,
      [field]: !isShowingPassword[field]
    });
  }

  return (
    <section className={styles.login_section}>
      <div className={styles.aplication_name}>
        <h1>PET FOR YOU</h1>
        <img src={bgPets} alt="Fundo de Pets" />
      </div>
      <div className={`${styles.form_container}`}>
        <div className={`${styles.form_content}`}>
          <h2>Cadastrado</h2>
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

              <div className={styles.password_input}>
                <Input
                  required={true}
                  text="Senha"
                  type={isShowingPassword['password'] ? 'text' : 'password'}
                  name="password"
                  placeholder="Digite sua senha"
                  handleChange={handleChange}
                />
                <button type='button' onClick={() => handleViewPassword('password')}>
                  {isShowingPassword['password'] ?
                    <FaEyeSlash />
                    : <FaEye />
                  }
                </button>
              </div>

              <div className={styles.password_input}>
                <Input
                  required={true}
                  text="Confirmação de senha"
                  type={isShowingPassword['confirmpassword'] ? 'text' : 'password'}
                  name="confirmpassword"
                  placeholder="Confirme sua senha"
                  handleChange={handleChange}
                />
                <button type='button' onClick={() => handleViewPassword('confirmpassword')}>
                  {isShowingPassword['confirmpassword'] ?
                    <FaEyeSlash />
                    : <FaEye />
                  }
                </button>
              </div>
            </div>
            <button
              disabled={loading}
              type="submit"
            > 
              {loading ? <span className={formStyles.loader}></span> : 'Cadastrar' }

            </button>
          </form>
          <p>
            Já tem conta? <Link to="/login">Clique aqui</Link>
          </p>
        </div>
      </div>
    </section>

  )
}