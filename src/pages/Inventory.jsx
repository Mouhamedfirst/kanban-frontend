import { useEffect, useState } from "react";
import Topbar from "../components/Topbar";
import SummaryTile from "../components/SummaryTile";
import ProductTable from "../components/ProductTable";
import AddProductModal from "../components/AddProductModal";
import api from "../services/api";

export default function InventoryPage() {
  const [showModal, setShowModal] = useState(false);
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [prodRes, sumRes] = await Promise.all([
        api.get("/products"),
        api.get("/dashboard/summary"),
      ]);
      setProducts(prodRes.data);
      setFiltered(prodRes.data);
      setSummary(sumRes.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddProduct = async (newProd) => {
    await api.post("/products", newProd);
    await fetchData();
    setShowModal(false);
  };

  // Filtrage produit
  const handleSearch = (query) => {
    if (!query) {
      setFiltered(products);
    } else {
      const q = query.toLowerCase();
      setFiltered(
        products.filter((p) => {
          const categoryName = p.category?.name || ""; // récupère le nom ou ""
          return (
            p.name.toLowerCase().includes(q) ||
            categoryName.toLowerCase().includes(q)
          );
        })
      );
    }
  };

  if (loading) return <p className="p-6 text-center">Chargement…</p>;

  return (
    <div className="flex flex-col lg:flex-row bg-gray-100 min-h-screen">
      <div className="lg:flex-1">
        <Topbar onSearch={handleSearch} />
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Inventory</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <SummaryTile
              title="Categories"
              value={summary.total_categories}
              subtitle="Total"
            />
            <SummaryTile
              title="Total Products"
              value={summary.total_products}
              subtitle={`Stock: ${summary.quantity_in_hand}`}
            />
            <SummaryTile
              title="Low Stocks"
              value={summary.low_stock_count}
              subtitle={`${summary.out_of_stock_count} out of stock`}
              color="text-red-600"
            />
            <SummaryTile
              title="To be received"
              value={summary.to_be_received}
              subtitle="Pending orders"
              color="text-purple-600"
            />
          </div>

          <ProductTable products={filtered} onAdd={() => setShowModal(true)} />

          {showModal && (
            <AddProductModal
              onClose={() => setShowModal(false)}
              onAddProduct={handleAddProduct}
            />
          )}
        </div>
      </div>
    </div>
  );
}
