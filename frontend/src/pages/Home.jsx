import './Home.css';
import React, { useEffect, useState } from 'react';

const Home = () => {

  const [loadingScreen, setLoadingScreen] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingScreen(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const popups = {
    about: {
      title: 'About Us',
      content: 'MindLeap is your companion in building mental wellness through mood tracking, habit building, and mindfulness content\n\n Improve your mental well being while at the same time gamifying the whole experience!\n\nThe aim of MindLeap is to track the user\'s mental health everyday and give the user a visual representation and a strong idea on how to improve their mental well being.\n\nMindLeap also provides a variety of activity related videos and platforms that can have a positive effect in your mental well being',
    },
    contact: {
      title: 'Contact Us',
      content: 'Email: aadidevbahrain@gmail.com\nPhone: +91 8714120603\nInstagram: @aadidev.2006',
    },
    helplines: {
      title: 'Helplines',
      content: '📞 iCall (TISS) - +91 9152987821 \n(Free and anonymous; run by trained mental health professionals)\n\n📞 Sumaitri (Delhi) - +91 11 23389090 \n(Specializes in suicide prevention)\n\n📞 AASRA (Mumbai) - +91 98204 66726 \n(Emotional crisis intervention & suicide prevention)\n\n📞 Snehi (Delhi) - +91 9582208181 \n(Offers mental health and family therapy)\n\n📞 Connecting Trust (Pune) - +91 9922001122 \n(Active listening and suicide prevention)\n\n📞 COOJ Mental Health Foundation (Goa) - +91 93732 02550 \n(Suicide helpline, therapy & awareness)',
    },
  };

  const [activePopup, setActivePopup] = useState(null);

  const openPopup = (key) => setActivePopup(key);
  const closePopup = () => setActivePopup(null);


  return (
    <div className='homeContainer'>
      {loadingScreen && (
        <div className="initial-loading-screen">
          <div className="loader-circle"></div>
          <p className="loading-text">Loading Home Page...</p>
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
          <source src="/videos/frog1.mp4" type="video/mp4" />
        </video>
        <div className="video-overlay"></div>
      </div>

      <div className="homeContent">
        <div className='homeBtnContainer'>
          <button className='homeButton' onClick={() => openPopup('about')}>About Us</button>
          <button className='homeButton' onClick={() => openPopup('helplines')}>Helplines</button>
          <button className='homeButton' onClick={() => openPopup('contact')}>Contact Us</button>
        </div>

        {activePopup && (
          <div className="popupOverlay" onClick={closePopup}>
            <div className="popupBox" onClick={(e) => e.stopPropagation()}>
              <h2>{popups[activePopup].title}</h2>
              <pre>{popups[activePopup].content}</pre>
              <button className="closePopupBtn" onClick={closePopup}>Close</button>
            </div>
          </div>
        )}

        <h1 className='homeTitle'>Welcome to <br /> <span className='canopy'><span className='calm'>Mind</span><span className='canopy-word'>Leap</span></span></h1>
        <p className="homeSubtitle">Hop into a happier you — track moods, build habits, and grow mentally strong with your frog companion!</p>
        <img className="forest" src="'/pictures/forest3.jpg'" alt="" />
      </div>
    </div>
  );
};

export default Home;