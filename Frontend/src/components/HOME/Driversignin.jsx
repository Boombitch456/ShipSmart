import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Add useNavigate to navigate after successful login

const DriverSignIn = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(null); // For error handling
  const navigate = useNavigate(); // For navigation

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error before new attempt

    try {
      const response = await fetch('http://localhost:5000/driver/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const result = await response.json();

      if (response.ok) {
        // Sign-in successful, redirect to dashboard
        navigate('/driver-dashboard');
      } else {
        // Handle error message
        setError(result.message || 'Sign-in failed');
      }
    } catch (err) {
      setError('Error: Unable to connect to server.');
    }
  };

  return (
    <div className="driver-signin">
      <h2>Driver Sign In</h2>
      <p>Welcome back! Please log in to your account.</p>

      {/* Display error messages */}
      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" name="email" value={credentials.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input type="password" name="password" value={credentials.password} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn submit-button">Sign In</button>
      </form>
      <p><a href="/forgot-password">Forgot Password?</a></p>
      <p>New driver? <Link to="/driver-signup">Sign up here</Link></p>
    </div>
  );
};

export default DriverSignIn;
