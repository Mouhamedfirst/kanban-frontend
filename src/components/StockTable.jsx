export default function StockTable({ title, data }) {
  const hasTopSelling = data.length > 0 && data[0].sold_quantity !== undefined;

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">{title}</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-gray-700">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Produit</th>
              {hasTopSelling ? (
                <>
                  <th className="p-2 text-right">Vendu</th>
                  <th className="p-2 text-right">Stock restant</th>
                  <th className="p-2 text-right">Prix</th>
                </>
              ) : (
                <>
                  <th className="p-2 text-right">Quantité</th>
                  <th className="p-2 text-right">Seuil</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 && (
              <tr>
                <td colSpan={hasTopSelling ? 4 : 3} className="p-4 text-center text-gray-500">
                  Aucun produit
                </td>
              </tr>
            )}
            {data.map((item, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="p-2">{item.name}</td>
                {hasTopSelling ? (
                  <>
                    <td className="p-2 text-right">{item.sold_quantity}</td>
                    <td className="p-2 text-right">{item.remaining_quantity}</td>
                    <td className="p-2 text-right">{item.price} CFA</td>
                  </>
                ) : (
                  <>
                    <td className="p-2 text-right">{item.quantity}</td>
                    <td className="p-2 text-right">{item.threshold}</td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
