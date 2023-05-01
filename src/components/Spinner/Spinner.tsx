import React from "react";
import styles from "./Spinner.module.css";

interface SpinnerProps {
  show: boolean;
}

const Spinner: React.FC<SpinnerProps> = ({ show }) => {
  return (
    <div
      className={styles.loader}
      style={{
        display: show ? "block" : "none",
      }}
    ></div>
  );
};

export default Spinner;
