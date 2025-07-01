import React from 'react'
import { useState,useEffect } from 'react'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import { useGetLeaderboardQuery } from '../redux/api/userApiSlice'
import './Leaderboard.css'

const Leaderboard = () => {

  const {data:Leaderboard,isLoading,error,refetch} = useGetLeaderboardQuery();
  const [loadingScreen,setLoadingScreen] = useState(true);

  useEffect(() => {
    refetch()
  }, [refetch]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingScreen(false);
    }, 1000);
  
    return () => clearTimeout(timer);
  }, []);

  return <div>
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
    
    <div className='leaderboardContainer'>
      <h1 className='leaderboardHeading'>🏆 Leaderboard</h1>
    <div className='leaderboardContainer'></div>
      {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="error">
            {error?.data?.message || error.message}
          </Message>
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
              {Leaderboard.map((user, index) => (
                <tr key={user._id}>
                  <td className="tdStyle">{index + 1}</td>
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
};

export default Leaderboard