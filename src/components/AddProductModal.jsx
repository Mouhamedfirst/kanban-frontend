import { useEffect, useState } from "react";
import api from "../services/api";
import { toast } from "sonner";

export default function AddProductModal({ onClose, onAddProduct }) {
  const [product, setProduct] = useState({
    name: "",
    category_id: "",
    supplier_id: "",
    buying_price: "",
    selling_price: "",
    quantity: "",
    threshold: "",
    expiry_date: "",
  });
  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const [catRes, supRes] = await Promise.all([
          api.get("/categories"),
          api.get("/suppliers"),
        ]);
        setCategories(catRes.data.data || catRes.data);
        setSuppliers(supRes.data.data || supRes.data);
      } catch (err) {
        console.error(err);
        toast.error("Impossible de charger les catégories/fournisseurs.");
      }
    })();
  }, []);

  const handleChange = (e) =>
    setProduct({ ...product, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // validation minimale
    if (!product.name || !product.category_id) {
      toast.warning("Nom et catégorie obligatoires.");
      return;
    }
    const payload = {
      ...product,
      supplier_id: product.supplier_id || null,
      category_id: parseInt(product.category_id),
      buying_price: parseFloat(product.buying_price),
      selling_price: parseFloat(product.selling_price),
      quantity: parseInt(product.quantity),
      threshold: parseInt(product.threshold),
    };
    onAddProduct(payload);
    toast.success("Produit ajouté avec succès !");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 space-y-4 overflow-y-auto max-h-full"
      >
        <h2 className="text-2xl font-semibold">Nouveau produit</h2>
        <input
          name="name"
          value={product.name}
          onChange={handleChange}
          placeholder="Nom du produit"
          className="w-full border rounded px-3 py-2"
          required
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input
            name="buying_price"
            type="number"
            value={product.buying_price}
            onChange={handleChange}
            placeholder="Prix d'achat"
            className="border rounded px-3 py-2"
            required
          />
          <input
            name="selling_price"
            type="number"
            value={product.selling_price}
            onChange={handleChange}
            placeholder="Prix de vente"
            className="border rounded px-3 py-2"
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input
            name="quantity"
            type="number"
            value={product.quantity}
            onChange={handleChange}
            placeholder="Quantité"
            className="border rounded px-3 py-2"
            required
          />
          <input
            name="threshold"
            type="number"
            value={product.threshold}
            onChange={handleChange}
            placeholder="Seuil"
            className="border rounded px-3 py-2"
            required
          />
        </div>

        <input
          name="expiry_date"
          type="date"
          value={product.expiry_date}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />

        <select
          name="category_id"
          value={product.category_id}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          required
        >
          <option value="">Sélectionner une catégorie</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        <select
          name="supplier_id"
          value={product.supplier_id}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        >
          <option value="">Aucun fournisseur</option>
          {suppliers.map((sup) => (
            <option key={sup.id} value={sup.id}>
              {sup.name}
            </option>
          ))}
        </select>

        <div className="flex justify-end space-x-2 mt-4">
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
