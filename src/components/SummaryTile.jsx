export default function SummaryTile({ title, value, subtitle, color = "text-gray-800" }) {
    return (
      <div className="bg-white rounded-2xl shadow-md p-4 flex flex-col items-start">
        <h5 className="text-gray-500 text-xs uppercase tracking-wide mb-1">{title}</h5>
        <p className={`text-2xl font-bold ${color}`}>{value}</p>
        <span className="text-xs text-gray-400">{subtitle}</span>
      </div>
    );
  }
  