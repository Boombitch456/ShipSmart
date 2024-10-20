import React, { useState } from 'react';
import "../../Styles/DriverDashboard/home.css"

const DriverDashboard = () => {
  // State to store the assigned job
  const [job, setJob] = useState(null); 
  // State to manage job status
  const [jobStatus, setJobStatus] = useState(null); 

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
  };

  return (
    <div className="driver-dashboard">
      <h2>Driver Dashboard</h2>

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
            <button onClick={() => updateJobStatus('On the way to Pickup')}>On the Way to Pickup</button>
            <button onClick={() => updateJobStatus('Goods Collected')}>Goods Collected</button>
            <button onClick={() => updateJobStatus('Delivered')}>Delivered</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DriverDashboard;
