import React from "react";
import { ArrowBigUp, MessageCircle, Share2 } from "lucide-react";
import { timeAgo } from "../utils/timeAgo";

const Card = ({ issue }) => {
  const handleSeverityColor = (severity) => {
    switch (severity) {
    case "critical":
        return "bg-red-600/10 text-red-600 inset-ring-red-600/20";
      case "high":
        return "bg-red-400/10 text-red-400 inset-ring-red-400/20";
      case "medium":
        return "bg-yellow-400/10 text-yellow-400 inset-ring-yellow-400/20";
      case "low":
        return "bg-green-400/10 text-green-400 inset-ring-green-400/20";
      default:
        return "bg-gray-400/10 text-gray-400 inset-ring-gray-400/20";
    }
  };

const openInGoogleMaps = () => {
  if (issue.geoLocation && issue.geoLocation.length === 2) {
    const [lat, lng] = issue.geoLocation;
    if (lat !== 0 && lng !== 0) {
      // ✅ Lat/lng exists, open directly
      const url = `https://www.google.com/maps?q=${lat},${lng}`;
      window.open(url, "_blank");
      return;
    }
  }

  // ✅ Fallback: use the location string if lat/lng are missing or 0,0
  if (issue.location && issue.location.trim() !== "") {
    const url = `https://www.google.com/maps?q=${encodeURIComponent(
      issue.location
    )}`;
    window.open(url, "_blank");
  } else {
    alert("Location not available");
  }
}

  return (
    <div
      key={issue.id}
      className="card flex flex-col md:flex-row mt-6 p-4 border rounded-lg shadow-md space-x-4 border-gray-700 hover:scale-102 transition-transform duration-200"
    >
      <div className="image  w-full md:w-64  flex items-center justify-center text-gray-600 font-semibold rounded-lg">
        <img
          src={issue.imageURL}
          alt={issue.title}
          className="max-h-64 w-full object-cover rounded-lg"
        />
      </div>
      <div className="info flex flex-col justify-start gap-4 w-full ml-2">
        <div className="user flex items-center justify-between space-x-4 mb-2 w-full">
          <div className="flex items-center gap-3">
            <div className="avatar rounded-full bg-gray-800 w-10 h-10 flex items-center justify-center text-white font-semibold">
              {issue.username.charAt(0)}
            </div>
            <div className="user-details flex flex-col items-start mt-1">
              <h2 className="font-bold">{issue.username}</h2>
              <p className="text-sm text-blue-500" onClick={openInGoogleMaps}>{issue.location}</p>
            </div>
          </div>
          <div>
            <p className="timeago">{timeAgo(issue.createdAt)}</p>
          </div>
        </div>
        <div className="content text-justify flex flex-col gap-3 w-full">
          <h1 className="text-2xl">{issue.title}</h1>
          <p>{issue.description}</p>
        </div>
        <div className="category flex justify-start mt-2">
          <span className="px-3 py-1 bg-blue-400/10 text-blue-400 rounded-full text-sm font-medium">
            {issue.category}
          </span>
          &nbsp;&nbsp;
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${handleSeverityColor(
              issue.severity
            )}`}
          >
            {issue.severity}
          </span>
        </div>
        <div className="actions flex justify-start gap-2 mt-2">
          <button className="px-2 py-1 text-white rounded hover:bg-green-600">
            <ArrowBigUp className="h-4 w-4" />
          </button>
          <button className="px-1 py-1 text-white rounded hover:bg-blue-600">
            <MessageCircle className="h-3 w-3" />
          </button>
          <button className="px-1 py-1 text-white rounded hover:bg-purple-600">
            <Share2 className="h-3 w-3" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;