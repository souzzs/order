import React from "react";
import { useNavigate } from "react-router";
import styles from "./index.module.css";

const ItemPlayList = ({ id, name, images }) => {
  const navigate = useNavigate();

  return (
    <div
      className={styles.playlist}
      onClick={() => navigate(`playlist/${id}`)}
    >
      <div className={styles.contentDecoration}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className={styles.content}>
        <h3>{name.length >= 18 ? `${name.substring(0, 14)} ...` : name.substring(0, 18) }</h3>
        <img src={images[0].url} alt={name} />
      </div>
    </div>
  );
};

export default ItemPlayList;
