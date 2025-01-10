import React, { useEffect, useState } from "react";
import Head from "next/head";
import CigfreeApp from "./CigfreeSrc/CigfreeApp";
import styles from "../styles/HeaderFolioNav.module.css";


const FolioNavAndRedirection = () => {
  const [activeButton, setActiveButton] = useState(null);
  const [activeHeader, setActiveHeader] =useState("")


// demarage sur le 1 er bouton
  useEffect(() => {
    setActiveButton(1);
  }, []);
  
  // les titles Header des composants activé
  const getHeadTitle = (buttonIndex) => {
    // console.log(activeButton, 'bouton activé')
    switch (buttonIndex) {
      case 1:
        return "It's Me";
      case 2:
        return "CigFree";
      case 3:
        return "Section 3";
      default:
        return "It's Me ! default"; 
    }
  };

  useEffect

  //Activation des boutons de la navbar
  const handleButtonClick = (buttonIndex) => {
    setActiveButton((prev)=> {
      const newButton = buttonIndex;
      setActiveHeader(getHeadTitle(newButton));
      return newButton
    });
  };



  return (
    <div className={styles.container}>
      <Head>
        <title>{activeHeader}</title>
      </Head>
      <nav className={styles.nav}>
        <button
          className={`${styles.button} ${activeButton === 1 ? styles["button-active"] : ""}`}
          onClick={() => handleButtonClick(1)}
        >
          It's Me
        </button>
        <button
          className={`${styles.button} ${activeButton === 2 ? styles["button-active"] : ""}`}
          onClick={() => handleButtonClick(2)}
        >
          CigFree
        </button>
        {/* <button
          className={`${styles.button} ${activeButton === 3 ? styles["button-active"] : ""}`}
          onClick={() => handleButtonClick(3)}
        >
          Bouton 3
        </button> */}
     
        <div className={styles["container-email"]}>
          <a href="mailto:gryspeerdt.camille@gmail.com">
            <img className={styles["emailIconPlane"]}src="/paper-plane.svg" alt="Icon" style={{ width: "50px", height: "50px" }} />
            <p>Email</p>
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
        {/* <div
          style={{
            display: activeButton === 3 ? "block" : "none",
            padding: "1rem",
            backgroundColor: "#f4f4f4",
          }}
        >
          Section 3 activée
        </div> */}
      </div>
    </div>
  );
};

export default FolioNavAndRedirection;
