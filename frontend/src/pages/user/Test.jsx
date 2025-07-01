import React, { useEffect, useState } from 'react';
import './Test.css';
import Loader from '../../components/Loader';

const Test = () => {
  const [loadingScreen, setLoadingScreen] = useState(true);
  const [sleepHours, setSleepHours] = useState(0);
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [scoreSubmitted, setScoreSubmitted] = useState(false);

  const mentalActivities = [
    'Reading','Yoga','Meditation','Walking','Cycling','Journaling','Exercise','Art','Listening to Music','Travelling','Visual entertainment',
    'Socializing'
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingScreen(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const toggleActivity = (activity) => {
    if (selectedActivities.includes(activity)) {
      setSelectedActivities(selectedActivities.filter((a) => a !== activity));
    } else {
      setSelectedActivities([...selectedActivities, activity]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const testData = {
      sleepHours,
      activities: selectedActivities,
    };

    getScore(testData);
    setScoreSubmitted(true);
  };

  const [userScore,setUserScore] = useState(0);

  const getScore = (testData) => {
    
    let score = 0;

    const hours = testData.sleepHours;
    if (hours >= 8 && hours <= 10) {
      score += 10; 
    } else if (hours >= 6 && hours < 8) {
      score += 8;
    }else if (hours >= 4 && hours < 6) {
      score += 6;
    } else if (hours >= 2 && hours < 4) {
      score += 4;
    } else if (hours > 10) {
      score += 5; 
    } else {
      score += 2; // Very little sleep
    }

    const activityPoints = {
      "Reading": 8,
      "Yoga": 9,
      "Meditation": 10,
      "Walking": 8,
      "Cycling": 7,
      "Journaling": 9,
      "Exercise": 9,
      "Art": 8,
      "Listening to Music": 7,
      "Travelling": 7,
      "Visual entertainment": 5,
      "Socializing":8,
    };

    testData.activities.forEach((activity) => {
      if(activity in activityPoints) {
        score += activityPoints[activity];
      }
    });
    
    setUserScore(score);
    
  }

  return (
    <div className="testContainer">
      {loadingScreen && (
        <div className="initial-loading-screen">
          <div className="loader-circle"></div>
          <p className="loading-text">Loading Today's Tests...</p>
        </div>
      )}

      <div className="video-wrapper">
        <video autoPlay muted loop className="video-background" playsInline>
          <source src="/videos/frog5.mp4" type="video/mp4" />
        </video>
        <div className="video-overlay"></div>
      </div>

      <div className="testContent">
        <h1 className="testHeading">🧠 Today's Mental Health Check</h1>

        <form onSubmit={handleSubmit} className="loginFormContainer">
          <div className="loginContainers">
            <label htmlFor="sleepHours" className="testQuestion">
              😴 How many hours did you sleep last night?
            </label>
            <input type="number" id="sleepHours" className="testSleepHourInput" min="0" max="24" value={sleepHours}
              placeholder="Enter Sleep Hours"
              onChange={(e) => setSleepHours(Number(e.target.value))}
            />

            <div className="testQuestion">
              <label className="testQuestion">🏃 Select activities you did today:</label>
              <div className="activityButtonGroup">
                {mentalActivities.map((activity) => (
                  <button
                    key={activity}
                    type="button"
                    className={`activityButton ${selectedActivities.includes(activity) ? 'active' : ''}`}
                    onClick={() => toggleActivity(activity)}
                  >
                    {activity}
                  </button>
                ))}
              </div>
            </div>

            <button type="submit" className="submitTestButton">
              Submit
            </button>
          </div>
        </form>

        {scoreSubmitted && (
          <h1 className='testScore'>Your Wellness Score: {userScore}</h1>
        )}
      </div>
    </div>
  );
};

export default Test;
