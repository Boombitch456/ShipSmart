import '../../Styles/HOME/driversignin.css'
import React, { useState } from 'react';

const DriverSignIn = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle sign-in logic here
    console.log(credentials);
  };

  return (
    <div className="driver-signin">
      <h2>Driver Sign In</h2>
      <p>Welcome back! Please log in to your account.</p>
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
      <p>New driver? <a href="/driver-signup">Sign up here</a></p>
    </div>
  );
};

export default DriverSignIn;
