import React from "react";
import Loader from "../../../Components/Loader";
import useFecth from "../../../Hooks/useFecth";
import { GET_MUSICS, PUT_ORDER_PLAYLIST } from "../../../services/api";
import styles from "./index.module.css";

const MusicList = ({ list, actionOrder, setUrisTotal, setUrisOrder}) => {
  const ids = list.map((music) => music.track.id);
  const idsString = ids.join(",");
  const { request, data, loading } = useFecth();

  React.useEffect(() => {
    const getMusics = async () => {
      const { url, options } = GET_MUSICS(idsString);
      const { json, response } = await request(url, options);
      const uris = json.tracks.map(music => music.uri);
      setUrisTotal(uris);
    };
    getMusics();
  }, []);

  const addUri = (uri) => {
    if(actionOrder){
      // Erro
      setUrisOrder((u) => [...u, uri])
    } 
  }

  const teste = async () => {
    const body = {
      range_start: 0,
      insert_before: 3,
    };
    const dataHref = window.location.pathname.split('/');
    const id = dataHref[2];
    const uris = data.tracks.map(music => music.uri).join(',');
    
    const uriTeste = 'spotify:track:4iV5W9uYEdYUVa79Axb7Rh,spotify:track:1301WleyT98MSxVHPZCA6M,spotify:episode:512ojhOuo1ktJprKbVcKyQ';
    const {url, options} = PUT_ORDER_PLAYLIST(id, uriTeste, body);
    const {response, json} = await request(url, options);

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
            <div key={music.id} onClick={() => addUri(music.uri)} className={styles.music}>
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
