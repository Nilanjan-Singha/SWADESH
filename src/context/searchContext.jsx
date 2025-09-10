import React, { useState, useMemo, useContext } from "react";
import { useIssues } from "./issueContext"; // ✅ Import IssueContext

export const SearchContext = React.createContext();

export const SearchProvider = ({ children }) => {
  const { issues } = useIssues(); // ✅ Use issues from IssueContext
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    category: "all",
    severity: "all",
    status: "all",
    sortBy: "newest",
  });

  // Filtering + searching + sorting
  const filteredIssues = useMemo(() => {
    let results = [...issues];
    // 🔍 Search
    if (searchQuery) {
      results = results.filter(
        (issue) =>
          issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          issue.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // 🎛 Category filter
    if (filters.category !== "all") {
      results = results.filter(
        (issue) => issue.category.toLowerCase() === filters.category.toLowerCase()
      );
    }

    // 🎛 Severity filter
    if (filters.severity !== "all") {
      results = results.filter(
        (issue) => issue.severity.toLowerCase() === filters.severity.toLowerCase()
      );
    }

    // 🎛 Status filter
    if (filters.status !== "all") {
      results = results.filter(
        (issue) => issue.status.toLowerCase() === filters.status.toLowerCase()
      );
    }

    // ↕️ Sorting
    if (filters.sortBy === "priority") {
      const severityOrder = { critical: 4, high: 3, medium: 2, low: 1 };
      results.sort(
        (a, b) =>
          (severityOrder[b.severity.toLowerCase()] || 0) -
          (severityOrder[a.severity.toLowerCase()] || 0)
      );
    } else if (filters.sortBy === "verified") {
      results.sort((a, b) => (b.verified || 0) - (a.verified || 0));
    } else if (filters.sortBy === "newest") {
      results.sort((a, b) => b.id - a.id);
    }

    return results;
  }, [issues, searchQuery, filters]);

  console.log("Filtered Issues:", filteredIssues); // Debugging line

  return (
    <SearchContext.Provider
      value={{ searchQuery, setSearchQuery, filters, setFilters, filteredIssues }}
    >
      {children}
    </SearchContext.Provider>
  );
};
