import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "./contexts/AuthContext";

export default function PrivateRoutes() {
  const { isAuthenticated, loading } = useContext(AuthContext);

  if (loading) {
    return <div className="p-6 text-center">Chargement...</div>;
  }

  // Si l'utilisateur est authentifié, on rend l'<Outlet/> qui insère les routes enfants
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}
