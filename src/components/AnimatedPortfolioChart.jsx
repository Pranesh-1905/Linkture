import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function AnimatedPortfolioChart({ apiUrl }) {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  // Fetch chart data every 5 seconds
  useEffect(() => {
    const fetchData = () => {
      fetch(apiUrl)
        .then((res) => res.json())
        .then((data) => {
          setChartData({
            labels: data.map((d) => d.month),
            datasets: [
              {
                label: "Investment ($M)",
                data: data.map((d) => d.investment),
                borderColor: "rgba(59, 130, 246, 1)",
                backgroundColor: "rgba(59, 130, 246, 0.2)",
                tension: 0.4, // smooth curve
              },
            ],
          });
        })
        .catch((err) => console.error("Chart fetch error:", err));
    };

    fetchData(); // initial fetch
    const interval = setInterval(fetchData, 5000); // update every 5 seconds
    return () => clearInterval(interval);
  }, [apiUrl]);

  const options = {
    responsive: true,
    animation: {
      duration: 1000,
      easing: "easeOutQuart",
    },
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      title: {
        display: true,
        text: "Portfolio Investments Over Time",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Line data={chartData} options={options} />;
}