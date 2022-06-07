import React from "react";
import { useParams } from "react-router";
import Loader from "../../Components/Loader";
import useFecth from "../../Hooks/useFecth";
import { GET_PLAYLIST } from "../../services/api";
import Header from "./Header";
import MusicList from "./MusicList";

const Playlist = () => {
  const params = useParams();
  const { request, data, error, loading } = useFecth();
  const [actionOrder, setActionOrder] = React.useState(false);
  const [urisOrder, setUrisOrder] = React.useState([]);
  const [urisTotal, setUrisTotal] = React.useState(null);

  React.useEffect(() => {
    const getMusics = async () => {
      const idPlaylist = params.id;
      const {url, options} = GET_PLAYLIST(idPlaylist);
      await request(url, options);
    };
    getMusics();
  }, [params.id, request]);

  if(loading || !data) return <Loader />
  return (
    <section>
      <Header namePlaylist={data.name} actionOrder={actionOrder} setActionOrder={setActionOrder} urisOrder={urisOrder} urisTotal={urisTotal}/>
      <MusicList list={data.tracks.items} actionOrder={actionOrder} setUrisTotal={setUrisTotal} setUrisOrder={setUrisOrder}/>
    </section>
  );
}

export default Playlist;
