import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Graphebar from "./Graphebar"; //Graphebarjour
import Graphebarjour from "./Graphebarjour";
import styles from "../../styles/CigfreeHomeFront.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { groupDataByMonth } from "../../modules/groupDataByMonth";
import { groupDataByDay } from "../../modules/groupDataByDay";

import { calculateprice } from "../../modules/calculateprice";

// const { calculateprice } = require("../modules/calculateprice.ts"); // module de calcule du prix

// import du graphique

function CigfreeHomeFront() {
  const user = useSelector((state) => state.userCigFree.value);

  const [errorMessage, setErrorMessage] = useState("");
  const [errorMessageSavedCig, setErrorMessageSavedCig] = useState("");
  const [totalSmoked, settotalSmoked] = useState(0);
  const [totalNoSmoked, settotalNoSmoked] = useState(0);
  const [totalDepenseCigarette, setTotalDepenseCigarette] = useState(0);
  const [totalSaveInEuroCigarette, setTotalSaveInEuroCigarette] = useState(0);
  const [realoadData, setRealoadData] = useState(false);
  const [chartData, setChartData] = useState([]);
  const [chartDataDay, setChartDataDay] = useState([]);
  const [loading, setLoading] = useState(true);

  // let BACKEND_ADDRESS = ""
  let cigaretteprice = 0.6;

  // important.... pas de / apres l'adresse sur vercel
  const BACKEND_ADDRESS =
    window.location.hostname === "localhost"
      ? "http://localhost:3000"
      : "https://port-folio-backend-three.vercel.app"; // danger \\

  // console.log('backend adrresssss',BACKEND_ADDRESS )

  //teste chartdata en attendant de le recuperer la donné de la BDD
  // const chartData = [65, 60, 59, 80, 56, 78, 89];
  // const chartDataDay = [28, 22, 17, 15, 26, 16, 19];
  // console.log('verif contenu chartDataDay qui vient de home',chartDataDay)

  useEffect(() => {
    if (user.token) {
      const fetchDataSmoke = async () => {
        try {
          setLoading(true); // Lancement du chargement
          const response = await fetch(`${BACKEND_ADDRESS}/users/datasmoke/${user.token}`);
          const data = await response.json();
          console.log(data);
  
          if (data.result) {
            const { userDataSmoke, userDataNotSmoked } = data;
  
            setChartData(groupDataByMonth(userDataSmoke));
            setChartDataDay(groupDataByDay(userDataSmoke));
  
            const totalSmoke = userDataSmoke.length;
            const totalNoSmoke = userDataNotSmoked.length;
            settotalSmoked(totalSmoke);
            settotalNoSmoked(totalNoSmoke);
  
            const calculateDepense = async () => {
              const depense = calculateprice(Number(totalSmoke), cigaretteprice);
              setTotalDepenseCigarette(depense);
            };
            calculateDepense();
  
            const calculateEconomies = async () => {
              const economies = calculateprice(Number(totalNoSmoke), cigaretteprice);
              setTotalSaveInEuroCigarette(economies);
            };
            calculateEconomies();
  
          } else {
            console.log(data.error);
          }
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false); // Fin du chargement, que ce soit en cas de succès ou d'erreur
        }
      };
  
      fetchDataSmoke();
    }
  }, [user.token, realoadData]);
  

  //////////////////test fonction  gain / depense cigarette ///////

  ////////////////////////
  // 4 fonction Identique sur l eprincipe, com dans la 1 ere
  const handleAddCigarette = () => {
    // console.log(user.token);
    fetch(`${BACKEND_ADDRESS}/users/addsmokecigarettes/${user.token}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data, "response data add cigarette");
        if (data.result) {
          setRealoadData((prevRealoadData) => !prevRealoadData);
          // relance l useeffect pour mettre a jour les donnés
          //une fois que l'on a la validation
        } else {
          setErrorMessage(data.error); // Lève une erreur avec le message d'erreur du backend
          // Supprime le message d'erreur après 2 secondes
          setTimeout(() => {
            setErrorMessage("");
          }, 3000);
        }
      });
  };

  const handleDelcigarette = () => {
    fetch(`${BACKEND_ADDRESS}/users/deletesmokecigarettes/${user.token}`, {
      method: "DELETE", // ne pas oublié le delete dans la methode, car en get ça fera un 404 ERROR
      // car coté backend c'est une route delete
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data, "response data del cigarette");
        if (data.result) {
          setRealoadData((prevRealoadData) => !prevRealoadData);
        } else {
          setErrorMessage(data.error); // Lève une erreur avec le message d'erreur du backend

          // Supprime le message d'erreur après 2 secondes
          setTimeout(() => {
            setErrorMessage("");
          }, 3000);
        }
      });
  };

  const handleAddNoCigarette = () => {
    // console.log(user.token);
    fetch(`${BACKEND_ADDRESS}/users/addnotsmokecigarettes/${user.token}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data, "response data add no smoke cigarette");
        if (data.result) {
          setRealoadData((prevRealoadData) => !prevRealoadData);
        } else {
          setErrorMessage(data.error); // Lève une erreur avec le message d'erreur du backend
          // Supprime le message d'erreur après 2 secondes
          setTimeout(() => {
            setErrorMessage("");
          }, 3000);
        }
      });
  };

  const handleDelNocigarette = () => {
    fetch(`${BACKEND_ADDRESS}/users/deletenotsmokecigarettes/${user.token}`, {
      method: "DELETE", // ne pas oublié le delete dans la methode, car en get ça fera un 404 ERROR
      // car coté backend c'est une route delete
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data, "response data del no smoke cigarette");
        if (data.result) {
          setRealoadData((prevRealoadData) => !prevRealoadData);
        } else {
          setErrorMessage(data.error); // Lève une erreur avec le message d'erreur du backend

          // Supprime le message d'erreur après 2 secondes
          setTimeout(() => {
            setErrorMessage("");
          }, 3000);
        }
      });
  };

  return (
    <div>
      {user.token ? (
        <div className={styles.homeContainerAll}>
          <div className={styles.infoUserContainerOne}>
            <div className={styles.infoUserContainerSmokeCigCount}>
              <div className={styles.infoUserContainerSmokeCigCountBig}>
                {totalSmoked}
              </div>
              <p>
                Cigarettes fumées ≃
                <span className={styles.calculatePriceCss}>
                  {totalDepenseCigarette}{" "}
                </span>{" "}
                €
              </p>
            </div>
            <div className={styles.infoUserContainerSmokeCigCount}>
              <div className={styles.infoUserContainerSmokeCigCountBig}>
                {totalNoSmoked}
              </div>
              <p>
                Cigarettes économisées ≃
                <span className={styles.calculatePriceCss}>
                  {totalSaveInEuroCigarette}{" "}
                </span>{" "}
                €
              </p>
            </div>
          </div>
          <div className={styles.cigaddlesscontainerone}>
            {errorMessage && <div className={styles.error}>{errorMessage}</div>}
            <div className={styles.cigaddlesscontainer}>
              <FontAwesomeIcon
                icon={faMinus}
                id="delCig"
                className={styles.btnCigSectionminus}
                onClick={() => handleDelcigarette()}
              />
              <p>j'ai fumé ! ! !</p>
              <FontAwesomeIcon
                icon={faPlus}
                id="addCig"
                className={styles.btnCigSectionplus}
                onClick={() => handleAddCigarette()}
              />
            </div>
            <div className={styles.cigaddlesscontainer}>
              {errorMessageSavedCig && (
                <div className={styles.error}>{errorMessageSavedCig}</div>
              )}
              <FontAwesomeIcon
                icon={faMinus}
                id="delCig"
                className={styles.btnCigSectionminus}
                onClick={() => handleDelNocigarette()}
              />
              <p>j'ai évité de fumer </p>
              <FontAwesomeIcon
                icon={faPlus}
                id="addCig"
                className={styles.btnCigSectionplus}
                onClick={() => handleAddNoCigarette()}
              />
            </div>
          </div>

 {/* Affichage conditionnel des graphiques */}
 {loading ? (
          <p>Chargement des graphiques...</p>
        ) : (
          <div className={styles.graphecontainerone}>
            {chartDataDay && chartDataDay.length > 0 ? (
              <div className={styles.graphecontainer}>
                <Graphebarjour chartDataDay={chartDataDay} className={styles.graphe} />
              </div>
            ) : (
              <p>Aucune donnée disponible pour le graphique de jour.</p>
            )}
          </div>
        )}

        {loading ? (
          <p>Chargement des graphiques...</p>
        ) : (
          <div className={styles.graphecontainerone}>
            {chartData && chartData.length > 0 ? (
              <div className={styles.graphecontainer}>
                <Graphebar chartData={chartData} className={styles.graphe} />
              </div>
            ) : (
              <p>Aucune donnée disponible pour le graphique mensuel.</p>
            )}
          </div>
        )}

      </div>
    ) : (
      <div className={styles.userNotConnected}>
        <h2>Merci de vous connecter</h2>
      </div>
    )}
  </div>
  )
}

export default CigfreeHomeFront;


// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { updateDataChartWeek, updateDataChartMonth } from "../../reducers/userCigFree";
// import Graphebar from "./Graphebar"; //Graphebarjour
// import Graphebarjour from "./Graphebarjour";
// import styles from "../../styles/CigfreeHomeFront.module.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
// import { groupDataByMonth } from "../../modules/groupDataByMonth";
// import { groupDataByDay } from "../../modules/groupDataByDay";
// import { calculateprice } from "../../modules/calculateprice";




// function CigfreeHomeFront() {

//   const dispatch = useDispatch();
//   const user = useSelector((state) => state.userCigFree.value);
// /////

// ////// au dessus test 

//   const [errorMessage, setErrorMessage] = useState("");
//   const [errorMessageSavedCig, setErrorMessageSavedCig] = useState("");
//   const [totalSmoked, settotalSmoked] = useState(0);
//   const [totalNoSmoked, settotalNoSmoked] = useState(0);
//   const [totalDepenseCigarette, setTotalDepenseCigarette] = useState(0);
//   const [totalSaveInEuroCigarette, setTotalSaveInEuroCigarette] = useState(0);
//   const [realoadData, setRealoadData] = useState(false);
//   const [chartDataMonth, setChartDataMonth] = useState([]);
//   const [chartDataWeek, setChartDataWeek] = useState([]);
 

//   // let BACKEND_ADDRESS = ""
//   let cigaretteprice = 0.6;

//   // important.... pas de / apres l'adresse sur vercel
//   const BACKEND_ADDRESS =
//     window.location.hostname === "localhost"
//       ? "http://localhost:3000"
//       : "https://port-folio-backend-three.vercel.app"; // danger \\

//   // console.log('backend adrresssss',BACKEND_ADDRESS )

//   //teste chartdata en attendant de le recuperer la donné de la BDD
//   // const chartDataMonth = [65, 60, 59, 80, 56, 78, 89];
//   // const chartDataWeek = [28, 22, 17, 15, 26, 16, 19];
//   // console.log('verif contenu chartDataWeek qui vient de home',chartDataWeek)

//   useEffect(() => {
//     if (user.token) {
//       const fetchDataSmoke = async () => {
//         try {
//           const response = await fetch(
//             `${BACKEND_ADDRESS}/users/datasmoke/${user.token}`
//           );
//           const data = await response.json();
//           console.log(data,'8 retour du fect des data de datasmok');

//           if (data.result) {
//             const { userDataSmoke, userDataNotSmoked } = data;
//             setChartDataMonth(groupDataByMonth(userDataSmoke));
//             setChartDataWeek(groupDataByDay(userDataSmoke));
        
//             console.log(chartDataMonth, "consolelog 9 dans fecth de chartdata et chartdataMonth du reducer", chartDataMonth);
//             // console.log(
//             //   chartDataWeek,
//             //   "consolelog 10 dans fecth de chartdatabyDay"
//             // );

//             const totalSmoke = userDataSmoke.length;
//             const totalNoSmoke = userDataNotSmoked.length;
//             settotalSmoked(totalSmoke);
//             settotalNoSmoked(totalNoSmoke);

//             const calculateDepense = async () => {
//               const depense = calculateprice(
//                 Number(totalSmoke),
//                 cigaretteprice
//               );
//               setTotalDepenseCigarette(depense);
//               console.log(depense, "calculateDepense");
//             };
//             calculateDepense();

//             const calculateEconomies = async () => {
//               const economies = calculateprice(
//                 Number(totalNoSmoke),
//                 cigaretteprice
//               );
//               setTotalSaveInEuroCigarette(economies);
//               // console.log(economies, 'calculateEconomies')
//             };
//             // function qui arrondi le resultat de calculateprice. calculate price
//             // prend 2 valleur totalnosmoke formater en number et du prix de cigarette
//             // le toFixed() apres permet de formater le resultat poru garder toujours 2 chiffre apres la virgule.
//             calculateEconomies(); // lance la function ecrire au dessus qui est asynchrone.
//           } else {
//             // Gérez le cas où la requête n'a pas réussi ou les données ne sont pas disponibles
//             console.log(data.error);
//           }
//         } catch (error) {
//           // Gérez les erreurs lors de la requête
//           console.error(error);
//         }
//       };
//       fetchDataSmoke();

//       // console.log("token de l utilisateur", user.token
//       //   ,'et user.chartDataMonth', user.chartDataMonth
//       // );
//     }
//   }, [user.token, realoadData,]);


//   useEffect(() => {
//     if (chartDataMonth.length > 0) {
//       dispatch(updateDataChartMonth(chartDataMonth));
//       console.log("Dispatched chartDataMonth to reducer form useefect :", chartDataMonth);
//     }
//   }, [chartDataMonth, dispatch]);
// console.log(user.chartDataMonth, '22 user.chardatamonth dans frontcig')

// useEffect(() => {
//   if (chartDataWeek.length > 0) {
//     dispatch(updateDataChartWeek(chartDataWeek));
//     console.log("Dispatched chartDataWeek to reducer form useefect :", chartDataWeek);
//   }
// }, [chartDataWeek, dispatch]);
// console.log(user.chartDataWeek, '23 user.chardataWeek dans frontcig')

// //////////////////test fonction  gain / depense cigarette ///////

//   ////////////////////////
//   // 4 fonction Identique sur l eprincipe, com dans la 1 ere
//   const handleAddCigarette = () => {
//      console.log(realoadData, 'RealoadData 100');
//     fetch(`${BACKEND_ADDRESS}/users/addsmokecigarettes/${user.token}`)
//       .then((response) => response.json())
//       .then((data) => {
//         console.log(data, "response data add cigarette");
//         if (data.result) {
         
//           setRealoadData((prevRealoadData) => !prevRealoadData);
//           // relance l useeffect pour mettre a jour les donnés
//           //une fois que l'on a la validation
//         } else {
//           setErrorMessage(data.error); // Lève une erreur avec le message d'erreur du backend
//           // Supprime le message d'erreur après 2 secondes
//           setTimeout(() => {
//             setErrorMessage("");
//           }, 3000);
//         }
//       });
//   };

//   const handleDelcigarette = () => {
//     fetch(`${BACKEND_ADDRESS}/users/deletesmokecigarettes/${user.token}`, {
//       method: "DELETE", // ne pas oublié le delete dans la methode, car en get ça fera un 404 ERROR
//       // car coté backend c'est une route delete
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         console.log(data, "response data del cigarette");
//         if (data.result) {
//           setRealoadData((prevRealoadData) => !prevRealoadData);
//         } else {
//           setErrorMessage(data.error); // Lève une erreur avec le message d'erreur du backend

//           // Supprime le message d'erreur après 2 secondes
//           setTimeout(() => {
//             setErrorMessage("");
//           }, 3000);
//         }
//       });
//   };

//   const handleAddNoCigarette = () => {
//     // console.log(user.token);
//     fetch(`${BACKEND_ADDRESS}/users/addnotsmokecigarettes/${user.token}`)
//       .then((response) => response.json())
//       .then((data) => {
//         console.log(data, "response data add no smoke cigarette");
//         if (data.result) {
//           setRealoadData((prevRealoadData) => !prevRealoadData);
//         } else {
//           setErrorMessage(data.error); // Lève une erreur avec le message d'erreur du backend
//           // Supprime le message d'erreur après 2 secondes
//           setTimeout(() => {
//             setErrorMessage("");
//           }, 3000);
//         }
//       });
//   };

//   const handleDelNocigarette = () => {
//     fetch(`${BACKEND_ADDRESS}/users/deletenotsmokecigarettes/${user.token}`, {
//       method: "DELETE", // ne pas oublié le delete dans la methode, car en get ça fera un 404 ERROR
//       // car coté backend c'est une route delete
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         console.log(data, "response data del no smoke cigarette");
//         if (data.result) {
//           setRealoadData((prevRealoadData) => !prevRealoadData);
//         } else {
//           setErrorMessage(data.error); // Lève une erreur avec le message d'erreur du backend

//           // Supprime le message d'erreur après 2 secondes
//           setTimeout(() => {
//             setErrorMessage("");
//           }, 3000);
//         }
//       });
//   };
// console.log(user.chartDataWeek,'30 user.chartdata dans homecig')
//   return (
//     <div>
//       {user.token ? (
//         <div className={styles.homeContainerAll}>
//           <div className={styles.infoUserContainerOne}>
//             <div className={styles.infoUserContainerSmokeCigCount}>
//               <div className={styles.infoUserContainerSmokeCigCountBig}>
//                 {totalSmoked}
//               </div>
//               <p>
//                 Cigarettes fumées ≃
//                 <span className={styles.calculatePriceCss}>
//                   {totalDepenseCigarette}{" "}
//                 </span>{" "}
//                 €
//               </p>
//             </div>
//             <div className={styles.infoUserContainerSmokeCigCount}>
//               <div className={styles.infoUserContainerSmokeCigCountBig}>
//                 {totalNoSmoked}
//               </div>
//               <p>
//                 Cigarettes économisées ≃
//                 <span className={styles.calculatePriceCss}>
//                   {totalSaveInEuroCigarette}{" "}
//                 </span>{" "}
//                 €
//               </p>
//             </div>
//           </div>
//           <div className={styles.cigaddlesscontainerone}>
//             {errorMessage && <div className={styles.error}>{errorMessage}</div>}
//             <div className={styles.cigaddlesscontainer}>
//               <FontAwesomeIcon
//                 icon={faMinus}
//                 id="delCig"
//                 className={styles.btnCigSectionminus}
//                 onClick={() => handleDelcigarette()}
//               />
//               <p>j'ai fumé ! ! !</p>
//               <FontAwesomeIcon
//                 icon={faPlus}
//                 id="addCig"
//                 className={styles.btnCigSectionplus}
//                 onClick={() => handleAddCigarette()}
//               />
//             </div>
//             <div className={styles.cigaddlesscontainer}>
//               {errorMessageSavedCig && (
//                 <div className={styles.error}>{errorMessageSavedCig}</div>
//               )}
//               <FontAwesomeIcon
//                 icon={faMinus}
//                 id="delCig"
//                 className={styles.btnCigSectionminus}
//                 onClick={() => handleDelNocigarette()}
//               />
//               <p>j'ai évité de fumer </p>
//               <FontAwesomeIcon
//                 icon={faPlus}
//                 id="addCig"
//                 className={styles.btnCigSectionplus}
//                 onClick={() => handleAddNoCigarette()}
//               />
//             </div>
//           </div>

//           <div className={styles.graphecontainerone}>
//   {chartDataWeek && chartDataWeek.length > 0 ? (
//     <div className={styles.graphecontainer}>
//            <Graphebarjour chartData={chartDataWeek} className={styles.graphe} />
//       {/* <Graphebarjour className={styles.graphe} /> */}
//     </div>
//   ) : (
//     <p>Chargement des données pour le graphique...</p>
//   )}
// </div>

//           <div className={styles.graphecontainerone}>
//   {chartDataMonth && chartDataMonth.length > 0 ? (
//     <div className={styles.graphecontainer}>
//    <Graphebar chartData={chartDataMonth} className={styles.graphe} />
//     </div>
//   ) : (
//     <p>Chargement des données pour le graphique...</p>
//   )}
// </div>
//         </div>
//       ) : (
//         <div className={styles.userNotConnected}>
//           <h2>Merci de vous connecter</h2>
//         </div>
//       )}
//     </div>
//   );
// }

// export default CigfreeHomeFront;
