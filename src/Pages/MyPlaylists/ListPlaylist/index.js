import React from "react";
import ItemPlayList from "../ItemPlaylist";
import styles from "./index.module.css";

const ListPlaylist = ({ data }) => {
  return (
    <section className={styles.content}>
      <div className="container">
        <h1 className={styles.titlePlaylist}>Suas playlists</h1>
        <div className={styles.containerPlaylist}>
          {data &&
            data.items.map(({ id, name, images }) => (
              <ItemPlayList key={id} id={id} name={name} images={images} />
            ))}
        </div>
      </div>
    </section>
  );
};

export default ListPlaylist;
