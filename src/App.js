import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import PrivateRoutes from "./PrivateRoutes";
import Layout from "./pages/Layout";
import Suppliers from "./pages/Suppliers";
import Order from "./pages/Order";
import { ToastContainer } from "react-toastify";
import SellProductPage from "./pages/SellProductPage";
import ProductDetailsPage from "./pages/ProductDetailsPage ";
import ReportsPage from "./pages/ReportsPage";
import ManageStorePage from "./pages/ManageStorePage";
import { Toaster } from "sonner";

function App() {
  return (
    <>
    <Toaster position="top-right" />
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected routes */}
      <Route element={<PrivateRoutes />}>
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/products/:id" element={<ProductDetailsPage />} />
          <Route path="/suppliers" element={<Suppliers />} />
           <Route path="/reports" element={<ReportsPage />} /> 
           <Route path="/Orders" element={<Order />} /> 
           <Route path="/vendre" element={<SellProductPage />} />
           <Route path="/manage-store" element={<ManageStorePage />} /> 

        </Route>
      </Route>
    </Routes>
    <ToastContainer />
    </>
  );
}

export default App;
