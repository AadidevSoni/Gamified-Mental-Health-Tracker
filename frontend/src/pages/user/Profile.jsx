  import React, { useEffect, useState } from 'react';
  import { useDispatch, useSelector } from 'react-redux';
  import { toast } from 'react-toastify';
  import Loader from '../../components/Loader';
  import { setCredentials } from '../redux/features/authSlice';
  import { useProfileMutation } from '../redux/api/userApiSlice';
  import './Profile.css';
  import axios from 'axios';

  //Badge dataset
  const getBadgeName = (level) => {
    if (level < 10) return { name: "Seedling", emoji: "🌱" };
    if (level < 20) return { name: "Sprout", emoji: "🌿" };
    if (level < 30) return { name: "Sapling", emoji: "🌾" };
    if (level < 40) return { name: "Mindful Explorer", emoji: "🌼" };
    if (level < 50) return { name: "Wellness Warrior", emoji: "⚔️" };
    if (level < 60) return { name: "Calm Guardian", emoji: "🛡️" };
    if (level < 70) return { name: "Serenity Sage", emoji: "🧘‍♂️" };
    return { name: "Enlightened One", emoji: "🌟" };
  };

  const Profile = () => {

    //UseStates
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPasword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loadingScreen, setLoadingScreen] = useState(true);
    const [level,setLevel] = useState(0);
    const [exp,setExp] = useState(0);
    const { name, emoji } = getBadgeName(level);
    const [scoreHistory, setScoreHistory] = useState([]);

    //React redux methods
    const { userInfo } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    //userApiSlice call
    const [updateProfile, { isLoading: loadingUpdateProfile }] = useProfileMutation();

    //Setting all profile datas
    useEffect(() => {
      setUsername(userInfo.username);
      setEmail(userInfo.email);
      setLevel(userInfo.level);
      setExp(userInfo.exp);
    }, [userInfo.username, userInfo.email]);

    //Loading screen timer
    useEffect(() => {
      const timer = setTimeout(() => {
        setLoadingScreen(false);
      }, 1000);
      return () => clearTimeout(timer);
    }, []);

    //Handles submit logic
    const submitHandler = async (e) => {
      e.preventDefault();
      if (password !== confirmPassword) {
        toast.error('Passwords do not match!');
      } else {
        try {
          const res = await updateProfile({_id: userInfo._id,username,email,password,}).unwrap();
          dispatch(setCredentials({ ...res }));
          toast.success('Profile updated successfully!');
        } catch (error) {
          toast.error(error?.data?.message || error.message || 'Update failed');
        }
      }
    };

    //Fetchesa score history
    useEffect(() => {
      const fetchHistory = async () => {
        try {
          const { data } = await axios.get('/api/users/score/history', {
            headers: { Authorization: `Bearer ${userInfo.token}` },
          });
          setScoreHistory(data);
        } catch (err) {
          console.error('Failed to fetch score history:', err);
        }
      };
      fetchHistory();
    }, [userInfo]);

    //Lilypads
    const totalLilypads = scoreHistory.length;

    const colorCounts = {
      red: 0,
      orange: 0,
      yellow: 0,
      green: 0,
    };

    scoreHistory.forEach(({ score }) => {
      if (score < 50) colorCounts.red++;
      else if (score < 80) colorCounts.orange++;
      else if (score < 110) colorCounts.yellow++;
      else colorCounts.green++;
    });

    return (
      <section className="profileBlock">
        {loadingScreen && (
          <div className="initial-loading-screen">
            <div className="loader-circle"></div>
            <p className="loading-text">Loading your profile...</p>
          </div>
        )}

        <div className="video-wrapper">
          <video autoPlay muted loop className="video-background" playsInline>
            <source src="/videos/frog6.mp4" type="video/mp4" />
          </video>
          <div className="video-overlay"></div>
        </div>

        <div className="profileContainer">
          <div className="profileText-container">
            <div className="profileSecOne">
              <h1 className="profileHeading">Profile</h1>

              <div className="explevelDisplay">
                <h1 className="levelDisplay">Level: {level}</h1>
                <h1 className="expDisplay">Exp: {exp}</h1>
              </div>
              <h2 className="badgeDisplay">BADGE: {emoji} {name}</h2>

              <h2 className="badgeDisplay">🪷 Total Lilypads: {totalLilypads}</h2>

              <div className="lilypadBreakdown">
                <div className="redScore">
                  <img className = "lilyPadScore" src="/pictures/lilyRed.png"></img> 
                  <span className="scoreText">{colorCounts.red}</span>
                </div>
                <div className="orangeScore">
                  <img className = "lilyPadScore" src="/pictures/lilyOrange.png"></img> 
                  <span className="scoreText">{colorCounts.orange}</span>
                </div>
                <div className="yellowScore">
                  <img className = "lilyPadScore" src="/pictures/lilyYellow.png"></img> 
                  <span className="scoreText">{colorCounts.yellow}</span>
                </div>
                <div className="greenScore">
                  <img className = "lilyPadScore" src="/pictures/lilyGreen.png"></img> 
                  <span className="scoreText">{colorCounts.green}</span>
                </div>
              </div>
            </div>

            <div className="profileSecTwo">
              <h1 className="profileHeadingUp">Update Profile</h1>
              <form onSubmit={submitHandler} className="profileFormContainer">
                <div className="profileFormGroup">
                  <label className="profileFormLabel">Name</label>
                  <input
                    type="text"
                    placeholder="Enter Name"
                    className="profileFormInput"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>

                <div className="profileFormGroup">
                  <label className="profileFormLabel">Email</label>
                  <input
                    type="email"
                    placeholder="Enter Email"
                    className="profileFormInput"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="profileFormGroup">
                  <label className="profileFormLabel">Password</label>
                  <input
                    type="password"
                    placeholder="Enter Password"
                    className="profileFormInput"
                    value={password}
                    onChange={(e) => setPasword(e.target.value)}
                  />
                </div>

                <div className="profileFormGroup">
                  <label className="profileFormLabel">Confirm Password</label>
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    className="profileFormInput"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>

                <button type="submit" className="profileButton">
                  Update
                </button>

                {loadingUpdateProfile && <Loader />}
              </form>
            </div>
          </div>
        </div>
      </section>
    );
  };

  export default Profile;
