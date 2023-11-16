import { NavLink } from "react-router-dom";
import Logo from "../../assets/img/logo.png";
import styles from "./Navbar.module.css";

import React, { useContext, useState } from "react";
import { Context } from "../../context/UserContext";

import { BiUserPlus } from "react-icons/bi";
import { BsHouseHeartFill } from "react-icons/bs";
import { ImExit } from "react-icons/im";
import { MdFace, MdPets } from "react-icons/md";
import { PiKeyholeFill } from "react-icons/pi";
import { RiHandHeartLine } from "react-icons/ri";

export default function Navbar() {
  const { authenticated, logout } = useContext(Context);
  const [active, setActive] = useState(false);
  const [activeClass, setActiveClass] = useState("");

  const routerLinks = {
    profile: "/user/profile",
    adoptions: "/pet/myadoptions",
    myPets: "/pet/mypets",
    login: "/login",
    register: "/register",
    adopt: "/",
  };

  function setShowMenu() {
    setActive(!active);
    if (!active) {
      setActiveClass("active");
    } else {
      setActiveClass("");
    }
  }

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar_logo}>
        <img src={Logo} alt="Pet For You Logo" />
        <h2>PET FOR YOU</h2>
      </div>
      <span
        onClick={setShowMenu}
        className={`${styles.menuHamburger} ${styles[activeClass]}`}
      ></span>
      <ul onClick={setShowMenu} className={active ? styles.active : null}>
        { authenticated ? (
          <>
            <li className={styles.flex_items_justify_center}>
              <RiHandHeartLine />
              <NavLink
                className={({ isActive }) => [
                  isActive ? styles.active_router : "",
                ]}
                to={routerLinks.adopt}
              >
                Adotar
              </NavLink>
            </li>
            <li className={styles.flex_items_justify_center}>
              <BsHouseHeartFill />
              <NavLink
                className={({ isActive }) => [
                  isActive ? styles.active_router : "",
                ]}
                to={routerLinks.adoptions}
              >
                Minhas adoções
              </NavLink>
            </li>

            <li className={styles.flex_items_justify_center}>
              <MdPets />
              <NavLink
                className={({ isActive }) => [
                  isActive ? styles.active_router : "",
                ]}
                to={routerLinks.myPets}
              >
                Meus Pets
              </NavLink>
            </li>

            <li className={styles.flex_items_justify_center}>
              <MdFace />
              <NavLink
                className={({ isActive }) => [
                  isActive ? styles.active_router : "",
                ]}
                to={routerLinks.profile}
              >
                Perfil
              </NavLink>
            </li>
            <li
              style={{ gap: "8px", padding: "8px" }}
              className={styles.flex_items_justify_center}
              onClick={logout}
            >
              <ImExit />
              Sair
            </li>
          </>
        ) : (
          <>
            <li className={styles.flex_items_justify_center}>
              <PiKeyholeFill />
              <NavLink
                className={({ isActive }) => [
                  isActive ? styles.active_router : "",
                ]}
                to={routerLinks.login}
              >
                Entrar
              </NavLink>
            </li>

            <li className={styles.flex_items_justify_center}>
              <BiUserPlus />
              <NavLink
                className={({ isActive }) => [
                  isActive ? styles.active_router : "",
                ]}
                to={routerLinks.register}
              >
                
                Cadastrar
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
