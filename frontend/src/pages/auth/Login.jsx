import React from 'react'
import { useState,useEffect } from 'react';
import {Link,useLocation,useNavigate} from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { useLoginMutation } from '../redux/api/userApiSlice';
import { setCredentials } from '../redux/features/authSlice';
import { toast } from 'react-toastify';
import './Login.css';
import Loader from '../../components/Loader';

const Login = () => {

  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, {isLoading}] = useLoginMutation();

  const {userInfo} = useSelector(state => state.auth);

  const {search} = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') ?? '/';

  useEffect(() => {
    if(userInfo) {
      navigate(redirect);
    }
  }, [navigate,redirect,userInfo]);

  const submitHandler = async(e) => {
    e.preventDefault();

    try {
      const res = await login({email,password}).unwrap();
      console.log(res);
      dispatch(setCredentials({...res}));
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  }


  return (
    <div className='loginss'>
      <section className="loginContainer">
        <div className='loginText-container'>
          <h1 className="sign">Sign In</h1>

          <form onSubmit={submitHandler} className='loginFormContainer'>
            <div className='loginContainers'>
              <label htmlFor="email" className='loginEmail'>Email Address</label>
              <input type="email" id="email" className='loginEmailInput' 
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>

            <div className='loginContainers'>
              <label htmlFor="password" className='loginEmail'>Password</label>
              <input type="password" id="password" className='loginEmailInput' 
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>

            <button disabled={isLoading} type="submit" className='loginButton'>{isLoading? "Signing In..." : "Sign In"}</button>

            {isLoading && <Loader />}
          </form>

          <div className='newUserContainer'>
            <p className="newUser">
                New User ? {" "}
                <Link to={redirect ? `/register?redirect=${redirect}` : '/register'} className='registerLink'>Register</Link>
            </p>
          </div>

        </div>
      </section>
    </div>
  )
}

export default Login