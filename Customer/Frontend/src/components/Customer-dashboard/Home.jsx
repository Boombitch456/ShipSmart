import React, { useState } from 'react';
import '../../Styles/CustomerDashboard/Bookingpage.css';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const Home = () => {
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropoffLocation, setDropoffLocation] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [additionalRequirements, setAdditionalRequirements] = useState('');
  const [priceEstimate, setPriceEstimate] = useState(0);

  // Initial map center location (example coordinates)
  const [center, setCenter] = useState({ lat: 40.73061, lng: -73.935242 });
  const [pickupMarker, setPickupMarker] = useState(null);
  const [dropoffMarker, setDropoffMarker] = useState(null);

  // Map container style
  const mapContainerStyle = {
    width: '100%',
    height: '400px',
  };

  const handleCalculatePrice = () => {
    // Simple price calculation logic (you can enhance this based on real data)
    const basePrice = 10;
    const distanceFactor = 2; // Assume a fixed factor for simplicity
    const vehicleFactor = vehicleType === 'Van' ? 1.5 : vehicleType === 'Truck' ? 2 : 1;

    const totalEstimate = basePrice * distanceFactor * vehicleFactor;
    setPriceEstimate(totalEstimate);
  };

  const handleMapClick = (event, type) => {
    const { latLng } = event;
    const location = {
      lat: latLng.lat(),
      lng: latLng.lng(),
    };
    
    if (type === 'pickup') {
      setPickupMarker(location);
    } else if (type === 'dropoff') {
      setDropoffMarker(location);
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
            onChange={(e) => setPickupLocation(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Drop-off Location:</label>
          <input
            type="text"
            placeholder="Enter Drop-off Location"
            value={dropoffLocation}
            onChange={(e) => setDropoffLocation(e.target.value)}
          />
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
        <div className="form-group">
          <label>Additional Requirements:</label>
          <input
            type="text"
            placeholder="e.g., Fragile items, extra loading time"
            value={additionalRequirements}
            onChange={(e) => setAdditionalRequirements(e.target.value)}
          />
        </div>
        <div className="price-estimation">
          <button onClick={handleCalculatePrice} className="btn btn-estimate">
            Get Price Estimate
          </button>
          {priceEstimate > 0 && <p>Estimated Price: ${priceEstimate.toFixed(2)}</p>}
        </div>
        <div className="price-estimation">
          <button onClick={handleCalculatePrice} className="btn btn-estimate">
            BOOK
          </button>
          {priceEstimate > 0 && <p>Estimated Price: ${priceEstimate.toFixed(2)}</p>}
        </div>
      </div>

      <h3>Select Locations on Map</h3>
      <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={10}
          onClick={(event) => handleMapClick(event, pickupMarker ? 'dropoff' : 'pickup')}
        >
          {pickupMarker && <Marker position={pickupMarker} label="Pickup" />}
          {dropoffMarker && <Marker position={dropoffMarker} label="Drop-off" />}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default Home;
