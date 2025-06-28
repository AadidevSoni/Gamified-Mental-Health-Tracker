import React, { useState } from 'react';
import { AiOutlineHome} from 'react-icons/ai';
import { RiMentalHealthFill } from "react-icons/ri";
import { FaCalendarAlt } from "react-icons/fa";
import { GiBrain } from "react-icons/gi";
import { Link } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSideBar = () => {
    setShowSidebar(!showSidebar);
  };

  const closeSideBar = () => {
    setShowSidebar(false);
  };

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
    </div>
  );
};

export default Navigation;
