import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'devices',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */

      const SiRuManager = require('./manager/siru').default
    
      SiRuManager(store, {apikey:'db07bbb6-4ee8-4eb7-b0c2-b8b2e5c69ef9', roomname: 'testroom'})
      // const reducer = require('./modules/device').default
      const siruReducer = require('./modules/siru').default

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'siru', reducer: siruReducer })

      const Device = require('./containers/DevicesContainer').default

      /*  Return getComponent   */
      cb(null, Device)

    /* Webpack named bundle   */
    }, 'devices')
  }
})
