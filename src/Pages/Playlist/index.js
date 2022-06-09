import React from "react";
import { useParams } from "react-router";
import Loader from "../../Components/Loader";
import useFecth from "../../Hooks/useFecth";
import { GET_PLAYLIST } from "../../services/api";
import { PlaylistContext } from "../../store/PlaylistContext";
import Header from "./Header";
import Information from "./Information";
import MusicList from "./MusicList";

const Playlist = () => {
  const params = useParams();
  const { request, data, error, loading } = useFecth();
  const {setDataPlaylist} = React.useContext(PlaylistContext);

  React.useEffect(() => {
    const getMusics = async () => {
      const idPlaylist = params.id;
      const { url, options } = GET_PLAYLIST(idPlaylist);
      const { json } = await request(url, options);
      setDataPlaylist(json)
    };
    getMusics();
  }, [params.id, request, setDataPlaylist]);

  if (loading || !data) return <Loader />;
  return (
    <section>
      <Header />
      <Information />
      <MusicList />
    </section>
  );
};

export default Playlist;
