import { useEffect, useState } from "react";
import SummaryTile from "../components/SummaryTile";
import LineChart from "../components/LineChart";
import DataCard from "../components/DataCard";
import api from "../services/api";

export default function ReportsPage() {
  const [overview, setOverview] = useState(null);
  const [bestCategories, setBestCategories] = useState([]);
  const [bestProducts, setBestProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchReports() {
      try {
        const [{ data: ov }, { data: bc }, { data: bp }] = await Promise.all([
          api.get("/reports/overview"),
          api.get("/reports/best-categories"),
          api.get("/reports/best-products"),
        ]);
        setOverview(ov);
        setBestCategories(bc);
        setBestProducts(bp);
      } catch (e) {
        console.error(e);
        setError("Impossible de charger les rapports.");
      } finally {
        setLoading(false);
      }
    }
    fetchReports();
  }, []);

  if (loading) {
    return <p className="p-6 text-center">Chargement des rapports…</p>;
  }
  if (error) {
    return <p className="p-6 text-red-600">{error}</p>;
  }

  // Tuiles de résumé (sans les variations)
  const overviewItems = [
    { title: "Profit total", value: `${overview.total_profit} CFA` },
    { title: "Revenu", value: `${overview.total_revenue} CFA` },
    { title: "Coût des marchandises", value: `${overview.total_cost} CFA` },
    { title: "Achats nets", value: `${overview.total_purchases} CFA` },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen space-y-6">
      <h1 className="text-2xl font-bold">Rapports</h1>

      {/* Résumé */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {overviewItems.map((item, i) => (
          <SummaryTile key={i} title={item.title} value={item.value} />
        ))}
      </div>

      {/* Meilleures catégories + Graphique Profit vs Revenu */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <DataCard title="Meilleures catégories" data={bestCategories} />
        <LineChart />
      </div>

      {/* Meilleurs produits */}
      <DataCard title="Meilleurs produits" data={bestProducts} />
    </div>
  );
}
