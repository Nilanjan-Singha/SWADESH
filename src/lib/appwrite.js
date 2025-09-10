import { Client, Databases, ID } from "appwrite";

const client = new Client()
  .setEndpoint("https://fra.cloud.appwrite.io/v1") // e.g. https://cloud.appwrite.io/v1
  .setProject("68c08c620009d506c58d");

export const databases = new Databases(client);

// Your database + collection IDs (replace with your own)
export const DATABASE_ID = "68c08c8c0028393d2109";
export const ISSUES_COLLECTION_ID = "issue";
