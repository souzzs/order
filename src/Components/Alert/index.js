import React from "react";
import styles from "./index.module.css";

const Alert = ({ message, type }) => {
  const [show, setShow] = React.useState(true);

  React.useEffect(() => {
    const timerShow = setTimeout(() => {
      setShow(false);
    }, 2000);

    return () => clearTimeout(timerShow);
  }, []);

  if (show) return <div className={styles.errorContainer} style={{backgroundColor: `${type === 'error' ? '#e54' : '#0da54e'}`}}>{message}</div>;
  else return null;
};

export default Alert;
