import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import './MonthView.css';

const MonthView = () => {

  //Params from the current URL that were matched by the routes
  const { month } = useParams();

  //Reatc redux method
  const { userInfo } = useSelector((state) => state.auth);

  //UseStates
  const [loadingScreen, setLoadingScreen] = useState(true);
  const [scoreHistory, setScoreHistory] = useState({});
  const [selectedDay, setSelectedDay] = useState(null);

  //Month map
  const monthMap = {
    january: 0, february: 1, march: 2, april: 3, may: 4, june: 5, july: 6, august: 7, september: 8, october: 9, november: 10, december: 11,
  };

  //Get number of days in month
  const year = new Date().getFullYear();
  const monthIndex = monthMap[month.toLowerCase()];
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  //Get Score history
  useEffect(() => {
    const fetchScoreHistory = async () => {
      try {
        const { data } = await axios.get('/api/users/score/history', {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });

        const transformed = {};
        data.forEach(entry => {
          transformed[entry.date] = entry;
        });
        setScoreHistory(transformed);
      } catch (err) {
        console.error('Failed to fetch score history:', err);
      } finally {
        setTimeout(() => setLoadingScreen(false), 1000);
      }
    };

    fetchScoreHistory();
  }, [month, userInfo]);

  //Lilypad color logic
  const getLilypadColor = (score) => {
    if (score >= 110) return 'lilyGreen.png';
    if (score >= 80) return 'lilyYellow.png';
    if (score >= 50) return 'lilyOrange.png';
    return 'lilyRed.png';
  };

  //Percentage color logic
  const getColorClass = (value) => {
    if (value < 25) return 'redText';
    if (value < 50) return 'orangeText';
    if (value < 75) return 'yellowText';
    return 'greenText';
  };

  //Date format to show
  const formatDate = (day) => {
    const m = (monthIndex + 1).toString().padStart(2, '0');
    const d = day.toString().padStart(2, '0');
    return `${year}-${m}-${d}`;
  };
  
  //Calculate score percentage
  const getPercentage = (value, max) => ((value / max) * 100).toFixed(1);

  return (
    <div className='monthContainer'>
      {loadingScreen && (
        <div className="initial-loading-screen">
          <div className="loader-circle"></div>
          <p className="loading-text">Loading Month Data...</p>
        </div>
      )}

      <div className="video-wrapper">
        <video autoPlay muted loop className="video-background" playsInline>
          <source src="/videos/frog4.mp4" type="video/mp4" />
        </video>
        <div className="video-overlay"></div>
      </div>

      <h1 className='monthName'>{month} Calendar</h1>

      <div className='calendarGrid'>
        {days.map((day) => {
          const dateKey = formatDate(day);
          const entry = scoreHistory[dateKey];
          const imageName = entry ? getLilypadColor(entry.score) : null;

          return (
            <div key={day} className='dayBox' onClick={() => entry && setSelectedDay(entry)}>
              <span className='dayNumber'>{day}</span>
              {imageName && (
                <div className="lilypadWrapper">
                  <img className="calendarTree" src={`/pictures/${imageName}`} alt="lilypad" />
                  <span className="scoreText">{entry.score}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {selectedDay && (
        <div className="popupOverlay" onClick={() => setSelectedDay(null)}>
          <div className="popupCard" onClick={(e) => e.stopPropagation()}>
            <h2>Report for {selectedDay.date}</h2>
            <ul className="scoreReportList">
              <li>Total Score: <span className={getColorClass(getPercentage(selectedDay.score, 185))}>{getPercentage(selectedDay.score, 185)}%</span></li>
              <li>Sleep + Activity: <span className={getColorClass(getPercentage(selectedDay.sleepActivityScore, 105))}>{getPercentage(selectedDay.sleepActivityScore, 105)}%</span></li>
              {Object.entries(selectedDay.categories).map(([key, val]) => (
                <li key={key}>
                  {key.replace('_', ' ')}: <span className={getColorClass(getPercentage(val, 16))}>{getPercentage(val, 16)}%</span>
                </li>
              ))}
            </ul>
            <button className="closeButton" onClick={() => setSelectedDay(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MonthView;
