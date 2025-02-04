import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, updateUserLocalDate } from "../../reducers/userCigFree";
import styles from "../../styles/CigfreeHeader.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faXmark } from "@fortawesome/free-solid-svg-icons";
import Moment from "react-moment";
import "moment/locale/fr";

function CigfreeHeader() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userCigFree.value);

  const [date, setDate] = useState("2050-11-22T23:59:59");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [signUpUsername, setSignUpUsername] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signInUsername, setSignInUsername] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [errorMessageSignIn, setErrorMessageSignIn] = useState("");
  const [errorMessageSignUp, setErrorMessageSignUp] = useState("");

  const BACKEND_ADDRESS =
    window.location.hostname === "localhost"
      ? "http://localhost:3000"
      : "https://port-folio-backend-three.vercel.app";

  useEffect(() => {
    const localDate = new Date();
    Moment.globalLocale = "fr";
    dispatch(updateUserLocalDate(localDate));
    if (!user.token) {
      setIsModalVisible(true);
    }
  }, []);

  const handleRegisterSignUp = () => {
    fetch(`${BACKEND_ADDRESS}/users/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: signUpUsername, password: signUpPassword }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(
            login({
              userName: data.username,
              token: data.token,
              dateCreation: data.dateCreation,
              cigarettePrice: data.cigaretteprice,
            })
          );
          setSignUpUsername("");
          setSignUpPassword("");
          setIsModalVisible(false);
        } else {
          setErrorMessageSignUp(data.error);
          setTimeout(() => setErrorMessageSignUp(""), 2000);
        }
      });
  };

  const handleRegisterSignIn = () => {
    fetch(`${BACKEND_ADDRESS}/users/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: signInUsername, password: signInPassword }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(
            login({
              userName: signInUsername,
              token: data.token,
              dateCreation: data.dateCreation,
              cigarettePrice: data.cigaretteprice,
            })
          );
          setSignInUsername("");
          setSignInPassword("");
          setIsModalVisible(false);
        } else {
          setErrorMessageSignIn(data.error);
          setTimeout(() => setErrorMessageSignIn(""), 2000);
        }
      });
  };

  const handleLogout = () => {
    dispatch(logout());
    setIsModalVisible(true);
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  let modalContent;
  if (!user.token) {
    modalContent = (
      <div className={styles.registerContainer}>
        <div className={styles.registerSection}>
          <p>Get Started</p>
          {errorMessageSignUp && <div className={styles.error}>{errorMessageSignUp}</div>}
          <input
            className={styles.inputRegistration}
            type="text"
            placeholder="Username"
            onChange={(e) => setSignUpUsername(e.target.value)}
            value={signUpUsername}
          />
          <input
            className={styles.inputRegistration}
            type="password"
            placeholder="Password"
            onChange={(e) => setSignUpPassword(e.target.value)}
            value={signUpPassword}
          />
          <button onClick={handleRegisterSignUp}>Register</button>
        </div>
        <div className={styles.registerSection}>
          <p>Sign-in</p>
          {errorMessageSignIn && <div className={styles.error}>{errorMessageSignIn}</div>}
          <input
            className={styles.inputRegistration}
            type="text"
            placeholder="Username"
            onChange={(e) => setSignInUsername(e.target.value)}
            value={signInUsername}
          />
          <input className={styles.inputRegistration}
            type="password"
            placeholder="Password"
            onChange={(e) => setSignInPassword(e.target.value)}
            value={signInPassword}
          />
          <button onClick={handleRegisterSignIn}>Connect</button>
        </div>
      </div>
    );
  }

  const userSection = user.token ? (
    <div className={styles.logoutSection}>
      <p>Salutation</p>
      <div className={styles.logoutSectionUsername}>{user.userName}</div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  ) : (
    <div className={styles.headerIcons}>
      <FontAwesomeIcon
        onClick={toggleModal}
        className={styles.userSection}
        icon={isModalVisible ? faXmark : faUser}
      />
    </div>
  );

  return (
    <header className={styles.header}>
      <div className={styles.headerAllContainer}>
        <div className={styles.topHeadercontainer}>
          <div className={styles.logoContainer}>
            <h1 className={styles.title}>CigFree</h1>
            {userSection}
          </div>
        </div>
        <div className={styles.botHeadercontainer}>
          <div className={styles.botselection}>
            <div className={styles.botselectionflex}>
              <div>cig</div>
              <div>vape</div>
            </div>
          </div>
        </div>

        {isModalVisible && (
          <div className={styles.customModalOverlay} onClick={toggleModal}>
            <div
              className={styles.customModalContent}
              onClick={(e) => e.stopPropagation()}
            >
              {modalContent}
              <button className={styles.closeButton} onClick={toggleModal}>
                X
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default CigfreeHeader;