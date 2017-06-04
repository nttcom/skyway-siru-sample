import { injectReducer } from '../../store/reducers'
import { init } from './modules/config'

export default (store) => ({
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */

      const HomeView = require('./containers/HomeView').default
      const configReducer = require('./modules/config').default
      injectReducer(store, { key:'config', reducer: configReducer })

      store.dispatch(init())
      /*  Return getComponent   */
      cb(null, HomeView)

    /* Webpack named bundle   */
    }, 'home')
  }
})
