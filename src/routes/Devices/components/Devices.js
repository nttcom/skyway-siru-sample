import React from 'react'
import { IndexLink } from 'react-router'
import PropTypes from 'prop-types'
import { LineChart } from 'react-d3-basic'
import SkyWayVideo from '../../../components/SkyWayVideo'



function renderMetrics(topics) {
  if(topics.length > 0) {
    return topics.map((topic, index) => {
      if(!topic.data || topic.data.length === 0) return (
        <div key={index}>no data</div>
      )
      const chartSeries = topic.properties.map(property => {
        return {
          field: property.name,
          name:  property.description
        }
      })
      
      const linechart_params = {
        showXGrid: true,
        showYGrid: true,
        margins: {left:50, right: 100, top:5, bottom:30},
        title: topic.title, 
        data: topic.data || [], 
        height: 300, 
        chartSeries, 
        x: function(d) { return d.timestamp },
        xScale: 'time',
        yTickFormat: d3.format(".2s"),
        xAxis: d3.svg.axis().orient('top')
      }

      return (
        <div key={index} className="col-xs-12 col-sm-12 placeholder">
          <h4>{topic.title}</h4>
          <LineChart {...linechart_params} />
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
        <div className="row placeholders">
          <h3>{device.name}</h3>
          <pre>
            description: {device.description}<br />
            uuid: {device.uuid}
          </pre>
        </div>
        <div className="row placeholders">
          <div className="col-xs-12 col-sm-12 placeholder">
          <SkyWayVideo streamurl={device.stream_url} />
          </div>
        </div>
        <div className="row placeholders">
          {metrics}
        </div>
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
    <div className="row">
      <div className="col-sm-3 col-md-2 sidebar">
        <ul className="nav nav-sidebar">
          <li><IndexLink href="#" activeClassName='route--active'>Overview</IndexLink></li>
          <li><IndexLink href="#cameras" activeClassName='route--active'>Cameras</IndexLink></li>
          <li><IndexLink href="#metrics" activeClassName='route--active'>Metrics</IndexLink></li>
        </ul>
      </div>
      <div className="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
        <h1 className="page-header">Dashboard</h1>
        {render_devices}
      </div>
    </div>
)}

Devices.propTypes = {
  devices     : PropTypes.array.isRequired,
  lastUpdated : PropTypes.number.isRequired
}

export default Devices
