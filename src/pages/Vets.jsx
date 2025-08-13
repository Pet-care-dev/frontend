import React, { useState } from "react";
import axios from "axios";
import MapComponent from "../components/MapComponent";

function Vets() {
  const [location, setLocation] = useState("");
  const [coords, setCoords] = useState(null);
  const [places, setPlaces] = useState([]);

  const handleSearch = async () => {
    try {
      // Step 1: Geocode location using Geoapify
      const geoRes = await axios.get("https://api.geoapify.com/v1/geocode/search", {
        params: {
          text: location,
          apiKey: process.env.REACT_APP_GEOAPIFY_API_KEY,
        },
      });

      const result = geoRes.data.features[0];
      if (!result) {
        alert("Location not found");
        return;
      }

      const lat = result.geometry.coordinates[1];
      const lng = result.geometry.coordinates[0];
      setCoords({ lat, lng });

      // Step 2: Get nearby vet clinics using Geoapify Places
      const placeRes = await axios.get("https://api.geoapify.com/v2/places", {
        params: {
          categories: "healthcare.veterinary",
          filter: `circle:${lng},${lat},5000`, // 5km radius
          limit: 20,
          apiKey: process.env.REACT_APP_GEOAPIFY_API_KEY,
        },
      });

      setPlaces(placeRes.data.features);
    } catch (error) {
      console.error(error);
      alert("Something went wrong while searching.");
    }
  };

  return (
    <div style={{ padding: "1rem", minHeight: "100vh", backgroundColor: "#fafafa" }}>
      <h2>Find Nearby Veterinary Clinics</h2>
      <input
        type="text"
        placeholder="Enter your location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        style={{ width: "300px", marginRight: "10px", padding: "5px" }}
      />
      <button onClick={handleSearch}>Search</button>

      <div style={{ marginTop: "20px" }}>
        {coords && <MapComponent coords={coords} places={places} />}
      </div>
    </div>
  );
}
console.log("Geoapify Key:", process.env.REACT_APP_GEOAPIFY_API_KEY);

export default Vets;
 