import React, { useState, useEffect } from 'react';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { useSelector } from 'react-redux';
import { useGetLeaderboardQuery } from '../redux/api/userApiSlice';
import './Leaderboard.css';

const Leaderboard = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { data: Leaderboard = [], isLoading, error, refetch } = useGetLeaderboardQuery();

  const [loadingScreen, setLoadingScreen] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    const timer = setTimeout(() => setLoadingScreen(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const filteredLeaderboard = Leaderboard.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentUserRank = Leaderboard.findIndex(user => user._id === userInfo._id) + 1;
  const currentUserData = Leaderboard.find(user => user._id === userInfo._id);

  return (
    <div>
      {loadingScreen && (
        <div className="initial-loading-screen">
          <div className="loader-circle"></div>
          <p className="loading-text">Loading Leaderboard...</p>
        </div>
      )}

      <div className="video-wrapper">
        <video autoPlay muted loop className="video-background" playsInline>
          <source src="/videos/frog6.mp4" type="video/mp4" />
        </video>
        <div className="video-overlay"></div>
      </div>

      <div className="leaderboardContainer">
        <h1 className="leaderboardHeading">🏆 Leaderboard</h1>

        {/* Search bar */}
        <input
          type="text"
          placeholder="Search by username..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="searchInput"
        />

        {/* Current user rank summary */}
        {currentUserData && (
          <div className="currentUserHighlight">
            You are ranked <strong>#{currentUserRank}</strong>
          </div>
        )}

        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="error">{error?.data?.message || error.message}</Message>
        ) : (
          <table className="leaderboardTable">
            <thead>
              <tr>
                <th className="thStyle">Rank</th>
                <th className="thStyle">User</th>
                <th className="thStyle">Level</th>
                <th className="thStyle">Exp</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeaderboard.map((user, index) => (
                <tr
                  key={user._id}
                  className={user._id === userInfo._id ? 'currentUserRow' : ''}
                >
                  <td className="tdStyle">{Leaderboard.findIndex(u => u._id === user._id) + 1}</td>
                  <td className="tdStyle">{user.username}</td>
                  <td className="tdStyle">{user.level}</td>
                  <td className="tdStyle">{user.exp || 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
