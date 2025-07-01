import React, { useEffect, useState } from 'react';
import './Activity.css';
import { Link } from 'react-router-dom';

const Activity = () => {
  const [loadingScreen, setLoadingScreen] = useState(true);

  const activities = [
    { title: 'Yoga', image: '/pictures/yoga.png', path: '/activity/yoga' },
    { title: 'Reading', image: '/pictures/reading.png', path: '/activity/reading' },
    { title: 'Meditation', image: '/pictures/meditation.png', path: '/activity/meditation' },
    { title: 'Exercise', image: '/pictures/exercise.png', path: '/activity/exercise' },
    { title: 'Art', image: '/pictures/art.png', path: '/activity/art' },
    { title: 'Music', image: '/pictures/music.png', path: 'https://open.spotify.com/playlist/37i9dQZF1DX3rxVfibe1L0' },
    { title: 'Visual Entertainment', image: '/pictures/visualEntertainment.png', path: 'https://www.youtube.com' },
    { title: 'Soacializing', image: '/pictures/socializing.png', path: '/activity/socializing' }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingScreen(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="activityPage">
      {loadingScreen && (
        <div className="initial-loading-screen">
          <div className="loader-circle"></div>
          <p className="loading-text">Loading Activities...</p>
        </div>
      )}

      <div className="video-wrapper">
        <video autoPlay muted loop className="video-background" playsInline>
          <source src="/videos/frog4.mp4" type="video/mp4" />
        </video>
        <div className="video-overlay"></div>
      </div>

      <h1 className='activityHeading'>🌿 Explore Activities</h1>

      <div className="activityGrid">
        {activities.map((act, index) => (
          <Link to={act.path} className="activityCard" key={index}>
            <img src={act.image} alt={act.title} className="activityImage" />
            <div className="activityTitle">{act.title}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Activity;
