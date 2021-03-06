import React from 'react'
import { IndexLink } from 'react-router'
import './Header.scss'
import skywaylogo from './assets/skywaylogo.png'

export const Header = () => (
  <nav className='navbar navbar-inverse navbar-fixed-top'>
    <div className='container-fluid siru-container'>
      <div className='navbar-header'>
        <button type='button' className='navbar-toggle collapsed'
          data-toggle='collapse' data-target='#navbar' aria-expanded='false' aria-controls='navbar'>
          <span className='sr-only'>Toggle navigation</span>
          <span className='icon-bar' />
          <span className='icon-bar' />
          <span className='icon-bar' />
        </button>
        <a className='navbar-brand' href='./'><img style={{ display: 'inline' }}
          src={skywaylogo} alt='SkyWay' height='38px' />
          IoT SDK room utility sample
        </a>
      </div>
      <div id='navbar' className='navbar-collapse collapse'>
        <ul className='nav navbar-nav navbar-right'>
          <li><IndexLink to='/' activeClassName='route--active'>Home</IndexLink></li>
          <li><IndexLink to='/devices' activeClassName='route--active'>Devices</IndexLink></li>
        </ul>
      </div>
    </div>
  </nav>
)

export default Header
