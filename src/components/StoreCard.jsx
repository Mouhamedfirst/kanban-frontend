export default function StoreCard({ store, onEdit }) {
    return (
      <div className="bg-white flex justify-between items-center p-4 rounded shadow mb-4">
        <div>
          <h2 className="font-semibold text-lg text-gray-800 mb-1">{store.name}</h2>
          <p className="text-sm text-gray-500">{store.address}</p>
          <p className="text-sm text-gray-500">{store.phone}</p>
        </div>
        <button
          onClick={() => onEdit(store)}
          className="border px-4 py-1 rounded text-sm hover:bg-gray-100"
        >
          Modifier
        </button>
      </div>
    );
  }
  