export default function ProductDetailsCard({ product }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col lg:flex-row gap-6">
      <div className="flex-1">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          {product.name}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm text-gray-700">
          <div className="space-y-2">
            <p>
              <span className="font-medium">ID :</span> {product.id}
            </p>
            <p>
              <span className="font-medium">Catégorie :</span>{" "}
              {product.category?.name}
            </p>
            <p>
              <span className="font-medium">Description :</span>{" "}
              {product.category?.description}
            </p>
            <p>
              <span className="font-medium">Prix achat :</span>{" "}
              {product.buying_price} CFA
            </p>
            <p>
              <span className="font-medium">Prix vente :</span>{" "}
              {product.selling_price} CFA
            </p>
            <p>
              <span className="font-medium">Quantité :</span> {product.quantity}
            </p>
            <p>
              <span className="font-medium">Seuil :</span> {product.threshold}
            </p>
            <p>
              <span className="font-medium">Exp. :</span>{" "}
              {product.expiry_date || "—"}
            </p>
          </div>
          <div className="space-y-2">
            <p>
              <span className="font-medium">Fournisseur principal :</span>{" "}
              {product.supplier?.name || "—"}
            </p>
            <p>
              <span className="font-medium">Contact :</span>{" "}
              {product.supplier?.phone || "—"}
            </p>
            <p>
              <span className="font-medium">Autres fournisseurs :</span>
              {product.order_suppliers?.length > 0
                ? product.order_suppliers.map((s) => s.name).join(", ")
                : "—"}
            </p>
          </div>
        </div>

        <h3 className="mt-6 mb-2 font-semibold text-gray-800">
          Stock par magasin
        </h3>
        <table className="w-full text-sm text-gray-700 border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 text-left">Magasin</th>
              <th className="p-2 text-right">Quantité</th>
            </tr>
          </thead>
          <tbody>
            {(product.locations || []).map((loc, i) => (
              <tr key={i} className="border-t hover:bg-gray-50">
                <td className="p-2">{loc.name}</td>
                <td className="p-2 text-right font-medium">{loc.stock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="w-full lg:w-48 flex-shrink-0 flex flex-col items-center">
        <img
          src={product.image}
          alt={product.name}
          className="w-32 h-32 object-contain border-2 border-dashed rounded-lg mb-4"
        />
        <div className="flex gap-2">
          <button className="px-3 py-1 border rounded hover:bg-gray-100 transition">
            Éditer
          </button>
          <button className="px-3 py-1 border rounded hover:bg-gray-100 transition">
            Télécharger
          </button>
        </div>
      </div>
    </div>
  );
}
