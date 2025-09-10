import React, { useState } from "react";
import Sidebar from "../components/Home/Sidebar";
import MainContent from "../components/Home/MainContent";

const HomePage = () => {
  const [activeSection, setActiveSection] = useState("Home");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="flex">
      <Sidebar
        onSectionChange={(section) => {
          setActiveSection(section);
          setIsSidebarOpen(false); // Close sidebar after selecting a section
        }}
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />
      <div className="flex-grow">
        <MainContent activeSection={activeSection} />
      </div>
    </div>
  );
};

export default HomePage;