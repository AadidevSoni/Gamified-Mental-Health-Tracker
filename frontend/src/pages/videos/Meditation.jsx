import React, { useEffect, useState } from 'react';
import './Yoga.css';

const medVideos = [
  {
    title: '10-Minute Guided Meditation: Self-Love | SELF',
    thumbnail: 'https://img.youtube.com/vi/vj0JDwQLof4/0.jpg',
    url: 'https://www.youtube.com/watch?v=vj0JDwQLof4',
  },
  {
    title: '5 Minute Meditation for Relaxation & Positive Energy | 30 Day Meditation Challenge',
    thumbnail: 'https://img.youtube.com/vi/VpHz8Mb13_Y/0.jpg',
    url: 'https://www.youtube.com/watch?v=VpHz8Mb13_Y',
  },
  {
    title: '10 MIN Guided Meditation To Clear Your Mind & Start New Positive Habits',
    thumbnail: 'https://img.youtube.com/vi/uTN29kj7e-w/0.jpg',
    url: 'https://www.youtube.com/watch?v=uTN29kj7e-w',
  },
  {
    title: '5-Minute Meditation You Can Do Anywhere | Goodful',
    thumbnail: 'https://img.youtube.com/vi/inpok4MKVLM/0.jpg',
    url: 'https://www.youtube.com/watch?v=inpok4MKVLM',
  },
  {
    title: '10 Minute Meditation to Release Stress & Anxiety | Total Body Relaxation',
    thumbnail: 'https://img.youtube.com/vi/H_uc-uQ3Nkc/0.jpg',
    url: 'https://www.youtube.com/watch?v=H_uc-uQ3Nkc',
  },
  {
    title: '10 Minute Guided Meditation for Positive Energy, Peace & Light 🌤',
    thumbnail: 'https://img.youtube.com/vi/cyMxWXlX9sU/0.jpg',
    url: 'https://www.youtube.com/watch?v=cyMxWXlX9sU',
  },
  {
    title: '5 Minute Guided Morning Meditation for Positive Energy ☀️',
    thumbnail: 'https://img.youtube.com/vi/j734gLbQFbU/0.jpg',
    url: 'https://www.youtube.com/watch?v=j734gLbQFbU',
  },
  {
    title: 'Daily Calm | 10 Minute Mindfulness Meditation | Letting Go',
    thumbnail: 'https://img.youtube.com/vi/syx3a1_LeFo/0.jpg',
    url: 'https://www.youtube.com/watch?v=syx3a1_LeFo',
  },
  {
    title: 'Meditation For Inner Peace - Yoga With Adriene',
    thumbnail: 'https://img.youtube.com/vi/d4S4twjeWTs/0.jpg',
    url: 'https://www.youtube.com/watch?v=d4S4twjeWTs',
  },
  {
    title: 'Flying: Relaxing Sleep Music for Meditation, Stress Relief & Relaxation by Peder B. Helland',
    thumbnail: 'https://img.youtube.com/vi/1ZYbU82GVz4/0.jpg',
    url: 'https://www.youtube.com/watch?v=1ZYbU82GVz4',
  },
];

const Yoga = () => {
  const [loadingScreen, setLoadingScreen] = useState(true);

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
          <p className="loading-text">Loading Meditation Videos...</p>
        </div>
      )}

      <div className="video-wrapper">
        <video autoPlay muted loop className="video-background" playsInline>
          <source src="/videos/frog6.mp4" type="video/mp4" />
        </video>
        <div className="video-overlay"></div>
      </div>

      <h1 className="yogaHeading">Meditation Video Library</h1>

      <div className="videoCardGrid">
        {medVideos.map((video, index) => (
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
