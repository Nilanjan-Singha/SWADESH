// src/components/ViewIssues.jsx
import React from "react";
import { useIssues } from "../../context/issueContext";
import Card from "./Card";
import SearchFilter from "./SearchFilter";

const MyIssues = () => {
  const { issues, loading } = useIssues();

  if (loading) {
    return <p className="text-center text-gray-400">Loading your issues...</p>;
  }

  // Filter issues submitted by the current user (mock guest user for now)
  const myIssues = issues.filter((issue) => issue.userID === "guest");

  if (myIssues.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-400">
        <p className="text-lg">You haven’t reported any issues yet.</p>
      </div>
    );
  }

  return (
    <>
    <SearchFilter />
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-4 text-justify mt-8">My Submitted Issues</h2>
      {myIssues.map((issue) => (
        <Card key={issue.$id} issue={issue} />
      ))}
    </div>
    </>
  );
};

export default MyIssues;
