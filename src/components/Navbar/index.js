import * as React from "react";
import styles from "./index.module.css";
import logo from "../../images/logo_upe.png";

export default function Navbar() {
  const [selected, setSelected] = React.useState("inicio");

  const handleMenuClick = (menu) => {
    setSelected(menu);
  };

  return (
    <div className={styles.navbar_bar}>
      <div className={styles.navbar_group}>
        <a href="/">
          <img src={logo} className={styles.navbar_logo} alt="logo" />
        </a>
        <ul className={styles.menu}>
          <a href="/">
            <li
              className={`${styles.menu_item} ${
                selected === "inicio" ? styles.selected : ""
              }`}
              onClick={() => handleMenuClick("inicio")}
            >
              Início
            </li>
          </a>
          <a href="/eventos">
            <li
              className={`${styles.menu_item} ${
                selected === "eventos" ? styles.selected : ""
              }`}
              onClick={() => handleMenuClick("eventos")}
            >
              Eventos
            </li>
          </a>
          <a href="/papers">
            <li
              className={`${styles.menu_item} ${
                selected === "trabalhos" ? styles.selected : ""
              }`}
              onClick={() => handleMenuClick("trabalhos")}
            >
              Trabalhos
            </li>
          </a>
        </ul>
      </div>
      <div className={styles.red_bar}></div>
    </div>
  );
}
