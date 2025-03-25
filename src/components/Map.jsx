import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

function Map() {
  const cityCoordinates = {
    "New Delhi": { lat: 28.6139, lng: 77.209 },
    Jaipur: { lat: 26.9124, lng: 75.7873 },
    Kolkata: { lat: 22.5726, lng: 88.3639 },
    Lucknow: { lat: 26.8467, lng: 80.9462 },
    Ahmedabad: { lat: 23.0225, lng: 72.5714 },
    Mumbai: { lat: 19.076, lng: 72.8777 },
    Pune: { lat: 18.5204, lng: 73.8567 },
    Telengana: { lat: 17.385, lng: 78.4867 },
    Bengaluru: { lat: 12.9716, lng: 77.5946 },
    Chennai: { lat: 13.0827, lng: 80.2707 },
    Hyderabad: { lat: 17.385, lng: 78.4867 },
  };

  const cities = Object.keys(cityCoordinates);

  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [center, setCenter] = useState({
    lat: 20.5937, // Default center (India)
    lng: 78.9629,
  });

  const [isOpen, setIsOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState("Select a city");

  const [selectedDate, setSelectedDate] = useState(null);

  const containerStyle = {
    width: "600px",
    height: "600px",
  };

  const mapOptions = {
    zoomControl: true,
    mapTypeControl: true,
    streetViewControl: true,
    fullscreenControl: true,
  };

  // ✅ Fetch noise data from the API
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:8000/noise/all");
        const data = await response.json();

        // ✅ Map response to marker format
        const markerData = data.map((item) => ({
          position: {
            lat: parseFloat(item.latitude),
            lng: parseFloat(item.longitude),
          },
          color: getColor(item.color_band),
        }));
        setMarkers(markerData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  // ✅ Function to get color based on color_band
  function getColor(colorBand) {
    switch (colorBand.toLowerCase()) {
      case "red":
        return "red";
      case "yellow":
        return "yellow";
      case "green":
        return "green";
      default:
        return "blue"; // Default color if no match
    }
  }

  const onLoad = (map) => {
    setMap(map);
  };

  const onUnmount = () => {
    setMap(null);
  };

  // ✅ Handle city selection
  const handleCityClick = (city) => {
    const newCenter = cityCoordinates[city];
    setCenter(newCenter);
    setSelectedCity(city);
    setIsOpen(false); // Close dropdown after selecting city
  };

  const handleDatePick = (date) => {};

  return (
    <div className="outer-layer" style={{ padding: "20px" }}>
      {/* City Dropdown */}
      <div style={{ marginBottom: "20px", position: "relative" }}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            width: "200px",
            padding: "10px",
            backgroundColor: "#145374",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {selectedCity} ▼
        </button>

        {/* Dropdown Options */}
        {isOpen && (
          <div
            style={{
              position: "absolute",
              width: "200px",
              marginTop: "5px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              backgroundColor: "white",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
              zIndex: 1000,
            }}
          >
            {cities.map((city, index) => (
              <div
                key={index}
                onClick={() => handleCityClick(city)}
                style={{
                  padding: "10px",
                  cursor: "pointer",
                  backgroundColor: "#fff",
                }}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "#f5f5f5")
                }
                onMouseLeave={(e) => (e.target.style.backgroundColor = "#fff")}
              >
                {city}
              </div>
            ))}
          </div>
        )}
      </div>

      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        dateFormat="dd/MM/yyyy"
      />

      {/* Google Map Section */}
      <div className="map-view">
        <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAP_KEY}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={5}
            options={mapOptions}
            onLoad={onLoad}
            onUnmount={onUnmount}
          >
            {window.google &&
              markers.map((marker, index) => (
                <Marker
                  key={index}
                  position={marker.position}
                  icon={{
                    path: window.google.maps.SymbolPath.CIRCLE,
                    scale: 10,
                    fillColor: marker.color,
                    fillOpacity: 0.5,
                    strokeWeight: 1,
                  }}
                />
              ))}
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
}

export default Map;
