import React from "react";
import { Route, Routes } from "react-router";
import "./App.css";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Login from "./Pages/Login";
import RouteProtection from "./Pages/MyPlaylists/RouteProtection";
import { UserContext } from "./store/UserContext";

function App() {
  const { hash } = window.location;
  const { logar } = React.useContext(UserContext);

  // Salva o token no localStorage
  const saveToken = (paramsInUrl) => {
    const paramsSplitUp = paramsInUrl.reduce((accumulater, currentValue) => {
      const [key, value] = currentValue.split("=");
      accumulater[key] = value;
      return accumulater;
    }, {});
    const { access_token, expires_in, token_type } = paramsSplitUp;

    localStorage.clear();
    localStorage.setItem("accessToken", access_token);
    localStorage.setItem("tokenType", token_type);
    localStorage.setItem("expiresIn", expires_in);
  };

  // Verifica se há algum token para ser pego na url
  const checkTokenUrl = () => {
    const stringAfterHashtag = hash.substring(1);
    const params = stringAfterHashtag.split("&");

    const haveToken = hash.includes("access_token");

    if (haveToken) {
      saveToken(params);
      return true;
    } else {
      return false;
    }
  };

  React.useEffect(() => {
    if(checkTokenUrl()) logar();
  }, [hash]);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/my-playlists/*" element={<RouteProtection />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
