import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, updateUserLocalDate } from '../../reducers/userCigFree';
import { UserIcon, XIcon } from 'lucide-react';

function CigfreeHeader() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userCigFree.value);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('signin');
  const [signUpUsername, setSignUpUsername] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signInUsername, setSignInUsername] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [errorMessageSignIn, setErrorMessageSignIn] = useState('');
  const [errorMessageSignUp, setErrorMessageSignUp] = useState('');

  const BACKEND_ADDRESS = window.location.hostname === 'localhost'
    ? 'http://localhost:3000'
    : 'https://port-folio-backend-three.vercel.app';

  useEffect(() => {
    const localDate = new Date();
    dispatch(updateUserLocalDate(localDate));
    if (!user.token) {
      setIsModalOpen(true);
    }
  }, []);

  const handleSignUp = () => {
    fetch(`${BACKEND_ADDRESS}/users/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: signUpUsername,
        password: signUpPassword,
      }),
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
          setSignUpUsername('');
          setSignUpPassword('');
          setIsModalOpen(false);
        } else {
          setErrorMessageSignUp(data.error);
          setTimeout(() => {
            setErrorMessageSignUp('');
          }, 2000);
        }
      });
  };

  const handleSignIn = () => {
    fetch(`${BACKEND_ADDRESS}/users/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: signInUsername,
        password: signInPassword,
      }),
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
          setSignInUsername('');
          setSignInPassword('');
          setIsModalOpen(false);
        } else {
          setErrorMessageSignIn(data.error);
          setTimeout(() => {
            setErrorMessageSignIn('');
          }, 2000);
        }
      });
  };

  const handleLogout = () => {
    dispatch(logout());
    setIsModalOpen(true);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className={`bg-white shadow-md transition-all duration-300 ${isModalOpen ? '' : 'rounded-b-2xl'} border-b-4 border-blue-500`}>
        {/* Header */}
        <header className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-4xl font-bold text-amber-400 drop-shadow-sm">
              CigFree
            </h1>
            
            {user.token ? (
              <div className="flex flex-col items-end">
                <p className="text-sm text-gray-600 mb-1">Salutation</p>
                <span className="text-lg text-amber-500 font-medium">
                  {user.userName}
                </span>
                <button
                  onClick={handleLogout}
                  className="text-sm text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={toggleModal}
                className="text-gray-600 hover:text-gray-800 transition-colors"
              >
                {isModalOpen ? (
                  <XIcon className="w-6 h-6" />
                ) : (
                  <UserIcon className="w-6 h-6" />
                )}
              </button>
            )}
          </div>
          
          {/* Navigation */}
          <div className="mt-4 flex justify-center space-x-8">
            <button className="text-gray-600 hover:text-blue-500 transition-colors">
              cig
            </button>
            <button className="text-gray-600 hover:text-blue-500 transition-colors">
              vape
            </button>
          </div>
        </header>

        {/* Modal */}
        {isModalOpen && !user.token && (
          <div className="border-t border-gray-100 bg-white rounded-b-2xl">
            <div className="max-w-md mx-auto p-6">
              {/* Tabs */}
              <div className="flex justify-center mb-6">
                <button
                  className={`px-4 py-2 ${
                    activeTab === 'signin'
                      ? 'text-blue-500 border-b-2 border-blue-500'
                      : 'text-gray-500'
                  }`}
                  onClick={() => setActiveTab('signin')}
                >
                  Sign In
                </button>
                <button
                  className={`px-4 py-2 ${
                    activeTab === 'signup'
                      ? 'text-blue-500 border-b-2 border-blue-500'
                      : 'text-gray-500'
                  }`}
                  onClick={() => setActiveTab('signup')}
                >
                  Sign Up
                </button>
              </div>

              {/* Sign In Form */}
              {activeTab === 'signin' && (
                <div className="space-y-4">
                  {errorMessageSignIn && (
                    <div className="text-red-500 text-center text-sm">
                      {errorMessageSignIn}
                    </div>
                  )}
                  <input
                    type="text"
                    placeholder="Username"
                    value={signInUsername}
                    onChange={(e) => setSignInUsername(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    value={signInPassword}
                    onChange={(e) => setSignInPassword(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    onClick={handleSignIn}
                    className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Sign In
                  </button>
                </div>
              )}

              {/* Sign Up Form */}
              {activeTab === 'signup' && (
                <div className="space-y-4">
                  {errorMessageSignUp && (
                    <div className="text-red-500 text-center text-sm">
                      {errorMessageSignUp}
                    </div>
                  )}
                  <input
                    type="text"
                    placeholder="Username"
                    value={signUpUsername}
                    onChange={(e) => setSignUpUsername(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    value={signUpPassword}
                    onChange={(e) => setSignUpPassword(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    onClick={handleSignUp}
                    className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CigfreeHeader;


// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { login, logout, updateUserLocalDate } from "../../reducers/userCigFree";
// import styles from "../../styles/Header.module.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faUser, faXmark } from "@fortawesome/free-solid-svg-icons";
// import Moment from "react-moment";
// import "moment/locale/fr";
// import { Modal } from "antd";

// function CigfreeHeader() {
//   const dispatch = useDispatch();
//   const user = useSelector((state) => state.userCigFree.value);

//   const [date, setDate] = useState("2050-11-22T23:59:59");
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [signUpUsername, setSignUpUsername] = useState("");
//   const [signUpPassword, setSignUpPassword] = useState("");
//   const [signInUsername, setSignInUsername] = useState("");
//   const [signInPassword, setSignInPassword] = useState("");
//   const [errorMessageSignIn, setErrorMessageSignIn] = useState("");
//   const [errorMessageSignUp, setErrorMessageSignUp] = useState("");
//   // errorMessageSignUp
//   //////////////////////////////////////////////// call for fetch ///////////////////////////////////////////////
//   // let BACKEND_ADDRESS = "";

//   const BACKEND_ADDRESS =
//     window.location.hostname === "localhost"
//       ? "http://localhost:3000"
//       : "https://port-folio-backend-three.vercel.app";


//   useEffect(() => {
//     const localDate = (new Date());
//     Moment.globalLocale = "fr";
//     dispatch(updateUserLocalDate(localDate))
//     if (!user.token) {
//       setIsModalVisible(!isModalVisible);
//     }
//   }, []);

//   const handleRegisterSignUp = () => {
//     console.log(BACKEND_ADDRESS);
//     fetch(`${BACKEND_ADDRESS}/users/signup`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         username: signUpUsername,
//         password: signUpPassword,
//       }),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         console.log(data);
//         if (data.result) {
//           dispatch(
//             login({
//               userName: data.username,
//               token: data.token,
//               dateCreation: data.dateCreation,
//               cigarettePrice: data.cigaretteprice,
//             })
//           );
//           setSignUpUsername("");
//           setSignUpPassword("");
//           setIsModalVisible(false);
//           console.log(data);
//         } else {
//           setErrorMessageSignUp(data.error); // Lève une erreur avec le message d'erreur du backend
//           // Supprime le message d'erreur après 2 secondes
//           setTimeout(() => {
//             setErrorMessageSignUp("");
//           }, 2000);
//         }
//       });
//   };

//   const handleRegisterSignIn = () => {
//     console.log(
//       BACKEND_ADDRESS,
//       `user info conection  email ${signInUsername} et pdw ${signInPassword}`
//     );
//     fetch(`${BACKEND_ADDRESS}/users/signin`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         username: signInUsername,
//         password: signInPassword,
//       }),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         console.log(data, "connection retour de la BDD et du backend");
//         if (data.result) {
//           console.log('6 arrivé dans le fetch de signin')
//           dispatch(
//             login({
//               userName: signInUsername,
//               token: data.token,
//               dateCreation: data.dateCreation,
//               cigarettePrice: data.cigaretteprice,
//             })
//           );
//           setSignInUsername("");
//           setSignInPassword("");
//           setIsModalVisible(false);
//           console.log('01 date de user.localDate')
//         }
//         else {
//           setErrorMessageSignIn(data.error)
//           // console.log(data.error)
//           setTimeout(() => {
//             setErrorMessageSignIn("")
//           }, 2000);
//         }
//       });
//   };

//   const handleLogout = () => {
//     dispatch(logout());
//     setIsModalVisible(!isModalVisible);
//   };

//   const showModal = () => {
//     setIsModalVisible(!isModalVisible);
//   };

//   let modalContent;
//   // console.log("token user", user.token);  verif token
//   if (!user.token) {
//     modalContent = (
//       <div className={styles.registerContainer}>
//         <div className={styles.registerSection}>
//           <p>Get Started</p>
//           {errorMessageSignUp && <div className={styles.error}>{errorMessageSignUp}</div>}
//           <input
//             type="text"
//             placeholder="Username"
//             id="signUpUsername"
//             onChange={(e) => setSignUpUsername(e.target.value)}
//             value={signUpUsername}
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             id="signUpPassword"
//             onChange={(e) => setSignUpPassword(e.target.value)}
//             value={signUpPassword}
//           />
//           <button id="register" onClick={() => handleRegisterSignUp()}>
//             Register
//           </button>
//         </div>
//         <div className={styles.registerSection}>
//           <p>Sign-in</p>
//           {errorMessageSignIn && <div className={styles.error}>{errorMessageSignIn}</div>}
//           <input
//             type="text"
//             placeholder="Username"
//             id="signInUsername"
//             onChange={(e) => setSignInUsername(e.target.value)}
//             value={signInUsername}
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             id="signInPassword"
//             onChange={(e) => setSignInPassword(e.target.value)}
//             value={signInPassword}
//           />
//           <button id="connection" onClick={() => handleRegisterSignIn()}>
//             Connect
//           </button>
//         </div>
//       </div>
//     );
//   }

//   let userSection;
//   if (user.token) {
//     userSection = (
//       <div className={styles.logoutSection}>
//         <p>Salutation</p>
//         <div className={styles.logoutSectionUsername}>
//           {user.userName}
//           </div>
//         <div className={styles.logoutSectionbot}>
//           <button onClick={() => handleLogout()}> Logout</button>
//         </div>
//       </div>
//     );
//   } else {
//     if (isModalVisible) {
//       userSection = (
//         <div className={styles.headerIcons}>
//           <FontAwesomeIcon
//             onClick={showModal}
//             className={styles.userSection}
//             icon={faXmark}
//           />
//         </div>
//       );
//     } else {
//       userSection = (
//         <div className={styles.headerIcons}>
//           <FontAwesomeIcon
//             onClick={showModal}
//             className={styles.userSection}
//             icon={faUser}
//           />
//         </div>
//       );
//     }
//   }

//   return (
//     <header className={styles.header}>
//       <div className={styles.headerAllContainer}>
//         <div className={styles.topHeadercontainer}>
//           <div className={styles.logoContainer}>
//             <h1 className={styles.title}>CigFree</h1>
//             {userSection}
//           </div>
//         </div>
//         <div className={styles.botHeadercontainer}>
//           <div className={styles.botselection}>
//           <div className={styles.botselectionflex}>
//             <div>cig</div>
//             <div>vape</div>
//             </div>
//           </div>
//         </div>

//         {isModalVisible && (
//           <div id="react-modals">
//             <Modal
//               getContainer="#react-modals"
//               className={styles.modal}
//               visible={isModalVisible}
//               closable={false}
//               footer={null}
//             >
//               {modalContent}
//             </Modal>
//           </div>
//         )}
//       </div>
//     </header>
//   );
// }

// export default CigfreeHeader;