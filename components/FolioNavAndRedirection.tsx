import { TypingAnimation } from "../modules/typingAnimation";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import CigfreeApp from "./CigfreeSrc/CigfreeApp";
import HomeEmailContact from "./EmailContactPage/HomeEmailContact";
import styles from "../styles/HeaderFolioNav.module.css";

const FolioNavAndRedirection = () => {
  const [activeButton, setActiveButton] = useState<number | null>(1);
  const [activeHeader, setActiveHeader] = useState("");
  const [showProjectsMenu, setShowProjectsMenu] = useState(false); // Gère le menu déroulant

  useEffect(() => {
    setActiveButton(1);
    setActiveHeader(getHeadTitle(1));
  }, []);

  const getHeadTitle = (buttonIndex: number) => {
    switch (buttonIndex) {
      case 1:
        return "It's Me";
      case 2:
        return "CigFree";
      case 3:
        return "Contact";
      default:
        return "It's Me ! default";
    }
  };

  const handleButtonClick = (buttonIndex: number) => {
    setActiveButton((prev) => {
      const newButton = buttonIndex;
      setActiveHeader(getHeadTitle(newButton));
      return newButton;
    });
  };

  const handleOpenProject = (url: string) => {
    window.open(url, "_blank");
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

        {/* Projet avec menu déroulant */}
        <div className={styles.dropdown}>
        <button
  className={`${styles.button} ${styles["projects-button"]} ${
    showProjectsMenu || activeButton === 2 ? styles["button-active"] : ""
  }`}
  onClick={() => setShowProjectsMenu((prev) => !prev)}
>
  Projets
</button>
{showProjectsMenu && (
  <div
    className={styles.dropdownMenu}
    onMouseLeave={() => setShowProjectsMenu(false)}
  >
<button
  onClick={() => {
    handleButtonClick(2);
    setShowProjectsMenu(false); // fermer le menu au clic
  }}
>
  CigFree
</button>
  <button onClick={() => {
    handleOpenProject("https://newspaper-front-two.vercel.app");
    setShowProjectsMenu(false);}}>
      Morning News
  </button>
  <button onClick={() => {
    handleOpenProject("https://mymoviez-frontend-nine.vercel.app/");
    setShowProjectsMenu(false);}}>
      My Moviez
  </button>

  </div>
)}



 </div>

        <button
          className={`${styles["container-email"]} ${activeButton === 3 ? styles["Active-container-email"] : ""}`}
          onClick={() => handleButtonClick(3)}
        >
          <img
            className={`${styles["emailIconPlane"]} ${activeButton === 3 ? styles["Active-emailIconPlane"] : ""}`}
            src="/paper-plane.svg"
            alt="Icon"
            style={{ width: "50px", height: "50px" }}
          />
          <p>Contact</p>
        </button>
      </nav>

      <div >
        {activeButton === 1 && (
          <div style={{ padding: "2rem", backgroundColor: "#ffffffff",alignItems: "center" }}>
            <TypingAnimation className={styles.typingText} duration={110}>Camille Gryspeerdt</TypingAnimation>
            <TypingAnimation className={styles.typingTextP} duration={45} delay= {1900} as="h2">Rigoureux, dynamique et passionné par la recherche de solutions innovantes pour améliorer la qualité des produits, je suis prêt à mettre mes compétences en pratique dans de nouveaux projets.</TypingAnimation>
          </div>
        )}

        {activeButton === 2 && (
          <div style={{ display: activeButton === 2 ? "block" : "none" }}>
            <CigfreeApp />
          </div>
        )}

        {activeButton === 3 && (
          <div style={{ padding: "0.5rem", backgroundColor: "#f4f4f4" }}>
            <HomeEmailContact />
          </div>
        )}
      </div>
      
    </div>
  );
};

export default FolioNavAndRedirection;
