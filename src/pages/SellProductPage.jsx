import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../services/api";
import Topbar from "../components/Topbar";

export default function SellProductPage() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    product_id: "",
    quantity: 1,
    buying_price: "",
    selling_price: "",
    sale_date: new Date().toISOString().slice(0, 10),
  });

  useEffect(() => {
    api.get("/products")
      .then((res) => setProducts(res.data.data || res.data))
      .catch(() => toast.error("Erreur chargement produits"));
  }, []);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/sales", form);
      toast.success("Vente enregistrée !");
      setForm({
        product_id: "",
        quantity: 1,
        buying_price: "",
        selling_price: "",
        sale_date: new Date().toISOString().slice(0, 10),
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "Erreur lors de la vente.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Topbar />
      <main className="flex-grow flex justify-center items-start pt-12 px-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-3xl font-extrabold text-gray-800 mb-8 text-center">Nouvelle vente</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="product_id" className="block text-sm font-medium text-gray-700 mb-2">
                Produit
              </label>
              <select
                id="product_id"
                name="product_id"
                value={form.product_id}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg p-3 text-gray-900
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                  transition"
              >
                <option value="" disabled>-- Sélectionner --</option>
                {products.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} (Stock: {p.quantity})
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
                  Quantité
                </label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  min="1"
                  value={form.quantity}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg p-3 text-gray-900
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                    transition"
                />
              </div>

              <div>
                <label htmlFor="buying_price" className="block text-sm font-medium text-gray-700 mb-2">
                  Prix d'achat
                </label>
                <input
                  type="number"
                  id="buying_price"
                  name="buying_price"
                  min="0"
                  value={form.buying_price}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg p-3 text-gray-900
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                    transition"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="selling_price" className="block text-sm font-medium text-gray-700 mb-2">
                  Prix de vente
                </label>
                <input
                  type="number"
                  id="selling_price"
                  name="selling_price"
                  min="0"
                  value={form.selling_price}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg p-3 text-gray-900
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                    transition"
                />
              </div>

              <div>
                <label htmlFor="sale_date" className="block text-sm font-medium text-gray-700 mb-2">
                  Date
                </label>
                <input
                  type="date"
                  id="sale_date"
                  name="sale_date"
                  value={form.sale_date}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg p-3 text-gray-900
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                    transition"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white text-lg font-semibold rounded-lg py-3
                hover:bg-blue-700 transition shadow-md hover:shadow-lg"
            >
              Enregistrer la vente
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
