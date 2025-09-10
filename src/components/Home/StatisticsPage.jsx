import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

// Mock data
const mockIssues = [
  { id: 1, title: "Pothole on Main Street", status: "in-progress" },
  { id: 2, title: "Streetlight not working", status: "resolved" },
  { id: 3, title: "Garbage collection delay", status: "delayed" },
  { id: 4, title: "Illegal parking reported", status: "resolved" },
  { id: 5, title: "Water leakage near park", status: "acknowledged" },
  { id: 6, title: "Blocked drain", status: "rejected" },
  { id: 7, title: "Broken bench in park", status: "resolved" },
];

const statusColors = {
  resolved: "#22c55e",
  "in-progress": "#facc15",
  delayed: "#f97316",
  rejected: "#ef4444",
  acknowledged: "#3b82f6",
};

const StatisticsDashboard = () => {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    // Simulate fetching from DB
    setTimeout(() => setIssues(mockIssues), 500);
  }, []);

  const totalIssues = issues.length;
  const statusCount = issues.reduce((acc, issue) => {
    acc[issue.status] = (acc[issue.status] || 0) + 1;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(statusCount),
    datasets: [
      {
        data: Object.values(statusCount),
        backgroundColor: Object.keys(statusCount).map(
          (status) => statusColors[status]
        ),
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-white">Issue Statistics</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="p-3 rounded-lg text-white border-1 text-center shadow">
          <h2 className="text-lg font-semibold">Total Issues</h2>
          <p className="text-2xl font-bold">{totalIssues}</p>
        </div>
        {Object.keys(statusColors).map((status) => (
          <div key={status} className="p-3 border-1 rounded-lg text-white text-center shadow">
            <h2 className="text-lg font-semibold">{status.replace("-", " ")}</h2>
            <p className="text-2xl font-bold">{statusCount[status] || 0}</p>
          </div>
        ))}
      </div>

      <div className="p-6 rounded-lg shadow flex w-full flex-col items-center ">
        <h2 className="text-2xl font-semibold mb-4 text-white">Status Distribution</h2>
        <Doughnut data={chartData} />
      </div>

      <div className="mt-8 p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4 text-white">Issue List</h2>
        <table className="w-full text-left text-white">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="py-2 px-4">Title</th>
              <th className="py-2 px-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {issues.map((issue) => (
              <tr key={issue.id} className="border-b border-gray-700 hover:bg-gray-700 transition">
                <td className="py-2 px-4">{issue.title}</td>
                <td className="py-1 px-2">
                  <span
                    className={`px-1 py-1 rounded text-white font-semibold`}
                    style={{ backgroundColor: statusColors[issue.status] }}
                  >
                    {issue.status.replace("-", " ")}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StatisticsDashboard;
