import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../../utils/api';
import formStyles from '../../form/Form.module.css';
import Input from '../../form/Input';
import RoundedImage from '../../layout/RoundedImage';
import styles from './Profile.module.css';

import { useContext } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from 'react-toastify';
import { Context } from '../../../context/UserContext';
import environment from '../../../environment/environment';


export default function Profile() {

  const { authenticated } = useContext(Context);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  const [preview, setPreview] = useState();
  const [token] = useState(localStorage.getItem('token' || ''));
  const navigate = useNavigate();
  const [isShowingPassword, setIsShowingPassword] = useState({
    password: false,
    confirmpassword: false,
  });

  useEffect(() => {

    if (!authenticated) navigate('/login');

    else {      
      api.get('/users/checkuser', {
        headers: {
          'Authorization': `Bearer ${JSON.parse(token)}`
        }
      })
      .then(response => {
        setUser(response.data.data);
      })
    }
  }, [authenticated, navigate, token])

  function handleViewPassword(field) {

    setIsShowingPassword({
      ...isShowingPassword,
      [field]: !isShowingPassword[field]
    });
  }

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  function onFileChange(e) {
    setUser({ ...user, [e.target.name]: e.target.files[0] });
    setPreview(e.target.files[0]);
  }

  async function handleSubmit(e) {
    e.preventDefault()

    let msgType = 'success';

    const formData = new FormData();
    Object.keys(user).forEach(key => formData.append(key, user[key]));

    setLoading(true);

    const data = await api.patch(`/users/edit/${user._id}`, formData, {
      headers: {
        'Authorization': `Bearer ${JSON.parse(token)}`,
        'Content-Type': 'multipart/form-data'
      }
    }).then(response => {
      navigate('/');
      return response.data;
    })
      .catch(err => {

        console.error(err);

        msgType = 'error';
        return err.response.data;
      })
      .finally(() => {
        setLoading(false);
      })

    toast(data.message, {
      type: msgType
    });
  }

  return (
    <section className={formStyles.form_container}>
      <div className={styles.profile_header}>
        <h1>Perfil</h1>
        {
          (
            <RoundedImage
              src={ preview ? URL.createObjectURL(preview) : `${environment.REACT_APP_API}/images/users/${user.image}`}
              alt={`Foto ${user.name}`}
              size='200px'
            />
          )
        }
      </div>
      <form onSubmit={handleSubmit}>
        <div className={formStyles.form_inputs}>
          <Input
            text="Imagem"
            fileType='image'
            type="file"
            name="image"
            handleChange={onFileChange}
          />
          <Input
            text="Nome"
            type="text"
            name="name"
            value={user.name || ''}
            placeholder="Digite seu nome"
            handleChange={handleChange}
          />

          <Input
            text="Telefone"
            mask={'(99) 9 9999-9999'}
            type="text"
            name="phone"
            value={user.phone || ''}
            placeholder="Digite seu telefone"
            handleChange={handleChange}
          />

          <Input
            text="Email"
            type="email"
            name="email"
            value={user.email || ''}
            placeholder="Digite seu email"
            handleChange={handleChange}
          />

          <div className={formStyles.password_input}>
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

          <div className={formStyles.password_input}>
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
          <button disabled={loading} type="submit">
            {loading ? <span className={formStyles.loader}></span> : 'Editar'}
          </button>
          <Link className={formStyles.backButton} to="/pet/mypets">
            Voltar
          </Link>
        </div>
      </form>
    </section>
  )
}