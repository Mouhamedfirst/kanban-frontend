import { Link, NavLink } from "react-router-dom";

const links = [
  "Dashboard",
  "Inventory",
  "Reports",
  "Suppliers",
  "Orders",
  "vendre",
  "Manage Store",
  "Settings",
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r shadow-lg flex flex-col h-screen p-6">
      <div className="flex items-center gap-2 mb-10">
        <img src="/logo-kanban.jpeg" className="w-8" alt="Logo" />
        <h1 className="text-2xl font-bold text-blue-600">KANBAN</h1>
      </div>
      <nav className="flex-grow">
        {links.map((link) => {
          const to = `/${link.toLowerCase().replace(/\s/g, "-")}`;
          const isVendre = link.toLowerCase() === "vendre";

          return (
            <NavLink
              key={link}
              to={to}
              className={({ isActive }) => {
                // Style spécial pour "vendre" + actif
                if (isVendre) {
                  return `block py-3 px-4 mb-2 rounded-xl text-white font-semibold transition
                    ${
                      isActive
                        ? "bg-blue-600 shadow-lg"
                        : "bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800"
                    }
                    transform hover:scale-105`;
                }

                // Style normal pour les autres liens
                return `block py-2 px-3 rounded-lg mb-1 text-sm transition
                  ${
                    isActive
                      ? "bg-blue-100 text-blue-600 font-semibold"
                      : "text-gray-600 hover:bg-gray-100"
                  }`;
              }}
            >
              {isVendre ? (
                <>
                  {/* Icône SVG simple à gauche */}
                  <span className="inline-block mr-2">💰</span>
                  {link.charAt(0).toUpperCase() + link.slice(1)}
                </>
              ) : (
                link
              )}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}
