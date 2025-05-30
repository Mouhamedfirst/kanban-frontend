import { useState, useEffect } from "react";
import SummaryTile from "../components/SummaryTile";
import OrderTable from "../components/OrderTable";
import AddOrderModal from "../components/AddOrderModal";
import { fetchOrders } from "../services/order";

export default function Order() {
  const [orders, setOrders] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const loadOrders = async () => {
    try {
      const res = await fetchOrders();
      // si Laravel paginate :
      setOrders(res.data.data || res.data);
    } catch (err) {
      console.error("Erreur chargement commandes:", err);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleOrderAdded = (newOrder) => {
    setOrders((prev) => [newOrder, ...prev]);
    setShowModal(false);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Orders</h1>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <SummaryTile title="Total Orders" value={orders.length} subtitle="All time" />
        <SummaryTile title="Pending" value={orders.filter(o => o.status !== 'received').length} subtitle="Not received" color="text-yellow-600" />
        <SummaryTile title="Delivered" value={orders.filter(o => o.received).length} subtitle="✔️" color="text-green-600" />
        <SummaryTile title="Value" value={orders.reduce((sum, o) => sum + parseFloat(o.order_value), 0).toFixed(2)} subtitle="Total CFA" />
      </div>

      <OrderTable orders={orders} onAdd={() => setShowModal(true)} onReload={loadOrders}/>

      {showModal && (
        <AddOrderModal
          onClose={() => setShowModal(false)}
          onOrderAdded={handleOrderAdded}
        />
      )}
    </div>
  );
}
