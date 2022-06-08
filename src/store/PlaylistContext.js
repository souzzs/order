import React from "react";
import useFecth from "../Hooks/useFecth";
import { PUT_ORDER_PLAYLIST } from "../services/api";

export const PlaylistContext = React.createContext();

export const PlaylistStorage = ({ children }) => {
  const [editOrder, setEditOrder] = React.useState(false);
  const [urisOrder, setUrisOrder] = React.useState([]);
  const [urisSongs, setUrisSongs] = React.useState(null);
  const [dataPlaylist, setDataPlaylist] = React.useState(null);

  return (
    <PlaylistContext.Provider
      value={{
        dataPlaylist,
        setDataPlaylist,
        editOrder,
        setEditOrder,
        urisSongs,
        setUrisSongs,
        setUrisOrder,
        urisOrder
      }}
    >
      {" "}
      {children}{" "}
    </PlaylistContext.Provider>
  );
};
