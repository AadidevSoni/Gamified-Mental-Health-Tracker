import React from 'react';
import './Calendar.css';
import { useNavigate } from 'react-router-dom';

const months = [
  'January', 'February', 'March', 'April',
  'May', 'June', 'July', 'August',
  'September', 'October', 'November', 'December'
];

const Calendar = () => {
  const navigate = useNavigate();

  const handleClick = (month) => {
    navigate(`/calendar/${month}`);
  };

  return (
    <div className='btn-container'>
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
