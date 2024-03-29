import React, { useContext, useState } from 'react';
import Input from '../../form/Input';
import bgPets from '../../../assets/img/bg-pets.avif';
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Context } from '../../../context/UserContext';
import formStyles from '../../form/Form.module.css';
import styles from './Login.module.css';


export default function Login() {

  const [user, setUser] = useState({});
  const { login, loading } = useContext(Context);
  const navigate = useNavigate();
  const [isShowingPassword, setIsShowingPassword] = useState({
    password: false,
    confirmpassword: false,
  });

  function handleViewPassword(field) {
    setIsShowingPassword({
      ...isShowingPassword,
      [field]: !isShowingPassword[field]
    });
  }

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (loading) return;
    login(user);
  }

  const token = localStorage.getItem('token');
  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [navigate, token])

  return (
    <section className={styles.login_section}>
      <div className={styles.aplication_name}>
        <h1>PET FOR YOU</h1>
        <img src={bgPets} alt="Fundo de Pets"/>
      </div>
      <div className={`${styles.form_container}`}>
        <div className={`${styles.form_content}`}>
          <h2>LOGIN</h2>

          <form onSubmit={handleSubmit}>
            <div className={styles.form_inputs}>
              <Input
                required={true}
                text='Email'
                name='email'
                type='email'
                placeholder='Digite o seu email'
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
              <button disabled={loading} type="submit"> {loading ? <span className={formStyles.loader}></span> : 'Entrar'} </button>
            </div>
          </form>
          <p>
            Não tem conta? <Link to="/register">Clique aqui</Link>
          </p>
        </div>
      </div>
    </section>
  )
}