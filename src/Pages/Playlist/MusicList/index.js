import React from "react";
import Loader from "../../../Components/Loader";
import useFecth from "../../../Hooks/useFecth";
import { GET_MUSICS, PUT_ORDER_PLAYLIST } from "../../../services/api";
import { PlaylistContext } from "../../../store/PlaylistContext";
import styles from "./index.module.css";

const MusicList = () => {
  const { request, data, loading } = useFecth();
  const { setUrisSongs, dataPlaylist, editOrder, setUrisOrder, urisOrder } = React.useContext(PlaylistContext);

  const ids = dataPlaylist.tracks.items.map((music) => music.track.id);
  const idsString = ids.join(",");

  React.useEffect(() => {
    const getMusics = async () => {
      const { url, options } = GET_MUSICS(idsString);
      const { json } = await request(url, options);
      const uris = json.tracks.map((music) => music.uri);
      setUrisSongs(uris);
    };
    getMusics();
  }, []);

  const addUri = (uri) => {
    if(editOrder){
      setUrisOrder((u) => [...u, uri]);
    }
  };

  if (!data) return <Loader />;
  else
    return (
      <div className={`container ${styles.customContainer}`}>
        {data?.tracks.map((music) => {
          const singer = music.artists[0].name;
          const img = music.album.images[0].url;
          const nameMusic = music.name;
          return (
            <div
              key={music.id}
              onClick={() => addUri(music.uri)}
              className={styles.music}
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
