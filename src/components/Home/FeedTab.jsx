import React, { useState, useContext } from "react";
import Nearby from "./NearbyIssues";
import AllIssues from "./AllIIssues"; // typo fixed
import { SearchContext } from "../../context/searchContext";

const FeedTab = () => {
  const [activeTab, setActiveTab] = useState("Nearby");
  const { filteredIssues } = useContext(SearchContext);

  return (
    <div>
      {/* Tab Navigation */}
      <div
        className="min-w-auto border-b-1 flex cursor-pointer mb-4"
      >
        <div
          onClick={() => setActiveTab("Nearby")}
          className={`w-1/2 text-center py-2 ${
            activeTab === "Nearby" ? "border-b-2 border-blue-500 font-semibold" : "border-b-2 border-transparent"
          }`}
        >
          Nearby
        </div>
        <div
          onClick={() => setActiveTab("All")}
          className={`w-1/2 text-center py-2 ${
            activeTab === "All" ? "border-b-2 border-blue-500 font-semibold" : "border-b-2 border-transparent"
          }`}
        >
          All
        </div>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === "Nearby" && <Nearby />}
        {activeTab === "All" && <AllIssues />}
      </div>
    </div>
  );
};

export default FeedTab;
