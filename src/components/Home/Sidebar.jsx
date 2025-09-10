import React from "react";
import {
  Home,
  AlertCircle,
  Eye,
  Map,
  Bell,
  Bookmark,
  BarChart3,
  User,
  Settings,
  Menu,
  X,
} from "lucide-react";

const Sidebar = ({ onSectionChange, isOpen, toggleSidebar }) => {
  return (
    <>
      {/* Menu Button for Small Screens */}
      <button
        className="sm:hidden fixed top-4 left-4 z-50 bg-blue-600 text-white p-2 rounded-full shadow-lg"
        onClick={toggleSidebar}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Sidebar */}
      <div
        className={`h-screen w-72 bg-black text-white py-10 px-10 flex flex-col text-justify border-r-1 border-gray-700 fixed top-0 z-40 transition-transform transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0 sm:relative`}
      >
        <div className="flex gap-2 items-center justify-center">
        <img src="/src/assets/logo.png" alt="logo" className="h-12 w-12 mb-4"/>
        <h1 className="text-2xl font-semibold text-center mb-2">SWADESH</h1>
        </div>
        <div className="sidebar-content mt-10 flex-grow">
          <nav className="space-y-4 flex flex-col">
            <ul className="space-y-2 text-lg">
              <li>
                <a
                  onClick={() => onSectionChange("Home")}
                  className="flex items-center gap-3 p-2 rounded hover:bg-gray-800 transition hover:cursor-pointer hover:font-semibold hover:rounded-xl"
                >
                  <Home className="h-7 w-7" />
                  Home
                </a>
              </li>
              <li>
                <a
                  onClick={() => onSectionChange("Explore")}
                  className="flex items-center gap-3 p-2 rounded hover:bg-gray-800 transition hover:cursor-pointer hover:font-semibold hover:rounded-xl"
                >
                  <AlertCircle className="h-7 w-7" />
                  Explore
                </a>
              </li>
              <li>
                <a
                  onClick={() => onSectionChange("ViewIssues")}
                  className="flex items-center gap-3 p-2 rounded hover:bg-gray-800 transition hover:cursor-pointer hover:font-semibold hover:rounded-xl"
                >
                  <Eye className="h-7 w-7" />
                  My Issues
                </a>
              </li>
              <li>
                <a
                  onClick={() => onSectionChange("MapView")}
                  className="flex items-center gap-3 p-2 rounded hover:bg-gray-800 transition hover:cursor-pointer hover:font-semibold hover:rounded-xl"
                >
                  <Map className="h-7 w-7" />
                  Map View
                </a>
              </li>
              <li>
                <a
                  onClick={() => onSectionChange("Notifications")}
                  className="flex items-center gap-3 p-2 rounded hover:bg-gray-800 transition hover:cursor-pointer hover:font-semibold hover:rounded-xl"
                >
                  <Bell className="h-7 w-7" />
                  Notifications
                </a>
              </li>
              <li>
                <a
                  onClick={() => onSectionChange("Bookmarks")}
                  className="flex items-center gap-3 p-2 rounded hover:bg-gray-800 transition hover:cursor-pointer hover:font-semibold hover:rounded-xl"
                >
                  <Bookmark className="h-7 w-7" />
                  Bookmarks
                </a>
              </li>
              <li>
                <a
                  onClick={() => onSectionChange("Statistics")}
                  className="flex items-center gap-3 p-2 rounded hover:bg-gray-800 transition hover:cursor-pointer hover:font-semibold hover:rounded-xl"
                >
                  <BarChart3 className="h-7 w-7" />
                  Statistics
                </a>
              </li>
              <li>
                <a
                  onClick={() => onSectionChange("Profile")}
                  className="flex items-center gap-3 p-2 rounded hover:bg-gray-800 transition hover:cursor-pointer hover:font-semibold hover:rounded-xl"
                >
                  <User className="h-7 w-7" />
                  Profile
                </a>
              </li>
              <li>
                <a
                  onClick={() => onSectionChange("Settings")}
                  className="flex items-center gap-3 p-2 rounded hover:bg-gray-800 transition hover:cursor-pointer hover:font-semibold hover:rounded-xl"
                >
                  <Settings className="h-7 w-7" />
                  Settings
                </a>
              </li>
            </ul>
            <button
              className="bg-blue-600 mt-6 px-4 py-3 rounded-xl w-full"
              onClick={() => onSectionChange("ReportIssue")}
            >
              Report Issue
            </button>
            <div className="account">
              <hr className="my-4 border-gray-700" />
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-gray-600 rounded-full flex items-center justify-center text-xl font-bold">
                  U
                </div>
                <div>
                  <p className="font-semibold">NOVARA</p>
                  <p className="text-sm text-gray-400">View Profile</p>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;