System.registerDynamic('npm:react-dom@0.14.7/index.js', ['npm:react@0.14.7/lib/ReactDOM.js'], true, function ($__require, exports, module) {
  /* */
  'use strict';

  var global = this || self,
      GLOBAL = global;
  module.exports = $__require('npm:react@0.14.7/lib/ReactDOM.js');
});
System.registerDynamic("npm:react-dom@0.14.7.js", ["npm:react-dom@0.14.7/index.js"], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  module.exports = $__require("npm:react-dom@0.14.7/index.js");
});
System.register("src/reducers/shapeReducers.js", [], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    var addShape, changeShape;
    return {
        setters: [],
        execute: function () {
            exports_1("addShape", addShape = function (state, action) {
                var id = state.nextShapeId;
                var shape = Object.assign({}, { id: id }, action);
                delete shape['type'];
                return Object.assign({}, state, { nextShapeId: id + 1, shapes: state.shapes.concat([shape]) });
            });
            exports_1("changeShape", changeShape = function (state, action) {
                var shape = Object.assign({}, state.shapes.filter(function (x) {
                    return x.id === action.id;
                })[0], { top: action.top, left: action.left });
                return Object.assign({}, state, { shapes: state.shapes.filter(function (x) {
                        return x.id !== action.id;
                    }).concat([shape]) });
            });
        }
    };
});

System.register("src/reducers.js", ["src/reducers/shapeReducers.js"], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    var shapeReducers_1, changeCounter, changeColor;
    return {
        setters: [function (shapeReducers_1_1) {
            shapeReducers_1 = shapeReducers_1_1;
        }],
        execute: function () {
            changeCounter = function (state, action) {
                return Object.assign({}, state, (_a = {}, _a[action.field] = state[action.field] + action.by, _a));
                var _a;
            };
            changeColor = function (state, action) {
                return Object.assign({}, state, { color: action.color });
            };
            exports_1("default", {
                COUNTER_CHANGE: changeCounter,
                COLOR_CHANGE: changeColor,
                SHAPE_ADD: shapeReducers_1.addShape,
                SHAPE_CHANGE: shapeReducers_1.changeShape,
                LOAD: function (state, action) {
                    return action.state;
                }
            });
        }
    };
});

/// <reference path='../typings/browser.d.ts'/>
System.register("src/ColorPicker.js", ["npm:react@0.14.7.js"], function (exports_1, context_1) {
    "use strict";

    var __extends = this && this.__extends || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var __moduleName = context_1 && context_1.id;
    var React, NumberPicker, ColorPicker, componentToHex, rgbToHex, hexToRgb, luminance, isDark;
    return {
        setters: [function (React_1) {
            React = React_1;
        }],
        execute: function () {
            /// <reference path='../typings/browser.d.ts'/>
            NumberPicker = function (_super) {
                __extends(NumberPicker, _super);
                function NumberPicker() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.handleChange = function (event) {
                        var e = event.target;
                        _this.props.onChange(parseInt(e.value));
                    };
                    return _this;
                }
                NumberPicker.prototype.render = function () {
                    return React.createElement("p", null, React.createElement("input", { type: "range", value: this.props.value.toString(), min: "0", max: "255", onChange: this.handleChange }), React.createElement("label", null, " ", this.props.name, ": "), React.createElement("b", null, this.props.value));
                };
                return NumberPicker;
            }(React.Component);
            exports_1("NumberPicker", NumberPicker);
            ColorPicker = function (_super) {
                __extends(ColorPicker, _super);
                function ColorPicker() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.updateRed = function (n) {
                        var rgb = hexToRgb(_this.props.color);
                        _this.changeColor(rgbToHex(n, rgb.g, rgb.b));
                    };
                    _this.updateGreen = function (n) {
                        var rgb = hexToRgb(_this.props.color);
                        _this.changeColor(rgbToHex(rgb.r, n, rgb.b));
                    };
                    _this.updateBlue = function (n) {
                        var rgb = hexToRgb(_this.props.color);
                        _this.changeColor(rgbToHex(rgb.r, rgb.g, n));
                    };
                    return _this;
                }
                ColorPicker.prototype.render = function () {
                    var color = this.props.color;
                    var rgb = hexToRgb(color);
                    var textColor = isDark(color) ? '#fff' : '#000';
                    return React.createElement("div", null, React.createElement(NumberPicker, { name: "Red", value: rgb.r, onChange: this.updateRed }), React.createElement(NumberPicker, { name: "Green", value: rgb.g, onChange: this.updateGreen }), React.createElement(NumberPicker, { name: "Blue", value: rgb.b, onChange: this.updateBlue }), React.createElement("div", { style: {
                            background: color, width: "100%", height: 40, lineHeight: "40px",
                            textAlign: "center", color: textColor
                        } }, color));
                };
                ColorPicker.prototype.changeColor = function (color) {
                    this.props.onChange(color);
                };
                return ColorPicker;
            }(React.Component);
            exports_1("ColorPicker", ColorPicker);
            componentToHex = function (c) {
                var hex = c.toString(16);
                return hex.length == 1 ? "0" + hex : hex;
            };
            rgbToHex = function (r, g, b) {
                return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
            };
            hexToRgb = function (hex) {
                var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
                return result ? {
                    r: parseInt(result[1], 16),
                    g: parseInt(result[2], 16),
                    b: parseInt(result[3], 16)
                } : null;
            };
            luminance = function (color) {
                var rgb = hexToRgb(color);
                return 0.2126 * rgb.r + 0.7152 * rgb.g + 0.0722 * rgb.b;
            };
            exports_1("isDark", isDark = function (color) {
                return luminance(color) < 100;
            });
        }
    };
});

System.registerDynamic('npm:react-redux@4.4.0/lib/components/Provider.js', ['npm:react@0.14.7.js', 'npm:react-redux@4.4.0/lib/utils/storeShape.js', 'github:jspm/nodelibs-process@0.1.2.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  (function (process) {
    'use strict';

    exports.__esModule = true;
    exports["default"] = undefined;
    var _react = $__require('npm:react@0.14.7.js');
    var _storeShape = $__require('npm:react-redux@4.4.0/lib/utils/storeShape.js');
    var _storeShape2 = _interopRequireDefault(_storeShape);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _possibleConstructorReturn(self, call) {
      if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }
    function _inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: {
          value: subClass,
          enumerable: false,
          writable: true,
          configurable: true
        } });
      if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }
    var didWarnAboutReceivingStore = false;
    function warnAboutReceivingStore() {
      if (didWarnAboutReceivingStore) {
        return;
      }
      didWarnAboutReceivingStore = true;
      if (typeof console !== 'undefined' && typeof console.error === 'function') {
        console.error('<Provider> does not support changing `store` on the fly. ' + 'It is most likely that you see this error because you updated to ' + 'Redux 2.x and React Redux 2.x which no longer hot reload reducers ' + 'automatically. See https://github.com/rackt/react-redux/releases/' + 'tag/v2.0.0 for the migration instructions.');
      }
    }
    var Provider = function (_Component) {
      _inherits(Provider, _Component);
      Provider.prototype.getChildContext = function getChildContext() {
        return { store: this.store };
      };
      function Provider(props, context) {
        _classCallCheck(this, Provider);
        var _this = _possibleConstructorReturn(this, _Component.call(this, props, context));
        _this.store = props.store;
        return _this;
      }
      Provider.prototype.render = function render() {
        var children = this.props.children;
        return _react.Children.only(children);
      };
      return Provider;
    }(_react.Component);
    exports["default"] = Provider;
    if ('production' !== 'production') {
      Provider.prototype.componentWillReceiveProps = function (nextProps) {
        var store = this.store;
        var nextStore = nextProps.store;
        if (store !== nextStore) {
          warnAboutReceivingStore();
        }
      };
    }
    Provider.propTypes = {
      store: _storeShape2["default"].isRequired,
      children: _react.PropTypes.element.isRequired
    };
    Provider.childContextTypes = { store: _storeShape2["default"].isRequired };
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
});
System.registerDynamic('npm:react@0.14.7/lib/renderSubtreeIntoContainer.js', ['npm:react@0.14.7/lib/ReactMount.js'], true, function ($__require, exports, module) {
  /* */
  'use strict';

  var global = this || self,
      GLOBAL = global;
  var ReactMount = $__require('npm:react@0.14.7/lib/ReactMount.js');
  module.exports = ReactMount.renderSubtreeIntoContainer;
});
System.registerDynamic('npm:react@0.14.7/lib/ReactDOM.js', ['npm:react@0.14.7/lib/ReactCurrentOwner.js', 'npm:react@0.14.7/lib/ReactDOMTextComponent.js', 'npm:react@0.14.7/lib/ReactDefaultInjection.js', 'npm:react@0.14.7/lib/ReactInstanceHandles.js', 'npm:react@0.14.7/lib/ReactMount.js', 'npm:react@0.14.7/lib/ReactPerf.js', 'npm:react@0.14.7/lib/ReactReconciler.js', 'npm:react@0.14.7/lib/ReactUpdates.js', 'npm:react@0.14.7/lib/ReactVersion.js', 'npm:react@0.14.7/lib/findDOMNode.js', 'npm:react@0.14.7/lib/renderSubtreeIntoContainer.js', 'npm:fbjs@0.6.1/lib/warning.js', 'npm:fbjs@0.6.1/lib/ExecutionEnvironment.js', 'github:jspm/nodelibs-process@0.1.2.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  (function (process) {
    'use strict';

    var ReactCurrentOwner = $__require('npm:react@0.14.7/lib/ReactCurrentOwner.js');
    var ReactDOMTextComponent = $__require('npm:react@0.14.7/lib/ReactDOMTextComponent.js');
    var ReactDefaultInjection = $__require('npm:react@0.14.7/lib/ReactDefaultInjection.js');
    var ReactInstanceHandles = $__require('npm:react@0.14.7/lib/ReactInstanceHandles.js');
    var ReactMount = $__require('npm:react@0.14.7/lib/ReactMount.js');
    var ReactPerf = $__require('npm:react@0.14.7/lib/ReactPerf.js');
    var ReactReconciler = $__require('npm:react@0.14.7/lib/ReactReconciler.js');
    var ReactUpdates = $__require('npm:react@0.14.7/lib/ReactUpdates.js');
    var ReactVersion = $__require('npm:react@0.14.7/lib/ReactVersion.js');
    var findDOMNode = $__require('npm:react@0.14.7/lib/findDOMNode.js');
    var renderSubtreeIntoContainer = $__require('npm:react@0.14.7/lib/renderSubtreeIntoContainer.js');
    var warning = $__require('npm:fbjs@0.6.1/lib/warning.js');
    ReactDefaultInjection.inject();
    var render = ReactPerf.measure('React', 'render', ReactMount.render);
    var React = {
      findDOMNode: findDOMNode,
      render: render,
      unmountComponentAtNode: ReactMount.unmountComponentAtNode,
      version: ReactVersion,
      unstable_batchedUpdates: ReactUpdates.batchedUpdates,
      unstable_renderSubtreeIntoContainer: renderSubtreeIntoContainer
    };
    if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== 'undefined' && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.inject === 'function') {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.inject({
        CurrentOwner: ReactCurrentOwner,
        InstanceHandles: ReactInstanceHandles,
        Mount: ReactMount,
        Reconciler: ReactReconciler,
        TextComponent: ReactDOMTextComponent
      });
    }
    if ('production' !== 'production') {
      var ExecutionEnvironment = $__require('npm:fbjs@0.6.1/lib/ExecutionEnvironment.js');
      if (ExecutionEnvironment.canUseDOM && window.top === window.self) {
        if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === 'undefined') {
          if (navigator.userAgent.indexOf('Chrome') > -1 && navigator.userAgent.indexOf('Edge') === -1 || navigator.userAgent.indexOf('Firefox') > -1) {
            console.debug('Download the React DevTools for a better development experience: ' + 'https://fb.me/react-devtools');
          }
        }
        var ieCompatibilityMode = document.documentMode && document.documentMode < 8;
        'production' !== 'production' ? warning(!ieCompatibilityMode, 'Internet Explorer is running in compatibility mode; please add the ' + 'following tag to your HTML to prevent this from happening: ' + '<meta http-equiv="X-UA-Compatible" content="IE=edge" />') : undefined;
        var expectedFeatures = [Array.isArray, Array.prototype.every, Array.prototype.forEach, Array.prototype.indexOf, Array.prototype.map, Date.now, Function.prototype.bind, Object.keys, String.prototype.split, String.prototype.trim, Object.create, Object.freeze];
        for (var i = 0; i < expectedFeatures.length; i++) {
          if (!expectedFeatures[i]) {
            console.error('One or more ES5 shim/shams expected by React are not available: ' + 'https://fb.me/react-warning-polyfills');
            break;
          }
        }
      }
    }
    module.exports = React;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
});
System.registerDynamic('npm:react@0.14.7/lib/FallbackCompositionState.js', ['npm:react@0.14.7/lib/PooledClass.js', 'npm:react@0.14.7/lib/Object.assign.js', 'npm:react@0.14.7/lib/getTextContentAccessor.js'], true, function ($__require, exports, module) {
  /* */
  'use strict';

  var global = this || self,
      GLOBAL = global;
  var PooledClass = $__require('npm:react@0.14.7/lib/PooledClass.js');
  var assign = $__require('npm:react@0.14.7/lib/Object.assign.js');
  var getTextContentAccessor = $__require('npm:react@0.14.7/lib/getTextContentAccessor.js');
  function FallbackCompositionState(root) {
    this._root = root;
    this._startText = this.getText();
    this._fallbackText = null;
  }
  assign(FallbackCompositionState.prototype, {
    destructor: function () {
      this._root = null;
      this._startText = null;
      this._fallbackText = null;
    },
    getText: function () {
      if ('value' in this._root) {
        return this._root.value;
      }
      return this._root[getTextContentAccessor()];
    },
    getData: function () {
      if (this._fallbackText) {
        return this._fallbackText;
      }
      var start;
      var startValue = this._startText;
      var startLength = startValue.length;
      var end;
      var endValue = this.getText();
      var endLength = endValue.length;
      for (start = 0; start < startLength; start++) {
        if (startValue[start] !== endValue[start]) {
          break;
        }
      }
      var minEnd = startLength - start;
      for (end = 1; end <= minEnd; end++) {
        if (startValue[startLength - end] !== endValue[endLength - end]) {
          break;
        }
      }
      var sliceTail = end > 1 ? 1 - end : undefined;
      this._fallbackText = endValue.slice(start, sliceTail);
      return this._fallbackText;
    }
  });
  PooledClass.addPoolingTo(FallbackCompositionState);
  module.exports = FallbackCompositionState;
});
System.registerDynamic('npm:react@0.14.7/lib/SyntheticCompositionEvent.js', ['npm:react@0.14.7/lib/SyntheticEvent.js'], true, function ($__require, exports, module) {
  /* */
  'use strict';

  var global = this || self,
      GLOBAL = global;
  var SyntheticEvent = $__require('npm:react@0.14.7/lib/SyntheticEvent.js');
  var CompositionEventInterface = { data: null };
  function SyntheticCompositionEvent(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
    SyntheticEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
  }
  SyntheticEvent.augmentClass(SyntheticCompositionEvent, CompositionEventInterface);
  module.exports = SyntheticCompositionEvent;
});
System.registerDynamic('npm:react@0.14.7/lib/SyntheticInputEvent.js', ['npm:react@0.14.7/lib/SyntheticEvent.js'], true, function ($__require, exports, module) {
  /* */
  'use strict';

  var global = this || self,
      GLOBAL = global;
  var SyntheticEvent = $__require('npm:react@0.14.7/lib/SyntheticEvent.js');
  var InputEventInterface = { data: null };
  function SyntheticInputEvent(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
    SyntheticEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
  }
  SyntheticEvent.augmentClass(SyntheticInputEvent, InputEventInterface);
  module.exports = SyntheticInputEvent;
});
System.registerDynamic('npm:react@0.14.7/lib/BeforeInputEventPlugin.js', ['npm:react@0.14.7/lib/EventConstants.js', 'npm:react@0.14.7/lib/EventPropagators.js', 'npm:fbjs@0.6.1/lib/ExecutionEnvironment.js', 'npm:react@0.14.7/lib/FallbackCompositionState.js', 'npm:react@0.14.7/lib/SyntheticCompositionEvent.js', 'npm:react@0.14.7/lib/SyntheticInputEvent.js', 'npm:fbjs@0.6.1/lib/keyOf.js'], true, function ($__require, exports, module) {
  /* */
  'use strict';

  var global = this || self,
      GLOBAL = global;
  var EventConstants = $__require('npm:react@0.14.7/lib/EventConstants.js');
  var EventPropagators = $__require('npm:react@0.14.7/lib/EventPropagators.js');
  var ExecutionEnvironment = $__require('npm:fbjs@0.6.1/lib/ExecutionEnvironment.js');
  var FallbackCompositionState = $__require('npm:react@0.14.7/lib/FallbackCompositionState.js');
  var SyntheticCompositionEvent = $__require('npm:react@0.14.7/lib/SyntheticCompositionEvent.js');
  var SyntheticInputEvent = $__require('npm:react@0.14.7/lib/SyntheticInputEvent.js');
  var keyOf = $__require('npm:fbjs@0.6.1/lib/keyOf.js');
  var END_KEYCODES = [9, 13, 27, 32];
  var START_KEYCODE = 229;
  var canUseCompositionEvent = ExecutionEnvironment.canUseDOM && 'CompositionEvent' in window;
  var documentMode = null;
  if (ExecutionEnvironment.canUseDOM && 'documentMode' in document) {
    documentMode = document.documentMode;
  }
  var canUseTextInputEvent = ExecutionEnvironment.canUseDOM && 'TextEvent' in window && !documentMode && !isPresto();
  var useFallbackCompositionData = ExecutionEnvironment.canUseDOM && (!canUseCompositionEvent || documentMode && documentMode > 8 && documentMode <= 11);
  function isPresto() {
    var opera = window.opera;
    return typeof opera === 'object' && typeof opera.version === 'function' && parseInt(opera.version(), 10) <= 12;
  }
  var SPACEBAR_CODE = 32;
  var SPACEBAR_CHAR = String.fromCharCode(SPACEBAR_CODE);
  var topLevelTypes = EventConstants.topLevelTypes;
  var eventTypes = {
    beforeInput: {
      phasedRegistrationNames: {
        bubbled: keyOf({ onBeforeInput: null }),
        captured: keyOf({ onBeforeInputCapture: null })
      },
      dependencies: [topLevelTypes.topCompositionEnd, topLevelTypes.topKeyPress, topLevelTypes.topTextInput, topLevelTypes.topPaste]
    },
    compositionEnd: {
      phasedRegistrationNames: {
        bubbled: keyOf({ onCompositionEnd: null }),
        captured: keyOf({ onCompositionEndCapture: null })
      },
      dependencies: [topLevelTypes.topBlur, topLevelTypes.topCompositionEnd, topLevelTypes.topKeyDown, topLevelTypes.topKeyPress, topLevelTypes.topKeyUp, topLevelTypes.topMouseDown]
    },
    compositionStart: {
      phasedRegistrationNames: {
        bubbled: keyOf({ onCompositionStart: null }),
        captured: keyOf({ onCompositionStartCapture: null })
      },
      dependencies: [topLevelTypes.topBlur, topLevelTypes.topCompositionStart, topLevelTypes.topKeyDown, topLevelTypes.topKeyPress, topLevelTypes.topKeyUp, topLevelTypes.topMouseDown]
    },
    compositionUpdate: {
      phasedRegistrationNames: {
        bubbled: keyOf({ onCompositionUpdate: null }),
        captured: keyOf({ onCompositionUpdateCapture: null })
      },
      dependencies: [topLevelTypes.topBlur, topLevelTypes.topCompositionUpdate, topLevelTypes.topKeyDown, topLevelTypes.topKeyPress, topLevelTypes.topKeyUp, topLevelTypes.topMouseDown]
    }
  };
  var hasSpaceKeypress = false;
  function isKeypressCommand(nativeEvent) {
    return (nativeEvent.ctrlKey || nativeEvent.altKey || nativeEvent.metaKey) && !(nativeEvent.ctrlKey && nativeEvent.altKey);
  }
  function getCompositionEventType(topLevelType) {
    switch (topLevelType) {
      case topLevelTypes.topCompositionStart:
        return eventTypes.compositionStart;
      case topLevelTypes.topCompositionEnd:
        return eventTypes.compositionEnd;
      case topLevelTypes.topCompositionUpdate:
        return eventTypes.compositionUpdate;
    }
  }
  function isFallbackCompositionStart(topLevelType, nativeEvent) {
    return topLevelType === topLevelTypes.topKeyDown && nativeEvent.keyCode === START_KEYCODE;
  }
  function isFallbackCompositionEnd(topLevelType, nativeEvent) {
    switch (topLevelType) {
      case topLevelTypes.topKeyUp:
        return END_KEYCODES.indexOf(nativeEvent.keyCode) !== -1;
      case topLevelTypes.topKeyDown:
        return nativeEvent.keyCode !== START_KEYCODE;
      case topLevelTypes.topKeyPress:
      case topLevelTypes.topMouseDown:
      case topLevelTypes.topBlur:
        return true;
      default:
        return false;
    }
  }
  function getDataFromCustomEvent(nativeEvent) {
    var detail = nativeEvent.detail;
    if (typeof detail === 'object' && 'data' in detail) {
      return detail.data;
    }
    return null;
  }
  var currentComposition = null;
  function extractCompositionEvent(topLevelType, topLevelTarget, topLevelTargetID, nativeEvent, nativeEventTarget) {
    var eventType;
    var fallbackData;
    if (canUseCompositionEvent) {
      eventType = getCompositionEventType(topLevelType);
    } else if (!currentComposition) {
      if (isFallbackCompositionStart(topLevelType, nativeEvent)) {
        eventType = eventTypes.compositionStart;
      }
    } else if (isFallbackCompositionEnd(topLevelType, nativeEvent)) {
      eventType = eventTypes.compositionEnd;
    }
    if (!eventType) {
      return null;
    }
    if (useFallbackCompositionData) {
      if (!currentComposition && eventType === eventTypes.compositionStart) {
        currentComposition = FallbackCompositionState.getPooled(topLevelTarget);
      } else if (eventType === eventTypes.compositionEnd) {
        if (currentComposition) {
          fallbackData = currentComposition.getData();
        }
      }
    }
    var event = SyntheticCompositionEvent.getPooled(eventType, topLevelTargetID, nativeEvent, nativeEventTarget);
    if (fallbackData) {
      event.data = fallbackData;
    } else {
      var customData = getDataFromCustomEvent(nativeEvent);
      if (customData !== null) {
        event.data = customData;
      }
    }
    EventPropagators.accumulateTwoPhaseDispatches(event);
    return event;
  }
  function getNativeBeforeInputChars(topLevelType, nativeEvent) {
    switch (topLevelType) {
      case topLevelTypes.topCompositionEnd:
        return getDataFromCustomEvent(nativeEvent);
      case topLevelTypes.topKeyPress:
        var which = nativeEvent.which;
        if (which !== SPACEBAR_CODE) {
          return null;
        }
        hasSpaceKeypress = true;
        return SPACEBAR_CHAR;
      case topLevelTypes.topTextInput:
        var chars = nativeEvent.data;
        if (chars === SPACEBAR_CHAR && hasSpaceKeypress) {
          return null;
        }
        return chars;
      default:
        return null;
    }
  }
  function getFallbackBeforeInputChars(topLevelType, nativeEvent) {
    if (currentComposition) {
      if (topLevelType === topLevelTypes.topCompositionEnd || isFallbackCompositionEnd(topLevelType, nativeEvent)) {
        var chars = currentComposition.getData();
        FallbackCompositionState.release(currentComposition);
        currentComposition = null;
        return chars;
      }
      return null;
    }
    switch (topLevelType) {
      case topLevelTypes.topPaste:
        return null;
      case topLevelTypes.topKeyPress:
        if (nativeEvent.which && !isKeypressCommand(nativeEvent)) {
          return String.fromCharCode(nativeEvent.which);
        }
        return null;
      case topLevelTypes.topCompositionEnd:
        return useFallbackCompositionData ? null : nativeEvent.data;
      default:
        return null;
    }
  }
  function extractBeforeInputEvent(topLevelType, topLevelTarget, topLevelTargetID, nativeEvent, nativeEventTarget) {
    var chars;
    if (canUseTextInputEvent) {
      chars = getNativeBeforeInputChars(topLevelType, nativeEvent);
    } else {
      chars = getFallbackBeforeInputChars(topLevelType, nativeEvent);
    }
    if (!chars) {
      return null;
    }
    var event = SyntheticInputEvent.getPooled(eventTypes.beforeInput, topLevelTargetID, nativeEvent, nativeEventTarget);
    event.data = chars;
    EventPropagators.accumulateTwoPhaseDispatches(event);
    return event;
  }
  var BeforeInputEventPlugin = {
    eventTypes: eventTypes,
    extractEvents: function (topLevelType, topLevelTarget, topLevelTargetID, nativeEvent, nativeEventTarget) {
      return [extractCompositionEvent(topLevelType, topLevelTarget, topLevelTargetID, nativeEvent, nativeEventTarget), extractBeforeInputEvent(topLevelType, topLevelTarget, topLevelTargetID, nativeEvent, nativeEventTarget)];
    }
  };
  module.exports = BeforeInputEventPlugin;
});
System.registerDynamic('npm:react@0.14.7/lib/ChangeEventPlugin.js', ['npm:react@0.14.7/lib/EventConstants.js', 'npm:react@0.14.7/lib/EventPluginHub.js', 'npm:react@0.14.7/lib/EventPropagators.js', 'npm:fbjs@0.6.1/lib/ExecutionEnvironment.js', 'npm:react@0.14.7/lib/ReactUpdates.js', 'npm:react@0.14.7/lib/SyntheticEvent.js', 'npm:react@0.14.7/lib/getEventTarget.js', 'npm:react@0.14.7/lib/isEventSupported.js', 'npm:react@0.14.7/lib/isTextInputElement.js', 'npm:fbjs@0.6.1/lib/keyOf.js', 'github:jspm/nodelibs-process@0.1.2.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  (function (process) {
    'use strict';

    var EventConstants = $__require('npm:react@0.14.7/lib/EventConstants.js');
    var EventPluginHub = $__require('npm:react@0.14.7/lib/EventPluginHub.js');
    var EventPropagators = $__require('npm:react@0.14.7/lib/EventPropagators.js');
    var ExecutionEnvironment = $__require('npm:fbjs@0.6.1/lib/ExecutionEnvironment.js');
    var ReactUpdates = $__require('npm:react@0.14.7/lib/ReactUpdates.js');
    var SyntheticEvent = $__require('npm:react@0.14.7/lib/SyntheticEvent.js');
    var getEventTarget = $__require('npm:react@0.14.7/lib/getEventTarget.js');
    var isEventSupported = $__require('npm:react@0.14.7/lib/isEventSupported.js');
    var isTextInputElement = $__require('npm:react@0.14.7/lib/isTextInputElement.js');
    var keyOf = $__require('npm:fbjs@0.6.1/lib/keyOf.js');
    var topLevelTypes = EventConstants.topLevelTypes;
    var eventTypes = { change: {
        phasedRegistrationNames: {
          bubbled: keyOf({ onChange: null }),
          captured: keyOf({ onChangeCapture: null })
        },
        dependencies: [topLevelTypes.topBlur, topLevelTypes.topChange, topLevelTypes.topClick, topLevelTypes.topFocus, topLevelTypes.topInput, topLevelTypes.topKeyDown, topLevelTypes.topKeyUp, topLevelTypes.topSelectionChange]
      } };
    var activeElement = null;
    var activeElementID = null;
    var activeElementValue = null;
    var activeElementValueProp = null;
    function shouldUseChangeEvent(elem) {
      var nodeName = elem.nodeName && elem.nodeName.toLowerCase();
      return nodeName === 'select' || nodeName === 'input' && elem.type === 'file';
    }
    var doesChangeEventBubble = false;
    if (ExecutionEnvironment.canUseDOM) {
      doesChangeEventBubble = isEventSupported('change') && (!('documentMode' in document) || document.documentMode > 8);
    }
    function manualDispatchChangeEvent(nativeEvent) {
      var event = SyntheticEvent.getPooled(eventTypes.change, activeElementID, nativeEvent, getEventTarget(nativeEvent));
      EventPropagators.accumulateTwoPhaseDispatches(event);
      ReactUpdates.batchedUpdates(runEventInBatch, event);
    }
    function runEventInBatch(event) {
      EventPluginHub.enqueueEvents(event);
      EventPluginHub.processEventQueue(false);
    }
    function startWatchingForChangeEventIE8(target, targetID) {
      activeElement = target;
      activeElementID = targetID;
      activeElement.attachEvent('onchange', manualDispatchChangeEvent);
    }
    function stopWatchingForChangeEventIE8() {
      if (!activeElement) {
        return;
      }
      activeElement.detachEvent('onchange', manualDispatchChangeEvent);
      activeElement = null;
      activeElementID = null;
    }
    function getTargetIDForChangeEvent(topLevelType, topLevelTarget, topLevelTargetID) {
      if (topLevelType === topLevelTypes.topChange) {
        return topLevelTargetID;
      }
    }
    function handleEventsForChangeEventIE8(topLevelType, topLevelTarget, topLevelTargetID) {
      if (topLevelType === topLevelTypes.topFocus) {
        stopWatchingForChangeEventIE8();
        startWatchingForChangeEventIE8(topLevelTarget, topLevelTargetID);
      } else if (topLevelType === topLevelTypes.topBlur) {
        stopWatchingForChangeEventIE8();
      }
    }
    var isInputEventSupported = false;
    if (ExecutionEnvironment.canUseDOM) {
      isInputEventSupported = isEventSupported('input') && (!('documentMode' in document) || document.documentMode > 9);
    }
    var newValueProp = {
      get: function () {
        return activeElementValueProp.get.call(this);
      },
      set: function (val) {
        activeElementValue = '' + val;
        activeElementValueProp.set.call(this, val);
      }
    };
    function startWatchingForValueChange(target, targetID) {
      activeElement = target;
      activeElementID = targetID;
      activeElementValue = target.value;
      activeElementValueProp = Object.getOwnPropertyDescriptor(target.constructor.prototype, 'value');
      Object.defineProperty(activeElement, 'value', newValueProp);
      activeElement.attachEvent('onpropertychange', handlePropertyChange);
    }
    function stopWatchingForValueChange() {
      if (!activeElement) {
        return;
      }
      delete activeElement.value;
      activeElement.detachEvent('onpropertychange', handlePropertyChange);
      activeElement = null;
      activeElementID = null;
      activeElementValue = null;
      activeElementValueProp = null;
    }
    function handlePropertyChange(nativeEvent) {
      if (nativeEvent.propertyName !== 'value') {
        return;
      }
      var value = nativeEvent.srcElement.value;
      if (value === activeElementValue) {
        return;
      }
      activeElementValue = value;
      manualDispatchChangeEvent(nativeEvent);
    }
    function getTargetIDForInputEvent(topLevelType, topLevelTarget, topLevelTargetID) {
      if (topLevelType === topLevelTypes.topInput) {
        return topLevelTargetID;
      }
    }
    function handleEventsForInputEventIE(topLevelType, topLevelTarget, topLevelTargetID) {
      if (topLevelType === topLevelTypes.topFocus) {
        stopWatchingForValueChange();
        startWatchingForValueChange(topLevelTarget, topLevelTargetID);
      } else if (topLevelType === topLevelTypes.topBlur) {
        stopWatchingForValueChange();
      }
    }
    function getTargetIDForInputEventIE(topLevelType, topLevelTarget, topLevelTargetID) {
      if (topLevelType === topLevelTypes.topSelectionChange || topLevelType === topLevelTypes.topKeyUp || topLevelType === topLevelTypes.topKeyDown) {
        if (activeElement && activeElement.value !== activeElementValue) {
          activeElementValue = activeElement.value;
          return activeElementID;
        }
      }
    }
    function shouldUseClickEvent(elem) {
      return elem.nodeName && elem.nodeName.toLowerCase() === 'input' && (elem.type === 'checkbox' || elem.type === 'radio');
    }
    function getTargetIDForClickEvent(topLevelType, topLevelTarget, topLevelTargetID) {
      if (topLevelType === topLevelTypes.topClick) {
        return topLevelTargetID;
      }
    }
    var ChangeEventPlugin = {
      eventTypes: eventTypes,
      extractEvents: function (topLevelType, topLevelTarget, topLevelTargetID, nativeEvent, nativeEventTarget) {
        var getTargetIDFunc, handleEventFunc;
        if (shouldUseChangeEvent(topLevelTarget)) {
          if (doesChangeEventBubble) {
            getTargetIDFunc = getTargetIDForChangeEvent;
          } else {
            handleEventFunc = handleEventsForChangeEventIE8;
          }
        } else if (isTextInputElement(topLevelTarget)) {
          if (isInputEventSupported) {
            getTargetIDFunc = getTargetIDForInputEvent;
          } else {
            getTargetIDFunc = getTargetIDForInputEventIE;
            handleEventFunc = handleEventsForInputEventIE;
          }
        } else if (shouldUseClickEvent(topLevelTarget)) {
          getTargetIDFunc = getTargetIDForClickEvent;
        }
        if (getTargetIDFunc) {
          var targetID = getTargetIDFunc(topLevelType, topLevelTarget, topLevelTargetID);
          if (targetID) {
            var event = SyntheticEvent.getPooled(eventTypes.change, targetID, nativeEvent, nativeEventTarget);
            event.type = 'change';
            EventPropagators.accumulateTwoPhaseDispatches(event);
            return event;
          }
        }
        if (handleEventFunc) {
          handleEventFunc(topLevelType, topLevelTarget, topLevelTargetID);
        }
      }
    };
    module.exports = ChangeEventPlugin;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
});
System.registerDynamic('npm:react@0.14.7/lib/ClientReactRootIndex.js', [], true, function ($__require, exports, module) {
  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule ClientReactRootIndex
   * @typechecks
   */

  'use strict';

  var global = this || self,
      GLOBAL = global;
  var nextReactRootIndex = 0;

  var ClientReactRootIndex = {
    createReactRootIndex: function () {
      return nextReactRootIndex++;
    }
  };

  module.exports = ClientReactRootIndex;
});
System.registerDynamic('npm:react@0.14.7/lib/DefaultEventPluginOrder.js', ['npm:fbjs@0.6.1/lib/keyOf.js'], true, function ($__require, exports, module) {
  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule DefaultEventPluginOrder
   */

  'use strict';

  var global = this || self,
      GLOBAL = global;
  var keyOf = $__require('npm:fbjs@0.6.1/lib/keyOf.js');

  /**
   * Module that is injectable into `EventPluginHub`, that specifies a
   * deterministic ordering of `EventPlugin`s. A convenient way to reason about
   * plugins, without having to package every one of them. This is better than
   * having plugins be ordered in the same order that they are injected because
   * that ordering would be influenced by the packaging order.
   * `ResponderEventPlugin` must occur before `SimpleEventPlugin` so that
   * preventing default on events is convenient in `SimpleEventPlugin` handlers.
   */
  var DefaultEventPluginOrder = [keyOf({ ResponderEventPlugin: null }), keyOf({ SimpleEventPlugin: null }), keyOf({ TapEventPlugin: null }), keyOf({ EnterLeaveEventPlugin: null }), keyOf({ ChangeEventPlugin: null }), keyOf({ SelectEventPlugin: null }), keyOf({ BeforeInputEventPlugin: null })];

  module.exports = DefaultEventPluginOrder;
});
System.registerDynamic('npm:react@0.14.7/lib/EnterLeaveEventPlugin.js', ['npm:react@0.14.7/lib/EventConstants.js', 'npm:react@0.14.7/lib/EventPropagators.js', 'npm:react@0.14.7/lib/SyntheticMouseEvent.js', 'npm:react@0.14.7/lib/ReactMount.js', 'npm:fbjs@0.6.1/lib/keyOf.js'], true, function ($__require, exports, module) {
  /* */
  'use strict';

  var global = this || self,
      GLOBAL = global;
  var EventConstants = $__require('npm:react@0.14.7/lib/EventConstants.js');
  var EventPropagators = $__require('npm:react@0.14.7/lib/EventPropagators.js');
  var SyntheticMouseEvent = $__require('npm:react@0.14.7/lib/SyntheticMouseEvent.js');
  var ReactMount = $__require('npm:react@0.14.7/lib/ReactMount.js');
  var keyOf = $__require('npm:fbjs@0.6.1/lib/keyOf.js');
  var topLevelTypes = EventConstants.topLevelTypes;
  var getFirstReactDOM = ReactMount.getFirstReactDOM;
  var eventTypes = {
    mouseEnter: {
      registrationName: keyOf({ onMouseEnter: null }),
      dependencies: [topLevelTypes.topMouseOut, topLevelTypes.topMouseOver]
    },
    mouseLeave: {
      registrationName: keyOf({ onMouseLeave: null }),
      dependencies: [topLevelTypes.topMouseOut, topLevelTypes.topMouseOver]
    }
  };
  var extractedEvents = [null, null];
  var EnterLeaveEventPlugin = {
    eventTypes: eventTypes,
    extractEvents: function (topLevelType, topLevelTarget, topLevelTargetID, nativeEvent, nativeEventTarget) {
      if (topLevelType === topLevelTypes.topMouseOver && (nativeEvent.relatedTarget || nativeEvent.fromElement)) {
        return null;
      }
      if (topLevelType !== topLevelTypes.topMouseOut && topLevelType !== topLevelTypes.topMouseOver) {
        return null;
      }
      var win;
      if (topLevelTarget.window === topLevelTarget) {
        win = topLevelTarget;
      } else {
        var doc = topLevelTarget.ownerDocument;
        if (doc) {
          win = doc.defaultView || doc.parentWindow;
        } else {
          win = window;
        }
      }
      var from;
      var to;
      var fromID = '';
      var toID = '';
      if (topLevelType === topLevelTypes.topMouseOut) {
        from = topLevelTarget;
        fromID = topLevelTargetID;
        to = getFirstReactDOM(nativeEvent.relatedTarget || nativeEvent.toElement);
        if (to) {
          toID = ReactMount.getID(to);
        } else {
          to = win;
        }
        to = to || win;
      } else {
        from = win;
        to = topLevelTarget;
        toID = topLevelTargetID;
      }
      if (from === to) {
        return null;
      }
      var leave = SyntheticMouseEvent.getPooled(eventTypes.mouseLeave, fromID, nativeEvent, nativeEventTarget);
      leave.type = 'mouseleave';
      leave.target = from;
      leave.relatedTarget = to;
      var enter = SyntheticMouseEvent.getPooled(eventTypes.mouseEnter, toID, nativeEvent, nativeEventTarget);
      enter.type = 'mouseenter';
      enter.target = to;
      enter.relatedTarget = from;
      EventPropagators.accumulateEnterLeaveDispatches(leave, enter, fromID, toID);
      extractedEvents[0] = leave;
      extractedEvents[1] = enter;
      return extractedEvents;
    }
  };
  module.exports = EnterLeaveEventPlugin;
});
System.registerDynamic('npm:react@0.14.7/lib/HTMLDOMPropertyConfig.js', ['npm:react@0.14.7/lib/DOMProperty.js', 'npm:fbjs@0.6.1/lib/ExecutionEnvironment.js'], true, function ($__require, exports, module) {
  /* */
  'use strict';

  var global = this || self,
      GLOBAL = global;
  var DOMProperty = $__require('npm:react@0.14.7/lib/DOMProperty.js');
  var ExecutionEnvironment = $__require('npm:fbjs@0.6.1/lib/ExecutionEnvironment.js');
  var MUST_USE_ATTRIBUTE = DOMProperty.injection.MUST_USE_ATTRIBUTE;
  var MUST_USE_PROPERTY = DOMProperty.injection.MUST_USE_PROPERTY;
  var HAS_BOOLEAN_VALUE = DOMProperty.injection.HAS_BOOLEAN_VALUE;
  var HAS_SIDE_EFFECTS = DOMProperty.injection.HAS_SIDE_EFFECTS;
  var HAS_NUMERIC_VALUE = DOMProperty.injection.HAS_NUMERIC_VALUE;
  var HAS_POSITIVE_NUMERIC_VALUE = DOMProperty.injection.HAS_POSITIVE_NUMERIC_VALUE;
  var HAS_OVERLOADED_BOOLEAN_VALUE = DOMProperty.injection.HAS_OVERLOADED_BOOLEAN_VALUE;
  var hasSVG;
  if (ExecutionEnvironment.canUseDOM) {
    var implementation = document.implementation;
    hasSVG = implementation && implementation.hasFeature && implementation.hasFeature('http://www.w3.org/TR/SVG11/feature#BasicStructure', '1.1');
  }
  var HTMLDOMPropertyConfig = {
    isCustomAttribute: RegExp.prototype.test.bind(/^(data|aria)-[a-z_][a-z\d_.\-]*$/),
    Properties: {
      accept: null,
      acceptCharset: null,
      accessKey: null,
      action: null,
      allowFullScreen: MUST_USE_ATTRIBUTE | HAS_BOOLEAN_VALUE,
      allowTransparency: MUST_USE_ATTRIBUTE,
      alt: null,
      async: HAS_BOOLEAN_VALUE,
      autoComplete: null,
      autoPlay: HAS_BOOLEAN_VALUE,
      capture: MUST_USE_ATTRIBUTE | HAS_BOOLEAN_VALUE,
      cellPadding: null,
      cellSpacing: null,
      charSet: MUST_USE_ATTRIBUTE,
      challenge: MUST_USE_ATTRIBUTE,
      checked: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
      classID: MUST_USE_ATTRIBUTE,
      className: hasSVG ? MUST_USE_ATTRIBUTE : MUST_USE_PROPERTY,
      cols: MUST_USE_ATTRIBUTE | HAS_POSITIVE_NUMERIC_VALUE,
      colSpan: null,
      content: null,
      contentEditable: null,
      contextMenu: MUST_USE_ATTRIBUTE,
      controls: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
      coords: null,
      crossOrigin: null,
      data: null,
      dateTime: MUST_USE_ATTRIBUTE,
      'default': HAS_BOOLEAN_VALUE,
      defer: HAS_BOOLEAN_VALUE,
      dir: null,
      disabled: MUST_USE_ATTRIBUTE | HAS_BOOLEAN_VALUE,
      download: HAS_OVERLOADED_BOOLEAN_VALUE,
      draggable: null,
      encType: null,
      form: MUST_USE_ATTRIBUTE,
      formAction: MUST_USE_ATTRIBUTE,
      formEncType: MUST_USE_ATTRIBUTE,
      formMethod: MUST_USE_ATTRIBUTE,
      formNoValidate: HAS_BOOLEAN_VALUE,
      formTarget: MUST_USE_ATTRIBUTE,
      frameBorder: MUST_USE_ATTRIBUTE,
      headers: null,
      height: MUST_USE_ATTRIBUTE,
      hidden: MUST_USE_ATTRIBUTE | HAS_BOOLEAN_VALUE,
      high: null,
      href: null,
      hrefLang: null,
      htmlFor: null,
      httpEquiv: null,
      icon: null,
      id: MUST_USE_PROPERTY,
      inputMode: MUST_USE_ATTRIBUTE,
      integrity: null,
      is: MUST_USE_ATTRIBUTE,
      keyParams: MUST_USE_ATTRIBUTE,
      keyType: MUST_USE_ATTRIBUTE,
      kind: null,
      label: null,
      lang: null,
      list: MUST_USE_ATTRIBUTE,
      loop: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
      low: null,
      manifest: MUST_USE_ATTRIBUTE,
      marginHeight: null,
      marginWidth: null,
      max: null,
      maxLength: MUST_USE_ATTRIBUTE,
      media: MUST_USE_ATTRIBUTE,
      mediaGroup: null,
      method: null,
      min: null,
      minLength: MUST_USE_ATTRIBUTE,
      multiple: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
      muted: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
      name: null,
      nonce: MUST_USE_ATTRIBUTE,
      noValidate: HAS_BOOLEAN_VALUE,
      open: HAS_BOOLEAN_VALUE,
      optimum: null,
      pattern: null,
      placeholder: null,
      poster: null,
      preload: null,
      radioGroup: null,
      readOnly: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
      rel: null,
      required: HAS_BOOLEAN_VALUE,
      reversed: HAS_BOOLEAN_VALUE,
      role: MUST_USE_ATTRIBUTE,
      rows: MUST_USE_ATTRIBUTE | HAS_POSITIVE_NUMERIC_VALUE,
      rowSpan: null,
      sandbox: null,
      scope: null,
      scoped: HAS_BOOLEAN_VALUE,
      scrolling: null,
      seamless: MUST_USE_ATTRIBUTE | HAS_BOOLEAN_VALUE,
      selected: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
      shape: null,
      size: MUST_USE_ATTRIBUTE | HAS_POSITIVE_NUMERIC_VALUE,
      sizes: MUST_USE_ATTRIBUTE,
      span: HAS_POSITIVE_NUMERIC_VALUE,
      spellCheck: null,
      src: null,
      srcDoc: MUST_USE_PROPERTY,
      srcLang: null,
      srcSet: MUST_USE_ATTRIBUTE,
      start: HAS_NUMERIC_VALUE,
      step: null,
      style: null,
      summary: null,
      tabIndex: null,
      target: null,
      title: null,
      type: null,
      useMap: null,
      value: MUST_USE_PROPERTY | HAS_SIDE_EFFECTS,
      width: MUST_USE_ATTRIBUTE,
      wmode: MUST_USE_ATTRIBUTE,
      wrap: null,
      about: MUST_USE_ATTRIBUTE,
      datatype: MUST_USE_ATTRIBUTE,
      inlist: MUST_USE_ATTRIBUTE,
      prefix: MUST_USE_ATTRIBUTE,
      property: MUST_USE_ATTRIBUTE,
      resource: MUST_USE_ATTRIBUTE,
      'typeof': MUST_USE_ATTRIBUTE,
      vocab: MUST_USE_ATTRIBUTE,
      autoCapitalize: MUST_USE_ATTRIBUTE,
      autoCorrect: MUST_USE_ATTRIBUTE,
      autoSave: null,
      color: null,
      itemProp: MUST_USE_ATTRIBUTE,
      itemScope: MUST_USE_ATTRIBUTE | HAS_BOOLEAN_VALUE,
      itemType: MUST_USE_ATTRIBUTE,
      itemID: MUST_USE_ATTRIBUTE,
      itemRef: MUST_USE_ATTRIBUTE,
      results: null,
      security: MUST_USE_ATTRIBUTE,
      unselectable: MUST_USE_ATTRIBUTE
    },
    DOMAttributeNames: {
      acceptCharset: 'accept-charset',
      className: 'class',
      htmlFor: 'for',
      httpEquiv: 'http-equiv'
    },
    DOMPropertyNames: {
      autoComplete: 'autocomplete',
      autoFocus: 'autofocus',
      autoPlay: 'autoplay',
      autoSave: 'autosave',
      encType: 'encoding',
      hrefLang: 'hreflang',
      radioGroup: 'radiogroup',
      spellCheck: 'spellcheck',
      srcDoc: 'srcdoc',
      srcSet: 'srcset'
    }
  };
  module.exports = HTMLDOMPropertyConfig;
});
System.registerDynamic('npm:react@0.14.7/lib/ReactBrowserComponentMixin.js', ['npm:react@0.14.7/lib/ReactInstanceMap.js', 'npm:react@0.14.7/lib/findDOMNode.js', 'npm:fbjs@0.6.1/lib/warning.js', 'github:jspm/nodelibs-process@0.1.2.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  (function (process) {
    'use strict';

    var ReactInstanceMap = $__require('npm:react@0.14.7/lib/ReactInstanceMap.js');
    var findDOMNode = $__require('npm:react@0.14.7/lib/findDOMNode.js');
    var warning = $__require('npm:fbjs@0.6.1/lib/warning.js');
    var didWarnKey = '_getDOMNodeDidWarn';
    var ReactBrowserComponentMixin = { getDOMNode: function () {
        'production' !== 'production' ? warning(this.constructor[didWarnKey], '%s.getDOMNode(...) is deprecated. Please use ' + 'ReactDOM.findDOMNode(instance) instead.', ReactInstanceMap.get(this).getName() || this.tagName || 'Unknown') : undefined;
        this.constructor[didWarnKey] = true;
        return findDOMNode(this);
      } };
    module.exports = ReactBrowserComponentMixin;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
});
System.registerDynamic('npm:react@0.14.7/lib/findDOMNode.js', ['npm:react@0.14.7/lib/ReactCurrentOwner.js', 'npm:react@0.14.7/lib/ReactInstanceMap.js', 'npm:react@0.14.7/lib/ReactMount.js', 'npm:fbjs@0.6.1/lib/invariant.js', 'npm:fbjs@0.6.1/lib/warning.js', 'github:jspm/nodelibs-process@0.1.2.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  (function (process) {
    'use strict';

    var ReactCurrentOwner = $__require('npm:react@0.14.7/lib/ReactCurrentOwner.js');
    var ReactInstanceMap = $__require('npm:react@0.14.7/lib/ReactInstanceMap.js');
    var ReactMount = $__require('npm:react@0.14.7/lib/ReactMount.js');
    var invariant = $__require('npm:fbjs@0.6.1/lib/invariant.js');
    var warning = $__require('npm:fbjs@0.6.1/lib/warning.js');
    function findDOMNode(componentOrElement) {
      if ('production' !== 'production') {
        var owner = ReactCurrentOwner.current;
        if (owner !== null) {
          'production' !== 'production' ? warning(owner._warnedAboutRefsInRender, '%s is accessing getDOMNode or findDOMNode inside its render(). ' + 'render() should be a pure function of props and state. It should ' + 'never access something that requires stale data from the previous ' + 'render, such as refs. Move this logic to componentDidMount and ' + 'componentDidUpdate instead.', owner.getName() || 'A component') : undefined;
          owner._warnedAboutRefsInRender = true;
        }
      }
      if (componentOrElement == null) {
        return null;
      }
      if (componentOrElement.nodeType === 1) {
        return componentOrElement;
      }
      if (ReactInstanceMap.has(componentOrElement)) {
        return ReactMount.getNodeFromInstance(componentOrElement);
      }
      !(componentOrElement.render == null || typeof componentOrElement.render !== 'function') ? 'production' !== 'production' ? invariant(false, 'findDOMNode was called on an unmounted component.') : invariant(false) : undefined;
      !false ? 'production' !== 'production' ? invariant(false, 'Element appears to be neither ReactComponent nor DOMNode (keys: %s)', Object.keys(componentOrElement)) : invariant(false) : undefined;
    }
    module.exports = findDOMNode;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
});
System.registerDynamic('npm:react@0.14.7/lib/AutoFocusUtils.js', ['npm:react@0.14.7/lib/ReactMount.js', 'npm:react@0.14.7/lib/findDOMNode.js', 'npm:fbjs@0.6.1/lib/focusNode.js'], true, function ($__require, exports, module) {
  /* */
  'use strict';

  var global = this || self,
      GLOBAL = global;
  var ReactMount = $__require('npm:react@0.14.7/lib/ReactMount.js');
  var findDOMNode = $__require('npm:react@0.14.7/lib/findDOMNode.js');
  var focusNode = $__require('npm:fbjs@0.6.1/lib/focusNode.js');
  var Mixin = { componentDidMount: function () {
      if (this.props.autoFocus) {
        focusNode(findDOMNode(this));
      }
    } };
  var AutoFocusUtils = {
    Mixin: Mixin,
    focusDOMComponent: function () {
      focusNode(ReactMount.getNode(this._rootNodeID));
    }
  };
  module.exports = AutoFocusUtils;
});
System.registerDynamic("npm:fbjs@0.6.1/lib/camelize.js", [], true, function ($__require, exports, module) {
  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule camelize
   * @typechecks
   */

  "use strict";

  var global = this || self,
      GLOBAL = global;
  var _hyphenPattern = /-(.)/g;

  /**
   * Camelcases a hyphenated string, for example:
   *
   *   > camelize('background-color')
   *   < "backgroundColor"
   *
   * @param {string} string
   * @return {string}
   */
  function camelize(string) {
    return string.replace(_hyphenPattern, function (_, character) {
      return character.toUpperCase();
    });
  }

  module.exports = camelize;
});
System.registerDynamic('npm:fbjs@0.6.1/lib/camelizeStyleName.js', ['npm:fbjs@0.6.1/lib/camelize.js'], true, function ($__require, exports, module) {
  /* */
  'use strict';

  var global = this || self,
      GLOBAL = global;
  var camelize = $__require('npm:fbjs@0.6.1/lib/camelize.js');
  var msPattern = /^-ms-/;
  function camelizeStyleName(string) {
    return camelize(string.replace(msPattern, 'ms-'));
  }
  module.exports = camelizeStyleName;
});
System.registerDynamic('npm:react@0.14.7/lib/CSSProperty.js', [], true, function ($__require, exports, module) {
  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule CSSProperty
   */

  'use strict';

  /**
   * CSS properties which accept numbers but are not in units of "px".
   */

  var global = this || self,
      GLOBAL = global;
  var isUnitlessNumber = {
    animationIterationCount: true,
    boxFlex: true,
    boxFlexGroup: true,
    boxOrdinalGroup: true,
    columnCount: true,
    flex: true,
    flexGrow: true,
    flexPositive: true,
    flexShrink: true,
    flexNegative: true,
    flexOrder: true,
    fontWeight: true,
    lineClamp: true,
    lineHeight: true,
    opacity: true,
    order: true,
    orphans: true,
    tabSize: true,
    widows: true,
    zIndex: true,
    zoom: true,

    // SVG-related properties
    fillOpacity: true,
    stopOpacity: true,
    strokeDashoffset: true,
    strokeOpacity: true,
    strokeWidth: true
  };

  /**
   * @param {string} prefix vendor-specific prefix, eg: Webkit
   * @param {string} key style name, eg: transitionDuration
   * @return {string} style name prefixed with `prefix`, properly camelCased, eg:
   * WebkitTransitionDuration
   */
  function prefixKey(prefix, key) {
    return prefix + key.charAt(0).toUpperCase() + key.substring(1);
  }

  /**
   * Support style names that may come passed in prefixed by adding permutations
   * of vendor prefixes.
   */
  var prefixes = ['Webkit', 'ms', 'Moz', 'O'];

  // Using Object.keys here, or else the vanilla for-in loop makes IE8 go into an
  // infinite loop, because it iterates over the newly added props too.
  Object.keys(isUnitlessNumber).forEach(function (prop) {
    prefixes.forEach(function (prefix) {
      isUnitlessNumber[prefixKey(prefix, prop)] = isUnitlessNumber[prop];
    });
  });

  /**
   * Most style properties can be unset by doing .style[prop] = '' but IE8
   * doesn't like doing that with shorthand properties so for the properties that
   * IE8 breaks on, which are listed here, we instead unset each of the
   * individual properties. See http://bugs.jquery.com/ticket/12385.
   * The 4-value 'clock' properties like margin, padding, border-width seem to
   * behave without any problems. Curiously, list-style works too without any
   * special prodding.
   */
  var shorthandPropertyExpansions = {
    background: {
      backgroundAttachment: true,
      backgroundColor: true,
      backgroundImage: true,
      backgroundPositionX: true,
      backgroundPositionY: true,
      backgroundRepeat: true
    },
    backgroundPosition: {
      backgroundPositionX: true,
      backgroundPositionY: true
    },
    border: {
      borderWidth: true,
      borderStyle: true,
      borderColor: true
    },
    borderBottom: {
      borderBottomWidth: true,
      borderBottomStyle: true,
      borderBottomColor: true
    },
    borderLeft: {
      borderLeftWidth: true,
      borderLeftStyle: true,
      borderLeftColor: true
    },
    borderRight: {
      borderRightWidth: true,
      borderRightStyle: true,
      borderRightColor: true
    },
    borderTop: {
      borderTopWidth: true,
      borderTopStyle: true,
      borderTopColor: true
    },
    font: {
      fontStyle: true,
      fontVariant: true,
      fontWeight: true,
      fontSize: true,
      lineHeight: true,
      fontFamily: true
    },
    outline: {
      outlineWidth: true,
      outlineStyle: true,
      outlineColor: true
    }
  };

  var CSSProperty = {
    isUnitlessNumber: isUnitlessNumber,
    shorthandPropertyExpansions: shorthandPropertyExpansions
  };

  module.exports = CSSProperty;
});
System.registerDynamic('npm:react@0.14.7/lib/dangerousStyleValue.js', ['npm:react@0.14.7/lib/CSSProperty.js'], true, function ($__require, exports, module) {
  /* */
  'use strict';

  var global = this || self,
      GLOBAL = global;
  var CSSProperty = $__require('npm:react@0.14.7/lib/CSSProperty.js');
  var isUnitlessNumber = CSSProperty.isUnitlessNumber;
  function dangerousStyleValue(name, value) {
    var isEmpty = value == null || typeof value === 'boolean' || value === '';
    if (isEmpty) {
      return '';
    }
    var isNonNumeric = isNaN(value);
    if (isNonNumeric || value === 0 || isUnitlessNumber.hasOwnProperty(name) && isUnitlessNumber[name]) {
      return '' + value;
    }
    if (typeof value === 'string') {
      value = value.trim();
    }
    return value + 'px';
  }
  module.exports = dangerousStyleValue;
});
System.registerDynamic('npm:fbjs@0.6.1/lib/hyphenate.js', [], true, function ($__require, exports, module) {
  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule hyphenate
   * @typechecks
   */

  'use strict';

  var global = this || self,
      GLOBAL = global;
  var _uppercasePattern = /([A-Z])/g;

  /**
   * Hyphenates a camelcased string, for example:
   *
   *   > hyphenate('backgroundColor')
   *   < "background-color"
   *
   * For CSS style names, use `hyphenateStyleName` instead which works properly
   * with all vendor prefixes, including `ms`.
   *
   * @param {string} string
   * @return {string}
   */
  function hyphenate(string) {
    return string.replace(_uppercasePattern, '-$1').toLowerCase();
  }

  module.exports = hyphenate;
});
System.registerDynamic('npm:fbjs@0.6.1/lib/hyphenateStyleName.js', ['npm:fbjs@0.6.1/lib/hyphenate.js'], true, function ($__require, exports, module) {
  /* */
  'use strict';

  var global = this || self,
      GLOBAL = global;
  var hyphenate = $__require('npm:fbjs@0.6.1/lib/hyphenate.js');
  var msPattern = /^ms-/;
  function hyphenateStyleName(string) {
    return hyphenate(string).replace(msPattern, '-ms-');
  }
  module.exports = hyphenateStyleName;
});
System.registerDynamic('npm:fbjs@0.6.1/lib/memoizeStringOnly.js', [], true, function ($__require, exports, module) {
  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule memoizeStringOnly
   * @typechecks static-only
   */

  'use strict';

  /**
   * Memoizes the return value of a function that accepts one string argument.
   *
   * @param {function} callback
   * @return {function}
   */

  var global = this || self,
      GLOBAL = global;
  function memoizeStringOnly(callback) {
    var cache = {};
    return function (string) {
      if (!cache.hasOwnProperty(string)) {
        cache[string] = callback.call(this, string);
      }
      return cache[string];
    };
  }

  module.exports = memoizeStringOnly;
});
System.registerDynamic('npm:react@0.14.7/lib/CSSPropertyOperations.js', ['npm:react@0.14.7/lib/CSSProperty.js', 'npm:fbjs@0.6.1/lib/ExecutionEnvironment.js', 'npm:react@0.14.7/lib/ReactPerf.js', 'npm:fbjs@0.6.1/lib/camelizeStyleName.js', 'npm:react@0.14.7/lib/dangerousStyleValue.js', 'npm:fbjs@0.6.1/lib/hyphenateStyleName.js', 'npm:fbjs@0.6.1/lib/memoizeStringOnly.js', 'npm:fbjs@0.6.1/lib/warning.js', 'github:jspm/nodelibs-process@0.1.2.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  (function (process) {
    'use strict';

    var CSSProperty = $__require('npm:react@0.14.7/lib/CSSProperty.js');
    var ExecutionEnvironment = $__require('npm:fbjs@0.6.1/lib/ExecutionEnvironment.js');
    var ReactPerf = $__require('npm:react@0.14.7/lib/ReactPerf.js');
    var camelizeStyleName = $__require('npm:fbjs@0.6.1/lib/camelizeStyleName.js');
    var dangerousStyleValue = $__require('npm:react@0.14.7/lib/dangerousStyleValue.js');
    var hyphenateStyleName = $__require('npm:fbjs@0.6.1/lib/hyphenateStyleName.js');
    var memoizeStringOnly = $__require('npm:fbjs@0.6.1/lib/memoizeStringOnly.js');
    var warning = $__require('npm:fbjs@0.6.1/lib/warning.js');
    var processStyleName = memoizeStringOnly(function (styleName) {
      return hyphenateStyleName(styleName);
    });
    var hasShorthandPropertyBug = false;
    var styleFloatAccessor = 'cssFloat';
    if (ExecutionEnvironment.canUseDOM) {
      var tempStyle = document.createElement('div').style;
      try {
        tempStyle.font = '';
      } catch (e) {
        hasShorthandPropertyBug = true;
      }
      if (document.documentElement.style.cssFloat === undefined) {
        styleFloatAccessor = 'styleFloat';
      }
    }
    if ('production' !== 'production') {
      var badVendoredStyleNamePattern = /^(?:webkit|moz|o)[A-Z]/;
      var badStyleValueWithSemicolonPattern = /;\s*$/;
      var warnedStyleNames = {};
      var warnedStyleValues = {};
      var warnHyphenatedStyleName = function (name) {
        if (warnedStyleNames.hasOwnProperty(name) && warnedStyleNames[name]) {
          return;
        }
        warnedStyleNames[name] = true;
        'production' !== 'production' ? warning(false, 'Unsupported style property %s. Did you mean %s?', name, camelizeStyleName(name)) : undefined;
      };
      var warnBadVendoredStyleName = function (name) {
        if (warnedStyleNames.hasOwnProperty(name) && warnedStyleNames[name]) {
          return;
        }
        warnedStyleNames[name] = true;
        'production' !== 'production' ? warning(false, 'Unsupported vendor-prefixed style property %s. Did you mean %s?', name, name.charAt(0).toUpperCase() + name.slice(1)) : undefined;
      };
      var warnStyleValueWithSemicolon = function (name, value) {
        if (warnedStyleValues.hasOwnProperty(value) && warnedStyleValues[value]) {
          return;
        }
        warnedStyleValues[value] = true;
        'production' !== 'production' ? warning(false, 'Style property values shouldn\'t contain a semicolon. ' + 'Try "%s: %s" instead.', name, value.replace(badStyleValueWithSemicolonPattern, '')) : undefined;
      };
      var warnValidStyle = function (name, value) {
        if (name.indexOf('-') > -1) {
          warnHyphenatedStyleName(name);
        } else if (badVendoredStyleNamePattern.test(name)) {
          warnBadVendoredStyleName(name);
        } else if (badStyleValueWithSemicolonPattern.test(value)) {
          warnStyleValueWithSemicolon(name, value);
        }
      };
    }
    var CSSPropertyOperations = {
      createMarkupForStyles: function (styles) {
        var serialized = '';
        for (var styleName in styles) {
          if (!styles.hasOwnProperty(styleName)) {
            continue;
          }
          var styleValue = styles[styleName];
          if ('production' !== 'production') {
            warnValidStyle(styleName, styleValue);
          }
          if (styleValue != null) {
            serialized += processStyleName(styleName) + ':';
            serialized += dangerousStyleValue(styleName, styleValue) + ';';
          }
        }
        return serialized || null;
      },
      setValueForStyles: function (node, styles) {
        var style = node.style;
        for (var styleName in styles) {
          if (!styles.hasOwnProperty(styleName)) {
            continue;
          }
          if ('production' !== 'production') {
            warnValidStyle(styleName, styles[styleName]);
          }
          var styleValue = dangerousStyleValue(styleName, styles[styleName]);
          if (styleName === 'float') {
            styleName = styleFloatAccessor;
          }
          if (styleValue) {
            style[styleName] = styleValue;
          } else {
            var expansion = hasShorthandPropertyBug && CSSProperty.shorthandPropertyExpansions[styleName];
            if (expansion) {
              for (var individualStyleName in expansion) {
                style[individualStyleName] = '';
              }
            } else {
              style[styleName] = '';
            }
          }
        }
      }
    };
    ReactPerf.measureMethods(CSSPropertyOperations, 'CSSPropertyOperations', { setValueForStyles: 'setValueForStyles' });
    module.exports = CSSPropertyOperations;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
});
System.registerDynamic('npm:react@0.14.7/lib/ReactDOMButton.js', [], true, function ($__require, exports, module) {
  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule ReactDOMButton
   */

  'use strict';

  var global = this || self,
      GLOBAL = global;
  var mouseListenerNames = {
    onClick: true,
    onDoubleClick: true,
    onMouseDown: true,
    onMouseMove: true,
    onMouseUp: true,

    onClickCapture: true,
    onDoubleClickCapture: true,
    onMouseDownCapture: true,
    onMouseMoveCapture: true,
    onMouseUpCapture: true
  };

  /**
   * Implements a <button> native component that does not receive mouse events
   * when `disabled` is set.
   */
  var ReactDOMButton = {
    getNativeProps: function (inst, props, context) {
      if (!props.disabled) {
        return props;
      }

      // Copy the props, except the mouse listeners
      var nativeProps = {};
      for (var key in props) {
        if (props.hasOwnProperty(key) && !mouseListenerNames[key]) {
          nativeProps[key] = props[key];
        }
      }

      return nativeProps;
    }
  };

  module.exports = ReactDOMButton;
});
System.registerDynamic('npm:react@0.14.7/lib/ReactDOMInput.js', ['npm:react@0.14.7/lib/ReactDOMIDOperations.js', 'npm:react@0.14.7/lib/LinkedValueUtils.js', 'npm:react@0.14.7/lib/ReactMount.js', 'npm:react@0.14.7/lib/ReactUpdates.js', 'npm:react@0.14.7/lib/Object.assign.js', 'npm:fbjs@0.6.1/lib/invariant.js', 'github:jspm/nodelibs-process@0.1.2.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  (function (process) {
    'use strict';

    var ReactDOMIDOperations = $__require('npm:react@0.14.7/lib/ReactDOMIDOperations.js');
    var LinkedValueUtils = $__require('npm:react@0.14.7/lib/LinkedValueUtils.js');
    var ReactMount = $__require('npm:react@0.14.7/lib/ReactMount.js');
    var ReactUpdates = $__require('npm:react@0.14.7/lib/ReactUpdates.js');
    var assign = $__require('npm:react@0.14.7/lib/Object.assign.js');
    var invariant = $__require('npm:fbjs@0.6.1/lib/invariant.js');
    var instancesByReactID = {};
    function forceUpdateIfMounted() {
      if (this._rootNodeID) {
        ReactDOMInput.updateWrapper(this);
      }
    }
    var ReactDOMInput = {
      getNativeProps: function (inst, props, context) {
        var value = LinkedValueUtils.getValue(props);
        var checked = LinkedValueUtils.getChecked(props);
        var nativeProps = assign({}, props, {
          defaultChecked: undefined,
          defaultValue: undefined,
          value: value != null ? value : inst._wrapperState.initialValue,
          checked: checked != null ? checked : inst._wrapperState.initialChecked,
          onChange: inst._wrapperState.onChange
        });
        return nativeProps;
      },
      mountWrapper: function (inst, props) {
        if ('production' !== 'production') {
          LinkedValueUtils.checkPropTypes('input', props, inst._currentElement._owner);
        }
        var defaultValue = props.defaultValue;
        inst._wrapperState = {
          initialChecked: props.defaultChecked || false,
          initialValue: defaultValue != null ? defaultValue : null,
          onChange: _handleChange.bind(inst)
        };
      },
      mountReadyWrapper: function (inst) {
        instancesByReactID[inst._rootNodeID] = inst;
      },
      unmountWrapper: function (inst) {
        delete instancesByReactID[inst._rootNodeID];
      },
      updateWrapper: function (inst) {
        var props = inst._currentElement.props;
        var checked = props.checked;
        if (checked != null) {
          ReactDOMIDOperations.updatePropertyByID(inst._rootNodeID, 'checked', checked || false);
        }
        var value = LinkedValueUtils.getValue(props);
        if (value != null) {
          ReactDOMIDOperations.updatePropertyByID(inst._rootNodeID, 'value', '' + value);
        }
      }
    };
    function _handleChange(event) {
      var props = this._currentElement.props;
      var returnValue = LinkedValueUtils.executeOnChange(props, event);
      ReactUpdates.asap(forceUpdateIfMounted, this);
      var name = props.name;
      if (props.type === 'radio' && name != null) {
        var rootNode = ReactMount.getNode(this._rootNodeID);
        var queryRoot = rootNode;
        while (queryRoot.parentNode) {
          queryRoot = queryRoot.parentNode;
        }
        var group = queryRoot.querySelectorAll('input[name=' + JSON.stringify('' + name) + '][type="radio"]');
        for (var i = 0; i < group.length; i++) {
          var otherNode = group[i];
          if (otherNode === rootNode || otherNode.form !== rootNode.form) {
            continue;
          }
          var otherID = ReactMount.getID(otherNode);
          !otherID ? 'production' !== 'production' ? invariant(false, 'ReactDOMInput: Mixing React and non-React radio inputs with the ' + 'same `name` is not supported.') : invariant(false) : undefined;
          var otherInstance = instancesByReactID[otherID];
          !otherInstance ? 'production' !== 'production' ? invariant(false, 'ReactDOMInput: Unknown radio button ID %s.', otherID) : invariant(false) : undefined;
          ReactUpdates.asap(forceUpdateIfMounted, otherInstance);
        }
      }
      return returnValue;
    }
    module.exports = ReactDOMInput;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
});
System.registerDynamic('npm:react@0.14.7/lib/ReactDOMOption.js', ['npm:react@0.14.7/lib/ReactChildren.js', 'npm:react@0.14.7/lib/ReactDOMSelect.js', 'npm:react@0.14.7/lib/Object.assign.js', 'npm:fbjs@0.6.1/lib/warning.js', 'github:jspm/nodelibs-process@0.1.2.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  (function (process) {
    'use strict';

    var ReactChildren = $__require('npm:react@0.14.7/lib/ReactChildren.js');
    var ReactDOMSelect = $__require('npm:react@0.14.7/lib/ReactDOMSelect.js');
    var assign = $__require('npm:react@0.14.7/lib/Object.assign.js');
    var warning = $__require('npm:fbjs@0.6.1/lib/warning.js');
    var valueContextKey = ReactDOMSelect.valueContextKey;
    var ReactDOMOption = {
      mountWrapper: function (inst, props, context) {
        if ('production' !== 'production') {
          'production' !== 'production' ? warning(props.selected == null, 'Use the `defaultValue` or `value` props on <select> instead of ' + 'setting `selected` on <option>.') : undefined;
        }
        var selectValue = context[valueContextKey];
        var selected = null;
        if (selectValue != null) {
          selected = false;
          if (Array.isArray(selectValue)) {
            for (var i = 0; i < selectValue.length; i++) {
              if ('' + selectValue[i] === '' + props.value) {
                selected = true;
                break;
              }
            }
          } else {
            selected = '' + selectValue === '' + props.value;
          }
        }
        inst._wrapperState = { selected: selected };
      },
      getNativeProps: function (inst, props, context) {
        var nativeProps = assign({
          selected: undefined,
          children: undefined
        }, props);
        if (inst._wrapperState.selected != null) {
          nativeProps.selected = inst._wrapperState.selected;
        }
        var content = '';
        ReactChildren.forEach(props.children, function (child) {
          if (child == null) {
            return;
          }
          if (typeof child === 'string' || typeof child === 'number') {
            content += child;
          } else {
            'production' !== 'production' ? warning(false, 'Only strings and numbers are supported as <option> children.') : undefined;
          }
        });
        if (content) {
          nativeProps.children = content;
        }
        return nativeProps;
      }
    };
    module.exports = ReactDOMOption;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
});
System.registerDynamic('npm:react@0.14.7/lib/ReactDOMSelect.js', ['npm:react@0.14.7/lib/LinkedValueUtils.js', 'npm:react@0.14.7/lib/ReactMount.js', 'npm:react@0.14.7/lib/ReactUpdates.js', 'npm:react@0.14.7/lib/Object.assign.js', 'npm:fbjs@0.6.1/lib/warning.js', 'github:jspm/nodelibs-process@0.1.2.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  (function (process) {
    'use strict';

    var LinkedValueUtils = $__require('npm:react@0.14.7/lib/LinkedValueUtils.js');
    var ReactMount = $__require('npm:react@0.14.7/lib/ReactMount.js');
    var ReactUpdates = $__require('npm:react@0.14.7/lib/ReactUpdates.js');
    var assign = $__require('npm:react@0.14.7/lib/Object.assign.js');
    var warning = $__require('npm:fbjs@0.6.1/lib/warning.js');
    var valueContextKey = '__ReactDOMSelect_value$' + Math.random().toString(36).slice(2);
    function updateOptionsIfPendingUpdateAndMounted() {
      if (this._rootNodeID && this._wrapperState.pendingUpdate) {
        this._wrapperState.pendingUpdate = false;
        var props = this._currentElement.props;
        var value = LinkedValueUtils.getValue(props);
        if (value != null) {
          updateOptions(this, Boolean(props.multiple), value);
        }
      }
    }
    function getDeclarationErrorAddendum(owner) {
      if (owner) {
        var name = owner.getName();
        if (name) {
          return ' Check the render method of `' + name + '`.';
        }
      }
      return '';
    }
    var valuePropNames = ['value', 'defaultValue'];
    function checkSelectPropTypes(inst, props) {
      var owner = inst._currentElement._owner;
      LinkedValueUtils.checkPropTypes('select', props, owner);
      for (var i = 0; i < valuePropNames.length; i++) {
        var propName = valuePropNames[i];
        if (props[propName] == null) {
          continue;
        }
        if (props.multiple) {
          'production' !== 'production' ? warning(Array.isArray(props[propName]), 'The `%s` prop supplied to <select> must be an array if ' + '`multiple` is true.%s', propName, getDeclarationErrorAddendum(owner)) : undefined;
        } else {
          'production' !== 'production' ? warning(!Array.isArray(props[propName]), 'The `%s` prop supplied to <select> must be a scalar ' + 'value if `multiple` is false.%s', propName, getDeclarationErrorAddendum(owner)) : undefined;
        }
      }
    }
    function updateOptions(inst, multiple, propValue) {
      var selectedValue, i;
      var options = ReactMount.getNode(inst._rootNodeID).options;
      if (multiple) {
        selectedValue = {};
        for (i = 0; i < propValue.length; i++) {
          selectedValue['' + propValue[i]] = true;
        }
        for (i = 0; i < options.length; i++) {
          var selected = selectedValue.hasOwnProperty(options[i].value);
          if (options[i].selected !== selected) {
            options[i].selected = selected;
          }
        }
      } else {
        selectedValue = '' + propValue;
        for (i = 0; i < options.length; i++) {
          if (options[i].value === selectedValue) {
            options[i].selected = true;
            return;
          }
        }
        if (options.length) {
          options[0].selected = true;
        }
      }
    }
    var ReactDOMSelect = {
      valueContextKey: valueContextKey,
      getNativeProps: function (inst, props, context) {
        return assign({}, props, {
          onChange: inst._wrapperState.onChange,
          value: undefined
        });
      },
      mountWrapper: function (inst, props) {
        if ('production' !== 'production') {
          checkSelectPropTypes(inst, props);
        }
        var value = LinkedValueUtils.getValue(props);
        inst._wrapperState = {
          pendingUpdate: false,
          initialValue: value != null ? value : props.defaultValue,
          onChange: _handleChange.bind(inst),
          wasMultiple: Boolean(props.multiple)
        };
      },
      processChildContext: function (inst, props, context) {
        var childContext = assign({}, context);
        childContext[valueContextKey] = inst._wrapperState.initialValue;
        return childContext;
      },
      postUpdateWrapper: function (inst) {
        var props = inst._currentElement.props;
        inst._wrapperState.initialValue = undefined;
        var wasMultiple = inst._wrapperState.wasMultiple;
        inst._wrapperState.wasMultiple = Boolean(props.multiple);
        var value = LinkedValueUtils.getValue(props);
        if (value != null) {
          inst._wrapperState.pendingUpdate = false;
          updateOptions(inst, Boolean(props.multiple), value);
        } else if (wasMultiple !== Boolean(props.multiple)) {
          if (props.defaultValue != null) {
            updateOptions(inst, Boolean(props.multiple), props.defaultValue);
          } else {
            updateOptions(inst, Boolean(props.multiple), props.multiple ? [] : '');
          }
        }
      }
    };
    function _handleChange(event) {
      var props = this._currentElement.props;
      var returnValue = LinkedValueUtils.executeOnChange(props, event);
      this._wrapperState.pendingUpdate = true;
      ReactUpdates.asap(updateOptionsIfPendingUpdateAndMounted, this);
      return returnValue;
    }
    module.exports = ReactDOMSelect;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
});
System.registerDynamic('npm:react@0.14.7/lib/LinkedValueUtils.js', ['npm:react@0.14.7/lib/ReactPropTypes.js', 'npm:react@0.14.7/lib/ReactPropTypeLocations.js', 'npm:fbjs@0.6.1/lib/invariant.js', 'npm:fbjs@0.6.1/lib/warning.js', 'github:jspm/nodelibs-process@0.1.2.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  (function (process) {
    'use strict';

    var ReactPropTypes = $__require('npm:react@0.14.7/lib/ReactPropTypes.js');
    var ReactPropTypeLocations = $__require('npm:react@0.14.7/lib/ReactPropTypeLocations.js');
    var invariant = $__require('npm:fbjs@0.6.1/lib/invariant.js');
    var warning = $__require('npm:fbjs@0.6.1/lib/warning.js');
    var hasReadOnlyValue = {
      'button': true,
      'checkbox': true,
      'image': true,
      'hidden': true,
      'radio': true,
      'reset': true,
      'submit': true
    };
    function _assertSingleLink(inputProps) {
      !(inputProps.checkedLink == null || inputProps.valueLink == null) ? 'production' !== 'production' ? invariant(false, 'Cannot provide a checkedLink and a valueLink. If you want to use ' + 'checkedLink, you probably don\'t want to use valueLink and vice versa.') : invariant(false) : undefined;
    }
    function _assertValueLink(inputProps) {
      _assertSingleLink(inputProps);
      !(inputProps.value == null && inputProps.onChange == null) ? 'production' !== 'production' ? invariant(false, 'Cannot provide a valueLink and a value or onChange event. If you want ' + 'to use value or onChange, you probably don\'t want to use valueLink.') : invariant(false) : undefined;
    }
    function _assertCheckedLink(inputProps) {
      _assertSingleLink(inputProps);
      !(inputProps.checked == null && inputProps.onChange == null) ? 'production' !== 'production' ? invariant(false, 'Cannot provide a checkedLink and a checked property or onChange event. ' + 'If you want to use checked or onChange, you probably don\'t want to ' + 'use checkedLink') : invariant(false) : undefined;
    }
    var propTypes = {
      value: function (props, propName, componentName) {
        if (!props[propName] || hasReadOnlyValue[props.type] || props.onChange || props.readOnly || props.disabled) {
          return null;
        }
        return new Error('You provided a `value` prop to a form field without an ' + '`onChange` handler. This will render a read-only field. If ' + 'the field should be mutable use `defaultValue`. Otherwise, ' + 'set either `onChange` or `readOnly`.');
      },
      checked: function (props, propName, componentName) {
        if (!props[propName] || props.onChange || props.readOnly || props.disabled) {
          return null;
        }
        return new Error('You provided a `checked` prop to a form field without an ' + '`onChange` handler. This will render a read-only field. If ' + 'the field should be mutable use `defaultChecked`. Otherwise, ' + 'set either `onChange` or `readOnly`.');
      },
      onChange: ReactPropTypes.func
    };
    var loggedTypeFailures = {};
    function getDeclarationErrorAddendum(owner) {
      if (owner) {
        var name = owner.getName();
        if (name) {
          return ' Check the render method of `' + name + '`.';
        }
      }
      return '';
    }
    var LinkedValueUtils = {
      checkPropTypes: function (tagName, props, owner) {
        for (var propName in propTypes) {
          if (propTypes.hasOwnProperty(propName)) {
            var error = propTypes[propName](props, propName, tagName, ReactPropTypeLocations.prop);
          }
          if (error instanceof Error && !(error.message in loggedTypeFailures)) {
            loggedTypeFailures[error.message] = true;
            var addendum = getDeclarationErrorAddendum(owner);
            'production' !== 'production' ? warning(false, 'Failed form propType: %s%s', error.message, addendum) : undefined;
          }
        }
      },
      getValue: function (inputProps) {
        if (inputProps.valueLink) {
          _assertValueLink(inputProps);
          return inputProps.valueLink.value;
        }
        return inputProps.value;
      },
      getChecked: function (inputProps) {
        if (inputProps.checkedLink) {
          _assertCheckedLink(inputProps);
          return inputProps.checkedLink.value;
        }
        return inputProps.checked;
      },
      executeOnChange: function (inputProps, event) {
        if (inputProps.valueLink) {
          _assertValueLink(inputProps);
          return inputProps.valueLink.requestChange(event.target.value);
        } else if (inputProps.checkedLink) {
          _assertCheckedLink(inputProps);
          return inputProps.checkedLink.requestChange(event.target.checked);
        } else if (inputProps.onChange) {
          return inputProps.onChange.call(undefined, event);
        }
      }
    };
    module.exports = LinkedValueUtils;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
});
System.registerDynamic('npm:react@0.14.7/lib/ReactDOMTextarea.js', ['npm:react@0.14.7/lib/LinkedValueUtils.js', 'npm:react@0.14.7/lib/ReactDOMIDOperations.js', 'npm:react@0.14.7/lib/ReactUpdates.js', 'npm:react@0.14.7/lib/Object.assign.js', 'npm:fbjs@0.6.1/lib/invariant.js', 'npm:fbjs@0.6.1/lib/warning.js', 'github:jspm/nodelibs-process@0.1.2.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  (function (process) {
    'use strict';

    var LinkedValueUtils = $__require('npm:react@0.14.7/lib/LinkedValueUtils.js');
    var ReactDOMIDOperations = $__require('npm:react@0.14.7/lib/ReactDOMIDOperations.js');
    var ReactUpdates = $__require('npm:react@0.14.7/lib/ReactUpdates.js');
    var assign = $__require('npm:react@0.14.7/lib/Object.assign.js');
    var invariant = $__require('npm:fbjs@0.6.1/lib/invariant.js');
    var warning = $__require('npm:fbjs@0.6.1/lib/warning.js');
    function forceUpdateIfMounted() {
      if (this._rootNodeID) {
        ReactDOMTextarea.updateWrapper(this);
      }
    }
    var ReactDOMTextarea = {
      getNativeProps: function (inst, props, context) {
        !(props.dangerouslySetInnerHTML == null) ? 'production' !== 'production' ? invariant(false, '`dangerouslySetInnerHTML` does not make sense on <textarea>.') : invariant(false) : undefined;
        var nativeProps = assign({}, props, {
          defaultValue: undefined,
          value: undefined,
          children: inst._wrapperState.initialValue,
          onChange: inst._wrapperState.onChange
        });
        return nativeProps;
      },
      mountWrapper: function (inst, props) {
        if ('production' !== 'production') {
          LinkedValueUtils.checkPropTypes('textarea', props, inst._currentElement._owner);
        }
        var defaultValue = props.defaultValue;
        var children = props.children;
        if (children != null) {
          if ('production' !== 'production') {
            'production' !== 'production' ? warning(false, 'Use the `defaultValue` or `value` props instead of setting ' + 'children on <textarea>.') : undefined;
          }
          !(defaultValue == null) ? 'production' !== 'production' ? invariant(false, 'If you supply `defaultValue` on a <textarea>, do not pass children.') : invariant(false) : undefined;
          if (Array.isArray(children)) {
            !(children.length <= 1) ? 'production' !== 'production' ? invariant(false, '<textarea> can only have at most one child.') : invariant(false) : undefined;
            children = children[0];
          }
          defaultValue = '' + children;
        }
        if (defaultValue == null) {
          defaultValue = '';
        }
        var value = LinkedValueUtils.getValue(props);
        inst._wrapperState = {
          initialValue: '' + (value != null ? value : defaultValue),
          onChange: _handleChange.bind(inst)
        };
      },
      updateWrapper: function (inst) {
        var props = inst._currentElement.props;
        var value = LinkedValueUtils.getValue(props);
        if (value != null) {
          ReactDOMIDOperations.updatePropertyByID(inst._rootNodeID, 'value', '' + value);
        }
      }
    };
    function _handleChange(event) {
      var props = this._currentElement.props;
      var returnValue = LinkedValueUtils.executeOnChange(props, event);
      ReactUpdates.asap(forceUpdateIfMounted, this);
      return returnValue;
    }
    module.exports = ReactDOMTextarea;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
});
System.registerDynamic('npm:react@0.14.7/lib/ReactChildReconciler.js', ['npm:react@0.14.7/lib/ReactReconciler.js', 'npm:react@0.14.7/lib/instantiateReactComponent.js', 'npm:react@0.14.7/lib/shouldUpdateReactComponent.js', 'npm:react@0.14.7/lib/traverseAllChildren.js', 'npm:fbjs@0.6.1/lib/warning.js', 'github:jspm/nodelibs-process@0.1.2.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  (function (process) {
    'use strict';

    var ReactReconciler = $__require('npm:react@0.14.7/lib/ReactReconciler.js');
    var instantiateReactComponent = $__require('npm:react@0.14.7/lib/instantiateReactComponent.js');
    var shouldUpdateReactComponent = $__require('npm:react@0.14.7/lib/shouldUpdateReactComponent.js');
    var traverseAllChildren = $__require('npm:react@0.14.7/lib/traverseAllChildren.js');
    var warning = $__require('npm:fbjs@0.6.1/lib/warning.js');
    function instantiateChild(childInstances, child, name) {
      var keyUnique = childInstances[name] === undefined;
      if ('production' !== 'production') {
        'production' !== 'production' ? warning(keyUnique, 'flattenChildren(...): Encountered two children with the same key, ' + '`%s`. Child keys must be unique; when two children share a key, only ' + 'the first child will be used.', name) : undefined;
      }
      if (child != null && keyUnique) {
        childInstances[name] = instantiateReactComponent(child, null);
      }
    }
    var ReactChildReconciler = {
      instantiateChildren: function (nestedChildNodes, transaction, context) {
        if (nestedChildNodes == null) {
          return null;
        }
        var childInstances = {};
        traverseAllChildren(nestedChildNodes, instantiateChild, childInstances);
        return childInstances;
      },
      updateChildren: function (prevChildren, nextChildren, transaction, context) {
        if (!nextChildren && !prevChildren) {
          return null;
        }
        var name;
        for (name in nextChildren) {
          if (!nextChildren.hasOwnProperty(name)) {
            continue;
          }
          var prevChild = prevChildren && prevChildren[name];
          var prevElement = prevChild && prevChild._currentElement;
          var nextElement = nextChildren[name];
          if (prevChild != null && shouldUpdateReactComponent(prevElement, nextElement)) {
            ReactReconciler.receiveComponent(prevChild, nextElement, transaction, context);
            nextChildren[name] = prevChild;
          } else {
            if (prevChild) {
              ReactReconciler.unmountComponent(prevChild, name);
            }
            var nextChildInstance = instantiateReactComponent(nextElement, null);
            nextChildren[name] = nextChildInstance;
          }
        }
        for (name in prevChildren) {
          if (prevChildren.hasOwnProperty(name) && !(nextChildren && nextChildren.hasOwnProperty(name))) {
            ReactReconciler.unmountComponent(prevChildren[name]);
          }
        }
        return nextChildren;
      },
      unmountChildren: function (renderedChildren) {
        for (var name in renderedChildren) {
          if (renderedChildren.hasOwnProperty(name)) {
            var renderedChild = renderedChildren[name];
            ReactReconciler.unmountComponent(renderedChild);
          }
        }
      }
    };
    module.exports = ReactChildReconciler;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
});
System.registerDynamic('npm:react@0.14.7/lib/flattenChildren.js', ['npm:react@0.14.7/lib/traverseAllChildren.js', 'npm:fbjs@0.6.1/lib/warning.js', 'github:jspm/nodelibs-process@0.1.2.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  (function (process) {
    'use strict';

    var traverseAllChildren = $__require('npm:react@0.14.7/lib/traverseAllChildren.js');
    var warning = $__require('npm:fbjs@0.6.1/lib/warning.js');
    function flattenSingleChildIntoContext(traverseContext, child, name) {
      var result = traverseContext;
      var keyUnique = result[name] === undefined;
      if ('production' !== 'production') {
        'production' !== 'production' ? warning(keyUnique, 'flattenChildren(...): Encountered two children with the same key, ' + '`%s`. Child keys must be unique; when two children share a key, only ' + 'the first child will be used.', name) : undefined;
      }
      if (keyUnique && child != null) {
        result[name] = child;
      }
    }
    function flattenChildren(children) {
      if (children == null) {
        return children;
      }
      var result = {};
      traverseAllChildren(children, flattenSingleChildIntoContext, result);
      return result;
    }
    module.exports = flattenChildren;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
});
System.registerDynamic('npm:react@0.14.7/lib/ReactMultiChild.js', ['npm:react@0.14.7/lib/ReactComponentEnvironment.js', 'npm:react@0.14.7/lib/ReactMultiChildUpdateTypes.js', 'npm:react@0.14.7/lib/ReactCurrentOwner.js', 'npm:react@0.14.7/lib/ReactReconciler.js', 'npm:react@0.14.7/lib/ReactChildReconciler.js', 'npm:react@0.14.7/lib/flattenChildren.js', 'github:jspm/nodelibs-process@0.1.2.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  (function (process) {
    'use strict';

    var ReactComponentEnvironment = $__require('npm:react@0.14.7/lib/ReactComponentEnvironment.js');
    var ReactMultiChildUpdateTypes = $__require('npm:react@0.14.7/lib/ReactMultiChildUpdateTypes.js');
    var ReactCurrentOwner = $__require('npm:react@0.14.7/lib/ReactCurrentOwner.js');
    var ReactReconciler = $__require('npm:react@0.14.7/lib/ReactReconciler.js');
    var ReactChildReconciler = $__require('npm:react@0.14.7/lib/ReactChildReconciler.js');
    var flattenChildren = $__require('npm:react@0.14.7/lib/flattenChildren.js');
    var updateDepth = 0;
    var updateQueue = [];
    var markupQueue = [];
    function enqueueInsertMarkup(parentID, markup, toIndex) {
      updateQueue.push({
        parentID: parentID,
        parentNode: null,
        type: ReactMultiChildUpdateTypes.INSERT_MARKUP,
        markupIndex: markupQueue.push(markup) - 1,
        content: null,
        fromIndex: null,
        toIndex: toIndex
      });
    }
    function enqueueMove(parentID, fromIndex, toIndex) {
      updateQueue.push({
        parentID: parentID,
        parentNode: null,
        type: ReactMultiChildUpdateTypes.MOVE_EXISTING,
        markupIndex: null,
        content: null,
        fromIndex: fromIndex,
        toIndex: toIndex
      });
    }
    function enqueueRemove(parentID, fromIndex) {
      updateQueue.push({
        parentID: parentID,
        parentNode: null,
        type: ReactMultiChildUpdateTypes.REMOVE_NODE,
        markupIndex: null,
        content: null,
        fromIndex: fromIndex,
        toIndex: null
      });
    }
    function enqueueSetMarkup(parentID, markup) {
      updateQueue.push({
        parentID: parentID,
        parentNode: null,
        type: ReactMultiChildUpdateTypes.SET_MARKUP,
        markupIndex: null,
        content: markup,
        fromIndex: null,
        toIndex: null
      });
    }
    function enqueueTextContent(parentID, textContent) {
      updateQueue.push({
        parentID: parentID,
        parentNode: null,
        type: ReactMultiChildUpdateTypes.TEXT_CONTENT,
        markupIndex: null,
        content: textContent,
        fromIndex: null,
        toIndex: null
      });
    }
    function processQueue() {
      if (updateQueue.length) {
        ReactComponentEnvironment.processChildrenUpdates(updateQueue, markupQueue);
        clearQueue();
      }
    }
    function clearQueue() {
      updateQueue.length = 0;
      markupQueue.length = 0;
    }
    var ReactMultiChild = { Mixin: {
        _reconcilerInstantiateChildren: function (nestedChildren, transaction, context) {
          if ('production' !== 'production') {
            if (this._currentElement) {
              try {
                ReactCurrentOwner.current = this._currentElement._owner;
                return ReactChildReconciler.instantiateChildren(nestedChildren, transaction, context);
              } finally {
                ReactCurrentOwner.current = null;
              }
            }
          }
          return ReactChildReconciler.instantiateChildren(nestedChildren, transaction, context);
        },
        _reconcilerUpdateChildren: function (prevChildren, nextNestedChildrenElements, transaction, context) {
          var nextChildren;
          if ('production' !== 'production') {
            if (this._currentElement) {
              try {
                ReactCurrentOwner.current = this._currentElement._owner;
                nextChildren = flattenChildren(nextNestedChildrenElements);
              } finally {
                ReactCurrentOwner.current = null;
              }
              return ReactChildReconciler.updateChildren(prevChildren, nextChildren, transaction, context);
            }
          }
          nextChildren = flattenChildren(nextNestedChildrenElements);
          return ReactChildReconciler.updateChildren(prevChildren, nextChildren, transaction, context);
        },
        mountChildren: function (nestedChildren, transaction, context) {
          var children = this._reconcilerInstantiateChildren(nestedChildren, transaction, context);
          this._renderedChildren = children;
          var mountImages = [];
          var index = 0;
          for (var name in children) {
            if (children.hasOwnProperty(name)) {
              var child = children[name];
              var rootID = this._rootNodeID + name;
              var mountImage = ReactReconciler.mountComponent(child, rootID, transaction, context);
              child._mountIndex = index++;
              mountImages.push(mountImage);
            }
          }
          return mountImages;
        },
        updateTextContent: function (nextContent) {
          updateDepth++;
          var errorThrown = true;
          try {
            var prevChildren = this._renderedChildren;
            ReactChildReconciler.unmountChildren(prevChildren);
            for (var name in prevChildren) {
              if (prevChildren.hasOwnProperty(name)) {
                this._unmountChild(prevChildren[name]);
              }
            }
            this.setTextContent(nextContent);
            errorThrown = false;
          } finally {
            updateDepth--;
            if (!updateDepth) {
              if (errorThrown) {
                clearQueue();
              } else {
                processQueue();
              }
            }
          }
        },
        updateMarkup: function (nextMarkup) {
          updateDepth++;
          var errorThrown = true;
          try {
            var prevChildren = this._renderedChildren;
            ReactChildReconciler.unmountChildren(prevChildren);
            for (var name in prevChildren) {
              if (prevChildren.hasOwnProperty(name)) {
                this._unmountChildByName(prevChildren[name], name);
              }
            }
            this.setMarkup(nextMarkup);
            errorThrown = false;
          } finally {
            updateDepth--;
            if (!updateDepth) {
              if (errorThrown) {
                clearQueue();
              } else {
                processQueue();
              }
            }
          }
        },
        updateChildren: function (nextNestedChildrenElements, transaction, context) {
          updateDepth++;
          var errorThrown = true;
          try {
            this._updateChildren(nextNestedChildrenElements, transaction, context);
            errorThrown = false;
          } finally {
            updateDepth--;
            if (!updateDepth) {
              if (errorThrown) {
                clearQueue();
              } else {
                processQueue();
              }
            }
          }
        },
        _updateChildren: function (nextNestedChildrenElements, transaction, context) {
          var prevChildren = this._renderedChildren;
          var nextChildren = this._reconcilerUpdateChildren(prevChildren, nextNestedChildrenElements, transaction, context);
          this._renderedChildren = nextChildren;
          if (!nextChildren && !prevChildren) {
            return;
          }
          var name;
          var lastIndex = 0;
          var nextIndex = 0;
          for (name in nextChildren) {
            if (!nextChildren.hasOwnProperty(name)) {
              continue;
            }
            var prevChild = prevChildren && prevChildren[name];
            var nextChild = nextChildren[name];
            if (prevChild === nextChild) {
              this.moveChild(prevChild, nextIndex, lastIndex);
              lastIndex = Math.max(prevChild._mountIndex, lastIndex);
              prevChild._mountIndex = nextIndex;
            } else {
              if (prevChild) {
                lastIndex = Math.max(prevChild._mountIndex, lastIndex);
                this._unmountChild(prevChild);
              }
              this._mountChildByNameAtIndex(nextChild, name, nextIndex, transaction, context);
            }
            nextIndex++;
          }
          for (name in prevChildren) {
            if (prevChildren.hasOwnProperty(name) && !(nextChildren && nextChildren.hasOwnProperty(name))) {
              this._unmountChild(prevChildren[name]);
            }
          }
        },
        unmountChildren: function () {
          var renderedChildren = this._renderedChildren;
          ReactChildReconciler.unmountChildren(renderedChildren);
          this._renderedChildren = null;
        },
        moveChild: function (child, toIndex, lastIndex) {
          if (child._mountIndex < lastIndex) {
            enqueueMove(this._rootNodeID, child._mountIndex, toIndex);
          }
        },
        createChild: function (child, mountImage) {
          enqueueInsertMarkup(this._rootNodeID, mountImage, child._mountIndex);
        },
        removeChild: function (child) {
          enqueueRemove(this._rootNodeID, child._mountIndex);
        },
        setTextContent: function (textContent) {
          enqueueTextContent(this._rootNodeID, textContent);
        },
        setMarkup: function (markup) {
          enqueueSetMarkup(this._rootNodeID, markup);
        },
        _mountChildByNameAtIndex: function (child, name, index, transaction, context) {
          var rootID = this._rootNodeID + name;
          var mountImage = ReactReconciler.mountComponent(child, rootID, transaction, context);
          child._mountIndex = index;
          this.createChild(child, mountImage);
        },
        _unmountChild: function (child) {
          this.removeChild(child);
          child._mountIndex = null;
        }
      } };
    module.exports = ReactMultiChild;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
});
System.registerDynamic('npm:react@0.14.7/lib/ReactDOMComponent.js', ['npm:react@0.14.7/lib/AutoFocusUtils.js', 'npm:react@0.14.7/lib/CSSPropertyOperations.js', 'npm:react@0.14.7/lib/DOMProperty.js', 'npm:react@0.14.7/lib/DOMPropertyOperations.js', 'npm:react@0.14.7/lib/EventConstants.js', 'npm:react@0.14.7/lib/ReactBrowserEventEmitter.js', 'npm:react@0.14.7/lib/ReactComponentBrowserEnvironment.js', 'npm:react@0.14.7/lib/ReactDOMButton.js', 'npm:react@0.14.7/lib/ReactDOMInput.js', 'npm:react@0.14.7/lib/ReactDOMOption.js', 'npm:react@0.14.7/lib/ReactDOMSelect.js', 'npm:react@0.14.7/lib/ReactDOMTextarea.js', 'npm:react@0.14.7/lib/ReactMount.js', 'npm:react@0.14.7/lib/ReactMultiChild.js', 'npm:react@0.14.7/lib/ReactPerf.js', 'npm:react@0.14.7/lib/ReactUpdateQueue.js', 'npm:react@0.14.7/lib/Object.assign.js', 'npm:react@0.14.7/lib/canDefineProperty.js', 'npm:react@0.14.7/lib/escapeTextContentForBrowser.js', 'npm:fbjs@0.6.1/lib/invariant.js', 'npm:react@0.14.7/lib/isEventSupported.js', 'npm:fbjs@0.6.1/lib/keyOf.js', 'npm:react@0.14.7/lib/setInnerHTML.js', 'npm:react@0.14.7/lib/setTextContent.js', 'npm:fbjs@0.6.1/lib/shallowEqual.js', 'npm:react@0.14.7/lib/validateDOMNesting.js', 'npm:fbjs@0.6.1/lib/warning.js', 'github:jspm/nodelibs-process@0.1.2.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  (function (process) {
    'use strict';

    var AutoFocusUtils = $__require('npm:react@0.14.7/lib/AutoFocusUtils.js');
    var CSSPropertyOperations = $__require('npm:react@0.14.7/lib/CSSPropertyOperations.js');
    var DOMProperty = $__require('npm:react@0.14.7/lib/DOMProperty.js');
    var DOMPropertyOperations = $__require('npm:react@0.14.7/lib/DOMPropertyOperations.js');
    var EventConstants = $__require('npm:react@0.14.7/lib/EventConstants.js');
    var ReactBrowserEventEmitter = $__require('npm:react@0.14.7/lib/ReactBrowserEventEmitter.js');
    var ReactComponentBrowserEnvironment = $__require('npm:react@0.14.7/lib/ReactComponentBrowserEnvironment.js');
    var ReactDOMButton = $__require('npm:react@0.14.7/lib/ReactDOMButton.js');
    var ReactDOMInput = $__require('npm:react@0.14.7/lib/ReactDOMInput.js');
    var ReactDOMOption = $__require('npm:react@0.14.7/lib/ReactDOMOption.js');
    var ReactDOMSelect = $__require('npm:react@0.14.7/lib/ReactDOMSelect.js');
    var ReactDOMTextarea = $__require('npm:react@0.14.7/lib/ReactDOMTextarea.js');
    var ReactMount = $__require('npm:react@0.14.7/lib/ReactMount.js');
    var ReactMultiChild = $__require('npm:react@0.14.7/lib/ReactMultiChild.js');
    var ReactPerf = $__require('npm:react@0.14.7/lib/ReactPerf.js');
    var ReactUpdateQueue = $__require('npm:react@0.14.7/lib/ReactUpdateQueue.js');
    var assign = $__require('npm:react@0.14.7/lib/Object.assign.js');
    var canDefineProperty = $__require('npm:react@0.14.7/lib/canDefineProperty.js');
    var escapeTextContentForBrowser = $__require('npm:react@0.14.7/lib/escapeTextContentForBrowser.js');
    var invariant = $__require('npm:fbjs@0.6.1/lib/invariant.js');
    var isEventSupported = $__require('npm:react@0.14.7/lib/isEventSupported.js');
    var keyOf = $__require('npm:fbjs@0.6.1/lib/keyOf.js');
    var setInnerHTML = $__require('npm:react@0.14.7/lib/setInnerHTML.js');
    var setTextContent = $__require('npm:react@0.14.7/lib/setTextContent.js');
    var shallowEqual = $__require('npm:fbjs@0.6.1/lib/shallowEqual.js');
    var validateDOMNesting = $__require('npm:react@0.14.7/lib/validateDOMNesting.js');
    var warning = $__require('npm:fbjs@0.6.1/lib/warning.js');
    var deleteListener = ReactBrowserEventEmitter.deleteListener;
    var listenTo = ReactBrowserEventEmitter.listenTo;
    var registrationNameModules = ReactBrowserEventEmitter.registrationNameModules;
    var CONTENT_TYPES = {
      'string': true,
      'number': true
    };
    var CHILDREN = keyOf({ children: null });
    var STYLE = keyOf({ style: null });
    var HTML = keyOf({ __html: null });
    var ELEMENT_NODE_TYPE = 1;
    function getDeclarationErrorAddendum(internalInstance) {
      if (internalInstance) {
        var owner = internalInstance._currentElement._owner || null;
        if (owner) {
          var name = owner.getName();
          if (name) {
            return ' This DOM node was rendered by `' + name + '`.';
          }
        }
      }
      return '';
    }
    var legacyPropsDescriptor;
    if ('production' !== 'production') {
      legacyPropsDescriptor = { props: {
          enumerable: false,
          get: function () {
            var component = this._reactInternalComponent;
            'production' !== 'production' ? warning(false, 'ReactDOMComponent: Do not access .props of a DOM node; instead, ' + 'recreate the props as `render` did originally or read the DOM ' + 'properties/attributes directly from this node (e.g., ' + 'this.refs.box.className).%s', getDeclarationErrorAddendum(component)) : undefined;
            return component._currentElement.props;
          }
        } };
    }
    function legacyGetDOMNode() {
      if ('production' !== 'production') {
        var component = this._reactInternalComponent;
        'production' !== 'production' ? warning(false, 'ReactDOMComponent: Do not access .getDOMNode() of a DOM node; ' + 'instead, use the node directly.%s', getDeclarationErrorAddendum(component)) : undefined;
      }
      return this;
    }
    function legacyIsMounted() {
      var component = this._reactInternalComponent;
      if ('production' !== 'production') {
        'production' !== 'production' ? warning(false, 'ReactDOMComponent: Do not access .isMounted() of a DOM node.%s', getDeclarationErrorAddendum(component)) : undefined;
      }
      return !!component;
    }
    function legacySetStateEtc() {
      if ('production' !== 'production') {
        var component = this._reactInternalComponent;
        'production' !== 'production' ? warning(false, 'ReactDOMComponent: Do not access .setState(), .replaceState(), or ' + '.forceUpdate() of a DOM node. This is a no-op.%s', getDeclarationErrorAddendum(component)) : undefined;
      }
    }
    function legacySetProps(partialProps, callback) {
      var component = this._reactInternalComponent;
      if ('production' !== 'production') {
        'production' !== 'production' ? warning(false, 'ReactDOMComponent: Do not access .setProps() of a DOM node. ' + 'Instead, call ReactDOM.render again at the top level.%s', getDeclarationErrorAddendum(component)) : undefined;
      }
      if (!component) {
        return;
      }
      ReactUpdateQueue.enqueueSetPropsInternal(component, partialProps);
      if (callback) {
        ReactUpdateQueue.enqueueCallbackInternal(component, callback);
      }
    }
    function legacyReplaceProps(partialProps, callback) {
      var component = this._reactInternalComponent;
      if ('production' !== 'production') {
        'production' !== 'production' ? warning(false, 'ReactDOMComponent: Do not access .replaceProps() of a DOM node. ' + 'Instead, call ReactDOM.render again at the top level.%s', getDeclarationErrorAddendum(component)) : undefined;
      }
      if (!component) {
        return;
      }
      ReactUpdateQueue.enqueueReplacePropsInternal(component, partialProps);
      if (callback) {
        ReactUpdateQueue.enqueueCallbackInternal(component, callback);
      }
    }
    function friendlyStringify(obj) {
      if (typeof obj === 'object') {
        if (Array.isArray(obj)) {
          return '[' + obj.map(friendlyStringify).join(', ') + ']';
        } else {
          var pairs = [];
          for (var key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
              var keyEscaped = /^[a-z$_][\w$_]*$/i.test(key) ? key : JSON.stringify(key);
              pairs.push(keyEscaped + ': ' + friendlyStringify(obj[key]));
            }
          }
          return '{' + pairs.join(', ') + '}';
        }
      } else if (typeof obj === 'string') {
        return JSON.stringify(obj);
      } else if (typeof obj === 'function') {
        return '[function object]';
      }
      return String(obj);
    }
    var styleMutationWarning = {};
    function checkAndWarnForMutatedStyle(style1, style2, component) {
      if (style1 == null || style2 == null) {
        return;
      }
      if (shallowEqual(style1, style2)) {
        return;
      }
      var componentName = component._tag;
      var owner = component._currentElement._owner;
      var ownerName;
      if (owner) {
        ownerName = owner.getName();
      }
      var hash = ownerName + '|' + componentName;
      if (styleMutationWarning.hasOwnProperty(hash)) {
        return;
      }
      styleMutationWarning[hash] = true;
      'production' !== 'production' ? warning(false, '`%s` was passed a style object that has previously been mutated. ' + 'Mutating `style` is deprecated. Consider cloning it beforehand. Check ' + 'the `render` %s. Previous style: %s. Mutated style: %s.', componentName, owner ? 'of `' + ownerName + '`' : 'using <' + componentName + '>', friendlyStringify(style1), friendlyStringify(style2)) : undefined;
    }
    function assertValidProps(component, props) {
      if (!props) {
        return;
      }
      if ('production' !== 'production') {
        if (voidElementTags[component._tag]) {
          'production' !== 'production' ? warning(props.children == null && props.dangerouslySetInnerHTML == null, '%s is a void element tag and must not have `children` or ' + 'use `props.dangerouslySetInnerHTML`.%s', component._tag, component._currentElement._owner ? ' Check the render method of ' + component._currentElement._owner.getName() + '.' : '') : undefined;
        }
      }
      if (props.dangerouslySetInnerHTML != null) {
        !(props.children == null) ? 'production' !== 'production' ? invariant(false, 'Can only set one of `children` or `props.dangerouslySetInnerHTML`.') : invariant(false) : undefined;
        !(typeof props.dangerouslySetInnerHTML === 'object' && HTML in props.dangerouslySetInnerHTML) ? 'production' !== 'production' ? invariant(false, '`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. ' + 'Please visit https://fb.me/react-invariant-dangerously-set-inner-html ' + 'for more information.') : invariant(false) : undefined;
      }
      if ('production' !== 'production') {
        'production' !== 'production' ? warning(props.innerHTML == null, 'Directly setting property `innerHTML` is not permitted. ' + 'For more information, lookup documentation on `dangerouslySetInnerHTML`.') : undefined;
        'production' !== 'production' ? warning(!props.contentEditable || props.children == null, 'A component is `contentEditable` and contains `children` managed by ' + 'React. It is now your responsibility to guarantee that none of ' + 'those nodes are unexpectedly modified or duplicated. This is ' + 'probably not intentional.') : undefined;
      }
      !(props.style == null || typeof props.style === 'object') ? 'production' !== 'production' ? invariant(false, 'The `style` prop expects a mapping from style properties to values, ' + 'not a string. For example, style={{marginRight: spacing + \'em\'}} when ' + 'using JSX.%s', getDeclarationErrorAddendum(component)) : invariant(false) : undefined;
    }
    function enqueuePutListener(id, registrationName, listener, transaction) {
      if ('production' !== 'production') {
        'production' !== 'production' ? warning(registrationName !== 'onScroll' || isEventSupported('scroll', true), 'This browser doesn\'t support the `onScroll` event') : undefined;
      }
      var container = ReactMount.findReactContainerForID(id);
      if (container) {
        var doc = container.nodeType === ELEMENT_NODE_TYPE ? container.ownerDocument : container;
        listenTo(registrationName, doc);
      }
      transaction.getReactMountReady().enqueue(putListener, {
        id: id,
        registrationName: registrationName,
        listener: listener
      });
    }
    function putListener() {
      var listenerToPut = this;
      ReactBrowserEventEmitter.putListener(listenerToPut.id, listenerToPut.registrationName, listenerToPut.listener);
    }
    var mediaEvents = {
      topAbort: 'abort',
      topCanPlay: 'canplay',
      topCanPlayThrough: 'canplaythrough',
      topDurationChange: 'durationchange',
      topEmptied: 'emptied',
      topEncrypted: 'encrypted',
      topEnded: 'ended',
      topError: 'error',
      topLoadedData: 'loadeddata',
      topLoadedMetadata: 'loadedmetadata',
      topLoadStart: 'loadstart',
      topPause: 'pause',
      topPlay: 'play',
      topPlaying: 'playing',
      topProgress: 'progress',
      topRateChange: 'ratechange',
      topSeeked: 'seeked',
      topSeeking: 'seeking',
      topStalled: 'stalled',
      topSuspend: 'suspend',
      topTimeUpdate: 'timeupdate',
      topVolumeChange: 'volumechange',
      topWaiting: 'waiting'
    };
    function trapBubbledEventsLocal() {
      var inst = this;
      !inst._rootNodeID ? 'production' !== 'production' ? invariant(false, 'Must be mounted to trap events') : invariant(false) : undefined;
      var node = ReactMount.getNode(inst._rootNodeID);
      !node ? 'production' !== 'production' ? invariant(false, 'trapBubbledEvent(...): Requires node to be rendered.') : invariant(false) : undefined;
      switch (inst._tag) {
        case 'iframe':
          inst._wrapperState.listeners = [ReactBrowserEventEmitter.trapBubbledEvent(EventConstants.topLevelTypes.topLoad, 'load', node)];
          break;
        case 'video':
        case 'audio':
          inst._wrapperState.listeners = [];
          for (var event in mediaEvents) {
            if (mediaEvents.hasOwnProperty(event)) {
              inst._wrapperState.listeners.push(ReactBrowserEventEmitter.trapBubbledEvent(EventConstants.topLevelTypes[event], mediaEvents[event], node));
            }
          }
          break;
        case 'img':
          inst._wrapperState.listeners = [ReactBrowserEventEmitter.trapBubbledEvent(EventConstants.topLevelTypes.topError, 'error', node), ReactBrowserEventEmitter.trapBubbledEvent(EventConstants.topLevelTypes.topLoad, 'load', node)];
          break;
        case 'form':
          inst._wrapperState.listeners = [ReactBrowserEventEmitter.trapBubbledEvent(EventConstants.topLevelTypes.topReset, 'reset', node), ReactBrowserEventEmitter.trapBubbledEvent(EventConstants.topLevelTypes.topSubmit, 'submit', node)];
          break;
      }
    }
    function mountReadyInputWrapper() {
      ReactDOMInput.mountReadyWrapper(this);
    }
    function postUpdateSelectWrapper() {
      ReactDOMSelect.postUpdateWrapper(this);
    }
    var omittedCloseTags = {
      'area': true,
      'base': true,
      'br': true,
      'col': true,
      'embed': true,
      'hr': true,
      'img': true,
      'input': true,
      'keygen': true,
      'link': true,
      'meta': true,
      'param': true,
      'source': true,
      'track': true,
      'wbr': true
    };
    var newlineEatingTags = {
      'listing': true,
      'pre': true,
      'textarea': true
    };
    var voidElementTags = assign({ 'menuitem': true }, omittedCloseTags);
    var VALID_TAG_REGEX = /^[a-zA-Z][a-zA-Z:_\.\-\d]*$/;
    var validatedTagCache = {};
    var hasOwnProperty = {}.hasOwnProperty;
    function validateDangerousTag(tag) {
      if (!hasOwnProperty.call(validatedTagCache, tag)) {
        !VALID_TAG_REGEX.test(tag) ? 'production' !== 'production' ? invariant(false, 'Invalid tag: %s', tag) : invariant(false) : undefined;
        validatedTagCache[tag] = true;
      }
    }
    function processChildContextDev(context, inst) {
      context = assign({}, context);
      var info = context[validateDOMNesting.ancestorInfoContextKey];
      context[validateDOMNesting.ancestorInfoContextKey] = validateDOMNesting.updatedAncestorInfo(info, inst._tag, inst);
      return context;
    }
    function isCustomComponent(tagName, props) {
      return tagName.indexOf('-') >= 0 || props.is != null;
    }
    function ReactDOMComponent(tag) {
      validateDangerousTag(tag);
      this._tag = tag.toLowerCase();
      this._renderedChildren = null;
      this._previousStyle = null;
      this._previousStyleCopy = null;
      this._rootNodeID = null;
      this._wrapperState = null;
      this._topLevelWrapper = null;
      this._nodeWithLegacyProperties = null;
      if ('production' !== 'production') {
        this._unprocessedContextDev = null;
        this._processedContextDev = null;
      }
    }
    ReactDOMComponent.displayName = 'ReactDOMComponent';
    ReactDOMComponent.Mixin = {
      construct: function (element) {
        this._currentElement = element;
      },
      mountComponent: function (rootID, transaction, context) {
        this._rootNodeID = rootID;
        var props = this._currentElement.props;
        switch (this._tag) {
          case 'iframe':
          case 'img':
          case 'form':
          case 'video':
          case 'audio':
            this._wrapperState = { listeners: null };
            transaction.getReactMountReady().enqueue(trapBubbledEventsLocal, this);
            break;
          case 'button':
            props = ReactDOMButton.getNativeProps(this, props, context);
            break;
          case 'input':
            ReactDOMInput.mountWrapper(this, props, context);
            props = ReactDOMInput.getNativeProps(this, props, context);
            break;
          case 'option':
            ReactDOMOption.mountWrapper(this, props, context);
            props = ReactDOMOption.getNativeProps(this, props, context);
            break;
          case 'select':
            ReactDOMSelect.mountWrapper(this, props, context);
            props = ReactDOMSelect.getNativeProps(this, props, context);
            context = ReactDOMSelect.processChildContext(this, props, context);
            break;
          case 'textarea':
            ReactDOMTextarea.mountWrapper(this, props, context);
            props = ReactDOMTextarea.getNativeProps(this, props, context);
            break;
        }
        assertValidProps(this, props);
        if ('production' !== 'production') {
          if (context[validateDOMNesting.ancestorInfoContextKey]) {
            validateDOMNesting(this._tag, this, context[validateDOMNesting.ancestorInfoContextKey]);
          }
        }
        if ('production' !== 'production') {
          this._unprocessedContextDev = context;
          this._processedContextDev = processChildContextDev(context, this);
          context = this._processedContextDev;
        }
        var mountImage;
        if (transaction.useCreateElement) {
          var ownerDocument = context[ReactMount.ownerDocumentContextKey];
          var el = ownerDocument.createElement(this._currentElement.type);
          DOMPropertyOperations.setAttributeForID(el, this._rootNodeID);
          ReactMount.getID(el);
          this._updateDOMProperties({}, props, transaction, el);
          this._createInitialChildren(transaction, props, context, el);
          mountImage = el;
        } else {
          var tagOpen = this._createOpenTagMarkupAndPutListeners(transaction, props);
          var tagContent = this._createContentMarkup(transaction, props, context);
          if (!tagContent && omittedCloseTags[this._tag]) {
            mountImage = tagOpen + '/>';
          } else {
            mountImage = tagOpen + '>' + tagContent + '</' + this._currentElement.type + '>';
          }
        }
        switch (this._tag) {
          case 'input':
            transaction.getReactMountReady().enqueue(mountReadyInputWrapper, this);
          case 'button':
          case 'select':
          case 'textarea':
            if (props.autoFocus) {
              transaction.getReactMountReady().enqueue(AutoFocusUtils.focusDOMComponent, this);
            }
            break;
        }
        return mountImage;
      },
      _createOpenTagMarkupAndPutListeners: function (transaction, props) {
        var ret = '<' + this._currentElement.type;
        for (var propKey in props) {
          if (!props.hasOwnProperty(propKey)) {
            continue;
          }
          var propValue = props[propKey];
          if (propValue == null) {
            continue;
          }
          if (registrationNameModules.hasOwnProperty(propKey)) {
            if (propValue) {
              enqueuePutListener(this._rootNodeID, propKey, propValue, transaction);
            }
          } else {
            if (propKey === STYLE) {
              if (propValue) {
                if ('production' !== 'production') {
                  this._previousStyle = propValue;
                }
                propValue = this._previousStyleCopy = assign({}, props.style);
              }
              propValue = CSSPropertyOperations.createMarkupForStyles(propValue);
            }
            var markup = null;
            if (this._tag != null && isCustomComponent(this._tag, props)) {
              if (propKey !== CHILDREN) {
                markup = DOMPropertyOperations.createMarkupForCustomAttribute(propKey, propValue);
              }
            } else {
              markup = DOMPropertyOperations.createMarkupForProperty(propKey, propValue);
            }
            if (markup) {
              ret += ' ' + markup;
            }
          }
        }
        if (transaction.renderToStaticMarkup) {
          return ret;
        }
        var markupForID = DOMPropertyOperations.createMarkupForID(this._rootNodeID);
        return ret + ' ' + markupForID;
      },
      _createContentMarkup: function (transaction, props, context) {
        var ret = '';
        var innerHTML = props.dangerouslySetInnerHTML;
        if (innerHTML != null) {
          if (innerHTML.__html != null) {
            ret = innerHTML.__html;
          }
        } else {
          var contentToUse = CONTENT_TYPES[typeof props.children] ? props.children : null;
          var childrenToUse = contentToUse != null ? null : props.children;
          if (contentToUse != null) {
            ret = escapeTextContentForBrowser(contentToUse);
          } else if (childrenToUse != null) {
            var mountImages = this.mountChildren(childrenToUse, transaction, context);
            ret = mountImages.join('');
          }
        }
        if (newlineEatingTags[this._tag] && ret.charAt(0) === '\n') {
          return '\n' + ret;
        } else {
          return ret;
        }
      },
      _createInitialChildren: function (transaction, props, context, el) {
        var innerHTML = props.dangerouslySetInnerHTML;
        if (innerHTML != null) {
          if (innerHTML.__html != null) {
            setInnerHTML(el, innerHTML.__html);
          }
        } else {
          var contentToUse = CONTENT_TYPES[typeof props.children] ? props.children : null;
          var childrenToUse = contentToUse != null ? null : props.children;
          if (contentToUse != null) {
            setTextContent(el, contentToUse);
          } else if (childrenToUse != null) {
            var mountImages = this.mountChildren(childrenToUse, transaction, context);
            for (var i = 0; i < mountImages.length; i++) {
              el.appendChild(mountImages[i]);
            }
          }
        }
      },
      receiveComponent: function (nextElement, transaction, context) {
        var prevElement = this._currentElement;
        this._currentElement = nextElement;
        this.updateComponent(transaction, prevElement, nextElement, context);
      },
      updateComponent: function (transaction, prevElement, nextElement, context) {
        var lastProps = prevElement.props;
        var nextProps = this._currentElement.props;
        switch (this._tag) {
          case 'button':
            lastProps = ReactDOMButton.getNativeProps(this, lastProps);
            nextProps = ReactDOMButton.getNativeProps(this, nextProps);
            break;
          case 'input':
            ReactDOMInput.updateWrapper(this);
            lastProps = ReactDOMInput.getNativeProps(this, lastProps);
            nextProps = ReactDOMInput.getNativeProps(this, nextProps);
            break;
          case 'option':
            lastProps = ReactDOMOption.getNativeProps(this, lastProps);
            nextProps = ReactDOMOption.getNativeProps(this, nextProps);
            break;
          case 'select':
            lastProps = ReactDOMSelect.getNativeProps(this, lastProps);
            nextProps = ReactDOMSelect.getNativeProps(this, nextProps);
            break;
          case 'textarea':
            ReactDOMTextarea.updateWrapper(this);
            lastProps = ReactDOMTextarea.getNativeProps(this, lastProps);
            nextProps = ReactDOMTextarea.getNativeProps(this, nextProps);
            break;
        }
        if ('production' !== 'production') {
          if (this._unprocessedContextDev !== context) {
            this._unprocessedContextDev = context;
            this._processedContextDev = processChildContextDev(context, this);
          }
          context = this._processedContextDev;
        }
        assertValidProps(this, nextProps);
        this._updateDOMProperties(lastProps, nextProps, transaction, null);
        this._updateDOMChildren(lastProps, nextProps, transaction, context);
        if (!canDefineProperty && this._nodeWithLegacyProperties) {
          this._nodeWithLegacyProperties.props = nextProps;
        }
        if (this._tag === 'select') {
          transaction.getReactMountReady().enqueue(postUpdateSelectWrapper, this);
        }
      },
      _updateDOMProperties: function (lastProps, nextProps, transaction, node) {
        var propKey;
        var styleName;
        var styleUpdates;
        for (propKey in lastProps) {
          if (nextProps.hasOwnProperty(propKey) || !lastProps.hasOwnProperty(propKey)) {
            continue;
          }
          if (propKey === STYLE) {
            var lastStyle = this._previousStyleCopy;
            for (styleName in lastStyle) {
              if (lastStyle.hasOwnProperty(styleName)) {
                styleUpdates = styleUpdates || {};
                styleUpdates[styleName] = '';
              }
            }
            this._previousStyleCopy = null;
          } else if (registrationNameModules.hasOwnProperty(propKey)) {
            if (lastProps[propKey]) {
              deleteListener(this._rootNodeID, propKey);
            }
          } else if (DOMProperty.properties[propKey] || DOMProperty.isCustomAttribute(propKey)) {
            if (!node) {
              node = ReactMount.getNode(this._rootNodeID);
            }
            DOMPropertyOperations.deleteValueForProperty(node, propKey);
          }
        }
        for (propKey in nextProps) {
          var nextProp = nextProps[propKey];
          var lastProp = propKey === STYLE ? this._previousStyleCopy : lastProps[propKey];
          if (!nextProps.hasOwnProperty(propKey) || nextProp === lastProp) {
            continue;
          }
          if (propKey === STYLE) {
            if (nextProp) {
              if ('production' !== 'production') {
                checkAndWarnForMutatedStyle(this._previousStyleCopy, this._previousStyle, this);
                this._previousStyle = nextProp;
              }
              nextProp = this._previousStyleCopy = assign({}, nextProp);
            } else {
              this._previousStyleCopy = null;
            }
            if (lastProp) {
              for (styleName in lastProp) {
                if (lastProp.hasOwnProperty(styleName) && (!nextProp || !nextProp.hasOwnProperty(styleName))) {
                  styleUpdates = styleUpdates || {};
                  styleUpdates[styleName] = '';
                }
              }
              for (styleName in nextProp) {
                if (nextProp.hasOwnProperty(styleName) && lastProp[styleName] !== nextProp[styleName]) {
                  styleUpdates = styleUpdates || {};
                  styleUpdates[styleName] = nextProp[styleName];
                }
              }
            } else {
              styleUpdates = nextProp;
            }
          } else if (registrationNameModules.hasOwnProperty(propKey)) {
            if (nextProp) {
              enqueuePutListener(this._rootNodeID, propKey, nextProp, transaction);
            } else if (lastProp) {
              deleteListener(this._rootNodeID, propKey);
            }
          } else if (isCustomComponent(this._tag, nextProps)) {
            if (!node) {
              node = ReactMount.getNode(this._rootNodeID);
            }
            if (propKey === CHILDREN) {
              nextProp = null;
            }
            DOMPropertyOperations.setValueForAttribute(node, propKey, nextProp);
          } else if (DOMProperty.properties[propKey] || DOMProperty.isCustomAttribute(propKey)) {
            if (!node) {
              node = ReactMount.getNode(this._rootNodeID);
            }
            if (nextProp != null) {
              DOMPropertyOperations.setValueForProperty(node, propKey, nextProp);
            } else {
              DOMPropertyOperations.deleteValueForProperty(node, propKey);
            }
          }
        }
        if (styleUpdates) {
          if (!node) {
            node = ReactMount.getNode(this._rootNodeID);
          }
          CSSPropertyOperations.setValueForStyles(node, styleUpdates);
        }
      },
      _updateDOMChildren: function (lastProps, nextProps, transaction, context) {
        var lastContent = CONTENT_TYPES[typeof lastProps.children] ? lastProps.children : null;
        var nextContent = CONTENT_TYPES[typeof nextProps.children] ? nextProps.children : null;
        var lastHtml = lastProps.dangerouslySetInnerHTML && lastProps.dangerouslySetInnerHTML.__html;
        var nextHtml = nextProps.dangerouslySetInnerHTML && nextProps.dangerouslySetInnerHTML.__html;
        var lastChildren = lastContent != null ? null : lastProps.children;
        var nextChildren = nextContent != null ? null : nextProps.children;
        var lastHasContentOrHtml = lastContent != null || lastHtml != null;
        var nextHasContentOrHtml = nextContent != null || nextHtml != null;
        if (lastChildren != null && nextChildren == null) {
          this.updateChildren(null, transaction, context);
        } else if (lastHasContentOrHtml && !nextHasContentOrHtml) {
          this.updateTextContent('');
        }
        if (nextContent != null) {
          if (lastContent !== nextContent) {
            this.updateTextContent('' + nextContent);
          }
        } else if (nextHtml != null) {
          if (lastHtml !== nextHtml) {
            this.updateMarkup('' + nextHtml);
          }
        } else if (nextChildren != null) {
          this.updateChildren(nextChildren, transaction, context);
        }
      },
      unmountComponent: function () {
        switch (this._tag) {
          case 'iframe':
          case 'img':
          case 'form':
          case 'video':
          case 'audio':
            var listeners = this._wrapperState.listeners;
            if (listeners) {
              for (var i = 0; i < listeners.length; i++) {
                listeners[i].remove();
              }
            }
            break;
          case 'input':
            ReactDOMInput.unmountWrapper(this);
            break;
          case 'html':
          case 'head':
          case 'body':
            !false ? 'production' !== 'production' ? invariant(false, '<%s> tried to unmount. Because of cross-browser quirks it is ' + 'impossible to unmount some top-level components (eg <html>, ' + '<head>, and <body>) reliably and efficiently. To fix this, have a ' + 'single top-level component that never unmounts render these ' + 'elements.', this._tag) : invariant(false) : undefined;
            break;
        }
        this.unmountChildren();
        ReactBrowserEventEmitter.deleteAllListeners(this._rootNodeID);
        ReactComponentBrowserEnvironment.unmountIDFromEnvironment(this._rootNodeID);
        this._rootNodeID = null;
        this._wrapperState = null;
        if (this._nodeWithLegacyProperties) {
          var node = this._nodeWithLegacyProperties;
          node._reactInternalComponent = null;
          this._nodeWithLegacyProperties = null;
        }
      },
      getPublicInstance: function () {
        if (!this._nodeWithLegacyProperties) {
          var node = ReactMount.getNode(this._rootNodeID);
          node._reactInternalComponent = this;
          node.getDOMNode = legacyGetDOMNode;
          node.isMounted = legacyIsMounted;
          node.setState = legacySetStateEtc;
          node.replaceState = legacySetStateEtc;
          node.forceUpdate = legacySetStateEtc;
          node.setProps = legacySetProps;
          node.replaceProps = legacyReplaceProps;
          if ('production' !== 'production') {
            if (canDefineProperty) {
              Object.defineProperties(node, legacyPropsDescriptor);
            } else {
              node.props = this._currentElement.props;
            }
          } else {
            node.props = this._currentElement.props;
          }
          this._nodeWithLegacyProperties = node;
        }
        return this._nodeWithLegacyProperties;
      }
    };
    ReactPerf.measureMethods(ReactDOMComponent, 'ReactDOMComponent', {
      mountComponent: 'mountComponent',
      updateComponent: 'updateComponent'
    });
    assign(ReactDOMComponent.prototype, ReactDOMComponent.Mixin, ReactMultiChild.Mixin);
    module.exports = ReactDOMComponent;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
});
System.registerDynamic('npm:fbjs@0.6.1/lib/toArray.js', ['npm:fbjs@0.6.1/lib/invariant.js', 'github:jspm/nodelibs-process@0.1.2.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  (function (process) {
    'use strict';

    var invariant = $__require('npm:fbjs@0.6.1/lib/invariant.js');
    function toArray(obj) {
      var length = obj.length;
      !(!Array.isArray(obj) && (typeof obj === 'object' || typeof obj === 'function')) ? 'production' !== 'production' ? invariant(false, 'toArray: Array-like object expected') : invariant(false) : undefined;
      !(typeof length === 'number') ? 'production' !== 'production' ? invariant(false, 'toArray: Object needs a length property') : invariant(false) : undefined;
      !(length === 0 || length - 1 in obj) ? 'production' !== 'production' ? invariant(false, 'toArray: Object should have keys for indices') : invariant(false) : undefined;
      if (obj.hasOwnProperty) {
        try {
          return Array.prototype.slice.call(obj);
        } catch (e) {}
      }
      var ret = Array(length);
      for (var ii = 0; ii < length; ii++) {
        ret[ii] = obj[ii];
      }
      return ret;
    }
    module.exports = toArray;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
});
System.registerDynamic('npm:fbjs@0.6.1/lib/createArrayFromMixed.js', ['npm:fbjs@0.6.1/lib/toArray.js'], true, function ($__require, exports, module) {
  /* */
  'use strict';

  var global = this || self,
      GLOBAL = global;
  var toArray = $__require('npm:fbjs@0.6.1/lib/toArray.js');
  function hasArrayNature(obj) {
    return !!obj && (typeof obj == 'object' || typeof obj == 'function') && 'length' in obj && !('setInterval' in obj) && typeof obj.nodeType != 'number' && (Array.isArray(obj) || 'callee' in obj || 'item' in obj);
  }
  function createArrayFromMixed(obj) {
    if (!hasArrayNature(obj)) {
      return [obj];
    } else if (Array.isArray(obj)) {
      return obj.slice();
    } else {
      return toArray(obj);
    }
  }
  module.exports = createArrayFromMixed;
});
System.registerDynamic('npm:fbjs@0.6.1/lib/createNodesFromMarkup.js', ['npm:fbjs@0.6.1/lib/ExecutionEnvironment.js', 'npm:fbjs@0.6.1/lib/createArrayFromMixed.js', 'npm:fbjs@0.6.1/lib/getMarkupWrap.js', 'npm:fbjs@0.6.1/lib/invariant.js', 'github:jspm/nodelibs-process@0.1.2.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  (function (process) {
    'use strict';

    var ExecutionEnvironment = $__require('npm:fbjs@0.6.1/lib/ExecutionEnvironment.js');
    var createArrayFromMixed = $__require('npm:fbjs@0.6.1/lib/createArrayFromMixed.js');
    var getMarkupWrap = $__require('npm:fbjs@0.6.1/lib/getMarkupWrap.js');
    var invariant = $__require('npm:fbjs@0.6.1/lib/invariant.js');
    var dummyNode = ExecutionEnvironment.canUseDOM ? document.createElement('div') : null;
    var nodeNamePattern = /^\s*<(\w+)/;
    function getNodeName(markup) {
      var nodeNameMatch = markup.match(nodeNamePattern);
      return nodeNameMatch && nodeNameMatch[1].toLowerCase();
    }
    function createNodesFromMarkup(markup, handleScript) {
      var node = dummyNode;
      !!!dummyNode ? 'production' !== 'production' ? invariant(false, 'createNodesFromMarkup dummy not initialized') : invariant(false) : undefined;
      var nodeName = getNodeName(markup);
      var wrap = nodeName && getMarkupWrap(nodeName);
      if (wrap) {
        node.innerHTML = wrap[1] + markup + wrap[2];
        var wrapDepth = wrap[0];
        while (wrapDepth--) {
          node = node.lastChild;
        }
      } else {
        node.innerHTML = markup;
      }
      var scripts = node.getElementsByTagName('script');
      if (scripts.length) {
        !handleScript ? 'production' !== 'production' ? invariant(false, 'createNodesFromMarkup(...): Unexpected <script> element rendered.') : invariant(false) : undefined;
        createArrayFromMixed(scripts).forEach(handleScript);
      }
      var nodes = createArrayFromMixed(node.childNodes);
      while (node.lastChild) {
        node.removeChild(node.lastChild);
      }
      return nodes;
    }
    module.exports = createNodesFromMarkup;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
});
System.registerDynamic('npm:fbjs@0.6.1/lib/getMarkupWrap.js', ['npm:fbjs@0.6.1/lib/ExecutionEnvironment.js', 'npm:fbjs@0.6.1/lib/invariant.js', 'github:jspm/nodelibs-process@0.1.2.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  (function (process) {
    'use strict';

    var ExecutionEnvironment = $__require('npm:fbjs@0.6.1/lib/ExecutionEnvironment.js');
    var invariant = $__require('npm:fbjs@0.6.1/lib/invariant.js');
    var dummyNode = ExecutionEnvironment.canUseDOM ? document.createElement('div') : null;
    var shouldWrap = {};
    var selectWrap = [1, '<select multiple="true">', '</select>'];
    var tableWrap = [1, '<table>', '</table>'];
    var trWrap = [3, '<table><tbody><tr>', '</tr></tbody></table>'];
    var svgWrap = [1, '<svg xmlns="http://www.w3.org/2000/svg">', '</svg>'];
    var markupWrap = {
      '*': [1, '?<div>', '</div>'],
      'area': [1, '<map>', '</map>'],
      'col': [2, '<table><tbody></tbody><colgroup>', '</colgroup></table>'],
      'legend': [1, '<fieldset>', '</fieldset>'],
      'param': [1, '<object>', '</object>'],
      'tr': [2, '<table><tbody>', '</tbody></table>'],
      'optgroup': selectWrap,
      'option': selectWrap,
      'caption': tableWrap,
      'colgroup': tableWrap,
      'tbody': tableWrap,
      'tfoot': tableWrap,
      'thead': tableWrap,
      'td': trWrap,
      'th': trWrap
    };
    var svgElements = ['circle', 'clipPath', 'defs', 'ellipse', 'g', 'image', 'line', 'linearGradient', 'mask', 'path', 'pattern', 'polygon', 'polyline', 'radialGradient', 'rect', 'stop', 'text', 'tspan'];
    svgElements.forEach(function (nodeName) {
      markupWrap[nodeName] = svgWrap;
      shouldWrap[nodeName] = true;
    });
    function getMarkupWrap(nodeName) {
      !!!dummyNode ? 'production' !== 'production' ? invariant(false, 'Markup wrapping node not initialized') : invariant(false) : undefined;
      if (!markupWrap.hasOwnProperty(nodeName)) {
        nodeName = '*';
      }
      if (!shouldWrap.hasOwnProperty(nodeName)) {
        if (nodeName === '*') {
          dummyNode.innerHTML = '<link />';
        } else {
          dummyNode.innerHTML = '<' + nodeName + '></' + nodeName + '>';
        }
        shouldWrap[nodeName] = !dummyNode.firstChild;
      }
      return shouldWrap[nodeName] ? markupWrap[nodeName] : null;
    }
    module.exports = getMarkupWrap;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
});
System.registerDynamic('npm:react@0.14.7/lib/Danger.js', ['npm:fbjs@0.6.1/lib/ExecutionEnvironment.js', 'npm:fbjs@0.6.1/lib/createNodesFromMarkup.js', 'npm:fbjs@0.6.1/lib/emptyFunction.js', 'npm:fbjs@0.6.1/lib/getMarkupWrap.js', 'npm:fbjs@0.6.1/lib/invariant.js', 'github:jspm/nodelibs-process@0.1.2.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  (function (process) {
    'use strict';

    var ExecutionEnvironment = $__require('npm:fbjs@0.6.1/lib/ExecutionEnvironment.js');
    var createNodesFromMarkup = $__require('npm:fbjs@0.6.1/lib/createNodesFromMarkup.js');
    var emptyFunction = $__require('npm:fbjs@0.6.1/lib/emptyFunction.js');
    var getMarkupWrap = $__require('npm:fbjs@0.6.1/lib/getMarkupWrap.js');
    var invariant = $__require('npm:fbjs@0.6.1/lib/invariant.js');
    var OPEN_TAG_NAME_EXP = /^(<[^ \/>]+)/;
    var RESULT_INDEX_ATTR = 'data-danger-index';
    function getNodeName(markup) {
      return markup.substring(1, markup.indexOf(' '));
    }
    var Danger = {
      dangerouslyRenderMarkup: function (markupList) {
        !ExecutionEnvironment.canUseDOM ? 'production' !== 'production' ? invariant(false, 'dangerouslyRenderMarkup(...): Cannot render markup in a worker ' + 'thread. Make sure `window` and `document` are available globally ' + 'before requiring React when unit testing or use ' + 'ReactDOMServer.renderToString for server rendering.') : invariant(false) : undefined;
        var nodeName;
        var markupByNodeName = {};
        for (var i = 0; i < markupList.length; i++) {
          !markupList[i] ? 'production' !== 'production' ? invariant(false, 'dangerouslyRenderMarkup(...): Missing markup.') : invariant(false) : undefined;
          nodeName = getNodeName(markupList[i]);
          nodeName = getMarkupWrap(nodeName) ? nodeName : '*';
          markupByNodeName[nodeName] = markupByNodeName[nodeName] || [];
          markupByNodeName[nodeName][i] = markupList[i];
        }
        var resultList = [];
        var resultListAssignmentCount = 0;
        for (nodeName in markupByNodeName) {
          if (!markupByNodeName.hasOwnProperty(nodeName)) {
            continue;
          }
          var markupListByNodeName = markupByNodeName[nodeName];
          var resultIndex;
          for (resultIndex in markupListByNodeName) {
            if (markupListByNodeName.hasOwnProperty(resultIndex)) {
              var markup = markupListByNodeName[resultIndex];
              markupListByNodeName[resultIndex] = markup.replace(OPEN_TAG_NAME_EXP, '$1 ' + RESULT_INDEX_ATTR + '="' + resultIndex + '" ');
            }
          }
          var renderNodes = createNodesFromMarkup(markupListByNodeName.join(''), emptyFunction);
          for (var j = 0; j < renderNodes.length; ++j) {
            var renderNode = renderNodes[j];
            if (renderNode.hasAttribute && renderNode.hasAttribute(RESULT_INDEX_ATTR)) {
              resultIndex = +renderNode.getAttribute(RESULT_INDEX_ATTR);
              renderNode.removeAttribute(RESULT_INDEX_ATTR);
              !!resultList.hasOwnProperty(resultIndex) ? 'production' !== 'production' ? invariant(false, 'Danger: Assigning to an already-occupied result index.') : invariant(false) : undefined;
              resultList[resultIndex] = renderNode;
              resultListAssignmentCount += 1;
            } else if ('production' !== 'production') {
              console.error('Danger: Discarding unexpected node:', renderNode);
            }
          }
        }
        !(resultListAssignmentCount === resultList.length) ? 'production' !== 'production' ? invariant(false, 'Danger: Did not assign to every index of resultList.') : invariant(false) : undefined;
        !(resultList.length === markupList.length) ? 'production' !== 'production' ? invariant(false, 'Danger: Expected markup to render %s nodes, but rendered %s.', markupList.length, resultList.length) : invariant(false) : undefined;
        return resultList;
      },
      dangerouslyReplaceNodeWithMarkup: function (oldChild, markup) {
        !ExecutionEnvironment.canUseDOM ? 'production' !== 'production' ? invariant(false, 'dangerouslyReplaceNodeWithMarkup(...): Cannot render markup in a ' + 'worker thread. Make sure `window` and `document` are available ' + 'globally before requiring React when unit testing or use ' + 'ReactDOMServer.renderToString() for server rendering.') : invariant(false) : undefined;
        !markup ? 'production' !== 'production' ? invariant(false, 'dangerouslyReplaceNodeWithMarkup(...): Missing markup.') : invariant(false) : undefined;
        !(oldChild.tagName.toLowerCase() !== 'html') ? 'production' !== 'production' ? invariant(false, 'dangerouslyReplaceNodeWithMarkup(...): Cannot replace markup of the ' + '<html> node. This is because browser quirks make this unreliable ' + 'and/or slow. If you want to render to the root you must use ' + 'server rendering. See ReactDOMServer.renderToString().') : invariant(false) : undefined;
        var newChild;
        if (typeof markup === 'string') {
          newChild = createNodesFromMarkup(markup, emptyFunction)[0];
        } else {
          newChild = markup;
        }
        oldChild.parentNode.replaceChild(newChild, oldChild);
      }
    };
    module.exports = Danger;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
});
System.registerDynamic('npm:react@0.14.7/lib/ReactMultiChildUpdateTypes.js', ['npm:fbjs@0.6.1/lib/keyMirror.js'], true, function ($__require, exports, module) {
  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule ReactMultiChildUpdateTypes
   */

  'use strict';

  var global = this || self,
      GLOBAL = global;
  var keyMirror = $__require('npm:fbjs@0.6.1/lib/keyMirror.js');

  /**
   * When a component's children are updated, a series of update configuration
   * objects are created in order to batch and serialize the required changes.
   *
   * Enumerates all the possible types of update configurations.
   *
   * @internal
   */
  var ReactMultiChildUpdateTypes = keyMirror({
    INSERT_MARKUP: null,
    MOVE_EXISTING: null,
    REMOVE_NODE: null,
    SET_MARKUP: null,
    TEXT_CONTENT: null
  });

  module.exports = ReactMultiChildUpdateTypes;
});
System.registerDynamic('npm:react@0.14.7/lib/DOMChildrenOperations.js', ['npm:react@0.14.7/lib/Danger.js', 'npm:react@0.14.7/lib/ReactMultiChildUpdateTypes.js', 'npm:react@0.14.7/lib/ReactPerf.js', 'npm:react@0.14.7/lib/setInnerHTML.js', 'npm:react@0.14.7/lib/setTextContent.js', 'npm:fbjs@0.6.1/lib/invariant.js', 'github:jspm/nodelibs-process@0.1.2.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  (function (process) {
    'use strict';

    var Danger = $__require('npm:react@0.14.7/lib/Danger.js');
    var ReactMultiChildUpdateTypes = $__require('npm:react@0.14.7/lib/ReactMultiChildUpdateTypes.js');
    var ReactPerf = $__require('npm:react@0.14.7/lib/ReactPerf.js');
    var setInnerHTML = $__require('npm:react@0.14.7/lib/setInnerHTML.js');
    var setTextContent = $__require('npm:react@0.14.7/lib/setTextContent.js');
    var invariant = $__require('npm:fbjs@0.6.1/lib/invariant.js');
    function insertChildAt(parentNode, childNode, index) {
      var beforeChild = index >= parentNode.childNodes.length ? null : parentNode.childNodes.item(index);
      parentNode.insertBefore(childNode, beforeChild);
    }
    var DOMChildrenOperations = {
      dangerouslyReplaceNodeWithMarkup: Danger.dangerouslyReplaceNodeWithMarkup,
      updateTextContent: setTextContent,
      processUpdates: function (updates, markupList) {
        var update;
        var initialChildren = null;
        var updatedChildren = null;
        for (var i = 0; i < updates.length; i++) {
          update = updates[i];
          if (update.type === ReactMultiChildUpdateTypes.MOVE_EXISTING || update.type === ReactMultiChildUpdateTypes.REMOVE_NODE) {
            var updatedIndex = update.fromIndex;
            var updatedChild = update.parentNode.childNodes[updatedIndex];
            var parentID = update.parentID;
            !updatedChild ? 'production' !== 'production' ? invariant(false, 'processUpdates(): Unable to find child %s of element. This ' + 'probably means the DOM was unexpectedly mutated (e.g., by the ' + 'browser), usually due to forgetting a <tbody> when using tables, ' + 'nesting tags like <form>, <p>, or <a>, or using non-SVG elements ' + 'in an <svg> parent. Try inspecting the child nodes of the element ' + 'with React ID `%s`.', updatedIndex, parentID) : invariant(false) : undefined;
            initialChildren = initialChildren || {};
            initialChildren[parentID] = initialChildren[parentID] || [];
            initialChildren[parentID][updatedIndex] = updatedChild;
            updatedChildren = updatedChildren || [];
            updatedChildren.push(updatedChild);
          }
        }
        var renderedMarkup;
        if (markupList.length && typeof markupList[0] === 'string') {
          renderedMarkup = Danger.dangerouslyRenderMarkup(markupList);
        } else {
          renderedMarkup = markupList;
        }
        if (updatedChildren) {
          for (var j = 0; j < updatedChildren.length; j++) {
            updatedChildren[j].parentNode.removeChild(updatedChildren[j]);
          }
        }
        for (var k = 0; k < updates.length; k++) {
          update = updates[k];
          switch (update.type) {
            case ReactMultiChildUpdateTypes.INSERT_MARKUP:
              insertChildAt(update.parentNode, renderedMarkup[update.markupIndex], update.toIndex);
              break;
            case ReactMultiChildUpdateTypes.MOVE_EXISTING:
              insertChildAt(update.parentNode, initialChildren[update.parentID][update.fromIndex], update.toIndex);
              break;
            case ReactMultiChildUpdateTypes.SET_MARKUP:
              setInnerHTML(update.parentNode, update.content);
              break;
            case ReactMultiChildUpdateTypes.TEXT_CONTENT:
              setTextContent(update.parentNode, update.content);
              break;
            case ReactMultiChildUpdateTypes.REMOVE_NODE:
              break;
          }
        }
      }
    };
    ReactPerf.measureMethods(DOMChildrenOperations, 'DOMChildrenOperations', { updateTextContent: 'updateTextContent' });
    module.exports = DOMChildrenOperations;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
});
System.registerDynamic('npm:react@0.14.7/lib/quoteAttributeValueForBrowser.js', ['npm:react@0.14.7/lib/escapeTextContentForBrowser.js'], true, function ($__require, exports, module) {
  /* */
  'use strict';

  var global = this || self,
      GLOBAL = global;
  var escapeTextContentForBrowser = $__require('npm:react@0.14.7/lib/escapeTextContentForBrowser.js');
  function quoteAttributeValueForBrowser(value) {
    return '"' + escapeTextContentForBrowser(value) + '"';
  }
  module.exports = quoteAttributeValueForBrowser;
});
System.registerDynamic('npm:react@0.14.7/lib/DOMPropertyOperations.js', ['npm:react@0.14.7/lib/DOMProperty.js', 'npm:react@0.14.7/lib/ReactPerf.js', 'npm:react@0.14.7/lib/quoteAttributeValueForBrowser.js', 'npm:fbjs@0.6.1/lib/warning.js', 'github:jspm/nodelibs-process@0.1.2.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  (function (process) {
    'use strict';

    var DOMProperty = $__require('npm:react@0.14.7/lib/DOMProperty.js');
    var ReactPerf = $__require('npm:react@0.14.7/lib/ReactPerf.js');
    var quoteAttributeValueForBrowser = $__require('npm:react@0.14.7/lib/quoteAttributeValueForBrowser.js');
    var warning = $__require('npm:fbjs@0.6.1/lib/warning.js');
    var VALID_ATTRIBUTE_NAME_REGEX = /^[a-zA-Z_][\w\.\-]*$/;
    var illegalAttributeNameCache = {};
    var validatedAttributeNameCache = {};
    function isAttributeNameSafe(attributeName) {
      if (validatedAttributeNameCache.hasOwnProperty(attributeName)) {
        return true;
      }
      if (illegalAttributeNameCache.hasOwnProperty(attributeName)) {
        return false;
      }
      if (VALID_ATTRIBUTE_NAME_REGEX.test(attributeName)) {
        validatedAttributeNameCache[attributeName] = true;
        return true;
      }
      illegalAttributeNameCache[attributeName] = true;
      'production' !== 'production' ? warning(false, 'Invalid attribute name: `%s`', attributeName) : undefined;
      return false;
    }
    function shouldIgnoreValue(propertyInfo, value) {
      return value == null || propertyInfo.hasBooleanValue && !value || propertyInfo.hasNumericValue && isNaN(value) || propertyInfo.hasPositiveNumericValue && value < 1 || propertyInfo.hasOverloadedBooleanValue && value === false;
    }
    if ('production' !== 'production') {
      var reactProps = {
        children: true,
        dangerouslySetInnerHTML: true,
        key: true,
        ref: true
      };
      var warnedProperties = {};
      var warnUnknownProperty = function (name) {
        if (reactProps.hasOwnProperty(name) && reactProps[name] || warnedProperties.hasOwnProperty(name) && warnedProperties[name]) {
          return;
        }
        warnedProperties[name] = true;
        var lowerCasedName = name.toLowerCase();
        var standardName = DOMProperty.isCustomAttribute(lowerCasedName) ? lowerCasedName : DOMProperty.getPossibleStandardName.hasOwnProperty(lowerCasedName) ? DOMProperty.getPossibleStandardName[lowerCasedName] : null;
        'production' !== 'production' ? warning(standardName == null, 'Unknown DOM property %s. Did you mean %s?', name, standardName) : undefined;
      };
    }
    var DOMPropertyOperations = {
      createMarkupForID: function (id) {
        return DOMProperty.ID_ATTRIBUTE_NAME + '=' + quoteAttributeValueForBrowser(id);
      },
      setAttributeForID: function (node, id) {
        node.setAttribute(DOMProperty.ID_ATTRIBUTE_NAME, id);
      },
      createMarkupForProperty: function (name, value) {
        var propertyInfo = DOMProperty.properties.hasOwnProperty(name) ? DOMProperty.properties[name] : null;
        if (propertyInfo) {
          if (shouldIgnoreValue(propertyInfo, value)) {
            return '';
          }
          var attributeName = propertyInfo.attributeName;
          if (propertyInfo.hasBooleanValue || propertyInfo.hasOverloadedBooleanValue && value === true) {
            return attributeName + '=""';
          }
          return attributeName + '=' + quoteAttributeValueForBrowser(value);
        } else if (DOMProperty.isCustomAttribute(name)) {
          if (value == null) {
            return '';
          }
          return name + '=' + quoteAttributeValueForBrowser(value);
        } else if ('production' !== 'production') {
          warnUnknownProperty(name);
        }
        return null;
      },
      createMarkupForCustomAttribute: function (name, value) {
        if (!isAttributeNameSafe(name) || value == null) {
          return '';
        }
        return name + '=' + quoteAttributeValueForBrowser(value);
      },
      setValueForProperty: function (node, name, value) {
        var propertyInfo = DOMProperty.properties.hasOwnProperty(name) ? DOMProperty.properties[name] : null;
        if (propertyInfo) {
          var mutationMethod = propertyInfo.mutationMethod;
          if (mutationMethod) {
            mutationMethod(node, value);
          } else if (shouldIgnoreValue(propertyInfo, value)) {
            this.deleteValueForProperty(node, name);
          } else if (propertyInfo.mustUseAttribute) {
            var attributeName = propertyInfo.attributeName;
            var namespace = propertyInfo.attributeNamespace;
            if (namespace) {
              node.setAttributeNS(namespace, attributeName, '' + value);
            } else if (propertyInfo.hasBooleanValue || propertyInfo.hasOverloadedBooleanValue && value === true) {
              node.setAttribute(attributeName, '');
            } else {
              node.setAttribute(attributeName, '' + value);
            }
          } else {
            var propName = propertyInfo.propertyName;
            if (!propertyInfo.hasSideEffects || '' + node[propName] !== '' + value) {
              node[propName] = value;
            }
          }
        } else if (DOMProperty.isCustomAttribute(name)) {
          DOMPropertyOperations.setValueForAttribute(node, name, value);
        } else if ('production' !== 'production') {
          warnUnknownProperty(name);
        }
      },
      setValueForAttribute: function (node, name, value) {
        if (!isAttributeNameSafe(name)) {
          return;
        }
        if (value == null) {
          node.removeAttribute(name);
        } else {
          node.setAttribute(name, '' + value);
        }
      },
      deleteValueForProperty: function (node, name) {
        var propertyInfo = DOMProperty.properties.hasOwnProperty(name) ? DOMProperty.properties[name] : null;
        if (propertyInfo) {
          var mutationMethod = propertyInfo.mutationMethod;
          if (mutationMethod) {
            mutationMethod(node, undefined);
          } else if (propertyInfo.mustUseAttribute) {
            node.removeAttribute(propertyInfo.attributeName);
          } else {
            var propName = propertyInfo.propertyName;
            var defaultValue = DOMProperty.getDefaultValueForProperty(node.nodeName, propName);
            if (!propertyInfo.hasSideEffects || '' + node[propName] !== defaultValue) {
              node[propName] = defaultValue;
            }
          }
        } else if (DOMProperty.isCustomAttribute(name)) {
          node.removeAttribute(name);
        } else if ('production' !== 'production') {
          warnUnknownProperty(name);
        }
      }
    };
    ReactPerf.measureMethods(DOMPropertyOperations, 'DOMPropertyOperations', {
      setValueForProperty: 'setValueForProperty',
      setValueForAttribute: 'setValueForAttribute',
      deleteValueForProperty: 'deleteValueForProperty'
    });
    module.exports = DOMPropertyOperations;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
});
System.registerDynamic('npm:react@0.14.7/lib/ReactDOMIDOperations.js', ['npm:react@0.14.7/lib/DOMChildrenOperations.js', 'npm:react@0.14.7/lib/DOMPropertyOperations.js', 'npm:react@0.14.7/lib/ReactMount.js', 'npm:react@0.14.7/lib/ReactPerf.js', 'npm:fbjs@0.6.1/lib/invariant.js', 'github:jspm/nodelibs-process@0.1.2.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  (function (process) {
    'use strict';

    var DOMChildrenOperations = $__require('npm:react@0.14.7/lib/DOMChildrenOperations.js');
    var DOMPropertyOperations = $__require('npm:react@0.14.7/lib/DOMPropertyOperations.js');
    var ReactMount = $__require('npm:react@0.14.7/lib/ReactMount.js');
    var ReactPerf = $__require('npm:react@0.14.7/lib/ReactPerf.js');
    var invariant = $__require('npm:fbjs@0.6.1/lib/invariant.js');
    var INVALID_PROPERTY_ERRORS = {
      dangerouslySetInnerHTML: '`dangerouslySetInnerHTML` must be set using `updateInnerHTMLByID()`.',
      style: '`style` must be set using `updateStylesByID()`.'
    };
    var ReactDOMIDOperations = {
      updatePropertyByID: function (id, name, value) {
        var node = ReactMount.getNode(id);
        !!INVALID_PROPERTY_ERRORS.hasOwnProperty(name) ? 'production' !== 'production' ? invariant(false, 'updatePropertyByID(...): %s', INVALID_PROPERTY_ERRORS[name]) : invariant(false) : undefined;
        if (value != null) {
          DOMPropertyOperations.setValueForProperty(node, name, value);
        } else {
          DOMPropertyOperations.deleteValueForProperty(node, name);
        }
      },
      dangerouslyReplaceNodeWithMarkupByID: function (id, markup) {
        var node = ReactMount.getNode(id);
        DOMChildrenOperations.dangerouslyReplaceNodeWithMarkup(node, markup);
      },
      dangerouslyProcessChildrenUpdates: function (updates, markup) {
        for (var i = 0; i < updates.length; i++) {
          updates[i].parentNode = ReactMount.getNode(updates[i].parentID);
        }
        DOMChildrenOperations.processUpdates(updates, markup);
      }
    };
    ReactPerf.measureMethods(ReactDOMIDOperations, 'ReactDOMIDOperations', {
      dangerouslyReplaceNodeWithMarkupByID: 'dangerouslyReplaceNodeWithMarkupByID',
      dangerouslyProcessChildrenUpdates: 'dangerouslyProcessChildrenUpdates'
    });
    module.exports = ReactDOMIDOperations;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
});
System.registerDynamic('npm:react@0.14.7/lib/ReactComponentBrowserEnvironment.js', ['npm:react@0.14.7/lib/ReactDOMIDOperations.js', 'npm:react@0.14.7/lib/ReactMount.js', 'github:jspm/nodelibs-process@0.1.2.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  (function (process) {
    'use strict';

    var ReactDOMIDOperations = $__require('npm:react@0.14.7/lib/ReactDOMIDOperations.js');
    var ReactMount = $__require('npm:react@0.14.7/lib/ReactMount.js');
    var ReactComponentBrowserEnvironment = {
      processChildrenUpdates: ReactDOMIDOperations.dangerouslyProcessChildrenUpdates,
      replaceNodeWithMarkupByID: ReactDOMIDOperations.dangerouslyReplaceNodeWithMarkupByID,
      unmountIDFromEnvironment: function (rootNodeID) {
        ReactMount.purgeID(rootNodeID);
      }
    };
    module.exports = ReactComponentBrowserEnvironment;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
});
System.registerDynamic('npm:react@0.14.7/lib/escapeTextContentForBrowser.js', [], true, function ($__require, exports, module) {
  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule escapeTextContentForBrowser
   */

  'use strict';

  var global = this || self,
      GLOBAL = global;
  var ESCAPE_LOOKUP = {
    '&': '&amp;',
    '>': '&gt;',
    '<': '&lt;',
    '"': '&quot;',
    '\'': '&#x27;'
  };

  var ESCAPE_REGEX = /[&><"']/g;

  function escaper(match) {
    return ESCAPE_LOOKUP[match];
  }

  /**
   * Escapes text to prevent scripting attacks.
   *
   * @param {*} text Text value to escape.
   * @return {string} An escaped string.
   */
  function escapeTextContentForBrowser(text) {
    return ('' + text).replace(ESCAPE_REGEX, escaper);
  }

  module.exports = escapeTextContentForBrowser;
});
System.registerDynamic('npm:react@0.14.7/lib/setTextContent.js', ['npm:fbjs@0.6.1/lib/ExecutionEnvironment.js', 'npm:react@0.14.7/lib/escapeTextContentForBrowser.js', 'npm:react@0.14.7/lib/setInnerHTML.js'], true, function ($__require, exports, module) {
  /* */
  'use strict';

  var global = this || self,
      GLOBAL = global;
  var ExecutionEnvironment = $__require('npm:fbjs@0.6.1/lib/ExecutionEnvironment.js');
  var escapeTextContentForBrowser = $__require('npm:react@0.14.7/lib/escapeTextContentForBrowser.js');
  var setInnerHTML = $__require('npm:react@0.14.7/lib/setInnerHTML.js');
  var setTextContent = function (node, text) {
    node.textContent = text;
  };
  if (ExecutionEnvironment.canUseDOM) {
    if (!('textContent' in document.documentElement)) {
      setTextContent = function (node, text) {
        setInnerHTML(node, escapeTextContentForBrowser(text));
      };
    }
  }
  module.exports = setTextContent;
});
System.registerDynamic('npm:react@0.14.7/lib/ReactDOMTextComponent.js', ['npm:react@0.14.7/lib/DOMChildrenOperations.js', 'npm:react@0.14.7/lib/DOMPropertyOperations.js', 'npm:react@0.14.7/lib/ReactComponentBrowserEnvironment.js', 'npm:react@0.14.7/lib/ReactMount.js', 'npm:react@0.14.7/lib/Object.assign.js', 'npm:react@0.14.7/lib/escapeTextContentForBrowser.js', 'npm:react@0.14.7/lib/setTextContent.js', 'npm:react@0.14.7/lib/validateDOMNesting.js', 'github:jspm/nodelibs-process@0.1.2.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  (function (process) {
    'use strict';

    var DOMChildrenOperations = $__require('npm:react@0.14.7/lib/DOMChildrenOperations.js');
    var DOMPropertyOperations = $__require('npm:react@0.14.7/lib/DOMPropertyOperations.js');
    var ReactComponentBrowserEnvironment = $__require('npm:react@0.14.7/lib/ReactComponentBrowserEnvironment.js');
    var ReactMount = $__require('npm:react@0.14.7/lib/ReactMount.js');
    var assign = $__require('npm:react@0.14.7/lib/Object.assign.js');
    var escapeTextContentForBrowser = $__require('npm:react@0.14.7/lib/escapeTextContentForBrowser.js');
    var setTextContent = $__require('npm:react@0.14.7/lib/setTextContent.js');
    var validateDOMNesting = $__require('npm:react@0.14.7/lib/validateDOMNesting.js');
    var ReactDOMTextComponent = function (props) {};
    assign(ReactDOMTextComponent.prototype, {
      construct: function (text) {
        this._currentElement = text;
        this._stringText = '' + text;
        this._rootNodeID = null;
        this._mountIndex = 0;
      },
      mountComponent: function (rootID, transaction, context) {
        if ('production' !== 'production') {
          if (context[validateDOMNesting.ancestorInfoContextKey]) {
            validateDOMNesting('span', null, context[validateDOMNesting.ancestorInfoContextKey]);
          }
        }
        this._rootNodeID = rootID;
        if (transaction.useCreateElement) {
          var ownerDocument = context[ReactMount.ownerDocumentContextKey];
          var el = ownerDocument.createElement('span');
          DOMPropertyOperations.setAttributeForID(el, rootID);
          ReactMount.getID(el);
          setTextContent(el, this._stringText);
          return el;
        } else {
          var escapedText = escapeTextContentForBrowser(this._stringText);
          if (transaction.renderToStaticMarkup) {
            return escapedText;
          }
          return '<span ' + DOMPropertyOperations.createMarkupForID(rootID) + '>' + escapedText + '</span>';
        }
      },
      receiveComponent: function (nextText, transaction) {
        if (nextText !== this._currentElement) {
          this._currentElement = nextText;
          var nextStringText = '' + nextText;
          if (nextStringText !== this._stringText) {
            this._stringText = nextStringText;
            var node = ReactMount.getNode(this._rootNodeID);
            DOMChildrenOperations.updateTextContent(node, nextStringText);
          }
        }
      },
      unmountComponent: function () {
        ReactComponentBrowserEnvironment.unmountIDFromEnvironment(this._rootNodeID);
      }
    });
    module.exports = ReactDOMTextComponent;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
});
System.registerDynamic('npm:fbjs@0.6.1/lib/getUnboundedScrollPosition.js', [], true, function ($__require, exports, module) {
  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule getUnboundedScrollPosition
   * @typechecks
   */

  'use strict';

  /**
   * Gets the scroll position of the supplied element or window.
   *
   * The return values are unbounded, unlike `getScrollPosition`. This means they
   * may be negative or exceed the element boundaries (which is possible using
   * inertial scrolling).
   *
   * @param {DOMWindow|DOMElement} scrollable
   * @return {object} Map with `x` and `y` keys.
   */

  var global = this || self,
      GLOBAL = global;
  function getUnboundedScrollPosition(scrollable) {
    if (scrollable === window) {
      return {
        x: window.pageXOffset || document.documentElement.scrollLeft,
        y: window.pageYOffset || document.documentElement.scrollTop
      };
    }
    return {
      x: scrollable.scrollLeft,
      y: scrollable.scrollTop
    };
  }

  module.exports = getUnboundedScrollPosition;
});
System.registerDynamic('npm:react@0.14.7/lib/ReactEventListener.js', ['npm:fbjs@0.6.1/lib/EventListener.js', 'npm:fbjs@0.6.1/lib/ExecutionEnvironment.js', 'npm:react@0.14.7/lib/PooledClass.js', 'npm:react@0.14.7/lib/ReactInstanceHandles.js', 'npm:react@0.14.7/lib/ReactMount.js', 'npm:react@0.14.7/lib/ReactUpdates.js', 'npm:react@0.14.7/lib/Object.assign.js', 'npm:react@0.14.7/lib/getEventTarget.js', 'npm:fbjs@0.6.1/lib/getUnboundedScrollPosition.js', 'github:jspm/nodelibs-process@0.1.2.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  (function (process) {
    'use strict';

    var EventListener = $__require('npm:fbjs@0.6.1/lib/EventListener.js');
    var ExecutionEnvironment = $__require('npm:fbjs@0.6.1/lib/ExecutionEnvironment.js');
    var PooledClass = $__require('npm:react@0.14.7/lib/PooledClass.js');
    var ReactInstanceHandles = $__require('npm:react@0.14.7/lib/ReactInstanceHandles.js');
    var ReactMount = $__require('npm:react@0.14.7/lib/ReactMount.js');
    var ReactUpdates = $__require('npm:react@0.14.7/lib/ReactUpdates.js');
    var assign = $__require('npm:react@0.14.7/lib/Object.assign.js');
    var getEventTarget = $__require('npm:react@0.14.7/lib/getEventTarget.js');
    var getUnboundedScrollPosition = $__require('npm:fbjs@0.6.1/lib/getUnboundedScrollPosition.js');
    var DOCUMENT_FRAGMENT_NODE_TYPE = 11;
    function findParent(node) {
      var nodeID = ReactMount.getID(node);
      var rootID = ReactInstanceHandles.getReactRootIDFromNodeID(nodeID);
      var container = ReactMount.findReactContainerForID(rootID);
      var parent = ReactMount.getFirstReactDOM(container);
      return parent;
    }
    function TopLevelCallbackBookKeeping(topLevelType, nativeEvent) {
      this.topLevelType = topLevelType;
      this.nativeEvent = nativeEvent;
      this.ancestors = [];
    }
    assign(TopLevelCallbackBookKeeping.prototype, { destructor: function () {
        this.topLevelType = null;
        this.nativeEvent = null;
        this.ancestors.length = 0;
      } });
    PooledClass.addPoolingTo(TopLevelCallbackBookKeeping, PooledClass.twoArgumentPooler);
    function handleTopLevelImpl(bookKeeping) {
      void handleTopLevelWithPath;
      handleTopLevelWithoutPath(bookKeeping);
    }
    function handleTopLevelWithoutPath(bookKeeping) {
      var topLevelTarget = ReactMount.getFirstReactDOM(getEventTarget(bookKeeping.nativeEvent)) || window;
      var ancestor = topLevelTarget;
      while (ancestor) {
        bookKeeping.ancestors.push(ancestor);
        ancestor = findParent(ancestor);
      }
      for (var i = 0; i < bookKeeping.ancestors.length; i++) {
        topLevelTarget = bookKeeping.ancestors[i];
        var topLevelTargetID = ReactMount.getID(topLevelTarget) || '';
        ReactEventListener._handleTopLevel(bookKeeping.topLevelType, topLevelTarget, topLevelTargetID, bookKeeping.nativeEvent, getEventTarget(bookKeeping.nativeEvent));
      }
    }
    function handleTopLevelWithPath(bookKeeping) {
      var path = bookKeeping.nativeEvent.path;
      var currentNativeTarget = path[0];
      var eventsFired = 0;
      for (var i = 0; i < path.length; i++) {
        var currentPathElement = path[i];
        if (currentPathElement.nodeType === DOCUMENT_FRAGMENT_NODE_TYPE) {
          currentNativeTarget = path[i + 1];
        }
        var reactParent = ReactMount.getFirstReactDOM(currentPathElement);
        if (reactParent === currentPathElement) {
          var currentPathElementID = ReactMount.getID(currentPathElement);
          var newRootID = ReactInstanceHandles.getReactRootIDFromNodeID(currentPathElementID);
          bookKeeping.ancestors.push(currentPathElement);
          var topLevelTargetID = ReactMount.getID(currentPathElement) || '';
          eventsFired++;
          ReactEventListener._handleTopLevel(bookKeeping.topLevelType, currentPathElement, topLevelTargetID, bookKeeping.nativeEvent, currentNativeTarget);
          while (currentPathElementID !== newRootID) {
            i++;
            currentPathElement = path[i];
            currentPathElementID = ReactMount.getID(currentPathElement);
          }
        }
      }
      if (eventsFired === 0) {
        ReactEventListener._handleTopLevel(bookKeeping.topLevelType, window, '', bookKeeping.nativeEvent, getEventTarget(bookKeeping.nativeEvent));
      }
    }
    function scrollValueMonitor(cb) {
      var scrollPosition = getUnboundedScrollPosition(window);
      cb(scrollPosition);
    }
    var ReactEventListener = {
      _enabled: true,
      _handleTopLevel: null,
      WINDOW_HANDLE: ExecutionEnvironment.canUseDOM ? window : null,
      setHandleTopLevel: function (handleTopLevel) {
        ReactEventListener._handleTopLevel = handleTopLevel;
      },
      setEnabled: function (enabled) {
        ReactEventListener._enabled = !!enabled;
      },
      isEnabled: function () {
        return ReactEventListener._enabled;
      },
      trapBubbledEvent: function (topLevelType, handlerBaseName, handle) {
        var element = handle;
        if (!element) {
          return null;
        }
        return EventListener.listen(element, handlerBaseName, ReactEventListener.dispatchEvent.bind(null, topLevelType));
      },
      trapCapturedEvent: function (topLevelType, handlerBaseName, handle) {
        var element = handle;
        if (!element) {
          return null;
        }
        return EventListener.capture(element, handlerBaseName, ReactEventListener.dispatchEvent.bind(null, topLevelType));
      },
      monitorScrollValue: function (refresh) {
        var callback = scrollValueMonitor.bind(null, refresh);
        EventListener.listen(window, 'scroll', callback);
      },
      dispatchEvent: function (topLevelType, nativeEvent) {
        if (!ReactEventListener._enabled) {
          return;
        }
        var bookKeeping = TopLevelCallbackBookKeeping.getPooled(topLevelType, nativeEvent);
        try {
          ReactUpdates.batchedUpdates(handleTopLevelImpl, bookKeeping);
        } finally {
          TopLevelCallbackBookKeeping.release(bookKeeping);
        }
      }
    };
    module.exports = ReactEventListener;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
});
System.registerDynamic('npm:react@0.14.7/lib/ReactInjection.js', ['npm:react@0.14.7/lib/DOMProperty.js', 'npm:react@0.14.7/lib/EventPluginHub.js', 'npm:react@0.14.7/lib/ReactComponentEnvironment.js', 'npm:react@0.14.7/lib/ReactClass.js', 'npm:react@0.14.7/lib/ReactEmptyComponent.js', 'npm:react@0.14.7/lib/ReactBrowserEventEmitter.js', 'npm:react@0.14.7/lib/ReactNativeComponent.js', 'npm:react@0.14.7/lib/ReactPerf.js', 'npm:react@0.14.7/lib/ReactRootIndex.js', 'npm:react@0.14.7/lib/ReactUpdates.js'], true, function ($__require, exports, module) {
  /* */
  'use strict';

  var global = this || self,
      GLOBAL = global;
  var DOMProperty = $__require('npm:react@0.14.7/lib/DOMProperty.js');
  var EventPluginHub = $__require('npm:react@0.14.7/lib/EventPluginHub.js');
  var ReactComponentEnvironment = $__require('npm:react@0.14.7/lib/ReactComponentEnvironment.js');
  var ReactClass = $__require('npm:react@0.14.7/lib/ReactClass.js');
  var ReactEmptyComponent = $__require('npm:react@0.14.7/lib/ReactEmptyComponent.js');
  var ReactBrowserEventEmitter = $__require('npm:react@0.14.7/lib/ReactBrowserEventEmitter.js');
  var ReactNativeComponent = $__require('npm:react@0.14.7/lib/ReactNativeComponent.js');
  var ReactPerf = $__require('npm:react@0.14.7/lib/ReactPerf.js');
  var ReactRootIndex = $__require('npm:react@0.14.7/lib/ReactRootIndex.js');
  var ReactUpdates = $__require('npm:react@0.14.7/lib/ReactUpdates.js');
  var ReactInjection = {
    Component: ReactComponentEnvironment.injection,
    Class: ReactClass.injection,
    DOMProperty: DOMProperty.injection,
    EmptyComponent: ReactEmptyComponent.injection,
    EventPluginHub: EventPluginHub.injection,
    EventEmitter: ReactBrowserEventEmitter.injection,
    NativeComponent: ReactNativeComponent.injection,
    Perf: ReactPerf.injection,
    RootIndex: ReactRootIndex.injection,
    Updates: ReactUpdates.injection
  };
  module.exports = ReactInjection;
});
System.registerDynamic('npm:react@0.14.7/lib/ReactReconcileTransaction.js', ['npm:react@0.14.7/lib/CallbackQueue.js', 'npm:react@0.14.7/lib/PooledClass.js', 'npm:react@0.14.7/lib/ReactBrowserEventEmitter.js', 'npm:react@0.14.7/lib/ReactDOMFeatureFlags.js', 'npm:react@0.14.7/lib/ReactInputSelection.js', 'npm:react@0.14.7/lib/Transaction.js', 'npm:react@0.14.7/lib/Object.assign.js'], true, function ($__require, exports, module) {
  /* */
  'use strict';

  var global = this || self,
      GLOBAL = global;
  var CallbackQueue = $__require('npm:react@0.14.7/lib/CallbackQueue.js');
  var PooledClass = $__require('npm:react@0.14.7/lib/PooledClass.js');
  var ReactBrowserEventEmitter = $__require('npm:react@0.14.7/lib/ReactBrowserEventEmitter.js');
  var ReactDOMFeatureFlags = $__require('npm:react@0.14.7/lib/ReactDOMFeatureFlags.js');
  var ReactInputSelection = $__require('npm:react@0.14.7/lib/ReactInputSelection.js');
  var Transaction = $__require('npm:react@0.14.7/lib/Transaction.js');
  var assign = $__require('npm:react@0.14.7/lib/Object.assign.js');
  var SELECTION_RESTORATION = {
    initialize: ReactInputSelection.getSelectionInformation,
    close: ReactInputSelection.restoreSelection
  };
  var EVENT_SUPPRESSION = {
    initialize: function () {
      var currentlyEnabled = ReactBrowserEventEmitter.isEnabled();
      ReactBrowserEventEmitter.setEnabled(false);
      return currentlyEnabled;
    },
    close: function (previouslyEnabled) {
      ReactBrowserEventEmitter.setEnabled(previouslyEnabled);
    }
  };
  var ON_DOM_READY_QUEUEING = {
    initialize: function () {
      this.reactMountReady.reset();
    },
    close: function () {
      this.reactMountReady.notifyAll();
    }
  };
  var TRANSACTION_WRAPPERS = [SELECTION_RESTORATION, EVENT_SUPPRESSION, ON_DOM_READY_QUEUEING];
  function ReactReconcileTransaction(forceHTML) {
    this.reinitializeTransaction();
    this.renderToStaticMarkup = false;
    this.reactMountReady = CallbackQueue.getPooled(null);
    this.useCreateElement = !forceHTML && ReactDOMFeatureFlags.useCreateElement;
  }
  var Mixin = {
    getTransactionWrappers: function () {
      return TRANSACTION_WRAPPERS;
    },
    getReactMountReady: function () {
      return this.reactMountReady;
    },
    destructor: function () {
      CallbackQueue.release(this.reactMountReady);
      this.reactMountReady = null;
    }
  };
  assign(ReactReconcileTransaction.prototype, Transaction.Mixin, Mixin);
  PooledClass.addPoolingTo(ReactReconcileTransaction);
  module.exports = ReactReconcileTransaction;
});
System.registerDynamic('npm:react@0.14.7/lib/getNodeForCharacterOffset.js', [], true, function ($__require, exports, module) {
  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule getNodeForCharacterOffset
   */

  'use strict';

  /**
   * Given any node return the first leaf node without children.
   *
   * @param {DOMElement|DOMTextNode} node
   * @return {DOMElement|DOMTextNode}
   */

  var global = this || self,
      GLOBAL = global;
  function getLeafNode(node) {
    while (node && node.firstChild) {
      node = node.firstChild;
    }
    return node;
  }

  /**
   * Get the next sibling within a container. This will walk up the
   * DOM if a node's siblings have been exhausted.
   *
   * @param {DOMElement|DOMTextNode} node
   * @return {?DOMElement|DOMTextNode}
   */
  function getSiblingNode(node) {
    while (node) {
      if (node.nextSibling) {
        return node.nextSibling;
      }
      node = node.parentNode;
    }
  }

  /**
   * Get object describing the nodes which contain characters at offset.
   *
   * @param {DOMElement|DOMTextNode} root
   * @param {number} offset
   * @return {?object}
   */
  function getNodeForCharacterOffset(root, offset) {
    var node = getLeafNode(root);
    var nodeStart = 0;
    var nodeEnd = 0;

    while (node) {
      if (node.nodeType === 3) {
        nodeEnd = nodeStart + node.textContent.length;

        if (nodeStart <= offset && nodeEnd >= offset) {
          return {
            node: node,
            offset: offset - nodeStart
          };
        }

        nodeStart = nodeEnd;
      }

      node = getLeafNode(getSiblingNode(node));
    }
  }

  module.exports = getNodeForCharacterOffset;
});
System.registerDynamic('npm:react@0.14.7/lib/getTextContentAccessor.js', ['npm:fbjs@0.6.1/lib/ExecutionEnvironment.js'], true, function ($__require, exports, module) {
  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule getTextContentAccessor
   */

  'use strict';

  var global = this || self,
      GLOBAL = global;
  var ExecutionEnvironment = $__require('npm:fbjs@0.6.1/lib/ExecutionEnvironment.js');

  var contentKey = null;

  /**
   * Gets the key used to access text content on a DOM node.
   *
   * @return {?string} Key used to access text content.
   * @internal
   */
  function getTextContentAccessor() {
    if (!contentKey && ExecutionEnvironment.canUseDOM) {
      // Prefer textContent to innerText because many browsers support both but
      // SVG <text> elements don't support innerText even when <div> does.
      contentKey = 'textContent' in document.documentElement ? 'textContent' : 'innerText';
    }
    return contentKey;
  }

  module.exports = getTextContentAccessor;
});
System.registerDynamic('npm:react@0.14.7/lib/ReactDOMSelection.js', ['npm:fbjs@0.6.1/lib/ExecutionEnvironment.js', 'npm:react@0.14.7/lib/getNodeForCharacterOffset.js', 'npm:react@0.14.7/lib/getTextContentAccessor.js'], true, function ($__require, exports, module) {
  /* */
  'use strict';

  var global = this || self,
      GLOBAL = global;
  var ExecutionEnvironment = $__require('npm:fbjs@0.6.1/lib/ExecutionEnvironment.js');
  var getNodeForCharacterOffset = $__require('npm:react@0.14.7/lib/getNodeForCharacterOffset.js');
  var getTextContentAccessor = $__require('npm:react@0.14.7/lib/getTextContentAccessor.js');
  function isCollapsed(anchorNode, anchorOffset, focusNode, focusOffset) {
    return anchorNode === focusNode && anchorOffset === focusOffset;
  }
  function getIEOffsets(node) {
    var selection = document.selection;
    var selectedRange = selection.createRange();
    var selectedLength = selectedRange.text.length;
    var fromStart = selectedRange.duplicate();
    fromStart.moveToElementText(node);
    fromStart.setEndPoint('EndToStart', selectedRange);
    var startOffset = fromStart.text.length;
    var endOffset = startOffset + selectedLength;
    return {
      start: startOffset,
      end: endOffset
    };
  }
  function getModernOffsets(node) {
    var selection = window.getSelection && window.getSelection();
    if (!selection || selection.rangeCount === 0) {
      return null;
    }
    var anchorNode = selection.anchorNode;
    var anchorOffset = selection.anchorOffset;
    var focusNode = selection.focusNode;
    var focusOffset = selection.focusOffset;
    var currentRange = selection.getRangeAt(0);
    try {
      currentRange.startContainer.nodeType;
      currentRange.endContainer.nodeType;
    } catch (e) {
      return null;
    }
    var isSelectionCollapsed = isCollapsed(selection.anchorNode, selection.anchorOffset, selection.focusNode, selection.focusOffset);
    var rangeLength = isSelectionCollapsed ? 0 : currentRange.toString().length;
    var tempRange = currentRange.cloneRange();
    tempRange.selectNodeContents(node);
    tempRange.setEnd(currentRange.startContainer, currentRange.startOffset);
    var isTempRangeCollapsed = isCollapsed(tempRange.startContainer, tempRange.startOffset, tempRange.endContainer, tempRange.endOffset);
    var start = isTempRangeCollapsed ? 0 : tempRange.toString().length;
    var end = start + rangeLength;
    var detectionRange = document.createRange();
    detectionRange.setStart(anchorNode, anchorOffset);
    detectionRange.setEnd(focusNode, focusOffset);
    var isBackward = detectionRange.collapsed;
    return {
      start: isBackward ? end : start,
      end: isBackward ? start : end
    };
  }
  function setIEOffsets(node, offsets) {
    var range = document.selection.createRange().duplicate();
    var start, end;
    if (typeof offsets.end === 'undefined') {
      start = offsets.start;
      end = start;
    } else if (offsets.start > offsets.end) {
      start = offsets.end;
      end = offsets.start;
    } else {
      start = offsets.start;
      end = offsets.end;
    }
    range.moveToElementText(node);
    range.moveStart('character', start);
    range.setEndPoint('EndToStart', range);
    range.moveEnd('character', end - start);
    range.select();
  }
  function setModernOffsets(node, offsets) {
    if (!window.getSelection) {
      return;
    }
    var selection = window.getSelection();
    var length = node[getTextContentAccessor()].length;
    var start = Math.min(offsets.start, length);
    var end = typeof offsets.end === 'undefined' ? start : Math.min(offsets.end, length);
    if (!selection.extend && start > end) {
      var temp = end;
      end = start;
      start = temp;
    }
    var startMarker = getNodeForCharacterOffset(node, start);
    var endMarker = getNodeForCharacterOffset(node, end);
    if (startMarker && endMarker) {
      var range = document.createRange();
      range.setStart(startMarker.node, startMarker.offset);
      selection.removeAllRanges();
      if (start > end) {
        selection.addRange(range);
        selection.extend(endMarker.node, endMarker.offset);
      } else {
        range.setEnd(endMarker.node, endMarker.offset);
        selection.addRange(range);
      }
    }
  }
  var useIEOffsets = ExecutionEnvironment.canUseDOM && 'selection' in document && !('getSelection' in window);
  var ReactDOMSelection = {
    getOffsets: useIEOffsets ? getIEOffsets : getModernOffsets,
    setOffsets: useIEOffsets ? setIEOffsets : setModernOffsets
  };
  module.exports = ReactDOMSelection;
});
System.registerDynamic('npm:fbjs@0.6.1/lib/focusNode.js', [], true, function ($__require, exports, module) {
  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule focusNode
   */

  'use strict';

  /**
   * @param {DOMElement} node input/textarea to focus
   */

  var global = this || self,
      GLOBAL = global;
  function focusNode(node) {
    // IE8 can throw "Can't move focus to the control because it is invisible,
    // not enabled, or of a type that does not accept the focus." for all kinds of
    // reasons that are too expensive and fragile to test.
    try {
      node.focus();
    } catch (e) {}
  }

  module.exports = focusNode;
});
System.registerDynamic('npm:react@0.14.7/lib/ReactInputSelection.js', ['npm:react@0.14.7/lib/ReactDOMSelection.js', 'npm:fbjs@0.6.1/lib/containsNode.js', 'npm:fbjs@0.6.1/lib/focusNode.js', 'npm:fbjs@0.6.1/lib/getActiveElement.js'], true, function ($__require, exports, module) {
  /* */
  'use strict';

  var global = this || self,
      GLOBAL = global;
  var ReactDOMSelection = $__require('npm:react@0.14.7/lib/ReactDOMSelection.js');
  var containsNode = $__require('npm:fbjs@0.6.1/lib/containsNode.js');
  var focusNode = $__require('npm:fbjs@0.6.1/lib/focusNode.js');
  var getActiveElement = $__require('npm:fbjs@0.6.1/lib/getActiveElement.js');
  function isInDocument(node) {
    return containsNode(document.documentElement, node);
  }
  var ReactInputSelection = {
    hasSelectionCapabilities: function (elem) {
      var nodeName = elem && elem.nodeName && elem.nodeName.toLowerCase();
      return nodeName && (nodeName === 'input' && elem.type === 'text' || nodeName === 'textarea' || elem.contentEditable === 'true');
    },
    getSelectionInformation: function () {
      var focusedElem = getActiveElement();
      return {
        focusedElem: focusedElem,
        selectionRange: ReactInputSelection.hasSelectionCapabilities(focusedElem) ? ReactInputSelection.getSelection(focusedElem) : null
      };
    },
    restoreSelection: function (priorSelectionInformation) {
      var curFocusedElem = getActiveElement();
      var priorFocusedElem = priorSelectionInformation.focusedElem;
      var priorSelectionRange = priorSelectionInformation.selectionRange;
      if (curFocusedElem !== priorFocusedElem && isInDocument(priorFocusedElem)) {
        if (ReactInputSelection.hasSelectionCapabilities(priorFocusedElem)) {
          ReactInputSelection.setSelection(priorFocusedElem, priorSelectionRange);
        }
        focusNode(priorFocusedElem);
      }
    },
    getSelection: function (input) {
      var selection;
      if ('selectionStart' in input) {
        selection = {
          start: input.selectionStart,
          end: input.selectionEnd
        };
      } else if (document.selection && input.nodeName && input.nodeName.toLowerCase() === 'input') {
        var range = document.selection.createRange();
        if (range.parentElement() === input) {
          selection = {
            start: -range.moveStart('character', -input.value.length),
            end: -range.moveEnd('character', -input.value.length)
          };
        }
      } else {
        selection = ReactDOMSelection.getOffsets(input);
      }
      return selection || {
        start: 0,
        end: 0
      };
    },
    setSelection: function (input, offsets) {
      var start = offsets.start;
      var end = offsets.end;
      if (typeof end === 'undefined') {
        end = start;
      }
      if ('selectionStart' in input) {
        input.selectionStart = start;
        input.selectionEnd = Math.min(end, input.value.length);
      } else if (document.selection && input.nodeName && input.nodeName.toLowerCase() === 'input') {
        var range = input.createTextRange();
        range.collapse(true);
        range.moveStart('character', start);
        range.moveEnd('character', end - start);
        range.select();
      } else {
        ReactDOMSelection.setOffsets(input, offsets);
      }
    }
  };
  module.exports = ReactInputSelection;
});
System.registerDynamic('npm:fbjs@0.6.1/lib/getActiveElement.js', [], true, function ($__require, exports, module) {
  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule getActiveElement
   * @typechecks
   */

  /* eslint-disable fb-www/typeof-undefined */

  /**
   * Same as document.activeElement but wraps in a try-catch block. In IE it is
   * not safe to call document.activeElement if there is nothing focused.
   *
   * The activeElement will be null only if the document or document body is not
   * yet defined.
   */
  'use strict';

  var global = this || self,
      GLOBAL = global;
  function getActiveElement() /*?DOMElement*/{
    if (typeof document === 'undefined') {
      return null;
    }
    try {
      return document.activeElement || document.body;
    } catch (e) {
      return document.body;
    }
  }

  module.exports = getActiveElement;
});
System.registerDynamic('npm:react@0.14.7/lib/isTextInputElement.js', [], true, function ($__require, exports, module) {
  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule isTextInputElement
   */

  'use strict';

  /**
   * @see http://www.whatwg.org/specs/web-apps/current-work/multipage/the-input-element.html#input-type-attr-summary
   */

  var global = this || self,
      GLOBAL = global;
  var supportedInputTypes = {
    'color': true,
    'date': true,
    'datetime': true,
    'datetime-local': true,
    'email': true,
    'month': true,
    'number': true,
    'password': true,
    'range': true,
    'search': true,
    'tel': true,
    'text': true,
    'time': true,
    'url': true,
    'week': true
  };

  function isTextInputElement(elem) {
    var nodeName = elem && elem.nodeName && elem.nodeName.toLowerCase();
    return nodeName && (nodeName === 'input' && supportedInputTypes[elem.type] || nodeName === 'textarea');
  }

  module.exports = isTextInputElement;
});
System.registerDynamic('npm:fbjs@0.6.1/lib/shallowEqual.js', [], true, function ($__require, exports, module) {
  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule shallowEqual
   * @typechecks
   * 
   */

  'use strict';

  var global = this || self,
      GLOBAL = global;
  var hasOwnProperty = Object.prototype.hasOwnProperty;

  /**
   * Performs equality by iterating through keys on an object and returning false
   * when any key has values which are not strictly equal between the arguments.
   * Returns true when the values of all keys are strictly equal.
   */
  function shallowEqual(objA, objB) {
    if (objA === objB) {
      return true;
    }

    if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
      return false;
    }

    var keysA = Object.keys(objA);
    var keysB = Object.keys(objB);

    if (keysA.length !== keysB.length) {
      return false;
    }

    // Test for A's keys different from B.
    var bHasOwnProperty = hasOwnProperty.bind(objB);
    for (var i = 0; i < keysA.length; i++) {
      if (!bHasOwnProperty(keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
        return false;
      }
    }

    return true;
  }

  module.exports = shallowEqual;
});
System.registerDynamic('npm:react@0.14.7/lib/SelectEventPlugin.js', ['npm:react@0.14.7/lib/EventConstants.js', 'npm:react@0.14.7/lib/EventPropagators.js', 'npm:fbjs@0.6.1/lib/ExecutionEnvironment.js', 'npm:react@0.14.7/lib/ReactInputSelection.js', 'npm:react@0.14.7/lib/SyntheticEvent.js', 'npm:fbjs@0.6.1/lib/getActiveElement.js', 'npm:react@0.14.7/lib/isTextInputElement.js', 'npm:fbjs@0.6.1/lib/keyOf.js', 'npm:fbjs@0.6.1/lib/shallowEqual.js'], true, function ($__require, exports, module) {
  /* */
  'use strict';

  var global = this || self,
      GLOBAL = global;
  var EventConstants = $__require('npm:react@0.14.7/lib/EventConstants.js');
  var EventPropagators = $__require('npm:react@0.14.7/lib/EventPropagators.js');
  var ExecutionEnvironment = $__require('npm:fbjs@0.6.1/lib/ExecutionEnvironment.js');
  var ReactInputSelection = $__require('npm:react@0.14.7/lib/ReactInputSelection.js');
  var SyntheticEvent = $__require('npm:react@0.14.7/lib/SyntheticEvent.js');
  var getActiveElement = $__require('npm:fbjs@0.6.1/lib/getActiveElement.js');
  var isTextInputElement = $__require('npm:react@0.14.7/lib/isTextInputElement.js');
  var keyOf = $__require('npm:fbjs@0.6.1/lib/keyOf.js');
  var shallowEqual = $__require('npm:fbjs@0.6.1/lib/shallowEqual.js');
  var topLevelTypes = EventConstants.topLevelTypes;
  var skipSelectionChangeEvent = ExecutionEnvironment.canUseDOM && 'documentMode' in document && document.documentMode <= 11;
  var eventTypes = { select: {
      phasedRegistrationNames: {
        bubbled: keyOf({ onSelect: null }),
        captured: keyOf({ onSelectCapture: null })
      },
      dependencies: [topLevelTypes.topBlur, topLevelTypes.topContextMenu, topLevelTypes.topFocus, topLevelTypes.topKeyDown, topLevelTypes.topMouseDown, topLevelTypes.topMouseUp, topLevelTypes.topSelectionChange]
    } };
  var activeElement = null;
  var activeElementID = null;
  var lastSelection = null;
  var mouseDown = false;
  var hasListener = false;
  var ON_SELECT_KEY = keyOf({ onSelect: null });
  function getSelection(node) {
    if ('selectionStart' in node && ReactInputSelection.hasSelectionCapabilities(node)) {
      return {
        start: node.selectionStart,
        end: node.selectionEnd
      };
    } else if (window.getSelection) {
      var selection = window.getSelection();
      return {
        anchorNode: selection.anchorNode,
        anchorOffset: selection.anchorOffset,
        focusNode: selection.focusNode,
        focusOffset: selection.focusOffset
      };
    } else if (document.selection) {
      var range = document.selection.createRange();
      return {
        parentElement: range.parentElement(),
        text: range.text,
        top: range.boundingTop,
        left: range.boundingLeft
      };
    }
  }
  function constructSelectEvent(nativeEvent, nativeEventTarget) {
    if (mouseDown || activeElement == null || activeElement !== getActiveElement()) {
      return null;
    }
    var currentSelection = getSelection(activeElement);
    if (!lastSelection || !shallowEqual(lastSelection, currentSelection)) {
      lastSelection = currentSelection;
      var syntheticEvent = SyntheticEvent.getPooled(eventTypes.select, activeElementID, nativeEvent, nativeEventTarget);
      syntheticEvent.type = 'select';
      syntheticEvent.target = activeElement;
      EventPropagators.accumulateTwoPhaseDispatches(syntheticEvent);
      return syntheticEvent;
    }
    return null;
  }
  var SelectEventPlugin = {
    eventTypes: eventTypes,
    extractEvents: function (topLevelType, topLevelTarget, topLevelTargetID, nativeEvent, nativeEventTarget) {
      if (!hasListener) {
        return null;
      }
      switch (topLevelType) {
        case topLevelTypes.topFocus:
          if (isTextInputElement(topLevelTarget) || topLevelTarget.contentEditable === 'true') {
            activeElement = topLevelTarget;
            activeElementID = topLevelTargetID;
            lastSelection = null;
          }
          break;
        case topLevelTypes.topBlur:
          activeElement = null;
          activeElementID = null;
          lastSelection = null;
          break;
        case topLevelTypes.topMouseDown:
          mouseDown = true;
          break;
        case topLevelTypes.topContextMenu:
        case topLevelTypes.topMouseUp:
          mouseDown = false;
          return constructSelectEvent(nativeEvent, nativeEventTarget);
        case topLevelTypes.topSelectionChange:
          if (skipSelectionChangeEvent) {
            break;
          }
        case topLevelTypes.topKeyDown:
        case topLevelTypes.topKeyUp:
          return constructSelectEvent(nativeEvent, nativeEventTarget);
      }
      return null;
    },
    didPutListener: function (id, registrationName, listener) {
      if (registrationName === ON_SELECT_KEY) {
        hasListener = true;
      }
    }
  };
  module.exports = SelectEventPlugin;
});
System.registerDynamic('npm:react@0.14.7/lib/ServerReactRootIndex.js', [], true, function ($__require, exports, module) {
  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule ServerReactRootIndex
   * @typechecks
   */

  'use strict';

  /**
   * Size of the reactRoot ID space. We generate random numbers for React root
   * IDs and if there's a collision the events and DOM update system will
   * get confused. In the future we need a way to generate GUIDs but for
   * now this will work on a smaller scale.
   */

  var global = this || self,
      GLOBAL = global;
  var GLOBAL_MOUNT_POINT_MAX = Math.pow(2, 53);

  var ServerReactRootIndex = {
    createReactRootIndex: function () {
      return Math.ceil(Math.random() * GLOBAL_MOUNT_POINT_MAX);
    }
  };

  module.exports = ServerReactRootIndex;
});
System.registerDynamic('npm:fbjs@0.6.1/lib/EventListener.js', ['npm:fbjs@0.6.1/lib/emptyFunction.js', 'github:jspm/nodelibs-process@0.1.2.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  (function (process) {
    'use strict';

    var emptyFunction = $__require('npm:fbjs@0.6.1/lib/emptyFunction.js');
    var EventListener = {
      listen: function (target, eventType, callback) {
        if (target.addEventListener) {
          target.addEventListener(eventType, callback, false);
          return { remove: function () {
              target.removeEventListener(eventType, callback, false);
            } };
        } else if (target.attachEvent) {
          target.attachEvent('on' + eventType, callback);
          return { remove: function () {
              target.detachEvent('on' + eventType, callback);
            } };
        }
      },
      capture: function (target, eventType, callback) {
        if (target.addEventListener) {
          target.addEventListener(eventType, callback, true);
          return { remove: function () {
              target.removeEventListener(eventType, callback, true);
            } };
        } else {
          if ('production' !== 'production') {
            console.error('Attempted to listen to events during the capture phase on a ' + 'browser that does not support the capture phase. Your application ' + 'will not receive some events.');
          }
          return { remove: emptyFunction };
        }
      },
      registerDefault: function () {}
    };
    module.exports = EventListener;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
});
System.registerDynamic('npm:react@0.14.7/lib/EventPropagators.js', ['npm:react@0.14.7/lib/EventConstants.js', 'npm:react@0.14.7/lib/EventPluginHub.js', 'npm:fbjs@0.6.1/lib/warning.js', 'npm:react@0.14.7/lib/accumulateInto.js', 'npm:react@0.14.7/lib/forEachAccumulated.js', 'github:jspm/nodelibs-process@0.1.2.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  (function (process) {
    'use strict';

    var EventConstants = $__require('npm:react@0.14.7/lib/EventConstants.js');
    var EventPluginHub = $__require('npm:react@0.14.7/lib/EventPluginHub.js');
    var warning = $__require('npm:fbjs@0.6.1/lib/warning.js');
    var accumulateInto = $__require('npm:react@0.14.7/lib/accumulateInto.js');
    var forEachAccumulated = $__require('npm:react@0.14.7/lib/forEachAccumulated.js');
    var PropagationPhases = EventConstants.PropagationPhases;
    var getListener = EventPluginHub.getListener;
    function listenerAtPhase(id, event, propagationPhase) {
      var registrationName = event.dispatchConfig.phasedRegistrationNames[propagationPhase];
      return getListener(id, registrationName);
    }
    function accumulateDirectionalDispatches(domID, upwards, event) {
      if ('production' !== 'production') {
        'production' !== 'production' ? warning(domID, 'Dispatching id must not be null') : undefined;
      }
      var phase = upwards ? PropagationPhases.bubbled : PropagationPhases.captured;
      var listener = listenerAtPhase(domID, event, phase);
      if (listener) {
        event._dispatchListeners = accumulateInto(event._dispatchListeners, listener);
        event._dispatchIDs = accumulateInto(event._dispatchIDs, domID);
      }
    }
    function accumulateTwoPhaseDispatchesSingle(event) {
      if (event && event.dispatchConfig.phasedRegistrationNames) {
        EventPluginHub.injection.getInstanceHandle().traverseTwoPhase(event.dispatchMarker, accumulateDirectionalDispatches, event);
      }
    }
    function accumulateTwoPhaseDispatchesSingleSkipTarget(event) {
      if (event && event.dispatchConfig.phasedRegistrationNames) {
        EventPluginHub.injection.getInstanceHandle().traverseTwoPhaseSkipTarget(event.dispatchMarker, accumulateDirectionalDispatches, event);
      }
    }
    function accumulateDispatches(id, ignoredDirection, event) {
      if (event && event.dispatchConfig.registrationName) {
        var registrationName = event.dispatchConfig.registrationName;
        var listener = getListener(id, registrationName);
        if (listener) {
          event._dispatchListeners = accumulateInto(event._dispatchListeners, listener);
          event._dispatchIDs = accumulateInto(event._dispatchIDs, id);
        }
      }
    }
    function accumulateDirectDispatchesSingle(event) {
      if (event && event.dispatchConfig.registrationName) {
        accumulateDispatches(event.dispatchMarker, null, event);
      }
    }
    function accumulateTwoPhaseDispatches(events) {
      forEachAccumulated(events, accumulateTwoPhaseDispatchesSingle);
    }
    function accumulateTwoPhaseDispatchesSkipTarget(events) {
      forEachAccumulated(events, accumulateTwoPhaseDispatchesSingleSkipTarget);
    }
    function accumulateEnterLeaveDispatches(leave, enter, fromID, toID) {
      EventPluginHub.injection.getInstanceHandle().traverseEnterLeave(fromID, toID, accumulateDispatches, leave, enter);
    }
    function accumulateDirectDispatches(events) {
      forEachAccumulated(events, accumulateDirectDispatchesSingle);
    }
    var EventPropagators = {
      accumulateTwoPhaseDispatches: accumulateTwoPhaseDispatches,
      accumulateTwoPhaseDispatchesSkipTarget: accumulateTwoPhaseDispatchesSkipTarget,
      accumulateDirectDispatches: accumulateDirectDispatches,
      accumulateEnterLeaveDispatches: accumulateEnterLeaveDispatches
    };
    module.exports = EventPropagators;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
});
System.registerDynamic('npm:react@0.14.7/lib/SyntheticClipboardEvent.js', ['npm:react@0.14.7/lib/SyntheticEvent.js'], true, function ($__require, exports, module) {
  /* */
  'use strict';

  var global = this || self,
      GLOBAL = global;
  var SyntheticEvent = $__require('npm:react@0.14.7/lib/SyntheticEvent.js');
  var ClipboardEventInterface = { clipboardData: function (event) {
      return 'clipboardData' in event ? event.clipboardData : window.clipboardData;
    } };
  function SyntheticClipboardEvent(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
    SyntheticEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
  }
  SyntheticEvent.augmentClass(SyntheticClipboardEvent, ClipboardEventInterface);
  module.exports = SyntheticClipboardEvent;
});
System.registerDynamic('npm:react@0.14.7/lib/SyntheticFocusEvent.js', ['npm:react@0.14.7/lib/SyntheticUIEvent.js'], true, function ($__require, exports, module) {
  /* */
  'use strict';

  var global = this || self,
      GLOBAL = global;
  var SyntheticUIEvent = $__require('npm:react@0.14.7/lib/SyntheticUIEvent.js');
  var FocusEventInterface = { relatedTarget: null };
  function SyntheticFocusEvent(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
    SyntheticUIEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
  }
  SyntheticUIEvent.augmentClass(SyntheticFocusEvent, FocusEventInterface);
  module.exports = SyntheticFocusEvent;
});
System.registerDynamic('npm:react@0.14.7/lib/getEventKey.js', ['npm:react@0.14.7/lib/getEventCharCode.js'], true, function ($__require, exports, module) {
  /* */
  'use strict';

  var global = this || self,
      GLOBAL = global;
  var getEventCharCode = $__require('npm:react@0.14.7/lib/getEventCharCode.js');
  var normalizeKey = {
    'Esc': 'Escape',
    'Spacebar': ' ',
    'Left': 'ArrowLeft',
    'Up': 'ArrowUp',
    'Right': 'ArrowRight',
    'Down': 'ArrowDown',
    'Del': 'Delete',
    'Win': 'OS',
    'Menu': 'ContextMenu',
    'Apps': 'ContextMenu',
    'Scroll': 'ScrollLock',
    'MozPrintableKey': 'Unidentified'
  };
  var translateToKey = {
    8: 'Backspace',
    9: 'Tab',
    12: 'Clear',
    13: 'Enter',
    16: 'Shift',
    17: 'Control',
    18: 'Alt',
    19: 'Pause',
    20: 'CapsLock',
    27: 'Escape',
    32: ' ',
    33: 'PageUp',
    34: 'PageDown',
    35: 'End',
    36: 'Home',
    37: 'ArrowLeft',
    38: 'ArrowUp',
    39: 'ArrowRight',
    40: 'ArrowDown',
    45: 'Insert',
    46: 'Delete',
    112: 'F1',
    113: 'F2',
    114: 'F3',
    115: 'F4',
    116: 'F5',
    117: 'F6',
    118: 'F7',
    119: 'F8',
    120: 'F9',
    121: 'F10',
    122: 'F11',
    123: 'F12',
    144: 'NumLock',
    145: 'ScrollLock',
    224: 'Meta'
  };
  function getEventKey(nativeEvent) {
    if (nativeEvent.key) {
      var key = normalizeKey[nativeEvent.key] || nativeEvent.key;
      if (key !== 'Unidentified') {
        return key;
      }
    }
    if (nativeEvent.type === 'keypress') {
      var charCode = getEventCharCode(nativeEvent);
      return charCode === 13 ? 'Enter' : String.fromCharCode(charCode);
    }
    if (nativeEvent.type === 'keydown' || nativeEvent.type === 'keyup') {
      return translateToKey[nativeEvent.keyCode] || 'Unidentified';
    }
    return '';
  }
  module.exports = getEventKey;
});
System.registerDynamic('npm:react@0.14.7/lib/SyntheticKeyboardEvent.js', ['npm:react@0.14.7/lib/SyntheticUIEvent.js', 'npm:react@0.14.7/lib/getEventCharCode.js', 'npm:react@0.14.7/lib/getEventKey.js', 'npm:react@0.14.7/lib/getEventModifierState.js'], true, function ($__require, exports, module) {
  /* */
  'use strict';

  var global = this || self,
      GLOBAL = global;
  var SyntheticUIEvent = $__require('npm:react@0.14.7/lib/SyntheticUIEvent.js');
  var getEventCharCode = $__require('npm:react@0.14.7/lib/getEventCharCode.js');
  var getEventKey = $__require('npm:react@0.14.7/lib/getEventKey.js');
  var getEventModifierState = $__require('npm:react@0.14.7/lib/getEventModifierState.js');
  var KeyboardEventInterface = {
    key: getEventKey,
    location: null,
    ctrlKey: null,
    shiftKey: null,
    altKey: null,
    metaKey: null,
    repeat: null,
    locale: null,
    getModifierState: getEventModifierState,
    charCode: function (event) {
      if (event.type === 'keypress') {
        return getEventCharCode(event);
      }
      return 0;
    },
    keyCode: function (event) {
      if (event.type === 'keydown' || event.type === 'keyup') {
        return event.keyCode;
      }
      return 0;
    },
    which: function (event) {
      if (event.type === 'keypress') {
        return getEventCharCode(event);
      }
      if (event.type === 'keydown' || event.type === 'keyup') {
        return event.keyCode;
      }
      return 0;
    }
  };
  function SyntheticKeyboardEvent(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
    SyntheticUIEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
  }
  SyntheticUIEvent.augmentClass(SyntheticKeyboardEvent, KeyboardEventInterface);
  module.exports = SyntheticKeyboardEvent;
});
System.registerDynamic('npm:react@0.14.7/lib/SyntheticDragEvent.js', ['npm:react@0.14.7/lib/SyntheticMouseEvent.js'], true, function ($__require, exports, module) {
  /* */
  'use strict';

  var global = this || self,
      GLOBAL = global;
  var SyntheticMouseEvent = $__require('npm:react@0.14.7/lib/SyntheticMouseEvent.js');
  var DragEventInterface = { dataTransfer: null };
  function SyntheticDragEvent(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
    SyntheticMouseEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
  }
  SyntheticMouseEvent.augmentClass(SyntheticDragEvent, DragEventInterface);
  module.exports = SyntheticDragEvent;
});
System.registerDynamic('npm:react@0.14.7/lib/SyntheticTouchEvent.js', ['npm:react@0.14.7/lib/SyntheticUIEvent.js', 'npm:react@0.14.7/lib/getEventModifierState.js'], true, function ($__require, exports, module) {
  /* */
  'use strict';

  var global = this || self,
      GLOBAL = global;
  var SyntheticUIEvent = $__require('npm:react@0.14.7/lib/SyntheticUIEvent.js');
  var getEventModifierState = $__require('npm:react@0.14.7/lib/getEventModifierState.js');
  var TouchEventInterface = {
    touches: null,
    targetTouches: null,
    changedTouches: null,
    altKey: null,
    metaKey: null,
    ctrlKey: null,
    shiftKey: null,
    getModifierState: getEventModifierState
  };
  function SyntheticTouchEvent(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
    SyntheticUIEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
  }
  SyntheticUIEvent.augmentClass(SyntheticTouchEvent, TouchEventInterface);
  module.exports = SyntheticTouchEvent;
});
System.registerDynamic('npm:react@0.14.7/lib/SyntheticEvent.js', ['npm:react@0.14.7/lib/PooledClass.js', 'npm:react@0.14.7/lib/Object.assign.js', 'npm:fbjs@0.6.1/lib/emptyFunction.js', 'npm:fbjs@0.6.1/lib/warning.js', 'github:jspm/nodelibs-process@0.1.2.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  (function (process) {
    'use strict';

    var PooledClass = $__require('npm:react@0.14.7/lib/PooledClass.js');
    var assign = $__require('npm:react@0.14.7/lib/Object.assign.js');
    var emptyFunction = $__require('npm:fbjs@0.6.1/lib/emptyFunction.js');
    var warning = $__require('npm:fbjs@0.6.1/lib/warning.js');
    var EventInterface = {
      type: null,
      target: null,
      currentTarget: emptyFunction.thatReturnsNull,
      eventPhase: null,
      bubbles: null,
      cancelable: null,
      timeStamp: function (event) {
        return event.timeStamp || Date.now();
      },
      defaultPrevented: null,
      isTrusted: null
    };
    function SyntheticEvent(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
      this.dispatchConfig = dispatchConfig;
      this.dispatchMarker = dispatchMarker;
      this.nativeEvent = nativeEvent;
      var Interface = this.constructor.Interface;
      for (var propName in Interface) {
        if (!Interface.hasOwnProperty(propName)) {
          continue;
        }
        var normalize = Interface[propName];
        if (normalize) {
          this[propName] = normalize(nativeEvent);
        } else {
          if (propName === 'target') {
            this.target = nativeEventTarget;
          } else {
            this[propName] = nativeEvent[propName];
          }
        }
      }
      var defaultPrevented = nativeEvent.defaultPrevented != null ? nativeEvent.defaultPrevented : nativeEvent.returnValue === false;
      if (defaultPrevented) {
        this.isDefaultPrevented = emptyFunction.thatReturnsTrue;
      } else {
        this.isDefaultPrevented = emptyFunction.thatReturnsFalse;
      }
      this.isPropagationStopped = emptyFunction.thatReturnsFalse;
    }
    assign(SyntheticEvent.prototype, {
      preventDefault: function () {
        this.defaultPrevented = true;
        var event = this.nativeEvent;
        if ('production' !== 'production') {
          'production' !== 'production' ? warning(event, 'This synthetic event is reused for performance reasons. If you\'re ' + 'seeing this, you\'re calling `preventDefault` on a ' + 'released/nullified synthetic event. This is a no-op. See ' + 'https://fb.me/react-event-pooling for more information.') : undefined;
        }
        if (!event) {
          return;
        }
        if (event.preventDefault) {
          event.preventDefault();
        } else {
          event.returnValue = false;
        }
        this.isDefaultPrevented = emptyFunction.thatReturnsTrue;
      },
      stopPropagation: function () {
        var event = this.nativeEvent;
        if ('production' !== 'production') {
          'production' !== 'production' ? warning(event, 'This synthetic event is reused for performance reasons. If you\'re ' + 'seeing this, you\'re calling `stopPropagation` on a ' + 'released/nullified synthetic event. This is a no-op. See ' + 'https://fb.me/react-event-pooling for more information.') : undefined;
        }
        if (!event) {
          return;
        }
        if (event.stopPropagation) {
          event.stopPropagation();
        } else {
          event.cancelBubble = true;
        }
        this.isPropagationStopped = emptyFunction.thatReturnsTrue;
      },
      persist: function () {
        this.isPersistent = emptyFunction.thatReturnsTrue;
      },
      isPersistent: emptyFunction.thatReturnsFalse,
      destructor: function () {
        var Interface = this.constructor.Interface;
        for (var propName in Interface) {
          this[propName] = null;
        }
        this.dispatchConfig = null;
        this.dispatchMarker = null;
        this.nativeEvent = null;
      }
    });
    SyntheticEvent.Interface = EventInterface;
    SyntheticEvent.augmentClass = function (Class, Interface) {
      var Super = this;
      var prototype = Object.create(Super.prototype);
      assign(prototype, Class.prototype);
      Class.prototype = prototype;
      Class.prototype.constructor = Class;
      Class.Interface = assign({}, Super.Interface, Interface);
      Class.augmentClass = Super.augmentClass;
      PooledClass.addPoolingTo(Class, PooledClass.fourArgumentPooler);
    };
    PooledClass.addPoolingTo(SyntheticEvent, PooledClass.fourArgumentPooler);
    module.exports = SyntheticEvent;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
});
System.registerDynamic('npm:react@0.14.7/lib/getEventTarget.js', [], true, function ($__require, exports, module) {
  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule getEventTarget
   * @typechecks static-only
   */

  'use strict';

  /**
   * Gets the target node from a native browser event by accounting for
   * inconsistencies in browser DOM APIs.
   *
   * @param {object} nativeEvent Native browser event.
   * @return {DOMEventTarget} Target node.
   */

  var global = this || self,
      GLOBAL = global;
  function getEventTarget(nativeEvent) {
    var target = nativeEvent.target || nativeEvent.srcElement || window;
    // Safari may fire events on text nodes (Node.TEXT_NODE is 3).
    // @see http://www.quirksmode.org/js/events_properties.html
    return target.nodeType === 3 ? target.parentNode : target;
  }

  module.exports = getEventTarget;
});
System.registerDynamic('npm:react@0.14.7/lib/SyntheticUIEvent.js', ['npm:react@0.14.7/lib/SyntheticEvent.js', 'npm:react@0.14.7/lib/getEventTarget.js'], true, function ($__require, exports, module) {
  /* */
  'use strict';

  var global = this || self,
      GLOBAL = global;
  var SyntheticEvent = $__require('npm:react@0.14.7/lib/SyntheticEvent.js');
  var getEventTarget = $__require('npm:react@0.14.7/lib/getEventTarget.js');
  var UIEventInterface = {
    view: function (event) {
      if (event.view) {
        return event.view;
      }
      var target = getEventTarget(event);
      if (target != null && target.window === target) {
        return target;
      }
      var doc = target.ownerDocument;
      if (doc) {
        return doc.defaultView || doc.parentWindow;
      } else {
        return window;
      }
    },
    detail: function (event) {
      return event.detail || 0;
    }
  };
  function SyntheticUIEvent(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
    SyntheticEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
  }
  SyntheticEvent.augmentClass(SyntheticUIEvent, UIEventInterface);
  module.exports = SyntheticUIEvent;
});
System.registerDynamic('npm:react@0.14.7/lib/getEventModifierState.js', [], true, function ($__require, exports, module) {
  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule getEventModifierState
   * @typechecks static-only
   */

  'use strict';

  /**
   * Translation from modifier key to the associated property in the event.
   * @see http://www.w3.org/TR/DOM-Level-3-Events/#keys-Modifiers
   */

  var global = this || self,
      GLOBAL = global;
  var modifierKeyToProp = {
    'Alt': 'altKey',
    'Control': 'ctrlKey',
    'Meta': 'metaKey',
    'Shift': 'shiftKey'
  };

  // IE8 does not implement getModifierState so we simply map it to the only
  // modifier keys exposed by the event itself, does not support Lock-keys.
  // Currently, all major browsers except Chrome seems to support Lock-keys.
  function modifierStateGetter(keyArg) {
    var syntheticEvent = this;
    var nativeEvent = syntheticEvent.nativeEvent;
    if (nativeEvent.getModifierState) {
      return nativeEvent.getModifierState(keyArg);
    }
    var keyProp = modifierKeyToProp[keyArg];
    return keyProp ? !!nativeEvent[keyProp] : false;
  }

  function getEventModifierState(nativeEvent) {
    return modifierStateGetter;
  }

  module.exports = getEventModifierState;
});
System.registerDynamic('npm:react@0.14.7/lib/SyntheticMouseEvent.js', ['npm:react@0.14.7/lib/SyntheticUIEvent.js', 'npm:react@0.14.7/lib/ViewportMetrics.js', 'npm:react@0.14.7/lib/getEventModifierState.js'], true, function ($__require, exports, module) {
  /* */
  'use strict';

  var global = this || self,
      GLOBAL = global;
  var SyntheticUIEvent = $__require('npm:react@0.14.7/lib/SyntheticUIEvent.js');
  var ViewportMetrics = $__require('npm:react@0.14.7/lib/ViewportMetrics.js');
  var getEventModifierState = $__require('npm:react@0.14.7/lib/getEventModifierState.js');
  var MouseEventInterface = {
    screenX: null,
    screenY: null,
    clientX: null,
    clientY: null,
    ctrlKey: null,
    shiftKey: null,
    altKey: null,
    metaKey: null,
    getModifierState: getEventModifierState,
    button: function (event) {
      var button = event.button;
      if ('which' in event) {
        return button;
      }
      return button === 2 ? 2 : button === 4 ? 1 : 0;
    },
    buttons: null,
    relatedTarget: function (event) {
      return event.relatedTarget || (event.fromElement === event.srcElement ? event.toElement : event.fromElement);
    },
    pageX: function (event) {
      return 'pageX' in event ? event.pageX : event.clientX + ViewportMetrics.currentScrollLeft;
    },
    pageY: function (event) {
      return 'pageY' in event ? event.pageY : event.clientY + ViewportMetrics.currentScrollTop;
    }
  };
  function SyntheticMouseEvent(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
    SyntheticUIEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
  }
  SyntheticUIEvent.augmentClass(SyntheticMouseEvent, MouseEventInterface);
  module.exports = SyntheticMouseEvent;
});
System.registerDynamic('npm:react@0.14.7/lib/SyntheticWheelEvent.js', ['npm:react@0.14.7/lib/SyntheticMouseEvent.js'], true, function ($__require, exports, module) {
  /* */
  'use strict';

  var global = this || self,
      GLOBAL = global;
  var SyntheticMouseEvent = $__require('npm:react@0.14.7/lib/SyntheticMouseEvent.js');
  var WheelEventInterface = {
    deltaX: function (event) {
      return 'deltaX' in event ? event.deltaX : 'wheelDeltaX' in event ? -event.wheelDeltaX : 0;
    },
    deltaY: function (event) {
      return 'deltaY' in event ? event.deltaY : 'wheelDeltaY' in event ? -event.wheelDeltaY : 'wheelDelta' in event ? -event.wheelDelta : 0;
    },
    deltaZ: null,
    deltaMode: null
  };
  function SyntheticWheelEvent(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
    SyntheticMouseEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
  }
  SyntheticMouseEvent.augmentClass(SyntheticWheelEvent, WheelEventInterface);
  module.exports = SyntheticWheelEvent;
});
System.registerDynamic('npm:react@0.14.7/lib/getEventCharCode.js', [], true, function ($__require, exports, module) {
  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule getEventCharCode
   * @typechecks static-only
   */

  'use strict';

  /**
   * `charCode` represents the actual "character code" and is safe to use with
   * `String.fromCharCode`. As such, only keys that correspond to printable
   * characters produce a valid `charCode`, the only exception to this is Enter.
   * The Tab-key is considered non-printable and does not have a `charCode`,
   * presumably because it does not produce a tab-character in browsers.
   *
   * @param {object} nativeEvent Native browser event.
   * @return {number} Normalized `charCode` property.
   */

  var global = this || self,
      GLOBAL = global;
  function getEventCharCode(nativeEvent) {
    var charCode;
    var keyCode = nativeEvent.keyCode;

    if ('charCode' in nativeEvent) {
      charCode = nativeEvent.charCode;

      // FF does not set `charCode` for the Enter-key, check against `keyCode`.
      if (charCode === 0 && keyCode === 13) {
        charCode = 13;
      }
    } else {
      // IE8 does not implement `charCode`, but `keyCode` has the correct value.
      charCode = keyCode;
    }

    // Some non-printable keys are reported in `charCode`/`keyCode`, discard them.
    // Must not discard the (non-)printable Enter-key.
    if (charCode >= 32 || charCode === 13) {
      return charCode;
    }

    return 0;
  }

  module.exports = getEventCharCode;
});
System.registerDynamic('npm:react@0.14.7/lib/SimpleEventPlugin.js', ['npm:react@0.14.7/lib/EventConstants.js', 'npm:fbjs@0.6.1/lib/EventListener.js', 'npm:react@0.14.7/lib/EventPropagators.js', 'npm:react@0.14.7/lib/ReactMount.js', 'npm:react@0.14.7/lib/SyntheticClipboardEvent.js', 'npm:react@0.14.7/lib/SyntheticEvent.js', 'npm:react@0.14.7/lib/SyntheticFocusEvent.js', 'npm:react@0.14.7/lib/SyntheticKeyboardEvent.js', 'npm:react@0.14.7/lib/SyntheticMouseEvent.js', 'npm:react@0.14.7/lib/SyntheticDragEvent.js', 'npm:react@0.14.7/lib/SyntheticTouchEvent.js', 'npm:react@0.14.7/lib/SyntheticUIEvent.js', 'npm:react@0.14.7/lib/SyntheticWheelEvent.js', 'npm:fbjs@0.6.1/lib/emptyFunction.js', 'npm:react@0.14.7/lib/getEventCharCode.js', 'npm:fbjs@0.6.1/lib/invariant.js', 'npm:fbjs@0.6.1/lib/keyOf.js', 'github:jspm/nodelibs-process@0.1.2.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  (function (process) {
    'use strict';

    var EventConstants = $__require('npm:react@0.14.7/lib/EventConstants.js');
    var EventListener = $__require('npm:fbjs@0.6.1/lib/EventListener.js');
    var EventPropagators = $__require('npm:react@0.14.7/lib/EventPropagators.js');
    var ReactMount = $__require('npm:react@0.14.7/lib/ReactMount.js');
    var SyntheticClipboardEvent = $__require('npm:react@0.14.7/lib/SyntheticClipboardEvent.js');
    var SyntheticEvent = $__require('npm:react@0.14.7/lib/SyntheticEvent.js');
    var SyntheticFocusEvent = $__require('npm:react@0.14.7/lib/SyntheticFocusEvent.js');
    var SyntheticKeyboardEvent = $__require('npm:react@0.14.7/lib/SyntheticKeyboardEvent.js');
    var SyntheticMouseEvent = $__require('npm:react@0.14.7/lib/SyntheticMouseEvent.js');
    var SyntheticDragEvent = $__require('npm:react@0.14.7/lib/SyntheticDragEvent.js');
    var SyntheticTouchEvent = $__require('npm:react@0.14.7/lib/SyntheticTouchEvent.js');
    var SyntheticUIEvent = $__require('npm:react@0.14.7/lib/SyntheticUIEvent.js');
    var SyntheticWheelEvent = $__require('npm:react@0.14.7/lib/SyntheticWheelEvent.js');
    var emptyFunction = $__require('npm:fbjs@0.6.1/lib/emptyFunction.js');
    var getEventCharCode = $__require('npm:react@0.14.7/lib/getEventCharCode.js');
    var invariant = $__require('npm:fbjs@0.6.1/lib/invariant.js');
    var keyOf = $__require('npm:fbjs@0.6.1/lib/keyOf.js');
    var topLevelTypes = EventConstants.topLevelTypes;
    var eventTypes = {
      abort: { phasedRegistrationNames: {
          bubbled: keyOf({ onAbort: true }),
          captured: keyOf({ onAbortCapture: true })
        } },
      blur: { phasedRegistrationNames: {
          bubbled: keyOf({ onBlur: true }),
          captured: keyOf({ onBlurCapture: true })
        } },
      canPlay: { phasedRegistrationNames: {
          bubbled: keyOf({ onCanPlay: true }),
          captured: keyOf({ onCanPlayCapture: true })
        } },
      canPlayThrough: { phasedRegistrationNames: {
          bubbled: keyOf({ onCanPlayThrough: true }),
          captured: keyOf({ onCanPlayThroughCapture: true })
        } },
      click: { phasedRegistrationNames: {
          bubbled: keyOf({ onClick: true }),
          captured: keyOf({ onClickCapture: true })
        } },
      contextMenu: { phasedRegistrationNames: {
          bubbled: keyOf({ onContextMenu: true }),
          captured: keyOf({ onContextMenuCapture: true })
        } },
      copy: { phasedRegistrationNames: {
          bubbled: keyOf({ onCopy: true }),
          captured: keyOf({ onCopyCapture: true })
        } },
      cut: { phasedRegistrationNames: {
          bubbled: keyOf({ onCut: true }),
          captured: keyOf({ onCutCapture: true })
        } },
      doubleClick: { phasedRegistrationNames: {
          bubbled: keyOf({ onDoubleClick: true }),
          captured: keyOf({ onDoubleClickCapture: true })
        } },
      drag: { phasedRegistrationNames: {
          bubbled: keyOf({ onDrag: true }),
          captured: keyOf({ onDragCapture: true })
        } },
      dragEnd: { phasedRegistrationNames: {
          bubbled: keyOf({ onDragEnd: true }),
          captured: keyOf({ onDragEndCapture: true })
        } },
      dragEnter: { phasedRegistrationNames: {
          bubbled: keyOf({ onDragEnter: true }),
          captured: keyOf({ onDragEnterCapture: true })
        } },
      dragExit: { phasedRegistrationNames: {
          bubbled: keyOf({ onDragExit: true }),
          captured: keyOf({ onDragExitCapture: true })
        } },
      dragLeave: { phasedRegistrationNames: {
          bubbled: keyOf({ onDragLeave: true }),
          captured: keyOf({ onDragLeaveCapture: true })
        } },
      dragOver: { phasedRegistrationNames: {
          bubbled: keyOf({ onDragOver: true }),
          captured: keyOf({ onDragOverCapture: true })
        } },
      dragStart: { phasedRegistrationNames: {
          bubbled: keyOf({ onDragStart: true }),
          captured: keyOf({ onDragStartCapture: true })
        } },
      drop: { phasedRegistrationNames: {
          bubbled: keyOf({ onDrop: true }),
          captured: keyOf({ onDropCapture: true })
        } },
      durationChange: { phasedRegistrationNames: {
          bubbled: keyOf({ onDurationChange: true }),
          captured: keyOf({ onDurationChangeCapture: true })
        } },
      emptied: { phasedRegistrationNames: {
          bubbled: keyOf({ onEmptied: true }),
          captured: keyOf({ onEmptiedCapture: true })
        } },
      encrypted: { phasedRegistrationNames: {
          bubbled: keyOf({ onEncrypted: true }),
          captured: keyOf({ onEncryptedCapture: true })
        } },
      ended: { phasedRegistrationNames: {
          bubbled: keyOf({ onEnded: true }),
          captured: keyOf({ onEndedCapture: true })
        } },
      error: { phasedRegistrationNames: {
          bubbled: keyOf({ onError: true }),
          captured: keyOf({ onErrorCapture: true })
        } },
      focus: { phasedRegistrationNames: {
          bubbled: keyOf({ onFocus: true }),
          captured: keyOf({ onFocusCapture: true })
        } },
      input: { phasedRegistrationNames: {
          bubbled: keyOf({ onInput: true }),
          captured: keyOf({ onInputCapture: true })
        } },
      keyDown: { phasedRegistrationNames: {
          bubbled: keyOf({ onKeyDown: true }),
          captured: keyOf({ onKeyDownCapture: true })
        } },
      keyPress: { phasedRegistrationNames: {
          bubbled: keyOf({ onKeyPress: true }),
          captured: keyOf({ onKeyPressCapture: true })
        } },
      keyUp: { phasedRegistrationNames: {
          bubbled: keyOf({ onKeyUp: true }),
          captured: keyOf({ onKeyUpCapture: true })
        } },
      load: { phasedRegistrationNames: {
          bubbled: keyOf({ onLoad: true }),
          captured: keyOf({ onLoadCapture: true })
        } },
      loadedData: { phasedRegistrationNames: {
          bubbled: keyOf({ onLoadedData: true }),
          captured: keyOf({ onLoadedDataCapture: true })
        } },
      loadedMetadata: { phasedRegistrationNames: {
          bubbled: keyOf({ onLoadedMetadata: true }),
          captured: keyOf({ onLoadedMetadataCapture: true })
        } },
      loadStart: { phasedRegistrationNames: {
          bubbled: keyOf({ onLoadStart: true }),
          captured: keyOf({ onLoadStartCapture: true })
        } },
      mouseDown: { phasedRegistrationNames: {
          bubbled: keyOf({ onMouseDown: true }),
          captured: keyOf({ onMouseDownCapture: true })
        } },
      mouseMove: { phasedRegistrationNames: {
          bubbled: keyOf({ onMouseMove: true }),
          captured: keyOf({ onMouseMoveCapture: true })
        } },
      mouseOut: { phasedRegistrationNames: {
          bubbled: keyOf({ onMouseOut: true }),
          captured: keyOf({ onMouseOutCapture: true })
        } },
      mouseOver: { phasedRegistrationNames: {
          bubbled: keyOf({ onMouseOver: true }),
          captured: keyOf({ onMouseOverCapture: true })
        } },
      mouseUp: { phasedRegistrationNames: {
          bubbled: keyOf({ onMouseUp: true }),
          captured: keyOf({ onMouseUpCapture: true })
        } },
      paste: { phasedRegistrationNames: {
          bubbled: keyOf({ onPaste: true }),
          captured: keyOf({ onPasteCapture: true })
        } },
      pause: { phasedRegistrationNames: {
          bubbled: keyOf({ onPause: true }),
          captured: keyOf({ onPauseCapture: true })
        } },
      play: { phasedRegistrationNames: {
          bubbled: keyOf({ onPlay: true }),
          captured: keyOf({ onPlayCapture: true })
        } },
      playing: { phasedRegistrationNames: {
          bubbled: keyOf({ onPlaying: true }),
          captured: keyOf({ onPlayingCapture: true })
        } },
      progress: { phasedRegistrationNames: {
          bubbled: keyOf({ onProgress: true }),
          captured: keyOf({ onProgressCapture: true })
        } },
      rateChange: { phasedRegistrationNames: {
          bubbled: keyOf({ onRateChange: true }),
          captured: keyOf({ onRateChangeCapture: true })
        } },
      reset: { phasedRegistrationNames: {
          bubbled: keyOf({ onReset: true }),
          captured: keyOf({ onResetCapture: true })
        } },
      scroll: { phasedRegistrationNames: {
          bubbled: keyOf({ onScroll: true }),
          captured: keyOf({ onScrollCapture: true })
        } },
      seeked: { phasedRegistrationNames: {
          bubbled: keyOf({ onSeeked: true }),
          captured: keyOf({ onSeekedCapture: true })
        } },
      seeking: { phasedRegistrationNames: {
          bubbled: keyOf({ onSeeking: true }),
          captured: keyOf({ onSeekingCapture: true })
        } },
      stalled: { phasedRegistrationNames: {
          bubbled: keyOf({ onStalled: true }),
          captured: keyOf({ onStalledCapture: true })
        } },
      submit: { phasedRegistrationNames: {
          bubbled: keyOf({ onSubmit: true }),
          captured: keyOf({ onSubmitCapture: true })
        } },
      suspend: { phasedRegistrationNames: {
          bubbled: keyOf({ onSuspend: true }),
          captured: keyOf({ onSuspendCapture: true })
        } },
      timeUpdate: { phasedRegistrationNames: {
          bubbled: keyOf({ onTimeUpdate: true }),
          captured: keyOf({ onTimeUpdateCapture: true })
        } },
      touchCancel: { phasedRegistrationNames: {
          bubbled: keyOf({ onTouchCancel: true }),
          captured: keyOf({ onTouchCancelCapture: true })
        } },
      touchEnd: { phasedRegistrationNames: {
          bubbled: keyOf({ onTouchEnd: true }),
          captured: keyOf({ onTouchEndCapture: true })
        } },
      touchMove: { phasedRegistrationNames: {
          bubbled: keyOf({ onTouchMove: true }),
          captured: keyOf({ onTouchMoveCapture: true })
        } },
      touchStart: { phasedRegistrationNames: {
          bubbled: keyOf({ onTouchStart: true }),
          captured: keyOf({ onTouchStartCapture: true })
        } },
      volumeChange: { phasedRegistrationNames: {
          bubbled: keyOf({ onVolumeChange: true }),
          captured: keyOf({ onVolumeChangeCapture: true })
        } },
      waiting: { phasedRegistrationNames: {
          bubbled: keyOf({ onWaiting: true }),
          captured: keyOf({ onWaitingCapture: true })
        } },
      wheel: { phasedRegistrationNames: {
          bubbled: keyOf({ onWheel: true }),
          captured: keyOf({ onWheelCapture: true })
        } }
    };
    var topLevelEventsToDispatchConfig = {
      topAbort: eventTypes.abort,
      topBlur: eventTypes.blur,
      topCanPlay: eventTypes.canPlay,
      topCanPlayThrough: eventTypes.canPlayThrough,
      topClick: eventTypes.click,
      topContextMenu: eventTypes.contextMenu,
      topCopy: eventTypes.copy,
      topCut: eventTypes.cut,
      topDoubleClick: eventTypes.doubleClick,
      topDrag: eventTypes.drag,
      topDragEnd: eventTypes.dragEnd,
      topDragEnter: eventTypes.dragEnter,
      topDragExit: eventTypes.dragExit,
      topDragLeave: eventTypes.dragLeave,
      topDragOver: eventTypes.dragOver,
      topDragStart: eventTypes.dragStart,
      topDrop: eventTypes.drop,
      topDurationChange: eventTypes.durationChange,
      topEmptied: eventTypes.emptied,
      topEncrypted: eventTypes.encrypted,
      topEnded: eventTypes.ended,
      topError: eventTypes.error,
      topFocus: eventTypes.focus,
      topInput: eventTypes.input,
      topKeyDown: eventTypes.keyDown,
      topKeyPress: eventTypes.keyPress,
      topKeyUp: eventTypes.keyUp,
      topLoad: eventTypes.load,
      topLoadedData: eventTypes.loadedData,
      topLoadedMetadata: eventTypes.loadedMetadata,
      topLoadStart: eventTypes.loadStart,
      topMouseDown: eventTypes.mouseDown,
      topMouseMove: eventTypes.mouseMove,
      topMouseOut: eventTypes.mouseOut,
      topMouseOver: eventTypes.mouseOver,
      topMouseUp: eventTypes.mouseUp,
      topPaste: eventTypes.paste,
      topPause: eventTypes.pause,
      topPlay: eventTypes.play,
      topPlaying: eventTypes.playing,
      topProgress: eventTypes.progress,
      topRateChange: eventTypes.rateChange,
      topReset: eventTypes.reset,
      topScroll: eventTypes.scroll,
      topSeeked: eventTypes.seeked,
      topSeeking: eventTypes.seeking,
      topStalled: eventTypes.stalled,
      topSubmit: eventTypes.submit,
      topSuspend: eventTypes.suspend,
      topTimeUpdate: eventTypes.timeUpdate,
      topTouchCancel: eventTypes.touchCancel,
      topTouchEnd: eventTypes.touchEnd,
      topTouchMove: eventTypes.touchMove,
      topTouchStart: eventTypes.touchStart,
      topVolumeChange: eventTypes.volumeChange,
      topWaiting: eventTypes.waiting,
      topWheel: eventTypes.wheel
    };
    for (var type in topLevelEventsToDispatchConfig) {
      topLevelEventsToDispatchConfig[type].dependencies = [type];
    }
    var ON_CLICK_KEY = keyOf({ onClick: null });
    var onClickListeners = {};
    var SimpleEventPlugin = {
      eventTypes: eventTypes,
      extractEvents: function (topLevelType, topLevelTarget, topLevelTargetID, nativeEvent, nativeEventTarget) {
        var dispatchConfig = topLevelEventsToDispatchConfig[topLevelType];
        if (!dispatchConfig) {
          return null;
        }
        var EventConstructor;
        switch (topLevelType) {
          case topLevelTypes.topAbort:
          case topLevelTypes.topCanPlay:
          case topLevelTypes.topCanPlayThrough:
          case topLevelTypes.topDurationChange:
          case topLevelTypes.topEmptied:
          case topLevelTypes.topEncrypted:
          case topLevelTypes.topEnded:
          case topLevelTypes.topError:
          case topLevelTypes.topInput:
          case topLevelTypes.topLoad:
          case topLevelTypes.topLoadedData:
          case topLevelTypes.topLoadedMetadata:
          case topLevelTypes.topLoadStart:
          case topLevelTypes.topPause:
          case topLevelTypes.topPlay:
          case topLevelTypes.topPlaying:
          case topLevelTypes.topProgress:
          case topLevelTypes.topRateChange:
          case topLevelTypes.topReset:
          case topLevelTypes.topSeeked:
          case topLevelTypes.topSeeking:
          case topLevelTypes.topStalled:
          case topLevelTypes.topSubmit:
          case topLevelTypes.topSuspend:
          case topLevelTypes.topTimeUpdate:
          case topLevelTypes.topVolumeChange:
          case topLevelTypes.topWaiting:
            EventConstructor = SyntheticEvent;
            break;
          case topLevelTypes.topKeyPress:
            if (getEventCharCode(nativeEvent) === 0) {
              return null;
            }
          case topLevelTypes.topKeyDown:
          case topLevelTypes.topKeyUp:
            EventConstructor = SyntheticKeyboardEvent;
            break;
          case topLevelTypes.topBlur:
          case topLevelTypes.topFocus:
            EventConstructor = SyntheticFocusEvent;
            break;
          case topLevelTypes.topClick:
            if (nativeEvent.button === 2) {
              return null;
            }
          case topLevelTypes.topContextMenu:
          case topLevelTypes.topDoubleClick:
          case topLevelTypes.topMouseDown:
          case topLevelTypes.topMouseMove:
          case topLevelTypes.topMouseOut:
          case topLevelTypes.topMouseOver:
          case topLevelTypes.topMouseUp:
            EventConstructor = SyntheticMouseEvent;
            break;
          case topLevelTypes.topDrag:
          case topLevelTypes.topDragEnd:
          case topLevelTypes.topDragEnter:
          case topLevelTypes.topDragExit:
          case topLevelTypes.topDragLeave:
          case topLevelTypes.topDragOver:
          case topLevelTypes.topDragStart:
          case topLevelTypes.topDrop:
            EventConstructor = SyntheticDragEvent;
            break;
          case topLevelTypes.topTouchCancel:
          case topLevelTypes.topTouchEnd:
          case topLevelTypes.topTouchMove:
          case topLevelTypes.topTouchStart:
            EventConstructor = SyntheticTouchEvent;
            break;
          case topLevelTypes.topScroll:
            EventConstructor = SyntheticUIEvent;
            break;
          case topLevelTypes.topWheel:
            EventConstructor = SyntheticWheelEvent;
            break;
          case topLevelTypes.topCopy:
          case topLevelTypes.topCut:
          case topLevelTypes.topPaste:
            EventConstructor = SyntheticClipboardEvent;
            break;
        }
        !EventConstructor ? 'production' !== 'production' ? invariant(false, 'SimpleEventPlugin: Unhandled event type, `%s`.', topLevelType) : invariant(false) : undefined;
        var event = EventConstructor.getPooled(dispatchConfig, topLevelTargetID, nativeEvent, nativeEventTarget);
        EventPropagators.accumulateTwoPhaseDispatches(event);
        return event;
      },
      didPutListener: function (id, registrationName, listener) {
        if (registrationName === ON_CLICK_KEY) {
          var node = ReactMount.getNode(id);
          if (!onClickListeners[id]) {
            onClickListeners[id] = EventListener.listen(node, 'click', emptyFunction);
          }
        }
      },
      willDeleteListener: function (id, registrationName) {
        if (registrationName === ON_CLICK_KEY) {
          onClickListeners[id].remove();
          delete onClickListeners[id];
        }
      }
    };
    module.exports = SimpleEventPlugin;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
});
System.registerDynamic('npm:react@0.14.7/lib/SVGDOMPropertyConfig.js', ['npm:react@0.14.7/lib/DOMProperty.js'], true, function ($__require, exports, module) {
  /* */
  'use strict';

  var global = this || self,
      GLOBAL = global;
  var DOMProperty = $__require('npm:react@0.14.7/lib/DOMProperty.js');
  var MUST_USE_ATTRIBUTE = DOMProperty.injection.MUST_USE_ATTRIBUTE;
  var NS = {
    xlink: 'http://www.w3.org/1999/xlink',
    xml: 'http://www.w3.org/XML/1998/namespace'
  };
  var SVGDOMPropertyConfig = {
    Properties: {
      clipPath: MUST_USE_ATTRIBUTE,
      cx: MUST_USE_ATTRIBUTE,
      cy: MUST_USE_ATTRIBUTE,
      d: MUST_USE_ATTRIBUTE,
      dx: MUST_USE_ATTRIBUTE,
      dy: MUST_USE_ATTRIBUTE,
      fill: MUST_USE_ATTRIBUTE,
      fillOpacity: MUST_USE_ATTRIBUTE,
      fontFamily: MUST_USE_ATTRIBUTE,
      fontSize: MUST_USE_ATTRIBUTE,
      fx: MUST_USE_ATTRIBUTE,
      fy: MUST_USE_ATTRIBUTE,
      gradientTransform: MUST_USE_ATTRIBUTE,
      gradientUnits: MUST_USE_ATTRIBUTE,
      markerEnd: MUST_USE_ATTRIBUTE,
      markerMid: MUST_USE_ATTRIBUTE,
      markerStart: MUST_USE_ATTRIBUTE,
      offset: MUST_USE_ATTRIBUTE,
      opacity: MUST_USE_ATTRIBUTE,
      patternContentUnits: MUST_USE_ATTRIBUTE,
      patternUnits: MUST_USE_ATTRIBUTE,
      points: MUST_USE_ATTRIBUTE,
      preserveAspectRatio: MUST_USE_ATTRIBUTE,
      r: MUST_USE_ATTRIBUTE,
      rx: MUST_USE_ATTRIBUTE,
      ry: MUST_USE_ATTRIBUTE,
      spreadMethod: MUST_USE_ATTRIBUTE,
      stopColor: MUST_USE_ATTRIBUTE,
      stopOpacity: MUST_USE_ATTRIBUTE,
      stroke: MUST_USE_ATTRIBUTE,
      strokeDasharray: MUST_USE_ATTRIBUTE,
      strokeLinecap: MUST_USE_ATTRIBUTE,
      strokeOpacity: MUST_USE_ATTRIBUTE,
      strokeWidth: MUST_USE_ATTRIBUTE,
      textAnchor: MUST_USE_ATTRIBUTE,
      transform: MUST_USE_ATTRIBUTE,
      version: MUST_USE_ATTRIBUTE,
      viewBox: MUST_USE_ATTRIBUTE,
      x1: MUST_USE_ATTRIBUTE,
      x2: MUST_USE_ATTRIBUTE,
      x: MUST_USE_ATTRIBUTE,
      xlinkActuate: MUST_USE_ATTRIBUTE,
      xlinkArcrole: MUST_USE_ATTRIBUTE,
      xlinkHref: MUST_USE_ATTRIBUTE,
      xlinkRole: MUST_USE_ATTRIBUTE,
      xlinkShow: MUST_USE_ATTRIBUTE,
      xlinkTitle: MUST_USE_ATTRIBUTE,
      xlinkType: MUST_USE_ATTRIBUTE,
      xmlBase: MUST_USE_ATTRIBUTE,
      xmlLang: MUST_USE_ATTRIBUTE,
      xmlSpace: MUST_USE_ATTRIBUTE,
      y1: MUST_USE_ATTRIBUTE,
      y2: MUST_USE_ATTRIBUTE,
      y: MUST_USE_ATTRIBUTE
    },
    DOMAttributeNamespaces: {
      xlinkActuate: NS.xlink,
      xlinkArcrole: NS.xlink,
      xlinkHref: NS.xlink,
      xlinkRole: NS.xlink,
      xlinkShow: NS.xlink,
      xlinkTitle: NS.xlink,
      xlinkType: NS.xlink,
      xmlBase: NS.xml,
      xmlLang: NS.xml,
      xmlSpace: NS.xml
    },
    DOMAttributeNames: {
      clipPath: 'clip-path',
      fillOpacity: 'fill-opacity',
      fontFamily: 'font-family',
      fontSize: 'font-size',
      gradientTransform: 'gradientTransform',
      gradientUnits: 'gradientUnits',
      markerEnd: 'marker-end',
      markerMid: 'marker-mid',
      markerStart: 'marker-start',
      patternContentUnits: 'patternContentUnits',
      patternUnits: 'patternUnits',
      preserveAspectRatio: 'preserveAspectRatio',
      spreadMethod: 'spreadMethod',
      stopColor: 'stop-color',
      stopOpacity: 'stop-opacity',
      strokeDasharray: 'stroke-dasharray',
      strokeLinecap: 'stroke-linecap',
      strokeOpacity: 'stroke-opacity',
      strokeWidth: 'stroke-width',
      textAnchor: 'text-anchor',
      viewBox: 'viewBox',
      xlinkActuate: 'xlink:actuate',
      xlinkArcrole: 'xlink:arcrole',
      xlinkHref: 'xlink:href',
      xlinkRole: 'xlink:role',
      xlinkShow: 'xlink:show',
      xlinkTitle: 'xlink:title',
      xlinkType: 'xlink:type',
      xmlBase: 'xml:base',
      xmlLang: 'xml:lang',
      xmlSpace: 'xml:space'
    }
  };
  module.exports = SVGDOMPropertyConfig;
});
System.registerDynamic('npm:react@0.14.7/lib/ReactDefaultPerfAnalysis.js', ['npm:react@0.14.7/lib/Object.assign.js'], true, function ($__require, exports, module) {
  /* */
  'use strict';

  var global = this || self,
      GLOBAL = global;
  var assign = $__require('npm:react@0.14.7/lib/Object.assign.js');
  var DONT_CARE_THRESHOLD = 1.2;
  var DOM_OPERATION_TYPES = {
    '_mountImageIntoNode': 'set innerHTML',
    INSERT_MARKUP: 'set innerHTML',
    MOVE_EXISTING: 'move',
    REMOVE_NODE: 'remove',
    SET_MARKUP: 'set innerHTML',
    TEXT_CONTENT: 'set textContent',
    'setValueForProperty': 'update attribute',
    'setValueForAttribute': 'update attribute',
    'deleteValueForProperty': 'remove attribute',
    'setValueForStyles': 'update styles',
    'replaceNodeWithMarkup': 'replace',
    'updateTextContent': 'set textContent'
  };
  function getTotalTime(measurements) {
    var totalTime = 0;
    for (var i = 0; i < measurements.length; i++) {
      var measurement = measurements[i];
      totalTime += measurement.totalTime;
    }
    return totalTime;
  }
  function getDOMSummary(measurements) {
    var items = [];
    measurements.forEach(function (measurement) {
      Object.keys(measurement.writes).forEach(function (id) {
        measurement.writes[id].forEach(function (write) {
          items.push({
            id: id,
            type: DOM_OPERATION_TYPES[write.type] || write.type,
            args: write.args
          });
        });
      });
    });
    return items;
  }
  function getExclusiveSummary(measurements) {
    var candidates = {};
    var displayName;
    for (var i = 0; i < measurements.length; i++) {
      var measurement = measurements[i];
      var allIDs = assign({}, measurement.exclusive, measurement.inclusive);
      for (var id in allIDs) {
        displayName = measurement.displayNames[id].current;
        candidates[displayName] = candidates[displayName] || {
          componentName: displayName,
          inclusive: 0,
          exclusive: 0,
          render: 0,
          count: 0
        };
        if (measurement.render[id]) {
          candidates[displayName].render += measurement.render[id];
        }
        if (measurement.exclusive[id]) {
          candidates[displayName].exclusive += measurement.exclusive[id];
        }
        if (measurement.inclusive[id]) {
          candidates[displayName].inclusive += measurement.inclusive[id];
        }
        if (measurement.counts[id]) {
          candidates[displayName].count += measurement.counts[id];
        }
      }
    }
    var arr = [];
    for (displayName in candidates) {
      if (candidates[displayName].exclusive >= DONT_CARE_THRESHOLD) {
        arr.push(candidates[displayName]);
      }
    }
    arr.sort(function (a, b) {
      return b.exclusive - a.exclusive;
    });
    return arr;
  }
  function getInclusiveSummary(measurements, onlyClean) {
    var candidates = {};
    var inclusiveKey;
    for (var i = 0; i < measurements.length; i++) {
      var measurement = measurements[i];
      var allIDs = assign({}, measurement.exclusive, measurement.inclusive);
      var cleanComponents;
      if (onlyClean) {
        cleanComponents = getUnchangedComponents(measurement);
      }
      for (var id in allIDs) {
        if (onlyClean && !cleanComponents[id]) {
          continue;
        }
        var displayName = measurement.displayNames[id];
        inclusiveKey = displayName.owner + ' > ' + displayName.current;
        candidates[inclusiveKey] = candidates[inclusiveKey] || {
          componentName: inclusiveKey,
          time: 0,
          count: 0
        };
        if (measurement.inclusive[id]) {
          candidates[inclusiveKey].time += measurement.inclusive[id];
        }
        if (measurement.counts[id]) {
          candidates[inclusiveKey].count += measurement.counts[id];
        }
      }
    }
    var arr = [];
    for (inclusiveKey in candidates) {
      if (candidates[inclusiveKey].time >= DONT_CARE_THRESHOLD) {
        arr.push(candidates[inclusiveKey]);
      }
    }
    arr.sort(function (a, b) {
      return b.time - a.time;
    });
    return arr;
  }
  function getUnchangedComponents(measurement) {
    var cleanComponents = {};
    var dirtyLeafIDs = Object.keys(measurement.writes);
    var allIDs = assign({}, measurement.exclusive, measurement.inclusive);
    for (var id in allIDs) {
      var isDirty = false;
      for (var i = 0; i < dirtyLeafIDs.length; i++) {
        if (dirtyLeafIDs[i].indexOf(id) === 0) {
          isDirty = true;
          break;
        }
      }
      if (measurement.created[id]) {
        isDirty = true;
      }
      if (!isDirty && measurement.counts[id] > 0) {
        cleanComponents[id] = true;
      }
    }
    return cleanComponents;
  }
  var ReactDefaultPerfAnalysis = {
    getExclusiveSummary: getExclusiveSummary,
    getInclusiveSummary: getInclusiveSummary,
    getDOMSummary: getDOMSummary,
    getTotalTime: getTotalTime
  };
  module.exports = ReactDefaultPerfAnalysis;
});
System.registerDynamic('npm:react@0.14.7/lib/DOMProperty.js', ['npm:fbjs@0.6.1/lib/invariant.js', 'github:jspm/nodelibs-process@0.1.2.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  (function (process) {
    'use strict';

    var invariant = $__require('npm:fbjs@0.6.1/lib/invariant.js');
    function checkMask(value, bitmask) {
      return (value & bitmask) === bitmask;
    }
    var DOMPropertyInjection = {
      MUST_USE_ATTRIBUTE: 0x1,
      MUST_USE_PROPERTY: 0x2,
      HAS_SIDE_EFFECTS: 0x4,
      HAS_BOOLEAN_VALUE: 0x8,
      HAS_NUMERIC_VALUE: 0x10,
      HAS_POSITIVE_NUMERIC_VALUE: 0x20 | 0x10,
      HAS_OVERLOADED_BOOLEAN_VALUE: 0x40,
      injectDOMPropertyConfig: function (domPropertyConfig) {
        var Injection = DOMPropertyInjection;
        var Properties = domPropertyConfig.Properties || {};
        var DOMAttributeNamespaces = domPropertyConfig.DOMAttributeNamespaces || {};
        var DOMAttributeNames = domPropertyConfig.DOMAttributeNames || {};
        var DOMPropertyNames = domPropertyConfig.DOMPropertyNames || {};
        var DOMMutationMethods = domPropertyConfig.DOMMutationMethods || {};
        if (domPropertyConfig.isCustomAttribute) {
          DOMProperty._isCustomAttributeFunctions.push(domPropertyConfig.isCustomAttribute);
        }
        for (var propName in Properties) {
          !!DOMProperty.properties.hasOwnProperty(propName) ? 'production' !== 'production' ? invariant(false, 'injectDOMPropertyConfig(...): You\'re trying to inject DOM property ' + '\'%s\' which has already been injected. You may be accidentally ' + 'injecting the same DOM property config twice, or you may be ' + 'injecting two configs that have conflicting property names.', propName) : invariant(false) : undefined;
          var lowerCased = propName.toLowerCase();
          var propConfig = Properties[propName];
          var propertyInfo = {
            attributeName: lowerCased,
            attributeNamespace: null,
            propertyName: propName,
            mutationMethod: null,
            mustUseAttribute: checkMask(propConfig, Injection.MUST_USE_ATTRIBUTE),
            mustUseProperty: checkMask(propConfig, Injection.MUST_USE_PROPERTY),
            hasSideEffects: checkMask(propConfig, Injection.HAS_SIDE_EFFECTS),
            hasBooleanValue: checkMask(propConfig, Injection.HAS_BOOLEAN_VALUE),
            hasNumericValue: checkMask(propConfig, Injection.HAS_NUMERIC_VALUE),
            hasPositiveNumericValue: checkMask(propConfig, Injection.HAS_POSITIVE_NUMERIC_VALUE),
            hasOverloadedBooleanValue: checkMask(propConfig, Injection.HAS_OVERLOADED_BOOLEAN_VALUE)
          };
          !(!propertyInfo.mustUseAttribute || !propertyInfo.mustUseProperty) ? 'production' !== 'production' ? invariant(false, 'DOMProperty: Cannot require using both attribute and property: %s', propName) : invariant(false) : undefined;
          !(propertyInfo.mustUseProperty || !propertyInfo.hasSideEffects) ? 'production' !== 'production' ? invariant(false, 'DOMProperty: Properties that have side effects must use property: %s', propName) : invariant(false) : undefined;
          !(propertyInfo.hasBooleanValue + propertyInfo.hasNumericValue + propertyInfo.hasOverloadedBooleanValue <= 1) ? 'production' !== 'production' ? invariant(false, 'DOMProperty: Value can be one of boolean, overloaded boolean, or ' + 'numeric value, but not a combination: %s', propName) : invariant(false) : undefined;
          if ('production' !== 'production') {
            DOMProperty.getPossibleStandardName[lowerCased] = propName;
          }
          if (DOMAttributeNames.hasOwnProperty(propName)) {
            var attributeName = DOMAttributeNames[propName];
            propertyInfo.attributeName = attributeName;
            if ('production' !== 'production') {
              DOMProperty.getPossibleStandardName[attributeName] = propName;
            }
          }
          if (DOMAttributeNamespaces.hasOwnProperty(propName)) {
            propertyInfo.attributeNamespace = DOMAttributeNamespaces[propName];
          }
          if (DOMPropertyNames.hasOwnProperty(propName)) {
            propertyInfo.propertyName = DOMPropertyNames[propName];
          }
          if (DOMMutationMethods.hasOwnProperty(propName)) {
            propertyInfo.mutationMethod = DOMMutationMethods[propName];
          }
          DOMProperty.properties[propName] = propertyInfo;
        }
      }
    };
    var defaultValueCache = {};
    var DOMProperty = {
      ID_ATTRIBUTE_NAME: 'data-reactid',
      properties: {},
      getPossibleStandardName: 'production' !== 'production' ? {} : null,
      _isCustomAttributeFunctions: [],
      isCustomAttribute: function (attributeName) {
        for (var i = 0; i < DOMProperty._isCustomAttributeFunctions.length; i++) {
          var isCustomAttributeFn = DOMProperty._isCustomAttributeFunctions[i];
          if (isCustomAttributeFn(attributeName)) {
            return true;
          }
        }
        return false;
      },
      getDefaultValueForProperty: function (nodeName, prop) {
        var nodeDefaults = defaultValueCache[nodeName];
        var testElement;
        if (!nodeDefaults) {
          defaultValueCache[nodeName] = nodeDefaults = {};
        }
        if (!(prop in nodeDefaults)) {
          testElement = document.createElement(nodeName);
          nodeDefaults[prop] = testElement[prop];
        }
        return nodeDefaults[prop];
      },
      injection: DOMPropertyInjection
    };
    module.exports = DOMProperty;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
});
System.registerDynamic('npm:react@0.14.7/lib/EventPluginRegistry.js', ['npm:fbjs@0.6.1/lib/invariant.js', 'github:jspm/nodelibs-process@0.1.2.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  (function (process) {
    'use strict';

    var invariant = $__require('npm:fbjs@0.6.1/lib/invariant.js');
    var EventPluginOrder = null;
    var namesToPlugins = {};
    function recomputePluginOrdering() {
      if (!EventPluginOrder) {
        return;
      }
      for (var pluginName in namesToPlugins) {
        var PluginModule = namesToPlugins[pluginName];
        var pluginIndex = EventPluginOrder.indexOf(pluginName);
        !(pluginIndex > -1) ? 'production' !== 'production' ? invariant(false, 'EventPluginRegistry: Cannot inject event plugins that do not exist in ' + 'the plugin ordering, `%s`.', pluginName) : invariant(false) : undefined;
        if (EventPluginRegistry.plugins[pluginIndex]) {
          continue;
        }
        !PluginModule.extractEvents ? 'production' !== 'production' ? invariant(false, 'EventPluginRegistry: Event plugins must implement an `extractEvents` ' + 'method, but `%s` does not.', pluginName) : invariant(false) : undefined;
        EventPluginRegistry.plugins[pluginIndex] = PluginModule;
        var publishedEvents = PluginModule.eventTypes;
        for (var eventName in publishedEvents) {
          !publishEventForPlugin(publishedEvents[eventName], PluginModule, eventName) ? 'production' !== 'production' ? invariant(false, 'EventPluginRegistry: Failed to publish event `%s` for plugin `%s`.', eventName, pluginName) : invariant(false) : undefined;
        }
      }
    }
    function publishEventForPlugin(dispatchConfig, PluginModule, eventName) {
      !!EventPluginRegistry.eventNameDispatchConfigs.hasOwnProperty(eventName) ? 'production' !== 'production' ? invariant(false, 'EventPluginHub: More than one plugin attempted to publish the same ' + 'event name, `%s`.', eventName) : invariant(false) : undefined;
      EventPluginRegistry.eventNameDispatchConfigs[eventName] = dispatchConfig;
      var phasedRegistrationNames = dispatchConfig.phasedRegistrationNames;
      if (phasedRegistrationNames) {
        for (var phaseName in phasedRegistrationNames) {
          if (phasedRegistrationNames.hasOwnProperty(phaseName)) {
            var phasedRegistrationName = phasedRegistrationNames[phaseName];
            publishRegistrationName(phasedRegistrationName, PluginModule, eventName);
          }
        }
        return true;
      } else if (dispatchConfig.registrationName) {
        publishRegistrationName(dispatchConfig.registrationName, PluginModule, eventName);
        return true;
      }
      return false;
    }
    function publishRegistrationName(registrationName, PluginModule, eventName) {
      !!EventPluginRegistry.registrationNameModules[registrationName] ? 'production' !== 'production' ? invariant(false, 'EventPluginHub: More than one plugin attempted to publish the same ' + 'registration name, `%s`.', registrationName) : invariant(false) : undefined;
      EventPluginRegistry.registrationNameModules[registrationName] = PluginModule;
      EventPluginRegistry.registrationNameDependencies[registrationName] = PluginModule.eventTypes[eventName].dependencies;
    }
    var EventPluginRegistry = {
      plugins: [],
      eventNameDispatchConfigs: {},
      registrationNameModules: {},
      registrationNameDependencies: {},
      injectEventPluginOrder: function (InjectedEventPluginOrder) {
        !!EventPluginOrder ? 'production' !== 'production' ? invariant(false, 'EventPluginRegistry: Cannot inject event plugin ordering more than ' + 'once. You are likely trying to load more than one copy of React.') : invariant(false) : undefined;
        EventPluginOrder = Array.prototype.slice.call(InjectedEventPluginOrder);
        recomputePluginOrdering();
      },
      injectEventPluginsByName: function (injectedNamesToPlugins) {
        var isOrderingDirty = false;
        for (var pluginName in injectedNamesToPlugins) {
          if (!injectedNamesToPlugins.hasOwnProperty(pluginName)) {
            continue;
          }
          var PluginModule = injectedNamesToPlugins[pluginName];
          if (!namesToPlugins.hasOwnProperty(pluginName) || namesToPlugins[pluginName] !== PluginModule) {
            !!namesToPlugins[pluginName] ? 'production' !== 'production' ? invariant(false, 'EventPluginRegistry: Cannot inject two different event plugins ' + 'using the same name, `%s`.', pluginName) : invariant(false) : undefined;
            namesToPlugins[pluginName] = PluginModule;
            isOrderingDirty = true;
          }
        }
        if (isOrderingDirty) {
          recomputePluginOrdering();
        }
      },
      getPluginModuleForEvent: function (event) {
        var dispatchConfig = event.dispatchConfig;
        if (dispatchConfig.registrationName) {
          return EventPluginRegistry.registrationNameModules[dispatchConfig.registrationName] || null;
        }
        for (var phase in dispatchConfig.phasedRegistrationNames) {
          if (!dispatchConfig.phasedRegistrationNames.hasOwnProperty(phase)) {
            continue;
          }
          var PluginModule = EventPluginRegistry.registrationNameModules[dispatchConfig.phasedRegistrationNames[phase]];
          if (PluginModule) {
            return PluginModule;
          }
        }
        return null;
      },
      _resetEventPlugins: function () {
        EventPluginOrder = null;
        for (var pluginName in namesToPlugins) {
          if (namesToPlugins.hasOwnProperty(pluginName)) {
            delete namesToPlugins[pluginName];
          }
        }
        EventPluginRegistry.plugins.length = 0;
        var eventNameDispatchConfigs = EventPluginRegistry.eventNameDispatchConfigs;
        for (var eventName in eventNameDispatchConfigs) {
          if (eventNameDispatchConfigs.hasOwnProperty(eventName)) {
            delete eventNameDispatchConfigs[eventName];
          }
        }
        var registrationNameModules = EventPluginRegistry.registrationNameModules;
        for (var registrationName in registrationNameModules) {
          if (registrationNameModules.hasOwnProperty(registrationName)) {
            delete registrationNameModules[registrationName];
          }
        }
      }
    };
    module.exports = EventPluginRegistry;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
});
System.registerDynamic('npm:react@0.14.7/lib/EventConstants.js', ['npm:fbjs@0.6.1/lib/keyMirror.js'], true, function ($__require, exports, module) {
  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule EventConstants
   */

  'use strict';

  var global = this || self,
      GLOBAL = global;
  var keyMirror = $__require('npm:fbjs@0.6.1/lib/keyMirror.js');

  var PropagationPhases = keyMirror({ bubbled: null, captured: null });

  /**
   * Types of raw signals from the browser caught at the top level.
   */
  var topLevelTypes = keyMirror({
    topAbort: null,
    topBlur: null,
    topCanPlay: null,
    topCanPlayThrough: null,
    topChange: null,
    topClick: null,
    topCompositionEnd: null,
    topCompositionStart: null,
    topCompositionUpdate: null,
    topContextMenu: null,
    topCopy: null,
    topCut: null,
    topDoubleClick: null,
    topDrag: null,
    topDragEnd: null,
    topDragEnter: null,
    topDragExit: null,
    topDragLeave: null,
    topDragOver: null,
    topDragStart: null,
    topDrop: null,
    topDurationChange: null,
    topEmptied: null,
    topEncrypted: null,
    topEnded: null,
    topError: null,
    topFocus: null,
    topInput: null,
    topKeyDown: null,
    topKeyPress: null,
    topKeyUp: null,
    topLoad: null,
    topLoadedData: null,
    topLoadedMetadata: null,
    topLoadStart: null,
    topMouseDown: null,
    topMouseMove: null,
    topMouseOut: null,
    topMouseOver: null,
    topMouseUp: null,
    topPaste: null,
    topPause: null,
    topPlay: null,
    topPlaying: null,
    topProgress: null,
    topRateChange: null,
    topReset: null,
    topScroll: null,
    topSeeked: null,
    topSeeking: null,
    topSelectionChange: null,
    topStalled: null,
    topSubmit: null,
    topSuspend: null,
    topTextInput: null,
    topTimeUpdate: null,
    topTouchCancel: null,
    topTouchEnd: null,
    topTouchMove: null,
    topTouchStart: null,
    topVolumeChange: null,
    topWaiting: null,
    topWheel: null
  });

  var EventConstants = {
    topLevelTypes: topLevelTypes,
    PropagationPhases: PropagationPhases
  };

  module.exports = EventConstants;
});
System.registerDynamic('npm:react@0.14.7/lib/EventPluginUtils.js', ['npm:react@0.14.7/lib/EventConstants.js', 'npm:react@0.14.7/lib/ReactErrorUtils.js', 'npm:fbjs@0.6.1/lib/invariant.js', 'npm:fbjs@0.6.1/lib/warning.js', 'github:jspm/nodelibs-process@0.1.2.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  (function (process) {
    'use strict';

    var EventConstants = $__require('npm:react@0.14.7/lib/EventConstants.js');
    var ReactErrorUtils = $__require('npm:react@0.14.7/lib/ReactErrorUtils.js');
    var invariant = $__require('npm:fbjs@0.6.1/lib/invariant.js');
    var warning = $__require('npm:fbjs@0.6.1/lib/warning.js');
    var injection = {
      Mount: null,
      injectMount: function (InjectedMount) {
        injection.Mount = InjectedMount;
        if ('production' !== 'production') {
          'production' !== 'production' ? warning(InjectedMount && InjectedMount.getNode && InjectedMount.getID, 'EventPluginUtils.injection.injectMount(...): Injected Mount ' + 'module is missing getNode or getID.') : undefined;
        }
      }
    };
    var topLevelTypes = EventConstants.topLevelTypes;
    function isEndish(topLevelType) {
      return topLevelType === topLevelTypes.topMouseUp || topLevelType === topLevelTypes.topTouchEnd || topLevelType === topLevelTypes.topTouchCancel;
    }
    function isMoveish(topLevelType) {
      return topLevelType === topLevelTypes.topMouseMove || topLevelType === topLevelTypes.topTouchMove;
    }
    function isStartish(topLevelType) {
      return topLevelType === topLevelTypes.topMouseDown || topLevelType === topLevelTypes.topTouchStart;
    }
    var validateEventDispatches;
    if ('production' !== 'production') {
      validateEventDispatches = function (event) {
        var dispatchListeners = event._dispatchListeners;
        var dispatchIDs = event._dispatchIDs;
        var listenersIsArr = Array.isArray(dispatchListeners);
        var idsIsArr = Array.isArray(dispatchIDs);
        var IDsLen = idsIsArr ? dispatchIDs.length : dispatchIDs ? 1 : 0;
        var listenersLen = listenersIsArr ? dispatchListeners.length : dispatchListeners ? 1 : 0;
        'production' !== 'production' ? warning(idsIsArr === listenersIsArr && IDsLen === listenersLen, 'EventPluginUtils: Invalid `event`.') : undefined;
      };
    }
    function executeDispatch(event, simulated, listener, domID) {
      var type = event.type || 'unknown-event';
      event.currentTarget = injection.Mount.getNode(domID);
      if (simulated) {
        ReactErrorUtils.invokeGuardedCallbackWithCatch(type, listener, event, domID);
      } else {
        ReactErrorUtils.invokeGuardedCallback(type, listener, event, domID);
      }
      event.currentTarget = null;
    }
    function executeDispatchesInOrder(event, simulated) {
      var dispatchListeners = event._dispatchListeners;
      var dispatchIDs = event._dispatchIDs;
      if ('production' !== 'production') {
        validateEventDispatches(event);
      }
      if (Array.isArray(dispatchListeners)) {
        for (var i = 0; i < dispatchListeners.length; i++) {
          if (event.isPropagationStopped()) {
            break;
          }
          executeDispatch(event, simulated, dispatchListeners[i], dispatchIDs[i]);
        }
      } else if (dispatchListeners) {
        executeDispatch(event, simulated, dispatchListeners, dispatchIDs);
      }
      event._dispatchListeners = null;
      event._dispatchIDs = null;
    }
    function executeDispatchesInOrderStopAtTrueImpl(event) {
      var dispatchListeners = event._dispatchListeners;
      var dispatchIDs = event._dispatchIDs;
      if ('production' !== 'production') {
        validateEventDispatches(event);
      }
      if (Array.isArray(dispatchListeners)) {
        for (var i = 0; i < dispatchListeners.length; i++) {
          if (event.isPropagationStopped()) {
            break;
          }
          if (dispatchListeners[i](event, dispatchIDs[i])) {
            return dispatchIDs[i];
          }
        }
      } else if (dispatchListeners) {
        if (dispatchListeners(event, dispatchIDs)) {
          return dispatchIDs;
        }
      }
      return null;
    }
    function executeDispatchesInOrderStopAtTrue(event) {
      var ret = executeDispatchesInOrderStopAtTrueImpl(event);
      event._dispatchIDs = null;
      event._dispatchListeners = null;
      return ret;
    }
    function executeDirectDispatch(event) {
      if ('production' !== 'production') {
        validateEventDispatches(event);
      }
      var dispatchListener = event._dispatchListeners;
      var dispatchID = event._dispatchIDs;
      !!Array.isArray(dispatchListener) ? 'production' !== 'production' ? invariant(false, 'executeDirectDispatch(...): Invalid `event`.') : invariant(false) : undefined;
      var res = dispatchListener ? dispatchListener(event, dispatchID) : null;
      event._dispatchListeners = null;
      event._dispatchIDs = null;
      return res;
    }
    function hasDispatches(event) {
      return !!event._dispatchListeners;
    }
    var EventPluginUtils = {
      isEndish: isEndish,
      isMoveish: isMoveish,
      isStartish: isStartish,
      executeDirectDispatch: executeDirectDispatch,
      executeDispatchesInOrder: executeDispatchesInOrder,
      executeDispatchesInOrderStopAtTrue: executeDispatchesInOrderStopAtTrue,
      hasDispatches: hasDispatches,
      getNode: function (id) {
        return injection.Mount.getNode(id);
      },
      getID: function (node) {
        return injection.Mount.getID(node);
      },
      injection: injection
    };
    module.exports = EventPluginUtils;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
});
System.registerDynamic('npm:react@0.14.7/lib/ReactErrorUtils.js', ['github:jspm/nodelibs-process@0.1.2.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  (function (process) {
    'use strict';

    var caughtError = null;
    function invokeGuardedCallback(name, func, a, b) {
      try {
        return func(a, b);
      } catch (x) {
        if (caughtError === null) {
          caughtError = x;
        }
        return undefined;
      }
    }
    var ReactErrorUtils = {
      invokeGuardedCallback: invokeGuardedCallback,
      invokeGuardedCallbackWithCatch: invokeGuardedCallback,
      rethrowCaughtError: function () {
        if (caughtError) {
          var error = caughtError;
          caughtError = null;
          throw error;
        }
      }
    };
    if ('production' !== 'production') {
      if (typeof window !== 'undefined' && typeof window.dispatchEvent === 'function' && typeof document !== 'undefined' && typeof document.createEvent === 'function') {
        var fakeNode = document.createElement('react');
        ReactErrorUtils.invokeGuardedCallback = function (name, func, a, b) {
          var boundFunc = func.bind(null, a, b);
          var evtType = 'react-' + name;
          fakeNode.addEventListener(evtType, boundFunc, false);
          var evt = document.createEvent('Event');
          evt.initEvent(evtType, false, false);
          fakeNode.dispatchEvent(evt);
          fakeNode.removeEventListener(evtType, boundFunc, false);
        };
      }
    }
    module.exports = ReactErrorUtils;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
});
System.registerDynamic('npm:react@0.14.7/lib/accumulateInto.js', ['npm:fbjs@0.6.1/lib/invariant.js', 'github:jspm/nodelibs-process@0.1.2.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  (function (process) {
    'use strict';

    var invariant = $__require('npm:fbjs@0.6.1/lib/invariant.js');
    function accumulateInto(current, next) {
      !(next != null) ? 'production' !== 'production' ? invariant(false, 'accumulateInto(...): Accumulated items must not be null or undefined.') : invariant(false) : undefined;
      if (current == null) {
        return next;
      }
      var currentIsArray = Array.isArray(current);
      var nextIsArray = Array.isArray(next);
      if (currentIsArray && nextIsArray) {
        current.push.apply(current, next);
        return current;
      }
      if (currentIsArray) {
        current.push(next);
        return current;
      }
      if (nextIsArray) {
        return [current].concat(next);
      }
      return [current, next];
    }
    module.exports = accumulateInto;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
});
System.registerDynamic('npm:react@0.14.7/lib/forEachAccumulated.js', [], true, function ($__require, exports, module) {
  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule forEachAccumulated
   */

  'use strict';

  /**
   * @param {array} arr an "accumulation" of items which is either an Array or
   * a single item. Useful when paired with the `accumulate` module. This is a
   * simple utility that allows us to reason about a collection of items, but
   * handling the case when there is exactly one item (and we do not need to
   * allocate an array).
   */

  var global = this || self,
      GLOBAL = global;
  var forEachAccumulated = function (arr, cb, scope) {
    if (Array.isArray(arr)) {
      arr.forEach(cb, scope);
    } else if (arr) {
      cb.call(scope, arr);
    }
  };

  module.exports = forEachAccumulated;
});
System.registerDynamic('npm:react@0.14.7/lib/EventPluginHub.js', ['npm:react@0.14.7/lib/EventPluginRegistry.js', 'npm:react@0.14.7/lib/EventPluginUtils.js', 'npm:react@0.14.7/lib/ReactErrorUtils.js', 'npm:react@0.14.7/lib/accumulateInto.js', 'npm:react@0.14.7/lib/forEachAccumulated.js', 'npm:fbjs@0.6.1/lib/invariant.js', 'npm:fbjs@0.6.1/lib/warning.js', 'github:jspm/nodelibs-process@0.1.2.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  (function (process) {
    'use strict';

    var EventPluginRegistry = $__require('npm:react@0.14.7/lib/EventPluginRegistry.js');
    var EventPluginUtils = $__require('npm:react@0.14.7/lib/EventPluginUtils.js');
    var ReactErrorUtils = $__require('npm:react@0.14.7/lib/ReactErrorUtils.js');
    var accumulateInto = $__require('npm:react@0.14.7/lib/accumulateInto.js');
    var forEachAccumulated = $__require('npm:react@0.14.7/lib/forEachAccumulated.js');
    var invariant = $__require('npm:fbjs@0.6.1/lib/invariant.js');
    var warning = $__require('npm:fbjs@0.6.1/lib/warning.js');
    var listenerBank = {};
    var eventQueue = null;
    var executeDispatchesAndRelease = function (event, simulated) {
      if (event) {
        EventPluginUtils.executeDispatchesInOrder(event, simulated);
        if (!event.isPersistent()) {
          event.constructor.release(event);
        }
      }
    };
    var executeDispatchesAndReleaseSimulated = function (e) {
      return executeDispatchesAndRelease(e, true);
    };
    var executeDispatchesAndReleaseTopLevel = function (e) {
      return executeDispatchesAndRelease(e, false);
    };
    var InstanceHandle = null;
    function validateInstanceHandle() {
      var valid = InstanceHandle && InstanceHandle.traverseTwoPhase && InstanceHandle.traverseEnterLeave;
      'production' !== 'production' ? warning(valid, 'InstanceHandle not injected before use!') : undefined;
    }
    var EventPluginHub = {
      injection: {
        injectMount: EventPluginUtils.injection.injectMount,
        injectInstanceHandle: function (InjectedInstanceHandle) {
          InstanceHandle = InjectedInstanceHandle;
          if ('production' !== 'production') {
            validateInstanceHandle();
          }
        },
        getInstanceHandle: function () {
          if ('production' !== 'production') {
            validateInstanceHandle();
          }
          return InstanceHandle;
        },
        injectEventPluginOrder: EventPluginRegistry.injectEventPluginOrder,
        injectEventPluginsByName: EventPluginRegistry.injectEventPluginsByName
      },
      eventNameDispatchConfigs: EventPluginRegistry.eventNameDispatchConfigs,
      registrationNameModules: EventPluginRegistry.registrationNameModules,
      putListener: function (id, registrationName, listener) {
        !(typeof listener === 'function') ? 'production' !== 'production' ? invariant(false, 'Expected %s listener to be a function, instead got type %s', registrationName, typeof listener) : invariant(false) : undefined;
        var bankForRegistrationName = listenerBank[registrationName] || (listenerBank[registrationName] = {});
        bankForRegistrationName[id] = listener;
        var PluginModule = EventPluginRegistry.registrationNameModules[registrationName];
        if (PluginModule && PluginModule.didPutListener) {
          PluginModule.didPutListener(id, registrationName, listener);
        }
      },
      getListener: function (id, registrationName) {
        var bankForRegistrationName = listenerBank[registrationName];
        return bankForRegistrationName && bankForRegistrationName[id];
      },
      deleteListener: function (id, registrationName) {
        var PluginModule = EventPluginRegistry.registrationNameModules[registrationName];
        if (PluginModule && PluginModule.willDeleteListener) {
          PluginModule.willDeleteListener(id, registrationName);
        }
        var bankForRegistrationName = listenerBank[registrationName];
        if (bankForRegistrationName) {
          delete bankForRegistrationName[id];
        }
      },
      deleteAllListeners: function (id) {
        for (var registrationName in listenerBank) {
          if (!listenerBank[registrationName][id]) {
            continue;
          }
          var PluginModule = EventPluginRegistry.registrationNameModules[registrationName];
          if (PluginModule && PluginModule.willDeleteListener) {
            PluginModule.willDeleteListener(id, registrationName);
          }
          delete listenerBank[registrationName][id];
        }
      },
      extractEvents: function (topLevelType, topLevelTarget, topLevelTargetID, nativeEvent, nativeEventTarget) {
        var events;
        var plugins = EventPluginRegistry.plugins;
        for (var i = 0; i < plugins.length; i++) {
          var possiblePlugin = plugins[i];
          if (possiblePlugin) {
            var extractedEvents = possiblePlugin.extractEvents(topLevelType, topLevelTarget, topLevelTargetID, nativeEvent, nativeEventTarget);
            if (extractedEvents) {
              events = accumulateInto(events, extractedEvents);
            }
          }
        }
        return events;
      },
      enqueueEvents: function (events) {
        if (events) {
          eventQueue = accumulateInto(eventQueue, events);
        }
      },
      processEventQueue: function (simulated) {
        var processingEventQueue = eventQueue;
        eventQueue = null;
        if (simulated) {
          forEachAccumulated(processingEventQueue, executeDispatchesAndReleaseSimulated);
        } else {
          forEachAccumulated(processingEventQueue, executeDispatchesAndReleaseTopLevel);
        }
        !!eventQueue ? 'production' !== 'production' ? invariant(false, 'processEventQueue(): Additional events were enqueued while processing ' + 'an event queue. Support for this has not yet been implemented.') : invariant(false) : undefined;
        ReactErrorUtils.rethrowCaughtError();
      },
      __purge: function () {
        listenerBank = {};
      },
      __getListenerBank: function () {
        return listenerBank;
      }
    };
    module.exports = EventPluginHub;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
});
System.registerDynamic('npm:react@0.14.7/lib/ReactEventEmitterMixin.js', ['npm:react@0.14.7/lib/EventPluginHub.js'], true, function ($__require, exports, module) {
  /* */
  'use strict';

  var global = this || self,
      GLOBAL = global;
  var EventPluginHub = $__require('npm:react@0.14.7/lib/EventPluginHub.js');
  function runEventQueueInBatch(events) {
    EventPluginHub.enqueueEvents(events);
    EventPluginHub.processEventQueue(false);
  }
  var ReactEventEmitterMixin = { handleTopLevel: function (topLevelType, topLevelTarget, topLevelTargetID, nativeEvent, nativeEventTarget) {
      var events = EventPluginHub.extractEvents(topLevelType, topLevelTarget, topLevelTargetID, nativeEvent, nativeEventTarget);
      runEventQueueInBatch(events);
    } };
  module.exports = ReactEventEmitterMixin;
});
System.registerDynamic('npm:react@0.14.7/lib/ViewportMetrics.js', [], true, function ($__require, exports, module) {
  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule ViewportMetrics
   */

  'use strict';

  var global = this || self,
      GLOBAL = global;
  var ViewportMetrics = {

    currentScrollLeft: 0,

    currentScrollTop: 0,

    refreshScrollValues: function (scrollPosition) {
      ViewportMetrics.currentScrollLeft = scrollPosition.x;
      ViewportMetrics.currentScrollTop = scrollPosition.y;
    }

  };

  module.exports = ViewportMetrics;
});
System.registerDynamic('npm:react@0.14.7/lib/isEventSupported.js', ['npm:fbjs@0.6.1/lib/ExecutionEnvironment.js'], true, function ($__require, exports, module) {
  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule isEventSupported
   */

  'use strict';

  var global = this || self,
      GLOBAL = global;
  var ExecutionEnvironment = $__require('npm:fbjs@0.6.1/lib/ExecutionEnvironment.js');

  var useHasFeature;
  if (ExecutionEnvironment.canUseDOM) {
    useHasFeature = document.implementation && document.implementation.hasFeature &&
    // always returns true in newer browsers as per the standard.
    // @see http://dom.spec.whatwg.org/#dom-domimplementation-hasfeature
    document.implementation.hasFeature('', '') !== true;
  }

  /**
   * Checks if an event is supported in the current execution environment.
   *
   * NOTE: This will not work correctly for non-generic events such as `change`,
   * `reset`, `load`, `error`, and `select`.
   *
   * Borrows from Modernizr.
   *
   * @param {string} eventNameSuffix Event name, e.g. "click".
   * @param {?boolean} capture Check if the capture phase is supported.
   * @return {boolean} True if the event is supported.
   * @internal
   * @license Modernizr 3.0.0pre (Custom Build) | MIT
   */
  function isEventSupported(eventNameSuffix, capture) {
    if (!ExecutionEnvironment.canUseDOM || capture && !('addEventListener' in document)) {
      return false;
    }

    var eventName = 'on' + eventNameSuffix;
    var isSupported = eventName in document;

    if (!isSupported) {
      var element = document.createElement('div');
      element.setAttribute(eventName, 'return;');
      isSupported = typeof element[eventName] === 'function';
    }

    if (!isSupported && useHasFeature && eventNameSuffix === 'wheel') {
      // This is the only way to test support for the `wheel` event in IE9+.
      isSupported = document.implementation.hasFeature('Events.wheel', '3.0');
    }

    return isSupported;
  }

  module.exports = isEventSupported;
});
System.registerDynamic('npm:react@0.14.7/lib/ReactBrowserEventEmitter.js', ['npm:react@0.14.7/lib/EventConstants.js', 'npm:react@0.14.7/lib/EventPluginHub.js', 'npm:react@0.14.7/lib/EventPluginRegistry.js', 'npm:react@0.14.7/lib/ReactEventEmitterMixin.js', 'npm:react@0.14.7/lib/ReactPerf.js', 'npm:react@0.14.7/lib/ViewportMetrics.js', 'npm:react@0.14.7/lib/Object.assign.js', 'npm:react@0.14.7/lib/isEventSupported.js', 'github:jspm/nodelibs-process@0.1.2.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  (function (process) {
    'use strict';

    var EventConstants = $__require('npm:react@0.14.7/lib/EventConstants.js');
    var EventPluginHub = $__require('npm:react@0.14.7/lib/EventPluginHub.js');
    var EventPluginRegistry = $__require('npm:react@0.14.7/lib/EventPluginRegistry.js');
    var ReactEventEmitterMixin = $__require('npm:react@0.14.7/lib/ReactEventEmitterMixin.js');
    var ReactPerf = $__require('npm:react@0.14.7/lib/ReactPerf.js');
    var ViewportMetrics = $__require('npm:react@0.14.7/lib/ViewportMetrics.js');
    var assign = $__require('npm:react@0.14.7/lib/Object.assign.js');
    var isEventSupported = $__require('npm:react@0.14.7/lib/isEventSupported.js');
    var alreadyListeningTo = {};
    var isMonitoringScrollValue = false;
    var reactTopListenersCounter = 0;
    var topEventMapping = {
      topAbort: 'abort',
      topBlur: 'blur',
      topCanPlay: 'canplay',
      topCanPlayThrough: 'canplaythrough',
      topChange: 'change',
      topClick: 'click',
      topCompositionEnd: 'compositionend',
      topCompositionStart: 'compositionstart',
      topCompositionUpdate: 'compositionupdate',
      topContextMenu: 'contextmenu',
      topCopy: 'copy',
      topCut: 'cut',
      topDoubleClick: 'dblclick',
      topDrag: 'drag',
      topDragEnd: 'dragend',
      topDragEnter: 'dragenter',
      topDragExit: 'dragexit',
      topDragLeave: 'dragleave',
      topDragOver: 'dragover',
      topDragStart: 'dragstart',
      topDrop: 'drop',
      topDurationChange: 'durationchange',
      topEmptied: 'emptied',
      topEncrypted: 'encrypted',
      topEnded: 'ended',
      topError: 'error',
      topFocus: 'focus',
      topInput: 'input',
      topKeyDown: 'keydown',
      topKeyPress: 'keypress',
      topKeyUp: 'keyup',
      topLoadedData: 'loadeddata',
      topLoadedMetadata: 'loadedmetadata',
      topLoadStart: 'loadstart',
      topMouseDown: 'mousedown',
      topMouseMove: 'mousemove',
      topMouseOut: 'mouseout',
      topMouseOver: 'mouseover',
      topMouseUp: 'mouseup',
      topPaste: 'paste',
      topPause: 'pause',
      topPlay: 'play',
      topPlaying: 'playing',
      topProgress: 'progress',
      topRateChange: 'ratechange',
      topScroll: 'scroll',
      topSeeked: 'seeked',
      topSeeking: 'seeking',
      topSelectionChange: 'selectionchange',
      topStalled: 'stalled',
      topSuspend: 'suspend',
      topTextInput: 'textInput',
      topTimeUpdate: 'timeupdate',
      topTouchCancel: 'touchcancel',
      topTouchEnd: 'touchend',
      topTouchMove: 'touchmove',
      topTouchStart: 'touchstart',
      topVolumeChange: 'volumechange',
      topWaiting: 'waiting',
      topWheel: 'wheel'
    };
    var topListenersIDKey = '_reactListenersID' + String(Math.random()).slice(2);
    function getListeningForDocument(mountAt) {
      if (!Object.prototype.hasOwnProperty.call(mountAt, topListenersIDKey)) {
        mountAt[topListenersIDKey] = reactTopListenersCounter++;
        alreadyListeningTo[mountAt[topListenersIDKey]] = {};
      }
      return alreadyListeningTo[mountAt[topListenersIDKey]];
    }
    var ReactBrowserEventEmitter = assign({}, ReactEventEmitterMixin, {
      ReactEventListener: null,
      injection: { injectReactEventListener: function (ReactEventListener) {
          ReactEventListener.setHandleTopLevel(ReactBrowserEventEmitter.handleTopLevel);
          ReactBrowserEventEmitter.ReactEventListener = ReactEventListener;
        } },
      setEnabled: function (enabled) {
        if (ReactBrowserEventEmitter.ReactEventListener) {
          ReactBrowserEventEmitter.ReactEventListener.setEnabled(enabled);
        }
      },
      isEnabled: function () {
        return !!(ReactBrowserEventEmitter.ReactEventListener && ReactBrowserEventEmitter.ReactEventListener.isEnabled());
      },
      listenTo: function (registrationName, contentDocumentHandle) {
        var mountAt = contentDocumentHandle;
        var isListening = getListeningForDocument(mountAt);
        var dependencies = EventPluginRegistry.registrationNameDependencies[registrationName];
        var topLevelTypes = EventConstants.topLevelTypes;
        for (var i = 0; i < dependencies.length; i++) {
          var dependency = dependencies[i];
          if (!(isListening.hasOwnProperty(dependency) && isListening[dependency])) {
            if (dependency === topLevelTypes.topWheel) {
              if (isEventSupported('wheel')) {
                ReactBrowserEventEmitter.ReactEventListener.trapBubbledEvent(topLevelTypes.topWheel, 'wheel', mountAt);
              } else if (isEventSupported('mousewheel')) {
                ReactBrowserEventEmitter.ReactEventListener.trapBubbledEvent(topLevelTypes.topWheel, 'mousewheel', mountAt);
              } else {
                ReactBrowserEventEmitter.ReactEventListener.trapBubbledEvent(topLevelTypes.topWheel, 'DOMMouseScroll', mountAt);
              }
            } else if (dependency === topLevelTypes.topScroll) {
              if (isEventSupported('scroll', true)) {
                ReactBrowserEventEmitter.ReactEventListener.trapCapturedEvent(topLevelTypes.topScroll, 'scroll', mountAt);
              } else {
                ReactBrowserEventEmitter.ReactEventListener.trapBubbledEvent(topLevelTypes.topScroll, 'scroll', ReactBrowserEventEmitter.ReactEventListener.WINDOW_HANDLE);
              }
            } else if (dependency === topLevelTypes.topFocus || dependency === topLevelTypes.topBlur) {
              if (isEventSupported('focus', true)) {
                ReactBrowserEventEmitter.ReactEventListener.trapCapturedEvent(topLevelTypes.topFocus, 'focus', mountAt);
                ReactBrowserEventEmitter.ReactEventListener.trapCapturedEvent(topLevelTypes.topBlur, 'blur', mountAt);
              } else if (isEventSupported('focusin')) {
                ReactBrowserEventEmitter.ReactEventListener.trapBubbledEvent(topLevelTypes.topFocus, 'focusin', mountAt);
                ReactBrowserEventEmitter.ReactEventListener.trapBubbledEvent(topLevelTypes.topBlur, 'focusout', mountAt);
              }
              isListening[topLevelTypes.topBlur] = true;
              isListening[topLevelTypes.topFocus] = true;
            } else if (topEventMapping.hasOwnProperty(dependency)) {
              ReactBrowserEventEmitter.ReactEventListener.trapBubbledEvent(dependency, topEventMapping[dependency], mountAt);
            }
            isListening[dependency] = true;
          }
        }
      },
      trapBubbledEvent: function (topLevelType, handlerBaseName, handle) {
        return ReactBrowserEventEmitter.ReactEventListener.trapBubbledEvent(topLevelType, handlerBaseName, handle);
      },
      trapCapturedEvent: function (topLevelType, handlerBaseName, handle) {
        return ReactBrowserEventEmitter.ReactEventListener.trapCapturedEvent(topLevelType, handlerBaseName, handle);
      },
      ensureScrollValueMonitoring: function () {
        if (!isMonitoringScrollValue) {
          var refresh = ViewportMetrics.refreshScrollValues;
          ReactBrowserEventEmitter.ReactEventListener.monitorScrollValue(refresh);
          isMonitoringScrollValue = true;
        }
      },
      eventNameDispatchConfigs: EventPluginHub.eventNameDispatchConfigs,
      registrationNameModules: EventPluginHub.registrationNameModules,
      putListener: EventPluginHub.putListener,
      getListener: EventPluginHub.getListener,
      deleteListener: EventPluginHub.deleteListener,
      deleteAllListeners: EventPluginHub.deleteAllListeners
    });
    ReactPerf.measureMethods(ReactBrowserEventEmitter, 'ReactBrowserEventEmitter', {
      putListener: 'putListener',
      deleteListener: 'deleteListener'
    });
    module.exports = ReactBrowserEventEmitter;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
});
System.registerDynamic('npm:react@0.14.7/lib/ReactDOMFeatureFlags.js', [], true, function ($__require, exports, module) {
  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule ReactDOMFeatureFlags
   */

  'use strict';

  var global = this || self,
      GLOBAL = global;
  var ReactDOMFeatureFlags = {
    useCreateElement: false
  };

  module.exports = ReactDOMFeatureFlags;
});
System.registerDynamic('npm:fbjs@0.6.1/lib/isNode.js', [], true, function ($__require, exports, module) {
  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule isNode
   * @typechecks
   */

  /**
   * @param {*} object The object to check.
   * @return {boolean} Whether or not the object is a DOM node.
   */
  'use strict';

  var global = this || self,
      GLOBAL = global;
  function isNode(object) {
    return !!(object && (typeof Node === 'function' ? object instanceof Node : typeof object === 'object' && typeof object.nodeType === 'number' && typeof object.nodeName === 'string'));
  }

  module.exports = isNode;
});
System.registerDynamic('npm:fbjs@0.6.1/lib/isTextNode.js', ['npm:fbjs@0.6.1/lib/isNode.js'], true, function ($__require, exports, module) {
  /* */
  'use strict';

  var global = this || self,
      GLOBAL = global;
  var isNode = $__require('npm:fbjs@0.6.1/lib/isNode.js');
  function isTextNode(object) {
    return isNode(object) && object.nodeType == 3;
  }
  module.exports = isTextNode;
});
System.registerDynamic('npm:fbjs@0.6.1/lib/containsNode.js', ['npm:fbjs@0.6.1/lib/isTextNode.js'], true, function ($__require, exports, module) {
  /* */
  'use strict';

  var global = this || self,
      GLOBAL = global;
  var isTextNode = $__require('npm:fbjs@0.6.1/lib/isTextNode.js');
  function containsNode(_x, _x2) {
    var _again = true;
    _function: while (_again) {
      var outerNode = _x,
          innerNode = _x2;
      _again = false;
      if (!outerNode || !innerNode) {
        return false;
      } else if (outerNode === innerNode) {
        return true;
      } else if (isTextNode(outerNode)) {
        return false;
      } else if (isTextNode(innerNode)) {
        _x = outerNode;
        _x2 = innerNode.parentNode;
        _again = true;
        continue _function;
      } else if (outerNode.contains) {
        return outerNode.contains(innerNode);
      } else if (outerNode.compareDocumentPosition) {
        return !!(outerNode.compareDocumentPosition(innerNode) & 16);
      } else {
        return false;
      }
    }
  }
  module.exports = containsNode;
});
System.registerDynamic('npm:react@0.14.7/lib/setInnerHTML.js', ['npm:fbjs@0.6.1/lib/ExecutionEnvironment.js', 'github:jspm/nodelibs-process@0.1.2.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  (function (process) {
    'use strict';

    var ExecutionEnvironment = $__require('npm:fbjs@0.6.1/lib/ExecutionEnvironment.js');
    var WHITESPACE_TEST = /^[ \r\n\t\f]/;
    var NONVISIBLE_TEST = /<(!--|link|noscript|meta|script|style)[ \r\n\t\f\/>]/;
    var setInnerHTML = function (node, html) {
      node.innerHTML = html;
    };
    if (typeof MSApp !== 'undefined' && MSApp.execUnsafeLocalFunction) {
      setInnerHTML = function (node, html) {
        MSApp.execUnsafeLocalFunction(function () {
          node.innerHTML = html;
        });
      };
    }
    if (ExecutionEnvironment.canUseDOM) {
      var testElement = document.createElement('div');
      testElement.innerHTML = ' ';
      if (testElement.innerHTML === '') {
        setInnerHTML = function (node, html) {
          if (node.parentNode) {
            node.parentNode.replaceChild(node, node);
          }
          if (WHITESPACE_TEST.test(html) || html[0] === '<' && NONVISIBLE_TEST.test(html)) {
            node.innerHTML = String.fromCharCode(0xFEFF) + html;
            var textNode = node.firstChild;
            if (textNode.data.length === 1) {
              node.removeChild(textNode);
            } else {
              textNode.deleteData(0, 1);
            }
          } else {
            node.innerHTML = html;
          }
        };
      }
    }
    module.exports = setInnerHTML;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
});
System.registerDynamic('npm:react@0.14.7/lib/validateDOMNesting.js', ['npm:react@0.14.7/lib/Object.assign.js', 'npm:fbjs@0.6.1/lib/emptyFunction.js', 'npm:fbjs@0.6.1/lib/warning.js', 'github:jspm/nodelibs-process@0.1.2.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  (function (process) {
    'use strict';

    var assign = $__require('npm:react@0.14.7/lib/Object.assign.js');
    var emptyFunction = $__require('npm:fbjs@0.6.1/lib/emptyFunction.js');
    var warning = $__require('npm:fbjs@0.6.1/lib/warning.js');
    var validateDOMNesting = emptyFunction;
    if ('production' !== 'production') {
      var specialTags = ['address', 'applet', 'area', 'article', 'aside', 'base', 'basefont', 'bgsound', 'blockquote', 'body', 'br', 'button', 'caption', 'center', 'col', 'colgroup', 'dd', 'details', 'dir', 'div', 'dl', 'dt', 'embed', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'frame', 'frameset', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html', 'iframe', 'img', 'input', 'isindex', 'li', 'link', 'listing', 'main', 'marquee', 'menu', 'menuitem', 'meta', 'nav', 'noembed', 'noframes', 'noscript', 'object', 'ol', 'p', 'param', 'plaintext', 'pre', 'script', 'section', 'select', 'source', 'style', 'summary', 'table', 'tbody', 'td', 'template', 'textarea', 'tfoot', 'th', 'thead', 'title', 'tr', 'track', 'ul', 'wbr', 'xmp'];
      var inScopeTags = ['applet', 'caption', 'html', 'table', 'td', 'th', 'marquee', 'object', 'template', 'foreignObject', 'desc', 'title'];
      var buttonScopeTags = inScopeTags.concat(['button']);
      var impliedEndTags = ['dd', 'dt', 'li', 'option', 'optgroup', 'p', 'rp', 'rt'];
      var emptyAncestorInfo = {
        parentTag: null,
        formTag: null,
        aTagInScope: null,
        buttonTagInScope: null,
        nobrTagInScope: null,
        pTagInButtonScope: null,
        listItemTagAutoclosing: null,
        dlItemTagAutoclosing: null
      };
      var updatedAncestorInfo = function (oldInfo, tag, instance) {
        var ancestorInfo = assign({}, oldInfo || emptyAncestorInfo);
        var info = {
          tag: tag,
          instance: instance
        };
        if (inScopeTags.indexOf(tag) !== -1) {
          ancestorInfo.aTagInScope = null;
          ancestorInfo.buttonTagInScope = null;
          ancestorInfo.nobrTagInScope = null;
        }
        if (buttonScopeTags.indexOf(tag) !== -1) {
          ancestorInfo.pTagInButtonScope = null;
        }
        if (specialTags.indexOf(tag) !== -1 && tag !== 'address' && tag !== 'div' && tag !== 'p') {
          ancestorInfo.listItemTagAutoclosing = null;
          ancestorInfo.dlItemTagAutoclosing = null;
        }
        ancestorInfo.parentTag = info;
        if (tag === 'form') {
          ancestorInfo.formTag = info;
        }
        if (tag === 'a') {
          ancestorInfo.aTagInScope = info;
        }
        if (tag === 'button') {
          ancestorInfo.buttonTagInScope = info;
        }
        if (tag === 'nobr') {
          ancestorInfo.nobrTagInScope = info;
        }
        if (tag === 'p') {
          ancestorInfo.pTagInButtonScope = info;
        }
        if (tag === 'li') {
          ancestorInfo.listItemTagAutoclosing = info;
        }
        if (tag === 'dd' || tag === 'dt') {
          ancestorInfo.dlItemTagAutoclosing = info;
        }
        return ancestorInfo;
      };
      var isTagValidWithParent = function (tag, parentTag) {
        switch (parentTag) {
          case 'select':
            return tag === 'option' || tag === 'optgroup' || tag === '#text';
          case 'optgroup':
            return tag === 'option' || tag === '#text';
          case 'option':
            return tag === '#text';
          case 'tr':
            return tag === 'th' || tag === 'td' || tag === 'style' || tag === 'script' || tag === 'template';
          case 'tbody':
          case 'thead':
          case 'tfoot':
            return tag === 'tr' || tag === 'style' || tag === 'script' || tag === 'template';
          case 'colgroup':
            return tag === 'col' || tag === 'template';
          case 'table':
            return tag === 'caption' || tag === 'colgroup' || tag === 'tbody' || tag === 'tfoot' || tag === 'thead' || tag === 'style' || tag === 'script' || tag === 'template';
          case 'head':
            return tag === 'base' || tag === 'basefont' || tag === 'bgsound' || tag === 'link' || tag === 'meta' || tag === 'title' || tag === 'noscript' || tag === 'noframes' || tag === 'style' || tag === 'script' || tag === 'template';
          case 'html':
            return tag === 'head' || tag === 'body';
        }
        switch (tag) {
          case 'h1':
          case 'h2':
          case 'h3':
          case 'h4':
          case 'h5':
          case 'h6':
            return parentTag !== 'h1' && parentTag !== 'h2' && parentTag !== 'h3' && parentTag !== 'h4' && parentTag !== 'h5' && parentTag !== 'h6';
          case 'rp':
          case 'rt':
            return impliedEndTags.indexOf(parentTag) === -1;
          case 'caption':
          case 'col':
          case 'colgroup':
          case 'frame':
          case 'head':
          case 'tbody':
          case 'td':
          case 'tfoot':
          case 'th':
          case 'thead':
          case 'tr':
            return parentTag == null;
        }
        return true;
      };
      var findInvalidAncestorForTag = function (tag, ancestorInfo) {
        switch (tag) {
          case 'address':
          case 'article':
          case 'aside':
          case 'blockquote':
          case 'center':
          case 'details':
          case 'dialog':
          case 'dir':
          case 'div':
          case 'dl':
          case 'fieldset':
          case 'figcaption':
          case 'figure':
          case 'footer':
          case 'header':
          case 'hgroup':
          case 'main':
          case 'menu':
          case 'nav':
          case 'ol':
          case 'p':
          case 'section':
          case 'summary':
          case 'ul':
          case 'pre':
          case 'listing':
          case 'table':
          case 'hr':
          case 'xmp':
          case 'h1':
          case 'h2':
          case 'h3':
          case 'h4':
          case 'h5':
          case 'h6':
            return ancestorInfo.pTagInButtonScope;
          case 'form':
            return ancestorInfo.formTag || ancestorInfo.pTagInButtonScope;
          case 'li':
            return ancestorInfo.listItemTagAutoclosing;
          case 'dd':
          case 'dt':
            return ancestorInfo.dlItemTagAutoclosing;
          case 'button':
            return ancestorInfo.buttonTagInScope;
          case 'a':
            return ancestorInfo.aTagInScope;
          case 'nobr':
            return ancestorInfo.nobrTagInScope;
        }
        return null;
      };
      var findOwnerStack = function (instance) {
        if (!instance) {
          return [];
        }
        var stack = [];
        do {
          stack.push(instance);
        } while (instance = instance._currentElement._owner);
        stack.reverse();
        return stack;
      };
      var didWarn = {};
      validateDOMNesting = function (childTag, childInstance, ancestorInfo) {
        ancestorInfo = ancestorInfo || emptyAncestorInfo;
        var parentInfo = ancestorInfo.parentTag;
        var parentTag = parentInfo && parentInfo.tag;
        var invalidParent = isTagValidWithParent(childTag, parentTag) ? null : parentInfo;
        var invalidAncestor = invalidParent ? null : findInvalidAncestorForTag(childTag, ancestorInfo);
        var problematic = invalidParent || invalidAncestor;
        if (problematic) {
          var ancestorTag = problematic.tag;
          var ancestorInstance = problematic.instance;
          var childOwner = childInstance && childInstance._currentElement._owner;
          var ancestorOwner = ancestorInstance && ancestorInstance._currentElement._owner;
          var childOwners = findOwnerStack(childOwner);
          var ancestorOwners = findOwnerStack(ancestorOwner);
          var minStackLen = Math.min(childOwners.length, ancestorOwners.length);
          var i;
          var deepestCommon = -1;
          for (i = 0; i < minStackLen; i++) {
            if (childOwners[i] === ancestorOwners[i]) {
              deepestCommon = i;
            } else {
              break;
            }
          }
          var UNKNOWN = '(unknown)';
          var childOwnerNames = childOwners.slice(deepestCommon + 1).map(function (inst) {
            return inst.getName() || UNKNOWN;
          });
          var ancestorOwnerNames = ancestorOwners.slice(deepestCommon + 1).map(function (inst) {
            return inst.getName() || UNKNOWN;
          });
          var ownerInfo = [].concat(deepestCommon !== -1 ? childOwners[deepestCommon].getName() || UNKNOWN : [], ancestorOwnerNames, ancestorTag, invalidAncestor ? ['...'] : [], childOwnerNames, childTag).join(' > ');
          var warnKey = !!invalidParent + '|' + childTag + '|' + ancestorTag + '|' + ownerInfo;
          if (didWarn[warnKey]) {
            return;
          }
          didWarn[warnKey] = true;
          if (invalidParent) {
            var info = '';
            if (ancestorTag === 'table' && childTag === 'tr') {
              info += ' Add a <tbody> to your code to match the DOM tree generated by ' + 'the browser.';
            }
            'production' !== 'production' ? warning(false, 'validateDOMNesting(...): <%s> cannot appear as a child of <%s>. ' + 'See %s.%s', childTag, ancestorTag, ownerInfo, info) : undefined;
          } else {
            'production' !== 'production' ? warning(false, 'validateDOMNesting(...): <%s> cannot appear as a descendant of ' + '<%s>. See %s.', childTag, ancestorTag, ownerInfo) : undefined;
          }
        }
      };
      validateDOMNesting.ancestorInfoContextKey = '__validateDOMNesting_ancestorInfo$' + Math.random().toString(36).slice(2);
      validateDOMNesting.updatedAncestorInfo = updatedAncestorInfo;
      validateDOMNesting.isTagValidInContext = function (tag, ancestorInfo) {
        ancestorInfo = ancestorInfo || emptyAncestorInfo;
        var parentInfo = ancestorInfo.parentTag;
        var parentTag = parentInfo && parentInfo.tag;
        return isTagValidWithParent(tag, parentTag) && !findInvalidAncestorForTag(tag, ancestorInfo);
      };
    }
    module.exports = validateDOMNesting;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
});
System.registerDynamic('npm:react@0.14.7/lib/ReactMount.js', ['npm:react@0.14.7/lib/DOMProperty.js', 'npm:react@0.14.7/lib/ReactBrowserEventEmitter.js', 'npm:react@0.14.7/lib/ReactCurrentOwner.js', 'npm:react@0.14.7/lib/ReactDOMFeatureFlags.js', 'npm:react@0.14.7/lib/ReactElement.js', 'npm:react@0.14.7/lib/ReactEmptyComponentRegistry.js', 'npm:react@0.14.7/lib/ReactInstanceHandles.js', 'npm:react@0.14.7/lib/ReactInstanceMap.js', 'npm:react@0.14.7/lib/ReactMarkupChecksum.js', 'npm:react@0.14.7/lib/ReactPerf.js', 'npm:react@0.14.7/lib/ReactReconciler.js', 'npm:react@0.14.7/lib/ReactUpdateQueue.js', 'npm:react@0.14.7/lib/ReactUpdates.js', 'npm:react@0.14.7/lib/Object.assign.js', 'npm:fbjs@0.6.1/lib/emptyObject.js', 'npm:fbjs@0.6.1/lib/containsNode.js', 'npm:react@0.14.7/lib/instantiateReactComponent.js', 'npm:fbjs@0.6.1/lib/invariant.js', 'npm:react@0.14.7/lib/setInnerHTML.js', 'npm:react@0.14.7/lib/shouldUpdateReactComponent.js', 'npm:react@0.14.7/lib/validateDOMNesting.js', 'npm:fbjs@0.6.1/lib/warning.js', 'github:jspm/nodelibs-process@0.1.2.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  (function (process) {
    'use strict';

    var DOMProperty = $__require('npm:react@0.14.7/lib/DOMProperty.js');
    var ReactBrowserEventEmitter = $__require('npm:react@0.14.7/lib/ReactBrowserEventEmitter.js');
    var ReactCurrentOwner = $__require('npm:react@0.14.7/lib/ReactCurrentOwner.js');
    var ReactDOMFeatureFlags = $__require('npm:react@0.14.7/lib/ReactDOMFeatureFlags.js');
    var ReactElement = $__require('npm:react@0.14.7/lib/ReactElement.js');
    var ReactEmptyComponentRegistry = $__require('npm:react@0.14.7/lib/ReactEmptyComponentRegistry.js');
    var ReactInstanceHandles = $__require('npm:react@0.14.7/lib/ReactInstanceHandles.js');
    var ReactInstanceMap = $__require('npm:react@0.14.7/lib/ReactInstanceMap.js');
    var ReactMarkupChecksum = $__require('npm:react@0.14.7/lib/ReactMarkupChecksum.js');
    var ReactPerf = $__require('npm:react@0.14.7/lib/ReactPerf.js');
    var ReactReconciler = $__require('npm:react@0.14.7/lib/ReactReconciler.js');
    var ReactUpdateQueue = $__require('npm:react@0.14.7/lib/ReactUpdateQueue.js');
    var ReactUpdates = $__require('npm:react@0.14.7/lib/ReactUpdates.js');
    var assign = $__require('npm:react@0.14.7/lib/Object.assign.js');
    var emptyObject = $__require('npm:fbjs@0.6.1/lib/emptyObject.js');
    var containsNode = $__require('npm:fbjs@0.6.1/lib/containsNode.js');
    var instantiateReactComponent = $__require('npm:react@0.14.7/lib/instantiateReactComponent.js');
    var invariant = $__require('npm:fbjs@0.6.1/lib/invariant.js');
    var setInnerHTML = $__require('npm:react@0.14.7/lib/setInnerHTML.js');
    var shouldUpdateReactComponent = $__require('npm:react@0.14.7/lib/shouldUpdateReactComponent.js');
    var validateDOMNesting = $__require('npm:react@0.14.7/lib/validateDOMNesting.js');
    var warning = $__require('npm:fbjs@0.6.1/lib/warning.js');
    var ATTR_NAME = DOMProperty.ID_ATTRIBUTE_NAME;
    var nodeCache = {};
    var ELEMENT_NODE_TYPE = 1;
    var DOC_NODE_TYPE = 9;
    var DOCUMENT_FRAGMENT_NODE_TYPE = 11;
    var ownerDocumentContextKey = '__ReactMount_ownerDocument$' + Math.random().toString(36).slice(2);
    var instancesByReactRootID = {};
    var containersByReactRootID = {};
    if ('production' !== 'production') {
      var rootElementsByReactRootID = {};
    }
    var findComponentRootReusableArray = [];
    function firstDifferenceIndex(string1, string2) {
      var minLen = Math.min(string1.length, string2.length);
      for (var i = 0; i < minLen; i++) {
        if (string1.charAt(i) !== string2.charAt(i)) {
          return i;
        }
      }
      return string1.length === string2.length ? -1 : minLen;
    }
    function getReactRootElementInContainer(container) {
      if (!container) {
        return null;
      }
      if (container.nodeType === DOC_NODE_TYPE) {
        return container.documentElement;
      } else {
        return container.firstChild;
      }
    }
    function getReactRootID(container) {
      var rootElement = getReactRootElementInContainer(container);
      return rootElement && ReactMount.getID(rootElement);
    }
    function getID(node) {
      var id = internalGetID(node);
      if (id) {
        if (nodeCache.hasOwnProperty(id)) {
          var cached = nodeCache[id];
          if (cached !== node) {
            !!isValid(cached, id) ? 'production' !== 'production' ? invariant(false, 'ReactMount: Two valid but unequal nodes with the same `%s`: %s', ATTR_NAME, id) : invariant(false) : undefined;
            nodeCache[id] = node;
          }
        } else {
          nodeCache[id] = node;
        }
      }
      return id;
    }
    function internalGetID(node) {
      return node && node.getAttribute && node.getAttribute(ATTR_NAME) || '';
    }
    function setID(node, id) {
      var oldID = internalGetID(node);
      if (oldID !== id) {
        delete nodeCache[oldID];
      }
      node.setAttribute(ATTR_NAME, id);
      nodeCache[id] = node;
    }
    function getNode(id) {
      if (!nodeCache.hasOwnProperty(id) || !isValid(nodeCache[id], id)) {
        nodeCache[id] = ReactMount.findReactNodeByID(id);
      }
      return nodeCache[id];
    }
    function getNodeFromInstance(instance) {
      var id = ReactInstanceMap.get(instance)._rootNodeID;
      if (ReactEmptyComponentRegistry.isNullComponentID(id)) {
        return null;
      }
      if (!nodeCache.hasOwnProperty(id) || !isValid(nodeCache[id], id)) {
        nodeCache[id] = ReactMount.findReactNodeByID(id);
      }
      return nodeCache[id];
    }
    function isValid(node, id) {
      if (node) {
        !(internalGetID(node) === id) ? 'production' !== 'production' ? invariant(false, 'ReactMount: Unexpected modification of `%s`', ATTR_NAME) : invariant(false) : undefined;
        var container = ReactMount.findReactContainerForID(id);
        if (container && containsNode(container, node)) {
          return true;
        }
      }
      return false;
    }
    function purgeID(id) {
      delete nodeCache[id];
    }
    var deepestNodeSoFar = null;
    function findDeepestCachedAncestorImpl(ancestorID) {
      var ancestor = nodeCache[ancestorID];
      if (ancestor && isValid(ancestor, ancestorID)) {
        deepestNodeSoFar = ancestor;
      } else {
        return false;
      }
    }
    function findDeepestCachedAncestor(targetID) {
      deepestNodeSoFar = null;
      ReactInstanceHandles.traverseAncestors(targetID, findDeepestCachedAncestorImpl);
      var foundNode = deepestNodeSoFar;
      deepestNodeSoFar = null;
      return foundNode;
    }
    function mountComponentIntoNode(componentInstance, rootID, container, transaction, shouldReuseMarkup, context) {
      if (ReactDOMFeatureFlags.useCreateElement) {
        context = assign({}, context);
        if (container.nodeType === DOC_NODE_TYPE) {
          context[ownerDocumentContextKey] = container;
        } else {
          context[ownerDocumentContextKey] = container.ownerDocument;
        }
      }
      if ('production' !== 'production') {
        if (context === emptyObject) {
          context = {};
        }
        var tag = container.nodeName.toLowerCase();
        context[validateDOMNesting.ancestorInfoContextKey] = validateDOMNesting.updatedAncestorInfo(null, tag, null);
      }
      var markup = ReactReconciler.mountComponent(componentInstance, rootID, transaction, context);
      componentInstance._renderedComponent._topLevelWrapper = componentInstance;
      ReactMount._mountImageIntoNode(markup, container, shouldReuseMarkup, transaction);
    }
    function batchedMountComponentIntoNode(componentInstance, rootID, container, shouldReuseMarkup, context) {
      var transaction = ReactUpdates.ReactReconcileTransaction.getPooled(shouldReuseMarkup);
      transaction.perform(mountComponentIntoNode, null, componentInstance, rootID, container, transaction, shouldReuseMarkup, context);
      ReactUpdates.ReactReconcileTransaction.release(transaction);
    }
    function unmountComponentFromNode(instance, container) {
      ReactReconciler.unmountComponent(instance);
      if (container.nodeType === DOC_NODE_TYPE) {
        container = container.documentElement;
      }
      while (container.lastChild) {
        container.removeChild(container.lastChild);
      }
    }
    function hasNonRootReactChild(node) {
      var reactRootID = getReactRootID(node);
      return reactRootID ? reactRootID !== ReactInstanceHandles.getReactRootIDFromNodeID(reactRootID) : false;
    }
    function findFirstReactDOMImpl(node) {
      for (; node && node.parentNode !== node; node = node.parentNode) {
        if (node.nodeType !== 1) {
          continue;
        }
        var nodeID = internalGetID(node);
        if (!nodeID) {
          continue;
        }
        var reactRootID = ReactInstanceHandles.getReactRootIDFromNodeID(nodeID);
        var current = node;
        var lastID;
        do {
          lastID = internalGetID(current);
          current = current.parentNode;
          if (current == null) {
            return null;
          }
        } while (lastID !== reactRootID);
        if (current === containersByReactRootID[reactRootID]) {
          return node;
        }
      }
      return null;
    }
    var TopLevelWrapper = function () {};
    TopLevelWrapper.prototype.isReactComponent = {};
    if ('production' !== 'production') {
      TopLevelWrapper.displayName = 'TopLevelWrapper';
    }
    TopLevelWrapper.prototype.render = function () {
      return this.props;
    };
    var ReactMount = {
      TopLevelWrapper: TopLevelWrapper,
      _instancesByReactRootID: instancesByReactRootID,
      scrollMonitor: function (container, renderCallback) {
        renderCallback();
      },
      _updateRootComponent: function (prevComponent, nextElement, container, callback) {
        ReactMount.scrollMonitor(container, function () {
          ReactUpdateQueue.enqueueElementInternal(prevComponent, nextElement);
          if (callback) {
            ReactUpdateQueue.enqueueCallbackInternal(prevComponent, callback);
          }
        });
        if ('production' !== 'production') {
          rootElementsByReactRootID[getReactRootID(container)] = getReactRootElementInContainer(container);
        }
        return prevComponent;
      },
      _registerComponent: function (nextComponent, container) {
        !(container && (container.nodeType === ELEMENT_NODE_TYPE || container.nodeType === DOC_NODE_TYPE || container.nodeType === DOCUMENT_FRAGMENT_NODE_TYPE)) ? 'production' !== 'production' ? invariant(false, '_registerComponent(...): Target container is not a DOM element.') : invariant(false) : undefined;
        ReactBrowserEventEmitter.ensureScrollValueMonitoring();
        var reactRootID = ReactMount.registerContainer(container);
        instancesByReactRootID[reactRootID] = nextComponent;
        return reactRootID;
      },
      _renderNewRootComponent: function (nextElement, container, shouldReuseMarkup, context) {
        'production' !== 'production' ? warning(ReactCurrentOwner.current == null, '_renderNewRootComponent(): Render methods should be a pure function ' + 'of props and state; triggering nested component updates from ' + 'render is not allowed. If necessary, trigger nested updates in ' + 'componentDidUpdate. Check the render method of %s.', ReactCurrentOwner.current && ReactCurrentOwner.current.getName() || 'ReactCompositeComponent') : undefined;
        var componentInstance = instantiateReactComponent(nextElement, null);
        var reactRootID = ReactMount._registerComponent(componentInstance, container);
        ReactUpdates.batchedUpdates(batchedMountComponentIntoNode, componentInstance, reactRootID, container, shouldReuseMarkup, context);
        if ('production' !== 'production') {
          rootElementsByReactRootID[reactRootID] = getReactRootElementInContainer(container);
        }
        return componentInstance;
      },
      renderSubtreeIntoContainer: function (parentComponent, nextElement, container, callback) {
        !(parentComponent != null && parentComponent._reactInternalInstance != null) ? 'production' !== 'production' ? invariant(false, 'parentComponent must be a valid React Component') : invariant(false) : undefined;
        return ReactMount._renderSubtreeIntoContainer(parentComponent, nextElement, container, callback);
      },
      _renderSubtreeIntoContainer: function (parentComponent, nextElement, container, callback) {
        !ReactElement.isValidElement(nextElement) ? 'production' !== 'production' ? invariant(false, 'ReactDOM.render(): Invalid component element.%s', typeof nextElement === 'string' ? ' Instead of passing an element string, make sure to instantiate ' + 'it by passing it to React.createElement.' : typeof nextElement === 'function' ? ' Instead of passing a component class, make sure to instantiate ' + 'it by passing it to React.createElement.' : nextElement != null && nextElement.props !== undefined ? ' This may be caused by unintentionally loading two independent ' + 'copies of React.' : '') : invariant(false) : undefined;
        'production' !== 'production' ? warning(!container || !container.tagName || container.tagName.toUpperCase() !== 'BODY', 'render(): Rendering components directly into document.body is ' + 'discouraged, since its children are often manipulated by third-party ' + 'scripts and browser extensions. This may lead to subtle ' + 'reconciliation issues. Try rendering into a container element created ' + 'for your app.') : undefined;
        var nextWrappedElement = new ReactElement(TopLevelWrapper, null, null, null, null, null, nextElement);
        var prevComponent = instancesByReactRootID[getReactRootID(container)];
        if (prevComponent) {
          var prevWrappedElement = prevComponent._currentElement;
          var prevElement = prevWrappedElement.props;
          if (shouldUpdateReactComponent(prevElement, nextElement)) {
            var publicInst = prevComponent._renderedComponent.getPublicInstance();
            var updatedCallback = callback && function () {
              callback.call(publicInst);
            };
            ReactMount._updateRootComponent(prevComponent, nextWrappedElement, container, updatedCallback);
            return publicInst;
          } else {
            ReactMount.unmountComponentAtNode(container);
          }
        }
        var reactRootElement = getReactRootElementInContainer(container);
        var containerHasReactMarkup = reactRootElement && !!internalGetID(reactRootElement);
        var containerHasNonRootReactChild = hasNonRootReactChild(container);
        if ('production' !== 'production') {
          'production' !== 'production' ? warning(!containerHasNonRootReactChild, 'render(...): Replacing React-rendered children with a new root ' + 'component. If you intended to update the children of this node, ' + 'you should instead have the existing children update their state ' + 'and render the new components instead of calling ReactDOM.render.') : undefined;
          if (!containerHasReactMarkup || reactRootElement.nextSibling) {
            var rootElementSibling = reactRootElement;
            while (rootElementSibling) {
              if (internalGetID(rootElementSibling)) {
                'production' !== 'production' ? warning(false, 'render(): Target node has markup rendered by React, but there ' + 'are unrelated nodes as well. This is most commonly caused by ' + 'white-space inserted around server-rendered markup.') : undefined;
                break;
              }
              rootElementSibling = rootElementSibling.nextSibling;
            }
          }
        }
        var shouldReuseMarkup = containerHasReactMarkup && !prevComponent && !containerHasNonRootReactChild;
        var component = ReactMount._renderNewRootComponent(nextWrappedElement, container, shouldReuseMarkup, parentComponent != null ? parentComponent._reactInternalInstance._processChildContext(parentComponent._reactInternalInstance._context) : emptyObject)._renderedComponent.getPublicInstance();
        if (callback) {
          callback.call(component);
        }
        return component;
      },
      render: function (nextElement, container, callback) {
        return ReactMount._renderSubtreeIntoContainer(null, nextElement, container, callback);
      },
      registerContainer: function (container) {
        var reactRootID = getReactRootID(container);
        if (reactRootID) {
          reactRootID = ReactInstanceHandles.getReactRootIDFromNodeID(reactRootID);
        }
        if (!reactRootID) {
          reactRootID = ReactInstanceHandles.createReactRootID();
        }
        containersByReactRootID[reactRootID] = container;
        return reactRootID;
      },
      unmountComponentAtNode: function (container) {
        'production' !== 'production' ? warning(ReactCurrentOwner.current == null, 'unmountComponentAtNode(): Render methods should be a pure function ' + 'of props and state; triggering nested component updates from render ' + 'is not allowed. If necessary, trigger nested updates in ' + 'componentDidUpdate. Check the render method of %s.', ReactCurrentOwner.current && ReactCurrentOwner.current.getName() || 'ReactCompositeComponent') : undefined;
        !(container && (container.nodeType === ELEMENT_NODE_TYPE || container.nodeType === DOC_NODE_TYPE || container.nodeType === DOCUMENT_FRAGMENT_NODE_TYPE)) ? 'production' !== 'production' ? invariant(false, 'unmountComponentAtNode(...): Target container is not a DOM element.') : invariant(false) : undefined;
        var reactRootID = getReactRootID(container);
        var component = instancesByReactRootID[reactRootID];
        if (!component) {
          var containerHasNonRootReactChild = hasNonRootReactChild(container);
          var containerID = internalGetID(container);
          var isContainerReactRoot = containerID && containerID === ReactInstanceHandles.getReactRootIDFromNodeID(containerID);
          if ('production' !== 'production') {
            'production' !== 'production' ? warning(!containerHasNonRootReactChild, 'unmountComponentAtNode(): The node you\'re attempting to unmount ' + 'was rendered by React and is not a top-level container. %s', isContainerReactRoot ? 'You may have accidentally passed in a React root node instead ' + 'of its container.' : 'Instead, have the parent component update its state and ' + 'rerender in order to remove this component.') : undefined;
          }
          return false;
        }
        ReactUpdates.batchedUpdates(unmountComponentFromNode, component, container);
        delete instancesByReactRootID[reactRootID];
        delete containersByReactRootID[reactRootID];
        if ('production' !== 'production') {
          delete rootElementsByReactRootID[reactRootID];
        }
        return true;
      },
      findReactContainerForID: function (id) {
        var reactRootID = ReactInstanceHandles.getReactRootIDFromNodeID(id);
        var container = containersByReactRootID[reactRootID];
        if ('production' !== 'production') {
          var rootElement = rootElementsByReactRootID[reactRootID];
          if (rootElement && rootElement.parentNode !== container) {
            'production' !== 'production' ? warning(internalGetID(rootElement) === reactRootID, 'ReactMount: Root element ID differed from reactRootID.') : undefined;
            var containerChild = container.firstChild;
            if (containerChild && reactRootID === internalGetID(containerChild)) {
              rootElementsByReactRootID[reactRootID] = containerChild;
            } else {
              'production' !== 'production' ? warning(false, 'ReactMount: Root element has been removed from its original ' + 'container. New container: %s', rootElement.parentNode) : undefined;
            }
          }
        }
        return container;
      },
      findReactNodeByID: function (id) {
        var reactRoot = ReactMount.findReactContainerForID(id);
        return ReactMount.findComponentRoot(reactRoot, id);
      },
      getFirstReactDOM: function (node) {
        return findFirstReactDOMImpl(node);
      },
      findComponentRoot: function (ancestorNode, targetID) {
        var firstChildren = findComponentRootReusableArray;
        var childIndex = 0;
        var deepestAncestor = findDeepestCachedAncestor(targetID) || ancestorNode;
        if ('production' !== 'production') {
          'production' !== 'production' ? warning(deepestAncestor != null, 'React can\'t find the root component node for data-reactid value ' + '`%s`. If you\'re seeing this message, it probably means that ' + 'you\'ve loaded two copies of React on the page. At this time, only ' + 'a single copy of React can be loaded at a time.', targetID) : undefined;
        }
        firstChildren[0] = deepestAncestor.firstChild;
        firstChildren.length = 1;
        while (childIndex < firstChildren.length) {
          var child = firstChildren[childIndex++];
          var targetChild;
          while (child) {
            var childID = ReactMount.getID(child);
            if (childID) {
              if (targetID === childID) {
                targetChild = child;
              } else if (ReactInstanceHandles.isAncestorIDOf(childID, targetID)) {
                firstChildren.length = childIndex = 0;
                firstChildren.push(child.firstChild);
              }
            } else {
              firstChildren.push(child.firstChild);
            }
            child = child.nextSibling;
          }
          if (targetChild) {
            firstChildren.length = 0;
            return targetChild;
          }
        }
        firstChildren.length = 0;
        !false ? 'production' !== 'production' ? invariant(false, 'findComponentRoot(..., %s): Unable to find element. This probably ' + 'means the DOM was unexpectedly mutated (e.g., by the browser), ' + 'usually due to forgetting a <tbody> when using tables, nesting tags ' + 'like <form>, <p>, or <a>, or using non-SVG elements in an <svg> ' + 'parent. ' + 'Try inspecting the child nodes of the element with React ID `%s`.', targetID, ReactMount.getID(ancestorNode)) : invariant(false) : undefined;
      },
      _mountImageIntoNode: function (markup, container, shouldReuseMarkup, transaction) {
        !(container && (container.nodeType === ELEMENT_NODE_TYPE || container.nodeType === DOC_NODE_TYPE || container.nodeType === DOCUMENT_FRAGMENT_NODE_TYPE)) ? 'production' !== 'production' ? invariant(false, 'mountComponentIntoNode(...): Target container is not valid.') : invariant(false) : undefined;
        if (shouldReuseMarkup) {
          var rootElement = getReactRootElementInContainer(container);
          if (ReactMarkupChecksum.canReuseMarkup(markup, rootElement)) {
            return;
          } else {
            var checksum = rootElement.getAttribute(ReactMarkupChecksum.CHECKSUM_ATTR_NAME);
            rootElement.removeAttribute(ReactMarkupChecksum.CHECKSUM_ATTR_NAME);
            var rootMarkup = rootElement.outerHTML;
            rootElement.setAttribute(ReactMarkupChecksum.CHECKSUM_ATTR_NAME, checksum);
            var normalizedMarkup = markup;
            if ('production' !== 'production') {
              var normalizer;
              if (container.nodeType === ELEMENT_NODE_TYPE) {
                normalizer = document.createElement('div');
                normalizer.innerHTML = markup;
                normalizedMarkup = normalizer.innerHTML;
              } else {
                normalizer = document.createElement('iframe');
                document.body.appendChild(normalizer);
                normalizer.contentDocument.write(markup);
                normalizedMarkup = normalizer.contentDocument.documentElement.outerHTML;
                document.body.removeChild(normalizer);
              }
            }
            var diffIndex = firstDifferenceIndex(normalizedMarkup, rootMarkup);
            var difference = ' (client) ' + normalizedMarkup.substring(diffIndex - 20, diffIndex + 20) + '\n (server) ' + rootMarkup.substring(diffIndex - 20, diffIndex + 20);
            !(container.nodeType !== DOC_NODE_TYPE) ? 'production' !== 'production' ? invariant(false, 'You\'re trying to render a component to the document using ' + 'server rendering but the checksum was invalid. This usually ' + 'means you rendered a different component type or props on ' + 'the client from the one on the server, or your render() ' + 'methods are impure. React cannot handle this case due to ' + 'cross-browser quirks by rendering at the document root. You ' + 'should look for environment dependent code in your components ' + 'and ensure the props are the same client and server side:\n%s', difference) : invariant(false) : undefined;
            if ('production' !== 'production') {
              'production' !== 'production' ? warning(false, 'React attempted to reuse markup in a container but the ' + 'checksum was invalid. This generally means that you are ' + 'using server rendering and the markup generated on the ' + 'server was not what the client was expecting. React injected ' + 'new markup to compensate which works but you have lost many ' + 'of the benefits of server rendering. Instead, figure out ' + 'why the markup being generated is different on the client ' + 'or server:\n%s', difference) : undefined;
            }
          }
        }
        !(container.nodeType !== DOC_NODE_TYPE) ? 'production' !== 'production' ? invariant(false, 'You\'re trying to render a component to the document but ' + 'you didn\'t use server rendering. We can\'t do this ' + 'without using server rendering due to cross-browser quirks. ' + 'See ReactDOMServer.renderToString() for server rendering.') : invariant(false) : undefined;
        if (transaction.useCreateElement) {
          while (container.lastChild) {
            container.removeChild(container.lastChild);
          }
          container.appendChild(markup);
        } else {
          setInnerHTML(container, markup);
        }
      },
      ownerDocumentContextKey: ownerDocumentContextKey,
      getReactRootID: getReactRootID,
      getID: getID,
      setID: setID,
      getNode: getNode,
      getNodeFromInstance: getNodeFromInstance,
      isValid: isValid,
      purgeID: purgeID
    };
    ReactPerf.measureMethods(ReactMount, 'ReactMount', {
      _renderNewRootComponent: '_renderNewRootComponent',
      _mountImageIntoNode: '_mountImageIntoNode'
    });
    module.exports = ReactMount;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
});
System.registerDynamic('npm:fbjs@0.6.1/lib/ExecutionEnvironment.js', [], true, function ($__require, exports, module) {
  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule ExecutionEnvironment
   */

  'use strict';

  var global = this || self,
      GLOBAL = global;
  var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

  /**
   * Simple, lightweight module assisting with the detection and context of
   * Worker. Helps avoid circular dependencies and allows code to reason about
   * whether or not they are in a Worker, even if they never include the main
   * `ReactWorker` dependency.
   */
  var ExecutionEnvironment = {

    canUseDOM: canUseDOM,

    canUseWorkers: typeof Worker !== 'undefined',

    canUseEventListeners: canUseDOM && !!(window.addEventListener || window.attachEvent),

    canUseViewport: canUseDOM && !!window.screen,

    isInWorker: !canUseDOM // For now, this is true - might change in the future.

  };

  module.exports = ExecutionEnvironment;
});
System.registerDynamic('npm:fbjs@0.6.1/lib/performance.js', ['npm:fbjs@0.6.1/lib/ExecutionEnvironment.js'], true, function ($__require, exports, module) {
  /* */
  'use strict';

  var global = this || self,
      GLOBAL = global;
  var ExecutionEnvironment = $__require('npm:fbjs@0.6.1/lib/ExecutionEnvironment.js');
  var performance;
  if (ExecutionEnvironment.canUseDOM) {
    performance = window.performance || window.msPerformance || window.webkitPerformance;
  }
  module.exports = performance || {};
});
System.registerDynamic('npm:fbjs@0.6.1/lib/performanceNow.js', ['npm:fbjs@0.6.1/lib/performance.js'], true, function ($__require, exports, module) {
  /* */
  'use strict';

  var global = this || self,
      GLOBAL = global;
  var performance = $__require('npm:fbjs@0.6.1/lib/performance.js');
  var performanceNow;
  if (performance.now) {
    performanceNow = function () {
      return performance.now();
    };
  } else {
    performanceNow = function () {
      return Date.now();
    };
  }
  module.exports = performanceNow;
});
System.registerDynamic('npm:react@0.14.7/lib/ReactDefaultPerf.js', ['npm:react@0.14.7/lib/DOMProperty.js', 'npm:react@0.14.7/lib/ReactDefaultPerfAnalysis.js', 'npm:react@0.14.7/lib/ReactMount.js', 'npm:react@0.14.7/lib/ReactPerf.js', 'npm:fbjs@0.6.1/lib/performanceNow.js'], true, function ($__require, exports, module) {
  /* */
  'use strict';

  var global = this || self,
      GLOBAL = global;
  var DOMProperty = $__require('npm:react@0.14.7/lib/DOMProperty.js');
  var ReactDefaultPerfAnalysis = $__require('npm:react@0.14.7/lib/ReactDefaultPerfAnalysis.js');
  var ReactMount = $__require('npm:react@0.14.7/lib/ReactMount.js');
  var ReactPerf = $__require('npm:react@0.14.7/lib/ReactPerf.js');
  var performanceNow = $__require('npm:fbjs@0.6.1/lib/performanceNow.js');
  function roundFloat(val) {
    return Math.floor(val * 100) / 100;
  }
  function addValue(obj, key, val) {
    obj[key] = (obj[key] || 0) + val;
  }
  var ReactDefaultPerf = {
    _allMeasurements: [],
    _mountStack: [0],
    _injected: false,
    start: function () {
      if (!ReactDefaultPerf._injected) {
        ReactPerf.injection.injectMeasure(ReactDefaultPerf.measure);
      }
      ReactDefaultPerf._allMeasurements.length = 0;
      ReactPerf.enableMeasure = true;
    },
    stop: function () {
      ReactPerf.enableMeasure = false;
    },
    getLastMeasurements: function () {
      return ReactDefaultPerf._allMeasurements;
    },
    printExclusive: function (measurements) {
      measurements = measurements || ReactDefaultPerf._allMeasurements;
      var summary = ReactDefaultPerfAnalysis.getExclusiveSummary(measurements);
      console.table(summary.map(function (item) {
        return {
          'Component class name': item.componentName,
          'Total inclusive time (ms)': roundFloat(item.inclusive),
          'Exclusive mount time (ms)': roundFloat(item.exclusive),
          'Exclusive render time (ms)': roundFloat(item.render),
          'Mount time per instance (ms)': roundFloat(item.exclusive / item.count),
          'Render time per instance (ms)': roundFloat(item.render / item.count),
          'Instances': item.count
        };
      }));
    },
    printInclusive: function (measurements) {
      measurements = measurements || ReactDefaultPerf._allMeasurements;
      var summary = ReactDefaultPerfAnalysis.getInclusiveSummary(measurements);
      console.table(summary.map(function (item) {
        return {
          'Owner > component': item.componentName,
          'Inclusive time (ms)': roundFloat(item.time),
          'Instances': item.count
        };
      }));
      console.log('Total time:', ReactDefaultPerfAnalysis.getTotalTime(measurements).toFixed(2) + ' ms');
    },
    getMeasurementsSummaryMap: function (measurements) {
      var summary = ReactDefaultPerfAnalysis.getInclusiveSummary(measurements, true);
      return summary.map(function (item) {
        return {
          'Owner > component': item.componentName,
          'Wasted time (ms)': item.time,
          'Instances': item.count
        };
      });
    },
    printWasted: function (measurements) {
      measurements = measurements || ReactDefaultPerf._allMeasurements;
      console.table(ReactDefaultPerf.getMeasurementsSummaryMap(measurements));
      console.log('Total time:', ReactDefaultPerfAnalysis.getTotalTime(measurements).toFixed(2) + ' ms');
    },
    printDOM: function (measurements) {
      measurements = measurements || ReactDefaultPerf._allMeasurements;
      var summary = ReactDefaultPerfAnalysis.getDOMSummary(measurements);
      console.table(summary.map(function (item) {
        var result = {};
        result[DOMProperty.ID_ATTRIBUTE_NAME] = item.id;
        result.type = item.type;
        result.args = JSON.stringify(item.args);
        return result;
      }));
      console.log('Total time:', ReactDefaultPerfAnalysis.getTotalTime(measurements).toFixed(2) + ' ms');
    },
    _recordWrite: function (id, fnName, totalTime, args) {
      var writes = ReactDefaultPerf._allMeasurements[ReactDefaultPerf._allMeasurements.length - 1].writes;
      writes[id] = writes[id] || [];
      writes[id].push({
        type: fnName,
        time: totalTime,
        args: args
      });
    },
    measure: function (moduleName, fnName, func) {
      return function () {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        var totalTime;
        var rv;
        var start;
        if (fnName === '_renderNewRootComponent' || fnName === 'flushBatchedUpdates') {
          ReactDefaultPerf._allMeasurements.push({
            exclusive: {},
            inclusive: {},
            render: {},
            counts: {},
            writes: {},
            displayNames: {},
            totalTime: 0,
            created: {}
          });
          start = performanceNow();
          rv = func.apply(this, args);
          ReactDefaultPerf._allMeasurements[ReactDefaultPerf._allMeasurements.length - 1].totalTime = performanceNow() - start;
          return rv;
        } else if (fnName === '_mountImageIntoNode' || moduleName === 'ReactBrowserEventEmitter' || moduleName === 'ReactDOMIDOperations' || moduleName === 'CSSPropertyOperations' || moduleName === 'DOMChildrenOperations' || moduleName === 'DOMPropertyOperations') {
          start = performanceNow();
          rv = func.apply(this, args);
          totalTime = performanceNow() - start;
          if (fnName === '_mountImageIntoNode') {
            var mountID = ReactMount.getID(args[1]);
            ReactDefaultPerf._recordWrite(mountID, fnName, totalTime, args[0]);
          } else if (fnName === 'dangerouslyProcessChildrenUpdates') {
            args[0].forEach(function (update) {
              var writeArgs = {};
              if (update.fromIndex !== null) {
                writeArgs.fromIndex = update.fromIndex;
              }
              if (update.toIndex !== null) {
                writeArgs.toIndex = update.toIndex;
              }
              if (update.textContent !== null) {
                writeArgs.textContent = update.textContent;
              }
              if (update.markupIndex !== null) {
                writeArgs.markup = args[1][update.markupIndex];
              }
              ReactDefaultPerf._recordWrite(update.parentID, update.type, totalTime, writeArgs);
            });
          } else {
            var id = args[0];
            if (typeof id === 'object') {
              id = ReactMount.getID(args[0]);
            }
            ReactDefaultPerf._recordWrite(id, fnName, totalTime, Array.prototype.slice.call(args, 1));
          }
          return rv;
        } else if (moduleName === 'ReactCompositeComponent' && (fnName === 'mountComponent' || fnName === 'updateComponent' || fnName === '_renderValidatedComponent')) {
          if (this._currentElement.type === ReactMount.TopLevelWrapper) {
            return func.apply(this, args);
          }
          var rootNodeID = fnName === 'mountComponent' ? args[0] : this._rootNodeID;
          var isRender = fnName === '_renderValidatedComponent';
          var isMount = fnName === 'mountComponent';
          var mountStack = ReactDefaultPerf._mountStack;
          var entry = ReactDefaultPerf._allMeasurements[ReactDefaultPerf._allMeasurements.length - 1];
          if (isRender) {
            addValue(entry.counts, rootNodeID, 1);
          } else if (isMount) {
            entry.created[rootNodeID] = true;
            mountStack.push(0);
          }
          start = performanceNow();
          rv = func.apply(this, args);
          totalTime = performanceNow() - start;
          if (isRender) {
            addValue(entry.render, rootNodeID, totalTime);
          } else if (isMount) {
            var subMountTime = mountStack.pop();
            mountStack[mountStack.length - 1] += totalTime;
            addValue(entry.exclusive, rootNodeID, totalTime - subMountTime);
            addValue(entry.inclusive, rootNodeID, totalTime);
          } else {
            addValue(entry.inclusive, rootNodeID, totalTime);
          }
          entry.displayNames[rootNodeID] = {
            current: this.getName(),
            owner: this._currentElement._owner ? this._currentElement._owner.getName() : '<root>'
          };
          return rv;
        } else {
          return func.apply(this, args);
        }
      };
    }
  };
  module.exports = ReactDefaultPerf;
});
System.registerDynamic('npm:react@0.14.7/lib/ReactDefaultInjection.js', ['npm:react@0.14.7/lib/BeforeInputEventPlugin.js', 'npm:react@0.14.7/lib/ChangeEventPlugin.js', 'npm:react@0.14.7/lib/ClientReactRootIndex.js', 'npm:react@0.14.7/lib/DefaultEventPluginOrder.js', 'npm:react@0.14.7/lib/EnterLeaveEventPlugin.js', 'npm:fbjs@0.6.1/lib/ExecutionEnvironment.js', 'npm:react@0.14.7/lib/HTMLDOMPropertyConfig.js', 'npm:react@0.14.7/lib/ReactBrowserComponentMixin.js', 'npm:react@0.14.7/lib/ReactComponentBrowserEnvironment.js', 'npm:react@0.14.7/lib/ReactDefaultBatchingStrategy.js', 'npm:react@0.14.7/lib/ReactDOMComponent.js', 'npm:react@0.14.7/lib/ReactDOMTextComponent.js', 'npm:react@0.14.7/lib/ReactEventListener.js', 'npm:react@0.14.7/lib/ReactInjection.js', 'npm:react@0.14.7/lib/ReactInstanceHandles.js', 'npm:react@0.14.7/lib/ReactMount.js', 'npm:react@0.14.7/lib/ReactReconcileTransaction.js', 'npm:react@0.14.7/lib/SelectEventPlugin.js', 'npm:react@0.14.7/lib/ServerReactRootIndex.js', 'npm:react@0.14.7/lib/SimpleEventPlugin.js', 'npm:react@0.14.7/lib/SVGDOMPropertyConfig.js', 'npm:react@0.14.7/lib/ReactDefaultPerf.js', 'github:jspm/nodelibs-process@0.1.2.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  (function (process) {
    'use strict';

    var BeforeInputEventPlugin = $__require('npm:react@0.14.7/lib/BeforeInputEventPlugin.js');
    var ChangeEventPlugin = $__require('npm:react@0.14.7/lib/ChangeEventPlugin.js');
    var ClientReactRootIndex = $__require('npm:react@0.14.7/lib/ClientReactRootIndex.js');
    var DefaultEventPluginOrder = $__require('npm:react@0.14.7/lib/DefaultEventPluginOrder.js');
    var EnterLeaveEventPlugin = $__require('npm:react@0.14.7/lib/EnterLeaveEventPlugin.js');
    var ExecutionEnvironment = $__require('npm:fbjs@0.6.1/lib/ExecutionEnvironment.js');
    var HTMLDOMPropertyConfig = $__require('npm:react@0.14.7/lib/HTMLDOMPropertyConfig.js');
    var ReactBrowserComponentMixin = $__require('npm:react@0.14.7/lib/ReactBrowserComponentMixin.js');
    var ReactComponentBrowserEnvironment = $__require('npm:react@0.14.7/lib/ReactComponentBrowserEnvironment.js');
    var ReactDefaultBatchingStrategy = $__require('npm:react@0.14.7/lib/ReactDefaultBatchingStrategy.js');
    var ReactDOMComponent = $__require('npm:react@0.14.7/lib/ReactDOMComponent.js');
    var ReactDOMTextComponent = $__require('npm:react@0.14.7/lib/ReactDOMTextComponent.js');
    var ReactEventListener = $__require('npm:react@0.14.7/lib/ReactEventListener.js');
    var ReactInjection = $__require('npm:react@0.14.7/lib/ReactInjection.js');
    var ReactInstanceHandles = $__require('npm:react@0.14.7/lib/ReactInstanceHandles.js');
    var ReactMount = $__require('npm:react@0.14.7/lib/ReactMount.js');
    var ReactReconcileTransaction = $__require('npm:react@0.14.7/lib/ReactReconcileTransaction.js');
    var SelectEventPlugin = $__require('npm:react@0.14.7/lib/SelectEventPlugin.js');
    var ServerReactRootIndex = $__require('npm:react@0.14.7/lib/ServerReactRootIndex.js');
    var SimpleEventPlugin = $__require('npm:react@0.14.7/lib/SimpleEventPlugin.js');
    var SVGDOMPropertyConfig = $__require('npm:react@0.14.7/lib/SVGDOMPropertyConfig.js');
    var alreadyInjected = false;
    function inject() {
      if (alreadyInjected) {
        return;
      }
      alreadyInjected = true;
      ReactInjection.EventEmitter.injectReactEventListener(ReactEventListener);
      ReactInjection.EventPluginHub.injectEventPluginOrder(DefaultEventPluginOrder);
      ReactInjection.EventPluginHub.injectInstanceHandle(ReactInstanceHandles);
      ReactInjection.EventPluginHub.injectMount(ReactMount);
      ReactInjection.EventPluginHub.injectEventPluginsByName({
        SimpleEventPlugin: SimpleEventPlugin,
        EnterLeaveEventPlugin: EnterLeaveEventPlugin,
        ChangeEventPlugin: ChangeEventPlugin,
        SelectEventPlugin: SelectEventPlugin,
        BeforeInputEventPlugin: BeforeInputEventPlugin
      });
      ReactInjection.NativeComponent.injectGenericComponentClass(ReactDOMComponent);
      ReactInjection.NativeComponent.injectTextComponentClass(ReactDOMTextComponent);
      ReactInjection.Class.injectMixin(ReactBrowserComponentMixin);
      ReactInjection.DOMProperty.injectDOMPropertyConfig(HTMLDOMPropertyConfig);
      ReactInjection.DOMProperty.injectDOMPropertyConfig(SVGDOMPropertyConfig);
      ReactInjection.EmptyComponent.injectEmptyComponent('noscript');
      ReactInjection.Updates.injectReconcileTransaction(ReactReconcileTransaction);
      ReactInjection.Updates.injectBatchingStrategy(ReactDefaultBatchingStrategy);
      ReactInjection.RootIndex.injectCreateReactRootIndex(ExecutionEnvironment.canUseDOM ? ClientReactRootIndex.createReactRootIndex : ServerReactRootIndex.createReactRootIndex);
      ReactInjection.Component.injectEnvironment(ReactComponentBrowserEnvironment);
      if ('production' !== 'production') {
        var url = ExecutionEnvironment.canUseDOM && window.location.href || '';
        if (/[?&]react_perf\b/.test(url)) {
          var ReactDefaultPerf = $__require('npm:react@0.14.7/lib/ReactDefaultPerf.js');
          ReactDefaultPerf.start();
        }
      }
    }
    module.exports = { inject: inject };
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
});
System.registerDynamic('npm:react@0.14.7/lib/ReactDefaultBatchingStrategy.js', ['npm:react@0.14.7/lib/ReactUpdates.js', 'npm:react@0.14.7/lib/Transaction.js', 'npm:react@0.14.7/lib/Object.assign.js', 'npm:fbjs@0.6.1/lib/emptyFunction.js'], true, function ($__require, exports, module) {
  /* */
  'use strict';

  var global = this || self,
      GLOBAL = global;
  var ReactUpdates = $__require('npm:react@0.14.7/lib/ReactUpdates.js');
  var Transaction = $__require('npm:react@0.14.7/lib/Transaction.js');
  var assign = $__require('npm:react@0.14.7/lib/Object.assign.js');
  var emptyFunction = $__require('npm:fbjs@0.6.1/lib/emptyFunction.js');
  var RESET_BATCHED_UPDATES = {
    initialize: emptyFunction,
    close: function () {
      ReactDefaultBatchingStrategy.isBatchingUpdates = false;
    }
  };
  var FLUSH_BATCHED_UPDATES = {
    initialize: emptyFunction,
    close: ReactUpdates.flushBatchedUpdates.bind(ReactUpdates)
  };
  var TRANSACTION_WRAPPERS = [FLUSH_BATCHED_UPDATES, RESET_BATCHED_UPDATES];
  function ReactDefaultBatchingStrategyTransaction() {
    this.reinitializeTransaction();
  }
  assign(ReactDefaultBatchingStrategyTransaction.prototype, Transaction.Mixin, { getTransactionWrappers: function () {
      return TRANSACTION_WRAPPERS;
    } });
  var transaction = new ReactDefaultBatchingStrategyTransaction();
  var ReactDefaultBatchingStrategy = {
    isBatchingUpdates: false,
    batchedUpdates: function (callback, a, b, c, d, e) {
      var alreadyBatchingUpdates = ReactDefaultBatchingStrategy.isBatchingUpdates;
      ReactDefaultBatchingStrategy.isBatchingUpdates = true;
      if (alreadyBatchingUpdates) {
        callback(a, b, c, d, e);
      } else {
        transaction.perform(callback, null, a, b, c, d, e);
      }
    }
  };
  module.exports = ReactDefaultBatchingStrategy;
});
System.registerDynamic('npm:react@0.14.7/lib/adler32.js', [], true, function ($__require, exports, module) {
  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule adler32
   */

  'use strict';

  var global = this || self,
      GLOBAL = global;
  var MOD = 65521;

  // adler32 is not cryptographically strong, and is only used to sanity check that
  // markup generated on the server matches the markup generated on the client.
  // This implementation (a modified version of the SheetJS version) has been optimized
  // for our use case, at the expense of conforming to the adler32 specification
  // for non-ascii inputs.
  function adler32(data) {
    var a = 1;
    var b = 0;
    var i = 0;
    var l = data.length;
    var m = l & ~0x3;
    while (i < m) {
      for (; i < Math.min(i + 4096, m); i += 4) {
        b += (a += data.charCodeAt(i)) + (a += data.charCodeAt(i + 1)) + (a += data.charCodeAt(i + 2)) + (a += data.charCodeAt(i + 3));
      }
      a %= MOD;
      b %= MOD;
    }
    for (; i < l; i++) {
      b += a += data.charCodeAt(i);
    }
    a %= MOD;
    b %= MOD;
    return a | b << 16;
  }

  module.exports = adler32;
});
System.registerDynamic('npm:react@0.14.7/lib/ReactMarkupChecksum.js', ['npm:react@0.14.7/lib/adler32.js'], true, function ($__require, exports, module) {
  /* */
  'use strict';

  var global = this || self,
      GLOBAL = global;
  var adler32 = $__require('npm:react@0.14.7/lib/adler32.js');
  var TAG_END = /\/?>/;
  var ReactMarkupChecksum = {
    CHECKSUM_ATTR_NAME: 'data-react-checksum',
    addChecksumToMarkup: function (markup) {
      var checksum = adler32(markup);
      return markup.replace(TAG_END, ' ' + ReactMarkupChecksum.CHECKSUM_ATTR_NAME + '="' + checksum + '"$&');
    },
    canReuseMarkup: function (markup, element) {
      var existingChecksum = element.getAttribute(ReactMarkupChecksum.CHECKSUM_ATTR_NAME);
      existingChecksum = existingChecksum && parseInt(existingChecksum, 10);
      var markupChecksum = adler32(markup);
      return markupChecksum === existingChecksum;
    }
  };
  module.exports = ReactMarkupChecksum;
});
System.registerDynamic('npm:react@0.14.7/lib/ReactServerBatchingStrategy.js', [], true, function ($__require, exports, module) {
  /**
   * Copyright 2014-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule ReactServerBatchingStrategy
   * @typechecks
   */

  'use strict';

  var global = this || self,
      GLOBAL = global;
  var ReactServerBatchingStrategy = {
    isBatchingUpdates: false,
    batchedUpdates: function (callback) {
      // Don't do anything here. During the server rendering we don't want to
      // schedule any updates. We will simply ignore them.
    }
  };

  module.exports = ReactServerBatchingStrategy;
});
System.registerDynamic('npm:react@0.14.7/lib/ReactServerRenderingTransaction.js', ['npm:react@0.14.7/lib/PooledClass.js', 'npm:react@0.14.7/lib/CallbackQueue.js', 'npm:react@0.14.7/lib/Transaction.js', 'npm:react@0.14.7/lib/Object.assign.js', 'npm:fbjs@0.6.1/lib/emptyFunction.js'], true, function ($__require, exports, module) {
  /* */
  'use strict';

  var global = this || self,
      GLOBAL = global;
  var PooledClass = $__require('npm:react@0.14.7/lib/PooledClass.js');
  var CallbackQueue = $__require('npm:react@0.14.7/lib/CallbackQueue.js');
  var Transaction = $__require('npm:react@0.14.7/lib/Transaction.js');
  var assign = $__require('npm:react@0.14.7/lib/Object.assign.js');
  var emptyFunction = $__require('npm:fbjs@0.6.1/lib/emptyFunction.js');
  var ON_DOM_READY_QUEUEING = {
    initialize: function () {
      this.reactMountReady.reset();
    },
    close: emptyFunction
  };
  var TRANSACTION_WRAPPERS = [ON_DOM_READY_QUEUEING];
  function ReactServerRenderingTransaction(renderToStaticMarkup) {
    this.reinitializeTransaction();
    this.renderToStaticMarkup = renderToStaticMarkup;
    this.reactMountReady = CallbackQueue.getPooled(null);
    this.useCreateElement = false;
  }
  var Mixin = {
    getTransactionWrappers: function () {
      return TRANSACTION_WRAPPERS;
    },
    getReactMountReady: function () {
      return this.reactMountReady;
    },
    destructor: function () {
      CallbackQueue.release(this.reactMountReady);
      this.reactMountReady = null;
    }
  };
  assign(ReactServerRenderingTransaction.prototype, Transaction.Mixin, Mixin);
  PooledClass.addPoolingTo(ReactServerRenderingTransaction);
  module.exports = ReactServerRenderingTransaction;
});
System.registerDynamic('npm:react@0.14.7/lib/ReactComponentEnvironment.js', ['npm:fbjs@0.6.1/lib/invariant.js', 'github:jspm/nodelibs-process@0.1.2.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  (function (process) {
    'use strict';

    var invariant = $__require('npm:fbjs@0.6.1/lib/invariant.js');
    var injected = false;
    var ReactComponentEnvironment = {
      unmountIDFromEnvironment: null,
      replaceNodeWithMarkupByID: null,
      processChildrenUpdates: null,
      injection: { injectEnvironment: function (environment) {
          !!injected ? 'production' !== 'production' ? invariant(false, 'ReactCompositeComponent: injectEnvironment() can only be called once.') : invariant(false) : undefined;
          ReactComponentEnvironment.unmountIDFromEnvironment = environment.unmountIDFromEnvironment;
          ReactComponentEnvironment.replaceNodeWithMarkupByID = environment.replaceNodeWithMarkupByID;
          ReactComponentEnvironment.processChildrenUpdates = environment.processChildrenUpdates;
          injected = true;
        } }
    };
    module.exports = ReactComponentEnvironment;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
});
System.registerDynamic('npm:react@0.14.7/lib/ReactInstanceMap.js', [], true, function ($__require, exports, module) {
  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule ReactInstanceMap
   */

  'use strict';

  /**
   * `ReactInstanceMap` maintains a mapping from a public facing stateful
   * instance (key) and the internal representation (value). This allows public
   * methods to accept the user facing instance as an argument and map them back
   * to internal methods.
   */

  // TODO: Replace this with ES6: var ReactInstanceMap = new Map();

  var global = this || self,
      GLOBAL = global;
  var ReactInstanceMap = {

    /**
     * This API should be called `delete` but we'd have to make sure to always
     * transform these to strings for IE support. When this transform is fully
     * supported we can rename it.
     */
    remove: function (key) {
      key._reactInternalInstance = undefined;
    },

    get: function (key) {
      return key._reactInternalInstance;
    },

    has: function (key) {
      return key._reactInternalInstance !== undefined;
    },

    set: function (key, value) {
      key._reactInternalInstance = value;
    }

  };

  module.exports = ReactInstanceMap;
});
System.registerDynamic('npm:react@0.14.7/lib/CallbackQueue.js', ['npm:react@0.14.7/lib/PooledClass.js', 'npm:react@0.14.7/lib/Object.assign.js', 'npm:fbjs@0.6.1/lib/invariant.js', 'github:jspm/nodelibs-process@0.1.2.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  (function (process) {
    'use strict';

    var PooledClass = $__require('npm:react@0.14.7/lib/PooledClass.js');
    var assign = $__require('npm:react@0.14.7/lib/Object.assign.js');
    var invariant = $__require('npm:fbjs@0.6.1/lib/invariant.js');
    function CallbackQueue() {
      this._callbacks = null;
      this._contexts = null;
    }
    assign(CallbackQueue.prototype, {
      enqueue: function (callback, context) {
        this._callbacks = this._callbacks || [];
        this._contexts = this._contexts || [];
        this._callbacks.push(callback);
        this._contexts.push(context);
      },
      notifyAll: function () {
        var callbacks = this._callbacks;
        var contexts = this._contexts;
        if (callbacks) {
          !(callbacks.length === contexts.length) ? 'production' !== 'production' ? invariant(false, 'Mismatched list of contexts in callback queue') : invariant(false) : undefined;
          this._callbacks = null;
          this._contexts = null;
          for (var i = 0; i < callbacks.length; i++) {
            callbacks[i].call(contexts[i]);
          }
          callbacks.length = 0;
          contexts.length = 0;
        }
      },
      reset: function () {
        this._callbacks = null;
        this._contexts = null;
      },
      destructor: function () {
        this.reset();
      }
    });
    PooledClass.addPoolingTo(CallbackQueue);
    module.exports = CallbackQueue;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
});
System.registerDynamic('npm:react@0.14.7/lib/ReactPerf.js', ['github:jspm/nodelibs-process@0.1.2.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  (function (process) {
    'use strict';

    var ReactPerf = {
      enableMeasure: false,
      storedMeasure: _noMeasure,
      measureMethods: function (object, objectName, methodNames) {
        if ('production' !== 'production') {
          for (var key in methodNames) {
            if (!methodNames.hasOwnProperty(key)) {
              continue;
            }
            object[key] = ReactPerf.measure(objectName, methodNames[key], object[key]);
          }
        }
      },
      measure: function (objName, fnName, func) {
        if ('production' !== 'production') {
          var measuredFunc = null;
          var wrapper = function () {
            if (ReactPerf.enableMeasure) {
              if (!measuredFunc) {
                measuredFunc = ReactPerf.storedMeasure(objName, fnName, func);
              }
              return measuredFunc.apply(this, arguments);
            }
            return func.apply(this, arguments);
          };
          wrapper.displayName = objName + '_' + fnName;
          return wrapper;
        }
        return func;
      },
      injection: { injectMeasure: function (measure) {
          ReactPerf.storedMeasure = measure;
        } }
    };
    function _noMeasure(objName, fnName, func) {
      return func;
    }
    module.exports = ReactPerf;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
});
System.registerDynamic('npm:react@0.14.7/lib/Transaction.js', ['npm:fbjs@0.6.1/lib/invariant.js', 'github:jspm/nodelibs-process@0.1.2.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  (function (process) {
    'use strict';

    var invariant = $__require('npm:fbjs@0.6.1/lib/invariant.js');
    var Mixin = {
      reinitializeTransaction: function () {
        this.transactionWrappers = this.getTransactionWrappers();
        if (this.wrapperInitData) {
          this.wrapperInitData.length = 0;
        } else {
          this.wrapperInitData = [];
        }
        this._isInTransaction = false;
      },
      _isInTransaction: false,
      getTransactionWrappers: null,
      isInTransaction: function () {
        return !!this._isInTransaction;
      },
      perform: function (method, scope, a, b, c, d, e, f) {
        !!this.isInTransaction() ? 'production' !== 'production' ? invariant(false, 'Transaction.perform(...): Cannot initialize a transaction when there ' + 'is already an outstanding transaction.') : invariant(false) : undefined;
        var errorThrown;
        var ret;
        try {
          this._isInTransaction = true;
          errorThrown = true;
          this.initializeAll(0);
          ret = method.call(scope, a, b, c, d, e, f);
          errorThrown = false;
        } finally {
          try {
            if (errorThrown) {
              try {
                this.closeAll(0);
              } catch (err) {}
            } else {
              this.closeAll(0);
            }
          } finally {
            this._isInTransaction = false;
          }
        }
        return ret;
      },
      initializeAll: function (startIndex) {
        var transactionWrappers = this.transactionWrappers;
        for (var i = startIndex; i < transactionWrappers.length; i++) {
          var wrapper = transactionWrappers[i];
          try {
            this.wrapperInitData[i] = Transaction.OBSERVED_ERROR;
            this.wrapperInitData[i] = wrapper.initialize ? wrapper.initialize.call(this) : null;
          } finally {
            if (this.wrapperInitData[i] === Transaction.OBSERVED_ERROR) {
              try {
                this.initializeAll(i + 1);
              } catch (err) {}
            }
          }
        }
      },
      closeAll: function (startIndex) {
        !this.isInTransaction() ? 'production' !== 'production' ? invariant(false, 'Transaction.closeAll(): Cannot close transaction when none are open.') : invariant(false) : undefined;
        var transactionWrappers = this.transactionWrappers;
        for (var i = startIndex; i < transactionWrappers.length; i++) {
          var wrapper = transactionWrappers[i];
          var initData = this.wrapperInitData[i];
          var errorThrown;
          try {
            errorThrown = true;
            if (initData !== Transaction.OBSERVED_ERROR && wrapper.close) {
              wrapper.close.call(this, initData);
            }
            errorThrown = false;
          } finally {
            if (errorThrown) {
              try {
                this.closeAll(i + 1);
              } catch (e) {}
            }
          }
        }
        this.wrapperInitData.length = 0;
      }
    };
    var Transaction = {
      Mixin: Mixin,
      OBSERVED_ERROR: {}
    };
    module.exports = Transaction;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
});
System.registerDynamic('npm:react@0.14.7/lib/ReactUpdates.js', ['npm:react@0.14.7/lib/CallbackQueue.js', 'npm:react@0.14.7/lib/PooledClass.js', 'npm:react@0.14.7/lib/ReactPerf.js', 'npm:react@0.14.7/lib/ReactReconciler.js', 'npm:react@0.14.7/lib/Transaction.js', 'npm:react@0.14.7/lib/Object.assign.js', 'npm:fbjs@0.6.1/lib/invariant.js', 'github:jspm/nodelibs-process@0.1.2.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  (function (process) {
    'use strict';

    var CallbackQueue = $__require('npm:react@0.14.7/lib/CallbackQueue.js');
    var PooledClass = $__require('npm:react@0.14.7/lib/PooledClass.js');
    var ReactPerf = $__require('npm:react@0.14.7/lib/ReactPerf.js');
    var ReactReconciler = $__require('npm:react@0.14.7/lib/ReactReconciler.js');
    var Transaction = $__require('npm:react@0.14.7/lib/Transaction.js');
    var assign = $__require('npm:react@0.14.7/lib/Object.assign.js');
    var invariant = $__require('npm:fbjs@0.6.1/lib/invariant.js');
    var dirtyComponents = [];
    var asapCallbackQueue = CallbackQueue.getPooled();
    var asapEnqueued = false;
    var batchingStrategy = null;
    function ensureInjected() {
      !(ReactUpdates.ReactReconcileTransaction && batchingStrategy) ? 'production' !== 'production' ? invariant(false, 'ReactUpdates: must inject a reconcile transaction class and batching ' + 'strategy') : invariant(false) : undefined;
    }
    var NESTED_UPDATES = {
      initialize: function () {
        this.dirtyComponentsLength = dirtyComponents.length;
      },
      close: function () {
        if (this.dirtyComponentsLength !== dirtyComponents.length) {
          dirtyComponents.splice(0, this.dirtyComponentsLength);
          flushBatchedUpdates();
        } else {
          dirtyComponents.length = 0;
        }
      }
    };
    var UPDATE_QUEUEING = {
      initialize: function () {
        this.callbackQueue.reset();
      },
      close: function () {
        this.callbackQueue.notifyAll();
      }
    };
    var TRANSACTION_WRAPPERS = [NESTED_UPDATES, UPDATE_QUEUEING];
    function ReactUpdatesFlushTransaction() {
      this.reinitializeTransaction();
      this.dirtyComponentsLength = null;
      this.callbackQueue = CallbackQueue.getPooled();
      this.reconcileTransaction = ReactUpdates.ReactReconcileTransaction.getPooled(false);
    }
    assign(ReactUpdatesFlushTransaction.prototype, Transaction.Mixin, {
      getTransactionWrappers: function () {
        return TRANSACTION_WRAPPERS;
      },
      destructor: function () {
        this.dirtyComponentsLength = null;
        CallbackQueue.release(this.callbackQueue);
        this.callbackQueue = null;
        ReactUpdates.ReactReconcileTransaction.release(this.reconcileTransaction);
        this.reconcileTransaction = null;
      },
      perform: function (method, scope, a) {
        return Transaction.Mixin.perform.call(this, this.reconcileTransaction.perform, this.reconcileTransaction, method, scope, a);
      }
    });
    PooledClass.addPoolingTo(ReactUpdatesFlushTransaction);
    function batchedUpdates(callback, a, b, c, d, e) {
      ensureInjected();
      batchingStrategy.batchedUpdates(callback, a, b, c, d, e);
    }
    function mountOrderComparator(c1, c2) {
      return c1._mountOrder - c2._mountOrder;
    }
    function runBatchedUpdates(transaction) {
      var len = transaction.dirtyComponentsLength;
      !(len === dirtyComponents.length) ? 'production' !== 'production' ? invariant(false, 'Expected flush transaction\'s stored dirty-components length (%s) to ' + 'match dirty-components array length (%s).', len, dirtyComponents.length) : invariant(false) : undefined;
      dirtyComponents.sort(mountOrderComparator);
      for (var i = 0; i < len; i++) {
        var component = dirtyComponents[i];
        var callbacks = component._pendingCallbacks;
        component._pendingCallbacks = null;
        ReactReconciler.performUpdateIfNecessary(component, transaction.reconcileTransaction);
        if (callbacks) {
          for (var j = 0; j < callbacks.length; j++) {
            transaction.callbackQueue.enqueue(callbacks[j], component.getPublicInstance());
          }
        }
      }
    }
    var flushBatchedUpdates = function () {
      while (dirtyComponents.length || asapEnqueued) {
        if (dirtyComponents.length) {
          var transaction = ReactUpdatesFlushTransaction.getPooled();
          transaction.perform(runBatchedUpdates, null, transaction);
          ReactUpdatesFlushTransaction.release(transaction);
        }
        if (asapEnqueued) {
          asapEnqueued = false;
          var queue = asapCallbackQueue;
          asapCallbackQueue = CallbackQueue.getPooled();
          queue.notifyAll();
          CallbackQueue.release(queue);
        }
      }
    };
    flushBatchedUpdates = ReactPerf.measure('ReactUpdates', 'flushBatchedUpdates', flushBatchedUpdates);
    function enqueueUpdate(component) {
      ensureInjected();
      if (!batchingStrategy.isBatchingUpdates) {
        batchingStrategy.batchedUpdates(enqueueUpdate, component);
        return;
      }
      dirtyComponents.push(component);
    }
    function asap(callback, context) {
      !batchingStrategy.isBatchingUpdates ? 'production' !== 'production' ? invariant(false, 'ReactUpdates.asap: Can\'t enqueue an asap callback in a context where' + 'updates are not being batched.') : invariant(false) : undefined;
      asapCallbackQueue.enqueue(callback, context);
      asapEnqueued = true;
    }
    var ReactUpdatesInjection = {
      injectReconcileTransaction: function (ReconcileTransaction) {
        !ReconcileTransaction ? 'production' !== 'production' ? invariant(false, 'ReactUpdates: must provide a reconcile transaction class') : invariant(false) : undefined;
        ReactUpdates.ReactReconcileTransaction = ReconcileTransaction;
      },
      injectBatchingStrategy: function (_batchingStrategy) {
        !_batchingStrategy ? 'production' !== 'production' ? invariant(false, 'ReactUpdates: must provide a batching strategy') : invariant(false) : undefined;
        !(typeof _batchingStrategy.batchedUpdates === 'function') ? 'production' !== 'production' ? invariant(false, 'ReactUpdates: must provide a batchedUpdates() function') : invariant(false) : undefined;
        !(typeof _batchingStrategy.isBatchingUpdates === 'boolean') ? 'production' !== 'production' ? invariant(false, 'ReactUpdates: must provide an isBatchingUpdates boolean attribute') : invariant(false) : undefined;
        batchingStrategy = _batchingStrategy;
      }
    };
    var ReactUpdates = {
      ReactReconcileTransaction: null,
      batchedUpdates: batchedUpdates,
      enqueueUpdate: enqueueUpdate,
      flushBatchedUpdates: flushBatchedUpdates,
      injection: ReactUpdatesInjection,
      asap: asap
    };
    module.exports = ReactUpdates;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
});
System.registerDynamic('npm:react@0.14.7/lib/ReactUpdateQueue.js', ['npm:react@0.14.7/lib/ReactCurrentOwner.js', 'npm:react@0.14.7/lib/ReactElement.js', 'npm:react@0.14.7/lib/ReactInstanceMap.js', 'npm:react@0.14.7/lib/ReactUpdates.js', 'npm:react@0.14.7/lib/Object.assign.js', 'npm:fbjs@0.6.1/lib/invariant.js', 'npm:fbjs@0.6.1/lib/warning.js', 'github:jspm/nodelibs-process@0.1.2.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  (function (process) {
    'use strict';

    var ReactCurrentOwner = $__require('npm:react@0.14.7/lib/ReactCurrentOwner.js');
    var ReactElement = $__require('npm:react@0.14.7/lib/ReactElement.js');
    var ReactInstanceMap = $__require('npm:react@0.14.7/lib/ReactInstanceMap.js');
    var ReactUpdates = $__require('npm:react@0.14.7/lib/ReactUpdates.js');
    var assign = $__require('npm:react@0.14.7/lib/Object.assign.js');
    var invariant = $__require('npm:fbjs@0.6.1/lib/invariant.js');
    var warning = $__require('npm:fbjs@0.6.1/lib/warning.js');
    function enqueueUpdate(internalInstance) {
      ReactUpdates.enqueueUpdate(internalInstance);
    }
    function getInternalInstanceReadyForUpdate(publicInstance, callerName) {
      var internalInstance = ReactInstanceMap.get(publicInstance);
      if (!internalInstance) {
        if ('production' !== 'production') {
          'production' !== 'production' ? warning(!callerName, '%s(...): Can only update a mounted or mounting component. ' + 'This usually means you called %s() on an unmounted component. ' + 'This is a no-op. Please check the code for the %s component.', callerName, callerName, publicInstance.constructor.displayName) : undefined;
        }
        return null;
      }
      if ('production' !== 'production') {
        'production' !== 'production' ? warning(ReactCurrentOwner.current == null, '%s(...): Cannot update during an existing state transition ' + '(such as within `render`). Render methods should be a pure function ' + 'of props and state.', callerName) : undefined;
      }
      return internalInstance;
    }
    var ReactUpdateQueue = {
      isMounted: function (publicInstance) {
        if ('production' !== 'production') {
          var owner = ReactCurrentOwner.current;
          if (owner !== null) {
            'production' !== 'production' ? warning(owner._warnedAboutRefsInRender, '%s is accessing isMounted inside its render() function. ' + 'render() should be a pure function of props and state. It should ' + 'never access something that requires stale data from the previous ' + 'render, such as refs. Move this logic to componentDidMount and ' + 'componentDidUpdate instead.', owner.getName() || 'A component') : undefined;
            owner._warnedAboutRefsInRender = true;
          }
        }
        var internalInstance = ReactInstanceMap.get(publicInstance);
        if (internalInstance) {
          return !!internalInstance._renderedComponent;
        } else {
          return false;
        }
      },
      enqueueCallback: function (publicInstance, callback) {
        !(typeof callback === 'function') ? 'production' !== 'production' ? invariant(false, 'enqueueCallback(...): You called `setProps`, `replaceProps`, ' + '`setState`, `replaceState`, or `forceUpdate` with a callback that ' + 'isn\'t callable.') : invariant(false) : undefined;
        var internalInstance = getInternalInstanceReadyForUpdate(publicInstance);
        if (!internalInstance) {
          return null;
        }
        if (internalInstance._pendingCallbacks) {
          internalInstance._pendingCallbacks.push(callback);
        } else {
          internalInstance._pendingCallbacks = [callback];
        }
        enqueueUpdate(internalInstance);
      },
      enqueueCallbackInternal: function (internalInstance, callback) {
        !(typeof callback === 'function') ? 'production' !== 'production' ? invariant(false, 'enqueueCallback(...): You called `setProps`, `replaceProps`, ' + '`setState`, `replaceState`, or `forceUpdate` with a callback that ' + 'isn\'t callable.') : invariant(false) : undefined;
        if (internalInstance._pendingCallbacks) {
          internalInstance._pendingCallbacks.push(callback);
        } else {
          internalInstance._pendingCallbacks = [callback];
        }
        enqueueUpdate(internalInstance);
      },
      enqueueForceUpdate: function (publicInstance) {
        var internalInstance = getInternalInstanceReadyForUpdate(publicInstance, 'forceUpdate');
        if (!internalInstance) {
          return;
        }
        internalInstance._pendingForceUpdate = true;
        enqueueUpdate(internalInstance);
      },
      enqueueReplaceState: function (publicInstance, completeState) {
        var internalInstance = getInternalInstanceReadyForUpdate(publicInstance, 'replaceState');
        if (!internalInstance) {
          return;
        }
        internalInstance._pendingStateQueue = [completeState];
        internalInstance._pendingReplaceState = true;
        enqueueUpdate(internalInstance);
      },
      enqueueSetState: function (publicInstance, partialState) {
        var internalInstance = getInternalInstanceReadyForUpdate(publicInstance, 'setState');
        if (!internalInstance) {
          return;
        }
        var queue = internalInstance._pendingStateQueue || (internalInstance._pendingStateQueue = []);
        queue.push(partialState);
        enqueueUpdate(internalInstance);
      },
      enqueueSetProps: function (publicInstance, partialProps) {
        var internalInstance = getInternalInstanceReadyForUpdate(publicInstance, 'setProps');
        if (!internalInstance) {
          return;
        }
        ReactUpdateQueue.enqueueSetPropsInternal(internalInstance, partialProps);
      },
      enqueueSetPropsInternal: function (internalInstance, partialProps) {
        var topLevelWrapper = internalInstance._topLevelWrapper;
        !topLevelWrapper ? 'production' !== 'production' ? invariant(false, 'setProps(...): You called `setProps` on a ' + 'component with a parent. This is an anti-pattern since props will ' + 'get reactively updated when rendered. Instead, change the owner\'s ' + '`render` method to pass the correct value as props to the component ' + 'where it is created.') : invariant(false) : undefined;
        var wrapElement = topLevelWrapper._pendingElement || topLevelWrapper._currentElement;
        var element = wrapElement.props;
        var props = assign({}, element.props, partialProps);
        topLevelWrapper._pendingElement = ReactElement.cloneAndReplaceProps(wrapElement, ReactElement.cloneAndReplaceProps(element, props));
        enqueueUpdate(topLevelWrapper);
      },
      enqueueReplaceProps: function (publicInstance, props) {
        var internalInstance = getInternalInstanceReadyForUpdate(publicInstance, 'replaceProps');
        if (!internalInstance) {
          return;
        }
        ReactUpdateQueue.enqueueReplacePropsInternal(internalInstance, props);
      },
      enqueueReplacePropsInternal: function (internalInstance, props) {
        var topLevelWrapper = internalInstance._topLevelWrapper;
        !topLevelWrapper ? 'production' !== 'production' ? invariant(false, 'replaceProps(...): You called `replaceProps` on a ' + 'component with a parent. This is an anti-pattern since props will ' + 'get reactively updated when rendered. Instead, change the owner\'s ' + '`render` method to pass the correct value as props to the component ' + 'where it is created.') : invariant(false) : undefined;
        var wrapElement = topLevelWrapper._pendingElement || topLevelWrapper._currentElement;
        var element = wrapElement.props;
        topLevelWrapper._pendingElement = ReactElement.cloneAndReplaceProps(wrapElement, ReactElement.cloneAndReplaceProps(element, props));
        enqueueUpdate(topLevelWrapper);
      },
      enqueueElementInternal: function (internalInstance, newElement) {
        internalInstance._pendingElement = newElement;
        enqueueUpdate(internalInstance);
      }
    };
    module.exports = ReactUpdateQueue;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
});
System.registerDynamic('npm:react@0.14.7/lib/shouldUpdateReactComponent.js', [], true, function ($__require, exports, module) {
  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule shouldUpdateReactComponent
   * @typechecks static-only
   */

  'use strict';

  /**
   * Given a `prevElement` and `nextElement`, determines if the existing
   * instance should be updated as opposed to being destroyed or replaced by a new
   * instance. Both arguments are elements. This ensures that this logic can
   * operate on stateless trees without any backing instance.
   *
   * @param {?object} prevElement
   * @param {?object} nextElement
   * @return {boolean} True if the existing instance should be updated.
   * @protected
   */

  var global = this || self,
      GLOBAL = global;
  function shouldUpdateReactComponent(prevElement, nextElement) {
    var prevEmpty = prevElement === null || prevElement === false;
    var nextEmpty = nextElement === null || nextElement === false;
    if (prevEmpty || nextEmpty) {
      return prevEmpty === nextEmpty;
    }

    var prevType = typeof prevElement;
    var nextType = typeof nextElement;
    if (prevType === 'string' || prevType === 'number') {
      return nextType === 'string' || nextType === 'number';
    } else {
      return nextType === 'object' && prevElement.type === nextElement.type && prevElement.key === nextElement.key;
    }
    return false;
  }

  module.exports = shouldUpdateReactComponent;
});
System.registerDynamic('npm:react@0.14.7/lib/ReactCompositeComponent.js', ['npm:react@0.14.7/lib/ReactComponentEnvironment.js', 'npm:react@0.14.7/lib/ReactCurrentOwner.js', 'npm:react@0.14.7/lib/ReactElement.js', 'npm:react@0.14.7/lib/ReactInstanceMap.js', 'npm:react@0.14.7/lib/ReactPerf.js', 'npm:react@0.14.7/lib/ReactPropTypeLocations.js', 'npm:react@0.14.7/lib/ReactPropTypeLocationNames.js', 'npm:react@0.14.7/lib/ReactReconciler.js', 'npm:react@0.14.7/lib/ReactUpdateQueue.js', 'npm:react@0.14.7/lib/Object.assign.js', 'npm:fbjs@0.6.1/lib/emptyObject.js', 'npm:fbjs@0.6.1/lib/invariant.js', 'npm:react@0.14.7/lib/shouldUpdateReactComponent.js', 'npm:fbjs@0.6.1/lib/warning.js', 'github:jspm/nodelibs-process@0.1.2.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  (function (process) {
    'use strict';

    var ReactComponentEnvironment = $__require('npm:react@0.14.7/lib/ReactComponentEnvironment.js');
    var ReactCurrentOwner = $__require('npm:react@0.14.7/lib/ReactCurrentOwner.js');
    var ReactElement = $__require('npm:react@0.14.7/lib/ReactElement.js');
    var ReactInstanceMap = $__require('npm:react@0.14.7/lib/ReactInstanceMap.js');
    var ReactPerf = $__require('npm:react@0.14.7/lib/ReactPerf.js');
    var ReactPropTypeLocations = $__require('npm:react@0.14.7/lib/ReactPropTypeLocations.js');
    var ReactPropTypeLocationNames = $__require('npm:react@0.14.7/lib/ReactPropTypeLocationNames.js');
    var ReactReconciler = $__require('npm:react@0.14.7/lib/ReactReconciler.js');
    var ReactUpdateQueue = $__require('npm:react@0.14.7/lib/ReactUpdateQueue.js');
    var assign = $__require('npm:react@0.14.7/lib/Object.assign.js');
    var emptyObject = $__require('npm:fbjs@0.6.1/lib/emptyObject.js');
    var invariant = $__require('npm:fbjs@0.6.1/lib/invariant.js');
    var shouldUpdateReactComponent = $__require('npm:react@0.14.7/lib/shouldUpdateReactComponent.js');
    var warning = $__require('npm:fbjs@0.6.1/lib/warning.js');
    function getDeclarationErrorAddendum(component) {
      var owner = component._currentElement._owner || null;
      if (owner) {
        var name = owner.getName();
        if (name) {
          return ' Check the render method of `' + name + '`.';
        }
      }
      return '';
    }
    function StatelessComponent(Component) {}
    StatelessComponent.prototype.render = function () {
      var Component = ReactInstanceMap.get(this)._currentElement.type;
      return Component(this.props, this.context, this.updater);
    };
    var nextMountID = 1;
    var ReactCompositeComponentMixin = {
      construct: function (element) {
        this._currentElement = element;
        this._rootNodeID = null;
        this._instance = null;
        this._pendingElement = null;
        this._pendingStateQueue = null;
        this._pendingReplaceState = false;
        this._pendingForceUpdate = false;
        this._renderedComponent = null;
        this._context = null;
        this._mountOrder = 0;
        this._topLevelWrapper = null;
        this._pendingCallbacks = null;
      },
      mountComponent: function (rootID, transaction, context) {
        this._context = context;
        this._mountOrder = nextMountID++;
        this._rootNodeID = rootID;
        var publicProps = this._processProps(this._currentElement.props);
        var publicContext = this._processContext(context);
        var Component = this._currentElement.type;
        var inst;
        var renderedElement;
        var canInstantiate = 'prototype' in Component;
        if (canInstantiate) {
          if ('production' !== 'production') {
            ReactCurrentOwner.current = this;
            try {
              inst = new Component(publicProps, publicContext, ReactUpdateQueue);
            } finally {
              ReactCurrentOwner.current = null;
            }
          } else {
            inst = new Component(publicProps, publicContext, ReactUpdateQueue);
          }
        }
        if (!canInstantiate || inst === null || inst === false || ReactElement.isValidElement(inst)) {
          renderedElement = inst;
          inst = new StatelessComponent(Component);
        }
        if ('production' !== 'production') {
          if (inst.render == null) {
            'production' !== 'production' ? warning(false, '%s(...): No `render` method found on the returned component ' + 'instance: you may have forgotten to define `render`, returned ' + 'null/false from a stateless component, or tried to render an ' + 'element whose type is a function that isn\'t a React component.', Component.displayName || Component.name || 'Component') : undefined;
          } else {
            'production' !== 'production' ? warning(Component.prototype && Component.prototype.isReactComponent || !canInstantiate || !(inst instanceof Component), '%s(...): React component classes must extend React.Component.', Component.displayName || Component.name || 'Component') : undefined;
          }
        }
        inst.props = publicProps;
        inst.context = publicContext;
        inst.refs = emptyObject;
        inst.updater = ReactUpdateQueue;
        this._instance = inst;
        ReactInstanceMap.set(inst, this);
        if ('production' !== 'production') {
          'production' !== 'production' ? warning(!inst.getInitialState || inst.getInitialState.isReactClassApproved, 'getInitialState was defined on %s, a plain JavaScript class. ' + 'This is only supported for classes created using React.createClass. ' + 'Did you mean to define a state property instead?', this.getName() || 'a component') : undefined;
          'production' !== 'production' ? warning(!inst.getDefaultProps || inst.getDefaultProps.isReactClassApproved, 'getDefaultProps was defined on %s, a plain JavaScript class. ' + 'This is only supported for classes created using React.createClass. ' + 'Use a static property to define defaultProps instead.', this.getName() || 'a component') : undefined;
          'production' !== 'production' ? warning(!inst.propTypes, 'propTypes was defined as an instance property on %s. Use a static ' + 'property to define propTypes instead.', this.getName() || 'a component') : undefined;
          'production' !== 'production' ? warning(!inst.contextTypes, 'contextTypes was defined as an instance property on %s. Use a ' + 'static property to define contextTypes instead.', this.getName() || 'a component') : undefined;
          'production' !== 'production' ? warning(typeof inst.componentShouldUpdate !== 'function', '%s has a method called ' + 'componentShouldUpdate(). Did you mean shouldComponentUpdate()? ' + 'The name is phrased as a question because the function is ' + 'expected to return a value.', this.getName() || 'A component') : undefined;
          'production' !== 'production' ? warning(typeof inst.componentDidUnmount !== 'function', '%s has a method called ' + 'componentDidUnmount(). But there is no such lifecycle method. ' + 'Did you mean componentWillUnmount()?', this.getName() || 'A component') : undefined;
          'production' !== 'production' ? warning(typeof inst.componentWillRecieveProps !== 'function', '%s has a method called ' + 'componentWillRecieveProps(). Did you mean componentWillReceiveProps()?', this.getName() || 'A component') : undefined;
        }
        var initialState = inst.state;
        if (initialState === undefined) {
          inst.state = initialState = null;
        }
        !(typeof initialState === 'object' && !Array.isArray(initialState)) ? 'production' !== 'production' ? invariant(false, '%s.state: must be set to an object or null', this.getName() || 'ReactCompositeComponent') : invariant(false) : undefined;
        this._pendingStateQueue = null;
        this._pendingReplaceState = false;
        this._pendingForceUpdate = false;
        if (inst.componentWillMount) {
          inst.componentWillMount();
          if (this._pendingStateQueue) {
            inst.state = this._processPendingState(inst.props, inst.context);
          }
        }
        if (renderedElement === undefined) {
          renderedElement = this._renderValidatedComponent();
        }
        this._renderedComponent = this._instantiateReactComponent(renderedElement);
        var markup = ReactReconciler.mountComponent(this._renderedComponent, rootID, transaction, this._processChildContext(context));
        if (inst.componentDidMount) {
          transaction.getReactMountReady().enqueue(inst.componentDidMount, inst);
        }
        return markup;
      },
      unmountComponent: function () {
        var inst = this._instance;
        if (inst.componentWillUnmount) {
          inst.componentWillUnmount();
        }
        ReactReconciler.unmountComponent(this._renderedComponent);
        this._renderedComponent = null;
        this._instance = null;
        this._pendingStateQueue = null;
        this._pendingReplaceState = false;
        this._pendingForceUpdate = false;
        this._pendingCallbacks = null;
        this._pendingElement = null;
        this._context = null;
        this._rootNodeID = null;
        this._topLevelWrapper = null;
        ReactInstanceMap.remove(inst);
      },
      _maskContext: function (context) {
        var maskedContext = null;
        var Component = this._currentElement.type;
        var contextTypes = Component.contextTypes;
        if (!contextTypes) {
          return emptyObject;
        }
        maskedContext = {};
        for (var contextName in contextTypes) {
          maskedContext[contextName] = context[contextName];
        }
        return maskedContext;
      },
      _processContext: function (context) {
        var maskedContext = this._maskContext(context);
        if ('production' !== 'production') {
          var Component = this._currentElement.type;
          if (Component.contextTypes) {
            this._checkPropTypes(Component.contextTypes, maskedContext, ReactPropTypeLocations.context);
          }
        }
        return maskedContext;
      },
      _processChildContext: function (currentContext) {
        var Component = this._currentElement.type;
        var inst = this._instance;
        var childContext = inst.getChildContext && inst.getChildContext();
        if (childContext) {
          !(typeof Component.childContextTypes === 'object') ? 'production' !== 'production' ? invariant(false, '%s.getChildContext(): childContextTypes must be defined in order to ' + 'use getChildContext().', this.getName() || 'ReactCompositeComponent') : invariant(false) : undefined;
          if ('production' !== 'production') {
            this._checkPropTypes(Component.childContextTypes, childContext, ReactPropTypeLocations.childContext);
          }
          for (var name in childContext) {
            !(name in Component.childContextTypes) ? 'production' !== 'production' ? invariant(false, '%s.getChildContext(): key "%s" is not defined in childContextTypes.', this.getName() || 'ReactCompositeComponent', name) : invariant(false) : undefined;
          }
          return assign({}, currentContext, childContext);
        }
        return currentContext;
      },
      _processProps: function (newProps) {
        if ('production' !== 'production') {
          var Component = this._currentElement.type;
          if (Component.propTypes) {
            this._checkPropTypes(Component.propTypes, newProps, ReactPropTypeLocations.prop);
          }
        }
        return newProps;
      },
      _checkPropTypes: function (propTypes, props, location) {
        var componentName = this.getName();
        for (var propName in propTypes) {
          if (propTypes.hasOwnProperty(propName)) {
            var error;
            try {
              !(typeof propTypes[propName] === 'function') ? 'production' !== 'production' ? invariant(false, '%s: %s type `%s` is invalid; it must be a function, usually ' + 'from React.PropTypes.', componentName || 'React class', ReactPropTypeLocationNames[location], propName) : invariant(false) : undefined;
              error = propTypes[propName](props, propName, componentName, location);
            } catch (ex) {
              error = ex;
            }
            if (error instanceof Error) {
              var addendum = getDeclarationErrorAddendum(this);
              if (location === ReactPropTypeLocations.prop) {
                'production' !== 'production' ? warning(false, 'Failed Composite propType: %s%s', error.message, addendum) : undefined;
              } else {
                'production' !== 'production' ? warning(false, 'Failed Context Types: %s%s', error.message, addendum) : undefined;
              }
            }
          }
        }
      },
      receiveComponent: function (nextElement, transaction, nextContext) {
        var prevElement = this._currentElement;
        var prevContext = this._context;
        this._pendingElement = null;
        this.updateComponent(transaction, prevElement, nextElement, prevContext, nextContext);
      },
      performUpdateIfNecessary: function (transaction) {
        if (this._pendingElement != null) {
          ReactReconciler.receiveComponent(this, this._pendingElement || this._currentElement, transaction, this._context);
        }
        if (this._pendingStateQueue !== null || this._pendingForceUpdate) {
          this.updateComponent(transaction, this._currentElement, this._currentElement, this._context, this._context);
        }
      },
      updateComponent: function (transaction, prevParentElement, nextParentElement, prevUnmaskedContext, nextUnmaskedContext) {
        var inst = this._instance;
        var nextContext = this._context === nextUnmaskedContext ? inst.context : this._processContext(nextUnmaskedContext);
        var nextProps;
        if (prevParentElement === nextParentElement) {
          nextProps = nextParentElement.props;
        } else {
          nextProps = this._processProps(nextParentElement.props);
          if (inst.componentWillReceiveProps) {
            inst.componentWillReceiveProps(nextProps, nextContext);
          }
        }
        var nextState = this._processPendingState(nextProps, nextContext);
        var shouldUpdate = this._pendingForceUpdate || !inst.shouldComponentUpdate || inst.shouldComponentUpdate(nextProps, nextState, nextContext);
        if ('production' !== 'production') {
          'production' !== 'production' ? warning(typeof shouldUpdate !== 'undefined', '%s.shouldComponentUpdate(): Returned undefined instead of a ' + 'boolean value. Make sure to return true or false.', this.getName() || 'ReactCompositeComponent') : undefined;
        }
        if (shouldUpdate) {
          this._pendingForceUpdate = false;
          this._performComponentUpdate(nextParentElement, nextProps, nextState, nextContext, transaction, nextUnmaskedContext);
        } else {
          this._currentElement = nextParentElement;
          this._context = nextUnmaskedContext;
          inst.props = nextProps;
          inst.state = nextState;
          inst.context = nextContext;
        }
      },
      _processPendingState: function (props, context) {
        var inst = this._instance;
        var queue = this._pendingStateQueue;
        var replace = this._pendingReplaceState;
        this._pendingReplaceState = false;
        this._pendingStateQueue = null;
        if (!queue) {
          return inst.state;
        }
        if (replace && queue.length === 1) {
          return queue[0];
        }
        var nextState = assign({}, replace ? queue[0] : inst.state);
        for (var i = replace ? 1 : 0; i < queue.length; i++) {
          var partial = queue[i];
          assign(nextState, typeof partial === 'function' ? partial.call(inst, nextState, props, context) : partial);
        }
        return nextState;
      },
      _performComponentUpdate: function (nextElement, nextProps, nextState, nextContext, transaction, unmaskedContext) {
        var inst = this._instance;
        var hasComponentDidUpdate = Boolean(inst.componentDidUpdate);
        var prevProps;
        var prevState;
        var prevContext;
        if (hasComponentDidUpdate) {
          prevProps = inst.props;
          prevState = inst.state;
          prevContext = inst.context;
        }
        if (inst.componentWillUpdate) {
          inst.componentWillUpdate(nextProps, nextState, nextContext);
        }
        this._currentElement = nextElement;
        this._context = unmaskedContext;
        inst.props = nextProps;
        inst.state = nextState;
        inst.context = nextContext;
        this._updateRenderedComponent(transaction, unmaskedContext);
        if (hasComponentDidUpdate) {
          transaction.getReactMountReady().enqueue(inst.componentDidUpdate.bind(inst, prevProps, prevState, prevContext), inst);
        }
      },
      _updateRenderedComponent: function (transaction, context) {
        var prevComponentInstance = this._renderedComponent;
        var prevRenderedElement = prevComponentInstance._currentElement;
        var nextRenderedElement = this._renderValidatedComponent();
        if (shouldUpdateReactComponent(prevRenderedElement, nextRenderedElement)) {
          ReactReconciler.receiveComponent(prevComponentInstance, nextRenderedElement, transaction, this._processChildContext(context));
        } else {
          var thisID = this._rootNodeID;
          var prevComponentID = prevComponentInstance._rootNodeID;
          ReactReconciler.unmountComponent(prevComponentInstance);
          this._renderedComponent = this._instantiateReactComponent(nextRenderedElement);
          var nextMarkup = ReactReconciler.mountComponent(this._renderedComponent, thisID, transaction, this._processChildContext(context));
          this._replaceNodeWithMarkupByID(prevComponentID, nextMarkup);
        }
      },
      _replaceNodeWithMarkupByID: function (prevComponentID, nextMarkup) {
        ReactComponentEnvironment.replaceNodeWithMarkupByID(prevComponentID, nextMarkup);
      },
      _renderValidatedComponentWithoutOwnerOrContext: function () {
        var inst = this._instance;
        var renderedComponent = inst.render();
        if ('production' !== 'production') {
          if (typeof renderedComponent === 'undefined' && inst.render._isMockFunction) {
            renderedComponent = null;
          }
        }
        return renderedComponent;
      },
      _renderValidatedComponent: function () {
        var renderedComponent;
        ReactCurrentOwner.current = this;
        try {
          renderedComponent = this._renderValidatedComponentWithoutOwnerOrContext();
        } finally {
          ReactCurrentOwner.current = null;
        }
        !(renderedComponent === null || renderedComponent === false || ReactElement.isValidElement(renderedComponent)) ? 'production' !== 'production' ? invariant(false, '%s.render(): A valid ReactComponent must be returned. You may have ' + 'returned undefined, an array or some other invalid object.', this.getName() || 'ReactCompositeComponent') : invariant(false) : undefined;
        return renderedComponent;
      },
      attachRef: function (ref, component) {
        var inst = this.getPublicInstance();
        !(inst != null) ? 'production' !== 'production' ? invariant(false, 'Stateless function components cannot have refs.') : invariant(false) : undefined;
        var publicComponentInstance = component.getPublicInstance();
        if ('production' !== 'production') {
          var componentName = component && component.getName ? component.getName() : 'a component';
          'production' !== 'production' ? warning(publicComponentInstance != null, 'Stateless function components cannot be given refs ' + '(See ref "%s" in %s created by %s). ' + 'Attempts to access this ref will fail.', ref, componentName, this.getName()) : undefined;
        }
        var refs = inst.refs === emptyObject ? inst.refs = {} : inst.refs;
        refs[ref] = publicComponentInstance;
      },
      detachRef: function (ref) {
        var refs = this.getPublicInstance().refs;
        delete refs[ref];
      },
      getName: function () {
        var type = this._currentElement.type;
        var constructor = this._instance && this._instance.constructor;
        return type.displayName || constructor && constructor.displayName || type.name || constructor && constructor.name || null;
      },
      getPublicInstance: function () {
        var inst = this._instance;
        if (inst instanceof StatelessComponent) {
          return null;
        }
        return inst;
      },
      _instantiateReactComponent: null
    };
    ReactPerf.measureMethods(ReactCompositeComponentMixin, 'ReactCompositeComponent', {
      mountComponent: 'mountComponent',
      updateComponent: 'updateComponent',
      _renderValidatedComponent: '_renderValidatedComponent'
    });
    var ReactCompositeComponent = { Mixin: ReactCompositeComponentMixin };
    module.exports = ReactCompositeComponent;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
});
System.registerDynamic('npm:react@0.14.7/lib/ReactEmptyComponentRegistry.js', [], true, function ($__require, exports, module) {
  /**
   * Copyright 2014-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule ReactEmptyComponentRegistry
   */

  'use strict';

  // This registry keeps track of the React IDs of the components that rendered to
  // `null` (in reality a placeholder such as `noscript`)

  var global = this || self,
      GLOBAL = global;
  var nullComponentIDsRegistry = {};

  /**
   * @param {string} id Component's `_rootNodeID`.
   * @return {boolean} True if the component is rendered to null.
   */
  function isNullComponentID(id) {
    return !!nullComponentIDsRegistry[id];
  }

  /**
   * Mark the component as having rendered to null.
   * @param {string} id Component's `_rootNodeID`.
   */
  function registerNullComponentID(id) {
    nullComponentIDsRegistry[id] = true;
  }

  /**
   * Unmark the component as having rendered to null: it renders to something now.
   * @param {string} id Component's `_rootNodeID`.
   */
  function deregisterNullComponentID(id) {
    delete nullComponentIDsRegistry[id];
  }

  var ReactEmptyComponentRegistry = {
    isNullComponentID: isNullComponentID,
    registerNullComponentID: registerNullComponentID,
    deregisterNullComponentID: deregisterNullComponentID
  };

  module.exports = ReactEmptyComponentRegistry;
});
System.registerDynamic('npm:react@0.14.7/lib/ReactOwner.js', ['npm:fbjs@0.6.1/lib/invariant.js', 'github:jspm/nodelibs-process@0.1.2.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  (function (process) {
    'use strict';

    var invariant = $__require('npm:fbjs@0.6.1/lib/invariant.js');
    var ReactOwner = {
      isValidOwner: function (object) {
        return !!(object && typeof object.attachRef === 'function' && typeof object.detachRef === 'function');
      },
      addComponentAsRefTo: function (component, ref, owner) {
        !ReactOwner.isValidOwner(owner) ? 'production' !== 'production' ? invariant(false, 'addComponentAsRefTo(...): Only a ReactOwner can have refs. You might ' + 'be adding a ref to a component that was not created inside a component\'s ' + '`render` method, or you have multiple copies of React loaded ' + '(details: https://fb.me/react-refs-must-have-owner).') : invariant(false) : undefined;
        owner.attachRef(ref, component);
      },
      removeComponentAsRefFrom: function (component, ref, owner) {
        !ReactOwner.isValidOwner(owner) ? 'production' !== 'production' ? invariant(false, 'removeComponentAsRefFrom(...): Only a ReactOwner can have refs. You might ' + 'be removing a ref to a component that was not created inside a component\'s ' + '`render` method, or you have multiple copies of React loaded ' + '(details: https://fb.me/react-refs-must-have-owner).') : invariant(false) : undefined;
        if (owner.getPublicInstance().refs[ref] === component.getPublicInstance()) {
          owner.detachRef(ref);
        }
      }
    };
    module.exports = ReactOwner;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
});
System.registerDynamic('npm:react@0.14.7/lib/ReactRef.js', ['npm:react@0.14.7/lib/ReactOwner.js', 'github:jspm/nodelibs-process@0.1.2.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  (function (process) {
    'use strict';

    var ReactOwner = $__require('npm:react@0.14.7/lib/ReactOwner.js');
    var ReactRef = {};
    function attachRef(ref, component, owner) {
      if (typeof ref === 'function') {
        ref(component.getPublicInstance());
      } else {
        ReactOwner.addComponentAsRefTo(component, ref, owner);
      }
    }
    function detachRef(ref, component, owner) {
      if (typeof ref === 'function') {
        ref(null);
      } else {
        ReactOwner.removeComponentAsRefFrom(component, ref, owner);
      }
    }
    ReactRef.attachRefs = function (instance, element) {
      if (element === null || element === false) {
        return;
      }
      var ref = element.ref;
      if (ref != null) {
        attachRef(ref, instance, element._owner);
      }
    };
    ReactRef.shouldUpdateRefs = function (prevElement, nextElement) {
      var prevEmpty = prevElement === null || prevElement === false;
      var nextEmpty = nextElement === null || nextElement === false;
      return prevEmpty || nextEmpty || nextElement._owner !== prevElement._owner || nextElement.ref !== prevElement.ref;
    };
    ReactRef.detachRefs = function (instance, element) {
      if (element === null || element === false) {
        return;
      }
      var ref = element.ref;
      if (ref != null) {
        detachRef(ref, instance, element._owner);
      }
    };
    module.exports = ReactRef;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
});
System.registerDynamic('npm:react@0.14.7/lib/ReactReconciler.js', ['npm:react@0.14.7/lib/ReactRef.js'], true, function ($__require, exports, module) {
  /* */
  'use strict';

  var global = this || self,
      GLOBAL = global;
  var ReactRef = $__require('npm:react@0.14.7/lib/ReactRef.js');
  function attachRefs() {
    ReactRef.attachRefs(this, this._currentElement);
  }
  var ReactReconciler = {
    mountComponent: function (internalInstance, rootID, transaction, context) {
      var markup = internalInstance.mountComponent(rootID, transaction, context);
      if (internalInstance._currentElement && internalInstance._currentElement.ref != null) {
        transaction.getReactMountReady().enqueue(attachRefs, internalInstance);
      }
      return markup;
    },
    unmountComponent: function (internalInstance) {
      ReactRef.detachRefs(internalInstance, internalInstance._currentElement);
      internalInstance.unmountComponent();
    },
    receiveComponent: function (internalInstance, nextElement, transaction, context) {
      var prevElement = internalInstance._currentElement;
      if (nextElement === prevElement && context === internalInstance._context) {
        return;
      }
      var refsChanged = ReactRef.shouldUpdateRefs(prevElement, nextElement);
      if (refsChanged) {
        ReactRef.detachRefs(internalInstance, prevElement);
      }
      internalInstance.receiveComponent(nextElement, transaction, context);
      if (refsChanged && internalInstance._currentElement && internalInstance._currentElement.ref != null) {
        transaction.getReactMountReady().enqueue(attachRefs, internalInstance);
      }
    },
    performUpdateIfNecessary: function (internalInstance, transaction) {
      internalInstance.performUpdateIfNecessary(transaction);
    }
  };
  module.exports = ReactReconciler;
});
System.registerDynamic('npm:react@0.14.7/lib/ReactEmptyComponent.js', ['npm:react@0.14.7/lib/ReactElement.js', 'npm:react@0.14.7/lib/ReactEmptyComponentRegistry.js', 'npm:react@0.14.7/lib/ReactReconciler.js', 'npm:react@0.14.7/lib/Object.assign.js'], true, function ($__require, exports, module) {
  /* */
  'use strict';

  var global = this || self,
      GLOBAL = global;
  var ReactElement = $__require('npm:react@0.14.7/lib/ReactElement.js');
  var ReactEmptyComponentRegistry = $__require('npm:react@0.14.7/lib/ReactEmptyComponentRegistry.js');
  var ReactReconciler = $__require('npm:react@0.14.7/lib/ReactReconciler.js');
  var assign = $__require('npm:react@0.14.7/lib/Object.assign.js');
  var placeholderElement;
  var ReactEmptyComponentInjection = { injectEmptyComponent: function (component) {
      placeholderElement = ReactElement.createElement(component);
    } };
  var ReactEmptyComponent = function (instantiate) {
    this._currentElement = null;
    this._rootNodeID = null;
    this._renderedComponent = instantiate(placeholderElement);
  };
  assign(ReactEmptyComponent.prototype, {
    construct: function (element) {},
    mountComponent: function (rootID, transaction, context) {
      ReactEmptyComponentRegistry.registerNullComponentID(rootID);
      this._rootNodeID = rootID;
      return ReactReconciler.mountComponent(this._renderedComponent, rootID, transaction, context);
    },
    receiveComponent: function () {},
    unmountComponent: function (rootID, transaction, context) {
      ReactReconciler.unmountComponent(this._renderedComponent);
      ReactEmptyComponentRegistry.deregisterNullComponentID(this._rootNodeID);
      this._rootNodeID = null;
      this._renderedComponent = null;
    }
  });
  ReactEmptyComponent.injection = ReactEmptyComponentInjection;
  module.exports = ReactEmptyComponent;
});
System.registerDynamic('npm:react@0.14.7/lib/ReactNativeComponent.js', ['npm:react@0.14.7/lib/Object.assign.js', 'npm:fbjs@0.6.1/lib/invariant.js', 'github:jspm/nodelibs-process@0.1.2.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  (function (process) {
    'use strict';

    var assign = $__require('npm:react@0.14.7/lib/Object.assign.js');
    var invariant = $__require('npm:fbjs@0.6.1/lib/invariant.js');
    var autoGenerateWrapperClass = null;
    var genericComponentClass = null;
    var tagToComponentClass = {};
    var textComponentClass = null;
    var ReactNativeComponentInjection = {
      injectGenericComponentClass: function (componentClass) {
        genericComponentClass = componentClass;
      },
      injectTextComponentClass: function (componentClass) {
        textComponentClass = componentClass;
      },
      injectComponentClasses: function (componentClasses) {
        assign(tagToComponentClass, componentClasses);
      }
    };
    function getComponentClassForElement(element) {
      if (typeof element.type === 'function') {
        return element.type;
      }
      var tag = element.type;
      var componentClass = tagToComponentClass[tag];
      if (componentClass == null) {
        tagToComponentClass[tag] = componentClass = autoGenerateWrapperClass(tag);
      }
      return componentClass;
    }
    function createInternalComponent(element) {
      !genericComponentClass ? 'production' !== 'production' ? invariant(false, 'There is no registered component for the tag %s', element.type) : invariant(false) : undefined;
      return new genericComponentClass(element.type, element.props);
    }
    function createInstanceForText(text) {
      return new textComponentClass(text);
    }
    function isTextComponent(component) {
      return component instanceof textComponentClass;
    }
    var ReactNativeComponent = {
      getComponentClassForElement: getComponentClassForElement,
      createInternalComponent: createInternalComponent,
      createInstanceForText: createInstanceForText,
      isTextComponent: isTextComponent,
      injection: ReactNativeComponentInjection
    };
    module.exports = ReactNativeComponent;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
});
System.registerDynamic('npm:react@0.14.7/lib/instantiateReactComponent.js', ['npm:react@0.14.7/lib/ReactCompositeComponent.js', 'npm:react@0.14.7/lib/ReactEmptyComponent.js', 'npm:react@0.14.7/lib/ReactNativeComponent.js', 'npm:react@0.14.7/lib/Object.assign.js', 'npm:fbjs@0.6.1/lib/invariant.js', 'npm:fbjs@0.6.1/lib/warning.js', 'github:jspm/nodelibs-process@0.1.2.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  (function (process) {
    'use strict';

    var ReactCompositeComponent = $__require('npm:react@0.14.7/lib/ReactCompositeComponent.js');
    var ReactEmptyComponent = $__require('npm:react@0.14.7/lib/ReactEmptyComponent.js');
    var ReactNativeComponent = $__require('npm:react@0.14.7/lib/ReactNativeComponent.js');
    var assign = $__require('npm:react@0.14.7/lib/Object.assign.js');
    var invariant = $__require('npm:fbjs@0.6.1/lib/invariant.js');
    var warning = $__require('npm:fbjs@0.6.1/lib/warning.js');
    var ReactCompositeComponentWrapper = function () {};
    assign(ReactCompositeComponentWrapper.prototype, ReactCompositeComponent.Mixin, { _instantiateReactComponent: instantiateReactComponent });
    function getDeclarationErrorAddendum(owner) {
      if (owner) {
        var name = owner.getName();
        if (name) {
          return ' Check the render method of `' + name + '`.';
        }
      }
      return '';
    }
    function isInternalComponentType(type) {
      return typeof type === 'function' && typeof type.prototype !== 'undefined' && typeof type.prototype.mountComponent === 'function' && typeof type.prototype.receiveComponent === 'function';
    }
    function instantiateReactComponent(node) {
      var instance;
      if (node === null || node === false) {
        instance = new ReactEmptyComponent(instantiateReactComponent);
      } else if (typeof node === 'object') {
        var element = node;
        !(element && (typeof element.type === 'function' || typeof element.type === 'string')) ? 'production' !== 'production' ? invariant(false, 'Element type is invalid: expected a string (for built-in components) ' + 'or a class/function (for composite components) but got: %s.%s', element.type == null ? element.type : typeof element.type, getDeclarationErrorAddendum(element._owner)) : invariant(false) : undefined;
        if (typeof element.type === 'string') {
          instance = ReactNativeComponent.createInternalComponent(element);
        } else if (isInternalComponentType(element.type)) {
          instance = new element.type(element);
        } else {
          instance = new ReactCompositeComponentWrapper();
        }
      } else if (typeof node === 'string' || typeof node === 'number') {
        instance = ReactNativeComponent.createInstanceForText(node);
      } else {
        !false ? 'production' !== 'production' ? invariant(false, 'Encountered invalid React node of type %s', typeof node) : invariant(false) : undefined;
      }
      if ('production' !== 'production') {
        'production' !== 'production' ? warning(typeof instance.construct === 'function' && typeof instance.mountComponent === 'function' && typeof instance.receiveComponent === 'function' && typeof instance.unmountComponent === 'function', 'Only React Components can be mounted.') : undefined;
      }
      instance.construct(node);
      instance._mountIndex = 0;
      instance._mountImage = null;
      if ('production' !== 'production') {
        instance._isOwnerNecessary = false;
        instance._warnedAboutRefsInRender = false;
      }
      if ('production' !== 'production') {
        if (Object.preventExtensions) {
          Object.preventExtensions(instance);
        }
      }
      return instance;
    }
    module.exports = instantiateReactComponent;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
});
System.registerDynamic('npm:react@0.14.7/lib/ReactServerRendering.js', ['npm:react@0.14.7/lib/ReactDefaultBatchingStrategy.js', 'npm:react@0.14.7/lib/ReactElement.js', 'npm:react@0.14.7/lib/ReactInstanceHandles.js', 'npm:react@0.14.7/lib/ReactMarkupChecksum.js', 'npm:react@0.14.7/lib/ReactServerBatchingStrategy.js', 'npm:react@0.14.7/lib/ReactServerRenderingTransaction.js', 'npm:react@0.14.7/lib/ReactUpdates.js', 'npm:fbjs@0.6.1/lib/emptyObject.js', 'npm:react@0.14.7/lib/instantiateReactComponent.js', 'npm:fbjs@0.6.1/lib/invariant.js', 'github:jspm/nodelibs-process@0.1.2.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  (function (process) {
    'use strict';

    var ReactDefaultBatchingStrategy = $__require('npm:react@0.14.7/lib/ReactDefaultBatchingStrategy.js');
    var ReactElement = $__require('npm:react@0.14.7/lib/ReactElement.js');
    var ReactInstanceHandles = $__require('npm:react@0.14.7/lib/ReactInstanceHandles.js');
    var ReactMarkupChecksum = $__require('npm:react@0.14.7/lib/ReactMarkupChecksum.js');
    var ReactServerBatchingStrategy = $__require('npm:react@0.14.7/lib/ReactServerBatchingStrategy.js');
    var ReactServerRenderingTransaction = $__require('npm:react@0.14.7/lib/ReactServerRenderingTransaction.js');
    var ReactUpdates = $__require('npm:react@0.14.7/lib/ReactUpdates.js');
    var emptyObject = $__require('npm:fbjs@0.6.1/lib/emptyObject.js');
    var instantiateReactComponent = $__require('npm:react@0.14.7/lib/instantiateReactComponent.js');
    var invariant = $__require('npm:fbjs@0.6.1/lib/invariant.js');
    function renderToString(element) {
      !ReactElement.isValidElement(element) ? 'production' !== 'production' ? invariant(false, 'renderToString(): You must pass a valid ReactElement.') : invariant(false) : undefined;
      var transaction;
      try {
        ReactUpdates.injection.injectBatchingStrategy(ReactServerBatchingStrategy);
        var id = ReactInstanceHandles.createReactRootID();
        transaction = ReactServerRenderingTransaction.getPooled(false);
        return transaction.perform(function () {
          var componentInstance = instantiateReactComponent(element, null);
          var markup = componentInstance.mountComponent(id, transaction, emptyObject);
          return ReactMarkupChecksum.addChecksumToMarkup(markup);
        }, null);
      } finally {
        ReactServerRenderingTransaction.release(transaction);
        ReactUpdates.injection.injectBatchingStrategy(ReactDefaultBatchingStrategy);
      }
    }
    function renderToStaticMarkup(element) {
      !ReactElement.isValidElement(element) ? 'production' !== 'production' ? invariant(false, 'renderToStaticMarkup(): You must pass a valid ReactElement.') : invariant(false) : undefined;
      var transaction;
      try {
        ReactUpdates.injection.injectBatchingStrategy(ReactServerBatchingStrategy);
        var id = ReactInstanceHandles.createReactRootID();
        transaction = ReactServerRenderingTransaction.getPooled(true);
        return transaction.perform(function () {
          var componentInstance = instantiateReactComponent(element, null);
          return componentInstance.mountComponent(id, transaction, emptyObject);
        }, null);
      } finally {
        ReactServerRenderingTransaction.release(transaction);
        ReactUpdates.injection.injectBatchingStrategy(ReactDefaultBatchingStrategy);
      }
    }
    module.exports = {
      renderToString: renderToString,
      renderToStaticMarkup: renderToStaticMarkup
    };
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
});
System.registerDynamic('npm:react@0.14.7/lib/ReactDOMServer.js', ['npm:react@0.14.7/lib/ReactDefaultInjection.js', 'npm:react@0.14.7/lib/ReactServerRendering.js', 'npm:react@0.14.7/lib/ReactVersion.js'], true, function ($__require, exports, module) {
  /* */
  'use strict';

  var global = this || self,
      GLOBAL = global;
  var ReactDefaultInjection = $__require('npm:react@0.14.7/lib/ReactDefaultInjection.js');
  var ReactServerRendering = $__require('npm:react@0.14.7/lib/ReactServerRendering.js');
  var ReactVersion = $__require('npm:react@0.14.7/lib/ReactVersion.js');
  ReactDefaultInjection.inject();
  var ReactDOMServer = {
    renderToString: ReactServerRendering.renderToString,
    renderToStaticMarkup: ReactServerRendering.renderToStaticMarkup,
    version: ReactVersion
  };
  module.exports = ReactDOMServer;
});
System.registerDynamic('npm:react@0.14.7/lib/PooledClass.js', ['npm:fbjs@0.6.1/lib/invariant.js', 'github:jspm/nodelibs-process@0.1.2.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  (function (process) {
    'use strict';

    var invariant = $__require('npm:fbjs@0.6.1/lib/invariant.js');
    var oneArgumentPooler = function (copyFieldsFrom) {
      var Klass = this;
      if (Klass.instancePool.length) {
        var instance = Klass.instancePool.pop();
        Klass.call(instance, copyFieldsFrom);
        return instance;
      } else {
        return new Klass(copyFieldsFrom);
      }
    };
    var twoArgumentPooler = function (a1, a2) {
      var Klass = this;
      if (Klass.instancePool.length) {
        var instance = Klass.instancePool.pop();
        Klass.call(instance, a1, a2);
        return instance;
      } else {
        return new Klass(a1, a2);
      }
    };
    var threeArgumentPooler = function (a1, a2, a3) {
      var Klass = this;
      if (Klass.instancePool.length) {
        var instance = Klass.instancePool.pop();
        Klass.call(instance, a1, a2, a3);
        return instance;
      } else {
        return new Klass(a1, a2, a3);
      }
    };
    var fourArgumentPooler = function (a1, a2, a3, a4) {
      var Klass = this;
      if (Klass.instancePool.length) {
        var instance = Klass.instancePool.pop();
        Klass.call(instance, a1, a2, a3, a4);
        return instance;
      } else {
        return new Klass(a1, a2, a3, a4);
      }
    };
    var fiveArgumentPooler = function (a1, a2, a3, a4, a5) {
      var Klass = this;
      if (Klass.instancePool.length) {
        var instance = Klass.instancePool.pop();
        Klass.call(instance, a1, a2, a3, a4, a5);
        return instance;
      } else {
        return new Klass(a1, a2, a3, a4, a5);
      }
    };
    var standardReleaser = function (instance) {
      var Klass = this;
      !(instance instanceof Klass) ? 'production' !== 'production' ? invariant(false, 'Trying to release an instance into a pool of a different type.') : invariant(false) : undefined;
      instance.destructor();
      if (Klass.instancePool.length < Klass.poolSize) {
        Klass.instancePool.push(instance);
      }
    };
    var DEFAULT_POOL_SIZE = 10;
    var DEFAULT_POOLER = oneArgumentPooler;
    var addPoolingTo = function (CopyConstructor, pooler) {
      var NewKlass = CopyConstructor;
      NewKlass.instancePool = [];
      NewKlass.getPooled = pooler || DEFAULT_POOLER;
      if (!NewKlass.poolSize) {
        NewKlass.poolSize = DEFAULT_POOL_SIZE;
      }
      NewKlass.release = standardReleaser;
      return NewKlass;
    };
    var PooledClass = {
      addPoolingTo: addPoolingTo,
      oneArgumentPooler: oneArgumentPooler,
      twoArgumentPooler: twoArgumentPooler,
      threeArgumentPooler: threeArgumentPooler,
      fourArgumentPooler: fourArgumentPooler,
      fiveArgumentPooler: fiveArgumentPooler
    };
    module.exports = PooledClass;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
});
System.registerDynamic('npm:react@0.14.7/lib/ReactRootIndex.js', [], true, function ($__require, exports, module) {
  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule ReactRootIndex
   * @typechecks
   */

  'use strict';

  var global = this || self,
      GLOBAL = global;
  var ReactRootIndexInjection = {
    /**
     * @param {function} _createReactRootIndex
     */
    injectCreateReactRootIndex: function (_createReactRootIndex) {
      ReactRootIndex.createReactRootIndex = _createReactRootIndex;
    }
  };

  var ReactRootIndex = {
    createReactRootIndex: null,
    injection: ReactRootIndexInjection
  };

  module.exports = ReactRootIndex;
});
System.registerDynamic('npm:react@0.14.7/lib/ReactInstanceHandles.js', ['npm:react@0.14.7/lib/ReactRootIndex.js', 'npm:fbjs@0.6.1/lib/invariant.js', 'github:jspm/nodelibs-process@0.1.2.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  (function (process) {
    'use strict';

    var ReactRootIndex = $__require('npm:react@0.14.7/lib/ReactRootIndex.js');
    var invariant = $__require('npm:fbjs@0.6.1/lib/invariant.js');
    var SEPARATOR = '.';
    var SEPARATOR_LENGTH = SEPARATOR.length;
    var MAX_TREE_DEPTH = 10000;
    function getReactRootIDString(index) {
      return SEPARATOR + index.toString(36);
    }
    function isBoundary(id, index) {
      return id.charAt(index) === SEPARATOR || index === id.length;
    }
    function isValidID(id) {
      return id === '' || id.charAt(0) === SEPARATOR && id.charAt(id.length - 1) !== SEPARATOR;
    }
    function isAncestorIDOf(ancestorID, descendantID) {
      return descendantID.indexOf(ancestorID) === 0 && isBoundary(descendantID, ancestorID.length);
    }
    function getParentID(id) {
      return id ? id.substr(0, id.lastIndexOf(SEPARATOR)) : '';
    }
    function getNextDescendantID(ancestorID, destinationID) {
      !(isValidID(ancestorID) && isValidID(destinationID)) ? 'production' !== 'production' ? invariant(false, 'getNextDescendantID(%s, %s): Received an invalid React DOM ID.', ancestorID, destinationID) : invariant(false) : undefined;
      !isAncestorIDOf(ancestorID, destinationID) ? 'production' !== 'production' ? invariant(false, 'getNextDescendantID(...): React has made an invalid assumption about ' + 'the DOM hierarchy. Expected `%s` to be an ancestor of `%s`.', ancestorID, destinationID) : invariant(false) : undefined;
      if (ancestorID === destinationID) {
        return ancestorID;
      }
      var start = ancestorID.length + SEPARATOR_LENGTH;
      var i;
      for (i = start; i < destinationID.length; i++) {
        if (isBoundary(destinationID, i)) {
          break;
        }
      }
      return destinationID.substr(0, i);
    }
    function getFirstCommonAncestorID(oneID, twoID) {
      var minLength = Math.min(oneID.length, twoID.length);
      if (minLength === 0) {
        return '';
      }
      var lastCommonMarkerIndex = 0;
      for (var i = 0; i <= minLength; i++) {
        if (isBoundary(oneID, i) && isBoundary(twoID, i)) {
          lastCommonMarkerIndex = i;
        } else if (oneID.charAt(i) !== twoID.charAt(i)) {
          break;
        }
      }
      var longestCommonID = oneID.substr(0, lastCommonMarkerIndex);
      !isValidID(longestCommonID) ? 'production' !== 'production' ? invariant(false, 'getFirstCommonAncestorID(%s, %s): Expected a valid React DOM ID: %s', oneID, twoID, longestCommonID) : invariant(false) : undefined;
      return longestCommonID;
    }
    function traverseParentPath(start, stop, cb, arg, skipFirst, skipLast) {
      start = start || '';
      stop = stop || '';
      !(start !== stop) ? 'production' !== 'production' ? invariant(false, 'traverseParentPath(...): Cannot traverse from and to the same ID, `%s`.', start) : invariant(false) : undefined;
      var traverseUp = isAncestorIDOf(stop, start);
      !(traverseUp || isAncestorIDOf(start, stop)) ? 'production' !== 'production' ? invariant(false, 'traverseParentPath(%s, %s, ...): Cannot traverse from two IDs that do ' + 'not have a parent path.', start, stop) : invariant(false) : undefined;
      var depth = 0;
      var traverse = traverseUp ? getParentID : getNextDescendantID;
      for (var id = start;; id = traverse(id, stop)) {
        var ret;
        if ((!skipFirst || id !== start) && (!skipLast || id !== stop)) {
          ret = cb(id, traverseUp, arg);
        }
        if (ret === false || id === stop) {
          break;
        }
        !(depth++ < MAX_TREE_DEPTH) ? 'production' !== 'production' ? invariant(false, 'traverseParentPath(%s, %s, ...): Detected an infinite loop while ' + 'traversing the React DOM ID tree. This may be due to malformed IDs: %s', start, stop, id) : invariant(false) : undefined;
      }
    }
    var ReactInstanceHandles = {
      createReactRootID: function () {
        return getReactRootIDString(ReactRootIndex.createReactRootIndex());
      },
      createReactID: function (rootID, name) {
        return rootID + name;
      },
      getReactRootIDFromNodeID: function (id) {
        if (id && id.charAt(0) === SEPARATOR && id.length > 1) {
          var index = id.indexOf(SEPARATOR, 1);
          return index > -1 ? id.substr(0, index) : id;
        }
        return null;
      },
      traverseEnterLeave: function (leaveID, enterID, cb, upArg, downArg) {
        var ancestorID = getFirstCommonAncestorID(leaveID, enterID);
        if (ancestorID !== leaveID) {
          traverseParentPath(leaveID, ancestorID, cb, upArg, false, true);
        }
        if (ancestorID !== enterID) {
          traverseParentPath(ancestorID, enterID, cb, downArg, true, false);
        }
      },
      traverseTwoPhase: function (targetID, cb, arg) {
        if (targetID) {
          traverseParentPath('', targetID, cb, arg, true, false);
          traverseParentPath(targetID, '', cb, arg, false, true);
        }
      },
      traverseTwoPhaseSkipTarget: function (targetID, cb, arg) {
        if (targetID) {
          traverseParentPath('', targetID, cb, arg, true, true);
          traverseParentPath(targetID, '', cb, arg, true, true);
        }
      },
      traverseAncestors: function (targetID, cb, arg) {
        traverseParentPath('', targetID, cb, arg, true, false);
      },
      getFirstCommonAncestorID: getFirstCommonAncestorID,
      _getNextDescendantID: getNextDescendantID,
      isAncestorIDOf: isAncestorIDOf,
      SEPARATOR: SEPARATOR
    };
    module.exports = ReactInstanceHandles;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
});
System.registerDynamic('npm:react@0.14.7/lib/traverseAllChildren.js', ['npm:react@0.14.7/lib/ReactCurrentOwner.js', 'npm:react@0.14.7/lib/ReactElement.js', 'npm:react@0.14.7/lib/ReactInstanceHandles.js', 'npm:react@0.14.7/lib/getIteratorFn.js', 'npm:fbjs@0.6.1/lib/invariant.js', 'npm:fbjs@0.6.1/lib/warning.js', 'github:jspm/nodelibs-process@0.1.2.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  (function (process) {
    'use strict';

    var ReactCurrentOwner = $__require('npm:react@0.14.7/lib/ReactCurrentOwner.js');
    var ReactElement = $__require('npm:react@0.14.7/lib/ReactElement.js');
    var ReactInstanceHandles = $__require('npm:react@0.14.7/lib/ReactInstanceHandles.js');
    var getIteratorFn = $__require('npm:react@0.14.7/lib/getIteratorFn.js');
    var invariant = $__require('npm:fbjs@0.6.1/lib/invariant.js');
    var warning = $__require('npm:fbjs@0.6.1/lib/warning.js');
    var SEPARATOR = ReactInstanceHandles.SEPARATOR;
    var SUBSEPARATOR = ':';
    var userProvidedKeyEscaperLookup = {
      '=': '=0',
      '.': '=1',
      ':': '=2'
    };
    var userProvidedKeyEscapeRegex = /[=.:]/g;
    var didWarnAboutMaps = false;
    function userProvidedKeyEscaper(match) {
      return userProvidedKeyEscaperLookup[match];
    }
    function getComponentKey(component, index) {
      if (component && component.key != null) {
        return wrapUserProvidedKey(component.key);
      }
      return index.toString(36);
    }
    function escapeUserProvidedKey(text) {
      return ('' + text).replace(userProvidedKeyEscapeRegex, userProvidedKeyEscaper);
    }
    function wrapUserProvidedKey(key) {
      return '$' + escapeUserProvidedKey(key);
    }
    function traverseAllChildrenImpl(children, nameSoFar, callback, traverseContext) {
      var type = typeof children;
      if (type === 'undefined' || type === 'boolean') {
        children = null;
      }
      if (children === null || type === 'string' || type === 'number' || ReactElement.isValidElement(children)) {
        callback(traverseContext, children, nameSoFar === '' ? SEPARATOR + getComponentKey(children, 0) : nameSoFar);
        return 1;
      }
      var child;
      var nextName;
      var subtreeCount = 0;
      var nextNamePrefix = nameSoFar === '' ? SEPARATOR : nameSoFar + SUBSEPARATOR;
      if (Array.isArray(children)) {
        for (var i = 0; i < children.length; i++) {
          child = children[i];
          nextName = nextNamePrefix + getComponentKey(child, i);
          subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
        }
      } else {
        var iteratorFn = getIteratorFn(children);
        if (iteratorFn) {
          var iterator = iteratorFn.call(children);
          var step;
          if (iteratorFn !== children.entries) {
            var ii = 0;
            while (!(step = iterator.next()).done) {
              child = step.value;
              nextName = nextNamePrefix + getComponentKey(child, ii++);
              subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
            }
          } else {
            if ('production' !== 'production') {
              'production' !== 'production' ? warning(didWarnAboutMaps, 'Using Maps as children is not yet fully supported. It is an ' + 'experimental feature that might be removed. Convert it to a ' + 'sequence / iterable of keyed ReactElements instead.') : undefined;
              didWarnAboutMaps = true;
            }
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                child = entry[1];
                nextName = nextNamePrefix + wrapUserProvidedKey(entry[0]) + SUBSEPARATOR + getComponentKey(child, 0);
                subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
              }
            }
          }
        } else if (type === 'object') {
          var addendum = '';
          if ('production' !== 'production') {
            addendum = ' If you meant to render a collection of children, use an array ' + 'instead or wrap the object using createFragment(object) from the ' + 'React add-ons.';
            if (children._isReactElement) {
              addendum = ' It looks like you\'re using an element created by a different ' + 'version of React. Make sure to use only one copy of React.';
            }
            if (ReactCurrentOwner.current) {
              var name = ReactCurrentOwner.current.getName();
              if (name) {
                addendum += ' Check the render method of `' + name + '`.';
              }
            }
          }
          var childrenString = String(children);
          !false ? 'production' !== 'production' ? invariant(false, 'Objects are not valid as a React child (found: %s).%s', childrenString === '[object Object]' ? 'object with keys {' + Object.keys(children).join(', ') + '}' : childrenString, addendum) : invariant(false) : undefined;
        }
      }
      return subtreeCount;
    }
    function traverseAllChildren(children, callback, traverseContext) {
      if (children == null) {
        return 0;
      }
      return traverseAllChildrenImpl(children, '', callback, traverseContext);
    }
    module.exports = traverseAllChildren;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
});
System.registerDynamic('npm:react@0.14.7/lib/ReactChildren.js', ['npm:react@0.14.7/lib/PooledClass.js', 'npm:react@0.14.7/lib/ReactElement.js', 'npm:fbjs@0.6.1/lib/emptyFunction.js', 'npm:react@0.14.7/lib/traverseAllChildren.js'], true, function ($__require, exports, module) {
  /* */
  'use strict';

  var global = this || self,
      GLOBAL = global;
  var PooledClass = $__require('npm:react@0.14.7/lib/PooledClass.js');
  var ReactElement = $__require('npm:react@0.14.7/lib/ReactElement.js');
  var emptyFunction = $__require('npm:fbjs@0.6.1/lib/emptyFunction.js');
  var traverseAllChildren = $__require('npm:react@0.14.7/lib/traverseAllChildren.js');
  var twoArgumentPooler = PooledClass.twoArgumentPooler;
  var fourArgumentPooler = PooledClass.fourArgumentPooler;
  var userProvidedKeyEscapeRegex = /\/(?!\/)/g;
  function escapeUserProvidedKey(text) {
    return ('' + text).replace(userProvidedKeyEscapeRegex, '//');
  }
  function ForEachBookKeeping(forEachFunction, forEachContext) {
    this.func = forEachFunction;
    this.context = forEachContext;
    this.count = 0;
  }
  ForEachBookKeeping.prototype.destructor = function () {
    this.func = null;
    this.context = null;
    this.count = 0;
  };
  PooledClass.addPoolingTo(ForEachBookKeeping, twoArgumentPooler);
  function forEachSingleChild(bookKeeping, child, name) {
    var func = bookKeeping.func;
    var context = bookKeeping.context;
    func.call(context, child, bookKeeping.count++);
  }
  function forEachChildren(children, forEachFunc, forEachContext) {
    if (children == null) {
      return children;
    }
    var traverseContext = ForEachBookKeeping.getPooled(forEachFunc, forEachContext);
    traverseAllChildren(children, forEachSingleChild, traverseContext);
    ForEachBookKeeping.release(traverseContext);
  }
  function MapBookKeeping(mapResult, keyPrefix, mapFunction, mapContext) {
    this.result = mapResult;
    this.keyPrefix = keyPrefix;
    this.func = mapFunction;
    this.context = mapContext;
    this.count = 0;
  }
  MapBookKeeping.prototype.destructor = function () {
    this.result = null;
    this.keyPrefix = null;
    this.func = null;
    this.context = null;
    this.count = 0;
  };
  PooledClass.addPoolingTo(MapBookKeeping, fourArgumentPooler);
  function mapSingleChildIntoContext(bookKeeping, child, childKey) {
    var result = bookKeeping.result;
    var keyPrefix = bookKeeping.keyPrefix;
    var func = bookKeeping.func;
    var context = bookKeeping.context;
    var mappedChild = func.call(context, child, bookKeeping.count++);
    if (Array.isArray(mappedChild)) {
      mapIntoWithKeyPrefixInternal(mappedChild, result, childKey, emptyFunction.thatReturnsArgument);
    } else if (mappedChild != null) {
      if (ReactElement.isValidElement(mappedChild)) {
        mappedChild = ReactElement.cloneAndReplaceKey(mappedChild, keyPrefix + (mappedChild !== child ? escapeUserProvidedKey(mappedChild.key || '') + '/' : '') + childKey);
      }
      result.push(mappedChild);
    }
  }
  function mapIntoWithKeyPrefixInternal(children, array, prefix, func, context) {
    var escapedPrefix = '';
    if (prefix != null) {
      escapedPrefix = escapeUserProvidedKey(prefix) + '/';
    }
    var traverseContext = MapBookKeeping.getPooled(array, escapedPrefix, func, context);
    traverseAllChildren(children, mapSingleChildIntoContext, traverseContext);
    MapBookKeeping.release(traverseContext);
  }
  function mapChildren(children, func, context) {
    if (children == null) {
      return children;
    }
    var result = [];
    mapIntoWithKeyPrefixInternal(children, result, null, func, context);
    return result;
  }
  function forEachSingleChildDummy(traverseContext, child, name) {
    return null;
  }
  function countChildren(children, context) {
    return traverseAllChildren(children, forEachSingleChildDummy, null);
  }
  function toArray(children) {
    var result = [];
    mapIntoWithKeyPrefixInternal(children, result, null, emptyFunction.thatReturnsArgument);
    return result;
  }
  var ReactChildren = {
    forEach: forEachChildren,
    map: mapChildren,
    mapIntoWithKeyPrefixInternal: mapIntoWithKeyPrefixInternal,
    count: countChildren,
    toArray: toArray
  };
  module.exports = ReactChildren;
});
System.registerDynamic('npm:react@0.14.7/lib/ReactComponent.js', ['npm:react@0.14.7/lib/ReactNoopUpdateQueue.js', 'npm:react@0.14.7/lib/canDefineProperty.js', 'npm:fbjs@0.6.1/lib/emptyObject.js', 'npm:fbjs@0.6.1/lib/invariant.js', 'npm:fbjs@0.6.1/lib/warning.js', 'github:jspm/nodelibs-process@0.1.2.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  (function (process) {
    'use strict';

    var ReactNoopUpdateQueue = $__require('npm:react@0.14.7/lib/ReactNoopUpdateQueue.js');
    var canDefineProperty = $__require('npm:react@0.14.7/lib/canDefineProperty.js');
    var emptyObject = $__require('npm:fbjs@0.6.1/lib/emptyObject.js');
    var invariant = $__require('npm:fbjs@0.6.1/lib/invariant.js');
    var warning = $__require('npm:fbjs@0.6.1/lib/warning.js');
    function ReactComponent(props, context, updater) {
      this.props = props;
      this.context = context;
      this.refs = emptyObject;
      this.updater = updater || ReactNoopUpdateQueue;
    }
    ReactComponent.prototype.isReactComponent = {};
    ReactComponent.prototype.setState = function (partialState, callback) {
      !(typeof partialState === 'object' || typeof partialState === 'function' || partialState == null) ? 'production' !== 'production' ? invariant(false, 'setState(...): takes an object of state variables to update or a ' + 'function which returns an object of state variables.') : invariant(false) : undefined;
      if ('production' !== 'production') {
        'production' !== 'production' ? warning(partialState != null, 'setState(...): You passed an undefined or null state object; ' + 'instead, use forceUpdate().') : undefined;
      }
      this.updater.enqueueSetState(this, partialState);
      if (callback) {
        this.updater.enqueueCallback(this, callback);
      }
    };
    ReactComponent.prototype.forceUpdate = function (callback) {
      this.updater.enqueueForceUpdate(this);
      if (callback) {
        this.updater.enqueueCallback(this, callback);
      }
    };
    if ('production' !== 'production') {
      var deprecatedAPIs = {
        getDOMNode: ['getDOMNode', 'Use ReactDOM.findDOMNode(component) instead.'],
        isMounted: ['isMounted', 'Instead, make sure to clean up subscriptions and pending requests in ' + 'componentWillUnmount to prevent memory leaks.'],
        replaceProps: ['replaceProps', 'Instead, call render again at the top level.'],
        replaceState: ['replaceState', 'Refactor your code to use setState instead (see ' + 'https://github.com/facebook/react/issues/3236).'],
        setProps: ['setProps', 'Instead, call render again at the top level.']
      };
      var defineDeprecationWarning = function (methodName, info) {
        if (canDefineProperty) {
          Object.defineProperty(ReactComponent.prototype, methodName, { get: function () {
              'production' !== 'production' ? warning(false, '%s(...) is deprecated in plain JavaScript React classes. %s', info[0], info[1]) : undefined;
              return undefined;
            } });
        }
      };
      for (var fnName in deprecatedAPIs) {
        if (deprecatedAPIs.hasOwnProperty(fnName)) {
          defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
        }
      }
    }
    module.exports = ReactComponent;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
});
System.registerDynamic('npm:react@0.14.7/lib/ReactNoopUpdateQueue.js', ['npm:fbjs@0.6.1/lib/warning.js', 'github:jspm/nodelibs-process@0.1.2.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  (function (process) {
    'use strict';

    var warning = $__require('npm:fbjs@0.6.1/lib/warning.js');
    function warnTDZ(publicInstance, callerName) {
      if ('production' !== 'production') {
        'production' !== 'production' ? warning(false, '%s(...): Can only update a mounted or mounting component. ' + 'This usually means you called %s() on an unmounted component. ' + 'This is a no-op. Please check the code for the %s component.', callerName, callerName, publicInstance.constructor && publicInstance.constructor.displayName || '') : undefined;
      }
    }
    var ReactNoopUpdateQueue = {
      isMounted: function (publicInstance) {
        return false;
      },
      enqueueCallback: function (publicInstance, callback) {},
      enqueueForceUpdate: function (publicInstance) {
        warnTDZ(publicInstance, 'forceUpdate');
      },
      enqueueReplaceState: function (publicInstance, completeState) {
        warnTDZ(publicInstance, 'replaceState');
      },
      enqueueSetState: function (publicInstance, partialState) {
        warnTDZ(publicInstance, 'setState');
      },
      enqueueSetProps: function (publicInstance, partialProps) {
        warnTDZ(publicInstance, 'setProps');
      },
      enqueueReplaceProps: function (publicInstance, props) {
        warnTDZ(publicInstance, 'replaceProps');
      }
    };
    module.exports = ReactNoopUpdateQueue;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
});
System.registerDynamic('npm:fbjs@0.6.1/lib/emptyObject.js', ['github:jspm/nodelibs-process@0.1.2.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  (function (process) {
    'use strict';

    var emptyObject = {};
    if ('production' !== 'production') {
      Object.freeze(emptyObject);
    }
    module.exports = emptyObject;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
});
System.registerDynamic("npm:fbjs@0.6.1/lib/keyOf.js", [], true, function ($__require, exports, module) {
  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule keyOf
   */

  /**
   * Allows extraction of a minified key. Let's the build system minify keys
   * without losing the ability to dynamically use key strings as values
   * themselves. Pass in an object with a single key/val pair and it will return
   * you the string key of that single record. Suppose you want to grab the
   * value for a key 'className' inside of an object. Key/val minification may
   * have aliased that key to be 'xa12'. keyOf({className: null}) will return
   * 'xa12' in that case. Resolve keys you want to use once at startup time, then
   * reuse those resolutions.
   */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var keyOf = function (oneKeyObj) {
    var key;
    for (key in oneKeyObj) {
      if (!oneKeyObj.hasOwnProperty(key)) {
        continue;
      }
      return key;
    }
    return null;
  };

  module.exports = keyOf;
});
System.registerDynamic('npm:react@0.14.7/lib/ReactClass.js', ['npm:react@0.14.7/lib/ReactComponent.js', 'npm:react@0.14.7/lib/ReactElement.js', 'npm:react@0.14.7/lib/ReactPropTypeLocations.js', 'npm:react@0.14.7/lib/ReactPropTypeLocationNames.js', 'npm:react@0.14.7/lib/ReactNoopUpdateQueue.js', 'npm:react@0.14.7/lib/Object.assign.js', 'npm:fbjs@0.6.1/lib/emptyObject.js', 'npm:fbjs@0.6.1/lib/invariant.js', 'npm:fbjs@0.6.1/lib/keyMirror.js', 'npm:fbjs@0.6.1/lib/keyOf.js', 'npm:fbjs@0.6.1/lib/warning.js', 'github:jspm/nodelibs-process@0.1.2.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  (function (process) {
    'use strict';

    var ReactComponent = $__require('npm:react@0.14.7/lib/ReactComponent.js');
    var ReactElement = $__require('npm:react@0.14.7/lib/ReactElement.js');
    var ReactPropTypeLocations = $__require('npm:react@0.14.7/lib/ReactPropTypeLocations.js');
    var ReactPropTypeLocationNames = $__require('npm:react@0.14.7/lib/ReactPropTypeLocationNames.js');
    var ReactNoopUpdateQueue = $__require('npm:react@0.14.7/lib/ReactNoopUpdateQueue.js');
    var assign = $__require('npm:react@0.14.7/lib/Object.assign.js');
    var emptyObject = $__require('npm:fbjs@0.6.1/lib/emptyObject.js');
    var invariant = $__require('npm:fbjs@0.6.1/lib/invariant.js');
    var keyMirror = $__require('npm:fbjs@0.6.1/lib/keyMirror.js');
    var keyOf = $__require('npm:fbjs@0.6.1/lib/keyOf.js');
    var warning = $__require('npm:fbjs@0.6.1/lib/warning.js');
    var MIXINS_KEY = keyOf({ mixins: null });
    var SpecPolicy = keyMirror({
      DEFINE_ONCE: null,
      DEFINE_MANY: null,
      OVERRIDE_BASE: null,
      DEFINE_MANY_MERGED: null
    });
    var injectedMixins = [];
    var warnedSetProps = false;
    function warnSetProps() {
      if (!warnedSetProps) {
        warnedSetProps = true;
        'production' !== 'production' ? warning(false, 'setProps(...) and replaceProps(...) are deprecated. ' + 'Instead, call render again at the top level.') : undefined;
      }
    }
    var ReactClassInterface = {
      mixins: SpecPolicy.DEFINE_MANY,
      statics: SpecPolicy.DEFINE_MANY,
      propTypes: SpecPolicy.DEFINE_MANY,
      contextTypes: SpecPolicy.DEFINE_MANY,
      childContextTypes: SpecPolicy.DEFINE_MANY,
      getDefaultProps: SpecPolicy.DEFINE_MANY_MERGED,
      getInitialState: SpecPolicy.DEFINE_MANY_MERGED,
      getChildContext: SpecPolicy.DEFINE_MANY_MERGED,
      render: SpecPolicy.DEFINE_ONCE,
      componentWillMount: SpecPolicy.DEFINE_MANY,
      componentDidMount: SpecPolicy.DEFINE_MANY,
      componentWillReceiveProps: SpecPolicy.DEFINE_MANY,
      shouldComponentUpdate: SpecPolicy.DEFINE_ONCE,
      componentWillUpdate: SpecPolicy.DEFINE_MANY,
      componentDidUpdate: SpecPolicy.DEFINE_MANY,
      componentWillUnmount: SpecPolicy.DEFINE_MANY,
      updateComponent: SpecPolicy.OVERRIDE_BASE
    };
    var RESERVED_SPEC_KEYS = {
      displayName: function (Constructor, displayName) {
        Constructor.displayName = displayName;
      },
      mixins: function (Constructor, mixins) {
        if (mixins) {
          for (var i = 0; i < mixins.length; i++) {
            mixSpecIntoComponent(Constructor, mixins[i]);
          }
        }
      },
      childContextTypes: function (Constructor, childContextTypes) {
        if ('production' !== 'production') {
          validateTypeDef(Constructor, childContextTypes, ReactPropTypeLocations.childContext);
        }
        Constructor.childContextTypes = assign({}, Constructor.childContextTypes, childContextTypes);
      },
      contextTypes: function (Constructor, contextTypes) {
        if ('production' !== 'production') {
          validateTypeDef(Constructor, contextTypes, ReactPropTypeLocations.context);
        }
        Constructor.contextTypes = assign({}, Constructor.contextTypes, contextTypes);
      },
      getDefaultProps: function (Constructor, getDefaultProps) {
        if (Constructor.getDefaultProps) {
          Constructor.getDefaultProps = createMergedResultFunction(Constructor.getDefaultProps, getDefaultProps);
        } else {
          Constructor.getDefaultProps = getDefaultProps;
        }
      },
      propTypes: function (Constructor, propTypes) {
        if ('production' !== 'production') {
          validateTypeDef(Constructor, propTypes, ReactPropTypeLocations.prop);
        }
        Constructor.propTypes = assign({}, Constructor.propTypes, propTypes);
      },
      statics: function (Constructor, statics) {
        mixStaticSpecIntoComponent(Constructor, statics);
      },
      autobind: function () {}
    };
    function validateTypeDef(Constructor, typeDef, location) {
      for (var propName in typeDef) {
        if (typeDef.hasOwnProperty(propName)) {
          'production' !== 'production' ? warning(typeof typeDef[propName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'React.PropTypes.', Constructor.displayName || 'ReactClass', ReactPropTypeLocationNames[location], propName) : undefined;
        }
      }
    }
    function validateMethodOverride(proto, name) {
      var specPolicy = ReactClassInterface.hasOwnProperty(name) ? ReactClassInterface[name] : null;
      if (ReactClassMixin.hasOwnProperty(name)) {
        !(specPolicy === SpecPolicy.OVERRIDE_BASE) ? 'production' !== 'production' ? invariant(false, 'ReactClassInterface: You are attempting to override ' + '`%s` from your class specification. Ensure that your method names ' + 'do not overlap with React methods.', name) : invariant(false) : undefined;
      }
      if (proto.hasOwnProperty(name)) {
        !(specPolicy === SpecPolicy.DEFINE_MANY || specPolicy === SpecPolicy.DEFINE_MANY_MERGED) ? 'production' !== 'production' ? invariant(false, 'ReactClassInterface: You are attempting to define ' + '`%s` on your component more than once. This conflict may be due ' + 'to a mixin.', name) : invariant(false) : undefined;
      }
    }
    function mixSpecIntoComponent(Constructor, spec) {
      if (!spec) {
        return;
      }
      !(typeof spec !== 'function') ? 'production' !== 'production' ? invariant(false, 'ReactClass: You\'re attempting to ' + 'use a component class as a mixin. Instead, just use a regular object.') : invariant(false) : undefined;
      !!ReactElement.isValidElement(spec) ? 'production' !== 'production' ? invariant(false, 'ReactClass: You\'re attempting to ' + 'use a component as a mixin. Instead, just use a regular object.') : invariant(false) : undefined;
      var proto = Constructor.prototype;
      if (spec.hasOwnProperty(MIXINS_KEY)) {
        RESERVED_SPEC_KEYS.mixins(Constructor, spec.mixins);
      }
      for (var name in spec) {
        if (!spec.hasOwnProperty(name)) {
          continue;
        }
        if (name === MIXINS_KEY) {
          continue;
        }
        var property = spec[name];
        validateMethodOverride(proto, name);
        if (RESERVED_SPEC_KEYS.hasOwnProperty(name)) {
          RESERVED_SPEC_KEYS[name](Constructor, property);
        } else {
          var isReactClassMethod = ReactClassInterface.hasOwnProperty(name);
          var isAlreadyDefined = proto.hasOwnProperty(name);
          var isFunction = typeof property === 'function';
          var shouldAutoBind = isFunction && !isReactClassMethod && !isAlreadyDefined && spec.autobind !== false;
          if (shouldAutoBind) {
            if (!proto.__reactAutoBindMap) {
              proto.__reactAutoBindMap = {};
            }
            proto.__reactAutoBindMap[name] = property;
            proto[name] = property;
          } else {
            if (isAlreadyDefined) {
              var specPolicy = ReactClassInterface[name];
              !(isReactClassMethod && (specPolicy === SpecPolicy.DEFINE_MANY_MERGED || specPolicy === SpecPolicy.DEFINE_MANY)) ? 'production' !== 'production' ? invariant(false, 'ReactClass: Unexpected spec policy %s for key %s ' + 'when mixing in component specs.', specPolicy, name) : invariant(false) : undefined;
              if (specPolicy === SpecPolicy.DEFINE_MANY_MERGED) {
                proto[name] = createMergedResultFunction(proto[name], property);
              } else if (specPolicy === SpecPolicy.DEFINE_MANY) {
                proto[name] = createChainedFunction(proto[name], property);
              }
            } else {
              proto[name] = property;
              if ('production' !== 'production') {
                if (typeof property === 'function' && spec.displayName) {
                  proto[name].displayName = spec.displayName + '_' + name;
                }
              }
            }
          }
        }
      }
    }
    function mixStaticSpecIntoComponent(Constructor, statics) {
      if (!statics) {
        return;
      }
      for (var name in statics) {
        var property = statics[name];
        if (!statics.hasOwnProperty(name)) {
          continue;
        }
        var isReserved = name in RESERVED_SPEC_KEYS;
        !!isReserved ? 'production' !== 'production' ? invariant(false, 'ReactClass: You are attempting to define a reserved ' + 'property, `%s`, that shouldn\'t be on the "statics" key. Define it ' + 'as an instance property instead; it will still be accessible on the ' + 'constructor.', name) : invariant(false) : undefined;
        var isInherited = name in Constructor;
        !!isInherited ? 'production' !== 'production' ? invariant(false, 'ReactClass: You are attempting to define ' + '`%s` on your component more than once. This conflict may be ' + 'due to a mixin.', name) : invariant(false) : undefined;
        Constructor[name] = property;
      }
    }
    function mergeIntoWithNoDuplicateKeys(one, two) {
      !(one && two && typeof one === 'object' && typeof two === 'object') ? 'production' !== 'production' ? invariant(false, 'mergeIntoWithNoDuplicateKeys(): Cannot merge non-objects.') : invariant(false) : undefined;
      for (var key in two) {
        if (two.hasOwnProperty(key)) {
          !(one[key] === undefined) ? 'production' !== 'production' ? invariant(false, 'mergeIntoWithNoDuplicateKeys(): ' + 'Tried to merge two objects with the same key: `%s`. This conflict ' + 'may be due to a mixin; in particular, this may be caused by two ' + 'getInitialState() or getDefaultProps() methods returning objects ' + 'with clashing keys.', key) : invariant(false) : undefined;
          one[key] = two[key];
        }
      }
      return one;
    }
    function createMergedResultFunction(one, two) {
      return function mergedResult() {
        var a = one.apply(this, arguments);
        var b = two.apply(this, arguments);
        if (a == null) {
          return b;
        } else if (b == null) {
          return a;
        }
        var c = {};
        mergeIntoWithNoDuplicateKeys(c, a);
        mergeIntoWithNoDuplicateKeys(c, b);
        return c;
      };
    }
    function createChainedFunction(one, two) {
      return function chainedFunction() {
        one.apply(this, arguments);
        two.apply(this, arguments);
      };
    }
    function bindAutoBindMethod(component, method) {
      var boundMethod = method.bind(component);
      if ('production' !== 'production') {
        boundMethod.__reactBoundContext = component;
        boundMethod.__reactBoundMethod = method;
        boundMethod.__reactBoundArguments = null;
        var componentName = component.constructor.displayName;
        var _bind = boundMethod.bind;
        boundMethod.bind = function (newThis) {
          for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
          }
          if (newThis !== component && newThis !== null) {
            'production' !== 'production' ? warning(false, 'bind(): React component methods may only be bound to the ' + 'component instance. See %s', componentName) : undefined;
          } else if (!args.length) {
            'production' !== 'production' ? warning(false, 'bind(): You are binding a component method to the component. ' + 'React does this for you automatically in a high-performance ' + 'way, so you can safely remove this call. See %s', componentName) : undefined;
            return boundMethod;
          }
          var reboundMethod = _bind.apply(boundMethod, arguments);
          reboundMethod.__reactBoundContext = component;
          reboundMethod.__reactBoundMethod = method;
          reboundMethod.__reactBoundArguments = args;
          return reboundMethod;
        };
      }
      return boundMethod;
    }
    function bindAutoBindMethods(component) {
      for (var autoBindKey in component.__reactAutoBindMap) {
        if (component.__reactAutoBindMap.hasOwnProperty(autoBindKey)) {
          var method = component.__reactAutoBindMap[autoBindKey];
          component[autoBindKey] = bindAutoBindMethod(component, method);
        }
      }
    }
    var ReactClassMixin = {
      replaceState: function (newState, callback) {
        this.updater.enqueueReplaceState(this, newState);
        if (callback) {
          this.updater.enqueueCallback(this, callback);
        }
      },
      isMounted: function () {
        return this.updater.isMounted(this);
      },
      setProps: function (partialProps, callback) {
        if ('production' !== 'production') {
          warnSetProps();
        }
        this.updater.enqueueSetProps(this, partialProps);
        if (callback) {
          this.updater.enqueueCallback(this, callback);
        }
      },
      replaceProps: function (newProps, callback) {
        if ('production' !== 'production') {
          warnSetProps();
        }
        this.updater.enqueueReplaceProps(this, newProps);
        if (callback) {
          this.updater.enqueueCallback(this, callback);
        }
      }
    };
    var ReactClassComponent = function () {};
    assign(ReactClassComponent.prototype, ReactComponent.prototype, ReactClassMixin);
    var ReactClass = {
      createClass: function (spec) {
        var Constructor = function (props, context, updater) {
          if ('production' !== 'production') {
            'production' !== 'production' ? warning(this instanceof Constructor, 'Something is calling a React component directly. Use a factory or ' + 'JSX instead. See: https://fb.me/react-legacyfactory') : undefined;
          }
          if (this.__reactAutoBindMap) {
            bindAutoBindMethods(this);
          }
          this.props = props;
          this.context = context;
          this.refs = emptyObject;
          this.updater = updater || ReactNoopUpdateQueue;
          this.state = null;
          var initialState = this.getInitialState ? this.getInitialState() : null;
          if ('production' !== 'production') {
            if (typeof initialState === 'undefined' && this.getInitialState._isMockFunction) {
              initialState = null;
            }
          }
          !(typeof initialState === 'object' && !Array.isArray(initialState)) ? 'production' !== 'production' ? invariant(false, '%s.getInitialState(): must return an object or null', Constructor.displayName || 'ReactCompositeComponent') : invariant(false) : undefined;
          this.state = initialState;
        };
        Constructor.prototype = new ReactClassComponent();
        Constructor.prototype.constructor = Constructor;
        injectedMixins.forEach(mixSpecIntoComponent.bind(null, Constructor));
        mixSpecIntoComponent(Constructor, spec);
        if (Constructor.getDefaultProps) {
          Constructor.defaultProps = Constructor.getDefaultProps();
        }
        if ('production' !== 'production') {
          if (Constructor.getDefaultProps) {
            Constructor.getDefaultProps.isReactClassApproved = {};
          }
          if (Constructor.prototype.getInitialState) {
            Constructor.prototype.getInitialState.isReactClassApproved = {};
          }
        }
        !Constructor.prototype.render ? 'production' !== 'production' ? invariant(false, 'createClass(...): Class specification must implement a `render` method.') : invariant(false) : undefined;
        if ('production' !== 'production') {
          'production' !== 'production' ? warning(!Constructor.prototype.componentShouldUpdate, '%s has a method called ' + 'componentShouldUpdate(). Did you mean shouldComponentUpdate()? ' + 'The name is phrased as a question because the function is ' + 'expected to return a value.', spec.displayName || 'A component') : undefined;
          'production' !== 'production' ? warning(!Constructor.prototype.componentWillRecieveProps, '%s has a method called ' + 'componentWillRecieveProps(). Did you mean componentWillReceiveProps()?', spec.displayName || 'A component') : undefined;
        }
        for (var methodName in ReactClassInterface) {
          if (!Constructor.prototype[methodName]) {
            Constructor.prototype[methodName] = null;
          }
        }
        return Constructor;
      },
      injection: { injectMixin: function (mixin) {
          injectedMixins.push(mixin);
        } }
    };
    module.exports = ReactClass;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
});
System.registerDynamic('npm:fbjs@0.6.1/lib/mapObject.js', [], true, function ($__require, exports, module) {
  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule mapObject
   */

  'use strict';

  var global = this || self,
      GLOBAL = global;
  var hasOwnProperty = Object.prototype.hasOwnProperty;

  /**
   * Executes the provided `callback` once for each enumerable own property in the
   * object and constructs a new object from the results. The `callback` is
   * invoked with three arguments:
   *
   *  - the property value
   *  - the property name
   *  - the object being traversed
   *
   * Properties that are added after the call to `mapObject` will not be visited
   * by `callback`. If the values of existing properties are changed, the value
   * passed to `callback` will be the value at the time `mapObject` visits them.
   * Properties that are deleted before being visited are not visited.
   *
   * @grep function objectMap()
   * @grep function objMap()
   *
   * @param {?object} object
   * @param {function} callback
   * @param {*} context
   * @return {?object}
   */
  function mapObject(object, callback, context) {
    if (!object) {
      return null;
    }
    var result = {};
    for (var name in object) {
      if (hasOwnProperty.call(object, name)) {
        result[name] = callback.call(context, object[name], name, object);
      }
    }
    return result;
  }

  module.exports = mapObject;
});
System.registerDynamic('npm:react@0.14.7/lib/ReactDOMFactories.js', ['npm:react@0.14.7/lib/ReactElement.js', 'npm:react@0.14.7/lib/ReactElementValidator.js', 'npm:fbjs@0.6.1/lib/mapObject.js', 'github:jspm/nodelibs-process@0.1.2.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  (function (process) {
    'use strict';

    var ReactElement = $__require('npm:react@0.14.7/lib/ReactElement.js');
    var ReactElementValidator = $__require('npm:react@0.14.7/lib/ReactElementValidator.js');
    var mapObject = $__require('npm:fbjs@0.6.1/lib/mapObject.js');
    function createDOMFactory(tag) {
      if ('production' !== 'production') {
        return ReactElementValidator.createFactory(tag);
      }
      return ReactElement.createFactory(tag);
    }
    var ReactDOMFactories = mapObject({
      a: 'a',
      abbr: 'abbr',
      address: 'address',
      area: 'area',
      article: 'article',
      aside: 'aside',
      audio: 'audio',
      b: 'b',
      base: 'base',
      bdi: 'bdi',
      bdo: 'bdo',
      big: 'big',
      blockquote: 'blockquote',
      body: 'body',
      br: 'br',
      button: 'button',
      canvas: 'canvas',
      caption: 'caption',
      cite: 'cite',
      code: 'code',
      col: 'col',
      colgroup: 'colgroup',
      data: 'data',
      datalist: 'datalist',
      dd: 'dd',
      del: 'del',
      details: 'details',
      dfn: 'dfn',
      dialog: 'dialog',
      div: 'div',
      dl: 'dl',
      dt: 'dt',
      em: 'em',
      embed: 'embed',
      fieldset: 'fieldset',
      figcaption: 'figcaption',
      figure: 'figure',
      footer: 'footer',
      form: 'form',
      h1: 'h1',
      h2: 'h2',
      h3: 'h3',
      h4: 'h4',
      h5: 'h5',
      h6: 'h6',
      head: 'head',
      header: 'header',
      hgroup: 'hgroup',
      hr: 'hr',
      html: 'html',
      i: 'i',
      iframe: 'iframe',
      img: 'img',
      input: 'input',
      ins: 'ins',
      kbd: 'kbd',
      keygen: 'keygen',
      label: 'label',
      legend: 'legend',
      li: 'li',
      link: 'link',
      main: 'main',
      map: 'map',
      mark: 'mark',
      menu: 'menu',
      menuitem: 'menuitem',
      meta: 'meta',
      meter: 'meter',
      nav: 'nav',
      noscript: 'noscript',
      object: 'object',
      ol: 'ol',
      optgroup: 'optgroup',
      option: 'option',
      output: 'output',
      p: 'p',
      param: 'param',
      picture: 'picture',
      pre: 'pre',
      progress: 'progress',
      q: 'q',
      rp: 'rp',
      rt: 'rt',
      ruby: 'ruby',
      s: 's',
      samp: 'samp',
      script: 'script',
      section: 'section',
      select: 'select',
      small: 'small',
      source: 'source',
      span: 'span',
      strong: 'strong',
      style: 'style',
      sub: 'sub',
      summary: 'summary',
      sup: 'sup',
      table: 'table',
      tbody: 'tbody',
      td: 'td',
      textarea: 'textarea',
      tfoot: 'tfoot',
      th: 'th',
      thead: 'thead',
      time: 'time',
      title: 'title',
      tr: 'tr',
      track: 'track',
      u: 'u',
      ul: 'ul',
      'var': 'var',
      video: 'video',
      wbr: 'wbr',
      circle: 'circle',
      clipPath: 'clipPath',
      defs: 'defs',
      ellipse: 'ellipse',
      g: 'g',
      image: 'image',
      line: 'line',
      linearGradient: 'linearGradient',
      mask: 'mask',
      path: 'path',
      pattern: 'pattern',
      polygon: 'polygon',
      polyline: 'polyline',
      radialGradient: 'radialGradient',
      rect: 'rect',
      stop: 'stop',
      svg: 'svg',
      text: 'text',
      tspan: 'tspan'
    }, createDOMFactory);
    module.exports = ReactDOMFactories;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
});
System.registerDynamic('npm:fbjs@0.6.1/lib/keyMirror.js', ['npm:fbjs@0.6.1/lib/invariant.js', 'github:jspm/nodelibs-process@0.1.2.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  (function (process) {
    'use strict';

    var invariant = $__require('npm:fbjs@0.6.1/lib/invariant.js');
    var keyMirror = function (obj) {
      var ret = {};
      var key;
      !(obj instanceof Object && !Array.isArray(obj)) ? 'production' !== 'production' ? invariant(false, 'keyMirror(...): Argument must be an object.') : invariant(false) : undefined;
      for (key in obj) {
        if (!obj.hasOwnProperty(key)) {
          continue;
        }
        ret[key] = key;
      }
      return ret;
    };
    module.exports = keyMirror;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
});
System.registerDynamic('npm:react@0.14.7/lib/ReactPropTypeLocations.js', ['npm:fbjs@0.6.1/lib/keyMirror.js'], true, function ($__require, exports, module) {
  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule ReactPropTypeLocations
   */

  'use strict';

  var global = this || self,
      GLOBAL = global;
  var keyMirror = $__require('npm:fbjs@0.6.1/lib/keyMirror.js');

  var ReactPropTypeLocations = keyMirror({
    prop: null,
    context: null,
    childContext: null
  });

  module.exports = ReactPropTypeLocations;
});
System.registerDynamic('npm:react@0.14.7/lib/ReactElementValidator.js', ['npm:react@0.14.7/lib/ReactElement.js', 'npm:react@0.14.7/lib/ReactPropTypeLocations.js', 'npm:react@0.14.7/lib/ReactPropTypeLocationNames.js', 'npm:react@0.14.7/lib/ReactCurrentOwner.js', 'npm:react@0.14.7/lib/canDefineProperty.js', 'npm:react@0.14.7/lib/getIteratorFn.js', 'npm:fbjs@0.6.1/lib/invariant.js', 'npm:fbjs@0.6.1/lib/warning.js', 'github:jspm/nodelibs-process@0.1.2.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  (function (process) {
    'use strict';

    var ReactElement = $__require('npm:react@0.14.7/lib/ReactElement.js');
    var ReactPropTypeLocations = $__require('npm:react@0.14.7/lib/ReactPropTypeLocations.js');
    var ReactPropTypeLocationNames = $__require('npm:react@0.14.7/lib/ReactPropTypeLocationNames.js');
    var ReactCurrentOwner = $__require('npm:react@0.14.7/lib/ReactCurrentOwner.js');
    var canDefineProperty = $__require('npm:react@0.14.7/lib/canDefineProperty.js');
    var getIteratorFn = $__require('npm:react@0.14.7/lib/getIteratorFn.js');
    var invariant = $__require('npm:fbjs@0.6.1/lib/invariant.js');
    var warning = $__require('npm:fbjs@0.6.1/lib/warning.js');
    function getDeclarationErrorAddendum() {
      if (ReactCurrentOwner.current) {
        var name = ReactCurrentOwner.current.getName();
        if (name) {
          return ' Check the render method of `' + name + '`.';
        }
      }
      return '';
    }
    var ownerHasKeyUseWarning = {};
    var loggedTypeFailures = {};
    function validateExplicitKey(element, parentType) {
      if (!element._store || element._store.validated || element.key != null) {
        return;
      }
      element._store.validated = true;
      var addenda = getAddendaForKeyUse('uniqueKey', element, parentType);
      if (addenda === null) {
        return;
      }
      'production' !== 'production' ? warning(false, 'Each child in an array or iterator should have a unique "key" prop.' + '%s%s%s', addenda.parentOrOwner || '', addenda.childOwner || '', addenda.url || '') : undefined;
    }
    function getAddendaForKeyUse(messageType, element, parentType) {
      var addendum = getDeclarationErrorAddendum();
      if (!addendum) {
        var parentName = typeof parentType === 'string' ? parentType : parentType.displayName || parentType.name;
        if (parentName) {
          addendum = ' Check the top-level render call using <' + parentName + '>.';
        }
      }
      var memoizer = ownerHasKeyUseWarning[messageType] || (ownerHasKeyUseWarning[messageType] = {});
      if (memoizer[addendum]) {
        return null;
      }
      memoizer[addendum] = true;
      var addenda = {
        parentOrOwner: addendum,
        url: ' See https://fb.me/react-warning-keys for more information.',
        childOwner: null
      };
      if (element && element._owner && element._owner !== ReactCurrentOwner.current) {
        addenda.childOwner = ' It was passed a child from ' + element._owner.getName() + '.';
      }
      return addenda;
    }
    function validateChildKeys(node, parentType) {
      if (typeof node !== 'object') {
        return;
      }
      if (Array.isArray(node)) {
        for (var i = 0; i < node.length; i++) {
          var child = node[i];
          if (ReactElement.isValidElement(child)) {
            validateExplicitKey(child, parentType);
          }
        }
      } else if (ReactElement.isValidElement(node)) {
        if (node._store) {
          node._store.validated = true;
        }
      } else if (node) {
        var iteratorFn = getIteratorFn(node);
        if (iteratorFn) {
          if (iteratorFn !== node.entries) {
            var iterator = iteratorFn.call(node);
            var step;
            while (!(step = iterator.next()).done) {
              if (ReactElement.isValidElement(step.value)) {
                validateExplicitKey(step.value, parentType);
              }
            }
          }
        }
      }
    }
    function checkPropTypes(componentName, propTypes, props, location) {
      for (var propName in propTypes) {
        if (propTypes.hasOwnProperty(propName)) {
          var error;
          try {
            !(typeof propTypes[propName] === 'function') ? 'production' !== 'production' ? invariant(false, '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'React.PropTypes.', componentName || 'React class', ReactPropTypeLocationNames[location], propName) : invariant(false) : undefined;
            error = propTypes[propName](props, propName, componentName, location);
          } catch (ex) {
            error = ex;
          }
          'production' !== 'production' ? warning(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', ReactPropTypeLocationNames[location], propName, typeof error) : undefined;
          if (error instanceof Error && !(error.message in loggedTypeFailures)) {
            loggedTypeFailures[error.message] = true;
            var addendum = getDeclarationErrorAddendum();
            'production' !== 'production' ? warning(false, 'Failed propType: %s%s', error.message, addendum) : undefined;
          }
        }
      }
    }
    function validatePropTypes(element) {
      var componentClass = element.type;
      if (typeof componentClass !== 'function') {
        return;
      }
      var name = componentClass.displayName || componentClass.name;
      if (componentClass.propTypes) {
        checkPropTypes(name, componentClass.propTypes, element.props, ReactPropTypeLocations.prop);
      }
      if (typeof componentClass.getDefaultProps === 'function') {
        'production' !== 'production' ? warning(componentClass.getDefaultProps.isReactClassApproved, 'getDefaultProps is only used on classic React.createClass ' + 'definitions. Use a static property named `defaultProps` instead.') : undefined;
      }
    }
    var ReactElementValidator = {
      createElement: function (type, props, children) {
        var validType = typeof type === 'string' || typeof type === 'function';
        'production' !== 'production' ? warning(validType, 'React.createElement: type should not be null, undefined, boolean, or ' + 'number. It should be a string (for DOM elements) or a ReactClass ' + '(for composite components).%s', getDeclarationErrorAddendum()) : undefined;
        var element = ReactElement.createElement.apply(this, arguments);
        if (element == null) {
          return element;
        }
        if (validType) {
          for (var i = 2; i < arguments.length; i++) {
            validateChildKeys(arguments[i], type);
          }
        }
        validatePropTypes(element);
        return element;
      },
      createFactory: function (type) {
        var validatedFactory = ReactElementValidator.createElement.bind(null, type);
        validatedFactory.type = type;
        if ('production' !== 'production') {
          if (canDefineProperty) {
            Object.defineProperty(validatedFactory, 'type', {
              enumerable: false,
              get: function () {
                'production' !== 'production' ? warning(false, 'Factory.type is deprecated. Access the class directly ' + 'before passing it to createFactory.') : undefined;
                Object.defineProperty(this, 'type', { value: type });
                return type;
              }
            });
          }
        }
        return validatedFactory;
      },
      cloneElement: function (element, props, children) {
        var newElement = ReactElement.cloneElement.apply(this, arguments);
        for (var i = 2; i < arguments.length; i++) {
          validateChildKeys(arguments[i], newElement.type);
        }
        validatePropTypes(newElement);
        return newElement;
      }
    };
    module.exports = ReactElementValidator;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
});
System.registerDynamic('npm:react@0.14.7/lib/ReactPropTypeLocationNames.js', ['github:jspm/nodelibs-process@0.1.2.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  (function (process) {
    'use strict';

    var ReactPropTypeLocationNames = {};
    if ('production' !== 'production') {
      ReactPropTypeLocationNames = {
        prop: 'prop',
        context: 'context',
        childContext: 'child context'
      };
    }
    module.exports = ReactPropTypeLocationNames;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
});
System.registerDynamic('npm:react@0.14.7/lib/getIteratorFn.js', [], true, function ($__require, exports, module) {
  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule getIteratorFn
   * @typechecks static-only
   */

  'use strict';

  /* global Symbol */

  var global = this || self,
      GLOBAL = global;
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  module.exports = getIteratorFn;
});
System.registerDynamic('npm:react@0.14.7/lib/ReactPropTypes.js', ['npm:react@0.14.7/lib/ReactElement.js', 'npm:react@0.14.7/lib/ReactPropTypeLocationNames.js', 'npm:fbjs@0.6.1/lib/emptyFunction.js', 'npm:react@0.14.7/lib/getIteratorFn.js'], true, function ($__require, exports, module) {
  /* */
  'use strict';

  var global = this || self,
      GLOBAL = global;
  var ReactElement = $__require('npm:react@0.14.7/lib/ReactElement.js');
  var ReactPropTypeLocationNames = $__require('npm:react@0.14.7/lib/ReactPropTypeLocationNames.js');
  var emptyFunction = $__require('npm:fbjs@0.6.1/lib/emptyFunction.js');
  var getIteratorFn = $__require('npm:react@0.14.7/lib/getIteratorFn.js');
  var ANONYMOUS = '<<anonymous>>';
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker
  };
  function createChainableTypeChecker(validate) {
    function checkType(isRequired, props, propName, componentName, location, propFullName) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;
      if (props[propName] == null) {
        var locationName = ReactPropTypeLocationNames[location];
        if (isRequired) {
          return new Error('Required ' + locationName + ' `' + propFullName + '` was not specified in ' + ('`' + componentName + '`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }
    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);
    return chainedCheckType;
  }
  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        var locationName = ReactPropTypeLocationNames[location];
        var preciseType = getPreciseType(propValue);
        return new Error('Invalid ' + locationName + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }
  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunction.thatReturns(null));
  }
  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var locationName = ReactPropTypeLocationNames[location];
        var propType = getPropType(propValue);
        return new Error('Invalid ' + locationName + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']');
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }
  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!ReactElement.isValidElement(props[propName])) {
        var locationName = ReactPropTypeLocationNames[location];
        return new Error('Invalid ' + locationName + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }
  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var locationName = ReactPropTypeLocationNames[location];
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new Error('Invalid ' + locationName + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }
  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      return createChainableTypeChecker(function () {
        return new Error('Invalid argument supplied to oneOf, expected an instance of array.');
      });
    }
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (propValue === expectedValues[i]) {
          return null;
        }
      }
      var locationName = ReactPropTypeLocationNames[location];
      var valuesString = JSON.stringify(expectedValues);
      return new Error('Invalid ' + locationName + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }
  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        var locationName = ReactPropTypeLocationNames[location];
        return new Error('Invalid ' + locationName + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (propValue.hasOwnProperty(key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }
  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
      return createChainableTypeChecker(function () {
        return new Error('Invalid argument supplied to oneOfType, expected an instance of array.');
      });
    }
    function validate(props, propName, componentName, location, propFullName) {
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        if (checker(props, propName, componentName, location, propFullName) == null) {
          return null;
        }
      }
      var locationName = ReactPropTypeLocationNames[location];
      return new Error('Invalid ' + locationName + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
    }
    return createChainableTypeChecker(validate);
  }
  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        var locationName = ReactPropTypeLocationNames[location];
        return new Error('Invalid ' + locationName + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }
  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        var locationName = ReactPropTypeLocationNames[location];
        return new Error('Invalid ' + locationName + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (!checker) {
          continue;
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }
  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || ReactElement.isValidElement(propValue)) {
          return true;
        }
        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }
        return true;
      default:
        return false;
    }
  }
  function getPropType(propValue) {
    var propType = typeof propValue;
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      return 'object';
    }
    return propType;
  }
  function getPreciseType(propValue) {
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return '<<anonymous>>';
    }
    return propValue.constructor.name;
  }
  module.exports = ReactPropTypes;
});
System.registerDynamic('npm:react@0.14.7/lib/ReactVersion.js', [], true, function ($__require, exports, module) {
  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule ReactVersion
   */

  'use strict';

  var global = this || self,
      GLOBAL = global;
  module.exports = '0.14.7';
});
System.registerDynamic('npm:react@0.14.7/lib/ReactCurrentOwner.js', [], true, function ($__require, exports, module) {
  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule ReactCurrentOwner
   */

  'use strict';

  /**
   * Keeps track of the current owner.
   *
   * The current owner is the component who should own any components that are
   * currently being constructed.
   */

  var global = this || self,
      GLOBAL = global;
  var ReactCurrentOwner = {

    /**
     * @internal
     * @type {ReactComponent}
     */
    current: null

  };

  module.exports = ReactCurrentOwner;
});
System.registerDynamic('npm:react@0.14.7/lib/canDefineProperty.js', ['github:jspm/nodelibs-process@0.1.2.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  (function (process) {
    'use strict';

    var canDefineProperty = false;
    if ('production' !== 'production') {
      try {
        Object.defineProperty({}, 'x', { get: function () {} });
        canDefineProperty = true;
      } catch (x) {}
    }
    module.exports = canDefineProperty;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
});
System.registerDynamic('npm:react@0.14.7/lib/ReactElement.js', ['npm:react@0.14.7/lib/ReactCurrentOwner.js', 'npm:react@0.14.7/lib/Object.assign.js', 'npm:react@0.14.7/lib/canDefineProperty.js', 'github:jspm/nodelibs-process@0.1.2.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  (function (process) {
    'use strict';

    var ReactCurrentOwner = $__require('npm:react@0.14.7/lib/ReactCurrentOwner.js');
    var assign = $__require('npm:react@0.14.7/lib/Object.assign.js');
    var canDefineProperty = $__require('npm:react@0.14.7/lib/canDefineProperty.js');
    var REACT_ELEMENT_TYPE = typeof Symbol === 'function' && Symbol['for'] && Symbol['for']('react.element') || 0xeac7;
    var RESERVED_PROPS = {
      key: true,
      ref: true,
      __self: true,
      __source: true
    };
    var ReactElement = function (type, key, ref, self, source, owner, props) {
      var element = {
        $$typeof: REACT_ELEMENT_TYPE,
        type: type,
        key: key,
        ref: ref,
        props: props,
        _owner: owner
      };
      if ('production' !== 'production') {
        element._store = {};
        if (canDefineProperty) {
          Object.defineProperty(element._store, 'validated', {
            configurable: false,
            enumerable: false,
            writable: true,
            value: false
          });
          Object.defineProperty(element, '_self', {
            configurable: false,
            enumerable: false,
            writable: false,
            value: self
          });
          Object.defineProperty(element, '_source', {
            configurable: false,
            enumerable: false,
            writable: false,
            value: source
          });
        } else {
          element._store.validated = false;
          element._self = self;
          element._source = source;
        }
        Object.freeze(element.props);
        Object.freeze(element);
      }
      return element;
    };
    ReactElement.createElement = function (type, config, children) {
      var propName;
      var props = {};
      var key = null;
      var ref = null;
      var self = null;
      var source = null;
      if (config != null) {
        ref = config.ref === undefined ? null : config.ref;
        key = config.key === undefined ? null : '' + config.key;
        self = config.__self === undefined ? null : config.__self;
        source = config.__source === undefined ? null : config.__source;
        for (propName in config) {
          if (config.hasOwnProperty(propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
            props[propName] = config[propName];
          }
        }
      }
      var childrenLength = arguments.length - 2;
      if (childrenLength === 1) {
        props.children = children;
      } else if (childrenLength > 1) {
        var childArray = Array(childrenLength);
        for (var i = 0; i < childrenLength; i++) {
          childArray[i] = arguments[i + 2];
        }
        props.children = childArray;
      }
      if (type && type.defaultProps) {
        var defaultProps = type.defaultProps;
        for (propName in defaultProps) {
          if (typeof props[propName] === 'undefined') {
            props[propName] = defaultProps[propName];
          }
        }
      }
      return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
    };
    ReactElement.createFactory = function (type) {
      var factory = ReactElement.createElement.bind(null, type);
      factory.type = type;
      return factory;
    };
    ReactElement.cloneAndReplaceKey = function (oldElement, newKey) {
      var newElement = ReactElement(oldElement.type, newKey, oldElement.ref, oldElement._self, oldElement._source, oldElement._owner, oldElement.props);
      return newElement;
    };
    ReactElement.cloneAndReplaceProps = function (oldElement, newProps) {
      var newElement = ReactElement(oldElement.type, oldElement.key, oldElement.ref, oldElement._self, oldElement._source, oldElement._owner, newProps);
      if ('production' !== 'production') {
        newElement._store.validated = oldElement._store.validated;
      }
      return newElement;
    };
    ReactElement.cloneElement = function (element, config, children) {
      var propName;
      var props = assign({}, element.props);
      var key = element.key;
      var ref = element.ref;
      var self = element._self;
      var source = element._source;
      var owner = element._owner;
      if (config != null) {
        if (config.ref !== undefined) {
          ref = config.ref;
          owner = ReactCurrentOwner.current;
        }
        if (config.key !== undefined) {
          key = '' + config.key;
        }
        for (propName in config) {
          if (config.hasOwnProperty(propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
            props[propName] = config[propName];
          }
        }
      }
      var childrenLength = arguments.length - 2;
      if (childrenLength === 1) {
        props.children = children;
      } else if (childrenLength > 1) {
        var childArray = Array(childrenLength);
        for (var i = 0; i < childrenLength; i++) {
          childArray[i] = arguments[i + 2];
        }
        props.children = childArray;
      }
      return ReactElement(element.type, key, ref, self, source, owner, props);
    };
    ReactElement.isValidElement = function (object) {
      return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
    };
    module.exports = ReactElement;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
});
System.registerDynamic('npm:fbjs@0.6.1/lib/invariant.js', ['github:jspm/nodelibs-process@0.1.2.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  (function (process) {
    'use strict';

    function invariant(condition, format, a, b, c, d, e, f) {
      if ('production' !== 'production') {
        if (format === undefined) {
          throw new Error('invariant requires an error message argument');
        }
      }
      if (!condition) {
        var error;
        if (format === undefined) {
          error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
        } else {
          var args = [a, b, c, d, e, f];
          var argIndex = 0;
          error = new Error(format.replace(/%s/g, function () {
            return args[argIndex++];
          }));
          error.name = 'Invariant Violation';
        }
        error.framesToPop = 1;
        throw error;
      }
    }
    module.exports = invariant;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
});
System.registerDynamic('npm:react@0.14.7/lib/onlyChild.js', ['npm:react@0.14.7/lib/ReactElement.js', 'npm:fbjs@0.6.1/lib/invariant.js', 'github:jspm/nodelibs-process@0.1.2.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  (function (process) {
    'use strict';

    var ReactElement = $__require('npm:react@0.14.7/lib/ReactElement.js');
    var invariant = $__require('npm:fbjs@0.6.1/lib/invariant.js');
    function onlyChild(children) {
      !ReactElement.isValidElement(children) ? 'production' !== 'production' ? invariant(false, 'onlyChild must be passed a children with exactly one child.') : invariant(false) : undefined;
      return children;
    }
    module.exports = onlyChild;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
});
System.registerDynamic('npm:react@0.14.7/lib/ReactIsomorphic.js', ['npm:react@0.14.7/lib/ReactChildren.js', 'npm:react@0.14.7/lib/ReactComponent.js', 'npm:react@0.14.7/lib/ReactClass.js', 'npm:react@0.14.7/lib/ReactDOMFactories.js', 'npm:react@0.14.7/lib/ReactElement.js', 'npm:react@0.14.7/lib/ReactElementValidator.js', 'npm:react@0.14.7/lib/ReactPropTypes.js', 'npm:react@0.14.7/lib/ReactVersion.js', 'npm:react@0.14.7/lib/Object.assign.js', 'npm:react@0.14.7/lib/onlyChild.js', 'github:jspm/nodelibs-process@0.1.2.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  (function (process) {
    'use strict';

    var ReactChildren = $__require('npm:react@0.14.7/lib/ReactChildren.js');
    var ReactComponent = $__require('npm:react@0.14.7/lib/ReactComponent.js');
    var ReactClass = $__require('npm:react@0.14.7/lib/ReactClass.js');
    var ReactDOMFactories = $__require('npm:react@0.14.7/lib/ReactDOMFactories.js');
    var ReactElement = $__require('npm:react@0.14.7/lib/ReactElement.js');
    var ReactElementValidator = $__require('npm:react@0.14.7/lib/ReactElementValidator.js');
    var ReactPropTypes = $__require('npm:react@0.14.7/lib/ReactPropTypes.js');
    var ReactVersion = $__require('npm:react@0.14.7/lib/ReactVersion.js');
    var assign = $__require('npm:react@0.14.7/lib/Object.assign.js');
    var onlyChild = $__require('npm:react@0.14.7/lib/onlyChild.js');
    var createElement = ReactElement.createElement;
    var createFactory = ReactElement.createFactory;
    var cloneElement = ReactElement.cloneElement;
    if ('production' !== 'production') {
      createElement = ReactElementValidator.createElement;
      createFactory = ReactElementValidator.createFactory;
      cloneElement = ReactElementValidator.cloneElement;
    }
    var React = {
      Children: {
        map: ReactChildren.map,
        forEach: ReactChildren.forEach,
        count: ReactChildren.count,
        toArray: ReactChildren.toArray,
        only: onlyChild
      },
      Component: ReactComponent,
      createElement: createElement,
      cloneElement: cloneElement,
      isValidElement: ReactElement.isValidElement,
      PropTypes: ReactPropTypes,
      createClass: ReactClass.createClass,
      createFactory: createFactory,
      createMixin: function (mixin) {
        return mixin;
      },
      DOM: ReactDOMFactories,
      version: ReactVersion,
      __spread: assign
    };
    module.exports = React;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
});
System.registerDynamic('npm:react@0.14.7/lib/Object.assign.js', [], true, function ($__require, exports, module) {
  /**
   * Copyright 2014-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule Object.assign
   */

  // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.assign

  'use strict';

  var global = this || self,
      GLOBAL = global;
  function assign(target, sources) {
    if (target == null) {
      throw new TypeError('Object.assign target cannot be null or undefined');
    }

    var to = Object(target);
    var hasOwnProperty = Object.prototype.hasOwnProperty;

    for (var nextIndex = 1; nextIndex < arguments.length; nextIndex++) {
      var nextSource = arguments[nextIndex];
      if (nextSource == null) {
        continue;
      }

      var from = Object(nextSource);

      // We don't currently support accessors nor proxies. Therefore this
      // copy cannot throw. If we ever supported this then we must handle
      // exceptions and side-effects. We don't support symbols so they won't
      // be transferred.

      for (var key in from) {
        if (hasOwnProperty.call(from, key)) {
          to[key] = from[key];
        }
      }
    }

    return to;
  }

  module.exports = assign;
});
System.registerDynamic("npm:fbjs@0.6.1/lib/emptyFunction.js", [], true, function ($__require, exports, module) {
  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule emptyFunction
   */

  "use strict";

  var global = this || self,
      GLOBAL = global;
  function makeEmptyFunction(arg) {
    return function () {
      return arg;
    };
  }

  /**
   * This function accepts and discards inputs; it has no side effects. This is
   * primarily useful idiomatically for overridable function endpoints which
   * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
   */
  function emptyFunction() {}

  emptyFunction.thatReturns = makeEmptyFunction;
  emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
  emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
  emptyFunction.thatReturnsNull = makeEmptyFunction(null);
  emptyFunction.thatReturnsThis = function () {
    return this;
  };
  emptyFunction.thatReturnsArgument = function (arg) {
    return arg;
  };

  module.exports = emptyFunction;
});
System.registerDynamic('npm:fbjs@0.6.1/lib/warning.js', ['npm:fbjs@0.6.1/lib/emptyFunction.js', 'github:jspm/nodelibs-process@0.1.2.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  (function (process) {
    'use strict';

    var emptyFunction = $__require('npm:fbjs@0.6.1/lib/emptyFunction.js');
    var warning = emptyFunction;
    if ('production' !== 'production') {
      warning = function (condition, format) {
        for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
          args[_key - 2] = arguments[_key];
        }
        if (format === undefined) {
          throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
        }
        if (format.indexOf('Failed Composite propType: ') === 0) {
          return;
        }
        if (!condition) {
          var argIndex = 0;
          var message = 'Warning: ' + format.replace(/%s/g, function () {
            return args[argIndex++];
          });
          if (typeof console !== 'undefined') {
            console.error(message);
          }
          try {
            throw new Error(message);
          } catch (x) {}
        }
      };
    }
    module.exports = warning;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
});
System.registerDynamic('npm:react@0.14.7/lib/deprecated.js', ['npm:react@0.14.7/lib/Object.assign.js', 'npm:fbjs@0.6.1/lib/warning.js', 'github:jspm/nodelibs-process@0.1.2.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  (function (process) {
    'use strict';

    var assign = $__require('npm:react@0.14.7/lib/Object.assign.js');
    var warning = $__require('npm:fbjs@0.6.1/lib/warning.js');
    function deprecated(fnName, newModule, newPackage, ctx, fn) {
      var warned = false;
      if ('production' !== 'production') {
        var newFn = function () {
          'production' !== 'production' ? warning(warned, 'React.%s is deprecated. Please use %s.%s from require' + '(\'%s\') ' + 'instead.', fnName, newModule, fnName, newPackage) : undefined;
          warned = true;
          return fn.apply(ctx, arguments);
        };
        return assign(newFn, fn);
      }
      return fn;
    }
    module.exports = deprecated;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
});
System.registerDynamic('npm:react@0.14.7/lib/React.js', ['npm:react@0.14.7/lib/ReactDOM.js', 'npm:react@0.14.7/lib/ReactDOMServer.js', 'npm:react@0.14.7/lib/ReactIsomorphic.js', 'npm:react@0.14.7/lib/Object.assign.js', 'npm:react@0.14.7/lib/deprecated.js'], true, function ($__require, exports, module) {
  /* */
  'use strict';

  var global = this || self,
      GLOBAL = global;
  var ReactDOM = $__require('npm:react@0.14.7/lib/ReactDOM.js');
  var ReactDOMServer = $__require('npm:react@0.14.7/lib/ReactDOMServer.js');
  var ReactIsomorphic = $__require('npm:react@0.14.7/lib/ReactIsomorphic.js');
  var assign = $__require('npm:react@0.14.7/lib/Object.assign.js');
  var deprecated = $__require('npm:react@0.14.7/lib/deprecated.js');
  var React = {};
  assign(React, ReactIsomorphic);
  assign(React, {
    findDOMNode: deprecated('findDOMNode', 'ReactDOM', 'react-dom', ReactDOM, ReactDOM.findDOMNode),
    render: deprecated('render', 'ReactDOM', 'react-dom', ReactDOM, ReactDOM.render),
    unmountComponentAtNode: deprecated('unmountComponentAtNode', 'ReactDOM', 'react-dom', ReactDOM, ReactDOM.unmountComponentAtNode),
    renderToString: deprecated('renderToString', 'ReactDOMServer', 'react-dom/server', ReactDOMServer, ReactDOMServer.renderToString),
    renderToStaticMarkup: deprecated('renderToStaticMarkup', 'ReactDOMServer', 'react-dom/server', ReactDOMServer, ReactDOMServer.renderToStaticMarkup)
  });
  React.__SECRET_DOM_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ReactDOM;
  React.__SECRET_DOM_SERVER_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ReactDOMServer;
  module.exports = React;
});
System.registerDynamic('npm:react@0.14.7/react.js', ['npm:react@0.14.7/lib/React.js'], true, function ($__require, exports, module) {
  /* */
  'use strict';

  var global = this || self,
      GLOBAL = global;
  module.exports = $__require('npm:react@0.14.7/lib/React.js');
});
System.registerDynamic("npm:react@0.14.7.js", ["npm:react@0.14.7/react.js"], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  module.exports = $__require("npm:react@0.14.7/react.js");
});
System.registerDynamic('npm:react-redux@4.4.0/lib/utils/storeShape.js', ['npm:react@0.14.7.js'], true, function ($__require, exports, module) {
  /* */
  'use strict';

  var global = this || self,
      GLOBAL = global;
  exports.__esModule = true;

  var _react = $__require('npm:react@0.14.7.js');

  exports["default"] = _react.PropTypes.shape({
    subscribe: _react.PropTypes.func.isRequired,
    dispatch: _react.PropTypes.func.isRequired,
    getState: _react.PropTypes.func.isRequired
  });
});
System.registerDynamic("npm:react-redux@4.4.0/lib/utils/shallowEqual.js", [], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.__esModule = true;
  exports["default"] = shallowEqual;
  function shallowEqual(objA, objB) {
    if (objA === objB) {
      return true;
    }

    var keysA = Object.keys(objA);
    var keysB = Object.keys(objB);

    if (keysA.length !== keysB.length) {
      return false;
    }

    // Test for A's keys different from B.
    var hasOwn = Object.prototype.hasOwnProperty;
    for (var i = 0; i < keysA.length; i++) {
      if (!hasOwn.call(objB, keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
        return false;
      }
    }

    return true;
  }
});
System.registerDynamic('npm:redux@3.3.1/lib/createStore.js', ['npm:lodash@4.6.1/isPlainObject.js'], true, function ($__require, exports, module) {
  /* */
  'use strict';

  var global = this || self,
      GLOBAL = global;
  exports.__esModule = true;
  exports.ActionTypes = undefined;
  exports["default"] = createStore;

  var _isPlainObject = $__require('npm:lodash@4.6.1/isPlainObject.js');

  var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { "default": obj };
  }

  /**
   * These are private action types reserved by Redux.
   * For any unknown actions, you must return the current state.
   * If the current state is undefined, you must return the initial state.
   * Do not reference these action types directly in your code.
   */
  var ActionTypes = exports.ActionTypes = {
    INIT: '@@redux/INIT'
  };

  /**
   * Creates a Redux store that holds the state tree.
   * The only way to change the data in the store is to call `dispatch()` on it.
   *
   * There should only be a single store in your app. To specify how different
   * parts of the state tree respond to actions, you may combine several reducers
   * into a single reducer function by using `combineReducers`.
   *
   * @param {Function} reducer A function that returns the next state tree, given
   * the current state tree and the action to handle.
   *
   * @param {any} [initialState] The initial state. You may optionally specify it
   * to hydrate the state from the server in universal apps, or to restore a
   * previously serialized user session.
   * If you use `combineReducers` to produce the root reducer function, this must be
   * an object with the same shape as `combineReducers` keys.
   *
   * @param {Function} enhancer The store enhancer. You may optionally specify it
   * to enhance the store with third-party capabilities such as middleware,
   * time travel, persistence, etc. The only store enhancer that ships with Redux
   * is `applyMiddleware()`.
   *
   * @returns {Store} A Redux store that lets you read the state, dispatch actions
   * and subscribe to changes.
   */
  function createStore(reducer, initialState, enhancer) {
    if (typeof initialState === 'function' && typeof enhancer === 'undefined') {
      enhancer = initialState;
      initialState = undefined;
    }

    if (typeof enhancer !== 'undefined') {
      if (typeof enhancer !== 'function') {
        throw new Error('Expected the enhancer to be a function.');
      }

      return enhancer(createStore)(reducer, initialState);
    }

    if (typeof reducer !== 'function') {
      throw new Error('Expected the reducer to be a function.');
    }

    var currentReducer = reducer;
    var currentState = initialState;
    var currentListeners = [];
    var nextListeners = currentListeners;
    var isDispatching = false;

    function ensureCanMutateNextListeners() {
      if (nextListeners === currentListeners) {
        nextListeners = currentListeners.slice();
      }
    }

    /**
     * Reads the state tree managed by the store.
     *
     * @returns {any} The current state tree of your application.
     */
    function getState() {
      return currentState;
    }

    /**
     * Adds a change listener. It will be called any time an action is dispatched,
     * and some part of the state tree may potentially have changed. You may then
     * call `getState()` to read the current state tree inside the callback.
     *
     * You may call `dispatch()` from a change listener, with the following
     * caveats:
     *
     * 1. The subscriptions are snapshotted just before every `dispatch()` call.
     * If you subscribe or unsubscribe while the listeners are being invoked, this
     * will not have any effect on the `dispatch()` that is currently in progress.
     * However, the next `dispatch()` call, whether nested or not, will use a more
     * recent snapshot of the subscription list.
     *
     * 2. The listener should not expect to see all states changes, as the state
     * might have been updated multiple times during a nested `dispatch()` before
     * the listener is called. It is, however, guaranteed that all subscribers
     * registered before the `dispatch()` started will be called with the latest
     * state by the time it exits.
     *
     * @param {Function} listener A callback to be invoked on every dispatch.
     * @returns {Function} A function to remove this change listener.
     */
    function subscribe(listener) {
      if (typeof listener !== 'function') {
        throw new Error('Expected listener to be a function.');
      }

      var isSubscribed = true;

      ensureCanMutateNextListeners();
      nextListeners.push(listener);

      return function unsubscribe() {
        if (!isSubscribed) {
          return;
        }

        isSubscribed = false;

        ensureCanMutateNextListeners();
        var index = nextListeners.indexOf(listener);
        nextListeners.splice(index, 1);
      };
    }

    /**
     * Dispatches an action. It is the only way to trigger a state change.
     *
     * The `reducer` function, used to create the store, will be called with the
     * current state tree and the given `action`. Its return value will
     * be considered the **next** state of the tree, and the change listeners
     * will be notified.
     *
     * The base implementation only supports plain object actions. If you want to
     * dispatch a Promise, an Observable, a thunk, or something else, you need to
     * wrap your store creating function into the corresponding middleware. For
     * example, see the documentation for the `redux-thunk` package. Even the
     * middleware will eventually dispatch plain object actions using this method.
     *
     * @param {Object} action A plain object representing “what changed”. It is
     * a good idea to keep actions serializable so you can record and replay user
     * sessions, or use the time travelling `redux-devtools`. An action must have
     * a `type` property which may not be `undefined`. It is a good idea to use
     * string constants for action types.
     *
     * @returns {Object} For convenience, the same action object you dispatched.
     *
     * Note that, if you use a custom middleware, it may wrap `dispatch()` to
     * return something else (for example, a Promise you can await).
     */
    function dispatch(action) {
      if (!(0, _isPlainObject2["default"])(action)) {
        throw new Error('Actions must be plain objects. ' + 'Use custom middleware for async actions.');
      }

      if (typeof action.type === 'undefined') {
        throw new Error('Actions may not have an undefined "type" property. ' + 'Have you misspelled a constant?');
      }

      if (isDispatching) {
        throw new Error('Reducers may not dispatch actions.');
      }

      try {
        isDispatching = true;
        currentState = currentReducer(currentState, action);
      } finally {
        isDispatching = false;
      }

      var listeners = currentListeners = nextListeners;
      for (var i = 0; i < listeners.length; i++) {
        listeners[i]();
      }

      return action;
    }

    /**
     * Replaces the reducer currently used by the store to calculate the state.
     *
     * You might need this if your app implements code splitting and you want to
     * load some of the reducers dynamically. You might also need this if you
     * implement a hot reloading mechanism for Redux.
     *
     * @param {Function} nextReducer The reducer for the store to use instead.
     * @returns {void}
     */
    function replaceReducer(nextReducer) {
      if (typeof nextReducer !== 'function') {
        throw new Error('Expected the nextReducer to be a function.');
      }

      currentReducer = nextReducer;
      dispatch({ type: ActionTypes.INIT });
    }

    // When a store is created, an "INIT" action is dispatched so that every
    // reducer returns their initial state. This effectively populates
    // the initial state tree.
    dispatch({ type: ActionTypes.INIT });

    return {
      dispatch: dispatch,
      subscribe: subscribe,
      getState: getState,
      replaceReducer: replaceReducer
    };
  }
});
System.registerDynamic('npm:redux@3.3.1/lib/combineReducers.js', ['npm:redux@3.3.1/lib/createStore.js', 'npm:lodash@4.6.1/isPlainObject.js', 'npm:redux@3.3.1/lib/utils/warning.js', 'github:jspm/nodelibs-process@0.1.2.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  (function (process) {
    'use strict';

    exports.__esModule = true;
    exports["default"] = combineReducers;
    var _createStore = $__require('npm:redux@3.3.1/lib/createStore.js');
    var _isPlainObject = $__require('npm:lodash@4.6.1/isPlainObject.js');
    var _isPlainObject2 = _interopRequireDefault(_isPlainObject);
    var _warning = $__require('npm:redux@3.3.1/lib/utils/warning.js');
    var _warning2 = _interopRequireDefault(_warning);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
    function getUndefinedStateErrorMessage(key, action) {
      var actionType = action && action.type;
      var actionName = actionType && '"' + actionType.toString() + '"' || 'an action';
      return 'Reducer "' + key + '" returned undefined handling ' + actionName + '. ' + 'To ignore an action, you must explicitly return the previous state.';
    }
    function getUnexpectedStateShapeWarningMessage(inputState, reducers, action) {
      var reducerKeys = Object.keys(reducers);
      var argumentName = action && action.type === _createStore.ActionTypes.INIT ? 'initialState argument passed to createStore' : 'previous state received by the reducer';
      if (reducerKeys.length === 0) {
        return 'Store does not have a valid reducer. Make sure the argument passed ' + 'to combineReducers is an object whose values are reducers.';
      }
      if (!(0, _isPlainObject2["default"])(inputState)) {
        return 'The ' + argumentName + ' has unexpected type of "' + {}.toString.call(inputState).match(/\s([a-z|A-Z]+)/)[1] + '". Expected argument to be an object with the following ' + ('keys: "' + reducerKeys.join('", "') + '"');
      }
      var unexpectedKeys = Object.keys(inputState).filter(function (key) {
        return !reducers.hasOwnProperty(key);
      });
      if (unexpectedKeys.length > 0) {
        return 'Unexpected ' + (unexpectedKeys.length > 1 ? 'keys' : 'key') + ' ' + ('"' + unexpectedKeys.join('", "') + '" found in ' + argumentName + '. ') + 'Expected to find one of the known reducer keys instead: ' + ('"' + reducerKeys.join('", "') + '". Unexpected keys will be ignored.');
      }
    }
    function assertReducerSanity(reducers) {
      Object.keys(reducers).forEach(function (key) {
        var reducer = reducers[key];
        var initialState = reducer(undefined, { type: _createStore.ActionTypes.INIT });
        if (typeof initialState === 'undefined') {
          throw new Error('Reducer "' + key + '" returned undefined during initialization. ' + 'If the state passed to the reducer is undefined, you must ' + 'explicitly return the initial state. The initial state may ' + 'not be undefined.');
        }
        var type = '@@redux/PROBE_UNKNOWN_ACTION_' + Math.random().toString(36).substring(7).split('').join('.');
        if (typeof reducer(undefined, { type: type }) === 'undefined') {
          throw new Error('Reducer "' + key + '" returned undefined when probed with a random type. ' + ('Don\'t try to handle ' + _createStore.ActionTypes.INIT + ' or other actions in "redux/*" ') + 'namespace. They are considered private. Instead, you must return the ' + 'current state for any unknown actions, unless it is undefined, ' + 'in which case you must return the initial state, regardless of the ' + 'action type. The initial state may not be undefined.');
        }
      });
    }
    function combineReducers(reducers) {
      var reducerKeys = Object.keys(reducers);
      var finalReducers = {};
      for (var i = 0; i < reducerKeys.length; i++) {
        var key = reducerKeys[i];
        if (typeof reducers[key] === 'function') {
          finalReducers[key] = reducers[key];
        }
      }
      var finalReducerKeys = Object.keys(finalReducers);
      var sanityError;
      try {
        assertReducerSanity(finalReducers);
      } catch (e) {
        sanityError = e;
      }
      return function combination() {
        var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
        var action = arguments[1];
        if (sanityError) {
          throw sanityError;
        }
        if ('production' !== 'production') {
          var warningMessage = getUnexpectedStateShapeWarningMessage(state, finalReducers, action);
          if (warningMessage) {
            (0, _warning2["default"])(warningMessage);
          }
        }
        var hasChanged = false;
        var nextState = {};
        for (var i = 0; i < finalReducerKeys.length; i++) {
          var key = finalReducerKeys[i];
          var reducer = finalReducers[key];
          var previousStateForKey = state[key];
          var nextStateForKey = reducer(previousStateForKey, action);
          if (typeof nextStateForKey === 'undefined') {
            var errorMessage = getUndefinedStateErrorMessage(key, action);
            throw new Error(errorMessage);
          }
          nextState[key] = nextStateForKey;
          hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
        }
        return hasChanged ? nextState : state;
      };
    }
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
});
System.registerDynamic('npm:redux@3.3.1/lib/bindActionCreators.js', [], true, function ($__require, exports, module) {
  /* */
  'use strict';

  var global = this || self,
      GLOBAL = global;
  exports.__esModule = true;
  exports["default"] = bindActionCreators;
  function bindActionCreator(actionCreator, dispatch) {
    return function () {
      return dispatch(actionCreator.apply(undefined, arguments));
    };
  }

  /**
   * Turns an object whose values are action creators, into an object with the
   * same keys, but with every function wrapped into a `dispatch` call so they
   * may be invoked directly. This is just a convenience method, as you can call
   * `store.dispatch(MyActionCreators.doSomething())` yourself just fine.
   *
   * For convenience, you can also pass a single function as the first argument,
   * and get a function in return.
   *
   * @param {Function|Object} actionCreators An object whose values are action
   * creator functions. One handy way to obtain it is to use ES6 `import * as`
   * syntax. You may also pass a single function.
   *
   * @param {Function} dispatch The `dispatch` function available on your Redux
   * store.
   *
   * @returns {Function|Object} The object mimicking the original object, but with
   * every action creator wrapped into the `dispatch` call. If you passed a
   * function as `actionCreators`, the return value will also be a single
   * function.
   */
  function bindActionCreators(actionCreators, dispatch) {
    if (typeof actionCreators === 'function') {
      return bindActionCreator(actionCreators, dispatch);
    }

    if (typeof actionCreators !== 'object' || actionCreators === null) {
      throw new Error('bindActionCreators expected an object or a function, instead received ' + (actionCreators === null ? 'null' : typeof actionCreators) + '. ' + 'Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?');
    }

    var keys = Object.keys(actionCreators);
    var boundActionCreators = {};
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var actionCreator = actionCreators[key];
      if (typeof actionCreator === 'function') {
        boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
      }
    }
    return boundActionCreators;
  }
});
System.registerDynamic('npm:redux@3.3.1/lib/applyMiddleware.js', ['npm:redux@3.3.1/lib/compose.js'], true, function ($__require, exports, module) {
  /* */
  'use strict';

  var global = this || self,
      GLOBAL = global;
  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  exports.__esModule = true;
  exports["default"] = applyMiddleware;
  var _compose = $__require('npm:redux@3.3.1/lib/compose.js');
  var _compose2 = _interopRequireDefault(_compose);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { "default": obj };
  }
  function applyMiddleware() {
    for (var _len = arguments.length, middlewares = Array(_len), _key = 0; _key < _len; _key++) {
      middlewares[_key] = arguments[_key];
    }
    return function (createStore) {
      return function (reducer, initialState, enhancer) {
        var store = createStore(reducer, initialState, enhancer);
        var _dispatch = store.dispatch;
        var chain = [];
        var middlewareAPI = {
          getState: store.getState,
          dispatch: function dispatch(action) {
            return _dispatch(action);
          }
        };
        chain = middlewares.map(function (middleware) {
          return middleware(middlewareAPI);
        });
        _dispatch = _compose2["default"].apply(undefined, chain)(store.dispatch);
        return _extends({}, store, { dispatch: _dispatch });
      };
    };
  }
});
System.registerDynamic("npm:redux@3.3.1/lib/compose.js", [], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.__esModule = true;
  exports["default"] = compose;
  /**
   * Composes single-argument functions from right to left.
   *
   * @param {...Function} funcs The functions to compose.
   * @returns {Function} A function obtained by composing functions from right to
   * left. For example, compose(f, g, h) is identical to arg => f(g(h(arg))).
   */
  function compose() {
    for (var _len = arguments.length, funcs = Array(_len), _key = 0; _key < _len; _key++) {
      funcs[_key] = arguments[_key];
    }

    return function () {
      if (funcs.length === 0) {
        return arguments.length <= 0 ? undefined : arguments[0];
      }

      var last = funcs[funcs.length - 1];
      var rest = funcs.slice(0, -1);

      return rest.reduceRight(function (composed, f) {
        return f(composed);
      }, last.apply(undefined, arguments));
    };
  }
});
System.registerDynamic('npm:redux@3.3.1/lib/utils/warning.js', [], true, function ($__require, exports, module) {
  /* */
  'use strict';

  var global = this || self,
      GLOBAL = global;
  exports.__esModule = true;
  exports["default"] = warning;
  /**
   * Prints a warning in the console if it exists.
   *
   * @param {String} message The warning message.
   * @returns {void}
   */
  function warning(message) {
    /* eslint-disable no-console */
    if (typeof console !== 'undefined' && typeof console.error === 'function') {
      console.error(message);
    }
    /* eslint-enable no-console */
    try {
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
      /* eslint-disable no-empty */
    } catch (e) {}
    /* eslint-enable no-empty */
  }
});
System.registerDynamic('npm:redux@3.3.1/lib/index.js', ['npm:redux@3.3.1/lib/createStore.js', 'npm:redux@3.3.1/lib/combineReducers.js', 'npm:redux@3.3.1/lib/bindActionCreators.js', 'npm:redux@3.3.1/lib/applyMiddleware.js', 'npm:redux@3.3.1/lib/compose.js', 'npm:redux@3.3.1/lib/utils/warning.js', 'github:jspm/nodelibs-process@0.1.2.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  (function (process) {
    'use strict';

    exports.__esModule = true;
    exports.compose = exports.applyMiddleware = exports.bindActionCreators = exports.combineReducers = exports.createStore = undefined;
    var _createStore = $__require('npm:redux@3.3.1/lib/createStore.js');
    var _createStore2 = _interopRequireDefault(_createStore);
    var _combineReducers = $__require('npm:redux@3.3.1/lib/combineReducers.js');
    var _combineReducers2 = _interopRequireDefault(_combineReducers);
    var _bindActionCreators = $__require('npm:redux@3.3.1/lib/bindActionCreators.js');
    var _bindActionCreators2 = _interopRequireDefault(_bindActionCreators);
    var _applyMiddleware = $__require('npm:redux@3.3.1/lib/applyMiddleware.js');
    var _applyMiddleware2 = _interopRequireDefault(_applyMiddleware);
    var _compose = $__require('npm:redux@3.3.1/lib/compose.js');
    var _compose2 = _interopRequireDefault(_compose);
    var _warning = $__require('npm:redux@3.3.1/lib/utils/warning.js');
    var _warning2 = _interopRequireDefault(_warning);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
    function isCrushed() {}
    if ('production' !== 'production' && typeof isCrushed.name === 'string' && isCrushed.name !== 'isCrushed') {
      (0, _warning2["default"])('You are currently using minified code outside of NODE_ENV === \'production\'. ' + 'This means that you are running a slower development build of Redux. ' + 'You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify ' + 'or DefinePlugin for webpack (http://stackoverflow.com/questions/30030031) ' + 'to ensure you have the correct code for your production build.');
    }
    exports.createStore = _createStore2["default"];
    exports.combineReducers = _combineReducers2["default"];
    exports.bindActionCreators = _bindActionCreators2["default"];
    exports.applyMiddleware = _applyMiddleware2["default"];
    exports.compose = _compose2["default"];
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
});
System.registerDynamic("npm:redux@3.3.1.js", ["npm:redux@3.3.1/lib/index.js"], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  module.exports = $__require("npm:redux@3.3.1/lib/index.js");
});
System.registerDynamic('npm:react-redux@4.4.0/lib/utils/wrapActionCreators.js', ['npm:redux@3.3.1.js'], true, function ($__require, exports, module) {
  /* */
  'use strict';

  var global = this || self,
      GLOBAL = global;
  exports.__esModule = true;
  exports["default"] = wrapActionCreators;

  var _redux = $__require('npm:redux@3.3.1.js');

  function wrapActionCreators(actionCreators) {
    return function (dispatch) {
      return (0, _redux.bindActionCreators)(actionCreators, dispatch);
    };
  }
});
System.registerDynamic('npm:lodash@4.6.1/_isHostObject.js', [], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /**
   * Checks if `value` is a host object in IE < 9.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
   */
  function isHostObject(value) {
    // Many host objects are `Object` objects that can coerce to strings
    // despite having improperly defined `toString` methods.
    var result = false;
    if (value != null && typeof value.toString != 'function') {
      try {
        result = !!(value + '');
      } catch (e) {}
    }
    return result;
  }

  module.exports = isHostObject;
});
System.registerDynamic('npm:lodash@4.6.1/isObjectLike.js', [], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /**
   * Checks if `value` is object-like. A value is object-like if it's not `null`
   * and has a `typeof` result of "object".
   *
   * @static
   * @memberOf _
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
   * @example
   *
   * _.isObjectLike({});
   * // => true
   *
   * _.isObjectLike([1, 2, 3]);
   * // => true
   *
   * _.isObjectLike(_.noop);
   * // => false
   *
   * _.isObjectLike(null);
   * // => false
   */
  function isObjectLike(value) {
    return !!value && typeof value == 'object';
  }

  module.exports = isObjectLike;
});
System.registerDynamic('npm:lodash@4.6.1/isPlainObject.js', ['npm:lodash@4.6.1/_isHostObject.js', 'npm:lodash@4.6.1/isObjectLike.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  var isHostObject = $__require('npm:lodash@4.6.1/_isHostObject.js'),
      isObjectLike = $__require('npm:lodash@4.6.1/isObjectLike.js');
  var objectTag = '[object Object]';
  var objectProto = Object.prototype;
  var funcToString = Function.prototype.toString;
  var objectCtorString = funcToString.call(Object);
  var objectToString = objectProto.toString;
  var getPrototypeOf = Object.getPrototypeOf;
  function isPlainObject(value) {
    if (!isObjectLike(value) || objectToString.call(value) != objectTag || isHostObject(value)) {
      return false;
    }
    var proto = getPrototypeOf(value);
    if (proto === null) {
      return true;
    }
    var Ctor = proto.constructor;
    return typeof Ctor == 'function' && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
  }
  module.exports = isPlainObject;
});
System.registerDynamic('npm:hoist-non-react-statics@1.0.5/index.js', [], true, function ($__require, exports, module) {
    /**
     * Copyright 2015, Yahoo! Inc.
     * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
     */
    'use strict';

    var global = this || self,
        GLOBAL = global;
    var REACT_STATICS = {
        childContextTypes: true,
        contextTypes: true,
        defaultProps: true,
        displayName: true,
        getDefaultProps: true,
        mixins: true,
        propTypes: true,
        type: true
    };

    var KNOWN_STATICS = {
        name: true,
        length: true,
        prototype: true,
        caller: true,
        arguments: true,
        arity: true
    };

    module.exports = function hoistNonReactStatics(targetComponent, sourceComponent) {
        var keys = Object.getOwnPropertyNames(sourceComponent);
        for (var i = 0; i < keys.length; ++i) {
            if (!REACT_STATICS[keys[i]] && !KNOWN_STATICS[keys[i]]) {
                try {
                    targetComponent[keys[i]] = sourceComponent[keys[i]];
                } catch (error) {}
            }
        }

        return targetComponent;
    };
});
System.registerDynamic("npm:hoist-non-react-statics@1.0.5.js", ["npm:hoist-non-react-statics@1.0.5/index.js"], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  module.exports = $__require("npm:hoist-non-react-statics@1.0.5/index.js");
});
System.registerDynamic('npm:invariant@2.2.0/browser.js', ['github:jspm/nodelibs-process@0.1.2.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  (function (process) {
    'use strict';

    var invariant = function (condition, format, a, b, c, d, e, f) {
      if ('production' !== 'production') {
        if (format === undefined) {
          throw new Error('invariant requires an error message argument');
        }
      }
      if (!condition) {
        var error;
        if (format === undefined) {
          error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
        } else {
          var args = [a, b, c, d, e, f];
          var argIndex = 0;
          error = new Error(format.replace(/%s/g, function () {
            return args[argIndex++];
          }));
          error.name = 'Invariant Violation';
        }
        error.framesToPop = 1;
        throw error;
      }
    };
    module.exports = invariant;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
});
System.registerDynamic("npm:invariant@2.2.0.js", ["npm:invariant@2.2.0/browser.js"], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  module.exports = $__require("npm:invariant@2.2.0/browser.js");
});
System.registerDynamic('npm:process@0.11.2/browser.js', [], true, function ($__require, exports, module) {
    var global = this || self,
        GLOBAL = global;
    // shim for using process in browser

    var process = module.exports = {};
    var queue = [];
    var draining = false;
    var currentQueue;
    var queueIndex = -1;

    function cleanUpNextTick() {
        draining = false;
        if (currentQueue.length) {
            queue = currentQueue.concat(queue);
        } else {
            queueIndex = -1;
        }
        if (queue.length) {
            drainQueue();
        }
    }

    function drainQueue() {
        if (draining) {
            return;
        }
        var timeout = setTimeout(cleanUpNextTick);
        draining = true;

        var len = queue.length;
        while (len) {
            currentQueue = queue;
            queue = [];
            while (++queueIndex < len) {
                if (currentQueue) {
                    currentQueue[queueIndex].run();
                }
            }
            queueIndex = -1;
            len = queue.length;
        }
        currentQueue = null;
        draining = false;
        clearTimeout(timeout);
    }

    process.nextTick = function (fun) {
        var args = new Array(arguments.length - 1);
        if (arguments.length > 1) {
            for (var i = 1; i < arguments.length; i++) {
                args[i - 1] = arguments[i];
            }
        }
        queue.push(new Item(fun, args));
        if (queue.length === 1 && !draining) {
            setTimeout(drainQueue, 0);
        }
    };

    // v8 likes predictible objects
    function Item(fun, array) {
        this.fun = fun;
        this.array = array;
    }
    Item.prototype.run = function () {
        this.fun.apply(null, this.array);
    };
    process.title = 'browser';
    process.browser = true;
    process.env = {};
    process.argv = [];
    process.version = ''; // empty string to avoid regexp issues
    process.versions = {};

    function noop() {}

    process.on = noop;
    process.addListener = noop;
    process.once = noop;
    process.off = noop;
    process.removeListener = noop;
    process.removeAllListeners = noop;
    process.emit = noop;

    process.binding = function (name) {
        throw new Error('process.binding is not supported');
    };

    process.cwd = function () {
        return '/';
    };
    process.chdir = function (dir) {
        throw new Error('process.chdir is not supported');
    };
    process.umask = function () {
        return 0;
    };
});
System.registerDynamic("npm:process@0.11.2.js", ["npm:process@0.11.2/browser.js"], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  module.exports = $__require("npm:process@0.11.2/browser.js");
});
System.registerDynamic('github:jspm/nodelibs-process@0.1.2/index.js', ['npm:process@0.11.2.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  module.exports = System._nodeRequire ? process : $__require('npm:process@0.11.2.js');
});
System.registerDynamic("github:jspm/nodelibs-process@0.1.2.js", ["github:jspm/nodelibs-process@0.1.2/index.js"], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  module.exports = $__require("github:jspm/nodelibs-process@0.1.2/index.js");
});
System.registerDynamic('npm:react-redux@4.4.0/lib/components/connect.js', ['npm:react@0.14.7.js', 'npm:react-redux@4.4.0/lib/utils/storeShape.js', 'npm:react-redux@4.4.0/lib/utils/shallowEqual.js', 'npm:react-redux@4.4.0/lib/utils/wrapActionCreators.js', 'npm:lodash@4.6.1/isPlainObject.js', 'npm:hoist-non-react-statics@1.0.5.js', 'npm:invariant@2.2.0.js', 'github:jspm/nodelibs-process@0.1.2.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  (function (process) {
    'use strict';

    var _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
    exports.__esModule = true;
    exports["default"] = connect;
    var _react = $__require('npm:react@0.14.7.js');
    var _storeShape = $__require('npm:react-redux@4.4.0/lib/utils/storeShape.js');
    var _storeShape2 = _interopRequireDefault(_storeShape);
    var _shallowEqual = $__require('npm:react-redux@4.4.0/lib/utils/shallowEqual.js');
    var _shallowEqual2 = _interopRequireDefault(_shallowEqual);
    var _wrapActionCreators = $__require('npm:react-redux@4.4.0/lib/utils/wrapActionCreators.js');
    var _wrapActionCreators2 = _interopRequireDefault(_wrapActionCreators);
    var _isPlainObject = $__require('npm:lodash@4.6.1/isPlainObject.js');
    var _isPlainObject2 = _interopRequireDefault(_isPlainObject);
    var _hoistNonReactStatics = $__require('npm:hoist-non-react-statics@1.0.5.js');
    var _hoistNonReactStatics2 = _interopRequireDefault(_hoistNonReactStatics);
    var _invariant = $__require('npm:invariant@2.2.0.js');
    var _invariant2 = _interopRequireDefault(_invariant);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _possibleConstructorReturn(self, call) {
      if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }
    function _inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: {
          value: subClass,
          enumerable: false,
          writable: true,
          configurable: true
        } });
      if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }
    var defaultMapStateToProps = function defaultMapStateToProps(state) {
      return {};
    };
    var defaultMapDispatchToProps = function defaultMapDispatchToProps(dispatch) {
      return { dispatch: dispatch };
    };
    var defaultMergeProps = function defaultMergeProps(stateProps, dispatchProps, parentProps) {
      return _extends({}, parentProps, stateProps, dispatchProps);
    };
    function getDisplayName(WrappedComponent) {
      return WrappedComponent.displayName || WrappedComponent.name || 'Component';
    }
    function checkStateShape(stateProps, dispatch) {
      (0, _invariant2["default"])((0, _isPlainObject2["default"])(stateProps), '`%sToProps` must return an object. Instead received %s.', dispatch ? 'mapDispatch' : 'mapState', stateProps);
      return stateProps;
    }
    var nextVersion = 0;
    function connect(mapStateToProps, mapDispatchToProps, mergeProps) {
      var options = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];
      var shouldSubscribe = Boolean(mapStateToProps);
      var mapState = mapStateToProps || defaultMapStateToProps;
      var mapDispatch = (0, _isPlainObject2["default"])(mapDispatchToProps) ? (0, _wrapActionCreators2["default"])(mapDispatchToProps) : mapDispatchToProps || defaultMapDispatchToProps;
      var finalMergeProps = mergeProps || defaultMergeProps;
      var checkMergedEquals = finalMergeProps !== defaultMergeProps;
      var _options$pure = options.pure;
      var pure = _options$pure === undefined ? true : _options$pure;
      var _options$withRef = options.withRef;
      var withRef = _options$withRef === undefined ? false : _options$withRef;
      var version = nextVersion++;
      function computeMergedProps(stateProps, dispatchProps, parentProps) {
        var mergedProps = finalMergeProps(stateProps, dispatchProps, parentProps);
        (0, _invariant2["default"])((0, _isPlainObject2["default"])(mergedProps), '`mergeProps` must return an object. Instead received %s.', mergedProps);
        return mergedProps;
      }
      return function wrapWithConnect(WrappedComponent) {
        var Connect = function (_Component) {
          _inherits(Connect, _Component);
          Connect.prototype.shouldComponentUpdate = function shouldComponentUpdate() {
            return !pure || this.haveOwnPropsChanged || this.hasStoreStateChanged;
          };
          function Connect(props, context) {
            _classCallCheck(this, Connect);
            var _this = _possibleConstructorReturn(this, _Component.call(this, props, context));
            _this.version = version;
            _this.store = props.store || context.store;
            (0, _invariant2["default"])(_this.store, 'Could not find "store" in either the context or ' + ('props of "' + _this.constructor.displayName + '". ') + 'Either wrap the root component in a <Provider>, ' + ('or explicitly pass "store" as a prop to "' + _this.constructor.displayName + '".'));
            var storeState = _this.store.getState();
            _this.state = { storeState: storeState };
            _this.clearCache();
            return _this;
          }
          Connect.prototype.computeStateProps = function computeStateProps(store, props) {
            if (!this.finalMapStateToProps) {
              return this.configureFinalMapState(store, props);
            }
            var state = store.getState();
            var stateProps = this.doStatePropsDependOnOwnProps ? this.finalMapStateToProps(state, props) : this.finalMapStateToProps(state);
            return checkStateShape(stateProps);
          };
          Connect.prototype.configureFinalMapState = function configureFinalMapState(store, props) {
            var mappedState = mapState(store.getState(), props);
            var isFactory = typeof mappedState === 'function';
            this.finalMapStateToProps = isFactory ? mappedState : mapState;
            this.doStatePropsDependOnOwnProps = this.finalMapStateToProps.length !== 1;
            return isFactory ? this.computeStateProps(store, props) : checkStateShape(mappedState);
          };
          Connect.prototype.computeDispatchProps = function computeDispatchProps(store, props) {
            if (!this.finalMapDispatchToProps) {
              return this.configureFinalMapDispatch(store, props);
            }
            var dispatch = store.dispatch;
            var dispatchProps = this.doDispatchPropsDependOnOwnProps ? this.finalMapDispatchToProps(dispatch, props) : this.finalMapDispatchToProps(dispatch);
            return checkStateShape(dispatchProps, true);
          };
          Connect.prototype.configureFinalMapDispatch = function configureFinalMapDispatch(store, props) {
            var mappedDispatch = mapDispatch(store.dispatch, props);
            var isFactory = typeof mappedDispatch === 'function';
            this.finalMapDispatchToProps = isFactory ? mappedDispatch : mapDispatch;
            this.doDispatchPropsDependOnOwnProps = this.finalMapDispatchToProps.length !== 1;
            return isFactory ? this.computeDispatchProps(store, props) : checkStateShape(mappedDispatch, true);
          };
          Connect.prototype.updateStatePropsIfNeeded = function updateStatePropsIfNeeded() {
            var nextStateProps = this.computeStateProps(this.store, this.props);
            if (this.stateProps && (0, _shallowEqual2["default"])(nextStateProps, this.stateProps)) {
              return false;
            }
            this.stateProps = nextStateProps;
            return true;
          };
          Connect.prototype.updateDispatchPropsIfNeeded = function updateDispatchPropsIfNeeded() {
            var nextDispatchProps = this.computeDispatchProps(this.store, this.props);
            if (this.dispatchProps && (0, _shallowEqual2["default"])(nextDispatchProps, this.dispatchProps)) {
              return false;
            }
            this.dispatchProps = nextDispatchProps;
            return true;
          };
          Connect.prototype.updateMergedPropsIfNeeded = function updateMergedPropsIfNeeded() {
            var nextMergedProps = computeMergedProps(this.stateProps, this.dispatchProps, this.props);
            if (this.mergedProps && checkMergedEquals && (0, _shallowEqual2["default"])(nextMergedProps, this.mergedProps)) {
              return false;
            }
            this.mergedProps = nextMergedProps;
            return true;
          };
          Connect.prototype.isSubscribed = function isSubscribed() {
            return typeof this.unsubscribe === 'function';
          };
          Connect.prototype.trySubscribe = function trySubscribe() {
            if (shouldSubscribe && !this.unsubscribe) {
              this.unsubscribe = this.store.subscribe(this.handleChange.bind(this));
              this.handleChange();
            }
          };
          Connect.prototype.tryUnsubscribe = function tryUnsubscribe() {
            if (this.unsubscribe) {
              this.unsubscribe();
              this.unsubscribe = null;
            }
          };
          Connect.prototype.componentDidMount = function componentDidMount() {
            this.trySubscribe();
          };
          Connect.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
            if (!pure || !(0, _shallowEqual2["default"])(nextProps, this.props)) {
              this.haveOwnPropsChanged = true;
            }
          };
          Connect.prototype.componentWillUnmount = function componentWillUnmount() {
            this.tryUnsubscribe();
            this.clearCache();
          };
          Connect.prototype.clearCache = function clearCache() {
            this.dispatchProps = null;
            this.stateProps = null;
            this.mergedProps = null;
            this.haveOwnPropsChanged = true;
            this.hasStoreStateChanged = true;
            this.renderedElement = null;
            this.finalMapDispatchToProps = null;
            this.finalMapStateToProps = null;
          };
          Connect.prototype.handleChange = function handleChange() {
            if (!this.unsubscribe) {
              return;
            }
            var prevStoreState = this.state.storeState;
            var storeState = this.store.getState();
            if (!pure || prevStoreState !== storeState) {
              this.hasStoreStateChanged = true;
              this.setState({ storeState: storeState });
            }
          };
          Connect.prototype.getWrappedInstance = function getWrappedInstance() {
            (0, _invariant2["default"])(withRef, 'To access the wrapped instance, you need to specify ' + '{ withRef: true } as the fourth argument of the connect() call.');
            return this.refs.wrappedInstance;
          };
          Connect.prototype.render = function render() {
            var haveOwnPropsChanged = this.haveOwnPropsChanged;
            var hasStoreStateChanged = this.hasStoreStateChanged;
            var renderedElement = this.renderedElement;
            this.haveOwnPropsChanged = false;
            this.hasStoreStateChanged = false;
            var shouldUpdateStateProps = true;
            var shouldUpdateDispatchProps = true;
            if (pure && renderedElement) {
              shouldUpdateStateProps = hasStoreStateChanged || haveOwnPropsChanged && this.doStatePropsDependOnOwnProps;
              shouldUpdateDispatchProps = haveOwnPropsChanged && this.doDispatchPropsDependOnOwnProps;
            }
            var haveStatePropsChanged = false;
            var haveDispatchPropsChanged = false;
            if (shouldUpdateStateProps) {
              haveStatePropsChanged = this.updateStatePropsIfNeeded();
            }
            if (shouldUpdateDispatchProps) {
              haveDispatchPropsChanged = this.updateDispatchPropsIfNeeded();
            }
            var haveMergedPropsChanged = true;
            if (haveStatePropsChanged || haveDispatchPropsChanged || haveOwnPropsChanged) {
              haveMergedPropsChanged = this.updateMergedPropsIfNeeded();
            } else {
              haveMergedPropsChanged = false;
            }
            if (!haveMergedPropsChanged && renderedElement) {
              return renderedElement;
            }
            if (withRef) {
              this.renderedElement = (0, _react.createElement)(WrappedComponent, _extends({}, this.mergedProps, { ref: 'wrappedInstance' }));
            } else {
              this.renderedElement = (0, _react.createElement)(WrappedComponent, this.mergedProps);
            }
            return this.renderedElement;
          };
          return Connect;
        }(_react.Component);
        Connect.displayName = 'Connect(' + getDisplayName(WrappedComponent) + ')';
        Connect.WrappedComponent = WrappedComponent;
        Connect.contextTypes = { store: _storeShape2["default"] };
        Connect.propTypes = { store: _storeShape2["default"] };
        if ('production' !== 'production') {
          Connect.prototype.componentWillUpdate = function componentWillUpdate() {
            if (this.version === version) {
              return;
            }
            this.version = version;
            this.trySubscribe();
            this.clearCache();
          };
        }
        return (0, _hoistNonReactStatics2["default"])(Connect, WrappedComponent);
      };
    }
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
});
System.registerDynamic('npm:react-redux@4.4.0/lib/index.js', ['npm:react-redux@4.4.0/lib/components/Provider.js', 'npm:react-redux@4.4.0/lib/components/connect.js'], true, function ($__require, exports, module) {
  /* */
  'use strict';

  var global = this || self,
      GLOBAL = global;
  exports.__esModule = true;
  exports.connect = exports.Provider = undefined;
  var _Provider = $__require('npm:react-redux@4.4.0/lib/components/Provider.js');
  var _Provider2 = _interopRequireDefault(_Provider);
  var _connect = $__require('npm:react-redux@4.4.0/lib/components/connect.js');
  var _connect2 = _interopRequireDefault(_connect);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { "default": obj };
  }
  exports.Provider = _Provider2["default"];
  exports.connect = _connect2["default"];
});
System.registerDynamic("npm:react-redux@4.4.0.js", ["npm:react-redux@4.4.0/lib/index.js"], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  module.exports = $__require("npm:react-redux@4.4.0/lib/index.js");
});
/// <reference path='../typings/browser.d.ts'/>
System.register("src/core.js", ["npm:react-redux@4.4.0.js"], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    function reduxify(mapStateToProps, mapDispatchToProps) {
        return function (target) {
            return react_redux_1.connect(mapStateToProps, mapDispatchToProps)(target);
        };
    }
    exports_1("reduxify", reduxify);
    function subscribeToStore() {
        return function (target) {
            var didMount = target.prototype.componentDidMount;
            target.prototype.componentDidMount = function () {
                var _this = this;
                if (didMount != null) didMount.call(this);
                this.unsubscribe = this.props.store.subscribe(function () {
                    return _this.forceUpdate();
                });
            };
            var willUnmount = target.prototype.componentWillUnmount;
            target.prototype.componentWillUnmount = function () {
                if (willUnmount != null) willUnmount.call(this);
                this.unsubscribe();
            };
        };
    }
    exports_1("subscribeToStore", subscribeToStore);
    function bindAll() {
        return function (target) {
            function F() {
                for (var k in target.prototype) {
                    var fn = target.prototype[k];
                    if (typeof fn !== 'function' || !target.prototype.hasOwnProperty(k)) continue;
                    this[k] = fn.bind(this);
                }
                target.apply(this, arguments);
            }
            F.prototype = target.prototype;
            var a = target; //Hack to get araound TypeScript build error
            a = F;
            return a;
        };
    }
    exports_1("bindAll", bindAll);
    var react_redux_1;
    return {
        setters: [function (react_redux_1_1) {
            react_redux_1 = react_redux_1_1;
        }],
        execute: function () {/// <reference path='../typings/browser.d.ts'/>
        }
    };
});

/// <reference path='../typings/browser.d.ts'/>
System.register("src/app.js", ["npm:react@0.14.7.js", "npm:react-dom@0.14.7.js", "npm:redux@3.3.1.js", "src/reducers.js", "src/ColorPicker.js", "src/core.js"], function (exports_1, context_1) {
    "use strict";

    var __extends = this && this.__extends || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
        var c = arguments.length,
            r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
            d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __moduleName = context_1 && context_1.id;
    var React, ReactDOM, redux_1, reducers_1, ColorPicker_1, core_1, defaultState, history, currentUser, onConnect, updateHistory, store, ColorWrapper;
    return {
        setters: [function (React_1) {
            React = React_1;
        }, function (ReactDOM_1) {
            ReactDOM = ReactDOM_1;
        }, function (redux_1_1) {
            redux_1 = redux_1_1;
        }, function (reducers_1_1) {
            reducers_1 = reducers_1_1;
        }, function (ColorPicker_1_1) {
            ColorPicker_1 = ColorPicker_1_1;
        }, function (core_1_1) {
            core_1 = core_1_1;
        }],
        execute: function () {
            /// <reference path='../typings/browser.d.ts'/>
            defaultState = {
                nextShapeId: 0, width: 100, height: 100, color: "#000000", shapes: [],
                currentUser: null, users: []
            };
            history = {
                states: [],
                stateIndex: 0,
                reset: function () {
                    this.states = [];
                    this.stateIndex = -1;
                },
                prev: function () {
                    return this.states[--this.stateIndex];
                },
                next: function () {
                    return this.states[++this.stateIndex];
                },
                goTo: function (index) {
                    return this.states[this.stateIndex = index];
                },
                canPrev: function () {
                    return this.stateIndex <= 0;
                },
                canNext: function () {
                    return this.stateIndex >= this.states.length - 1;
                },
                pushState: function (nextState) {
                    this.states.push(nextState);
                    this.stateIndex = this.states.length - 1;
                }
            };
            onConnect = function (user) {
                return currentUser = user;
            };
            updateHistory = function (store) {
                return function (next) {
                    return function (action) {
                        var result = next(action);
                        if (action.type !== 'LOAD') {
                            history.pushState(store.getState());
                        }
                        $.ss.postJSON("/publish-channel/" + currentUser.usersChannel + "?selector=cmd.publishAction", action);
                        return result;
                    };
                };
            };
            store = redux_1.createStore(function (state, action) {
                var reducer = reducers_1.default[action.type];
                var nextState = reducer != null ? reducer(state, action) : state;
                return nextState;
            }, defaultState, redux_1.applyMiddleware(updateHistory));
            ColorWrapper = function (_super) {
                __extends(ColorWrapper, _super);
                function ColorWrapper() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                ColorWrapper.prototype.render = function () {
                    return React.createElement(ColorPicker_1.ColorPicker, { color: this.props.color, onChange: this.props.setColor });
                };
                return ColorWrapper;
            }(React.Component);
            ColorWrapper = __decorate([core_1.reduxify(function (state) {
                return { color: state.color };
            }, function (dispatch) {
                return { setColor: function (color) {
                        return dispatch({ type: 'COLOR_CHANGE', color: color });
                    } };
            })], ColorWrapper);
            ReactDOM.render(React.createElement("h2", null, "Preview"), document.getElementById("content"));
        }
    };
});