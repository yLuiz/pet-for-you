import { Link } from 'react-router-dom';

import styles from './Navbar.module.css';

import Logo from '../../assets/img/logo.png';

import React, { useContext, useState } from 'react';
import { Context } from '../../context/UserContext';

export default function Navbar() {

  const { authenticated, logout } = useContext(Context);
  const [ active, setActive ] = useState(false);
  const [ activeClass, setActiveClass] = useState("");

  function setShowMenu() {
    setActive(!active);
    if(!active) {
      setActiveClass('active');
    } else {
      setActiveClass('');
    }
  }

  return ( 
    <nav className={styles.navbar}>
      <div className={styles.navbar_logo}>
        <img src={Logo} alt="Pet For You Logo" />
        <h2>Pet For You</h2>
      </div>
      <span onClick={setShowMenu} className={`${styles.menuHamburger } ${styles[activeClass]}`}></span>
      <ul onClick={setShowMenu} className={ active ? styles.active : null}>
        <li>
          <Link to="">Adotar</Link>
        </li>

        { authenticated ?
          (
            <>
              <li>
                <Link to="/pet/myadoptions">Minhas adoções</Link>
              </li>
            
              <li>
                <Link to="/pet/mypets">Meus Pets</Link>
              </li>
            
              <li>
                <Link to="user/profile">Perfil</Link>
              </li>
              <li onClick={logout}>Sair</li>
            </>
          ) : ( 
            <>
              <li>
                <Link to="login">Entrar</Link>
              </li>

              <li>
                <Link to="register">Cadastrar</Link>
              </li>
            </>
          )
        } 
      </ul>
    </nav>
  )
}