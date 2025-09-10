// src/components/Profile.jsx
import React from "react";
import { MapPin, Calendar, Edit2 } from "lucide-react";
import { useIssues } from "../../context/issueContext";
import Card from "./Card";

const Profile = () => {
  const { issues } = useIssues();

  // Mock user for now (later connect Appwrite `account.get()`)
  const user = {
    username: "Guest User",
    handle: "@guest",
    bio: "Citizen reporter. Highlighting civic issues around the city 🚧",
    location: "India",
    joined: "September 2025",
    avatar: "https://via.placeholder.com/100",
    cover: "https://via.placeholder.com/800x200",
    following: 123,
    followers: 456,
  };

  return (
    <div className="profile-page w-full max-w-4xl mx-auto text-white">
      {/* Cover photo */}
      <div className="relative">
        <img
          src={user.cover}
          alt="Cover"
          className="w-full h-48 object-cover rounded-lg border-1"
        />
        <img
          src={user.avatar}
          alt={user.username}
          className="absolute bottom-[-40px] left-6 w-24 h-24 rounded-full border-4 border-black"
        />
      </div>

      {/* User info */}
      <div className="mt-14 px-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">{user.username}</h1>
            <p className="text-gray-400 text-sm">{user.handle}</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border rounded-full hover:bg-gray-800">
            <Edit2 className="h-4 w-4" />
            Edit Profile
          </button>
        </div>

        <p className="mt-3 text-gray-200 text-justify">{user.bio}</p>

        <div className="flex gap-4 mt-3 text-sm text-gray-400">
          <span className="flex items-center gap-1">
            <MapPin className="h-4 w-4" /> {user.location}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="h-4 w-4" /> Joined {user.joined}
          </span>
        </div>

        <div className="flex gap-6 mt-3 text-sm">
          <span>
            <strong>{user.following}</strong> Following
          </span>
          <span>
            <strong>{user.followers}</strong> Followers
          </span>
        </div>
      </div>

      <hr className="my-6 border-gray-700" />

      {/* Tabs */}
      <div className="flex justify-around text-gray-400 border-b border-gray-700">
        <button className="py-3 px-4 hover:text-white border-b-2 border-blue-500 text-white">
          Issues
        </button>
        <button className="py-3 px-4 hover:text-white">Bookmarks</button>
        <button className="py-3 px-4 hover:text-white">Likes</button>
      </div>

      {/* User's issues (like tweets) */}
      <div className="mt-4 space-y-4">
        {issues.length > 0 ? (
          issues.map((issue) => (
            <Card key={issue.$id} issue={issue} />
          ))
        ) : (
          <p className="text-center text-gray-400 mt-10">
            No issues reported yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default Profile;
