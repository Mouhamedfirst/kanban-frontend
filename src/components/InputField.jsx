export default function InputField({ label, type = "text", error, ...props }) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        type={type}
        className={`w-full border ${
          error ? "border-red-500" : "border-gray-300"
        } rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 transition`}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}
