import api from '../utils/api';
import { jwtDecode } from 'jwt-decode';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'

export default function useAuth() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
      setAuthenticated(true);
    }
  }, []);
  
  async function login(user) {
    let msgText = "Login realizado com sucesso";
    let msgType = "success";

    try {

      setLoading(true);

      const data = await api.post('/users/login', user).then(response => {
        
        setLoading(false);

        return response.data;
      });

      await authUser(data);
    } catch (err) {
      msgText = err.response.data.message || "Credênciais inválidas";
      msgType = "error";

      console.error(err);
      
      setLoading(false);
      
    }
    finally {
      toast(msgText, {
        type: msgType,
        autoClose: 1000,
        closeOnClick: true,
      });
    }
  }
  
  async function authUser(data) {
    setAuthenticated(true);
    localStorage.setItem('token', JSON.stringify(data.token));

    navigate('/');
  }

  async function register(user) {

    setLoading(true);
    let msgText = 'Cadastro realizado com sucesso!';
    let msgType = 'success';

    try {
      const data = await api.post('/users/register', user).then(response => response.data);      
      await authUser(data);
    }
    catch(err) {
      console.error(err.response)
      msgText = err.response.data.message;
      msgType = 'error';
    }

    finally {
      setLoading(false);
    }

    toast(msgText, {
      type: msgType
    });
  }

  function logout() {
    const msgText = "Logout realizado com sucesso";
    const msgType = 'success';
    setAuthenticated(false);
    localStorage.removeItem('token');
    api.defaults.Authorization = undefined;
    navigate('/login');

    
    toast(msgText, {
      type: msgType,
      autoClose: 1000,
      closeOnClick: true,
    });
    
  }

 function getUserInformation() {
    try {
      const token = localStorage.getItem('token');

      if (!token) return null;

      const tokenParsed = JSON.parse(token);

      const tokenDecoded = jwtDecode(tokenParsed);
      return tokenDecoded;
    }
    catch (error) {
      console.error(error);
      return null;
    }
  }

  function isValidToken(token) {
    if (!token) return false;

    try {

      const tokenParsed = JSON.parse(token);

      const tokenDecoded = jwtDecode(tokenParsed);
      if (Date.now() >= tokenDecoded.exp * 1000) {
        return false;
      }

      return true;
    }
    catch (error) {
      console.error(error);
      return false;
    }

  }

  return { authenticated, register, logout, login, loading, isValidToken, setAuthenticated, getUserInformation };
}