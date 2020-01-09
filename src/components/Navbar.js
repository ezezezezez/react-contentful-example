import React, { useState } from 'react';
import logo from '../images/logo.svg';
import { AiOutlineMenu } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import linkData from './linkData';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="nav-center">
        <div className="nav-header">
          <Link to="/">
            <img src={logo} alt="Beach Resort" />
          </Link>
          <button type="button" className="nav-btn" onClick={handleToggle}>
            <AiOutlineMenu className="nav-icon" />
          </button>
        </div>
        <ul className={isOpen ? 'nav-links show-nav' : 'nav-links'}>
          {linkData.map((item, idx) => (
            <li key={idx}>
              <Link to={item.url}>{item.caption}</Link>
            </li>)
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
