import React from "react";
import useFecth from "../Hooks/useFecth";
import { GET_USER } from "../services/api";
import { useNavigate } from "react-router";

export const UserContext = React.createContext();

export const UserStorage = ({ children }) => {
  const [data, setData] = React.useState(null);
  const [logado, setLogado] = React.useState(false);
  const { request, error, loading } = useFecth();
  const navigate = useNavigate();

  const logar = async () => {
    const {url, options} = GET_USER();
    const {response, json} = await request(url, options);

    if(response.ok) {
      setData(json);
      setLogado(true);
      navigate('/my-playlists');
    } else {
      localStorage.clear();
    }
  }

  return <UserContext.Provider value={{logar, logado, data, error, loading}}>{children}</UserContext.Provider>;
};
