import React from "react";
import { Route, Routes } from "react-router";
import Loader from "../../Components/Loader";
import useFecth from "../../Hooks/useFecth";
import { GET_PLAYLISTS } from "../../services/api";
import { UserContext } from "../../store/UserContext";
import Playlist from "../Playlist";
import ListPlaylist from "./ListPlaylist";
import styles from './index.module.css';

const MyPlaylists = () => {
  const ctx = React.useContext(UserContext);
  const { request, data, error, loading } = useFecth();

  React.useEffect(() => {
    const dataPlaylists = async () => {
      const { url, options } = GET_PLAYLISTS(ctx.data.id);
      await request(url, options);
    };
    dataPlaylists();
  }, []);

  if (error) return <div className={`container ${styles.error} ${styles.customContainer}`}><p>Erro ao buscar suas playlists</p></div>;
  else if (loading) return <div className={`container ${styles.customContainer}`}> <Loader /> </div>;
  else if (data)
    return (
      <Routes>
        <Route path="/" element={<ListPlaylist data={data} />} />
        <Route path="/playlist/:id" element={<Playlist />} />
      </Routes>
    );
  else return null;
};

export default MyPlaylists;
