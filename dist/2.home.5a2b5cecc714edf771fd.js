webpackJsonp([2],{

/***/ 496:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _reactRedux = __webpack_require__(365);
	
	var _config = __webpack_require__(310);
	
	var _HomeView = __webpack_require__(497);
	
	var _HomeView2 = _interopRequireDefault(_HomeView);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/*  Object of action creators (can also be function that returns object).
	    Keys will be passed as props to presentational components. Here we are
	    implementing our wrapper around increment; the component doesn't care   */
	
	var mapDispatchToProps = {
	    init: _config.init,
	    set_apikey: _config.setApikey,
	    set_roomname: _config.setRoomname
	};
	
	/*  This is a container component. Notice it does not contain any JSX,
	    nor does it import React. This component is **only** responsible for
	    wiring in the actions and state necessary to render a presentational
	    component - in this case, the counter:   */
	
	var mapStateToProps = function mapStateToProps(state) {
	    return {
	        config: state.config
	    };
	};
	
	/*  Note: mapStateToProps is where you should use `reselect` to create selectors, ie:
	    import { createSelector } from 'reselect'
	    const counter = (state) => state.counter
	    const tripleCount = createSelector(counter, (count) => count * 3)
	    const mapStateToProps = (state) => ({
	      counter: tripleCount(state)
	    })
	    Selectors can compute derived data, allowing Redux to store the minimal possible state.
	    Selectors are efficient. A selector is not recomputed unless one of its arguments change.
	    Selectors are composable. They can be used as input to other selectors.
	    https://github.com/reactjs/reselect    */
	
	exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_HomeView2.default);

/***/ }),

/***/ 497:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.HomeView = undefined;
	
	var _react = __webpack_require__(24);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _propTypes = __webpack_require__(231);
	
	var _propTypes2 = _interopRequireDefault(_propTypes);
	
	__webpack_require__(498);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var HomeView = exports.HomeView = function HomeView(_ref) {
	  var config = _ref.config,
	      init = _ref.init,
	      set_roomname = _ref.set_roomname,
	      set_apikey = _ref.set_apikey;
	
	  var _setApikey = function _setApikey(ev) {
	    set_apikey(ev.target.value);
	  };
	  var _setRoomname = function _setRoomname(ev) {
	    set_roomname(ev.target.value);
	  };
	  return _react2.default.createElement(
	    'div',
	    null,
	    _react2.default.createElement(
	      'div',
	      { className: 'jumbotron' },
	      _react2.default.createElement(
	        'h1',
	        null,
	        'SiRu sample dashboard'
	      ),
	      _react2.default.createElement(
	        'p',
	        null,
	        'Click \'go dashboard\' after input your own',
	        _react2.default.createElement(
	          'strong',
	          null,
	          'SkyWay API key'
	        ),
	        ' and',
	        _react2.default.createElement(
	          'strong',
	          null,
	          'room name for SiRu'
	        ),
	        '.'
	      ),
	      _react2.default.createElement(
	        'p',
	        null,
	        _react2.default.createElement('small', null)
	      )
	    ),
	    _react2.default.createElement(
	      'div',
	      null,
	      _react2.default.createElement(
	        'form',
	        null,
	        _react2.default.createElement(
	          'div',
	          { className: 'form-group' },
	          _react2.default.createElement(
	            'label',
	            null,
	            'Your SkyWay API KEY'
	          ),
	          _react2.default.createElement('input', { type: 'text',
	            className: 'form-control',
	            value: config.apikey,
	            name: 'apikey',
	            onChange: _setApikey,
	            placeholder: '********-****-****-****-************' })
	        ),
	        _react2.default.createElement(
	          'div',
	          null,
	          _react2.default.createElement(
	            'label',
	            null,
	            'room name (default is \'testroom\')'
	          ),
	          _react2.default.createElement('input', { type: 'text',
	            className: 'form-control',
	            value: config.roomname,
	            name: 'roomname',
	            onChange: _setRoomname })
	        )
	      )
	    ),
	    _react2.default.createElement('p', { className: 'space-1' }),
	    _react2.default.createElement(
	      'p',
	      null,
	      _react2.default.createElement(
	        'a',
	        { className: 'btn btn-primary btn-lg', href: './devices' },
	        'start dashboard'
	      )
	    ),
	    _react2.default.createElement('p', { className: 'space-6' }),
	    _react2.default.createElement(
	      'div',
	      { className: 'well well-lg' },
	      'What\'s SiRu? SiRu stands for ',
	      _react2.default.createElement(
	        'strong',
	        null,
	        _react2.default.createElement(
	          'a',
	          { href: 'https://skyway.io', target: '_blank' },
	          'SkyWay'
	        ),
	        'IoT sdk Room Utility'
	      ),
	      '. By making use of SiRu, you can easily develop your own IoT apps with linux box, such as Raspberry PI.',
	      _react2.default.createElement('br', null),
	      'For more detail, please check our',
	      _react2.default.createElement(
	        'a',
	        { href: 'https://github.com/nttcom/skyway-iot-sdk', target: '_blank' },
	        'Project repository'
	      ),
	      '.'
	    )
	  );
	};
	
	HomeView.propTypes = {
	  config: _propTypes2.default.object.isRequired,
	  init: _propTypes2.default.func.isRequired,
	  set_roomname: _propTypes2.default.func.isRequired,
	  set_apikey: _propTypes2.default.func.isRequired
	};
	
	exports.default = HomeView;

/***/ }),

/***/ 498:
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(499);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(388)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(true) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept(499, function() {
				var newContent = __webpack_require__(499);
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),

/***/ 499:
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(387)();
	// imports
	
	
	// module
	exports.push([module.id, ".duck{display:block;width:120px;margin:1.5rem auto}.space-1{height:1em}.space-6{height:6em}", "", {"version":3,"sources":["/Users/komasshu/development/SiRu-sample/src/routes/Home/components/src/routes/Home/components/HomeView.scss"],"names":[],"mappings":"AAAA,MACE,cAAc,YACF,kBACO,CACpB,SAGC,UAAW,CACZ,SAEC,UAAW,CACZ","file":"HomeView.scss","sourcesContent":[".duck {\n  display: block;\n  width: 120px;\n  margin: 1.5rem auto;\n}\n\n.space-1 {\n  height: 1em;\n}\n.space-6 {\n  height: 6em;\n}"],"sourceRoot":""}]);
	
	// exports


/***/ })

});
//# sourceMappingURL=2.home.5a2b5cecc714edf771fd.js.map