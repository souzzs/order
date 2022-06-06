import React from "react";
import { useNavigate } from "react-router";
import styles from "./index.module.css";

const ItemPlayList = ({ itemData }) => {
  const navigate = useNavigate();

  return (
    <div
      className={styles.playlist}
      onClick={() => navigate(`/playlist/${itemData.id}`)}
    >
      <div className={styles.contentDecoration}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className={styles.content}>
        <h3> {itemData.name}</h3>
        <img src={itemData.images[0].url} alt={itemData.name} />
      </div>
    </div>
  );
};

export default ItemPlayList;
