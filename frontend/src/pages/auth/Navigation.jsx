import React, { useState } from 'react';
import { AiOutlineHome} from 'react-icons/ai';
import { RiMentalHealthFill } from "react-icons/ri";
import {AiOutlineLogin,AiOutlineUserAdd} from 'react-icons/ai'
import { FaCalendarAlt } from "react-icons/fa";
import { GiBrain } from "react-icons/gi";
import { MdLeaderboard } from "react-icons/md";
import { MdOndemandVideo } from "react-icons/md";
import { BsGraphUp } from "react-icons/bs";
import { IoGameController } from "react-icons/io5";
import { Link } from 'react-router-dom';
import './Navigation.css';
import { useNavigate } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import { useLogoutMutation } from '../redux/api/userApiSlice'
import {logout} from '../redux/features/authSlice'


const Navigation = () => {

  //React redux store method
  const {userInfo} = useSelector(state => state.auth); 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //UseStates
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  //Functions
  const toggleDropDown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const closeSideBar = () => {
    setShowSidebar(false);
  };

  //API call
  const [logoutApiCall] = useLogoutMutation();

  //Logout handler
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

        <Link to='/trends' className="nav-link" onClick={closeSideBar}>
          <BsGraphUp className='nav-icon' size={26} />
          <span className="nav-item-name">Trends</span>
        </Link>

        <Link to='/leaderboard' className="nav-link" onClick={closeSideBar}>
          <MdLeaderboard className='nav-icon' size={26} />
          <span className="nav-item-name">Leaderboard</span>
        </Link>

        <Link to='/activity' className="nav-link" onClick={closeSideBar}>
          <MdOndemandVideo className='nav-icon' size={26} />
          <span className="nav-item-name">Activity</span>
        </Link>

        <Link to='/game' className="nav-link" onClick={closeSideBar}>
          <IoGameController className='nav-icon' size={26} />
          <span className="nav-item-name">Game</span>
        </Link>
      </div>

      <div className="relative">
        <button onClick={toggleDropDown} className='unameButton'>
          {userInfo ? <span className='uname'>{userInfo.username}</span> : (<></>)}

          {userInfo && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`dropdown-arrow ${dropdownOpen ? "rotate" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={dropdownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
              />
            </svg>
          )}
        </button>

          {dropdownOpen && userInfo && (
            <ul className='dropdownList'>

              {userInfo.isAdmin && (
                <>
                  <li>
                    <Link to='/admin/userList' className="nav-list-item">
                      User List
                    </Link>
                  </li>
                </>
              )}
              <li>
                <Link to='/admin/profile' className="nav-list-item">
                  Profile
                </Link>
              </li>
              <li>
                  <button
                    onClick={logoutHandler}
                    className="nav-list-item listButton" 
                  >
                    Logout
                </button>
              </li>
            </ul>
          )}
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
