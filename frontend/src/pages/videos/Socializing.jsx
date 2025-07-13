import React from 'react'
import './Socializing.css'
import { useEffect, useState } from 'react';

//Dataset
const socials = [
  {
    title: 'Instagram',
    thumbnail: 'https://cdn.logojoy.com/wp-content/uploads/20230511124058/instagram-new-gradient-logo-animation.gif',
    url: 'https://www.instagram.com',
  },
  {
    title: 'Twitter',
    thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuGDNBztH0X45NF58e-4jJcOH1Ugg1ZO2qdA&s',
    url: 'https://x.com/home',
  },
  {
    title: 'Facebook',
    thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVJzqJGCeXLi6A8C6FPQt5hYZGheKJV1ZoqA&s',
    url: 'https://www.facebook.com',
  },
  {
    title: 'Linked In',
    thumbnail: 'https://cdn.shopify.com/s/files/1/0558/6413/1764/files/LinkedIn_Logo_Design_History_Evolution_4_1024x1024.jpg?v=1692867854',
    url: 'www.linkedin.com',
  },
  {
    title: 'Reddit',
    thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNSvBZri7bsohOIChk8mxEYU7TeZjXlA77uQ&s',
    url: 'https://www.reddit.com',
  },
  {
    title: 'Discord',
    thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzbCAhgYWqyp0fBa9_6xe_EcU75bUDj7xWLQ&s',
    url: 'https://discord.com',
  },
  {
    title: 'Snapchat',
    thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSf1U8MP0D4kNUel3Rl4iv-VBnDrAwuWIej8w&s',
    url: 'https://www.snapchat.com',
  },
  {
    title: 'OmeTV',
    thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXBTIAW_WEqVDonbYFvnlqmOlf52A2vd7WBg&s',
    url: 'https://ome.tv',
  },
  {
    title: 'Monkey App',
    thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRZyJwrjDIYMUyya8ru5bCnxWsPDOTxBrqmA&s',
    url: 'https://www.monkey.app/talk-to-strangers/ometv.html',
  },
  {
    title: 'TikTok',
    thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJKLmECNLU0EyBvWKpfc3jHa0KRoexDXD6OQ&s',
    url: 'https://www.tiktok.com',
  },
];

const Socializing = () => {
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
          <p className="loading-text">Loading Socials...</p>
        </div>
      )}

      <div className="video-wrapper">
        <video autoPlay muted loop className="video-background" playsInline>
          <source src="/videos/frog6.mp4" type="video/mp4" />
        </video>
        <div className="video-overlay"></div>
      </div>

      <h1 className="yogaHeading">Socials Library</h1>

      <div className="videoCardGrid-social">
        {socials.map((video, index) => (
          <a
            key={index}
            href={video.url}
            target="_blank"
            rel="noopener noreferrer"
            className="videoCard-social"
          >
            <img src={video.thumbnail} alt={video.title} className="videoThumbnail-social" />
            <div className="videoTitle-social">{video.title}</div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Socializing;
