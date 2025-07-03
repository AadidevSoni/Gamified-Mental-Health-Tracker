import React, { useEffect, useState } from 'react';
import './Test.css';
import questions from '../../../public/questions.json';
import { useSelector } from 'react-redux';
import axios from 'axios';

const Test = () => {
  const [loadingScreen, setLoadingScreen] = useState(true);
  const [sleepHours, setSleepHours] = useState(0);
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [scoreSubmitted, setScoreSubmitted] = useState(false);
  const [userScore, setUserScore] = useState(0);
  const [dailyQuestions, setDailyQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [alreadySubmittedToday, setAlreadySubmittedToday] = useState(false);

  const { userInfo } = useSelector((state) => state.auth);

  const mentalActivities = [
    'Reading', 'Yoga', 'Meditation', 'Walking', 'Cycling', 'Journaling',
    'Exercise', 'Art', 'Listening to Music', 'Travelling',
    'Visual entertainment', 'Socializing',
  ];

  const today = new Date().toLocaleDateString('en-CA'); // YYYY-MM-DD

  // ✅ Fetch user score history to check if already submitted today
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const { data } = await axios.get('/api/users/score/history', {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        });

        const todayScore = data.find((entry) => entry.date === today);
        if (todayScore) {
          setAlreadySubmittedToday(true);
          setScoreSubmitted(true);
          setUserScore(todayScore.score);
        } else {
          // Generate new questions only if not submitted today
          const getRandomQuestions = (allQuestions, count = 10) => {
            const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
            return shuffled.slice(0, count);
          };
          setDailyQuestions(getRandomQuestions(questions));
        }
      } catch (err) {
        console.error('Error fetching score history:', err);
      }
    };

    fetchHistory();
  }, [userInfo]);

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

  const handleAnswer = (qId, selectedOptionIndex) => {
    setAnswers((prev) => ({
      ...prev,
      [qId]: selectedOptionIndex,
    }));
  };

  const calculateIntrospectiveScore = () => {
    let total = 0;
    dailyQuestions.forEach((q) => {
      const selectedIndex = answers[q.id];
      if (selectedIndex !== undefined) {
        total += q.option_scores[selectedIndex];
      }
    });
    return total;
  };

  const getSleepActivityScore = (testData) => {
    let score = 0;

    const hours = testData.sleepHours;
    if (hours >= 8 && hours <= 10) score += 10;
    else if (hours >= 6) score += 8;
    else if (hours >= 4) score += 6;
    else if (hours >= 2) score += 4;
    else if (hours > 10) score += 5;
    else score += 2;

    const activityPoints = {
      "Reading": 8, "Yoga": 9, "Meditation": 10, "Walking": 8,
      "Cycling": 7, "Journaling": 9, "Exercise": 9, "Art": 8,
      "Listening to Music": 7, "Travelling": 7, "Visual entertainment": 5, "Socializing": 8,
    };

    testData.activities.forEach((activity) => {
      if (activity in activityPoints) {
        score += activityPoints[activity];
      }
    });

    return score;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const testData = {
      sleepHours,
      activities: selectedActivities,
    };

    const total = getSleepActivityScore(testData) + calculateIntrospectiveScore();

    try {
      await axios.post('/api/users/score', { score: total }, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });

      setUserScore(total);
      setScoreSubmitted(true);
      setAlreadySubmittedToday(true);
    } catch (error) {
      console.error('Error saving score:', error);
    }
  };

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

        {scoreSubmitted && (
          <h1 className="testScore">Your Total Wellness Score: {userScore}</h1>
        )}

        {!alreadySubmittedToday && (
          <form onSubmit={handleSubmit} className="loginFormContainer">
            <div className="loginContainers">
              {/* SLEEP INPUT */}
              <label htmlFor="sleepHours" className="testQuestion">
                😴 How many hours did you sleep last night?
              </label>
              <input
                type="number"
                id="sleepHours"
                className="testSleepHourInput"
                min="0"
                max="24"
                value={sleepHours}
                placeholder="Enter Sleep Hours"
                onChange={(e) => setSleepHours(Number(e.target.value))}
                required
              />

              {/* ACTIVITIES */}
              <div className="testQuestion">
                <label className="testQuestion1">🏃 Select activities you did today:</label>
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

              {/* QUESTIONS */}
              <div className="testQuestion">
                <label className="testQuestions">Answer the following questions:</label>
                {dailyQuestions.map((q, index) => (
                  <div key={q.id} className="introspective-question">
                    <p className="testQues"><strong>Q{index + 1}:</strong> {q.question}</p>
                    {q.options.map((opt, i) => (
                      <label key={i} className="radio-option">
                        <input
                          type="radio"
                          name={`question-${q.id}`}
                          value={i}
                          checked={answers[q.id] === i}
                          onChange={() => handleAnswer(q.id, i)}
                          required
                        />
                        {opt}
                      </label>
                    ))}
                  </div>
                ))}
              </div>

              <button type="submit" className="submitTestButton">Submit</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Test;
