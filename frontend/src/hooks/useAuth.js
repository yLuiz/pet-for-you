import api from '../utils/api';
import useFlashMessage from './useFlashMessage';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function useAuth() {
  const [authenticated, setAuthenticated] = useState(false);
  const { setFlashMessage } = useFlashMessage();
  
  async function register(user) {
    let msgText = 'Cadastro realizado com sucesso!';
    let msgType = 'success';

    try {
      const data = await api.post('/users/register', user).then(response => response.data);
      
      await authUser(data);
    }
    catch(err) {
      msgText = err.response.data.message;
      msgType = 'error';
    }

    setFlashMessage(msgText, msgType);
  }

  async function authUser(data) {
    setAuthenticated(true);
    localStorage.setItem('token', JSON.stringify(data.token));
  }

  return { register };
}