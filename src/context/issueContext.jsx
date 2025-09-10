// context/issueContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import { databases, DATABASE_ID, ISSUES_COLLECTION_ID } from "../lib/appwrite";
import { ID } from "appwrite";
import { getUserLocation } from "../components/utils/getUserLocation";
import { calcDistance } from "../components/utils/calcDistance";

const IssueContext = createContext();

export const IssueProvider = ({ children }) => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch issues from Appwrite
  const fetchIssues = async () => {
    try {
      const res = await databases.listDocuments({
        databaseId: DATABASE_ID,
        collectionId: ISSUES_COLLECTION_ID,
        queries: [], // optional filters
        limit: 50,
      });
      setIssues(res.documents);
    } catch (error) {
      console.error("Error fetching issues:", error);
    } finally {
      setLoading(false);
    }
  };

  // Add issue to Appwrite
  const addIssue = async (newIssue) => {
    const userLoc = await getUserLocation();

    let proximity = "all";
    if (newIssue.geoLocation && newIssue.geoLocation.length === 2) {
      const dist = calcDistance(
        userLoc.lat,
        userLoc.lng,
        newIssue.geoLocation[0], // ✅ lat from array
        newIssue.geoLocation[1]  // ✅ lng from array
      );
      if (dist <= 10) {
        proximity = "nearby";
      }
    }

    try {
      const res = await databases.createDocument(
        DATABASE_ID,
        ISSUES_COLLECTION_ID,
        ID.unique(),
        {
          ...newIssue,
          geoLocation: newIssue.geoLocation || [0, 0], // ✅ save as [lat, lng]
          username: "Guest User", // Mock user
          userID: "guest",
          upvotes: 0,
          comments: 0,
          verified: 0,
          proximity,
        }
      );
      setIssues([res, ...issues]); // Update state instantly
    } catch (error) {
      console.error("Error adding issue:", error);
    }
  };

  useEffect(() => {
    fetchIssues();
  }, []);

  return (
    <IssueContext.Provider value={{ issues, addIssue, loading }}>
      {children}
    </IssueContext.Provider>
  );
};

export const useIssues = () => useContext(IssueContext);
