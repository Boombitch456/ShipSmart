import React from 'react';
import '../../Styles/HOME/home.css';
import Navbar from "./Navbar"
import Signin from "./Signin"


export default function Home(){
  return (
    <div className="homepage">
        <Navbar/>
      <header className="header">
        <h1>Welcome to ShipSmart !</h1>
        <p>Your one-stop solution for on-demand transportation of goods.</p>
        <div className="cta-buttons">
         <div className='signin'> 
         <Signin/>
          <button className="btn book-ride">Book a Ride</button>
          
          <button className="btn sign-in">Don't have an Account? Sign up </button>
        </div>
        </div>
      </header>
      
      <section className="features">
        <h2>Features</h2>
        <div className="feature-list">
          <div className="feature">
            <h3>Real-Time Tracking</h3>
            <p>Track your driver in real-time with our integrated GPS system.</p>
          </div>
          <div className="feature">
            <h3>Easy Booking</h3>
            <p>Book your transportation in just a few clicks!</p>
          </div>
          <div className="feature">
            <h3>Transparent Pricing</h3>
            <p>Get upfront price estimates based on distance and vehicle type.</p>
          </div>
        </div>
      </section>

      <section className="testimonials">
        <h2>User Testimonials</h2>
        <div className="testimonial">
          <p>"Fantastic service! I was able to book a ride in seconds!"</p>
          <p>- John Doe</p>
        </div>
        <div className="testimonial">
          <p>"Real-time tracking gave me peace of mind while my goods were in transit."</p>
          <p>- Jane Smith</p>
        </div>
      </section>

      <footer className="footer">
        <p>&copy; 2024 Your Logistics Service. All rights reserved.</p>
      </footer>
    </div>
  );
};
