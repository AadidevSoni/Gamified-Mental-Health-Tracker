import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/Loader';
import { setCredentials } from '../redux/features/authSlice';
import { toast } from 'react-toastify';
import { useRegisterMutation } from '../redux/api/userApiSlice';
import './Register.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loadingScreen, setLoadingScreen] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [register, { isLoading }] = useRegisterMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingScreen(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match!');
    } else {
      try {
        const res = await register({ username, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
        toast.success('User successfully registered!');
      } catch (error) {
        toast.error(error?.data?.message || 'Registration failed');
      }
    }
  };

  return (
    <section className="registerBlock">
      {loadingScreen && (
        <div className="initial-loading-screen">
          <div className="loader-circle"></div>
          <p className="loading-text">Loading your Register Screen...</p>
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
          <source src="/videos/frog3.mp4" type="video/mp4" />
        </video>
        <div className="video-overlay"></div>
      </div>

      <div className="registerContainer">
        <h1 className="registerText">Register</h1>

        <form onSubmit={submitHandler} className="formContainer">
          <div>
            <label htmlFor="name" className="registerNameLabel">Name</label>
            <input
              type="text"
              id="name"
              className="registerNameInput"
              placeholder="Enter name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="email" className="registerNameLabel">Email Address</label>
            <input
              type="email"
              id="email"
              className="registerNameInput"
              placeholder="Enter Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="password" className="registerNameLabel">Password</label>
            <input
              type="password"
              id="password"
              className="registerNameInput"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="registerNameLabel">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              className="registerNameInput"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button disabled={isLoading} type="submit" className="submitButton">
            {isLoading ? 'Registering...' : 'Register'}
          </button>

          {isLoading && <Loader />}
        </form>

        <div className="alreadyUser">
          <p>
            Already have an account?{' '}
            <Link
              to={redirect ? `/login?redirect=${redirect}` : '/login'}
              className="redirectUserRegister"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Register;
