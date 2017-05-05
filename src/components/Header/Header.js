import React from 'react'
import { IndexLink, Link } from 'react-router'
import './Header.scss'

export const Header = () => (
  <div>
    <h1>SkyWay IoT SDK room utility sample</h1>
    <IndexLink to='/' activeClassName='route--active'>
      Home
    </IndexLink>
    {' - '}
    <Link to='/devices' activeClassName='route--active'>
      Devices
    </Link>
  </div>
)

export default Header
