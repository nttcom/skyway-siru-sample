import React from 'react'
import PropTypes from 'prop-types'

export const SkyWayVideo = (props) => {
  if(props.streamurl) {
      return (
        <div style={{maxWidth: "720px", margin: "auto"}}>
          <video style={{width: "100%"}} src={props.streamurl} autoPlay></video>
        </div>
      )
  } else {
    return (
      <div>waiting for streaming... </div>
    )
  }
}


SkyWayVideo.propTypes = {
}

export default SkyWayVideo

