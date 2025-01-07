import styles from "../../styles/Graphebar.module.css";
import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";

function Graphebar({ chartData }) {
  const [monthNames, setMonthNames] = useState([]);
  const [dataChart, setDataChart] = useState(null);

  // Récupérer les noms des mois en fonction de la langue du navigateur
  useEffect(() => {
    const fetchMonthNames = async () => {
      try {
        const locale = navigator.language;
        const options = { month: "long" };
        const months = Array.from({ length: 7 }, (_, index) => {
          const currentDate = new Date();
          currentDate.setMonth(currentDate.getMonth() - index);
          return new Intl.DateTimeFormat(locale, options).format(currentDate);
        });
        setMonthNames(months.reverse());
      } catch (error) {
        console.error("Erreur lors de la récupération des mois :", error);
      }
    };
    fetchMonthNames();
  }, []);
  useEffect(() => {
    console.log('Données du graphique mises à jour:', chartData);
  }, [chartData]);
  // Recalculer les données du graphique dès que `chartData` ou `monthNames` change
  useEffect(() => {
    if (chartData && monthNames.length > 0) {
      const updatedDataChart = {
        labels: monthNames,
        datasets: [
          {
            label: "Cigarettes fumées par mois",
            data: chartData, // Les données reçues du parent
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
      };

      setDataChart(updatedDataChart); // Mise à jour de `dataChart` lorsque `chartData` ou `monthNames` changent
    }
  }, [chartData, monthNames]); // Déclenche le useEffect lorsque `chartData` ou `monthNames` change

  const options = {
    maintainAspectRatio: false,
    aspectRatio: 1,
    scales: {
      x: {
        type: "category",
      },
      y: {},
    },
  };

  // Si `dataChart` n'est pas encore défini (avant le premier chargement), afficher un message de chargement
  if (!dataChart) {
    return <p>Chargement du graphique...</p>;
  }


  return (
    <div className={styles.App}>
      <Bar data={dataChart} options={options} height={200} />
    </div>
  );
}

export default Graphebar;
// import styles from "../../styles/Graphebar.module.css";

// import { useState, useEffect } from "react";
// import { Bar } from "react-chartjs-2";

// function Graphebar({ chartData }) {
//   const [monthNames, setMonthNames] = useState([]);
//   // const [dataChart, setDataChart] = useState(null);
  

//   useEffect(() => {
//     // Récupération des noms des mois en fonction de la langue du navigateur
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
//   }, [chartData]);

//   // useEffect(() => {
//     // Recrée le graphique dès que chartData
//     // if (chartData) {
//     //   console.log(chartData, 'de graphbar Month dans useeffect RECUP DATA')
//     //   set
      
//       const dataChart = ({
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
//       });
//   //   }
//   // }, [chartData]); // Recrée le graphique si chartData ou monthNames change

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
