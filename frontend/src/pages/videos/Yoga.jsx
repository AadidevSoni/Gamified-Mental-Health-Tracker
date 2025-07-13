import React, { useEffect, useState } from 'react';
import './Yoga.css';

//Dataset
const yogaVideos = [
  {
    title: '15 Min Daily Yoga Flow | Every Day Full Body Yoga Routine',
    thumbnail: 'https://img.youtube.com/vi/yPK7ISPEu3M/0.jpg',
    url: 'https://www.youtube.com/watch?v=yPK7ISPEu3M',
  },
  {
    title: '45 Min Full Body Stretch - Deep Yoga Practice for Athletes',
    thumbnail: 'https://img.youtube.com/vi/KObUQOsqQKI/0.jpg',
    url: 'https://www.youtube.com/watch?v=KObUQOsqQKI',
  },
  {
    title: 'Full Body Yoga for Strength & Flexibility | 25 Minute At Home Mobility Routine',
    thumbnail: 'https://img.youtube.com/vi/Eml2xnoLpYE/0.jpg',
    url: 'https://www.youtube.com/watch?v=Eml2xnoLpYE',
  },
  {
    title: '20 Min. Total Body Yoga | Daily Yoga Flow To Feel Your Ultimate Best ☀️',
    thumbnail: 'https://img.youtube.com/vi/v3OLzsWiaL4/0.jpg',
    url: 'https://www.youtube.com/watch?v=v3OLzsWiaL4',
  },
  {
    title: 'Full Body Flow | 20-Minute Yoga Practice',
    thumbnail: 'https://img.youtube.com/vi/b1H3xO3x_Js/0.jpg',
    url: 'https://www.youtube.com/watch?v=b1H3xO3x_Js',
  },
  {
    title: 'Yoga For Flexibility | 16 Minute Practice',
    thumbnail: 'https://img.youtube.com/vi/Yzm3fA2HhkQ/0.jpg',
    url: 'https://www.youtube.com/watch?v=Yzm3fA2HhkQ',
  },
  {
    title: '30 min Beginner Yoga - Full Body Yoga Stretch No Props Needed',
    thumbnail: 'https://img.youtube.com/vi/6hZIzMpHl-c/0.jpg',
    url: 'https://www.youtube.com/watch?v=6hZIzMpHl-c',
  },
  {
    title: 'Boost Recovery with Full Body Stretch Yoga for Athletes',
    thumbnail: 'https://img.youtube.com/vi/wCUI1bwlJqA/0.jpg',
    url: 'https://www.youtube.com/watch?v=wCUI1bwlJqA',
  },
  {
    title: '15 min Gentle Yoga for Flexibility & Stress Reduction',
    thumbnail: 'https://img.youtube.com/vi/EvMTrP8eRvM/0.jpg',
    url: 'https://www.youtube.com/watch?v=EvMTrP8eRvM',
  },
  {
    title: 'Wake Up Yoga | 11-Minute Morning Yoga Practice',
    thumbnail: 'https://img.youtube.com/vi/UEEsdXn8oG8/0.jpg',
    url: 'https://www.youtube.com/watch?v=UEEsdXn8oG8',
  },
];

const Yoga = () => {
  //UseStates
  const [loadingScreen, setLoadingScreen] = useState(true);

  //Loading screen timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingScreen(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="yogaPage">
      {loadingScreen && (
        <div className="initial-loading-screen">
          <div className="loader-circle"></div>
          <p className="loading-text">Loading Yoga Videos...</p>
        </div>
      )}

      <div className="video-wrapper">
        <video autoPlay muted loop className="video-background" playsInline>
          <source src="/videos/frog6.mp4" type="video/mp4" />
        </video>
        <div className="video-overlay"></div>
      </div>

      <h1 className="yogaHeading">Yoga Video Library</h1>

      <div className="videoCardGrid">
        {yogaVideos.map((video, index) => (
          <a
            key={index}
            href={video.url}
            target="_blank"
            rel="noopener noreferrer"
            className="videoCard"
          >
            <img src={video.thumbnail} alt={video.title} className="videoThumbnail" />
            <div className="videoTitle">{video.title}</div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Yoga;
