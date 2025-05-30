import { useEffect, useState } from "react";
import Topbar from "../components/Topbar";
import SupplierTable from "../components/SupplierTable";
import AddSupplierModal from "../components/AddSupplierModal";
import api from "../services/api";

export default function SuppliersPage() {
  const [suppliers, setSuppliers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    api.get("/suppliers").then((res) => {
      const data = res.data.data || res.data;
      setSuppliers(data);
      setFiltered(data);
    });
  }, []);

  const handleAddSupplier = async (formData) => {
    await api.post("/suppliers", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    const res = await api.get("/suppliers");
    const data = res.data.data || res.data;
    setSuppliers(data);
    setFiltered(data);
    setShowModal(false);
  };

  // Filtrage fournisseurs
  const handleSearch = (query) => {
    if (!query) {
      setFiltered(suppliers);
    } else {
      const q = query.toLowerCase();
      setFiltered(
        suppliers.filter(
          (s) =>
            s.name.toLowerCase().includes(q) ||
            (s.company && s.company.toLowerCase().includes(q)) ||
            (s.email && s.email.toLowerCase().includes(q))
        )
      );
    }
  };

  return (
    <div className="flex flex-col bg-gray-100 min-h-screen">
      <Topbar onSearch={handleSearch} />
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Suppliers</h1>
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Add Supplier
          </button>
        </div>
        <SupplierTable suppliers={filtered} />
        {showModal && (
          <AddSupplierModal
            onClose={() => setShowModal(false)}
            onAddSupplier={handleAddSupplier}
          />
        )}
      </div>
    </div>
  );
}
