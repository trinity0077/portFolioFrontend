import React, { useState } from "react";
import CigfreeApp from "./CigfreeSrc/CigfreeApp";
import styles from "../styles/HeaderFolioNav.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus } from "@fortawesome/free-solid-svg-icons";

const FolioNavAndRedirection = () => {
  const [activeButton, setActiveButton] = useState(null);

  const handleButtonClick = (buttonIndex) => {
    setActiveButton(buttonIndex);
  };

  return (
    <div className={styles.Container}>
      <nav style={{ display: "flex", justifyContent: "space-around", padding: "1rem" }}>
        <button
          className={`${styles.button} ${activeButton === 1 ? styles["button-active"] : ""}`}
          onClick={() => handleButtonClick(1)}
        >
          About Me
        </button>
        <button
          className={`${styles.button} ${activeButton === 2 ? styles["button-active"] : ""}`}
          onClick={() => handleButtonClick(2)}
        >
          CigFree
        </button>
        <button
          className={`${styles.button} ${activeButton === 3 ? styles["button-active"] : ""}`}
          onClick={() => handleButtonClick(3)}
        >
          Bouton 3
        </button>
     
        <div className={styles["container-email"]}>
          <a href="mailto:gryspeerdt.camille@gmail.com">
            <FontAwesomeIcon icon={faMinus} className={styles.icon} />
            <p className={styles.text}>Email</p>
          </a>
        </div>
      </nav>

      <div>
        <div
          style={{
            display: activeButton === 1 ? "block" : "none",
            padding: "1rem",
            backgroundColor: "#f4f4f4",
          }}
        >
          Section 1 activée
        </div>
        <div style={{ display: activeButton === 2 ? "block" : "none" }}>
          <CigfreeApp />
        </div>
        <div
          style={{
            display: activeButton === 3 ? "block" : "none",
            padding: "1rem",
            backgroundColor: "#f4f4f4",
          }}
        >
          Section 3 activée
        </div>
      </div>
    </div>
  );
};

export default FolioNavAndRedirection;
