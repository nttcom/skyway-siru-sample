import SiRuClient from 'SiRu-client'

import {
  connected,
  addDevice,
  addMetric,
  streamStart
} from '../modules/siru'

/**
 * @params {function} func
 * @params {object[]} topics
 */
function subscribe (client, topics) {
  topics.filter(topic => !!topic.name)
    .forEach(topic => {
      client.subscribe(topic.name)
    })
}

function setHandler ({ client, dispatch, apikey, roomname }) {
  let uuid

  client.on('connect', () => {
    dispatch(connected(apikey, roomname))
  })

  client.on('meta', meta => {
    if (!meta.uuid) return
    uuid = meta.uuid

    dispatch(addDevice(meta))

    if (meta.streaming && meta.streaming.enable) {
      client.requestStreaming(uuid)
    }

    if (meta.topics instanceof Array) subscribe(client, meta.topics)
  })

  client.on('stream', (stream, uuid) => {
    dispatch(streamStart({ uuid, stream }))
  })

  client.on('message', (topic, message) => {
    try {
      const metric = JSON.parse(message)
      dispatch(addMetric({ uuid, topic, metric }))
    } catch (err) {
      console.warn(err)
    }
  })
}

function createIceServerSetting ({ username, password, uris }) {
  return new Promise((resolve, reject) => {
    resolve(uris.map(url => ({
      url,
      credential: password,
      username
    })))
  })
}

export default function start ({ dispatch }, { apikey, roomname }) {
  fetch('https://iot-turn.skyway.io/api/?api=demonstrationkey')
    .then(res => res.json())
    .then(json => createIceServerSetting(json))
    .then(iceServers => {
      const key = apikey
      const config = { 'iceServers' : iceServers }
      console.log(config)
      const client = new SiRuClient(roomname, { key, config })

      setHandler({ client, dispatch, apikey, roomname })
    })
    .catch(err => console.warn(err))
}

