import * as React from "react";
import styles from "./index.module.css";
import logo from "../../images/pernambuco_logo.png";

export default function Footer() {
  return (
    <div className={styles.footer_bar}>
      <a href="/">
        <img src={logo} className={styles.footer_logo} alt="logo" />
      </a>
      <div className={styles.info_box}>
        <span className={styles.info_title}>Universidade de Pernambuco</span>
        <span className={styles.info_title}>Campus Garanhuns</span>
        <span>
          R. Cap. Pedro Rodrigues - São José, Garanhuns - PE CEP: 55294-902 |
          Fone: (87) 3761-8227
        </span>
      </div>
    </div>
  );
}
