import React, { useState } from 'react';
import "../../Styles/DriverDashboard/home.css"

const DriverDashboard = () => {
  // State to store the assigned job
  const [job, setJob] = useState(null); 
  // State to manage job status
  const [jobStatus, setJobStatus] = useState(null); 
  // State for availability toggle
  const [isAvailable, setIsAvailable] = useState(true);
  // Example job history
  const [jobHistory, setJobHistory] = useState([]);
  // Example earnings data
  const earnings = {
    today: 200,
    week: 1200,
    month: 4800
  };

  // Example job request (in a real app, this would come from an API)
  const jobRequest = {
    id: 1,
    pickupLocation: "123 Main St, City A",
    dropoffLocation: "456 Park Ave, City B",
    goodsDescription: "Electronics",
    customerName: "John Doe"
  };

  // Handle accepting the job
  const acceptJob = () => {
    setJob(jobRequest);  // Assign job to the driver
    setJobStatus('Accepted');  // Set initial status
  };

  // Handle rejecting the job
  const rejectJob = () => {
    alert('You have rejected the job.');
  };

  // Handle updating the job status
  const updateJobStatus = (status) => {
    setJobStatus(status);
    if (status === 'Delivered') {
      // Add completed job to history
      setJobHistory([...jobHistory, { ...job, status }]);
      setJob(null); // Clear current job after completion
    }
  };

  // Handle availability toggle
  const toggleAvailability = () => {
    setIsAvailable(!isAvailable);
  };

  return (
    <>
    <div className='nav'>
    <div className='logo'>ShipSmart</div>
    <div className="MyBookings">My Rides</div>
    <div className='Myprofile'>My profile</div>
    <div className='Logout'>Logout</div>
   

    
 </div>
    <div className="driver-dashboard">
      <h2>Driver Dashboard</h2>

      {/* Availability Toggle */}
      <div className="availability">
        <label>
          <input type="checkbox" checked={isAvailable} onChange={toggleAvailability} />
          {isAvailable ? 'Available for Jobs' : 'Not Available'}
        </label>
      </div>
  <div className='info'>

    <div className='leftinfo'>
      {/* Display job request if no job is currently accepted */}
      {!job ? (
        <div className="job-request">
          <h3>New Job Request</h3>
          <p><strong>Pickup Location:</strong> {jobRequest.pickupLocation}</p>
          <p><strong>Dropoff Location:</strong> {jobRequest.dropoffLocation}</p>
          <p><strong>Goods:</strong> {jobRequest.goodsDescription}</p>
          <p><strong>Customer:</strong> {jobRequest.customerName}</p>
          <div className="actions">
            <button onClick={acceptJob}>Accept Job</button>
            <button onClick={rejectJob}>Reject Job</button>
          </div>
        </div>
      ) : (
        // Once a job is accepted, show job details and status updates
        <div className="current-job">
          <h3>Current Job</h3>
          <p><strong>Pickup Location:</strong> {job.pickupLocation}</p>
          <p><strong>Dropoff Location:</strong> {job.dropoffLocation}</p>
          <p><strong>Goods:</strong> {job.goodsDescription}</p>
          <p><strong>Customer:</strong> {job.customerName}</p>

          {/* Show the current status */}
          <p><strong>Current Status:</strong> {jobStatus}</p>

          {/* Status Update Buttons */}
          <div className="status-updates">
            <button className="status-btn" onClick={() => updateJobStatus('On the way to Pickup')}>On the Way to Pickup</button>
            <button className="status-btn" onClick={() => updateJobStatus('Goods Collected')}>Goods Collected</button>
            <button className="status-btn" onClick={() => updateJobStatus('Delivered')}>Delivered</button>
          </div>
        </div>
      )}

      {/* Earnings Overview */}
      <div className="earnings-overview">
        <h3>Earnings Overview</h3>
        <ul>
          <li><strong>Today:</strong> ${earnings.today}</li>
          <li><strong>This Week:</strong> ${earnings.week}</li>
          <li><strong>This Month:</strong> ${earnings.month}</li>
        </ul>
      </div>
      </div>
     
      <div className='rightinfo'>
          {/* Map Placeholder */}
          <div className="map-placeholder">
        <h3>Live Map</h3>
        <div className="map">
          {/* Placeholder for map; later integrate Google Maps API or Mapbox */}
          <p>Map showing current route/location will appear here.</p>
        </div>
        </div>
      </div>
      </div>
    </div>

      {/* Job History
      <div className="job-history">
        <h3>Job History</h3>
        {jobHistory.length === 0 ? (
          <p>No completed jobs yet.</p>
        ) : (
          <ul>
            {jobHistory.map((completedJob, index) => (
              <li key={index}>
                <p><strong>Pickup:</strong> {completedJob.pickupLocation}</p>
                <p><strong>Dropoff:</strong> {completedJob.dropoffLocation}</p>
                <p><strong>Status:</strong> {completedJob.status}</p>
              </li>
            ))}
          </ul>
        )}
      </div> */}

  
    </>
  );
};

export default DriverDashboard;
