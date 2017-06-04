import React from 'react'
import './Footer.scss'
import comlogo from './assets/NTT_Communications_logo.svg'

export const Footer = () => {
  return (
    <div className='footer'>
      <img src={comlogo} alt='NTT Communications' height='42px' />
      {' '}
    &nbsp;&nbsp;&nbsp;
    &copy; NTT Communications Corporation All Rights Reserved.
  </div>
  )
}

export default Footer
