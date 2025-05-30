import { useState, useEffect } from "react";
import api from "../services/api";
import { toast } from "sonner";

export default function StoreModal({ store, onClose, onSave }) {
  const [form, setForm] = useState({
    name: "",
    address: "",
    phone: "",
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (store) {
      setForm({
        name: store.name || "",
        address: store.address || "",
        phone: store.phone || "",
      });
    }
  }, [store]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const { name, address } = form;
    if (!name.trim() || !address.trim()) {
      toast.warning("Le nom et l'adresse sont obligatoires.");
      return;
    }
    setSubmitting(true);
    try {
      if (store) {
        await api.put(`/stores/${store.id}`, form);
        toast.success("Magasin mis à jour avec succès !");
      } else {
        await api.post("/stores", form);
        toast.success("Magasin ajouté avec succès !");
      }
      onSave(); // recharge la liste
    } catch (err) {
      console.error(err);
      toast.error("Erreur lors de l'enregistrement du magasin.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">
          {store ? "Modifier le magasin" : "Ajouter un magasin"}
        </h2>
        <div className="space-y-4">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Nom"
            className="w-full border rounded px-3 py-2"
          />
          <input
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Adresse"
            className="w-full border rounded px-3 py-2"
          />
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Téléphone"
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div className="mt-6 flex justify-end space-x-2">
          <button
            onClick={onClose}
            disabled={submitting}
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            Annuler
          </button>
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {submitting ? "Enregistrement..." : "Enregistrer"}
          </button>
        </div>
      </div>
    </div>
  );
}
