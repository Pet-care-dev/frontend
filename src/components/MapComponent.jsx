import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const MapComponent = ({ coords, places }) => {
  if (!coords) return null;

  return (
    <MapContainer center={coords} zoom={14} style={{ height: "400px", width: "100%" }}>
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* Your location */}
      <Marker position={coords}>
        <Popup>Your searched location</Popup>
      </Marker>

      {/* Vet clinic markers */}
      {places.map((place, idx) => (
        <Marker
          key={idx}
          position={[place.geometry.coordinates[1], place.geometry.coordinates[0]]}
        >
          <Popup>
            <strong>{place.properties.name || "Vet Clinic"}</strong><br />
            {place.properties.address_line1}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
