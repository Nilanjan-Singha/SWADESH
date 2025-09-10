// src/components/MapView.jsx
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { databases, DATABASE_ID, ISSUES_COLLECTION_ID } from "../../lib/appwrite";
import { Query } from "appwrite";

// Custom marker icon
const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  shadowSize: [41, 41],
});

const MapView = () => {
  const [issues, setIssues] = useState([]);
  const [mapCenter, setMapCenter] = useState([20.5937, 78.9629]); // India center

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const res = await databases.listDocuments(
          DATABASE_ID,
          ISSUES_COLLECTION_ID,
          [Query.limit(100)]
        );

        const resolvedIssues = await Promise.all(
          res.documents.map(async (issue) => {
            let [lat, lng] = issue.geoLocation || [0, 0];

            // Case 1: Already valid coordinates
            if (lat && lng && (lat !== 0 || lng !== 0)) {
              return issue;
            }

            // Case 2: Try geocoding if location name exists
            if (issue.location) {
              try {
                const response = await fetch(
                  `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
                    issue.location
                  )}`
                );
                const data = await response.json();

                if (data.length > 0) {
                  const newLat = parseFloat(data[0].lat);
                  const newLng = parseFloat(data[0].lon);

                  // Update issue with resolved coordinates
                  return { ...issue, geoLocation: [newLat, newLng] };
                }
              } catch (err) {
                console.error("Geocoding error:", err);
              }
            }

            return issue;
          })
        );

        setIssues(resolvedIssues);

        // Auto-center map to first valid issue
        const firstValid = resolvedIssues.find(
          (i) => i.geoLocation && i.geoLocation[0] !== 0 && i.geoLocation[1] !== 0
        );
        if (firstValid) {
          setMapCenter(firstValid.geoLocation);
        }
      } catch (err) {
        console.error("Error fetching issues:", err);
      }
    };

    fetchIssues();
  }, []);

  return (
    <div className="w-full h-[90vh] rounded-lg overflow-hidden">
      <MapContainer center={mapCenter} zoom={5} className="h-full w-full">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        />

        {issues.map((issue) => {
          if (!issue.geoLocation) return null;

          const [lat, lng] = issue.geoLocation.map(Number); // ✅ Ensure numbers

          if (lat === 0 && lng === 0) return null; // skip unresolved

          return (
            <Marker key={issue.$id} position={[lat, lng]} icon={markerIcon}>
              <Popup>
                <div className="text-sm">
                  <h3 className="font-bold">{issue.title}</h3>
                  <p className="text-gray-600">{issue.description}</p>
                  <p className="text-xs text-gray-500">📍 {issue.location}</p>
                  <a
                    href={`https://www.google.com/maps?q=${lat},${lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    Open in Google Maps
                  </a>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default MapView;
