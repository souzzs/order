import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";
import { UserContext } from "../../store/UserContext";
import styles from "./index.module.css";

const Header = () => {
  const { logado, data } = React.useContext(UserContext);
  if(!logado) return null
  else return (
    <header className={styles.header}>
      <div className={`container ${styles.flexContainer}`}>
        <Link to='/my-playlists'> <img src={logo} alt="" /> </Link>
        <h3 className={styles.welcome}>Bem vindo, {data.display_name}!</h3>
      </div>
    </header>
  );
};

export default Header;
