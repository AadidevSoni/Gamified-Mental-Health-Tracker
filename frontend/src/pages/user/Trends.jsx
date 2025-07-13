import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { useSelector } from 'react-redux';
import './Trends.css';

const Trends = () => {

  //Redux store
  const { userInfo } = useSelector((state) => state.auth);

  //UseStates
  const [scoreHistory, setScoreHistory] = useState([]);

  //Fetch score history
  useEffect(() => {
    const fetchScoreHistory = async () => {
      try {
        const { data } = await axios.get('/api/users/score/history', {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });

        const sorted = data
          .map((entry) => {
            const getPercentage = (value, max) => ((value / max) * 100).toFixed(1);

            return {
              date: new Date(entry.date).toLocaleDateString('en-GB'),
              total: getPercentage(entry.score || 0, 185),
              sleepActivity: getPercentage(entry.sleepActivityScore || 0, 105),
              depression: getPercentage(entry.categories?.depression || 0, 16),
              anxiety: getPercentage(entry.categories?.anxiety || 0, 16),
              self_worth: getPercentage(entry.categories?.self_worth || 0, 16),
              stress_management: getPercentage(entry.categories?.stress_management || 0, 16),
              concentration: getPercentage(entry.categories?.concentration || 0, 16),
            };
          })
          .sort((a, b) => new Date(a.date) - new Date(b.date));

        setScoreHistory(sorted);
      } catch (error) {
        console.error('Error fetching score history:', error);
      }
    };

    fetchScoreHistory();
  }, [userInfo]);

  //getAverage percentage
  const getAverage = (arr, key) => {
    const values = arr.map(d => parseFloat(d[key] || 0));
    const sum = values.reduce((acc, val) => acc + val, 0);
    return (sum / values.length).toFixed(1);
  };

  //Text generator
  const generateTrendMessage = (avg, label) => {
    if (avg >= 75) return `${label} is in great shape. Keep up the good habits!`;
    if (avg >= 50) return `${label} is moderate. Stay consistent and mindful.`;
    if (avg >= 25) return `${label} needs attention. Try more wellness routines.`;
    return `${label} is low. Please consider reaching out for support.`;
  };

  return (
    <div className="trendsPage">
      <div className="video-wrapper">
        <video autoPlay muted loop className="video-background">
          <source src="/videos/frog1.mp4" type="video/mp4" />
        </video>
        <div className="video-overlay"></div>
      </div>

      <h1 className="trendsHeading">📈 SCADS Wellness Trends</h1>

      <div className="chartContainer">
        <h2 className="chartTitle">Total SCADS Score Graph</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={scoreHistory}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tick={{ fill: '#94f7c2' }} />
            <YAxis domain={[0, 100]} tickFormatter={(tick) => `${tick}%`} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="total" stroke="#22c55e" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="chartContainer">
        <h2 className="chartTitle">Sleep + Activity Score Graph</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={scoreHistory}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tick={{ fill: '#94f7c2' }} />
            <YAxis domain={[0, 100]} tickFormatter={(tick) => `${tick}%`} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="sleepActivity" stroke="#38bdf8" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {['depression', 'anxiety', 'self_worth', 'stress_management', 'concentration'].map((cat, idx) => {
        const colors = ['#f87171', '#fbbf24', '#a78bfa', '#60a5fa', '#34d399'];
        return (
          <div key={cat} className="chartContainer">
            <h2 className="chartTitle">{cat.replace('_', ' ').toUpperCase()} Graph</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={scoreHistory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tick={{ fill: '#94f7c2' }} />
                <YAxis domain={[0, 100]} tickFormatter={(tick) => `${tick}%`} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey={cat} stroke={colors[idx]} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        );
      })}

      <div className="trendAnalysis">
        <h2 className="analysisTitle">Insights from Your SCADS Trends</h2>
        {['depression', 'anxiety', 'self_worth', 'stress_management', 'concentration'].map((cat) => {
          const avg = getAverage(scoreHistory, cat);
          return (
            <div key={cat} className="analysisItem">
              <h4>{cat.replace('_', ' ').toUpperCase()}: {avg}%</h4>
              <p>{generateTrendMessage(avg, cat.replace('_', ' '))}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Trends;
