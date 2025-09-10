// src/components/MockNotifications.jsx
import React from "react";
import { CheckCircle, Bell, AlertCircle, Info } from "lucide-react";

const mockNotifications = [
  {
    id: 1,
    issueTitle: "Pothole on Main Street",
    message: "Municipality scheduled repair for tomorrow.",
    status: "acknowledged",
    time: "2 hours ago",
  },
  {
    id: 2,
    issueTitle: "Streetlight not working",
    message: "Repair completed successfully.",
    status: "resolved",
    time: "1 day ago",
  },
  {
    id: 3,
    issueTitle: "Garbage collection delay",
    message: "Issue escalated to sanitation department.",
    status: "delayed",
    time: "3 hours ago",
  },
  {
    id: 4,
    issueTitle: "Illegal parking reported",
    message: "Violation ticket issued.",
    status: "resolved",
    time: "30 minutes ago",
  },
  {
    id: 5,
    issueTitle: "Water leakage near park",
    message: "Pending inspection by municipal team.",
    status: "acknowledged",
    time: "5 hours ago",
  },
];

// Status badge with icon
const getStatusBadge = (status) => {
  switch (status) {
    case "resolved":
      return (
        <div className="flex items-center gap-1 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
          <CheckCircle className="w-4 h-4" />
          Resolved
        </div>
      );
    case "acknowledged":
      return (
        <div className="flex items-center gap-1 bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full">
          <Info className="w-4 h-4" />
          Acknowledged
        </div>
      );
    case "delayed":
      return (
        <div className="flex items-center gap-1 bg-yellow-500 text-white text-xs px-2 py-0.5 rounded-full">
          <Bell className="w-4 h-4" />
          Delayed
        </div>
      );
    case "rejected":
      return (
        <div className="flex items-center gap-1 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
          <AlertCircle className="w-4 h-4" />
          Rejected
        </div>
      );
    default:
      return (
        <div className="flex items-center gap-1 bg-gray-500 text-white text-xs px-2 py-0.5 rounded-full">
          <Info className="w-4 h-4" />
          Pending
        </div>
      );
  }
};

const MockNotifications = () => {
  return (
    <div className="w-full text-justify mx-auto mt-6 p-4 rounded-lg shadow-md ">
      <h1 className="text-2xl font-bold mb-4 text-white">Issue Notifications</h1>
      {mockNotifications.length === 0 ? (
        <p className="text-gray-400 text-center">No notifications yet</p>
      ) : (
        <div className="flex flex-col divide-y divide-gray-700">
          {mockNotifications.map((notif) => (
            <div
              key={notif.id}
              className="flex justify-between items-start gap-3 p-3 hover:bg-gray-800 rounded-lg transition"
            >
              <div className="flex-1 text-white text-sm">
                <span className="font-semibold">{notif.issueTitle}</span>:{" "}
                {notif.message}
                <div className="text-gray-400 text-xs mt-1">{notif.time}</div>
              </div>
              <div>{getStatusBadge(notif.status)}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MockNotifications;
