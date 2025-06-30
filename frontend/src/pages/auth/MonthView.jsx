import React from 'react';
import { useParams } from 'react-router-dom';
import {useState,useEffect} from 'react'
import './MonthView.css';

const MonthView = () => {
  const { month } = useParams();
  const [loadingScreen, setLoadingScreen] = useState(true);

  const monthMap = {
    january: 0,
    february: 1,
    march: 2,
    april: 3,
    may: 4,
    june: 5,
    july: 6,
    august: 7,
    september: 8,
    october: 9,
    november: 10,
    december: 11,
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingScreen(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const year = new Date().getFullYear(); 
  const monthIndex = monthMap[month.toLowerCase()];

  // Get number of days in the month
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <div className='monthContainer'>
      {loadingScreen && (
        <div className="initial-loading-screen">
          <div className="loader-circle"></div>
          <p className="loading-text">Loading Month Data...</p>
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
          <source src="/videos/frog4.mp4" type="video/mp4" />
        </video>
        <div className="video-overlay"></div>
      </div>
      <h1 className='monthName'>{month} Calendar</h1>

      <div className='calendarGrid'>
        {days.map(day => (
          <div key={day} className='dayBox'>
            <span className='dayNumber'>{day}</span>
            <img class = "calendarTree" src="/public/pictures/lilyGreen.png" alt="tree" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MonthView;

