export default function DataCard({ title, data }) {
    if (!data.length) {
      return <p className="p-4">Aucune donnée</p>;
    }
    return (
      <div className="bg-white p-4 rounded shadow text-sm">
        <div className="flex justify-between mb-2">
          <h3 className="font-semibold text-gray-700">{title}</h3>
          <button className="text-blue-600 text-xs">Voir tout</button>
        </div>
        <table className="w-full text-left text-gray-700">
          <thead>
            <tr className="text-gray-400 text-xs border-b">
              {Object.keys(data[0]).map((head, i) => (
                <th key={i} className="px-2 py-1">{head}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={i} className="border-t hover:bg-gray-50">
                {Object.entries(row).map(([_, v], j) => (
                  <td key={j} className={`px-2 py-1 ${typeof v === "string" && v.includes("%") ? "text-green-600" : ""}`}>
                    {v}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  