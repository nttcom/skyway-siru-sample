import React from 'react'
import { IndexLink, Link } from 'react-router'
import './Header.scss'

export const Header = () => (
    <nav className="navbar navbar-inverse navbar-fixed-top">
      <div className="container-fluid">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <a className="navbar-brand" href="#">SkyWay IoT SDK room utility sample</a>
        </div>
        <div id="navbar" className="navbar-collapse collapse">
          <ul className="nav navbar-nav navbar-right">
            <li><IndexLink to="/" activeClassName='route--active'>Home</IndexLink></li>
            <li><IndexLink to="/devices" activeClassName='route--active'>Devices</IndexLink></li>
            <li><IndexLink to="/" activeClassName='route--active'>Help</IndexLink></li>
          </ul>
        </div>
      </div>
    </nav>
)

export default Header
