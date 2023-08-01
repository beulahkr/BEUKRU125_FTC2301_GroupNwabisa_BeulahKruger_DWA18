import React, { useState } from 'react';
import './Navbar.css';
import logo from '../assets/LilyPod-logo.svg';
import search from '../assets/Search Icon.png';
import menu from '../assets/Menu Icon.png';
import { Link } from 'react-router-dom'; // Import Link component

const Navbar = (props) => {
  const [showMenu, setShowMenu] = useState(false);

  const handleToggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleMenuLinkClick = (link) => {
    // You can handle the click for each menu link here
    console.log(`Clicked on: ${link}`);
      if (link === 'Favorites') {
      // Replace '/favorites' with the actual path for the "Favorites" page
      props.history.push('/favorites');
    }
  };

  return (
    <nav className="navbar">
      <div className="search-container">
        <div className="search-icon">
          <span><img src={search} alt="Search" /></span>
        </div>
        <input
          type="text"
          value={props.searchQuery}
          onChange={props.handleSearch}
          placeholder="Search for a podcast..."
        />
      </div>

      <div className="logo-container">
        {/* Add Link component for logo */}
        <Link to="/">
          <img src={logo} alt="Logo" className="logo" />
        </Link>
      </div>

      <div className="menu-icon">
        <span onClick={handleToggleMenu}><img src={menu} alt="Menu" /></span>
        {showMenu && (
          <ul className="menu-dropdown">
            <li><Link to="/favorites">Favorites</Link></li>
            <li><Link to="/genres">Categories</Link></li>
            <li onClick={() => handleMenuLinkClick('History')}>History</li>
            <li onClick={() => handleMenuLinkClick('Settings')}>Settings</li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;


