// ------------------------------------
// Constants
// ------------------------------------
export const CONNECTED = 'CONNECTED'
export const ADD_DEVICE = 'ADD_DEVICE'
export const ADD_METRIC = 'ADD_METRIC'
export const STREAM_START = 'STREAM_START'

// ------------------------------------
// Actions
// ------------------------------------
export function connected (apikey, roomname) {
  return {
    type    : CONNECTED,
    payload : {apikey, roomname}
  }
}

export function add_device (meta) {
  return {
    type    : ADD_DEVICE,
    payload : meta
  }
}

export function add_metric ({uuid, topic, metric}) {
  return {
    type    : ADD_METRIC,
    payload : {uuid, topic, metric}
  }
}

export function stream_start ({uuid, stream}) {
  return {
    type    : STREAM_START,
    payload : { uuid, stream }
  }
}

// ------------------------------------
// Specialized Action Creator
// ------------------------------------

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {devices: [], lastUpdated: 0}

export default function siruReducer (state = initialState, action) {
  const lastUpdated = Date.now()
  switch(action.type) {
  case CONNECTED:
    var {apikey, roomname} = action.payload
    return Object.assign({}, state, {apikey, roomname, lastUpdated})
  case ADD_DEVICE:
    if(!action.payload.uuid) return state

    // remove previous device, when exists
    var devices = state.devices.filter(device => device.uuid !== action.payload.uuid)
    devices.push(action.payload)

    return Object.assign({}, state, {devices, lastUpdated})
  case ADD_METRIC:
    var p = action.payload

    state.devices
      .filter(device => device.uuid === p.uuid)
      .forEach(device => {
        device.topics.filter(topic => topic.name === p.topic)
          .forEach(topic => {
            topic.properties.forEach(property => {
              property.last = p.metric[property.name]
              if(!property.data) property.data = [] // initilize if it is not exist
              property.data.push(p.metric[property.name]) // fixme - keep max size equal 60
              if(property.data.length > 60) property.data.shift()
            })
          })
      })
    return Object.assign({}, state, {lastUpdated})
  case STREAM_START:
    var p = action.payload
    state.devices
      .filter(device => device.uuid === p.uuid)
      .forEach(device => {
        device.stream     = p.stream
        device.stream_url = window.URL.createObjectURL(p.stream)
      })
    return Object.assign({}, state, {lastUpdated})
  default:
    return state
  }
}
