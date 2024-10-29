import React, { useEffect, useState } from 'react';
import axios from 'axios';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';
import '../../Styles/CustomerDashboard/Bookingpage.css';

const CustomerDashboard = () => {
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropoffLocation, setDropoffLocation] = useState('');
  const [pickupMarker, setPickupMarker] = useState(null);
  const [dropoffMarker, setDropoffMarker] = useState(null);
  const [vehicleType, setVehicleType] = useState('Car');
  const [priceEstimate, setPriceEstimate] = useState(0);
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [dropoffSuggestions, setDropoffSuggestions] = useState([]);
  const [map, setMap] = useState(null);
  const [routeControl, setRouteControl] = useState(null);
  const [pickupType, setPickupType] = useState('now'); // New state for pickup type (Now/Schedule)
  const [scheduledDate, setScheduledDate] = useState(''); // State for storing scheduled date and time

  // Handle price calculation based on vehicle type and distance
  const handleCalculatePrice = () => {
    const basePrice = 10; // Base fare
    const distanceFactor = 2; // Placeholder for distance calculation
    const vehicleFactor = vehicleType === 'Van' ? 1.5 : vehicleType === 'Truck' ? 2 : 1;

    const totalEstimate = basePrice * distanceFactor * vehicleFactor;
    setPriceEstimate(totalEstimate);
  };

  // Initialize the map on mount
  useEffect(() => {
    const initMap = L.map('map').setView([40.73061, -73.935242], 13); // New York coordinates as default

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors',
    }).addTo(initMap);

    setMap(initMap);

    return () => {
      initMap.remove(); // Clean up map on unmount
    };
  }, []);

  // Fetch location suggestions from Nominatim API
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

  // Handle changes for location input fields
  const handleLocationChange = (e, type) => {
    const value = e.target.value;
    if (type === 'pickup') {
      setPickupLocation(value);
      fetchSuggestions(value, 'pickup');
      setDropoffSuggestions([]); // Clear drop-off suggestions when typing in pickup
    } else {
      setDropoffLocation(value);
      fetchSuggestions(value, 'dropoff');
      setPickupSuggestions([]); // Clear pickup suggestions when typing in dropoff
    }
  };

  // Handle selection from suggestions
  const handleSuggestionSelect = (suggestion, type) => {
    const location = [suggestion.lat, suggestion.lon];
    if (type === 'pickup') {
      setPickupLocation(suggestion.display_name);
      setPickupMarker(location);
      setPickupSuggestions([]); // Clear suggestions after selection
      L.marker(location).addTo(map).bindPopup('Pickup Location').openPopup();
    } else {
      setDropoffLocation(suggestion.display_name);
      setDropoffMarker(location);
      setDropoffSuggestions([]); // Clear suggestions after selection
      L.marker(location).addTo(map).bindPopup('Drop-off Location').openPopup();
    }
  };

  // Draw route when both pickup and dropoff markers are set
  useEffect(() => {
    if (pickupMarker && dropoffMarker) {
      drawRoute(pickupMarker, dropoffMarker);
    }
  }, [pickupMarker, dropoffMarker]);

  // Draw the route on the map using Leaflet Routing Machine
  const drawRoute = (pickup, dropoff) => {
    if (routeControl) {
      routeControl.remove(); // Remove previous route if it exists
    }

    const newRouteControl = L.Routing.control({
      waypoints: [L.latLng(pickup[0], pickup[1]), L.latLng(dropoff[0], dropoff[1])],
      routeWhileDragging: true,
      show: true,
      createMarker: function () {
        return null; // Disable default markers
      },
    }).addTo(map);

    setRouteControl(newRouteControl);
  };

  // Handle booking submission to the server
  const handleBooking = async () => {
    try {
      const bookingData = {
        user: '671dfa29ac6806e164bcc30e', // Replace with actual user ID
        pickupLocation: pickupMarker, // Should be in [lat, lon] format
        dropOffLocation: dropoffMarker, // Should be in [lat, lon] format
        distance: 10, // Placeholder for distance
        estimatedPrice: priceEstimate,
        vehicleType,
        surgeMultiplier: 1.0,
        pickupType,
        scheduledDate: pickupType === 'later' ? scheduledDate : null
      };
  
      const response = await axios.post('http://localhost:5000/booking/book', bookingData);
      if (response.status === 201) {
        alert('Booking successful!');
      }
    } catch (error) {
      console.error('Error during booking:', error);
      alert('An error occurred during booking.');
    }
  };
  

  return (
    <>
      <div className='nav'>
        <div className='logo'>ShipSmart</div>
        <div className="MyBookings">My Bookings</div>
        <div className='Logout'>Logout</div>
      </div>
      
      <div className='bookingarea'>
        <div className="booking-page">
          <div className="form">
            <h2>Book Your Ride</h2>
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
            <div className="form-group">
              <label>Vehicle Type:</label>
              <select
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value)}
              >
                <option value="Car">Car</option>
                <option value="Van">Van</option>
                <option value="Truck">Truck</option>
              </select>
            </div>
                
            {/* New section for pickup type */}
            <div className="form-group">
              <label>Pickup Type:</label>
              <div>
                <label>
                  <input
                    type="radio"
                    value="now"
                    checked={pickupType === 'now'}
                    onChange={() => setPickupType('now')}
                  />{' '}
                  Pickup Now
                </label>
                <label>
                  <input
                    type="radio"
                    value="later"
                    checked={pickupType === 'later'}
                    onChange={() => setPickupType('later')}
                  />{' '}
                  Schedule for Later
                </label>
              </div>
            </div>

            {/* Show date picker if scheduling for later */}
            {pickupType === 'later' && (
              <div className="form-group">
                <label>Pickup Date & Time:</label>
                <input
                  type="datetime-local"
                  value={scheduledDate}
                  onChange={(e) => setScheduledDate(e.target.value)}
                />
              </div>
            )}
            <div className="price-estimation">
              <button onClick={handleCalculatePrice} className="btn btn-estimate">
                Get Price Estimate
              </button>
              {priceEstimate > 0 && <p>Estimated Price: ${priceEstimate.toFixed(2)}</p>}
            </div>
            <div className="price-estimation">
              <button onClick={handleBooking} className="btn btn-estimate">
                BOOK
              </button>
            </div>
          </div>
        </div>

        <div className='mapping'>
          <h3>Track Your Driver</h3>
          <div id="map" style={{ marginTop: '10px', height: '450px', width: '100%' }}></div>
        </div>
      </div>
    </>
  );
};

export default CustomerDashboard;