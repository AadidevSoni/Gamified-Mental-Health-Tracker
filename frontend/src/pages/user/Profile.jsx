import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader';
import { setCredentials } from '../redux/features/authSlice';
import { useProfileMutation } from '../redux/api/userApiSlice';
import './Profile.css';

const Profile = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPasword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loadingScreen, setLoadingScreen] = useState(true);

  const { userInfo } = useSelector((state) => state.auth);
  const [updateProfile, { isLoading: loadingUpdateProfile }] = useProfileMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    setUsername(userInfo.username);
    setEmail(userInfo.email);
  }, [userInfo.username, userInfo.email]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingScreen(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match!');
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          username,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success('Profile updated successfully!');
      } catch (error) {
        toast.error(error?.data?.message || error.message || 'Update failed');
      }
    }
  };

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
          <source src="/videos/frog3.mp4" type="video/mp4" />
        </video>
        <div className="video-overlay"></div>
      </div>

      <div className="profileContainer">
        <div className="profileText-container">
          <h1 className="profileHeading">Update Profile</h1>

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
    </section>
  );
};

export default Profile;
