import React, { useEffect, useState } from 'react';
import axios from 'axios';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../../Styles/CustomerDashboard/Bookingpage.css';

const Home = () => {
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropoffLocation, setDropoffLocation] = useState('');
  const [pickupMarker, setPickupMarker] = useState(null);
  const [dropoffMarker, setDropoffMarker] = useState(null);
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [dropoffSuggestions, setDropoffSuggestions] = useState([]);

  useEffect(() => {
    // Initialize the map
    const map = L.map('map').setView([40.73061, -73.935242], 13); // Initial view

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors',
    }).addTo(map);

    // Add click event listener for the map
    map.on('click', (e) => {
      const { lat, lng } = e.latlng;

      // Check if pickup marker is already set
      if (!pickupMarker) {
        setPickupMarker([lat, lng]);
        setPickupLocation(`Pickup: [${lat}, ${lng}]`);
        L.marker([lat, lng]).addTo(map).bindPopup('Pickup Location').openPopup();
      } else if (!dropoffMarker) {
        setDropoffMarker([lat, lng]);
        setDropoffLocation(`Dropoff: [${lat}, ${lng}]`);
        L.marker([lat, lng]).addTo(map).bindPopup('Drop-off Location').openPopup();
      }
    });

    return () => {
      // Clean up the map on component unmount
      map.remove();
    };
  }, [pickupMarker, dropoffMarker]);

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
    if (type === 'pickup') {
      setPickupLocation(suggestion.display_name);
      setPickupMarker([suggestion.lat, suggestion.lon]);
      setPickupSuggestions([]); // Clear suggestions after selection
    } else {
      setDropoffLocation(suggestion.display_name);
      setDropoffMarker([suggestion.lat, suggestion.lon]);
      setDropoffSuggestions([]); // Clear suggestions after selection
    }
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
