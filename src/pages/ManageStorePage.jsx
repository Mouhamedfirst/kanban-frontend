import { useEffect, useState } from "react";
import StoreCard from "../components/StoreCard";
import StoreModal from "../components/StoreModal";
import api from "../services/api";

export default function ManageStorePage() {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedStore, setSelectedStore] = useState(null); // null = ajout

  useEffect(() => {
    fetchStores();
  }, []);

  const fetchStores = async () => {
    try {
      const { data } = await api.get("/stores");
      setStores(data);
    } catch (err) {
      console.error("Erreur lors du chargement des magasins", err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (store) => {
    setSelectedStore(store);
    setModalOpen(true);
  };

  const handleAdd = () => {
    setSelectedStore(null);
    setModalOpen(true);
  };

  const handleSave = () => {
    setModalOpen(false);
    fetchStores();
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestion des magasins</h1>
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Ajouter un magasin
        </button>
      </div>

      {loading ? (
        <p>Chargement…</p>
      ) : (
        stores.map((store) => (
          <StoreCard key={store.id} store={store} onEdit={handleEdit} />
        ))
      )}

      {modalOpen && (
        <StoreModal
          store={selectedStore}
          onClose={() => setModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
