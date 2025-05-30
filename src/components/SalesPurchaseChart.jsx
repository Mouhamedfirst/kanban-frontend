import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import api from "../services/api";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function SalesPurchaseChart() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    api.get("/dashboard/sales-vs-purchases")
      .then(({ data: res }) => {
        setChartData({
          labels: res.sales.map((_, i) => res.sales[i].month), 
          datasets: [
            {
              label: "Ventes",
              data: res.sales.map((s) => s.total_sales),
              backgroundColor: "rgba(37, 99, 235, 0.7)",
            },
            {
              label: "Achats",
              data: res.purchases.map((p) => p.total_purchases),
              backgroundColor: "rgba(16, 185, 129, 0.7)",
            },
          ],
        });
      })
      .catch(console.error);
  }, []);

  if (!chartData) return <p className="p-4 text-center">Chargement du graphique…</p>;

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Ventes vs Achats</h3>
      <div className="relative h-64">
        <Bar data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
      </div>
    </div>
  );
}
