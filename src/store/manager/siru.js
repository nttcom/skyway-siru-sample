import SiRuClient from 'SiRu-client'

import {
  connected,
  add_device,
  add_metric,
  stream_start
} from '../siru'

let client;

/**
 * @params {function} func
 * @params {object[]} topics
 */
function subscribe(topics) {
  topics.filter(topic => !!topic.name)
    .forEach(topic => {
      client.subscribe(topic.name)
    })
}

export default function start({dispatch}, {apikey, roomname}) {
  client = new SiRuClient(roomname, {key: apikey})
  let uuid

  client.on('connect', () => {
    dispatch(connected(apikey, roomname))
  })

  client.on('meta', meta => {
    if(!meta.uuid) return
    uuid = meta.uuid

    dispatch(add_device(meta))
    if(meta.topics instanceof Array) subscribe(meta.topics)

    if(meta.streaming && meta.streaming.enable) {
      client.requestStreaming(uuid)
    }
  })

  client.on('stream', (stream, uuid) => {
    dispatch(stream_start({uuid, stream}))
  })

  client.on('message', (topic, message) => {
    try {
      const metric = JSON.parse(message)
      dispatch(add_metric({uuid, topic, metric}))
    } catch(err) {
      console.warn(err)
    }
  })
}
