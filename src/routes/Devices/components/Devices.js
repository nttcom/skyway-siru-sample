/* global d3 */
/* eslit no-undef: "error" */

import React from 'react'
import PropTypes from 'prop-types'
import { LineChart } from 'react-d3-basic'
import SkyWayVideo from '../../../components/SkyWayVideo'

function renderMetrics (topics) {
  if (topics.length > 0) {
    return topics.map((topic, index) => {
      if (!topic.data || topic.data.length === 0) {
        return (
          <div key={index}>no data</div>
        )
      }
      const chartSeries = topic.properties.map(property => {
        return {
          field: property.name,
          name:  property.description
        }
      })

      const linechartParams = {
        showXGrid: true,
        showYGrid: true,
        margins: { left:50, right: 100, top:5, bottom:30 },
        title: topic.title,
        data: topic.data || [],
        width: 680,
        height: 200,
        chartSeries,
        x: function (d) { return d.timestamp },
        xScale: 'time',
        yTickFormat: d3.format('.2s'),
        xAxis: d3.svg.axis().orient('top')
      }

      return (
        <div key={index} className='col-xs-12 col-sm-12 placeholder'>
          <h4>{topic.title}</h4>
          <LineChart {...linechartParams} />
        </div>
      )
    })
  } else {
    return []
  }
}

// function renderHistories (topics) {
//   if (topics.length > 0) {
//     return topics.map((topic, index) => {
//       if (!topic.history || topic.history.length === 0) {
//         return (
//           <div key={index}>no data</div>
//         )
//       }
//       const chartSeries = topic.properties.map(property => {
//         return {
//           field: property.name,
//           name:  property.description
//         }
//       })
//
//       const linechartParams = {
//         showXGrid: true,
//         showYGrid: true,
//         margins: { left:50, right: 100, top:5, bottom:30 },
//         title: topic.title,
//         data: topic.history || [],
//         height: 300,
//         chartSeries,
//         x: function (d) { return d.timestamp },
//         xScale: 'time',
//         yTickFormat: d3.format('.2s'),
//         xAxis: d3.svg.axis().orient('top')
//       }
//
//       return (
//         <div key={index} className='col-xs-12 col-sm-12 placeholder'>
//           <h4>{topic.title}</h4>
//           <LineChart {...linechartParams} />
//         </div>
//       )
//     })
//   } else {
//     return []
//   }
// }

function renderDevices (devices) {
  if (devices.length > 0) {
    return devices.map((device, index) => {
      const metrics = renderMetrics(device.topics)
      // const histories = renderHistories(device.topics)
      return (
        <div key={index}>
          <div className='row placeholders'>
            <h3>{device.name}</h3>
            <pre>
            description: {device.description}<br />
            uuid: {device.uuid}
            </pre>
          </div>
          <div className='row placeholders'>
            <div className='col-xs-12 col-sm-6 col-md-6 col-lg-6 placeholder'>
              <SkyWayVideo streamurl={device.stream_url} />
            </div>
            <div className='col-xs-12 col-sm-6 col-md-6 col-lg-6 placeholder'>
              <h4>realtime monitor</h4>
              {metrics}
            </div>
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
  const _renderDevices = renderDevices(props.devices)
  return (
    <div className='row'>
      <div className='main'>
        <h1 className='page-header'>Dashboard <small>Room : {props.config.roomname}</small></h1>
        {_renderDevices}
        <div className='well'>lastUpdated: {props.lastUpdated}</div>
      </div>
    </div>
  )
}

Devices.propTypes = {
  devices     : PropTypes.array.isRequired,
  config      : PropTypes.object.isRequired,
  lastUpdated : PropTypes.number.isRequired
}

export default Devices
