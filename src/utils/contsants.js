export const cityCoordinates = {
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
export const cities = Object.keys(cityCoordinates);
export const containerStyle = {
    width: "100vw",
    height: "100vh",
  };

export const mapOptions = {
    zoomControl: true,
    mapTypeControl: true,
    streetViewControl: true,
    fullscreenControl: true,
};