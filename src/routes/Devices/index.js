import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : process.env.PUBLIC_URL + 'devices',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */

      // get apikey and roomname from redux store
      const { apikey, roomname } = store.getState().config

      // inject reducer of siru into redux store
      const siruReducer = require('./modules/siru').default
      injectReducer(store, { key: 'siru', reducer: siruReducer })

      // start SiRuManager
      const SiRuManager = require('./manager/siru').default
      SiRuManager(store, { apikey, roomname })

      /*  Return getComponent   */
      const Device = require('./containers/DevicesContainer').default

      cb(null, Device)

    /* Webpack named bundle   */
    }, 'devices')
  }
})
