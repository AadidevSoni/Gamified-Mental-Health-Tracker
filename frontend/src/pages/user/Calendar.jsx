import React from 'react';
import './Calendar.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

//Month dataset
const months = [
  'January', 'February', 'March', 'April','May', 'June', 'July', 'August','September', 'October', 'November', 'December'
];

const Calendar = () => {
  //React redux method
  const navigate = useNavigate();

  //UseStates
  const [loadingScreen, setLoadingScreen] = useState(true);

  //Handle month button
  const handleClick = (month) => {
    navigate(`/calendar/${month}`);
  };

  //Loading screen timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingScreen(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className='btn-container'>
      {loadingScreen && (
        <div className="initial-loading-screen">
          <div className="loader-circle"></div>
          <p className="loading-text">Loading your Calendar...</p>
        </div>
      )}

      <div className="video-wrapper">
        <video
          autoPlay
          muted
          loop
          className="video-background"
          playsInline
        >
          <source src="/videos/frog2.mp4" type="video/mp4" />
        </video>
        <div className="video-overlay"></div>
      </div>
      
      {months.map((month) => (
        <button key={month} className='months' onClick={() => handleClick(month)}>
          {month}
        </button>
      ))}
    </div>
  );
};

export default Calendar;
