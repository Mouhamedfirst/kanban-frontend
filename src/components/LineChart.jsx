import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";
import api from "../services/api";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend
);

export default function LineChart() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      try {
        const res = await api.get("/reports/profit-vs-revenue");
        // res.data est un tableau d'objets { month, revenue, profit }
        const labels = res.data.map((d) => d.month);
        const revenue = res.data.map((d) => d.revenue);
        const profit = res.data.map((d) => d.profit);

        if (isMounted) {
          setChartData({
            labels,
            datasets: [
              {
                label: "Revenue",
                data: revenue,
                borderColor: "rgba(59,130,246,0.8)",
                tension: 0.3,
                fill: false,
              },
              {
                label: "Profit",
                data: profit,
                borderColor: "rgba(234,179,8,0.8)",
                tension: 0.3,
                fill: false,
              },
            ],
          });
        }
      } catch (err) {
        console.error("Erreur API profit-vs-revenue :", err);
      }
    }

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []); // exécution une seule fois au montage

  if (!chartData) {
    return <div className="p-4">Chargement du graphique…</div>;
  }

  return (
    <div className="bg-white p-4 rounded shadow h-full flex flex-col">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold text-gray-700">Profit vs Revenue</h3>
        <span className="text-sm text-gray-400">Derniers 12 mois</span>
      </div>
      <div className="flex-1">
        <Line
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { position: "top" } },
          }}
        />
      </div>
    </div>
  );
}
