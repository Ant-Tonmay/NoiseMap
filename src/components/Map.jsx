import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

import CitySelection from "./CitySelection";
import DatePickerComponent from "./DatePickerComponent";

import {
  cityCoordinates,
  mapOptions,
  containerStyle,
} from "../utils/contsants";

import "../styles/map.css";
import { getColor } from "../utils/utility";

import "react-datepicker/dist/react-datepicker.css";

function Map() {
  const [minValue, setMinValue] = useState(new Date());
  const [maxValue, setMaxValue] = useState(new Date());

  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [center, setCenter] = useState({
    lat: 20.5937,
    lng: 78.9629,
  });

  async function fetchData(url) {
    try {
      const response = await fetch(url);
      const data = await response.json();

      const markerData = data.map((item) => {
        return {
          position: {
            lat: parseFloat(item.latitude),
            lng: parseFloat(item.longitude),
          },
          color: getColor(item.color_band),
          date: new Date(item.date),
        };
      });

      markerData.sort((a, b) => a.date - b.date);
      console.log(markerData);
      setMarkers(markerData);
      setMinValue(markerData[0].date)
      setMaxValue(markerData[markerData.length-1].date)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    console.log("USe effect");

    fetchData("http://localhost:8000/noise/all");
  }, []);

  console.log(`first index :${markers[0]?.date}`);

  const onLoad = (map) => {
    setMap(map);
  };

  const onUnmount = () => {
    setMap(null);
  };

  const handleCityClick = (event) => {
    console.log(event.target.value);
    const newCenter = cityCoordinates[event.target.value];
    setCenter(newCenter);
    setSelectedCity(event.target.value);
  };

  return (
    <div className="outer-layer" style={{ padding: "20px" }}>
      <div className="top">
        <CitySelection handleCityClick={handleCityClick} />
        {markers.length && (
          <DatePickerComponent
            min={markers[0]?.date}
            max={markers[markers.length - 1]?.date}
            minValue={minValue}
            setMinValue={setMinValue}
            maxValue={maxValue}
            setMaxValue={setMaxValue}
          />
        )}
      </div>

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
              markers
                .filter(
                  (marker) => marker.date >= minValue && marker.date <= maxValue
                )
                .map((marker, index) => (
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