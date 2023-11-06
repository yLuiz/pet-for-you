import React, { createContext } from 'react';
import useAuth from '../hooks/useAuth';

const Context = createContext();

function UserProvider({ children }) {
  const { login, register, authenticated, logout, loading, isValidToken } = useAuth();
  

  return (
    <Context.Provider value={
      { 
        register, 
        logout, 
        login, 
        authenticated, 
        loading,
        isValidToken
      }
    }>
      { children }
    </Context.Provider>
  )
}

export { Context, UserProvider };
