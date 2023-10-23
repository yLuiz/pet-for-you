import React, { useContext, useState } from 'react';
import Input from '../../form/Input';

import { useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Context } from '../../../context/UserContext';
import styles from '../../form/Form.module.css';


export default function Login() {

  const [user, setUser] = useState({});
  const { login, loading } = useContext(Context);
  const navigate = useNavigate();

  function handleChange(e) {
    setUser({...user, [e.target.name]: e.target.value});
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (loading) return;
    login(user);
  }

  const token = localStorage.getItem('token');
  useEffect(() => {
    if(token) {
      navigate('/');
    }
  }, [navigate, token])

  return (
    <section className={styles.form_container}>
      <h1>Login</h1>

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
          <Input
            required={true}
            text='Senha'
            name='password'
            type='password'
            placeholder='Digite o sua senha'
            handleChange={handleChange}
          />
          <button disabled={loading} type="submit"> { loading ? <span className={styles.loader}></span> : 'Entrar' } </button>
        </div>
      </form>
      <p>
        Não tem conta? <Link to="/register">Clique aqui</Link>
      </p>
    </section>
  )
}