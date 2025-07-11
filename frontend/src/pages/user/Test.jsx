import React, { useEffect, useState } from 'react';
import './Test.css';
import allQuestions from '../../../public/questions.json';
import { useSelector } from 'react-redux';
import axios from 'axios';

const Test = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [loadingScreen, setLoadingScreen] = useState(true);
  const [alreadySubmittedToday, setAlreadySubmittedToday] = useState(false);
  const [testClicked, setTestClicked] = useState(false);
  const [step, setStep] = useState(0);
  const [dailyQuestions, setDailyQuestions] = useState([]);
  const [sleepHours, setSleepHours] = useState('');
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  const [categoryScores, setCategoryScores] = useState({});
  const [sleepActivityScore, setSleepActivityScore] = useState(0);

  const today = new Date().toLocaleDateString('en-CA');
  const categories = ['depression', 'anxiety', 'self_worth', 'stress_management', 'concentration'];
  const mentalActivities = [
    'Reading', 'Yoga', 'Meditation', 'Walking', 'Cycling', 'Journaling',
    'Exercise', 'Art', 'Listening to Music', 'Travelling',
    'Visual entertainment', 'Socializing',
  ];

  useEffect(() => {
    const timer = setTimeout(() => setLoadingScreen(false), 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const { data } = await axios.get('/api/users/score/history', {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });

        const todayScore = data.find((entry) => entry.date === today);

        if (todayScore) {
          setAlreadySubmittedToday(true);
          setSubmitted(true);
          setTotalScore(todayScore.score);
          setSleepActivityScore(todayScore.sleepActivityScore || 0);
          setCategoryScores(todayScore.categories || {});
        } else {
          // Load new questions
          const selected = [];
          for (let tag of categories) {
            const pool = allQuestions.filter((q) => q.tags.includes(tag));
            const picked = pool.sort(() => 0.5 - Math.random()).slice(0, 4);
            selected.push(...picked);
          }
          if (selected.length > 0) {
            setDailyQuestions(selected.sort(() => 0.5 - Math.random()));
          } else {
            console.warn('❌ No questions were selected. Check tags or allQuestions.json');
          }
        }
      } catch (err) {
        console.error('Error fetching history:', err);
      }
    };

    fetchHistory();
  }, [userInfo]);


  const toggleActivity = (activity) => {
    setSelectedActivities((prev) =>
      prev.includes(activity) ? prev.filter((a) => a !== activity) : [...prev, activity]
    );
  };

  const handleAnswer = (id, index) => {
    setAnswers({ ...answers, [id]: index });
  };

  const getSleepActivityScore = () => {
    let score = 0;
    const h = Number(sleepHours);
    if (h >= 8 && h <= 10) score += 10;
    else if (h >= 6) score += 8;
    else if (h >= 4) score += 6;
    else if (h >= 2) score += 4;
    else if (h > 10) score += 5;
    else score += 2;

    const points = {
      Reading: 8, Yoga: 9, Meditation: 10, Walking: 8,
      Cycling: 7, Journaling: 9, Exercise: 9, Art: 8,
      'Listening to Music': 7, Travelling: 7, 'Visual entertainment': 5, Socializing: 8,
    };
    selectedActivities.forEach((act) => {
      if (points[act]) score += points[act];
    });
    return score;
  };

  const getIntrospectiveScore = () => {
    return dailyQuestions.reduce((acc, q) => {
      const ansIndex = answers[q.id];
      return acc + (typeof ansIndex === 'number' ? q.option_scores[ansIndex] : 0);
    }, 0);
  };

  const handleSubmit = async () => {
    const sleepActScore = getSleepActivityScore();
    const introspectiveScore = getIntrospectiveScore();
    const total = sleepActScore + introspectiveScore;

    const categoryTotals = {};
    categories.forEach((cat) => (categoryTotals[cat] = 0));

    dailyQuestions.forEach((q) => {
      const selected = answers[q.id];
      if (typeof selected === 'number') {
        q.tags.forEach((tag) => {
          if (categoryTotals[tag] !== undefined) {
            categoryTotals[tag] += q.option_scores[selected];
          }
        });
      }
    });

    try {
      await axios.post('/api/users/score', {
        score: total,
        sleepActivityScore: sleepActScore,
        categories: categoryTotals,
      }, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });

      setTotalScore(total);
      setCategoryScores(categoryTotals);
      setSleepActivityScore(sleepActScore);
      setAlreadySubmittedToday(true);
      setSubmitted(true);
    } catch (err) {
      console.error('Error saving score:', err);
    }
  };

  if (loadingScreen) {
    return (
      <div className="initial-loading-screen">
        <div className="loader-circle"></div>
        <p className="loading-text">Loading Test...</p>
      </div>
    );
  }

  if (submitted) {
    return <div className="testContainer">
      <div className="video-wrapper">
        <video autoPlay muted loop className="video-background">
          <source src="/videos/frog6.mp4" type="video/mp4" />
        </video>
        <div className="video-overlay"></div>
      </div>
      <div className="result-summary">
        <h2 className='scads-result-head'>SCADS Wellness Summary</h2>
        
        <div className="score-wellness">
          <p className='totalScore'><strong>Total Score:</strong> {totalScore}</p>
          <p className='wellness'><strong>Wellness %:</strong> {(totalScore / 185 * 100).toFixed(1)}%</p>
        </div>

        <div className="scoreBreakdown">
          <div className="scoreContainerAns">
            <p className='cat-name-score'><strong>Sleep + Activity:</strong> {((sleepActivityScore) / 105 *  100).toFixed(0)}%</p>
              <div className="scoreSlider">
                <input
                  type="range"
                  min="0"
                  max="105"
                  value={sleepActivityScore}
                  disabled
                  className="slider"
                />
              </div>
          </div>
          {Object.entries(categoryScores).map(([cat, score]) => {
            const percent = (score / 16) * 100;

            let bgColor = 'rgba(255, 0, 0, 0.63)'; // Red by default
            let message = '';

            if (percent >= 75) {
              bgColor = 'rgba(0, 200, 100, 0.64)'; // Green
            } else if (percent >= 50) {
              bgColor = 'rgba(255, 238, 0, 0.75)'; // Yellow
            } else if (percent >= 25) {
              bgColor = 'rgba(255, 166, 0, 0.78)'; // Orange
            }

            // Messages map
            const messages = {
              depression: [
                "You may be feeling overwhelmed or emotionally numb. You're not alone — it's okay to ask for help.",
                "You might be in a low mood. Try journaling or reaching out to someone you trust.",
                "You’re doing okay, but be mindful of your energy. Take time for self-care.",
                "You're emotionally balanced. Keep nurturing your mental health!",
              ],
              anxiety: [
                "You may be feeling anxious or restless. Try grounding exercises or deep breathing.",
                "Tension is present — consider calming routines like meditation or nature walks.",
                "You're managing okay. Keep an eye on your thoughts and rest well.",
                "You're in a calm headspace. Great job maintaining emotional clarity.",
              ],
              self_worth: [
                "You might be doubting yourself. Remember, your worth isn't defined by your bad days.",
                "You’re growing — try affirmations or writing down what you like about yourself.",
                "You're valuing yourself more. Keep celebrating your small wins.",
                "You believe in your worth. That’s a powerful mindset!",
              ],
              concentration: [
                "Focus feels scattered. Try short bursts of work with mindful breaks.",
                "Distractions are common. Consider limiting noise or screen time.",
                "You're managing focus fairly well. Keep refining your routines.",
                "Your focus is sharp! Keep building that momentum.",
              ],
              stress_management: [
                "Stress is likely high. Prioritize rest, slow breathing, and kindness to yourself.",
                "You’re juggling things. Try to balance responsibilities with calm moments.",
                "You're handling stress decently. Recharge regularly to stay steady.",
                "You're in control of your stress. Keep using those healthy coping strategies.",
              ],
            };

            const messageIndex = percent < 25 ? 0 : percent < 50 ? 1 : percent < 75 ? 2 : 3;
            message = messages[cat][messageIndex];

            return (
              <div key={cat} className="scoreContainerAns" style={{ backgroundColor: bgColor}}>
                <div className="scoreSlider">
                  <label className="cat-name-score">
                    {cat.replace('_', ' ').toUpperCase()} {percent.toFixed(0)}%
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="16"
                    value={score}
                    disabled
                    className="slider"
                  />
                  <p className="categoryMessage">{message}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  }

  return (
    <div className="testContainer">
      <div className="video-wrapper">
        <video autoPlay muted loop className="video-background">
          <source src="/videos/frog6.mp4" type="video/mp4" />
        </video>
        <div className="video-overlay"></div>
      </div>

      <div className="testContent">
        <h1 className="testHeading">SCADS Wellness Test</h1>

        {!testClicked ? (
          <div className="testIntroContainer">
            <h1 className="scadsHeader">Welcome to SCADS Check-in</h1>
            <p className="scadsSubText">SCADS stands for:</p>
            <ul className="scadsList">
              <li><strong>S — Self-Worth:</strong> Shapes confidence and resilience.</li>
              <li><strong>C — Concentration:</strong> Fuels focus and mental clarity.</li>
              <li><strong>A — Anxiety:</strong> Impacts energy and decision-making.</li>
              <li><strong>D — Depression:</strong> Affects motivation and relationships.</li>
              <li><strong>S — Stress:</strong> Chronic stress harms both mind and body.</li>
            </ul>
            <p className="scadsNote">Take this 5-minute check-in to reflect on your mental state today.</p>
            <button className="takeTestButton" onClick={() => setTestClicked(true)}>
              Start SCADS Test →
            </button>
          </div>
        ) : (
          <>
            {step === 0 && (
              <div className="step">
                <label className="testQuestion">How many hours did you sleep last night?</label>
                <input
                  type="number"
                  value={sleepHours}
                  onChange={(e) => setSleepHours(e.target.value)}
                  placeholder=""
                  min="0"
                  max="24"
                  required
                  className="testSleepHourInput"
                />
              </div>
            )}

            {step === 1 && (
              <div className="step">
                <label className="testQuestion">🏃 Activities you did today:</label>
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
            )}

            {step >= 2 && step < 22 && dailyQuestions[step - 2] && (
              <div className="step">
                <p className="testQues">
                  <strong>Q{step - 1}:</strong> {dailyQuestions[step - 2].question}
                </p>
                {dailyQuestions[step - 2].options.map((opt, i) => {
                  const isSelected = answers[dailyQuestions[step - 2].id] === i;
                  return (
                    <label key={i} className={`radio-option ${isSelected ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name={`q-${dailyQuestions[step - 2].id}`}
                        value={i}
                        checked={isSelected}
                        onChange={() => handleAnswer(dailyQuestions[step - 2].id, i)}
                      />
                      {opt}
                    </label>
                  );
                })}
              </div>
            )}

            <div className="navButtons">
              {step > 0 && step <= 22 && <button onClick={() => setStep(step - 1)}>← Previous</button>}
              {step < 21 && <button onClick={() => setStep(step + 1)}>Next →</button>}
              {step === 21 && <button onClick={handleSubmit}>Submit</button>}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Test;
