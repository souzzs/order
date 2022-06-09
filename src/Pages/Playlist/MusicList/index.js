import React from "react";
import Loader from "../../../Components/Loader";
import useFecth from "../../../Hooks/useFecth";
import { GET_MUSICS, PUT_ORDER_PLAYLIST } from "../../../services/api";
import { PlaylistContext } from "../../../store/PlaylistContext";
import styles from "./index.module.css";

const MusicList = () => {
  const { request, data, loading } = useFecth();
  const {
    setUrisSongs,
    dataPlaylist,
    editOrder,
    setUrisOrder,
    urisOrder,
    urisSongs,
  } = React.useContext(PlaylistContext);
  const [alertInformation, setAlertInformation] = React.useState(
    "Obs: É necessário alterar pelo menos uma música antes de finalizar."
  );
  const ids = dataPlaylist.tracks.items.map((music) => music.track.id);
  const idsString = ids.join(",");
  const [limit, setLimit] = React.useState(false);

  React.useEffect(() => {
    const getMusics = async () => {
      const { url, options } = GET_MUSICS(idsString);
      const { json } = await request(url, options);
      const uris = json.tracks.map((music) => music.uri);
      setUrisSongs(uris);
    };
    getMusics();
  }, []);

  React.useEffect(() => {
    if (urisSongs !== null) {
      if (urisOrder.length > 0) {
        setAlertInformation(
          "Músicas já adicionadas apresentam um brilho menor, basta clicar novamente para remove-lá da orderm"
        );
      }
      if (urisOrder.length <= urisSongs.length) {
        setLimit(false);
      } else {
        setLimit(true);
        setAlertInformation(
          "Todas as músicas já foram ordenadas. Finalize ou remova alguma música para continuar."
        );
      }
    }
  }, [urisSongs, urisOrder]);

  // Ele não substitui a música na ordem correta
  const addUri = (uri, currentTarget) => {
    if (editOrder) {
      if (!limit && !urisOrder.includes(currentTarget.id)) {
        setUrisOrder((u) => [...u, uri]);
        console.log('nao add', urisOrder, currentTarget.id);
      }
      if (urisOrder.includes(currentTarget.id)) {
        const newDataOrder = urisOrder.filter(
          (uri) => uri !== currentTarget.id
        );
        setUrisOrder(newDataOrder);
        console.log('ja add');
      }
    }
  };

  if (!data) return <Loader />;
  else
    return (
      <div className={`container ${styles.customContainer}`}>
        <p className={styles.alertInformation}>{alertInformation}</p>
        {data?.tracks.map((music) => {
          const singer = music.artists[0].name;
          const img = music.album.images[0].url;
          const nameMusic = music.name;
          return (
            <div
              id={music.uri}
              key={music.id}
              onClick={({ currentTarget }) => addUri(music.uri, currentTarget)}
              className={
                urisOrder.includes(music.uri)
                  ? `${styles.addMusic} ${styles.music}`
                  : `${styles.music}`
              }
            >
              <img src={img} alt={nameMusic} />
              <h4>{nameMusic}</h4>
              <p>{singer}</p>
            </div>
          );
        })}
      </div>
    );
};

export default MusicList;
