import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function Topbar({ onSearch }) {
  const { user, logout } = useContext(AuthContext);
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    const val = e.target.value;
    setQuery(val);
    if (onSearch) onSearch(val);
  };

  return (
    <header className="flex flex-col sm:flex-row justify-between items-center bg-white border-b p-4 shadow-sm">
      <input
        type="text"
        placeholder="Search product, supplier, order"
        className="w-full sm:w-1/2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 mb-3 sm:mb-0"
        value={query}
        onChange={handleChange}
        disabled={!onSearch} // désactive la recherche si onSearch n'est pas défini
      />
      <div className="flex items-center gap-4">
        <button className="relative">
          <span className="text-xl">🔔</span>
          <span className="absolute top-0 right-0 inline-flex h-2 w-2 rounded-full bg-red-500 animate-ping"></span>
        </button>
        <div className="flex items-center gap-2">
          <img
            src={user?.avatar || "/user.png"}
            alt="User"
            className="w-8 h-8 rounded-full object-cover"
          />
          <span className="text-gray-700 hidden sm:inline">{user?.name}</span>
        </div>
        <button
          onClick={logout}
          className="text-red-600 text-sm hover:underline"
        >
          Se déconnecter
        </button>
      </div>
    </header>
  );
}
