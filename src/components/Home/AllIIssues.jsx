import React, { useContext } from "react";
import { Search } from "lucide-react";
import SearchFilter from "./SearchFilter";
import Card from "./Card";
import { SearchContext } from "../../context/searchContext";

const AllIssues = () => {
  const { filteredIssues } = useContext(SearchContext);

  return (
    <div>
      <SearchFilter />
      {filteredIssues.length > 0 ? (
        filteredIssues.map((issue) => <Card key={issue.id} issue={issue} />)
      ) : (
        <p>No issues found.</p>
      )}
    </div>
  );
};

export default AllIssues;
