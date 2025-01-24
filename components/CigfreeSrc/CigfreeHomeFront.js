import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateCigarettePrice } from "../../reducers/userCigFree";
import Graphebar from "./Graphebar"; //Graphebarjour
// import Graphebarjour from "./Graphebarjour";
import styles from "../../styles/CigfreeHomeFront.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { groupDataByMonth } from "../../modules/groupDataByMonth";
import { groupDataByDay } from "../../modules/groupDataByDay";
import { calculateprice } from "../../modules/calculateprice";

// const { calculateprice } = require("../modules/calculateprice.ts"); // module de calcule du prix

// import du graphique

function CigfreeHomeFront() {
  const dispatch = useDispatch();

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
  const [cigarettePrice, setCigarettePrice] = useState(null);
  const [loading, setLoading] = useState(true);
  

  // let BACKEND_ADDRESS = ""
  // let cigarettePrice = 0.6;

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
          const response = await fetch(
            `${BACKEND_ADDRESS}/users/datasmoke/${user.token}`
          );
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
              const depense = calculateprice(
                Number(totalSmoke),
                user.cigarettePrice
              );
              setTotalDepenseCigarette(depense);
            };
            calculateDepense();

            const calculateEconomies = async () => {
              const economies = calculateprice(
                Number(totalNoSmoke),
                user.cigarettePrice
              );
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

  const handleCigaretteprice = () => {
    // Vérification du format du prix (nombre avec un seul point décimal)
    const regex = /^\d+(\.\d{1,2})?$/; // Permet les nombres avec 1 ou 2 décimales
    if (regex.test(cigarettePrice)) {
      // Envoi du nouveau prix au backend
      fetch(`${BACKEND_ADDRESS}/users/updatecigaretteprice/${user.token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newPrice: parseFloat(cigarettePrice) }),  // Envoi du nouveau prix
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data, "response data update cigarette price");
          if (data.result) {
            // Mise à jour du prix dans Redux (si tu utilises Redux pour gérer l'état global)
            dispatch(updateCigarettePrice(cigarettePrice));
  
            // Optionnel: rafraîchir les données ou afficher un message de succès
            setRealoadData((prevRealoadData) => !prevRealoadData); 
            setCigarettePrice(null)
            console.log("Prix cigarette mis à jour:", cigarettePrice);
          } else {
            setErrorMessage(data.error); // Lève une erreur avec le message d'erreur du backend
  
            // Supprime le message d'erreur après 2 secondes
            setTimeout(() => {
              setErrorMessage("");
            }, 3000);
          }
        })
        .catch((error) => {
          console.error("Erreur lors de la mise à jour du prix:", error);
          setErrorMessage("Une erreur est survenue. Veuillez réessayer.");
  
          // Supprime le message d'erreur après 2 secondes
          setTimeout(() => {
            setErrorMessage("");
          }, 3000);
        });
    } else {
      alert("Veuillez entrer un prix valide (par exemple 0.1, 1.8, 10)");
    }
  };
  

  return (
    <div>
      {user.token ? (
        <div className={styles.homeContainerAll}>
          <div className={styles.infoUserContainerPriceCig}>
            <div className={styles.infoUserContainerSmokeCigCount}>
              <p>
                Prix d'une cigarette{" "}
                <input
                  type="text"
                  placeholder={user.cigarettePrice}
                  id="Cigaretteprice"
                  onChange={(e) => setCigarettePrice(e.target.value)}
                  value={cigarettePrice}
                  pattern="^\d+(\.\d{1,2})?$" // Assure la validation au niveau HTML aussi
                  title="Veuillez entrer un nombre avec un maximum de 2 décimales"
                  size="5"
                  style={{ marginBottom: '2px' }} 
                />{" "}
                €{" "}
                <button id="register" onClick={() => handleCigaretteprice()}>
                  confirmer
                </button>
              </p>
            </div>
          </div>
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
        <Graphebar
          chartDataDay={chartDataDay}
          chartData={chartData} // On passe chartData pour le graphique mensuel aussi
          className={styles.graphe}
        />
      </div>
    ) : (
      <p>Aucune donnée disponible pour les graphiques.</p>
    )}
  </div>
)}

          {/* Affichage conditionnel des graphiques
          {loading ? (
            <p>Chargement des graphiques...</p>
          ) : (
            <div className={styles.graphecontainerone}>
              {chartDataDay && chartDataDay.length > 0 ? (
                <div className={styles.graphecontainer}>
                  <Graphebarjour
                    chartDataDay={chartDataDay}
                    chartData={chartData}
                    className={styles.graphe}
                  />
                </div>
              ) : (
                <p>Aucune donnée disponible pour le graphique de jour.</p>
              )}
            </div>
          )} */}

          {/* {loading ? (
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
          )} */}
        </div>
      ) : (
        <div className={styles.userNotConnected}>
          <h2>Merci de vous connecter</h2>
        </div>
      )}
    </div>
  );
}

export default CigfreeHomeFront;