import React from "react";
import useFecth from "../../Hooks/useFecth";
import { GET_PLAYLISTS } from "../../services/api";
import { UserContext } from "../../store/UserContext";
import styles from './index.module.css';
import ItemPlayList from "./ItemPlaylist";

const Home = () => {
  const ctx = React.useContext(UserContext);
  const { request, data, error } = useFecth();

  React.useEffect(() => {
    const dataPlaylists = async () => {
      const { url, options } = GET_PLAYLISTS(ctx.data.id);
      const { response, json } = await request(url, options);
    };
    dataPlaylists();
  }, []);
  return (
    <section>
      <div className="container">
        <h1 className={styles.titlePlaylist}>Suas playlists</h1>
        <div className={styles.containerPlaylist}>
          {data && data.items.map(item => {
            return (
              <ItemPlayList key={item.id} itemData={item} />
            )
          })}
        </div>
      </div>
    </section>
  );
};

export default Home;
