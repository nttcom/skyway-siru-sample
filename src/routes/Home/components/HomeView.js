import React from 'react'
import PropTypes from 'prop-types'
import './HomeView.scss'
import { Link } from 'react-router'

export const HomeView = ({ config, init, set_roomname, set_apikey }) => {
  const _setApikey = function (ev) { set_apikey(ev.target.value) }
  const _setRoomname = function (ev) { set_roomname(ev.target.value) }
  return (
    <div>
      <div className='jumbotron'>
        <h1>SiRu sample dashboard</h1>
        <p>
        Click 'go dashboard' after input your
        own <strong>SkyWay API key</strong> and
        <strong> room name for SiRu</strong>.
        </p>
        <p>
          <small />
        </p>
      </div>
      <div>
        <form>
          <div className='form-group'>
            <label>Your SkyWay API KEY</label>
            <input type='text'
              className='form-control'
              value={config.apikey}
              name='apikey'
              onChange={_setApikey}
              placeholder='********-****-****-****-************' />
          </div>
          <div>
            <label>room name (default is 'testroom')</label>
            <input type='text'
              className='form-control'
              value={config.roomname}
              name='roomname'
              onChange={_setRoomname} />
          </div>
        </form>
      </div>
      <p className='space-1' />
      <p>
        <Link to='/devices'><button className='btn btn-primary btn-lg'>start dashboard</button></Link>
      </p>
      <p className='space-6' />
      <div className='well well-lg'>
        What's SiRu? SiRu stands for <strong><a href='https://skyway.io' target='_blank'>SkyWay</a>
        IoT sdk Room Utility</strong>. By making use of SiRu, you can easily develop your own IoT
        apps with linux box, such as Raspberry PI.<br />
        For more detail, please check our
        <a href='https://github.com/nttcom/skyway-iot-sdk' target='_blank'>
        Project repository</a>.
      </div>
    </div>
  )
}

HomeView.propTypes = {
  config       : PropTypes.object.isRequired,
  init         : PropTypes.func.isRequired,
  set_roomname : PropTypes.func.isRequired,
  set_apikey   : PropTypes.func.isRequired
}

export default HomeView
