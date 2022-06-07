import React from "react";
import { Navigate } from "react-router";
import MyPlaylists from ".";
import { UserContext } from "../../store/UserContext";

const RouteProtection = () => {
  const { logado } = React.useContext(UserContext);

  if (logado) return <MyPlaylists />;
  else if (logado === false) return <Navigate to="/" />;
  else return null;
};

export default RouteProtection;
