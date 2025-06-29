import React from 'react';
import { useParams } from 'react-router-dom';
import './MonthView.css';

const MonthView = () => {
  const { month } = useParams();

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

  const year = new Date().getFullYear(); 
  const monthIndex = monthMap[month.toLowerCase()];

  // Get number of days in the month
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <div className='monthContainer'>
      <h1 className='monthName'>{month} Calendar</h1>

      <div className='calendarGrid'>
        {days.map(day => (
          <div key={day} className='dayBox'>
            <span className='dayNumber'>{day}</span>
            <img class = "calendarTree" src="/public/pictures/tree-green.png" alt="tree" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MonthView;

