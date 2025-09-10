import React from "react";
import FeedTab from "./FeedTab";
import SubmitIssue from "./SubmitIssue";
import MyIssues from "./myIssues";
import Profile from "./Profile";
import MapView from "./MapView";
import MockNotifications from "./Notifications";
import StatisticsDashboard from "./StatisticsPage";
import Lottie from "lottie-react";
import lottie1 from "../../assets/lottieflow-404-12-9-ffffff-easey.json";


const MainContent = ({ activeSection }) => {
  return (
    <div className="flex-grow p-6 overflow-y-auto w-full min-h-screen">
      {activeSection === "Home" && <FeedTab />}
       {activeSection === "Explore" && (
        <div className="flex justify-center items-center min-h-screen">
          <Lottie 
            animationData={lottie1} 
            loop={true} 
            autoplay={true} 
            className="w-64 h-64" 
          />
        </div>
      )}
      {activeSection === "ViewIssues" && (
        <div>
          <MyIssues />
        </div>
      )}
      {activeSection === "MapView" && <MapView />}
      {activeSection === "Notifications" && (
        <div>
          <MockNotifications />
        </div>
      )}
      {activeSection === "Bookmarks" && (
        <div className="flex justify-center items-center  min-h-screen">
          <Lottie 
            animationData={lottie1} 
            loop={true} 
            autoplay={true} 
            className="w-64 h-64 m-auto" 
          />
        </div>
      )}
      {activeSection === "Statistics" && (
        <div>
          <StatisticsDashboard />
        </div>
      )}
      {activeSection === "Profile" && (
        <div>
          <Profile />
        </div>
      )}
       {activeSection === "Settings" && (
        <div className="flex justify-center items-center min-h-screen">
          <Lottie 
            animationData={lottie1} 
            loop={true} 
            autoplay={true} 
            className="w-64 h-64" 
          />
        </div>
      )}
      {activeSection === "ReportIssue" && (
        <div>
          <SubmitIssue />
        </div>
      )}
    </div>
  );
};

export default MainContent;