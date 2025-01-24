import styles from "../../styles/Graphebar.module.css";
import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Chart as ChartJS } from 'chart.js';

// Enregistrer les échelles nécessaires
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Graphebar({ chartData, chartDataDay }) {
  const [monthNames, setMonthNames] = useState([]);
  const [dayNames, setDayNames] = useState([]);
  const [minYValueMonth, setMinYValueMonth] = useState(0);
  const [maxYValueMonth, setMaxYValueMonth] = useState(40);
  const [minYValueDay, setMinYValueDay] = useState(0);
  const [maxYValueDay, setMaxYValueDay] = useState(40);
  const [dataChartMonth, setDataChartMonth] = useState(null);
  const [dataChartDay, setDataChartDay] = useState(null);

  // Fetch month and day names
  useEffect(() => {
    const fetchMonthNames = () => {
      const locale = navigator.language;
      const options = { month: "long" };
      const months = Array.from({ length: 7 }, (_, index) => {
        const currentDate = new Date();
        currentDate.setMonth(currentDate.getMonth() - index);
        return new Intl.DateTimeFormat(locale, options).format(currentDate);
      });
      setMonthNames(months.reverse());
    };

    const fetchDayNames = () => {
      const locale = navigator.language;
      const options = { weekday: "long" };
      const days = Array.from({ length: 7 }, (_, index) => {
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() - index);
        return new Intl.DateTimeFormat(locale, options).format(currentDate);
      });
      setDayNames(days.reverse());
    };

    fetchMonthNames();
    fetchDayNames();
  }, []);

  // Mise à jour des données du graphique mensuel
  useEffect(() => {
    if (chartData && chartData.length > 0 && monthNames.length > 0) {
      const minDataValueMonth = Math.min(...chartData);
      const maxDataValueMonth = Math.max(...chartData);

      setMinYValueMonth(Math.max(0, Math.floor(minDataValueMonth / 5) * 5));
      setMaxYValueMonth(Math.ceil(maxDataValueMonth / 5) * 5 + 5);

      setDataChartMonth({
        labels: monthNames,
        datasets: [
          {
            label: "Cigarettes fumées par mois",
            data: chartData,
            backgroundColor: [
              "rgba(255, 99, 132, 0.3)",
              "rgba(255, 159, 64, 0.3)",
              "rgba(255, 205, 86, 0.3)",
              "rgba(75, 192, 192, 0.3)",
              "rgba(54, 162, 235, 0.3)",
              "rgba(153, 102, 255, 0.3)",
              "rgba(55, 220, 79, 0.3)",
            ],
            borderColor: [
              "rgb(255, 99, 132)",
              "rgb(255, 159, 64)",
              "rgb(255, 205, 86)",
              "rgb(75, 192, 192)",
              "rgb(54, 162, 235)",
              "rgb(153, 102, 255)",
              "rgb(201, 203, 207)",
            ],
            borderWidth: 2,
          },
        ],
      });
    }
  }, [chartData, monthNames]);

  // Mise à jour des données du graphique journalier
  useEffect(() => {
    if (chartDataDay && chartDataDay.length > 0 && dayNames.length > 0) {
      const minDataValueDay = Math.min(...chartDataDay);
      const maxDataValueDay = Math.max(...chartDataDay);

      setMinYValueDay(Math.max(0, Math.floor(minDataValueDay / 5) * 5)); // Minimum à 0
      setMaxYValueDay(Math.ceil(maxDataValueDay / 5) * 5 + 5);

      setDataChartDay({
        labels: dayNames,
        datasets: [
          {
            label: "Cigarette fumée par jour",
            data: chartDataDay,
            backgroundColor: [
              "rgba(255, 99, 132, 0.3)",
              "rgba(255, 159, 64, 0.3)",
              "rgba(255, 205, 86, 0.3)",
              "rgba(75, 192, 192, 0.3)",
              "rgba(54, 162, 235, 0.3)",
              "rgba(153, 102, 255, 0.3)",
              "rgba(55, 220, 79, 0.3)",
            ],
            borderColor: [
              "rgb(255, 99, 132)",
              "rgb(255, 159, 64)",
              "rgb(255, 205, 86)",
              "rgb(75, 192, 192)",
              "rgb(54, 162, 235)",
              "rgb(153, 102, 255)",
              "rgb(201, 203, 207)",
            ],
            borderWidth: 2,
          },
        ],
      });
    }
  }, [chartDataDay, dayNames]);

  // Options du graphique
  const optionsDay = {
    maintainAspectRatio: false,
    responsive: true, // permet de rendre le graphique responsive
    scales: {
      x: {
        type: "category",
      },
      y: {
        beginAtZero: true,
        min: minYValueDay,
        max: maxYValueDay,
      },
    },
    plugins: {
      tooltip: {
        enabled: false,
      },
    },
  };

  const optionsMonth = {
    maintainAspectRatio: false,
    responsive: true, // permet de rendre le graphique responsive
    scales: {
      x: {
        type: "category",
      },
      y: {
        beginAtZero: true,
        min: minYValueMonth,
        max: maxYValueMonth,
      },
    },
    plugins: {
      tooltip: {
        enabled: false,
      },
    },
  };

  return (
    <div className={styles.App}>
      {dataChartDay ? (
        <div className={styles.graphcontainer}>
          <h2 className={styles.H2class} >Cigarettes fumées par jour</h2>
          <div className={styles.graphbarwrap}>
          <Bar data={dataChartDay} options={optionsDay} />

          </div>
        </div>
      ) : (
        <p>Aucune donnée disponible pour le graphique des jours</p>
      )}
      {dataChartMonth ? (
        <div className={styles.graphcontainer}>
          <h2 className={styles.H2class} >Cigarettes fumées par mois</h2>
          <div className={styles.graphbarwrap}>
          <Bar data={dataChartMonth} options={optionsMonth} />
            </div>
        </div>
      ) : (
        <p>Aucune donnée disponible pour le graphique des mois</p>
      )}
    </div>
  );
}

export default Graphebar;

// import styles from "../../styles/Graphebar.module.css";
// import { useState, useEffect } from "react";
// import { Bar } from "react-chartjs-2";

// function Graphebar({ chartData }) {
//   const [monthNames, setMonthNames] = useState([]);
//   const [dataChart, setDataChart] = useState(null);

//   // Récupérer les noms des mois en fonction de la langue du navigateur
//   useEffect(() => {
//     const fetchMonthNames = async () => {
//       try {
//         const locale = navigator.language;
//         const options = { month: "long" };
//         const months = Array.from({ length: 7 }, (_, index) => {
//           const currentDate = new Date();
//           currentDate.setMonth(currentDate.getMonth() - index);
//           return new Intl.DateTimeFormat(locale, options).format(currentDate);
//         });
//         setMonthNames(months.reverse());
//       } catch (error) {
//         console.error("Erreur lors de la récupération des mois :", error);
//       }
//     };
//     fetchMonthNames();
//   }, []); // Ce useEffect ne dépend de rien d'autre que le montage du composant

//   // Recalculer les données du graphique dès que `chartData` ou `monthNames` change
//   useEffect(() => {
//     if (chartData && monthNames.length > 0) {
//       const updatedDataChart = {
//         labels: monthNames,
//         datasets: [
//           {
//             label: "Cigarettes fumées par mois",
//             data: chartData, // Les données reçues du parent
//             backgroundColor: [
//               "rgba(255, 99, 132, 0.3)",
//               "rgba(255, 159, 64, 0.3)",
//               "rgba(255, 205, 86, 0.3)",
//               "rgba(75, 192, 192, 0.3)",
//               "rgba(54, 162, 235, 0.3)",
//               "rgba(153, 102, 255, 0.3)",
//               "rgba(55, 220, 79, 0.3)",
//             ],
//             borderColor: [
//               "rgb(255, 99, 132)",
//               "rgb(255, 159, 64)",
//               "rgb(255, 205, 86)",
//               "rgb(75, 192, 192)",
//               "rgb(54, 162, 235)",
//               "rgb(153, 102, 255)",
//               "rgb(201, 203, 207)",
//             ],
//             borderWidth: 2,
//           },
//         ],
//       };

//       setDataChart(updatedDataChart); // Mise à jour des données du graphique
//     }
//   }, [chartData, monthNames]); // Déclenche dès que chartData ou monthNames changent

//   const options = {
//     maintainAspectRatio: false,
//     aspectRatio: 1,
//     scales: {
//       x: {
//         type: "category",
//       },
//       y: {},
//     },
//   };

//   // Si les données ne sont pas encore prêtes, afficher un message de chargement
//   if (!dataChart) {
//     return <p>Chargement du graphique...</p>;
//   }

//   return (
//     <div className={styles.App}>
//       <Bar data={dataChart} options={options} height={200} />
//     </div>
//   );
// }

// export default Graphebar;

// import styles from "../../styles/Graphebar.module.css";
// import { useState, useEffect } from "react";
// import { Bar } from "react-chartjs-2";

// function Graphebar({ chartData }) {
//   const [monthNames, setMonthNames] = useState([]);
//   const [dataChart, setDataChart] = useState(null);

//   // Récupérer les noms des mois en fonction de la langue du navigateur
//   useEffect(() => {
//     const fetchMonthNames = async () => {
//       try {
//         const locale = navigator.language;
//         const options = { month: "long" };
//         const months = Array.from({ length: 7 }, (_, index) => {
//           const currentDate = new Date();
//           currentDate.setMonth(currentDate.getMonth() - index);
//           return new Intl.DateTimeFormat(locale, options).format(currentDate);
//         });
//         setMonthNames(months.reverse());
//       } catch (error) {
//         console.error("Erreur lors de la récupération des mois :", error);
//       }
//     };
//     fetchMonthNames();
//   }, []);
//   useEffect(() => {
//     console.log('Données du graphique mises à jour:', chartData);
//   }, [chartData]);
//   // Recalculer les données du graphique dès que `chartData` ou `monthNames` change
//   useEffect(() => {
//     if (chartData && monthNames.length > 0) {
//       const updatedDataChart = {
//         labels: monthNames,
//         datasets: [
//           {
//             label: "Cigarettes fumées par mois",
//             data: chartData, // Les données reçues du parent
//             backgroundColor: [
//               "rgba(255, 99, 132, 0.3)",
//               "rgba(255, 159, 64, 0.3)",
//               "rgba(255, 205, 86, 0.3)",
//               "rgba(75, 192, 192, 0.3)",
//               "rgba(54, 162, 235, 0.3)",
//               "rgba(153, 102, 255, 0.3)",
//               "rgba(55, 220, 79, 0.3)",
//             ],
//             borderColor: [
//               "rgb(255, 99, 132)",
//               "rgb(255, 159, 64)",
//               "rgb(255, 205, 86)",
//               "rgb(75, 192, 192)",
//               "rgb(54, 162, 235)",
//               "rgb(153, 102, 255)",
//               "rgb(201, 203, 207)",
//             ],
//             borderWidth: 2,
//           },
//         ],
//       };

//       setDataChart(updatedDataChart); // Mise à jour de `dataChart` lorsque `chartData` ou `monthNames` changent
//     }
//   }, [chartData, monthNames]); // Déclenche le useEffect lorsque `chartData` ou `monthNames` change

//   const options = {
//     maintainAspectRatio: false,
//     aspectRatio: 1,
//     scales: {
//       x: {
//         type: "category",
//       },
//       y: {},
//     },
//   };

//   // Si `dataChart` n'est pas encore défini (avant le premier chargement), afficher un message de chargement
//   if (!dataChart) {
//     return <p>Chargement du graphique...</p>;
//   }


//   return (
//     <div className={styles.App}>
//       <Bar data={dataChart} options={options} height={200} />
//     </div>
//   );
// }

// export default Graphebar;
// // import styles from "../../styles/Graphebar.module.css";

// // import { useState, useEffect } from "react";
// // import { Bar } from "react-chartjs-2";

// // function Graphebar({ chartData }) {
// //   const [monthNames, setMonthNames] = useState([]);
// //   // const [dataChart, setDataChart] = useState(null);
  

// //   useEffect(() => {
// //     // Récupération des noms des mois en fonction de la langue du navigateur
// //     const fetchMonthNames = async () => {
// //       try {
// //         const locale = navigator.language;
// //         const options = { month: "long" };
// //         const months = Array.from({ length: 7 }, (_, index) => {
// //           const currentDate = new Date();
// //           currentDate.setMonth(currentDate.getMonth() - index);
// //           return new Intl.DateTimeFormat(locale, options).format(currentDate);
// //         });
// //         setMonthNames(months.reverse());
// //       } catch (error) {
// //         console.error("Erreur lors de la récupération des mois :", error);
// //       }
// //     };
// //     fetchMonthNames();
// //   }, [chartData]);

// //   // useEffect(() => {
// //     // Recrée le graphique dès que chartData
// //     // if (chartData) {
// //     //   console.log(chartData, 'de graphbar Month dans useeffect RECUP DATA')
// //     //   set
      
// //       const dataChart = ({
// //         labels: monthNames,
// //         datasets: [
// //           {
// //             label: "Cigarettes fumées par mois",
// //             data: chartData, // Les données reçues du parent
// //             backgroundColor: [
// //               "rgba(255, 99, 132, 0.3)",
// //               "rgba(255, 159, 64, 0.3)",
// //               "rgba(255, 205, 86, 0.3)",
// //               "rgba(75, 192, 192, 0.3)",
// //               "rgba(54, 162, 235, 0.3)",
// //               "rgba(153, 102, 255, 0.3)",
// //               "rgba(55, 220, 79, 0.3)",
// //             ],
// //             borderColor: [
// //               "rgb(255, 99, 132)",
// //               "rgb(255, 159, 64)",
// //               "rgb(255, 205, 86)",
// //               "rgb(75, 192, 192)",
// //               "rgb(54, 162, 235)",
// //               "rgb(153, 102, 255)",
// //               "rgb(201, 203, 207)",
// //             ],
// //             borderWidth: 2,
// //           },
// //         ],
// //       });
// //   //   }
// //   // }, [chartData]); // Recrée le graphique si chartData ou monthNames change

// //   const options = {
// //     maintainAspectRatio: false,
// //     aspectRatio: 1,
// //     scales: {
// //       x: {
// //         type: "category",
// //       },
// //       y: {},
// //     },
// //   };

// //   if (!dataChart) {
// //     return <p>Chargement du graphique...</p>;
// //   }

// //   return (
// //     <div className={styles.App}>
// //       <Bar data={dataChart} options={options} height={200} />
// //     </div>
// //   );
// // }

// // export default Graphebar;