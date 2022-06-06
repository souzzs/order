import React from "react";
import useFecth from "../../../Hooks/useFecth";
import { PUT_ORDER_PLAYLIST } from "../../../services/api";
import styles from "./index.module.css";

const Header = ({
  namePlaylist,
  actionOrder,
  setActionOrder,
  urisOrder,
  urisTotal,
}) => {
  const {request, data} = useFecth();

  const actionButton = async () => {
    if (actionOrder) {
      setActionOrder(false);
      const musicNotOrder = urisTotal.filter(
        (music) => !urisOrder.includes(music)
      );
      const stringUris = urisOrder.concat(musicNotOrder).join(",");
      const body = {
        range_start: 0,
        insert_before: urisTotal.lenght,
      };
      const dataHref = window.location.pathname.split("/");
      const id = dataHref[2];

      const {url, options} = PUT_ORDER_PLAYLIST(id, stringUris, body);
      const {response, json} = await request(url, options);
      
      
    } else {
      setActionOrder(true);
      console.log("ordenar");
    }
  };

  return (
    <header className={styles.header}>
      <div className={`container ${styles.customContainer}`}>
        <h3>{namePlaylist}</h3>
        <button className={styles.buttonOrder} onClick={() => actionButton()}>
          {actionOrder ? "Finalizar" : "Ordenar"}
        </button>
        {actionOrder && (
          <button
            className={styles.buttonCancelar}
            onClick={() => setActionOrder(false)}
          >
            Cancelar
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
