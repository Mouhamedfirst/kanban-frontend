export default function SummaryCard({ title, value, icon }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 flex items-center space-x-4">
      <div className="text-3xl">{icon}</div>
      <div>
        <h4 className="text-gray-500 text-sm">{title}</h4>
        <p className="text-2xl font-semibold text-gray-800">{value}</p>
      </div>
    </div>
  );
}
