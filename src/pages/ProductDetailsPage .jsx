import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Topbar from "../components/Topbar";
import Tabs from "../components/Tabs";
import ProductDetailsCard from "../components/ProductDetailsCard";
import api from "../services/api";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("Overview");
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get(`/products/${id}`);
        setProduct(res.data.data || res.data);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) return <p className="p-6 text-center">Chargement...</p>;
  if (!product) return <p className="p-6 text-red-600">Produit introuvable.</p>;

  return (
    <div className="flex flex-col bg-gray-100 min-h-screen">
      <Topbar />
      <div className="p-6">
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {activeTab === "Overview" && <ProductDetailsCard product={product} />}
        {activeTab === "Purchases" && (
          <div className="bg-white p-6 rounded shadow">Purchases history here…</div>
        )}
        {activeTab === "Adjustments" && (
          <div className="bg-white p-6 rounded shadow">Adjustments logs…</div>
        )}
        {activeTab === "History" && (
          <div className="bg-white p-6 rounded shadow">Stock history…</div>
        )}
      </div>
    </div>
  );
}
