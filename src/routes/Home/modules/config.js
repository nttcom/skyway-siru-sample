// ------------------------------------
// Constants
// ------------------------------------
export const CONFIG_INIT = 'CONFIG_INIT'
export const CONFIG_SET_APIKEY = 'CONFIG_SET_APIKEY'
export const CONFIG_SET_ROOMNAME = 'CONFIG_SET_ROOMNAME'

// ------------------------------------
// Actions
// ------------------------------------
export function init () {
  const apikey = localStorage.apikey || ''
  const roomname = localStorage.roomname || 'testroom'

  return {
    type    : CONFIG_INIT,
    payload : { apikey, roomname }
  }
}

export function setApikey (apikey) {
  localStorage.apikey = apikey

  return {
    type    : CONFIG_SET_APIKEY,
    payload : { apikey }
  }
}

export function setRoomname (roomname) {
  localStorage.roomname = roomname

  return {
    type    : CONFIG_SET_ROOMNAME,
    payload : { roomname }
  }
}

export const actions = {
  init,
  setApikey,
  setRoomname
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [CONFIG_INIT]          : (state, action) => action.payload,
  [CONFIG_SET_APIKEY]    : (state, action) => action.payload,
  [CONFIG_SET_ROOMNAME]  : (state, action) => action.payload
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = { apikey: '', roomname: '' }
export default function configReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? Object.assign({}, state, handler(state, action)) : state
}
