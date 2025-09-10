import React, { useContext } from "react";
import { Filter } from "lucide-react";
import { SearchContext } from "../../context/searchContext";

const SearchFilter = () => {
  const { searchQuery, setSearchQuery, filters, setFilters } =
    useContext(SearchContext);

  return (
    <div className="flex flex-col justify-center items-start px-4 gap-2 flex-wrap mt-4">
      {/* Search + Sort */}
      <div className="search flex gap-4 flex-wrap w-full">
        <input
          type="text"
          placeholder="Search issues..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border p-2 rounded-lg w-5/6 mb-4 text-sm"
        />
        <select
          className="border p-2 rounded-lg mb-4 text-sm"
          value={filters.sortBy}
          onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
        >
          <option value="newest">Newest</option>
          <option value="priority">Priority</option>
          <option value="verified">Most Verified</option>
        </select>
      </div>

      {/* More filters */}
      <div className="filters flex gap:2 sm:gap-4 sm:flex-wrap text-sm sm:w-full">
        <span className="flex gap-2 py-1">
          <Filter /> Filters
        </span>

        <select
          className="border p-0 sm:p-2 rounded-lg mb-4 text-sm"
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
        >
          <option value="all">All Categories</option>
          <option value="roads">Roads</option>
          <option value="sanitation">Sanitation</option>
          <option value="electricity">Electricity</option>
          <option value="water">Water</option>
          <option value="education">Education</option>
          <option value="health">Health</option>
          <option value="environment">Environment</option>
          <option value="governance">Governance</option>
          <option value="transportation">Transportation</option>
          <option value="infrastructure">Infrastructure</option>
          <option value="public-safety">Public Safety</option>
          <option value="other">Other</option>
        </select>

        <select
          className="border p-2 rounded-lg mb-4 text-sm"
          value={filters.severity}
          onChange={(e) => setFilters({ ...filters, severity: e.target.value })}
        >
          <option value="all">All Severities</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
          <option value="critical">Critical</option>
        </select>

        <select
          className="border p-2 rounded-lg mb-4 text-sm"
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
        >
          <option value="all">All Statuses</option>
          <option value="reported">Reported</option>
          <option value="in progress">In Progress</option>
          <option value="acknowledged">Acknowledged</option>
          <option value="investigating">Investigating</option>
          <option value="delayed">Delayed</option>
          <option value="resolved">Resolved</option>
          <option value="closed">Closed</option>
        </select>
      </div>
    </div>
  );
};

export default SearchFilter;
