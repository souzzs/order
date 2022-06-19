import React from "react";
import logo from "../../assets/logo.svg";
import iconButton from "../../assets/icon-button.svg";
import styles from "./index.module.css";
import { REDIRECT_URL_TOKEN } from "../../services/api";
import { UserContext } from "../../store/UserContext";
import Loader from "../../Components/Loader";
import Alert from "../../Components/Alert";

const Login = () => {
  const { logar, error, loading } = React.useContext(UserContext);

  // Verifica se há algum token no localStorage
  const checkTokenLocalStorage = () => {
    const accessToken = localStorage.getItem("accessToken");
    const tokenType = localStorage.getItem("tokenType");
    const expiresIn = localStorage.getItem("expiresIn");

    if (accessToken && tokenType && expiresIn) return true;
    else return false;
  };

  // Verifica se há um token no localStorage ou url, caso há é feito o login do usuário.
  React.useEffect(() => {
    if(checkTokenLocalStorage()) logar();
  }, []);

  if (loading)
    return (
      <div className={styles.backgroundLoader}>
        <Loader />
      </div>
    );
  else if (error) return <Alert message={error} type='error' />;
  else
    return (
      <>
        <section className={styles.login}>
          <div className={styles.content}>
            <img src={logo} alt="" />
            <p className={styles.phrase}>Organize músicas como preferir. </p>
            <button onClick={REDIRECT_URL_TOKEN}>
              <img src={iconButton} alt="" />
              Sign In
            </button>
            {error ? (
              <p className={styles.error}>
                Erro ao realizar o login. Tente novamente.{" "}
              </p>
            ) : undefined}
          </div>
        </section>
      </>
    );
};

export default Login;
