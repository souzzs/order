import React from "react";
import { useNavigate } from "react-router";
import useFecth from "../../../Hooks/useFecth";
import { PUT_ORDER_PLAYLIST } from "../../../services/api";
import { PlaylistContext } from "../../../store/PlaylistContext";
import styles from "./index.module.css";

const Header = () => {
  const { request, error, loading } = useFecth();
  const navigate = useNavigate();
  const { dataPlaylist, editOrder, setEditOrder, urisSongs, urisOrder} =
    React.useContext(PlaylistContext);

  const saveOrder = async () => {
    const songsNoOrder = urisSongs.filter((song) => !urisOrder.includes(song));
    const urisString = urisOrder.concat(songsNoOrder).join(",");
    const idPlaylist = dataPlaylist.id;
    const body = {
      range_start: 0,
      insert_before: urisSongs.lenght,
    };

    const { url, options } = PUT_ORDER_PLAYLIST(idPlaylist, urisString, body);
    const {response} = await request(url, options);
    
    if(response.ok) navigate('/my-playlists');
  };

  const actionButton = async () => {
    if (editOrder) {
      setEditOrder(false);
      saveOrder();
    } else {
      setEditOrder(true);
    }
  };

  return (
    <header className={styles.header}>
      <div className={`container ${styles.customContainer}`}>
        <h3>{dataPlaylist.name}</h3>
        <button className={styles.buttonOrder} onClick={() => actionButton()}>
          {editOrder ? "Finalizar" : "Ordenar"}
        </button>
        {editOrder && (
          <button
            className={styles.buttonCancelar}
            onClick={() => setEditOrder(false)}
          >
            Cancelar
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
