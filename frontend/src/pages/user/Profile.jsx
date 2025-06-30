import React from 'react'
import { useEffect,useState } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import {toast} from 'react-toastify';
import Loader from '../../components/Loader';
import { setCredentials } from '../redux/features/authSlice';
import { Link } from 'react-router-dom';
import { useProfileMutation } from '../redux/api/userApiSlice';
import './Profile.css'

const Profile = () => {

  const [username,setUsername] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPasword] = useState('');
  const [confirmPassword,setConfirmPassword] = useState('');

  const {userInfo} = useSelector(state => state.auth);

  const [updateProfile, {isLoading: loadingUpdateProfile}] = useProfileMutation();

  useEffect(() => {
    setUsername(userInfo.username);
    setEmail(userInfo.email);
  }, [userInfo.email,userInfo.username]);

  const dispatch = useDispatch();

  const submitHandler = async(e) => {
    e.preventDefault();

    if(password !== confirmPassword) {
      toast.error('Passwords do not match!');
    }else {
      try {

        const res = await updateProfile({_id: userInfo._id,username,email,password}).unwrap();
        dispatch(setCredentials({...res}));
        toast.success("Profile updated successfully!");

      } catch (error) {
        toast.error(error?.data?.message || error.message || "Update failed");
      }
    }
  }

  return<div className='profileContainer'>
    <div className="profileSubContainer">
      <div className="profileSubsContainer">
        <h2 className='profileHeading'>Update Profile</h2>

        <form onSubmit={submitHandler}>
          <div className='formItemContainer'>
            <label className='profileFormLabel'>Name</label>
            <input type="text" placeholder='Enter Name' className='profileFormInput' 
            value={username} onChange={e => setUsername(e.target.value)}/>
          </div>

          <div className='formItemContainer'>
            <label className='profileFormLabel'>Email</label>
            <input type="email" placeholder='Enter Email' className='profileFormInput' 
            value={email} onChange={e => setEmail(e.target.value)}/>
          </div>

          <div className='formItemContainer'>
            <label className='profileFormLabel'>Password</label>
            <input type="password" placeholder='Enter Password' className='profileFormInput' 
            value={password} onChange={e => setPassword(e.target.value)}/>
          </div>

          <div className='formItemContainer'>
            <label className='profileFormLabel'>Confirm Password</label>
            <input type="password" placeholder='Confirm Password' className='profileFormInput' 
            value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}/>
          </div>

          <div className="profileButtonContainer">
            <button type='submit' className='profileButton'>Update</button>
          </div>
        </form>
      </div>
      {loadingUpdateProfile && <Loader />}
    </div>
  </div>
  
}

export default Profile