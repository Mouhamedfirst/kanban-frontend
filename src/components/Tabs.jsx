export default function Tabs({ activeTab, setActiveTab }) {
    const tabs = ["Overview", "Purchases", "Adjustments", "History"];
  
    return (
      <div className="overflow-x-auto border-b mb-6">
        <div className="inline-flex space-x-4 px-4">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`
                pb-2 text-sm font-medium whitespace-nowrap
                ${activeTab === tab
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-500 hover:text-gray-700"}
              `}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
    );
  }
  