import React from "react";
import { useNavigate } from "react-router";
import Alert from "../../../Components/Alert";
import Loader from "../../../Components/Loader";
import useFecth from "../../../Hooks/useFecth";
import { GET_MUSICS } from "../../../services/api";
import { PlaylistContext } from "../../../store/PlaylistContext";
import MusicItem from "../MusicItem";
import styles from "./index.module.css";

const MusicList = () => {
  const { request, data, loading, error } = useFecth();
  const { setUrisSongs, dataPlaylist, editOrder, urisOrder, urisSongs } =
    React.useContext(PlaylistContext);
  const [alertInformation, setAlertInformation] = React.useState(
    "Obs: É necessário alterar pelo menos uma música antes de finalizar."
  );
  const navigate = useNavigate();
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

  if (error) {
    navigate("/my-playlists");
    return <Alert error={error} type='error'/>;
  } else if (loading) <Loader />;
  else if (data)
    return (
      <div
        className={`container ${styles.customContainer} ${
          editOrder ? styles.edit : styles.noEdit
        }`}
      >
        <p className={styles.alertInformation}>{alertInformation}</p>
        {data?.tracks.map((music) => {
          const singer = music.artists[0].name;
          const img = music.album.images[0].url;
          const nameMusic = music.name;
          return (
            <MusicItem
              key={music.id}
              uri={music.uri}
              id={music.id}
              img={img}
              name={nameMusic}
              singer={singer}
              limit={limit}
            />
          );
        })}
      </div>
    );
  else return null;
};

export default MusicList;
