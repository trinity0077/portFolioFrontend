import styles from "../../styles/Graphebar.module.css";
import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";

function Graphebarjour({ chartDataDay }) {
  // État pour les noms des jours
  const [dayNames, setDayNames] = useState([]);
  // États pour les valeurs min/max de l'axe Y
  const [minYValue, setMinYValue] = useState(0);
  const [maxYValue, setMaxYValue] = useState(40);
  // État pour les données du graphique
  const [dataChart, setDataChart] = useState(null);

  // Génération des noms des jours
  useEffect(() => {
    const fetchDayNames = () => {
      try {
        const locale = navigator.language; // Langue du navigateur
        const options = { weekday: "long" }; // Récupérer les noms des jours
        const days = Array.from({ length: 7 }, (_, index) => {
          const currentDate = new Date();
          currentDate.setDate(currentDate.getDate() - index);
          return new Intl.DateTimeFormat(locale, options).format(currentDate);
        });
        setDayNames(days.reverse());
      } catch (error) {
        console.error("Erreur lors de la récupération des noms des jours :", error);
      }
    };
    fetchDayNames();
  }, []);

  // Mise à jour des données du graphique
  useEffect(() => {
    if (chartDataDay && chartDataDay.length > 0 && dayNames.length > 0) {
      const minDataValue = Math.min(...chartDataDay);
      const maxDataValue = Math.max(...chartDataDay);

      setMinYValue(Math.floor(minDataValue / 5) * 5 - 5); // Ajuster la valeur minimale
      setMaxYValue(Math.ceil(maxDataValue / 5) * 5 + 5); // Ajuster la valeur maximale

      // Mettre à jour `dataChart`
      setDataChart({
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
    } else {
      setDataChart(null);
    }
  }, [chartDataDay, dayNames]);

  // Options du graphique
  const options = {
    maintainAspectRatio: false,
    aspectRatio: 1,
    scales: {
      x: {
        type: "category",
      },
      y: {
        beginAtZero: true,
        min: minYValue,
        max: maxYValue,
      },
    },
    plugins: {
      tooltip: {
        enabled: false, // Désactiver les infobulles
      },
    },
  };

  return dataChart ? (
    <div className={styles.App}>
      <Bar data={dataChart} options={options} height={200} />
    </div>
  ) : (
    <p>Aucune donnée disponible</p>
  );
}

export default Graphebarjour;