import React, { useEffect, useState } from 'react';
import './Yoga.css';

//Dataset
const exerciseVideos = [
  {
    title: 'FAST Walking in 30 minutes | Fitness Videos',
    thumbnail: 'https://img.youtube.com/vi/enYITYwvPAQ/0.jpg',
    url: 'https://www.youtube.com/watch?v=enYITYwvPAQ',
  },
  {
    title: '30 Min FULL BODY WORKOUT with WARM UP | No Equipment & No Repeat | Rowan Row',
    thumbnail: 'https://img.youtube.com/vi/UIPvIYsjfpo/0.jpg',
    url: 'https://www.youtube.com/watch?v=UIPvIYsjfpo',
  },
  {
    title: 'Kids Exercise - Kids Workout At Home',
    thumbnail: 'https://img.youtube.com/vi/8uUawnM-FD8/0.jpg',
    url: 'https://www.youtube.com/watch?v=8uUawnM-FD8',
  },
  {
    title: '20 MINUTE FULL BODY WORKOUT (NO EQUIPMENT)',
    thumbnail: 'https://img.youtube.com/vi/wIynl3at0Rs/0.jpg',
    url: 'https://www.youtube.com/watch?v=wIynl3at0Rs',
  },
  {
    title: '20 Min Fat Burning HIIT Workout - Full body Cardio, No Equipment, No Repeat',
    thumbnail: 'https://img.youtube.com/vi/-hSma-BRzoo/0.jpg',
    url: 'https://www.youtube.com/watch?v=-hSma-BRzoo',
  },
  {
    title: '25 MIN FULL BODY HIIT for Beginners - No Equipment - No Repeat Home Workout',
    thumbnail: 'https://img.youtube.com/vi/cbKkB3POqaY/0.jpg',
    url: 'https://www.youtube.com/watch?v=cbKkB3POqaY',
  },
  {
    title: '"GET STRONG" Kids Core Workout (How To Get A Strong CORE)',
    thumbnail: 'https://img.youtube.com/vi/cZuspnI9nf0/0.jpg',
    url: 'https://www.youtube.com/watch?v=cZuspnI9nf0',
  },
  {
    title: '15 MIN FULL BODY WORKOUT AT HOME (Fat burn | No Jump | No Equipment)',
    thumbnail: 'https://img.youtube.com/vi/BGXGdUj93BM/0.jpg',
    url: 'https://www.youtube.com/watch?v=BGXGdUj93BM',
  },
  {
    title: 'Walking Exercise with the SUPER Coaches! | Walk at Home',
    thumbnail: 'https://img.youtube.com/vi/AdqrTg_hpEQ/0.jpg',
    url: 'https://www.youtube.com/watch?v=AdqrTg_hpEQ',
  },
  {
    title: '8 Best Standing Exercises Belly Fat Workout To Lose Weight Fast At Home',
    thumbnail: 'https://img.youtube.com/vi/NhMs4nuu6Rc/0.jpg',
    url: 'https://www.youtube.com/watch?v=NhMs4nuu6Rc',
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
          <p className="loading-text">Loading Exercise Videos...</p>
        </div>
      )}

      <div className="video-wrapper">
        <video autoPlay muted loop className="video-background" playsInline>
          <source src="/videos/frog6.mp4" type="video/mp4" />
        </video>
        <div className="video-overlay"></div>
      </div>

      <h1 className="yogaHeading">Exercise Video Library</h1>

      <div className="videoCardGrid">
        {exerciseVideos.map((video, index) => (
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
