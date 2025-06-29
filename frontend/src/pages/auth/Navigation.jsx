import React, { useState } from 'react';
import { AiOutlineHome} from 'react-icons/ai';
import { RiMentalHealthFill } from "react-icons/ri";
import {AiOutlineLogin,AiOutlineUserAdd} from 'react-icons/ai'
import { FaCalendarAlt } from "react-icons/fa";
import { GiBrain } from "react-icons/gi";
import { Link } from 'react-router-dom';
import './Navigation.css';
import { useNavigate } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import { useLoginMutation } from '../redux/api/userApiSlice'
import {logout} from '../redux/features/authSlice'

const Navigation = () => {

  const {userInfo} = useSelector(state => state.auth); //This callback tells useSelector to return the auth slice of your Redux state.

  const [dropDown,setDropDown] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleDropDown = () => {
    setDropDown(!dropDown);
  };

  const toggleSideBar = () => {
    setShowSidebar(!showSidebar);
  };

  const closeSideBar = () => {
    setShowSidebar(false);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLoginMutation();

  const logoutHandler = async() => {
    try {

      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/login')
      
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div id="navigation-container" className={`navigation-container ${showSidebar ? 'hidden' : 'visible'}`} style={{ zIndex: 999 }}>
      <div className="nav-links">
        <Link to='/' className="nav-link" onClick={closeSideBar}>
          <AiOutlineHome className='nav-icon' size={26} />
          <span className="nav-item-name">HOME</span>
        </Link>

        <Link to='/profile' className="nav-link" onClick={closeSideBar}>
          <RiMentalHealthFill className='nav-icon' size={26} />
          <span className="nav-item-name">Profile</span>
        </Link>

        <Link to='/calendar' className="nav-link" onClick={closeSideBar}>
          <FaCalendarAlt className='nav-icon' size={26} />
          <span className="nav-item-name">Calendar</span>
        </Link>

        <Link to='/tests' className="nav-link" onClick={closeSideBar}>
          <GiBrain className='nav-icon' size={26} />
          <span className="nav-item-name">Tests</span>
        </Link>
      </div>

      <div className="relative">
        <button onClick={toggleDropDown} className='unameButton'>
          {userInfo ? <span className='uname'>{userInfo.username}</span> : (<></>)}
        </button>
      </div>

      <div className="auth-links">
        {!userInfo && (
          <>
            <Link to='/login' className="nav-link">
              <AiOutlineLogin className='nav-icon loginIcons' size={26}/>
              <span className="nav-item-name">LOGIN</span>
            </Link>

            <Link to='/register' className="nav-link">
              <AiOutlineUserAdd className='nav-icon loginIcons' size={26}/>
              <span className="nav-item-name">REGISTER</span>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navigation;
