import React from 'react'
import PropTypes from 'prop-types'
import SkyWayVideo from '../../../components/SkyWayVideo'

function renderProperties(properties) {
  if(properties.length > 0) {
    return properties.map((property, index) => {
      const len = property.data ? property.data.length : 0
      return (
        <div key={index}>
          <span>{property.name}</span>{' : '}<span>{property.last}</span>{' '}<span>({len})</span>
        </div>
      )
    })
  } else {
    return []
  }
}

function renderMetrics(topics) {
  if(topics.length > 0) {
    return topics.map((topic, index) => {
      const properties = renderProperties(topic.properties)
      return (
        <div key={index}>
          <h5>{topic.title}</h5>
          {properties}
        </div>
      )
    })
  } else {
    return []
  }
}

function renderDevices(devices) {
  if (devices.length > 0) {
    return devices.map( (device, index) => {
      const metrics = renderMetrics(device.topics)
      return (
      <div key={index}>
        <h3>{device.name}</h3>
        <pre>
          description: {device.description}<br />
          uuid: {device.uuid}
        </pre>
        {metrics}
        <SkyWayVideo streamurl={device.stream_url} />
      </div>
      )
    })
  } else {
    return (
      <div>waiting for devices...</div>
    )
  }
}

export const Devices = (props) => {
  const render_devices = renderDevices(props.devices)
  return (
  <div style={{ margin: '0 auto' }} >
    {render_devices}
  </div>
)}

Devices.propTypes = {
  devices     : PropTypes.array.isRequired,
  lastUpdated : PropTypes.number.isRequired
}

export default Devices
