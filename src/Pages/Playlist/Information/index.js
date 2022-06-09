import React from "react";
import { PlaylistContext } from "../../../store/PlaylistContext";
import styles from "./index.module.css";

const Information = () => {
  const [widthScreen, setWidthScreen] = React.useState(
    document.body.offsetWidth
  );
  const { urisOrder, urisSongs, editOrder } = React.useContext(PlaylistContext);
  const [widthProgressBar, setWidthProgressBar] = React.useState(0);

  React.useEffect(() => {
    window.addEventListener("resize", () => {
      setWidthScreen(document.body.offsetWidth);
    });
  }, []);

  React.useEffect(() => {
    const w = Math.floor(widthScreen / urisSongs?.length) * urisOrder?.length;
    setWidthProgressBar(w);
  }, [urisOrder, urisSongs, widthScreen]);

  if (!editOrder) return null;
  return (
    <section>
      <div className={styles.bgBaclks}>
        <div
          className={styles.progressBar}
          style={{ width: `${widthProgressBar}px` }}
        ></div>
      </div>
    </section>
  );
};

export default Information;
