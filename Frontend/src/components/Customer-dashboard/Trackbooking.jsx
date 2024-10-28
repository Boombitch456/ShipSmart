import React, { useEffect, useState } from 'react';
import '../../Styles/CustomerDashboard/trackbooking.css';

export default function Trackbooking(){
    return(
       <div className='trackbooking'>
        <h2 className='heading'>
        Your ride has been booked!
        </h2>
        <div className='fetching'>Fetching drivers details~~~</div>
        <div className='booking details'>
            <div className='pickup'>Pickup location:</div>
            <div className='drop'>Dropoff location:</div>
        </div>


       </div>
    )
}