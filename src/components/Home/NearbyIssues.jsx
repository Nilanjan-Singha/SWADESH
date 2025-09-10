import React, { useContext } from "react";
import { Search } from "lucide-react";
import SearchFilter from "./SearchFilter";
import Card from "./Card";
import { SearchContext } from "../../context/searchContext";

const Nearby = () => {
  const { filteredIssues } = useContext(SearchContext);

  // Only take nearby issues after applying filters
const nearbyIssues = filteredIssues.filter(
  (issue) => issue.proximity === "nearby"
);

  return (
    <div>
      <SearchFilter />
      {nearbyIssues.length > 0 ? (
        nearbyIssues.map((issue) => <Card key={issue.id} issue={issue} />)
      ) : (
        <p>No nearby issues found.</p>
      )}
    </div>
  );
};

export default Nearby;
