import { useNavigate } from "react-router-dom";
import { updateOrderStatus } from "../services/order";
import { useState } from "react";
import { toast } from "sonner";

export default function OrderTable({ orders, onAdd, onReload }) {
  const navigate = useNavigate();
  const [loadingIds, setLoadingIds] = useState([]);

  const statusStyles = {
    confirmed: "bg-blue-100 text-blue-700",
    on_the_way: "bg-yellow-100 text-yellow-700",
    delivered: "bg-green-100 text-green-700",
    returned: "bg-purple-100 text-purple-700",
    delayed: "bg-red-100 text-red-700",
  };

  const statusLabels = {
    confirmed: "Confirmée",
    on_the_way: "En route",
    delivered: "Livrée",
    returned: "Retournée",
    delayed: "Retardée",
  };

  const handleStatusChange = async (orderId, newStatus) => {
    setLoadingIds((prev) => [...prev, orderId]);
    try {
      await updateOrderStatus(orderId, newStatus);
      toast.success("Statut mis à jour !");
      if (typeof onReload === "function") {
        onReload(); // recharge la liste complète
      } else {
        // si on ne recharge pas, on peut mettre à jour localement :
        const idx = orders.findIndex((o) => o.id === orderId);
        if (idx > -1) orders[idx].status = newStatus;
      }
    } catch (err) {
      console.error(err);
      toast.error("Impossible de mettre à jour le statut.");
    } finally {
      setLoadingIds((prev) => prev.filter((id) => id !== orderId));
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mt-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Commandes</h3>
        <button
          onClick={onAdd}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition mt-2 sm:mt-0"
        >
          Nouvelle commande
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-gray-700">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Produit</th>
              <th className="p-3">Valeur</th>
              <th className="p-3">Quantité</th>
              <th className="p-3">ID</th>
              <th className="p-3">Prévue</th>
              <th className="p-3">Statut</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id} className="border-b hover:bg-gray-50">
                <td
                  className="p-3 cursor-pointer hover:underline"
                  onClick={() => navigate(`/orders/${o.id}`)}
                >
                  {o.product?.name || "—"}
                </td>
                <td className="p-3 text-center">{o.order_value ?? "—"} CFA</td>
                <td className="p-3 text-center">{o.quantity ?? "—"}</td>
                <td className="p-3 text-center">{o.id}</td>
                <td className="p-3 text-center">{o.expected_date || "—"}</td>
                <td className="p-3 text-center">
                  <div className="inline-flex items-center space-x-2">
                    <span
                      className={`text-xs px-2 py-1 rounded-full font-medium ${
                        statusStyles[o.status] ?? "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {statusLabels[o.status] || "Inconnu"}
                    </span>
                    <select
                      value={o.status}
                      onChange={(e) => handleStatusChange(o.id, e.target.value)}
                      disabled={loadingIds.includes(o.id)}
                      className="text-sm border rounded p-1 bg-white"
                    >
                      {Object.entries(statusLabels).map(([value, label]) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                    </select>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center text-sm mt-4">
        <button className="text-blue-600 hover:underline">Précédent</button>
        <span>Page 1 / 10</span>
        <button className="text-blue-600 hover:underline">Suivant</button>
      </div>
    </div>
  );
}
