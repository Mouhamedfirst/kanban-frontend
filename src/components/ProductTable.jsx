import { useNavigate } from "react-router-dom";

export default function ProductTable({ products, onAdd }) {
  const navigate = useNavigate();

  const getStatus = (q, t) =>
    q <= 0 ? "Out of stock" : q <= t ? "Low stock" : "In stock";
  const colors = { "In stock": "text-green-600", "Low stock": "text-yellow-600", "Out of stock": "text-red-600" };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mt-6">
      <div className="flex flex-col sm:flex-row justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Produits</h3>
        <button
          onClick={onAdd}
          className="mt-2 sm:mt-0 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Ajouter un produit
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-gray-700">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Nom</th>
              <th className="p-2 text-center">Achat</th>
              <th className="p-2 text-center">Vente</th>
              <th className="p-2 text-center">Qté</th>
              <th className="p-2 text-center">Seuil</th>
              <th className="p-2 text-center">Exp.</th>
              <th className="p-2 text-center">Statut</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => {
              const st = getStatus(p.quantity, p.threshold);
              return (
                <tr
                  key={p.id}
                  className="border-t hover:bg-gray-50 cursor-pointer"
                  onClick={() => navigate(`/products/${p.id}`)}
                >
                  <td className="p-2">{p.name}</td>
                  <td className="p-2 text-center">{p.buying_price} CFA</td>
                  <td className="p-2 text-center">{p.selling_price} CFA</td>
                  <td className="p-2 text-center">{p.quantity}</td>
                  <td className="p-2 text-center">{p.threshold}</td>
                  <td className="p-2 text-center">{p.expiry_date || "—"}</td>
                  <td className={`p-2 text-center font-medium ${colors[st]}`}>{st}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center text-sm mt-4">
        <button className="text-blue-600 hover:underline">Précédent</button>
        <span>Page 1 / {Math.ceil(products.length / 10)}</span>
        <button className="text-blue-600 hover:underline">Suivant</button>
      </div>
    </div>
  );
}
