import React, { useEffect, useState } from 'react';
import './Yoga.css';

//Dataset
const artVideos = [
  {
    title: 'Bob Ross - FULL EPISODE',
    thumbnail: 'https://img.youtube.com/vi/8ysFkNYwhAE/0.jpg',
    url: 'https://www.youtube.com/watch?v=lLWEXRAnQd0&list=PLAEQD0ULngi67rwmhrkNjMZKvyCReqDV4',
  },
  {
    title: 'Learn to paint without going to art school - self taught painter tips',
    thumbnail: 'https://img.youtube.com/vi/ubstmKOs-Xw/0.jpg',
    url: 'https://www.youtube.com/watch?v=ubstmKOs-Xw',
  },
  {
    title: 'Basic Acrylic Painting Techniques for Beginners',
    thumbnail: 'https://img.youtube.com/vi/Wla7FB3Vrm0/0.jpg',
    url: 'https://www.youtube.com/watch?v=Wla7FB3Vrm0',
  },
  {
    title: 'Ultimate Beginners Guide to Start Painting',
    thumbnail: 'https://img.youtube.com/vi/jQAeOjK-XD0/0.jpg',
    url: 'https://www.youtube.com/watch?v=jQAeOjK-XD0',
  },
  {
    title: 'I tried to learn oil painting in 30 DAYS',
    thumbnail: 'https://img.youtube.com/vi/njC6iZONu9k/0.jpg',
    url: 'https://www.youtube.com/watch?v=njC6iZONu9k',
  },
  {
    title: 'How to Paint Waterfall Valley / Step-by Step Acrylic Painting / Correa Art',
    thumbnail: 'https://img.youtube.com/vi/RZx0Jp31EaE/0.jpg',
    url: 'https://www.youtube.com/watch?v=RZx0Jp31EaE',
  },
  {
    title: 'LEARN TO DRAW FROM 0 to 100! | Roadmap| DrawlikeaSir',
    thumbnail: 'https://img.youtube.com/vi/1jjmOF1hQqI/0.jpg',
    url: 'https://www.youtube.com/watch?v=1jjmOF1hQqI',
  },
  {
    title: 'Autumn Forest STEP by STEP Acrylic Painting (ColorByFeliks)',
    thumbnail: 'https://img.youtube.com/vi/YTg5DhTtvFI/0.jpg',
    url: 'https://www.youtube.com/watch?v=YTg5DhTtvFI',
  },
  {
    title: 'Easy Night Sky Lake for Beginners | Acrylic Painting Tutorial Step by Step',
    thumbnail: 'https://img.youtube.com/vi/ryWRrnMj8tg/0.jpg',
    url: 'https://www.youtube.com/watch?v=ryWRrnMj8tg',
  },
  {
    title: 'Learn To Paint TV E103 - Simple Landscape Painting For Beginners',
    thumbnail: 'https://img.youtube.com/vi/1APlMQx9FAQ/0.jpg',
    url: 'https://www.youtube.com/watch?v=1APlMQx9FAQ',
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
        {artVideos.map((video, index) => (
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
