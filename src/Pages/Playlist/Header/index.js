import React from "react";
import { useNavigate } from "react-router";
import Alert from "../../../Components/Alert";
import useFecth from "../../../Hooks/useFecth";
import { PUT_ORDER_PLAYLIST } from "../../../services/api";
import { PlaylistContext } from "../../../store/PlaylistContext";
import styles from "./index.module.css";

const Header = () => {
  const { request, error } = useFecth();
  const [sucess, setSucess] = React.useState(null);
  const navigate = useNavigate();
  const { dataPlaylist, editOrder, setEditOrder, urisSongs, urisOrder } =
    React.useContext(PlaylistContext);
  const [title, setTitle] = React.useState("");
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
    setSucess(response.ok);
    navigate("/my-playlists");
  };

  const actionButton = async () => {
    if (editOrder) {
      setEditOrder(false);
      saveOrder();
    } else {
      setEditOrder(true);
    }
  };

  React.useEffect(() => {
    if (editOrder && urisOrder.length <= urisSongs.length) {
      // Bug pois esta passando do máximo de música de a playlist tem, entretanto é só visual
      setTitle(`Escolha a ${urisOrder.length + 1}º música`);
    } else {
      setTitle(dataPlaylist.name);
    }
  }, [urisOrder, editOrder]);

  return (
    <header className={styles.header}>
      {sucess !== null && !sucess && <Alert message={error} type="error" />}
      {sucess !== null && sucess && <Alert message='Sucesso ao alterar sua playlist!!!' type="sucess" />}
      <div className={`container ${styles.customContainer}`}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.controls}>
          <button
            disabled={urisOrder.length > 0 || !editOrder ? false : true}
            className={styles.buttonOrder}
            onClick={() => actionButton()}
          >
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
      </div>
    </header>
  );
};

export default Header;
