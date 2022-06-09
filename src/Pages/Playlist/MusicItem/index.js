import React from "react";
import { PlaylistContext } from "../../../store/PlaylistContext";
import styles from './index.module.css';

const MusicItem = ({ uri, id, img, name, singer, limit }) => {
    const {urisOrder, setUrisOrder, editOrder} = React.useContext(PlaylistContext)

  // Ele não substitui a música na ordem correta
  const addUri = (uri, currentTarget) => {
    if (editOrder) {
      if (!limit && !urisOrder.includes(currentTarget.id)) {
        setUrisOrder((u) => [...u, uri]);
      }
      if (urisOrder.includes(currentTarget.id)) {
        const newDataOrder = urisOrder.filter(
          (uri) => uri !== currentTarget.id
        );
        setUrisOrder(newDataOrder);
      }
    }
  };

  return (
    <div
      id={uri}
      key={id}
      onClick={({ currentTarget }) => addUri(uri, currentTarget)}
      className={
        urisOrder.includes(uri)
          ? `${styles.addMusic} ${styles.music}`
          : `${styles.music}`
      }
    >
      <img src={img} alt={name} />
      <h4>{name}</h4>
      <p>{singer}</p>
    </div>
  );
};

export default MusicItem;
