import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../../utils/api';
import formStyles from '../../form/Form.module.css';
import Input from '../../form/Input';
import RoundedImage from '../../layout/RoundedImage';
import styles from './Profile.module.css';

import { Context } from '../../../context/UserContext';
import { useContext } from 'react';
import environment from '../../../environment/environment';
import { toast } from 'react-toastify';

export default function Profile() {

  const { authenticated } = useContext(Context);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  const [preview, setPreview] = useState();
  const [token] = useState(localStorage.getItem('token' || ''));
  const navigate = useNavigate();

  useEffect(() => {

    if(!authenticated) navigate('/login');

    else {
      api.get('/users/checkuser', {
        headers: { 
          'Authorization': `Bearer ${JSON.parse(token)}`
        }
      }).then(response => {
        setUser(response.data.data);
      })
    }
  }, [authenticated, navigate, token])

  function handleChange(e) {
    setUser({...user, [e.target.name]: e.target.value});
  }

  function onFileChange(e) {
    setUser({...user, [e.target.name]: e.target.files[0]});
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
          (user.image || preview) ? 
          (
            <RoundedImage
              src={preview ? URL.createObjectURL(preview) : 
              `${environment.REACT_APP_API}/images/users/${user.image}`} 
              alt={`Foto ${user.name}`} 
            />
          ) : null
        }
      </div>
      <form onSubmit={handleSubmit}>
        <div className={formStyles.form_inputs}>
          <Input 
            text="Imagem"
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
          <button disabled={loading} type="submit">
            { loading ? <span className={formStyles.loader}></span> : 'Editar' }
          </button>
        </div>
      </form>
    </section>
  )
}