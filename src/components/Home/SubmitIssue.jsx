import React, { useState, useContext } from "react";
import { AlertCircle, MapPin } from "lucide-react";
import ImageUpload from "./ImageUpload";
import InfoBox from "./InfoBox";
import { getUserLocation } from "../utils/getUserLocation";
import { useIssues } from "../../context/issueContext";
import { timeAgo } from "../utils/timeAgo";
import { calcDistance } from "../utils/calcDistance";

const Submit = () => {
  const { addIssue } = useIssues(); // Use addIssue from IssueProvider

  // State for form data
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    latitude: null,
    longitude: null,
    severity: "Low",
    images: [],
    imageURL: "",
    // contactInfo: "",
    anonymous: false,
    timeAgo: "" // dynamically store current time
  });

  const [loadingLocation, setLoadingLocation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input changes
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Handle image upload
  const handleImageChange = (files) => {
    setFormData((prev) => ({ ...prev, images: files }));
  };

  // Fetch location
  const fetchLocation = async () => {
    setLoadingLocation(true);
    try {
      const { latitude, longitude } = await getUserLocation();

      // Optional: reverse geocode here using Google Maps API / OpenStreetMap
      const locationString = `Lat: ${latitude}, Lng: ${longitude}`;

      setFormData((prev) => ({
        ...prev,
        location: locationString,
        latitude,
        longitude,
      }));
    } catch (error) {
      alert("Unable to fetch location: " + error.message);
    } finally {
      setLoadingLocation(false);
    }
  };



  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.title || !formData.description) {
      alert("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);

const newIssue = {
  imageURL: formData.imageURL || "https://via.placeholder.com/192",
  username: formData.anonymous ? "Anonymous" : "Guest User",
  location: formData.location,
  title: formData.title,
  description: formData.description,
  category: formData.category,
  severity: formData.severity,
  geoLocation: [
    formData.latitude || 0,
    formData.longitude || 0,
  ],
  status: "reported",
  timeAgo: new Date().toISOString(),
};


    // Add the new issue using the context
    addIssue(newIssue);

    // Reset form
    setFormData({
      title: "",
      description: "",
      category: "",
      location: "",
      latitude: null,
      longitude: null,
      severity: "low",
      images: [],
      imageURL: "",
       timeAgo: new Date().toISOString(), // dynamically store current time
      // contactInfo: "",
      anonymous: false,
    });

    setIsSubmitting(false);
    alert("Issue submitted successfully!");
  };

  // Handle cancel
  const handleCancel = () => {
    setFormData({
      title: "",
      description: "",
      category: "",
      location: "",
      latitude: null,
      longitude: null,
      severity: "Low",
      images: [],
      imageURL: "",
      // contactInfo: "",
      anonymous: false,
    });
  };


  return (
    <div className="submitform min-w-3xl mx-auto py-6 px-10 rounded-lg border shadow-md shadow-white text-justify">
      <h1 className="text-xl flex gap-1 items-center">
        <AlertCircle className="h-5 w-5" />
        Report an Issue
      </h1>

      <form className="mt-4 text-sm" onSubmit={handleSubmit}>
        {/* Title */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Issue Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => handleInputChange("title", e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
            placeholder="Brief title of the issue"
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Detailed Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            className="w-full h-32 border rounded-lg px-3 py-2"
            placeholder="Detailed description of the issue"
          />
        </div>

        {/* Category + Severity */}
        <div className="mb-4 flex justify-between">
          <div className="w-1/2 mr-2">
            <label className="block mb-1 font-medium">Category</label>
<select
  value={formData.category}
  onChange={(e) => handleInputChange("category", e.target.value)}
  className="w-full border rounded-lg px-3 py-2"
>
  <option value="" disabled>
    -- Select a category --
  </option>
  <option value="roads">Roads</option>
  <option value="sanitation">Sanitation</option>
  <option value="electricity">Electricity</option>
  <option value="water">Water</option>
  <option value="health">Health</option>
  <option value="environment">Environment</option>
  <option value="governance">Governance</option>
  <option value="transportation">Transportation</option>
  <option value="infrastructure">Infrastructure</option>
  <option value="public-safety">Public Safety</option>
  <option value="other">Other</option>
  <option value="education">Education</option>
</select>

          </div>

          <div className="w-1/2 ml-2">
            <label className="block mb-1 font-medium">Severity</label>
            <select
              value={formData.severity}
              onChange={(e) => handleInputChange("severity", e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="critical">Critical</option>
            </select>
          </div>
        </div>

        {/* Location */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Location</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={formData.location}
              onChange={(e) => handleInputChange("location", e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
              placeholder="Where is the issue located?"
            />
            <button
              type="button"
              onClick={fetchLocation}
              className="flex items-center gap-1 px-3 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
              disabled={loadingLocation}
            >
              <MapPin className="h-4 w-4" />
              {loadingLocation ? "Locating..." : "Auto Detect"}
            </button>
          </div>
        </div>

        {/* Image URL */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Image URL (optional)</label>
          <input
            type="url"
            value={formData.imageURL}
            onChange={(e) => handleInputChange("imageURL", e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
            placeholder="Paste image URL here"
          />
        </div>

        {/* Image Upload */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Image/Video (optional)</label>
          <ImageUpload onChange={handleImageChange} />
        </div>

        {/* Contact Info
        <div className="mb-4">
          <label className="block mb-1 font-medium">Contact Info (optional)</label>
          <input
            type="text"
            value={formData.contactInfo}
            onChange={(e) => handleInputChange("contactInfo", e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
            placeholder="Email or phone (if not anonymous)"
          />
        </div> */}

        {/* Anonymous Checkbox */}
        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            checked={formData.anonymous}
            onChange={(e) => handleInputChange("anonymous", e.target.checked)}
            className="mr-2"
          />
          <label className="font-medium">Submit Anonymously</label>
        </div>
        <InfoBox />

        <div className="btns flex gap-2 mb-4">
          {/* Cancel button */}
          <button
            type="button"
            onClick={handleCancel}
            className="w-1/2 bg-gray-200 text-gray-800 py-2 rounded hover:bg-gray-300"
          >
            Cancel
          </button>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-1/2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {isSubmitting ? "Submitting..." : "Submit Issue"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Submit;