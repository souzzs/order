import React from "react";
import { Route, Routes } from "react-router";
import Loader from "../../Components/Loader";
import useFecth from "../../Hooks/useFecth";
import { GET_PLAYLISTS } from "../../services/api";
import { UserContext } from "../../store/UserContext";
import Playlist from "../Playlist";
import ListPlaylist from "./ListPlaylist";
import styles from "./index.module.css";
import { PlaylistStorage } from "../../store/PlaylistContext";
import Alert from "../../Components/Alert";

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

  if (loading)
    return (
      <div className={`container ${styles.customContainer}`}>
        {" "}
        <Loader />{" "}
      </div>
    );
  else if (error) return <Alert type='error' message={error} />;
  else if (data)
    return (
      <Routes>
        <Route path="/" element={<ListPlaylist data={data} />} />
        <Route
          path="/playlist/:id"
          element={
            <PlaylistStorage>
              <Playlist />
            </PlaylistStorage>
          }
        />
      </Routes>
    );
  else return null;
};

export default MyPlaylists;
