import React, { Component } from 'react';
import logo from '../images/logo.svg';
import { AiOutlineMenu } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import linkData from './linkData';

export default class Navbar extends Component {
  constructor (props) {
    super(props);
    this.state = {
      isOpen: false
    };
  }

  handleToggle () {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render () {
    return (
      <nav className="navbar">
        <div className="nav-center">
          <div className="nav-header">
            <Link to="/">
              <img src={logo} alt="Beach Resort" />
            </Link>
            <button type="button" className="nav-btn" onClick={this.handleToggle.bind(this)}>
              <AiOutlineMenu className="nav-icon" />
            </button>
          </div>
          <ul className={this.state.isOpen ? 'nav-links show-nav' : 'nav-links'}>
            {linkData.map((item, idx) => (
              <li key={idx}>
                <Link to={item.url}>{item.caption}</Link>
              </li>)
            )}
          </ul>
        </div>
      </nav>
    );
  }
}
