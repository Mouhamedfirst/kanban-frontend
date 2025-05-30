import { useEffect, useState } from "react";
import Topbar from "../components/Topbar";
import SummaryCard from "../components/SummaryCard";
import StockTable from "../components/StockTable";
import SalesPurchaseChart from "../components/SalesPurchaseChart";
import OrdersChart from "../components/OrdersChart";
import api from "../services/api";

export default function DashboardPage() {
  const [summary, setSummary] = useState(null);
  const [salesVsPurchases, setSalesVsPurchases] = useState(null);
  const [ordersSummary, setOrdersSummary] = useState(null);
  const [topSelling, setTopSelling] = useState([]);
  const [lowStock, setLowStock] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const [
        sumRes,
        svpRes,
        ordSumRes,
        topRes,
        lowRes,
      ] = await Promise.all([
        api.get("/dashboard/summary"),
        api.get("/dashboard/sales-vs-purchases"),
        api.get("/dashboard/orders-summary"),
        api.get("/dashboard/top-selling-products?limit=3"),
        api.get("/dashboard/low-stock-products?limit=5"),
      ]);
      setSummary(sumRes.data);
      setSalesVsPurchases(svpRes.data);
      setOrdersSummary(ordSumRes.data);
      setTopSelling(topRes.data);
      setLowStock(lowRes.data);
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return <p className="p-6 text-center">Chargement du tableau de bord…</p>;
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
      {/* Topbar */}
      <div className="lg:flex-1">
        <Topbar />

        <div className="p-6 space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <SummaryCard title="Catégories" value={summary.total_categories} icon="📂" />
            <SummaryCard title="Produits" value={summary.total_products} icon="📦" />
            <SummaryCard title="Fournisseurs" value={summary.total_suppliers} icon="🚚" />
            <SummaryCard title="Stock total" value={summary.quantity_in_hand} icon="📊" />
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <SalesPurchaseChart data={salesVsPurchases} />
            <OrdersChart data={ordersSummary} />
          </div>

          {/* Stock Tables */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <StockTable title="Top des ventes" data={topSelling} />
            <StockTable title="Stock faible" data={lowStock} />
          </div>
        </div>
      </div>
    </div>
  );
}
