import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { RefreshCw } from "lucide-react";
import api from "../services/api";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
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


export default function OrdersChart() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = () => {
    setLoading(true);
    api.get("/dashboard/orders-summary")
      .then(({ data: res }) => {
        setData({
          labels: res.ordered.map((o) => o.month),
          datasets: [
            {
              label: "Commandes",
              data: res.ordered.map((o) => o.ordered),
              borderColor: "rgba(37, 99, 235, 0.8)",
              backgroundColor: "rgba(37, 99, 235, 0.3)",
              tension: 0.3,
            },
            {
              label: "Livrées",
              data: res.delivered.map((d) => d.delivered),
              borderColor: "rgba(16, 185, 129, 0.8)",
              backgroundColor: "rgba(16, 185, 129, 0.3)",
              tension: 0.3,
            },
          ],
        });
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">
          Synthèse des commandes
        </h3>
        <button
          onClick={fetchData}
          disabled={loading}
          className="text-sm flex items-center gap-1 text-blue-600 hover:underline"
        >
          <RefreshCw className="w-4 h-4" />
          {loading ? "Chargement..." : "Rafraîchir"}
        </button>
      </div>
      {data ? (
        <div className="relative h-64">
          <Line data={data} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>
      ) : (
        <p className="p-4 text-center">Chargement…</p>
      )}
    </div>
  );
}