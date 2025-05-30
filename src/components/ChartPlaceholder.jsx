export default function ChartPlaceholder({ title, subtitle = "Weekly" }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <span className="text-sm text-gray-400">{subtitle}</span>
      </div>
      <div className="flex-1 bg-gray-100 rounded-xl animate-pulse" />
    </div>
  );
}
