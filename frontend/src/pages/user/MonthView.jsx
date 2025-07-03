import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import './MonthView.css';

const MonthView = () => {
  const { month } = useParams();
  const [loadingScreen, setLoadingScreen] = useState(true);
  const [scoreHistory, setScoreHistory] = useState({});
  const { userInfo } = useSelector((state) => state.auth);

  const monthMap = {
    january: 0, february: 1, march: 2, april: 3, may: 4, june: 5,
    july: 6, august: 7, september: 8, october: 9, november: 10, december: 11,
  };

  const year = new Date().getFullYear();
  const monthIndex = monthMap[month.toLowerCase()];
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  useEffect(() => {
    const fetchScoreHistory = async () => {
      try {
        const { data } = await axios.get('/api/users/score/history', {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        });

        // Transform array to { 'YYYY-MM-DD': score }
        const transformed = {};
        data.forEach(entry => {
          transformed[entry.date] = entry.score;
        });
        setScoreHistory(transformed);
      } catch (err) {
        console.error('Failed to fetch score history:', err);
      } finally {
        setTimeout(() => {
          setLoadingScreen(false);
        }, 1000);
      }
    };

    fetchScoreHistory();
  }, [month, userInfo]);

  const getLilypadColor = (score) => {
    if (score >= 110) return 'lilyGreen.png';
    if (score >= 80) return 'lilyYellow.png';
    if (score >= 50) return 'lilyOrange.png';
    return 'lilyRed.png';
  };

  const formatDate = (day) => {
    const m = (monthIndex + 1).toString().padStart(2, '0');
    const d = day.toString().padStart(2, '0');
    return `${year}-${m}-${d}`;
  };

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
          const score = scoreHistory[dateKey];
          const imageName = score ? getLilypadColor(score) : null;

          return (
            <div key={day} className='dayBox'>
              <span className='dayNumber'>{day}</span>
              {imageName && (
                <div className="lilypadWrapper">
                  <img
                    className="calendarTree"
                    src={`/pictures/${imageName}`}
                    alt="lilypad"
                  />
                  <span className="scoreText">{score}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MonthView;
