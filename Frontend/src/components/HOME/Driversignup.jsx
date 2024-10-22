import React, { useState } from 'react';
import '../../Styles/HOME/driversignup.css';
import { Link } from 'react-router-dom';

const DriverSignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    vehicleMake: '',
    vehicleModel: '',
    vehicleYear: '',
    licensePlate: '',
    drivingLicense: '',
    availability: '',
    termsAccepted: false,
  });

  const [error, setError] = useState(null); // For displaying error messages
  const [successMessage, setSuccessMessage] = useState(''); // For displaying success messages

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.termsAccepted) {
      setError('Please accept the Terms and Conditions.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/driver/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccessMessage('Driver registered successfully!');
        setError(null); // Clear error message
        // Reset form fields
        setFormData({
          name: '',
          email: '',
          phone: '',
          password: '',
          vehicleMake: '',
          vehicleModel: '',
          vehicleYear: '',
          licensePlate: '',
          drivingLicense: '',
          availability: '',
          termsAccepted: false,
        });
      } else {
        setError(result.message || 'Something went wrong, please try again.');
      }
    } catch (err) {
      setError('Error: Unable to connect to server.');
    }
  };

  return (
    <div className="driver-signup">
      <h2>Sign Up as a Driver</h2>
      <p>Join our platform and start earning today!</p>

      {/* Display success or error messages */}
      {successMessage && <p className="success-message">{successMessage}</p>}
      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Phone Number:</label>
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Vehicle Make:</label>
          <input type="text" name="vehicleMake" value={formData.vehicleMake} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Vehicle Model:</label>
          <input type="text" name="vehicleModel" value={formData.vehicleModel} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Vehicle Year:</label>
          <input type="text" name="vehicleYear" value={formData.vehicleYear} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>License Plate:</label>
          <input type="text" name="licensePlate" value={formData.licensePlate} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Driving License Number:</label>
          <input type="text" name="drivingLicense" value={formData.drivingLicense} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Availability:</label>
          <input
            type="text"
            name="availability"
            value={formData.availability}
            onChange={handleChange}
            placeholder="e.g., Mon-Fri, 9 AM - 5 PM"
            required
          />
        </div>
        <div className="form-group">
          <label>
            <input type="checkbox" name="termsAccepted" checked={formData.termsAccepted} onChange={handleChange} required />
            I agree to the Terms and Conditions
          </label>
        </div>
        <Link to="/driver-signin"><button type="submit" className="btn submit-button">Sign Up</button></Link> 
      </form>
      <Link to="/driver-signin">
        <p>Already have an account? Log in</p>
      </Link>
    </div>
  );
};

export default DriverSignUp;
