import { useState, useEffect } from "react";
import api from "../services/api";

export default function SupplierTable({ suppliers }) {
  const [page, setPage] = useState(1);
  const perPage = 5;
  const [ordersMap, setOrdersMap] = useState({});

  useEffect(() => {
    api.get("/orders?status=on_the_way")
      .then(({ data }) => {
        const list = data.data || data;
        const map = {};
        list.forEach((o) => {
          const id = o.supplier.id;
          map[id] = (map[id] || 0) + 1;
        });
        setOrdersMap(map);
      })
      .catch(console.error);
  }, []);

  const start = (page - 1) * perPage;
  const current = suppliers.slice(start, start + perPage);

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-gray-700">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Fournisseur</th>
              <th className="p-2 text-left">Produits</th>
              <th className="p-2 text-left">Contact</th>
              <th className="p-2 text-left">Email</th>
              <th className="p-2 text-left">Type</th>
              <th className="p-2 text-center">En route</th>
            </tr>
          </thead>
          <tbody>
            {current.map((s) => (
              <tr key={s.id} className="border-t hover:bg-gray-50">
                <td className="p-2">{s.name}</td>
                <td className="p-2">{s.products.map((p) => p.name).join(", ") || "—"}</td>
                <td className="p-2">{s.phone || "—"}</td>
                <td className="p-2">{s.email}</td>
                <td className={`p-2 font-medium ${s.takes_back_returns ? "text-green-600" : "text-red-600"}`}>
                  {s.takes_back_returns ? "Accepts Returns" : "No Returns"}
                </td>
                <td className="p-2 text-center">{ordersMap[s.id] || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4 text-sm">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {page} / {Math.ceil(suppliers.length / perPage)}
        </span>
        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={start + perPage >= suppliers.length}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
