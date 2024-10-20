import React, { useEffect, useState } from 'react';
import axios from 'axios';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine'; // Import Leaflet Routing Machine
import '../../Styles/CustomerDashboard/Bookingpage.css';

const Home = () => {
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropoffLocation, setDropoffLocation] = useState('');
  const [pickupMarker, setPickupMarker] = useState(null);
  const [dropoffMarker, setDropoffMarker] = useState(null);
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [dropoffSuggestions, setDropoffSuggestions] = useState([]);
  const [map, setMap] = useState(null);
  const [routeControl, setRouteControl] = useState(null);

  useEffect(() => {
    // Initialize the map
    const initMap = L.map('map').setView([40.73061, -73.935242], 13); // Initial view

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors',
    }).addTo(initMap);

    setMap(initMap);

    return () => {
      // Clean up the map on component unmount
      initMap.remove();
    };
  }, []);

  // Fetch suggestions from Nominatim API
  const fetchSuggestions = async (query, type) => {
    if (query.length < 3) {
      if (type === 'pickup') setPickupSuggestions([]);
      else setDropoffSuggestions([]);
      return;
    }

    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`
      );

      if (type === 'pickup') {
        setPickupSuggestions(response.data);
      } else {
        setDropoffSuggestions(response.data);
      }
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  // Handle input change for pickup and dropoff locations
  const handleLocationChange = (e, type) => {
    const value = e.target.value;
    if (type === 'pickup') {
      setPickupLocation(value);
      fetchSuggestions(value, 'pickup');
      setDropoffSuggestions([]); // Clear dropoff suggestions when typing in pickup
    } else {
      setDropoffLocation(value);
      fetchSuggestions(value, 'dropoff');
      setPickupSuggestions([]); // Clear pickup suggestions when typing in dropoff
    }
  };

  // Select a suggestion
  const handleSuggestionSelect = (suggestion, type) => {
    const location = [suggestion.lat, suggestion.lon];

    if (type === 'pickup') {
      setPickupLocation(suggestion.display_name);
      setPickupMarker(location);
      setPickupSuggestions([]); // Clear suggestions after selection

      // Add the pickup marker to the map
      L.marker(location).addTo(map).bindPopup('Pickup Location').openPopup();
    } else {
      setDropoffLocation(suggestion.display_name);
      setDropoffMarker(location);
      setDropoffSuggestions([]); // Clear suggestions after selection

      // Add the dropoff marker to the map
      L.marker(location).addTo(map).bindPopup('Drop-off Location').openPopup();
    }

    // If both markers are set, draw the route
    if (pickupMarker && dropoffMarker) {
      drawRoute(location, dropoffMarker);
    }
  };

  // Function to draw the route between pickup and dropoff locations
  const drawRoute = (pickup, dropoff) => {
    // Remove previous route if it exists
    if (routeControl) {
      routeControl.remove();
    }

    // Use Leaflet Routing Machine to calculate and draw the route
    const newRouteControl = L.Routing.control({
      waypoints: [L.latLng(pickup[0], pickup[1]), L.latLng(dropoff[0], dropoff[1])],
      routeWhileDragging: true,
      show: true,
      createMarker: function () {
        return null; // Remove default markers
      },
      router: L.Routing.osrmv1({
        serviceUrl: 'https://router.project-osrm.org/route/v1',
      }), // Explicitly use OSRM routing service
    }).addTo(map);

    setRouteControl(newRouteControl); // Save the current route control
  };

  return (
    <div className="booking-page">
      <h2>Book Your Ride</h2>
      <div className="form">
        <div className="form-group">
          <label>Pickup Location:</label>
          <input
            type="text"
            placeholder="Enter Pickup Location"
            value={pickupLocation}
            onChange={(e) => handleLocationChange(e, 'pickup')}
          />
          {pickupSuggestions.length > 0 && (
            <ul className="suggestions-list">
              {pickupSuggestions.map((suggestion) => (
                <li
                  key={suggestion.place_id}
                  onClick={() => handleSuggestionSelect(suggestion, 'pickup')}
                >
                  {suggestion.display_name}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="form-group">
          <label>Drop-off Location:</label>
          <input
            type="text"
            placeholder="Enter Drop-off Location"
            value={dropoffLocation}
            onChange={(e) => handleLocationChange(e, 'dropoff')}
          />
          {dropoffSuggestions.length > 0 && (
            <ul className="suggestions-list">
              {dropoffSuggestions.map((suggestion) => (
                <li
                  key={suggestion.place_id}
                  onClick={() => handleSuggestionSelect(suggestion, 'dropoff')}
                >
                  {suggestion.display_name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <h3>Select Locations on Map</h3>
      <div id="map" style={{ height: '400px', width: '100%' }}></div>
    </div>
  );
};

export default Home;
