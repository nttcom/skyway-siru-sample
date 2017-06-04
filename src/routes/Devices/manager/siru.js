import SiRuClient from 'SiRu-client'

import {
  connected,
  addDevice,
  addMetric,
  streamStart
} from '../modules/siru'

let client

/**
 * @params {function} func
 * @params {object[]} topics
 */
function subscribe (topics) {
  topics.filter(topic => !!topic.name)
    .forEach(topic => {
      client.subscribe(topic.name)
    })
}

export default function start ({ dispatch }, { apikey, roomname }) {
  const config = { 'iceServers': [
      { 'url': 'stun:stun.skyway.io:3478' },
    {
      'url': 'turn:52.41.145.197:443?transport=tcp',
      'credential': 's1rUu5ev',
      'username': 'siruuser'
    }
  ]
  }
  client = new SiRuClient(roomname, { key: apikey, config })
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

    if (meta.topics instanceof Array) subscribe(meta.topics)

    /* since fetching history data is not stabilized, we will comment them out at this moment... */
    // client.fetch(uuid+'/metrics/12', {})
    //   .then(res  => res.json())
    //   .then(json => {
    //     const histories = {}

    //     json.forEach(data => {
    //       // example data: {"name_cpu":{"1min":0, "5min": 1}, "temperature", "timestamp"}
    //       for(var key in data) if(data.hasOwnProperty(key)) {
    //         if(key !== "timestamp") {
    //           var topic = key.replace("_", "/")
    //           if(!histories[topic]) histories[topic] = []
    //           histories[topic].push(Object.assign({}, data[key], {timestamp: data.timestamp}))
    //         }
    //       }
    //     })
    //     console.log(histories)

    //     for(var topic in histories) dispatch(update_history({uuid, topic, history: histories[topic]}))
    //   })
    //   .catch(err => console.warn(err))
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
