import { useEffect, useState } from "react";
import api from "../services/api";
import { addOrder } from "../services/order";
import { toast } from "sonner";

export default function AddOrderModal({ onClose, onOrderAdded }) {
  const [form, setForm] = useState({
    product_id: "",
    supplier_id: "",
    quantity: "",
    expected_date: "",
    order_value: "",
    status: "confirmed",
    store_id: "",
    user_id: "",
  });
  const [options, setOptions] = useState({
    products: [],
    suppliers: [],
    stores: [],
    users: [],
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const [p, s, st, u] = await Promise.all([
          api.get("/products"),
          api.get("/suppliers"),
          api.get("/stores"),
          api.get("/user"),
        ]);
        setOptions({
          products: p.data.data || p.data,
          suppliers: s.data.data || s.data,
          stores: st.data.data || st.data,
          users: u.data.data ? u.data.data : [u.data],
        });
      } catch (err) {
        console.error(err);
        toast.error("Impossible de charger les données nécessaires.");
      }
    })();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    try {
      const payload = {
        ...form,
        quantity: parseInt(form.quantity),
        order_value: parseFloat(form.order_value),
        store_id: form.store_id || null,
      };
      const res = await addOrder(payload);
      toast.success("Commande ajoutée avec succès !");
      onOrderAdded(res.data.data || res.data);
    } catch (err) {
      if (err.response?.status === 422) {
        setErrors(err.response.data.errors || {});
        toast.error("Veuillez corriger les erreurs du formulaire.");
      } else {
        console.error(err);
        toast.error("Erreur lors de l'ajout de la commande.");
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-xl w-full max-w-2xl p-6 overflow-y-auto max-h-full"
      >
        <h2 className="text-2xl font-semibold mb-4">Nouvelle commande</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* Product */}
          <div>
            <label className="block text-sm font-medium mb-1">Produit</label>
            <select
              name="product_id"
              value={form.product_id}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            >
              <option value="">Sélectionner</option>
              {options.products.map((p) => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
            {errors.product_id && <p className="mt-1 text-red-600 text-sm">{errors.product_id[0]}</p>}
          </div>
          {/* Supplier */}
          <div>
            <label className="block text-sm font-medium mb-1">Fournisseur</label>
            <select
              name="supplier_id"
              value={form.supplier_id}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Sélectionner</option>
              {options.suppliers.map((s) => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
            {errors.supplier_id && <p className="mt-1 text-red-600 text-sm">{errors.supplier_id[0]}</p>}
          </div>
          {/* Quantity */}
          <div>
            <label className="block text-sm font-medium mb-1">Quantité</label>
            <input
              type="number"
              name="quantity"
              value={form.quantity}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
            {errors.quantity && <p className="mt-1 text-red-600 text-sm">{errors.quantity[0]}</p>}
          </div>
          {/* Order Value */}
          <div>
            <label className="block text-sm font-medium mb-1">Valeur</label>
            <input
              type="number"
              name="order_value"
              value={form.order_value}
              onChange={handleChange}
              step="0.01"
              className="w-full border rounded px-3 py-2"
              required
            />
            {errors.order_value && <p className="mt-1 text-red-600 text-sm">{errors.order_value[0]}</p>}
          </div>
          {/* Expected Date */}
          <div>
            <label className="block text-sm font-medium mb-1">Date prévue</label>
            <input
              type="date"
              name="expected_date"
              value={form.expected_date}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
            {errors.expected_date && <p className="mt-1 text-red-600 text-sm">{errors.expected_date[0]}</p>}
          </div>
          {/* Status */}
          <div>
            <label className="block text-sm font-medium mb-1">Statut</label>
            <select
              name="status"
              value={form.status}
              disabled
              className="w-full border rounded px-3 py-2 bg-gray-100 text-gray-700 cursor-not-allowed"
            >
              <option value="confirmed">Confirmé</option>
        {/*   <option value="on_the_way">En route</option>
              <option value="delivered">Livré</option>
              <option value="returned">Retourné</option>
              <option value="delayed">Retardé</option>*/}
            </select>
          </div>
          {/* Store */}
          <div>
            <label className="block text-sm font-medium mb-1">Magasin</label>
            <select
              name="store_id"
              value={form.store_id}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Sélectionner</option>
              {options.stores.map((st) => (
                <option key={st.id} value={st.id}>{st.name}</option>
              ))}
            </select>
          </div>
          {/* User */}
          <div>
            <label className="block text-sm font-medium mb-1">Utilisateur</label>
            <select
              name="user_id"
              value={form.user_id}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            >
              <option value="">Sélectionner</option>
              {options.users.map((u) => (
                <option key={u.id} value={u.id}>{u.name}</option>
              ))}
            </select>
            {errors.user_id && <p className="mt-1 text-red-600 text-sm">{errors.user_id[0]}</p>}
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200"
          >
            Annuler
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Ajouter
          </button>
        </div>
      </form>
    </div>
  );
}
