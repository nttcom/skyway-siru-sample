import React from 'react'
import PropTypes from 'prop-types'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import './CoreLayout.scss'
import '../../styles/core.scss'

export const CoreLayout = ({ children }) => (
  <div className='siru-container'>
    <Header />
    <div className='container-fluid'>
      {children}
    </div>
    <Footer />
  </div>
)

CoreLayout.propTypes = {
  children : PropTypes.element.isRequired
}

export default CoreLayout
