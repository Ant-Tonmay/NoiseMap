import React, { useState, useEffect } from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'

function Map() {
  const [map, setMap] = useState(null)
  const [markers, setMarkers] = useState([])

  const containerStyle = {
    width: '600px',
    height: '600px',
  }

  const center = {
    lat: 20.5937, // Default center (India)
    lng: 78.9629,
  }

  const mapOptions = {
    zoomControl: true,
    mapTypeControl: true,
    streetViewControl: true,
    fullscreenControl: true,
  }

  // ✅ Fetch noise data from the API
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('http://0.0.0.0:8000/noise/all')
        const data = await response.json()
        console.log(data)

        // ✅ Map response to marker format
        const markerData = data.map((item) => ({
          position: {
            lat: parseFloat(item.latitude),
            lng: parseFloat(item.longitude),
          },
          color: getColor(item.color_band),
        }))
        setMarkers(markerData)
      } catch (error) {
        console.log("IN The Error");

        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  // ✅ Function to get color based on color_band
  function getColor(colorBand) {
    switch (colorBand.toLowerCase()) {
      case 'red':
        return 'red'
      case 'yellow':
        return 'yellow'
      case 'green':
        return 'green'
      default:
        return 'blue' // Default color if no match
    }
  }

  const onLoad = (map) => {
    setMap(map)
  }

  const onUnmount = () => {
    setMap(null)
  }

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAP_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={5}
        options={mapOptions}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {/* Check if window.google is available */}
        {window.google &&
          markers.map((marker, index) => (
            <Marker
              key={index}
              position={marker.position}
              icon={{
                path: window.google.maps.SymbolPath.CIRCLE,
                scale: 10,
                fillColor: marker.color,
                fillOpacity: 1,
                strokeWeight: 1,
              }}
            />
          ))}
      </GoogleMap>
    </LoadScript>
  )
}

export default Map
