import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../../reducers/user";
import styles from "../../styles/Header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faXmark } from "@fortawesome/free-solid-svg-icons";
import Moment from "react-moment";
import "moment/locale/fr";
import { Modal } from "antd";

function CigfreeHeader() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  const [date, setDate] = useState("2050-11-22T23:59:59");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [signUpUsername, setSignUpUsername] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signInUsername, setSignInUsername] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [errorMessageSignIn, setErrorMessageSignIn] = useState("");
  const [errorMessageSignUp, setErrorMessageSignUp] = useState("");
  // errorMessageSignUp
  //////////////////////////////////////////////// call for fetch ///////////////////////////////////////////////
  // let BACKEND_ADDRESS = "";

  const BACKEND_ADDRESS =
    window.location.hostname === "localhost"
      ? "http://localhost:3000"
      : "https://port-folio-backend-three.vercel.app/";


  useEffect(() => {
    setDate(new Date());
    Moment.globalLocale = "fr";
    if (!user.token) {
      setIsModalVisible(!isModalVisible);
    }
  }, []);

  const handleRegisterSignUp = () => {
    console.log(BACKEND_ADDRESS);
    fetch(`${BACKEND_ADDRESS}/users/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userName: signUpUsername,
        password: signUpPassword,

      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.result) {
          dispatch(
            login({
              userName: data.userName,
              token: data.token,
              dateCreation: data.dateCreation,
            })
          );
          setSignUpUsername("");
          setSignUpPassword("");
          setIsModalVisible(false);
          console.log(data);
        } else {
          setErrorMessageSignUp(data.error); // Lève une erreur avec le message d'erreur du backend
          // Supprime le message d'erreur après 2 secondes
          setTimeout(() => {
            setErrorMessageSignUp("");
          }, 2000);
        }
      });
  };

  const handleRegisterSignIn = () => {
    console.log(
      BACKEND_ADDRESS,
      `user info conection  mail ${signInUsername} et pdw ${signInPassword}`
    );
    fetch(`${BACKEND_ADDRESS}/users/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userName: signInUsername,
        password: signInPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data, "connection retour de la BDD et du backend");
        if (data.result) {
          dispatch(
            login({
              userName: signInUsername,
              token: data.token,
              dateCreation: data.dateCreation,
            })
          );
          setSignInUsername("");
          setSignInPassword("");
          setIsModalVisible(false);
        }
        else {
          setErrorMessageSignIn(data.error)
          // console.log(data.error)
          setTimeout(() => {
            setErrorMessageSignIn("")
          }, 2000);
        }
      });
  };

  const handleLogout = () => {
    dispatch(logout());
    setIsModalVisible(!isModalVisible);
  };

  const showModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  let modalContent;
  // console.log("token user", user.token);  verif token
  if (!user.token) {
    modalContent = (
      <div className={styles.registerContainer}>
        <div className={styles.registerSection}>
          <p>Get Started</p>
          {errorMessageSignUp && <div className={styles.error}>{errorMessageSignUp}</div>}
          <input
            type="text"
            placeholder="Username"
            id="signUpUsername"
            onChange={(e) => setSignUpUsername(e.target.value)}
            value={signUpUsername}
          />
          <input
            type="password"
            placeholder="Password"
            id="signUpPassword"
            onChange={(e) => setSignUpPassword(e.target.value)}
            value={signUpPassword}
          />
          <button id="register" onClick={() => handleRegisterSignUp()}>
            Register
          </button>
        </div>
        <div className={styles.registerSection}>
          <p>Sign-in</p>
          {errorMessageSignIn && <div className={styles.error}>{errorMessageSignIn}</div>}
          <input
            type="text"
            placeholder="Username"
            id="signInUsername"
            onChange={(e) => setSignInUsername(e.target.value)}
            value={signInUsername}
          />
          <input
            type="password"
            placeholder="Password"
            id="signInPassword"
            onChange={(e) => setSignInPassword(e.target.value)}
            value={signInPassword}
          />
          <button id="connection" onClick={() => handleRegisterSignIn()}>
            Connect
          </button>
        </div>
      </div>
    );
  }

  let userSection;
  let userSectionDateinscription;
  if (user.token) {
    userSection = (
      <div className={styles.logoutSection}>
        <p>Salutation</p>
        <div className={styles.logoutSectionUsername}>{user.userName}</div>
        <div className={styles.logoutSectionbot}>
          <button onClick={() => handleLogout()}> Logout</button>
        </div>
      </div>
    );
  } else {
    if (isModalVisible) {
      userSection = (
        <div className={styles.headerIcons}>
          <FontAwesomeIcon
            onClick={showModal}
            className={styles.userSection}
            icon={faXmark}
          />
        </div>
      );
    } else {
      userSection = (
        <div className={styles.headerIcons}>
          <FontAwesomeIcon
            onClick={showModal}
            className={styles.userSection}
            icon={faUser}
          />
        </div>
      );
    }
  }

  return (
    <header className={styles.header}>
      <div className={styles.headerAllContainer}>
        <div className={styles.topHeadercontainer}>
          <div className={styles.logoContainer}>
            <h1 className={styles.title}>Ciga Free</h1>
            {userSection}
          </div>
        </div>
        <div className={styles.botHeadercontainer}>
          <div className={styles.botselection}>
            {userSectionDateinscription}
          </div>
        </div>

        {isModalVisible && (
          <div id="react-modals">
            <Modal
              getContainer="#react-modals"
              className={styles.modal}
              visible={isModalVisible}
              closable={false}
              footer={null}
            >
              {modalContent}
            </Modal>
          </div>
        )}
      </div>
    </header>
  );
}

export default CigfreeHeader;
