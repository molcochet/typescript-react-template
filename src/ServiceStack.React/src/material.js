/* */ 
(function(process) {
  ;
  (function() {
    "use strict";
    if (typeof window === 'undefined')
      return;
    var componentHandler = {
      upgradeDom: function(optJsClass, optCssClass) {},
      upgradeElement: function(element, optJsClass) {},
      upgradeElements: function(elements) {},
      upgradeAllRegistered: function() {},
      registerUpgradedCallback: function(jsClass, callback) {},
      register: function(config) {},
      downgradeElements: function(nodes) {}
    };
    componentHandler = (function() {
      'use strict';
      var registeredComponents_ = [];
      var createdComponents_ = [];
      var componentConfigProperty_ = 'mdlComponentConfigInternal_';
      function findRegisteredClass_(name, optReplace) {
        for (var i = 0; i < registeredComponents_.length; i++) {
          if (registeredComponents_[i].className === name) {
            if (typeof optReplace !== 'undefined') {
              registeredComponents_[i] = optReplace;
            }
            return registeredComponents_[i];
          }
        }
        return false;
      }
      function getUpgradedListOfElement_(element) {
        var dataUpgraded = element.getAttribute('data-upgraded');
        return dataUpgraded === null ? [''] : dataUpgraded.split(',');
      }
      function isElementUpgraded_(element, jsClass) {
        var upgradedList = getUpgradedListOfElement_(element);
        return upgradedList.indexOf(jsClass) !== -1;
      }
      function upgradeDomInternal(optJsClass, optCssClass) {
        if (typeof optJsClass === 'undefined' && typeof optCssClass === 'undefined') {
          for (var i = 0; i < registeredComponents_.length; i++) {
            upgradeDomInternal(registeredComponents_[i].className, registeredComponents_[i].cssClass);
          }
        } else {
          var jsClass = (optJsClass);
          if (typeof optCssClass === 'undefined') {
            var registeredClass = findRegisteredClass_(jsClass);
            if (registeredClass) {
              optCssClass = registeredClass.cssClass;
            }
          }
          var elements = document.querySelectorAll('.' + optCssClass);
          for (var n = 0; n < elements.length; n++) {
            upgradeElementInternal(elements[n], jsClass);
          }
        }
      }
      function upgradeElementInternal(element, optJsClass) {
        if (!(typeof element === 'object' && element instanceof Element)) {
          throw new Error('Invalid argument provided to upgrade MDL element.');
        }
        var upgradedList = getUpgradedListOfElement_(element);
        var classesToUpgrade = [];
        if (!optJsClass) {
          var classList = element.classList;
          registeredComponents_.forEach(function(component) {
            if (classList.contains(component.cssClass) && classesToUpgrade.indexOf(component) === -1 && !isElementUpgraded_(element, component.className)) {
              classesToUpgrade.push(component);
            }
          });
        } else if (!isElementUpgraded_(element, optJsClass)) {
          classesToUpgrade.push(findRegisteredClass_(optJsClass));
        }
        for (var i = 0,
            n = classesToUpgrade.length,
            registeredClass; i < n; i++) {
          registeredClass = classesToUpgrade[i];
          if (registeredClass) {
            upgradedList.push(registeredClass.className);
            element.setAttribute('data-upgraded', upgradedList.join(','));
            var instance = new registeredClass.classConstructor(element);
            instance[componentConfigProperty_] = registeredClass;
            createdComponents_.push(instance);
            for (var j = 0,
                m = registeredClass.callbacks.length; j < m; j++) {
              registeredClass.callbacks[j](element);
            }
            if (registeredClass.widget) {
              element[registeredClass.className] = instance;
            }
          } else {
            throw new Error('Unable to find a registered component for the given class.');
          }
          var ev;
          if ('CustomEvent' in window && typeof window.CustomEvent === 'function') {
            ev = new CustomEvent('mdl-componentupgraded', {
              bubbles: true,
              cancelable: false
            });
          } else {
            ev = document.createEvent('Events');
            ev.initEvent('mdl-componentupgraded', true, true);
          }
          element.dispatchEvent(ev);
        }
      }
      function upgradeElementsInternal(elements) {
        if (!Array.isArray(elements)) {
          if (elements instanceof Element) {
            elements = [elements];
          } else {
            elements = Array.prototype.slice.call(elements);
          }
        }
        for (var i = 0,
            n = elements.length,
            element; i < n; i++) {
          element = elements[i];
          if (element instanceof HTMLElement) {
            upgradeElementInternal(element);
            if (element.children.length > 0) {
              upgradeElementsInternal(element.children);
            }
          }
        }
      }
      function registerInternal(config) {
        var widgetMissing = (typeof config.widget === 'undefined' && typeof config['widget'] === 'undefined');
        var widget = true;
        if (!widgetMissing) {
          widget = config.widget || config['widget'];
        }
        var newConfig = ({
          classConstructor: config.constructor || config['constructor'],
          className: config.classAsString || config['classAsString'],
          cssClass: config.cssClass || config['cssClass'],
          widget: widget,
          callbacks: []
        });
        registeredComponents_.forEach(function(item) {
          if (item.cssClass === newConfig.cssClass) {
            throw new Error('The provided cssClass has already been registered: ' + item.cssClass);
          }
          if (item.className === newConfig.className) {
            throw new Error('The provided className has already been registered');
          }
        });
        if (config.constructor.prototype.hasOwnProperty(componentConfigProperty_)) {
          throw new Error('MDL component classes must not have ' + componentConfigProperty_ + ' defined as a property.');
        }
        var found = findRegisteredClass_(config.classAsString, newConfig);
        if (!found) {
          registeredComponents_.push(newConfig);
        }
      }
      function registerUpgradedCallbackInternal(jsClass, callback) {
        var regClass = findRegisteredClass_(jsClass);
        if (regClass) {
          regClass.callbacks.push(callback);
        }
      }
      function upgradeAllRegisteredInternal() {
        for (var n = 0; n < registeredComponents_.length; n++) {
          upgradeDomInternal(registeredComponents_[n].className);
        }
      }
      function deconstructComponentInternal(component) {
        if (component) {
          var componentIndex = createdComponents_.indexOf(component);
          createdComponents_.splice(componentIndex, 1);
          var upgrades = component.element_.getAttribute('data-upgraded').split(',');
          var componentPlace = upgrades.indexOf(component[componentConfigProperty_].classAsString);
          upgrades.splice(componentPlace, 1);
          component.element_.setAttribute('data-upgraded', upgrades.join(','));
          var ev;
          if ('CustomEvent' in window && typeof window.CustomEvent === 'function') {
            ev = new CustomEvent('mdl-componentdowngraded', {
              bubbles: true,
              cancelable: false
            });
          } else {
            ev = document.createEvent('Events');
            ev.initEvent('mdl-componentdowngraded', true, true);
          }
          component.element_.dispatchEvent(ev);
        }
      }
      function downgradeNodesInternal(nodes) {
        var downgradeNode = function(node) {
          createdComponents_.filter(function(item) {
            return item.element_ === node;
          }).forEach(deconstructComponentInternal);
        };
        if (nodes instanceof Array || nodes instanceof NodeList) {
          for (var n = 0; n < nodes.length; n++) {
            downgradeNode(nodes[n]);
          }
        } else if (nodes instanceof Node) {
          downgradeNode(nodes);
        } else {
          throw new Error('Invalid argument provided to downgrade MDL nodes.');
        }
      }
      return {
        upgradeDom: upgradeDomInternal,
        upgradeElement: upgradeElementInternal,
        upgradeElements: upgradeElementsInternal,
        upgradeAllRegistered: upgradeAllRegisteredInternal,
        registerUpgradedCallback: registerUpgradedCallbackInternal,
        register: registerInternal,
        downgradeElements: downgradeNodesInternal
      };
    })();
    componentHandler.ComponentConfigPublic;
    componentHandler.ComponentConfig;
    componentHandler.Component;
    componentHandler['upgradeDom'] = componentHandler.upgradeDom;
    componentHandler['upgradeElement'] = componentHandler.upgradeElement;
    componentHandler['upgradeElements'] = componentHandler.upgradeElements;
    componentHandler['upgradeAllRegistered'] = componentHandler.upgradeAllRegistered;
    componentHandler['registerUpgradedCallback'] = componentHandler.registerUpgradedCallback;
    componentHandler['register'] = componentHandler.register;
    componentHandler['downgradeElements'] = componentHandler.downgradeElements;
    window.componentHandler = componentHandler;
    window['componentHandler'] = componentHandler;
    window.addEventListener('load', function() {
      'use strict';
      if ('classList' in document.createElement('div') && 'querySelector' in document && 'addEventListener' in window && Array.prototype.forEach) {
        document.documentElement.classList.add('mdl-js');
      } else {
        componentHandler.upgradeElement = function() {};
        componentHandler.register = function() {};
      }
    });
    if (!Date.now) {
      Date.now = function() {
        return new Date().getTime();
      };
      Date['now'] = Date.now;
    }
    var vendors = ['webkit', 'moz'];
    for (var i = 0; i < vendors.length && !window.requestAnimationFrame; ++i) {
      var vp = vendors[i];
      window.requestAnimationFrame = window[vp + 'RequestAnimationFrame'];
      window.cancelAnimationFrame = window[vp + 'CancelAnimationFrame'] || window[vp + 'CancelRequestAnimationFrame'];
      window['requestAnimationFrame'] = window.requestAnimationFrame;
      window['cancelAnimationFrame'] = window.cancelAnimationFrame;
    }
    if (/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent) || !window.requestAnimationFrame || !window.cancelAnimationFrame) {
      var lastTime = 0;
      window.requestAnimationFrame = function(callback) {
        var now = Date.now();
        var nextTime = Math.max(lastTime + 16, now);
        return setTimeout(function() {
          callback(lastTime = nextTime);
        }, nextTime - now);
      };
      window.cancelAnimationFrame = clearTimeout;
      window['requestAnimationFrame'] = window.requestAnimationFrame;
      window['cancelAnimationFrame'] = window.cancelAnimationFrame;
    }
    var MaterialButton = function MaterialButton(element) {
      this.element_ = element;
      this.init();
    };
    window['MaterialButton'] = MaterialButton;
    MaterialButton.prototype.Constant_ = {};
    MaterialButton.prototype.CssClasses_ = {
      RIPPLE_EFFECT: 'mdl-js-ripple-effect',
      RIPPLE_CONTAINER: 'mdl-button__ripple-container',
      RIPPLE: 'mdl-ripple'
    };
    MaterialButton.prototype.blurHandler_ = function(event) {
      if (event) {
        this.element_.blur();
      }
    };
    MaterialButton.prototype.disable = function() {
      this.element_.disabled = true;
    };
    MaterialButton.prototype['disable'] = MaterialButton.prototype.disable;
    MaterialButton.prototype.enable = function() {
      this.element_.disabled = false;
    };
    MaterialButton.prototype['enable'] = MaterialButton.prototype.enable;
    MaterialButton.prototype.init = function() {
      if (this.element_) {
        if (this.element_.classList.contains(this.CssClasses_.RIPPLE_EFFECT)) {
          var rippleContainer = document.createElement('span');
          rippleContainer.classList.add(this.CssClasses_.RIPPLE_CONTAINER);
          this.rippleElement_ = document.createElement('span');
          this.rippleElement_.classList.add(this.CssClasses_.RIPPLE);
          rippleContainer.appendChild(this.rippleElement_);
          this.boundRippleBlurHandler = this.blurHandler_.bind(this);
          this.rippleElement_.addEventListener('mouseup', this.boundRippleBlurHandler);
          this.element_.appendChild(rippleContainer);
        }
        this.boundButtonBlurHandler = this.blurHandler_.bind(this);
        this.element_.addEventListener('mouseup', this.boundButtonBlurHandler);
        this.element_.addEventListener('mouseleave', this.boundButtonBlurHandler);
      }
    };
    componentHandler.register({
      constructor: MaterialButton,
      classAsString: 'MaterialButton',
      cssClass: 'mdl-js-button',
      widget: true
    });
    var MaterialCheckbox = function MaterialCheckbox(element) {
      this.element_ = element;
      this.init();
    };
    window['MaterialCheckbox'] = MaterialCheckbox;
    MaterialCheckbox.prototype.Constant_ = {TINY_TIMEOUT: 0.001};
    MaterialCheckbox.prototype.CssClasses_ = {
      INPUT: 'mdl-checkbox__input',
      BOX_OUTLINE: 'mdl-checkbox__box-outline',
      FOCUS_HELPER: 'mdl-checkbox__focus-helper',
      TICK_OUTLINE: 'mdl-checkbox__tick-outline',
      RIPPLE_EFFECT: 'mdl-js-ripple-effect',
      RIPPLE_IGNORE_EVENTS: 'mdl-js-ripple-effect--ignore-events',
      RIPPLE_CONTAINER: 'mdl-checkbox__ripple-container',
      RIPPLE_CENTER: 'mdl-ripple--center',
      RIPPLE: 'mdl-ripple',
      IS_FOCUSED: 'is-focused',
      IS_DISABLED: 'is-disabled',
      IS_CHECKED: 'is-checked',
      IS_UPGRADED: 'is-upgraded'
    };
    MaterialCheckbox.prototype.onChange_ = function(event) {
      this.updateClasses_();
    };
    MaterialCheckbox.prototype.onFocus_ = function(event) {
      this.element_.classList.add(this.CssClasses_.IS_FOCUSED);
    };
    MaterialCheckbox.prototype.onBlur_ = function(event) {
      this.element_.classList.remove(this.CssClasses_.IS_FOCUSED);
    };
    MaterialCheckbox.prototype.onMouseUp_ = function(event) {
      this.blur_();
    };
    MaterialCheckbox.prototype.updateClasses_ = function() {
      this.checkDisabled();
      this.checkToggleState();
    };
    MaterialCheckbox.prototype.blur_ = function() {
      window.setTimeout(function() {
        this.inputElement_.blur();
      }.bind(this), this.Constant_.TINY_TIMEOUT);
    };
    MaterialCheckbox.prototype.checkToggleState = function() {
      if (this.inputElement_.checked) {
        this.element_.classList.add(this.CssClasses_.IS_CHECKED);
      } else {
        this.element_.classList.remove(this.CssClasses_.IS_CHECKED);
      }
    };
    MaterialCheckbox.prototype['checkToggleState'] = MaterialCheckbox.prototype.checkToggleState;
    MaterialCheckbox.prototype.checkDisabled = function() {
      if (this.inputElement_.disabled) {
        this.element_.classList.add(this.CssClasses_.IS_DISABLED);
      } else {
        this.element_.classList.remove(this.CssClasses_.IS_DISABLED);
      }
    };
    MaterialCheckbox.prototype['checkDisabled'] = MaterialCheckbox.prototype.checkDisabled;
    MaterialCheckbox.prototype.disable = function() {
      this.inputElement_.disabled = true;
      this.updateClasses_();
    };
    MaterialCheckbox.prototype['disable'] = MaterialCheckbox.prototype.disable;
    MaterialCheckbox.prototype.enable = function() {
      this.inputElement_.disabled = false;
      this.updateClasses_();
    };
    MaterialCheckbox.prototype['enable'] = MaterialCheckbox.prototype.enable;
    MaterialCheckbox.prototype.check = function() {
      this.inputElement_.checked = true;
      this.updateClasses_();
    };
    MaterialCheckbox.prototype['check'] = MaterialCheckbox.prototype.check;
    MaterialCheckbox.prototype.uncheck = function() {
      this.inputElement_.checked = false;
      this.updateClasses_();
    };
    MaterialCheckbox.prototype['uncheck'] = MaterialCheckbox.prototype.uncheck;
    MaterialCheckbox.prototype.init = function() {
      if (this.element_) {
        this.inputElement_ = this.element_.querySelector('.' + this.CssClasses_.INPUT);
        var boxOutline = document.createElement('span');
        boxOutline.classList.add(this.CssClasses_.BOX_OUTLINE);
        var tickContainer = document.createElement('span');
        tickContainer.classList.add(this.CssClasses_.FOCUS_HELPER);
        var tickOutline = document.createElement('span');
        tickOutline.classList.add(this.CssClasses_.TICK_OUTLINE);
        boxOutline.appendChild(tickOutline);
        this.element_.appendChild(tickContainer);
        this.element_.appendChild(boxOutline);
        if (this.element_.classList.contains(this.CssClasses_.RIPPLE_EFFECT)) {
          this.element_.classList.add(this.CssClasses_.RIPPLE_IGNORE_EVENTS);
          this.rippleContainerElement_ = document.createElement('span');
          this.rippleContainerElement_.classList.add(this.CssClasses_.RIPPLE_CONTAINER);
          this.rippleContainerElement_.classList.add(this.CssClasses_.RIPPLE_EFFECT);
          this.rippleContainerElement_.classList.add(this.CssClasses_.RIPPLE_CENTER);
          this.boundRippleMouseUp = this.onMouseUp_.bind(this);
          this.rippleContainerElement_.addEventListener('mouseup', this.boundRippleMouseUp);
          var ripple = document.createElement('span');
          ripple.classList.add(this.CssClasses_.RIPPLE);
          this.rippleContainerElement_.appendChild(ripple);
          this.element_.appendChild(this.rippleContainerElement_);
        }
        this.boundInputOnChange = this.onChange_.bind(this);
        this.boundInputOnFocus = this.onFocus_.bind(this);
        this.boundInputOnBlur = this.onBlur_.bind(this);
        this.boundElementMouseUp = this.onMouseUp_.bind(this);
        this.inputElement_.addEventListener('change', this.boundInputOnChange);
        this.inputElement_.addEventListener('focus', this.boundInputOnFocus);
        this.inputElement_.addEventListener('blur', this.boundInputOnBlur);
        this.element_.addEventListener('mouseup', this.boundElementMouseUp);
        this.updateClasses_();
        this.element_.classList.add(this.CssClasses_.IS_UPGRADED);
      }
    };
    componentHandler.register({
      constructor: MaterialCheckbox,
      classAsString: 'MaterialCheckbox',
      cssClass: 'mdl-js-checkbox',
      widget: true
    });
    var MaterialIconToggle = function MaterialIconToggle(element) {
      this.element_ = element;
      this.init();
    };
    window['MaterialIconToggle'] = MaterialIconToggle;
    MaterialIconToggle.prototype.Constant_ = {TINY_TIMEOUT: 0.001};
    MaterialIconToggle.prototype.CssClasses_ = {
      INPUT: 'mdl-icon-toggle__input',
      JS_RIPPLE_EFFECT: 'mdl-js-ripple-effect',
      RIPPLE_IGNORE_EVENTS: 'mdl-js-ripple-effect--ignore-events',
      RIPPLE_CONTAINER: 'mdl-icon-toggle__ripple-container',
      RIPPLE_CENTER: 'mdl-ripple--center',
      RIPPLE: 'mdl-ripple',
      IS_FOCUSED: 'is-focused',
      IS_DISABLED: 'is-disabled',
      IS_CHECKED: 'is-checked'
    };
    MaterialIconToggle.prototype.onChange_ = function(event) {
      this.updateClasses_();
    };
    MaterialIconToggle.prototype.onFocus_ = function(event) {
      this.element_.classList.add(this.CssClasses_.IS_FOCUSED);
    };
    MaterialIconToggle.prototype.onBlur_ = function(event) {
      this.element_.classList.remove(this.CssClasses_.IS_FOCUSED);
    };
    MaterialIconToggle.prototype.onMouseUp_ = function(event) {
      this.blur_();
    };
    MaterialIconToggle.prototype.updateClasses_ = function() {
      this.checkDisabled();
      this.checkToggleState();
    };
    MaterialIconToggle.prototype.blur_ = function() {
      window.setTimeout(function() {
        this.inputElement_.blur();
      }.bind(this), this.Constant_.TINY_TIMEOUT);
    };
    MaterialIconToggle.prototype.checkToggleState = function() {
      if (this.inputElement_.checked) {
        this.element_.classList.add(this.CssClasses_.IS_CHECKED);
      } else {
        this.element_.classList.remove(this.CssClasses_.IS_CHECKED);
      }
    };
    MaterialIconToggle.prototype['checkToggleState'] = MaterialIconToggle.prototype.checkToggleState;
    MaterialIconToggle.prototype.checkDisabled = function() {
      if (this.inputElement_.disabled) {
        this.element_.classList.add(this.CssClasses_.IS_DISABLED);
      } else {
        this.element_.classList.remove(this.CssClasses_.IS_DISABLED);
      }
    };
    MaterialIconToggle.prototype['checkDisabled'] = MaterialIconToggle.prototype.checkDisabled;
    MaterialIconToggle.prototype.disable = function() {
      this.inputElement_.disabled = true;
      this.updateClasses_();
    };
    MaterialIconToggle.prototype['disable'] = MaterialIconToggle.prototype.disable;
    MaterialIconToggle.prototype.enable = function() {
      this.inputElement_.disabled = false;
      this.updateClasses_();
    };
    MaterialIconToggle.prototype['enable'] = MaterialIconToggle.prototype.enable;
    MaterialIconToggle.prototype.check = function() {
      this.inputElement_.checked = true;
      this.updateClasses_();
    };
    MaterialIconToggle.prototype['check'] = MaterialIconToggle.prototype.check;
    MaterialIconToggle.prototype.uncheck = function() {
      this.inputElement_.checked = false;
      this.updateClasses_();
    };
    MaterialIconToggle.prototype['uncheck'] = MaterialIconToggle.prototype.uncheck;
    MaterialIconToggle.prototype.init = function() {
      if (this.element_) {
        this.inputElement_ = this.element_.querySelector('.' + this.CssClasses_.INPUT);
        if (this.element_.classList.contains(this.CssClasses_.JS_RIPPLE_EFFECT)) {
          this.element_.classList.add(this.CssClasses_.RIPPLE_IGNORE_EVENTS);
          this.rippleContainerElement_ = document.createElement('span');
          this.rippleContainerElement_.classList.add(this.CssClasses_.RIPPLE_CONTAINER);
          this.rippleContainerElement_.classList.add(this.CssClasses_.JS_RIPPLE_EFFECT);
          this.rippleContainerElement_.classList.add(this.CssClasses_.RIPPLE_CENTER);
          this.boundRippleMouseUp = this.onMouseUp_.bind(this);
          this.rippleContainerElement_.addEventListener('mouseup', this.boundRippleMouseUp);
          var ripple = document.createElement('span');
          ripple.classList.add(this.CssClasses_.RIPPLE);
          this.rippleContainerElement_.appendChild(ripple);
          this.element_.appendChild(this.rippleContainerElement_);
        }
        this.boundInputOnChange = this.onChange_.bind(this);
        this.boundInputOnFocus = this.onFocus_.bind(this);
        this.boundInputOnBlur = this.onBlur_.bind(this);
        this.boundElementOnMouseUp = this.onMouseUp_.bind(this);
        this.inputElement_.addEventListener('change', this.boundInputOnChange);
        this.inputElement_.addEventListener('focus', this.boundInputOnFocus);
        this.inputElement_.addEventListener('blur', this.boundInputOnBlur);
        this.element_.addEventListener('mouseup', this.boundElementOnMouseUp);
        this.updateClasses_();
        this.element_.classList.add('is-upgraded');
      }
    };
    componentHandler.register({
      constructor: MaterialIconToggle,
      classAsString: 'MaterialIconToggle',
      cssClass: 'mdl-js-icon-toggle',
      widget: true
    });
    var MaterialMenu = function MaterialMenu(element) {
      this.element_ = element;
      this.init();
    };
    window['MaterialMenu'] = MaterialMenu;
    MaterialMenu.prototype.Constant_ = {
      TRANSITION_DURATION_SECONDS: 0.3,
      TRANSITION_DURATION_FRACTION: 0.8,
      CLOSE_TIMEOUT: 150
    };
    MaterialMenu.prototype.Keycodes_ = {
      ENTER: 13,
      ESCAPE: 27,
      SPACE: 32,
      UP_ARROW: 38,
      DOWN_ARROW: 40
    };
    MaterialMenu.prototype.CssClasses_ = {
      CONTAINER: 'mdl-menu__container',
      OUTLINE: 'mdl-menu__outline',
      ITEM: 'mdl-menu__item',
      ITEM_RIPPLE_CONTAINER: 'mdl-menu__item-ripple-container',
      RIPPLE_EFFECT: 'mdl-js-ripple-effect',
      RIPPLE_IGNORE_EVENTS: 'mdl-js-ripple-effect--ignore-events',
      RIPPLE: 'mdl-ripple',
      IS_UPGRADED: 'is-upgraded',
      IS_VISIBLE: 'is-visible',
      IS_ANIMATING: 'is-animating',
      BOTTOM_LEFT: 'mdl-menu--bottom-left',
      BOTTOM_RIGHT: 'mdl-menu--bottom-right',
      TOP_LEFT: 'mdl-menu--top-left',
      TOP_RIGHT: 'mdl-menu--top-right',
      UNALIGNED: 'mdl-menu--unaligned'
    };
    MaterialMenu.prototype.init = function() {
      if (this.element_) {
        var container = document.createElement('div');
        container.classList.add(this.CssClasses_.CONTAINER);
        this.element_.parentElement.insertBefore(container, this.element_);
        this.element_.parentElement.removeChild(this.element_);
        container.appendChild(this.element_);
        this.container_ = container;
        var outline = document.createElement('div');
        outline.classList.add(this.CssClasses_.OUTLINE);
        this.outline_ = outline;
        container.insertBefore(outline, this.element_);
        var forElId = this.element_.getAttribute('for') || this.element_.getAttribute('data-mdl-for');
        var forEl = null;
        if (forElId) {
          forEl = document.getElementById(forElId);
          if (forEl) {
            this.forElement_ = forEl;
            forEl.addEventListener('click', this.handleForClick_.bind(this));
            forEl.addEventListener('keydown', this.handleForKeyboardEvent_.bind(this));
          }
        }
        var items = this.element_.querySelectorAll('.' + this.CssClasses_.ITEM);
        this.boundItemKeydown_ = this.handleItemKeyboardEvent_.bind(this);
        this.boundItemClick_ = this.handleItemClick_.bind(this);
        for (var i = 0; i < items.length; i++) {
          items[i].addEventListener('click', this.boundItemClick_);
          items[i].tabIndex = '-1';
          items[i].addEventListener('keydown', this.boundItemKeydown_);
        }
        if (this.element_.classList.contains(this.CssClasses_.RIPPLE_EFFECT)) {
          this.element_.classList.add(this.CssClasses_.RIPPLE_IGNORE_EVENTS);
          for (i = 0; i < items.length; i++) {
            var item = items[i];
            var rippleContainer = document.createElement('span');
            rippleContainer.classList.add(this.CssClasses_.ITEM_RIPPLE_CONTAINER);
            var ripple = document.createElement('span');
            ripple.classList.add(this.CssClasses_.RIPPLE);
            rippleContainer.appendChild(ripple);
            item.appendChild(rippleContainer);
            item.classList.add(this.CssClasses_.RIPPLE_EFFECT);
          }
        }
        if (this.element_.classList.contains(this.CssClasses_.BOTTOM_LEFT)) {
          this.outline_.classList.add(this.CssClasses_.BOTTOM_LEFT);
        }
        if (this.element_.classList.contains(this.CssClasses_.BOTTOM_RIGHT)) {
          this.outline_.classList.add(this.CssClasses_.BOTTOM_RIGHT);
        }
        if (this.element_.classList.contains(this.CssClasses_.TOP_LEFT)) {
          this.outline_.classList.add(this.CssClasses_.TOP_LEFT);
        }
        if (this.element_.classList.contains(this.CssClasses_.TOP_RIGHT)) {
          this.outline_.classList.add(this.CssClasses_.TOP_RIGHT);
        }
        if (this.element_.classList.contains(this.CssClasses_.UNALIGNED)) {
          this.outline_.classList.add(this.CssClasses_.UNALIGNED);
        }
        container.classList.add(this.CssClasses_.IS_UPGRADED);
      }
    };
    MaterialMenu.prototype.handleForClick_ = function(evt) {
      if (this.element_ && this.forElement_) {
        var rect = this.forElement_.getBoundingClientRect();
        var forRect = this.forElement_.parentElement.getBoundingClientRect();
        if (this.element_.classList.contains(this.CssClasses_.UNALIGNED)) {} else if (this.element_.classList.contains(this.CssClasses_.BOTTOM_RIGHT)) {
          this.container_.style.right = forRect.right - rect.right + 'px';
          this.container_.style.top = this.forElement_.offsetTop + this.forElement_.offsetHeight + 'px';
        } else if (this.element_.classList.contains(this.CssClasses_.TOP_LEFT)) {
          this.container_.style.left = this.forElement_.offsetLeft + 'px';
          this.container_.style.bottom = forRect.bottom - rect.top + 'px';
        } else if (this.element_.classList.contains(this.CssClasses_.TOP_RIGHT)) {
          this.container_.style.right = forRect.right - rect.right + 'px';
          this.container_.style.bottom = forRect.bottom - rect.top + 'px';
        } else {
          this.container_.style.left = this.forElement_.offsetLeft + 'px';
          this.container_.style.top = this.forElement_.offsetTop + this.forElement_.offsetHeight + 'px';
        }
      }
      this.toggle(evt);
    };
    MaterialMenu.prototype.handleForKeyboardEvent_ = function(evt) {
      if (this.element_ && this.container_ && this.forElement_) {
        var items = this.element_.querySelectorAll('.' + this.CssClasses_.ITEM + ':not([disabled])');
        if (items && items.length > 0 && this.container_.classList.contains(this.CssClasses_.IS_VISIBLE)) {
          if (evt.keyCode === this.Keycodes_.UP_ARROW) {
            evt.preventDefault();
            items[items.length - 1].focus();
          } else if (evt.keyCode === this.Keycodes_.DOWN_ARROW) {
            evt.preventDefault();
            items[0].focus();
          }
        }
      }
    };
    MaterialMenu.prototype.handleItemKeyboardEvent_ = function(evt) {
      if (this.element_ && this.container_) {
        var items = this.element_.querySelectorAll('.' + this.CssClasses_.ITEM + ':not([disabled])');
        if (items && items.length > 0 && this.container_.classList.contains(this.CssClasses_.IS_VISIBLE)) {
          var currentIndex = Array.prototype.slice.call(items).indexOf(evt.target);
          if (evt.keyCode === this.Keycodes_.UP_ARROW) {
            evt.preventDefault();
            if (currentIndex > 0) {
              items[currentIndex - 1].focus();
            } else {
              items[items.length - 1].focus();
            }
          } else if (evt.keyCode === this.Keycodes_.DOWN_ARROW) {
            evt.preventDefault();
            if (items.length > currentIndex + 1) {
              items[currentIndex + 1].focus();
            } else {
              items[0].focus();
            }
          } else if (evt.keyCode === this.Keycodes_.SPACE || evt.keyCode === this.Keycodes_.ENTER) {
            evt.preventDefault();
            var e = new MouseEvent('mousedown');
            evt.target.dispatchEvent(e);
            e = new MouseEvent('mouseup');
            evt.target.dispatchEvent(e);
            evt.target.click();
          } else if (evt.keyCode === this.Keycodes_.ESCAPE) {
            evt.preventDefault();
            this.hide();
          }
        }
      }
    };
    MaterialMenu.prototype.handleItemClick_ = function(evt) {
      if (evt.target.hasAttribute('disabled')) {
        evt.stopPropagation();
      } else {
        this.closing_ = true;
        window.setTimeout(function(evt) {
          this.hide();
          this.closing_ = false;
        }.bind(this), this.Constant_.CLOSE_TIMEOUT);
      }
    };
    MaterialMenu.prototype.applyClip_ = function(height, width) {
      if (this.element_.classList.contains(this.CssClasses_.UNALIGNED)) {
        this.element_.style.clip = '';
      } else if (this.element_.classList.contains(this.CssClasses_.BOTTOM_RIGHT)) {
        this.element_.style.clip = 'rect(0 ' + width + 'px ' + '0 ' + width + 'px)';
      } else if (this.element_.classList.contains(this.CssClasses_.TOP_LEFT)) {
        this.element_.style.clip = 'rect(' + height + 'px 0 ' + height + 'px 0)';
      } else if (this.element_.classList.contains(this.CssClasses_.TOP_RIGHT)) {
        this.element_.style.clip = 'rect(' + height + 'px ' + width + 'px ' + height + 'px ' + width + 'px)';
      } else {
        this.element_.style.clip = '';
      }
    };
    MaterialMenu.prototype.removeAnimationEndListener_ = function(evt) {
      evt.target.classList.remove(MaterialMenu.prototype.CssClasses_.IS_ANIMATING);
    };
    MaterialMenu.prototype.addAnimationEndListener_ = function() {
      this.element_.addEventListener('transitionend', this.removeAnimationEndListener_);
      this.element_.addEventListener('webkitTransitionEnd', this.removeAnimationEndListener_);
    };
    MaterialMenu.prototype.show = function(evt) {
      if (this.element_ && this.container_ && this.outline_) {
        var height = this.element_.getBoundingClientRect().height;
        var width = this.element_.getBoundingClientRect().width;
        this.container_.style.width = width + 'px';
        this.container_.style.height = height + 'px';
        this.outline_.style.width = width + 'px';
        this.outline_.style.height = height + 'px';
        var transitionDuration = this.Constant_.TRANSITION_DURATION_SECONDS * this.Constant_.TRANSITION_DURATION_FRACTION;
        var items = this.element_.querySelectorAll('.' + this.CssClasses_.ITEM);
        for (var i = 0; i < items.length; i++) {
          var itemDelay = null;
          if (this.element_.classList.contains(this.CssClasses_.TOP_LEFT) || this.element_.classList.contains(this.CssClasses_.TOP_RIGHT)) {
            itemDelay = (height - items[i].offsetTop - items[i].offsetHeight) / height * transitionDuration + 's';
          } else {
            itemDelay = items[i].offsetTop / height * transitionDuration + 's';
          }
          items[i].style.transitionDelay = itemDelay;
        }
        this.applyClip_(height, width);
        window.requestAnimationFrame(function() {
          this.element_.classList.add(this.CssClasses_.IS_ANIMATING);
          this.element_.style.clip = 'rect(0 ' + width + 'px ' + height + 'px 0)';
          this.container_.classList.add(this.CssClasses_.IS_VISIBLE);
        }.bind(this));
        this.addAnimationEndListener_();
        var callback = function(e) {
          if (e !== evt && !this.closing_ && e.target.parentNode !== this.element_) {
            document.removeEventListener('click', callback);
            this.hide();
          }
        }.bind(this);
        document.addEventListener('click', callback);
      }
    };
    MaterialMenu.prototype['show'] = MaterialMenu.prototype.show;
    MaterialMenu.prototype.hide = function() {
      if (this.element_ && this.container_ && this.outline_) {
        var items = this.element_.querySelectorAll('.' + this.CssClasses_.ITEM);
        for (var i = 0; i < items.length; i++) {
          items[i].style.removeProperty('transition-delay');
        }
        var rect = this.element_.getBoundingClientRect();
        var height = rect.height;
        var width = rect.width;
        this.element_.classList.add(this.CssClasses_.IS_ANIMATING);
        this.applyClip_(height, width);
        this.container_.classList.remove(this.CssClasses_.IS_VISIBLE);
        this.addAnimationEndListener_();
      }
    };
    MaterialMenu.prototype['hide'] = MaterialMenu.prototype.hide;
    MaterialMenu.prototype.toggle = function(evt) {
      if (this.container_.classList.contains(this.CssClasses_.IS_VISIBLE)) {
        this.hide();
      } else {
        this.show(evt);
      }
    };
    MaterialMenu.prototype['toggle'] = MaterialMenu.prototype.toggle;
    componentHandler.register({
      constructor: MaterialMenu,
      classAsString: 'MaterialMenu',
      cssClass: 'mdl-js-menu',
      widget: true
    });
    var MaterialProgress = function MaterialProgress(element) {
      this.element_ = element;
      this.init();
    };
    window['MaterialProgress'] = MaterialProgress;
    MaterialProgress.prototype.Constant_ = {};
    MaterialProgress.prototype.CssClasses_ = {INDETERMINATE_CLASS: 'mdl-progress__indeterminate'};
    MaterialProgress.prototype.setProgress = function(p) {
      if (this.element_.classList.contains(this.CssClasses_.INDETERMINATE_CLASS)) {
        return;
      }
      this.progressbar_.style.width = p + '%';
    };
    MaterialProgress.prototype['setProgress'] = MaterialProgress.prototype.setProgress;
    MaterialProgress.prototype.setBuffer = function(p) {
      this.bufferbar_.style.width = p + '%';
      this.auxbar_.style.width = 100 - p + '%';
    };
    MaterialProgress.prototype['setBuffer'] = MaterialProgress.prototype.setBuffer;
    MaterialProgress.prototype.init = function() {
      if (this.element_) {
        var el = document.createElement('div');
        el.className = 'progressbar bar bar1';
        this.element_.appendChild(el);
        this.progressbar_ = el;
        el = document.createElement('div');
        el.className = 'bufferbar bar bar2';
        this.element_.appendChild(el);
        this.bufferbar_ = el;
        el = document.createElement('div');
        el.className = 'auxbar bar bar3';
        this.element_.appendChild(el);
        this.auxbar_ = el;
        this.progressbar_.style.width = '0%';
        this.bufferbar_.style.width = '100%';
        this.auxbar_.style.width = '0%';
        this.element_.classList.add('is-upgraded');
      }
    };
    componentHandler.register({
      constructor: MaterialProgress,
      classAsString: 'MaterialProgress',
      cssClass: 'mdl-js-progress',
      widget: true
    });
    var MaterialRadio = function MaterialRadio(element) {
      this.element_ = element;
      this.init();
    };
    window['MaterialRadio'] = MaterialRadio;
    MaterialRadio.prototype.Constant_ = {TINY_TIMEOUT: 0.001};
    MaterialRadio.prototype.CssClasses_ = {
      IS_FOCUSED: 'is-focused',
      IS_DISABLED: 'is-disabled',
      IS_CHECKED: 'is-checked',
      IS_UPGRADED: 'is-upgraded',
      JS_RADIO: 'mdl-js-radio',
      RADIO_BTN: 'mdl-radio__button',
      RADIO_OUTER_CIRCLE: 'mdl-radio__outer-circle',
      RADIO_INNER_CIRCLE: 'mdl-radio__inner-circle',
      RIPPLE_EFFECT: 'mdl-js-ripple-effect',
      RIPPLE_IGNORE_EVENTS: 'mdl-js-ripple-effect--ignore-events',
      RIPPLE_CONTAINER: 'mdl-radio__ripple-container',
      RIPPLE_CENTER: 'mdl-ripple--center',
      RIPPLE: 'mdl-ripple'
    };
    MaterialRadio.prototype.onChange_ = function(event) {
      var radios = document.getElementsByClassName(this.CssClasses_.JS_RADIO);
      for (var i = 0; i < radios.length; i++) {
        var button = radios[i].querySelector('.' + this.CssClasses_.RADIO_BTN);
        if (button.getAttribute('name') === this.btnElement_.getAttribute('name')) {
          radios[i]['MaterialRadio'].updateClasses_();
        }
      }
    };
    MaterialRadio.prototype.onFocus_ = function(event) {
      this.element_.classList.add(this.CssClasses_.IS_FOCUSED);
    };
    MaterialRadio.prototype.onBlur_ = function(event) {
      this.element_.classList.remove(this.CssClasses_.IS_FOCUSED);
    };
    MaterialRadio.prototype.onMouseup_ = function(event) {
      this.blur_();
    };
    MaterialRadio.prototype.updateClasses_ = function() {
      this.checkDisabled();
      this.checkToggleState();
    };
    MaterialRadio.prototype.blur_ = function() {
      window.setTimeout(function() {
        this.btnElement_.blur();
      }.bind(this), this.Constant_.TINY_TIMEOUT);
    };
    MaterialRadio.prototype.checkDisabled = function() {
      if (this.btnElement_.disabled) {
        this.element_.classList.add(this.CssClasses_.IS_DISABLED);
      } else {
        this.element_.classList.remove(this.CssClasses_.IS_DISABLED);
      }
    };
    MaterialRadio.prototype['checkDisabled'] = MaterialRadio.prototype.checkDisabled;
    MaterialRadio.prototype.checkToggleState = function() {
      if (this.btnElement_.checked) {
        this.element_.classList.add(this.CssClasses_.IS_CHECKED);
      } else {
        this.element_.classList.remove(this.CssClasses_.IS_CHECKED);
      }
    };
    MaterialRadio.prototype['checkToggleState'] = MaterialRadio.prototype.checkToggleState;
    MaterialRadio.prototype.disable = function() {
      this.btnElement_.disabled = true;
      this.updateClasses_();
    };
    MaterialRadio.prototype['disable'] = MaterialRadio.prototype.disable;
    MaterialRadio.prototype.enable = function() {
      this.btnElement_.disabled = false;
      this.updateClasses_();
    };
    MaterialRadio.prototype['enable'] = MaterialRadio.prototype.enable;
    MaterialRadio.prototype.check = function() {
      this.btnElement_.checked = true;
      this.onChange_(null);
    };
    MaterialRadio.prototype['check'] = MaterialRadio.prototype.check;
    MaterialRadio.prototype.uncheck = function() {
      this.btnElement_.checked = false;
      this.onChange_(null);
    };
    MaterialRadio.prototype['uncheck'] = MaterialRadio.prototype.uncheck;
    MaterialRadio.prototype.init = function() {
      if (this.element_) {
        this.btnElement_ = this.element_.querySelector('.' + this.CssClasses_.RADIO_BTN);
        this.boundChangeHandler_ = this.onChange_.bind(this);
        this.boundFocusHandler_ = this.onChange_.bind(this);
        this.boundBlurHandler_ = this.onBlur_.bind(this);
        this.boundMouseUpHandler_ = this.onMouseup_.bind(this);
        var outerCircle = document.createElement('span');
        outerCircle.classList.add(this.CssClasses_.RADIO_OUTER_CIRCLE);
        var innerCircle = document.createElement('span');
        innerCircle.classList.add(this.CssClasses_.RADIO_INNER_CIRCLE);
        this.element_.appendChild(outerCircle);
        this.element_.appendChild(innerCircle);
        var rippleContainer;
        if (this.element_.classList.contains(this.CssClasses_.RIPPLE_EFFECT)) {
          this.element_.classList.add(this.CssClasses_.RIPPLE_IGNORE_EVENTS);
          rippleContainer = document.createElement('span');
          rippleContainer.classList.add(this.CssClasses_.RIPPLE_CONTAINER);
          rippleContainer.classList.add(this.CssClasses_.RIPPLE_EFFECT);
          rippleContainer.classList.add(this.CssClasses_.RIPPLE_CENTER);
          rippleContainer.addEventListener('mouseup', this.boundMouseUpHandler_);
          var ripple = document.createElement('span');
          ripple.classList.add(this.CssClasses_.RIPPLE);
          rippleContainer.appendChild(ripple);
          this.element_.appendChild(rippleContainer);
        }
        this.btnElement_.addEventListener('change', this.boundChangeHandler_);
        this.btnElement_.addEventListener('focus', this.boundFocusHandler_);
        this.btnElement_.addEventListener('blur', this.boundBlurHandler_);
        this.element_.addEventListener('mouseup', this.boundMouseUpHandler_);
        this.updateClasses_();
        this.element_.classList.add(this.CssClasses_.IS_UPGRADED);
      }
    };
    componentHandler.register({
      constructor: MaterialRadio,
      classAsString: 'MaterialRadio',
      cssClass: 'mdl-js-radio',
      widget: true
    });
    var MaterialSlider = function MaterialSlider(element) {
      this.element_ = element;
      this.isIE_ = window.navigator.msPointerEnabled;
      this.init();
    };
    window['MaterialSlider'] = MaterialSlider;
    MaterialSlider.prototype.Constant_ = {};
    MaterialSlider.prototype.CssClasses_ = {
      IE_CONTAINER: 'mdl-slider__ie-container',
      SLIDER_CONTAINER: 'mdl-slider__container',
      BACKGROUND_FLEX: 'mdl-slider__background-flex',
      BACKGROUND_LOWER: 'mdl-slider__background-lower',
      BACKGROUND_UPPER: 'mdl-slider__background-upper',
      IS_LOWEST_VALUE: 'is-lowest-value',
      IS_UPGRADED: 'is-upgraded'
    };
    MaterialSlider.prototype.onInput_ = function(event) {
      this.updateValueStyles_();
    };
    MaterialSlider.prototype.onChange_ = function(event) {
      this.updateValueStyles_();
    };
    MaterialSlider.prototype.onMouseUp_ = function(event) {
      event.target.blur();
    };
    MaterialSlider.prototype.onContainerMouseDown_ = function(event) {
      if (event.target !== this.element_.parentElement) {
        return;
      }
      event.preventDefault();
      var newEvent = new MouseEvent('mousedown', {
        target: event.target,
        buttons: event.buttons,
        clientX: event.clientX,
        clientY: this.element_.getBoundingClientRect().y
      });
      this.element_.dispatchEvent(newEvent);
    };
    MaterialSlider.prototype.updateValueStyles_ = function() {
      var fraction = (this.element_.value - this.element_.min) / (this.element_.max - this.element_.min);
      if (fraction === 0) {
        this.element_.classList.add(this.CssClasses_.IS_LOWEST_VALUE);
      } else {
        this.element_.classList.remove(this.CssClasses_.IS_LOWEST_VALUE);
      }
      if (!this.isIE_) {
        this.backgroundLower_.style.flex = fraction;
        this.backgroundLower_.style.webkitFlex = fraction;
        this.backgroundUpper_.style.flex = 1 - fraction;
        this.backgroundUpper_.style.webkitFlex = 1 - fraction;
      }
    };
    MaterialSlider.prototype.disable = function() {
      this.element_.disabled = true;
    };
    MaterialSlider.prototype['disable'] = MaterialSlider.prototype.disable;
    MaterialSlider.prototype.enable = function() {
      this.element_.disabled = false;
    };
    MaterialSlider.prototype['enable'] = MaterialSlider.prototype.enable;
    MaterialSlider.prototype.change = function(value) {
      if (typeof value !== 'undefined') {
        this.element_.value = value;
      }
      this.updateValueStyles_();
    };
    MaterialSlider.prototype['change'] = MaterialSlider.prototype.change;
    MaterialSlider.prototype.init = function() {
      if (this.element_) {
        if (this.isIE_) {
          var containerIE = document.createElement('div');
          containerIE.classList.add(this.CssClasses_.IE_CONTAINER);
          this.element_.parentElement.insertBefore(containerIE, this.element_);
          this.element_.parentElement.removeChild(this.element_);
          containerIE.appendChild(this.element_);
        } else {
          var container = document.createElement('div');
          container.classList.add(this.CssClasses_.SLIDER_CONTAINER);
          this.element_.parentElement.insertBefore(container, this.element_);
          this.element_.parentElement.removeChild(this.element_);
          container.appendChild(this.element_);
          var backgroundFlex = document.createElement('div');
          backgroundFlex.classList.add(this.CssClasses_.BACKGROUND_FLEX);
          container.appendChild(backgroundFlex);
          this.backgroundLower_ = document.createElement('div');
          this.backgroundLower_.classList.add(this.CssClasses_.BACKGROUND_LOWER);
          backgroundFlex.appendChild(this.backgroundLower_);
          this.backgroundUpper_ = document.createElement('div');
          this.backgroundUpper_.classList.add(this.CssClasses_.BACKGROUND_UPPER);
          backgroundFlex.appendChild(this.backgroundUpper_);
        }
        this.boundInputHandler = this.onInput_.bind(this);
        this.boundChangeHandler = this.onChange_.bind(this);
        this.boundMouseUpHandler = this.onMouseUp_.bind(this);
        this.boundContainerMouseDownHandler = this.onContainerMouseDown_.bind(this);
        this.element_.addEventListener('input', this.boundInputHandler);
        this.element_.addEventListener('change', this.boundChangeHandler);
        this.element_.addEventListener('mouseup', this.boundMouseUpHandler);
        this.element_.parentElement.addEventListener('mousedown', this.boundContainerMouseDownHandler);
        this.updateValueStyles_();
        this.element_.classList.add(this.CssClasses_.IS_UPGRADED);
      }
    };
    componentHandler.register({
      constructor: MaterialSlider,
      classAsString: 'MaterialSlider',
      cssClass: 'mdl-js-slider',
      widget: true
    });
    var MaterialSnackbar = function MaterialSnackbar(element) {
      this.element_ = element;
      this.textElement_ = this.element_.querySelector('.' + this.cssClasses_.MESSAGE);
      this.actionElement_ = this.element_.querySelector('.' + this.cssClasses_.ACTION);
      if (!this.textElement_) {
        throw new Error('There must be a message element for a snackbar.');
      }
      if (!this.actionElement_) {
        throw new Error('There must be an action element for a snackbar.');
      }
      this.active = false;
      this.actionHandler_ = undefined;
      this.message_ = undefined;
      this.actionText_ = undefined;
      this.queuedNotifications_ = [];
      this.setActionHidden_(true);
    };
    window['MaterialSnackbar'] = MaterialSnackbar;
    MaterialSnackbar.prototype.Constant_ = {ANIMATION_LENGTH: 250};
    MaterialSnackbar.prototype.cssClasses_ = {
      SNACKBAR: 'mdl-snackbar',
      MESSAGE: 'mdl-snackbar__text',
      ACTION: 'mdl-snackbar__action',
      ACTIVE: 'mdl-snackbar--active'
    };
    MaterialSnackbar.prototype.displaySnackbar_ = function() {
      this.element_.setAttribute('aria-hidden', 'true');
      if (this.actionHandler_) {
        this.actionElement_.textContent = this.actionText_;
        this.actionElement_.addEventListener('click', this.actionHandler_);
        this.setActionHidden_(false);
      }
      this.textElement_.textContent = this.message_;
      this.element_.classList.add(this.cssClasses_.ACTIVE);
      this.element_.setAttribute('aria-hidden', 'false');
      setTimeout(this.cleanup_.bind(this), this.timeout_);
    };
    MaterialSnackbar.prototype.showSnackbar = function(data) {
      if (data === undefined) {
        throw new Error('Please provide a data object with at least a message to display.');
      }
      if (data['message'] === undefined) {
        throw new Error('Please provide a message to be displayed.');
      }
      if (data['actionHandler'] && !data['actionText']) {
        throw new Error('Please provide action text with the handler.');
      }
      if (this.active) {
        this.queuedNotifications_.push(data);
      } else {
        this.active = true;
        this.message_ = data['message'];
        if (data['timeout']) {
          this.timeout_ = data['timeout'];
        } else {
          this.timeout_ = 2750;
        }
        if (data['actionHandler']) {
          this.actionHandler_ = data['actionHandler'];
        }
        if (data['actionText']) {
          this.actionText_ = data['actionText'];
        }
        this.displaySnackbar_();
      }
    };
    MaterialSnackbar.prototype['showSnackbar'] = MaterialSnackbar.prototype.showSnackbar;
    MaterialSnackbar.prototype.checkQueue_ = function() {
      if (this.queuedNotifications_.length > 0) {
        this.showSnackbar(this.queuedNotifications_.shift());
      }
    };
    MaterialSnackbar.prototype.cleanup_ = function() {
      this.element_.classList.remove(this.cssClasses_.ACTIVE);
      setTimeout(function() {
        this.element_.setAttribute('aria-hidden', 'true');
        this.textElement_.textContent = '';
        if (!Boolean(this.actionElement_.getAttribute('aria-hidden'))) {
          this.setActionHidden_(true);
          this.actionElement_.textContent = '';
          this.actionElement_.removeEventListener('click', this.actionHandler_);
        }
        this.actionHandler_ = undefined;
        this.message_ = undefined;
        this.actionText_ = undefined;
        this.active = false;
        this.checkQueue_();
      }.bind(this), this.Constant_.ANIMATION_LENGTH);
    };
    MaterialSnackbar.prototype.setActionHidden_ = function(value) {
      if (value) {
        this.actionElement_.setAttribute('aria-hidden', 'true');
      } else {
        this.actionElement_.removeAttribute('aria-hidden');
      }
    };
    componentHandler.register({
      constructor: MaterialSnackbar,
      classAsString: 'MaterialSnackbar',
      cssClass: 'mdl-js-snackbar',
      widget: true
    });
    var MaterialSpinner = function MaterialSpinner(element) {
      this.element_ = element;
      this.init();
    };
    window['MaterialSpinner'] = MaterialSpinner;
    MaterialSpinner.prototype.Constant_ = {MDL_SPINNER_LAYER_COUNT: 4};
    MaterialSpinner.prototype.CssClasses_ = {
      MDL_SPINNER_LAYER: 'mdl-spinner__layer',
      MDL_SPINNER_CIRCLE_CLIPPER: 'mdl-spinner__circle-clipper',
      MDL_SPINNER_CIRCLE: 'mdl-spinner__circle',
      MDL_SPINNER_GAP_PATCH: 'mdl-spinner__gap-patch',
      MDL_SPINNER_LEFT: 'mdl-spinner__left',
      MDL_SPINNER_RIGHT: 'mdl-spinner__right'
    };
    MaterialSpinner.prototype.createLayer = function(index) {
      var layer = document.createElement('div');
      layer.classList.add(this.CssClasses_.MDL_SPINNER_LAYER);
      layer.classList.add(this.CssClasses_.MDL_SPINNER_LAYER + '-' + index);
      var leftClipper = document.createElement('div');
      leftClipper.classList.add(this.CssClasses_.MDL_SPINNER_CIRCLE_CLIPPER);
      leftClipper.classList.add(this.CssClasses_.MDL_SPINNER_LEFT);
      var gapPatch = document.createElement('div');
      gapPatch.classList.add(this.CssClasses_.MDL_SPINNER_GAP_PATCH);
      var rightClipper = document.createElement('div');
      rightClipper.classList.add(this.CssClasses_.MDL_SPINNER_CIRCLE_CLIPPER);
      rightClipper.classList.add(this.CssClasses_.MDL_SPINNER_RIGHT);
      var circleOwners = [leftClipper, gapPatch, rightClipper];
      for (var i = 0; i < circleOwners.length; i++) {
        var circle = document.createElement('div');
        circle.classList.add(this.CssClasses_.MDL_SPINNER_CIRCLE);
        circleOwners[i].appendChild(circle);
      }
      layer.appendChild(leftClipper);
      layer.appendChild(gapPatch);
      layer.appendChild(rightClipper);
      this.element_.appendChild(layer);
    };
    MaterialSpinner.prototype['createLayer'] = MaterialSpinner.prototype.createLayer;
    MaterialSpinner.prototype.stop = function() {
      this.element_.classList.remove('is-active');
    };
    MaterialSpinner.prototype['stop'] = MaterialSpinner.prototype.stop;
    MaterialSpinner.prototype.start = function() {
      this.element_.classList.add('is-active');
    };
    MaterialSpinner.prototype['start'] = MaterialSpinner.prototype.start;
    MaterialSpinner.prototype.init = function() {
      if (this.element_) {
        for (var i = 1; i <= this.Constant_.MDL_SPINNER_LAYER_COUNT; i++) {
          this.createLayer(i);
        }
        this.element_.classList.add('is-upgraded');
      }
    };
    componentHandler.register({
      constructor: MaterialSpinner,
      classAsString: 'MaterialSpinner',
      cssClass: 'mdl-js-spinner',
      widget: true
    });
    var MaterialSwitch = function MaterialSwitch(element) {
      this.element_ = element;
      this.init();
    };
    window['MaterialSwitch'] = MaterialSwitch;
    MaterialSwitch.prototype.Constant_ = {TINY_TIMEOUT: 0.001};
    MaterialSwitch.prototype.CssClasses_ = {
      INPUT: 'mdl-switch__input',
      TRACK: 'mdl-switch__track',
      THUMB: 'mdl-switch__thumb',
      FOCUS_HELPER: 'mdl-switch__focus-helper',
      RIPPLE_EFFECT: 'mdl-js-ripple-effect',
      RIPPLE_IGNORE_EVENTS: 'mdl-js-ripple-effect--ignore-events',
      RIPPLE_CONTAINER: 'mdl-switch__ripple-container',
      RIPPLE_CENTER: 'mdl-ripple--center',
      RIPPLE: 'mdl-ripple',
      IS_FOCUSED: 'is-focused',
      IS_DISABLED: 'is-disabled',
      IS_CHECKED: 'is-checked'
    };
    MaterialSwitch.prototype.onChange_ = function(event) {
      this.updateClasses_();
    };
    MaterialSwitch.prototype.onFocus_ = function(event) {
      this.element_.classList.add(this.CssClasses_.IS_FOCUSED);
    };
    MaterialSwitch.prototype.onBlur_ = function(event) {
      this.element_.classList.remove(this.CssClasses_.IS_FOCUSED);
    };
    MaterialSwitch.prototype.onMouseUp_ = function(event) {
      this.blur_();
    };
    MaterialSwitch.prototype.updateClasses_ = function() {
      this.checkDisabled();
      this.checkToggleState();
    };
    MaterialSwitch.prototype.blur_ = function() {
      window.setTimeout(function() {
        this.inputElement_.blur();
      }.bind(this), this.Constant_.TINY_TIMEOUT);
    };
    MaterialSwitch.prototype.checkDisabled = function() {
      if (this.inputElement_.disabled) {
        this.element_.classList.add(this.CssClasses_.IS_DISABLED);
      } else {
        this.element_.classList.remove(this.CssClasses_.IS_DISABLED);
      }
    };
    MaterialSwitch.prototype['checkDisabled'] = MaterialSwitch.prototype.checkDisabled;
    MaterialSwitch.prototype.checkToggleState = function() {
      if (this.inputElement_.checked) {
        this.element_.classList.add(this.CssClasses_.IS_CHECKED);
      } else {
        this.element_.classList.remove(this.CssClasses_.IS_CHECKED);
      }
    };
    MaterialSwitch.prototype['checkToggleState'] = MaterialSwitch.prototype.checkToggleState;
    MaterialSwitch.prototype.disable = function() {
      this.inputElement_.disabled = true;
      this.updateClasses_();
    };
    MaterialSwitch.prototype['disable'] = MaterialSwitch.prototype.disable;
    MaterialSwitch.prototype.enable = function() {
      this.inputElement_.disabled = false;
      this.updateClasses_();
    };
    MaterialSwitch.prototype['enable'] = MaterialSwitch.prototype.enable;
    MaterialSwitch.prototype.on = function() {
      this.inputElement_.checked = true;
      this.updateClasses_();
    };
    MaterialSwitch.prototype['on'] = MaterialSwitch.prototype.on;
    MaterialSwitch.prototype.off = function() {
      this.inputElement_.checked = false;
      this.updateClasses_();
    };
    MaterialSwitch.prototype['off'] = MaterialSwitch.prototype.off;
    MaterialSwitch.prototype.init = function() {
      if (this.element_) {
        this.inputElement_ = this.element_.querySelector('.' + this.CssClasses_.INPUT);
        var track = document.createElement('div');
        track.classList.add(this.CssClasses_.TRACK);
        var thumb = document.createElement('div');
        thumb.classList.add(this.CssClasses_.THUMB);
        var focusHelper = document.createElement('span');
        focusHelper.classList.add(this.CssClasses_.FOCUS_HELPER);
        thumb.appendChild(focusHelper);
        this.element_.appendChild(track);
        this.element_.appendChild(thumb);
        this.boundMouseUpHandler = this.onMouseUp_.bind(this);
        if (this.element_.classList.contains(this.CssClasses_.RIPPLE_EFFECT)) {
          this.element_.classList.add(this.CssClasses_.RIPPLE_IGNORE_EVENTS);
          this.rippleContainerElement_ = document.createElement('span');
          this.rippleContainerElement_.classList.add(this.CssClasses_.RIPPLE_CONTAINER);
          this.rippleContainerElement_.classList.add(this.CssClasses_.RIPPLE_EFFECT);
          this.rippleContainerElement_.classList.add(this.CssClasses_.RIPPLE_CENTER);
          this.rippleContainerElement_.addEventListener('mouseup', this.boundMouseUpHandler);
          var ripple = document.createElement('span');
          ripple.classList.add(this.CssClasses_.RIPPLE);
          this.rippleContainerElement_.appendChild(ripple);
          this.element_.appendChild(this.rippleContainerElement_);
        }
        this.boundChangeHandler = this.onChange_.bind(this);
        this.boundFocusHandler = this.onFocus_.bind(this);
        this.boundBlurHandler = this.onBlur_.bind(this);
        this.inputElement_.addEventListener('change', this.boundChangeHandler);
        this.inputElement_.addEventListener('focus', this.boundFocusHandler);
        this.inputElement_.addEventListener('blur', this.boundBlurHandler);
        this.element_.addEventListener('mouseup', this.boundMouseUpHandler);
        this.updateClasses_();
        this.element_.classList.add('is-upgraded');
      }
    };
    componentHandler.register({
      constructor: MaterialSwitch,
      classAsString: 'MaterialSwitch',
      cssClass: 'mdl-js-switch',
      widget: true
    });
    var MaterialTabs = function MaterialTabs(element) {
      this.element_ = element;
      this.init();
    };
    window['MaterialTabs'] = MaterialTabs;
    MaterialTabs.prototype.Constant_ = {};
    MaterialTabs.prototype.CssClasses_ = {
      TAB_CLASS: 'mdl-tabs__tab',
      PANEL_CLASS: 'mdl-tabs__panel',
      ACTIVE_CLASS: 'is-active',
      UPGRADED_CLASS: 'is-upgraded',
      MDL_JS_RIPPLE_EFFECT: 'mdl-js-ripple-effect',
      MDL_RIPPLE_CONTAINER: 'mdl-tabs__ripple-container',
      MDL_RIPPLE: 'mdl-ripple',
      MDL_JS_RIPPLE_EFFECT_IGNORE_EVENTS: 'mdl-js-ripple-effect--ignore-events'
    };
    MaterialTabs.prototype.initTabs_ = function() {
      if (this.element_.classList.contains(this.CssClasses_.MDL_JS_RIPPLE_EFFECT)) {
        this.element_.classList.add(this.CssClasses_.MDL_JS_RIPPLE_EFFECT_IGNORE_EVENTS);
      }
      this.tabs_ = this.element_.querySelectorAll('.' + this.CssClasses_.TAB_CLASS);
      this.panels_ = this.element_.querySelectorAll('.' + this.CssClasses_.PANEL_CLASS);
      for (var i = 0; i < this.tabs_.length; i++) {
        new MaterialTab(this.tabs_[i], this);
      }
      this.element_.classList.add(this.CssClasses_.UPGRADED_CLASS);
    };
    MaterialTabs.prototype.resetTabState_ = function() {
      for (var k = 0; k < this.tabs_.length; k++) {
        this.tabs_[k].classList.remove(this.CssClasses_.ACTIVE_CLASS);
      }
    };
    MaterialTabs.prototype.resetPanelState_ = function() {
      for (var j = 0; j < this.panels_.length; j++) {
        this.panels_[j].classList.remove(this.CssClasses_.ACTIVE_CLASS);
      }
    };
    MaterialTabs.prototype.init = function() {
      if (this.element_) {
        this.initTabs_();
      }
    };
    function MaterialTab(tab, ctx) {
      if (tab) {
        if (ctx.element_.classList.contains(ctx.CssClasses_.MDL_JS_RIPPLE_EFFECT)) {
          var rippleContainer = document.createElement('span');
          rippleContainer.classList.add(ctx.CssClasses_.MDL_RIPPLE_CONTAINER);
          rippleContainer.classList.add(ctx.CssClasses_.MDL_JS_RIPPLE_EFFECT);
          var ripple = document.createElement('span');
          ripple.classList.add(ctx.CssClasses_.MDL_RIPPLE);
          rippleContainer.appendChild(ripple);
          tab.appendChild(rippleContainer);
        }
        tab.addEventListener('click', function(e) {
          e.preventDefault();
          var href = tab.href.split('#')[1];
          var panel = ctx.element_.querySelector('#' + href);
          ctx.resetTabState_();
          ctx.resetPanelState_();
          tab.classList.add(ctx.CssClasses_.ACTIVE_CLASS);
          panel.classList.add(ctx.CssClasses_.ACTIVE_CLASS);
        });
      }
    }
    componentHandler.register({
      constructor: MaterialTabs,
      classAsString: 'MaterialTabs',
      cssClass: 'mdl-js-tabs'
    });
    var MaterialTextfield = function MaterialTextfield(element) {
      this.element_ = element;
      this.maxRows = this.Constant_.NO_MAX_ROWS;
      this.init();
    };
    window['MaterialTextfield'] = MaterialTextfield;
    MaterialTextfield.prototype.Constant_ = {
      NO_MAX_ROWS: -1,
      MAX_ROWS_ATTRIBUTE: 'maxrows'
    };
    MaterialTextfield.prototype.CssClasses_ = {
      LABEL: 'mdl-textfield__label',
      INPUT: 'mdl-textfield__input',
      IS_DIRTY: 'is-dirty',
      IS_FOCUSED: 'is-focused',
      IS_DISABLED: 'is-disabled',
      IS_INVALID: 'is-invalid',
      IS_UPGRADED: 'is-upgraded',
      HAS_PLACEHOLDER: 'has-placeholder'
    };
    MaterialTextfield.prototype.onKeyDown_ = function(event) {
      var currentRowCount = event.target.value.split('\n').length;
      if (event.keyCode === 13) {
        if (currentRowCount >= this.maxRows) {
          event.preventDefault();
        }
      }
    };
    MaterialTextfield.prototype.onFocus_ = function(event) {
      this.element_.classList.add(this.CssClasses_.IS_FOCUSED);
    };
    MaterialTextfield.prototype.onBlur_ = function(event) {
      this.element_.classList.remove(this.CssClasses_.IS_FOCUSED);
    };
    MaterialTextfield.prototype.onReset_ = function(event) {
      this.updateClasses_();
    };
    MaterialTextfield.prototype.updateClasses_ = function() {
      this.checkDisabled();
      this.checkValidity();
      this.checkDirty();
      this.checkFocus();
    };
    MaterialTextfield.prototype.checkDisabled = function() {
      if (this.input_.disabled) {
        this.element_.classList.add(this.CssClasses_.IS_DISABLED);
      } else {
        this.element_.classList.remove(this.CssClasses_.IS_DISABLED);
      }
    };
    MaterialTextfield.prototype['checkDisabled'] = MaterialTextfield.prototype.checkDisabled;
    MaterialTextfield.prototype.checkFocus = function() {
      if (Boolean(this.element_.querySelector(':focus'))) {
        this.element_.classList.add(this.CssClasses_.IS_FOCUSED);
      } else {
        this.element_.classList.remove(this.CssClasses_.IS_FOCUSED);
      }
    };
    MaterialTextfield.prototype['checkFocus'] = MaterialTextfield.prototype.checkFocus;
    MaterialTextfield.prototype.checkValidity = function() {
      if (this.input_.validity) {
        if (this.input_.validity.valid) {
          this.element_.classList.remove(this.CssClasses_.IS_INVALID);
        } else {
          this.element_.classList.add(this.CssClasses_.IS_INVALID);
        }
      }
    };
    MaterialTextfield.prototype['checkValidity'] = MaterialTextfield.prototype.checkValidity;
    MaterialTextfield.prototype.checkDirty = function() {
      if (this.input_.value && this.input_.value.length > 0) {
        this.element_.classList.add(this.CssClasses_.IS_DIRTY);
      } else {
        this.element_.classList.remove(this.CssClasses_.IS_DIRTY);
      }
    };
    MaterialTextfield.prototype['checkDirty'] = MaterialTextfield.prototype.checkDirty;
    MaterialTextfield.prototype.disable = function() {
      this.input_.disabled = true;
      this.updateClasses_();
    };
    MaterialTextfield.prototype['disable'] = MaterialTextfield.prototype.disable;
    MaterialTextfield.prototype.enable = function() {
      this.input_.disabled = false;
      this.updateClasses_();
    };
    MaterialTextfield.prototype['enable'] = MaterialTextfield.prototype.enable;
    MaterialTextfield.prototype.change = function(value) {
      this.input_.value = value || '';
      this.updateClasses_();
    };
    MaterialTextfield.prototype['change'] = MaterialTextfield.prototype.change;
    MaterialTextfield.prototype.init = function() {
      if (this.element_) {
        this.label_ = this.element_.querySelector('.' + this.CssClasses_.LABEL);
        this.input_ = this.element_.querySelector('.' + this.CssClasses_.INPUT);
        if (this.input_) {
          if (this.input_.hasAttribute(this.Constant_.MAX_ROWS_ATTRIBUTE)) {
            this.maxRows = parseInt(this.input_.getAttribute(this.Constant_.MAX_ROWS_ATTRIBUTE), 10);
            if (isNaN(this.maxRows)) {
              this.maxRows = this.Constant_.NO_MAX_ROWS;
            }
          }
          if (this.input_.hasAttribute('placeholder')) {
            this.element_.classList.add(this.CssClasses_.HAS_PLACEHOLDER);
          }
          this.boundUpdateClassesHandler = this.updateClasses_.bind(this);
          this.boundFocusHandler = this.onFocus_.bind(this);
          this.boundBlurHandler = this.onBlur_.bind(this);
          this.boundResetHandler = this.onReset_.bind(this);
          this.input_.addEventListener('input', this.boundUpdateClassesHandler);
          this.input_.addEventListener('focus', this.boundFocusHandler);
          this.input_.addEventListener('blur', this.boundBlurHandler);
          this.input_.addEventListener('reset', this.boundResetHandler);
          if (this.maxRows !== this.Constant_.NO_MAX_ROWS) {
            this.boundKeyDownHandler = this.onKeyDown_.bind(this);
            this.input_.addEventListener('keydown', this.boundKeyDownHandler);
          }
          var invalid = this.element_.classList.contains(this.CssClasses_.IS_INVALID);
          this.updateClasses_();
          this.element_.classList.add(this.CssClasses_.IS_UPGRADED);
          if (invalid) {
            this.element_.classList.add(this.CssClasses_.IS_INVALID);
          }
          if (this.input_.hasAttribute('autofocus')) {
            this.element_.focus();
            this.checkFocus();
          }
        }
      }
    };
    componentHandler.register({
      constructor: MaterialTextfield,
      classAsString: 'MaterialTextfield',
      cssClass: 'mdl-js-textfield',
      widget: true
    });
    var MaterialTooltip = function MaterialTooltip(element) {
      this.element_ = element;
      this.init();
    };
    window['MaterialTooltip'] = MaterialTooltip;
    MaterialTooltip.prototype.Constant_ = {};
    MaterialTooltip.prototype.CssClasses_ = {
      IS_ACTIVE: 'is-active',
      BOTTOM: 'mdl-tooltip--bottom',
      LEFT: 'mdl-tooltip--left',
      RIGHT: 'mdl-tooltip--right',
      TOP: 'mdl-tooltip--top'
    };
    MaterialTooltip.prototype.handleMouseEnter_ = function(event) {
      var props = event.target.getBoundingClientRect();
      var left = props.left + props.width / 2;
      var top = props.top + props.height / 2;
      var marginLeft = -1 * (this.element_.offsetWidth / 2);
      var marginTop = -1 * (this.element_.offsetHeight / 2);
      if (this.element_.classList.contains(this.CssClasses_.LEFT) || this.element_.classList.contains(this.CssClasses_.RIGHT)) {
        left = props.width / 2;
        if (top + marginTop < 0) {
          this.element_.style.top = '0';
          this.element_.style.marginTop = '0';
        } else {
          this.element_.style.top = top + 'px';
          this.element_.style.marginTop = marginTop + 'px';
        }
      } else {
        if (left + marginLeft < 0) {
          this.element_.style.left = '0';
          this.element_.style.marginLeft = '0';
        } else {
          this.element_.style.left = left + 'px';
          this.element_.style.marginLeft = marginLeft + 'px';
        }
      }
      if (this.element_.classList.contains(this.CssClasses_.TOP)) {
        this.element_.style.top = props.top - this.element_.offsetHeight - 10 + 'px';
      } else if (this.element_.classList.contains(this.CssClasses_.RIGHT)) {
        this.element_.style.left = props.left + props.width + 10 + 'px';
      } else if (this.element_.classList.contains(this.CssClasses_.LEFT)) {
        this.element_.style.left = props.left - this.element_.offsetWidth - 10 + 'px';
      } else {
        this.element_.style.top = props.top + props.height + 10 + 'px';
      }
      this.element_.classList.add(this.CssClasses_.IS_ACTIVE);
    };
    MaterialTooltip.prototype.hideTooltip_ = function() {
      this.element_.classList.remove(this.CssClasses_.IS_ACTIVE);
    };
    MaterialTooltip.prototype.init = function() {
      if (this.element_) {
        var forElId = this.element_.getAttribute('for') || this.element_.getAttribute('data-mdl-for');
        if (forElId) {
          this.forElement_ = document.getElementById(forElId);
        }
        if (this.forElement_) {
          if (!this.forElement_.hasAttribute('tabindex')) {
            this.forElement_.setAttribute('tabindex', '0');
          }
          this.boundMouseEnterHandler = this.handleMouseEnter_.bind(this);
          this.boundMouseLeaveAndScrollHandler = this.hideTooltip_.bind(this);
          this.forElement_.addEventListener('mouseenter', this.boundMouseEnterHandler, false);
          this.forElement_.addEventListener('touchend', this.boundMouseEnterHandler, false);
          this.forElement_.addEventListener('mouseleave', this.boundMouseLeaveAndScrollHandler, false);
          window.addEventListener('scroll', this.boundMouseLeaveAndScrollHandler, true);
          window.addEventListener('touchstart', this.boundMouseLeaveAndScrollHandler);
        }
      }
    };
    componentHandler.register({
      constructor: MaterialTooltip,
      classAsString: 'MaterialTooltip',
      cssClass: 'mdl-tooltip'
    });
    var MaterialLayout = function MaterialLayout(element) {
      this.element_ = element;
      this.innerContainer_ = element.querySelector('.' + this.CssClasses_.INNER_CONTAINER);
      this.init();
    };
    window['MaterialLayout'] = MaterialLayout;
    MaterialLayout.prototype.Constant_ = {
      MAX_WIDTH: '(max-width: 1024px)',
      TAB_SCROLL_PIXELS: 100,
      RESIZE_TIMEOUT: 100,
      MENU_ICON: '&#xE5D2;',
      CHEVRON_LEFT: 'chevron_left',
      CHEVRON_RIGHT: 'chevron_right'
    };
    MaterialLayout.prototype.Keycodes_ = {
      ENTER: 13,
      ESCAPE: 27,
      SPACE: 32
    };
    MaterialLayout.prototype.Mode_ = {
      STANDARD: 0,
      SEAMED: 1,
      WATERFALL: 2,
      SCROLL: 3
    };
    MaterialLayout.prototype.CssClasses_ = {
      INNER_CONTAINER: 'mdl-layout__inner-container',
      HEADER: 'mdl-layout__header',
      DRAWER: 'mdl-layout__drawer',
      CONTENT: 'mdl-layout__content',
      DRAWER_BTN: 'mdl-layout__drawer-button',
      ICON: 'material-icons',
      JS_RIPPLE_EFFECT: 'mdl-js-ripple-effect',
      RIPPLE_CONTAINER: 'mdl-layout__tab-ripple-container',
      RIPPLE: 'mdl-ripple',
      RIPPLE_IGNORE_EVENTS: 'mdl-js-ripple-effect--ignore-events',
      HEADER_SEAMED: 'mdl-layout__header--seamed',
      HEADER_WATERFALL: 'mdl-layout__header--waterfall',
      HEADER_SCROLL: 'mdl-layout__header--scroll',
      FIXED_HEADER: 'mdl-layout--fixed-header',
      OBFUSCATOR: 'mdl-layout__obfuscator',
      TAB_BAR: 'mdl-layout__tab-bar',
      TAB_CONTAINER: 'mdl-layout__tab-bar-container',
      TAB: 'mdl-layout__tab',
      TAB_BAR_BUTTON: 'mdl-layout__tab-bar-button',
      TAB_BAR_LEFT_BUTTON: 'mdl-layout__tab-bar-left-button',
      TAB_BAR_RIGHT_BUTTON: 'mdl-layout__tab-bar-right-button',
      PANEL: 'mdl-layout__tab-panel',
      HAS_DRAWER: 'has-drawer',
      HAS_TABS: 'has-tabs',
      HAS_SCROLLING_HEADER: 'has-scrolling-header',
      CASTING_SHADOW: 'is-casting-shadow',
      IS_COMPACT: 'is-compact',
      IS_SMALL_SCREEN: 'is-small-screen',
      IS_DRAWER_OPEN: 'is-visible',
      IS_ACTIVE: 'is-active',
      IS_UPGRADED: 'is-upgraded',
      IS_ANIMATING: 'is-animating',
      ON_LARGE_SCREEN: 'mdl-layout--large-screen-only',
      ON_SMALL_SCREEN: 'mdl-layout--small-screen-only'
    };
    MaterialLayout.prototype.contentScrollHandler_ = function() {
      if (this.header_.classList.contains(this.CssClasses_.IS_ANIMATING)) {
        return;
      }
      var headerVisible = !this.element_.classList.contains(this.CssClasses_.IS_SMALL_SCREEN) || this.element_.classList.contains(this.CssClasses_.FIXED_HEADER);
      if (this.content_.scrollTop > 0 && !this.header_.classList.contains(this.CssClasses_.IS_COMPACT)) {
        this.header_.classList.add(this.CssClasses_.CASTING_SHADOW);
        this.header_.classList.add(this.CssClasses_.IS_COMPACT);
        if (headerVisible) {
          this.header_.classList.add(this.CssClasses_.IS_ANIMATING);
        }
      } else if (this.content_.scrollTop <= 0 && this.header_.classList.contains(this.CssClasses_.IS_COMPACT)) {
        this.header_.classList.remove(this.CssClasses_.CASTING_SHADOW);
        this.header_.classList.remove(this.CssClasses_.IS_COMPACT);
        if (headerVisible) {
          this.header_.classList.add(this.CssClasses_.IS_ANIMATING);
        }
      }
    };
    MaterialLayout.prototype.keyboardEventHandler_ = function(evt) {
      if (evt.keyCode === this.Keycodes_.ESCAPE && this.drawer_.classList.contains(this.CssClasses_.IS_DRAWER_OPEN)) {
        this.toggleDrawer();
      }
    };
    MaterialLayout.prototype.screenSizeHandler_ = function() {
      if (this.screenSizeMediaQuery_.matches) {
        this.element_.classList.add(this.CssClasses_.IS_SMALL_SCREEN);
      } else {
        this.element_.classList.remove(this.CssClasses_.IS_SMALL_SCREEN);
        if (this.drawer_) {
          this.drawer_.classList.remove(this.CssClasses_.IS_DRAWER_OPEN);
          this.obfuscator_.classList.remove(this.CssClasses_.IS_DRAWER_OPEN);
        }
      }
    };
    MaterialLayout.prototype.drawerToggleHandler_ = function(evt) {
      if (evt && evt.type === 'keydown') {
        if (evt.keyCode === this.Keycodes_.SPACE || evt.keyCode === this.Keycodes_.ENTER) {
          evt.preventDefault();
        } else {
          return;
        }
      }
      this.toggleDrawer();
    };
    MaterialLayout.prototype.headerTransitionEndHandler_ = function() {
      this.header_.classList.remove(this.CssClasses_.IS_ANIMATING);
    };
    MaterialLayout.prototype.headerClickHandler_ = function() {
      if (this.header_.classList.contains(this.CssClasses_.IS_COMPACT)) {
        this.header_.classList.remove(this.CssClasses_.IS_COMPACT);
        this.header_.classList.add(this.CssClasses_.IS_ANIMATING);
      }
    };
    MaterialLayout.prototype.resetTabState_ = function(tabBar) {
      for (var k = 0; k < tabBar.length; k++) {
        tabBar[k].classList.remove(this.CssClasses_.IS_ACTIVE);
      }
    };
    MaterialLayout.prototype.resetPanelState_ = function(panels) {
      for (var j = 0; j < panels.length; j++) {
        panels[j].classList.remove(this.CssClasses_.IS_ACTIVE);
      }
    };
    MaterialLayout.prototype.toggleDrawer = function() {
      var drawerButton = this.innerContainer_.querySelector('.' + this.CssClasses_.DRAWER_BTN);
      this.drawer_.classList.toggle(this.CssClasses_.IS_DRAWER_OPEN);
      this.obfuscator_.classList.toggle(this.CssClasses_.IS_DRAWER_OPEN);
      if (this.drawer_.classList.contains(this.CssClasses_.IS_DRAWER_OPEN)) {
        this.drawer_.setAttribute('aria-hidden', 'false');
        drawerButton.setAttribute('aria-expanded', 'true');
      } else {
        this.drawer_.setAttribute('aria-hidden', 'true');
        drawerButton.setAttribute('aria-expanded', 'false');
      }
    };
    MaterialLayout.prototype['toggleDrawer'] = MaterialLayout.prototype.toggleDrawer;
    MaterialLayout.prototype.init = function() {
      if (this.element_) {
        var focusedElement = this.element_.querySelector(':focus');
        if (focusedElement) {
          focusedElement.focus();
        }
        var directChildren = this.innerContainer_.childNodes;
        var numChildren = directChildren.length;
        for (var c = 0; c < numChildren; c++) {
          var child = directChildren[c];
          if (child.classList && child.classList.contains(this.CssClasses_.HEADER)) {
            this.header_ = child;
          }
          if (child.classList && child.classList.contains(this.CssClasses_.DRAWER)) {
            this.drawer_ = child;
          }
          if (child.classList && child.classList.contains(this.CssClasses_.CONTENT)) {
            this.content_ = child;
          }
        }
        window.addEventListener('pageshow', function(e) {
          if (e.persisted) {
            this.innerContainer_.style.overflowY = 'hidden';
            requestAnimationFrame(function() {
              this.innerContainer_.style.overflowY = '';
            }.bind(this));
          }
        }.bind(this), false);
        if (this.header_) {
          this.tabBar_ = this.header_.querySelector('.' + this.CssClasses_.TAB_BAR);
        }
        var mode = this.Mode_.STANDARD;
        if (this.header_) {
          if (this.header_.classList.contains(this.CssClasses_.HEADER_SEAMED)) {
            mode = this.Mode_.SEAMED;
          } else if (this.header_.classList.contains(this.CssClasses_.HEADER_WATERFALL)) {
            mode = this.Mode_.WATERFALL;
            this.header_.addEventListener('transitionend', this.headerTransitionEndHandler_.bind(this));
            this.header_.addEventListener('click', this.headerClickHandler_.bind(this));
          } else if (this.header_.classList.contains(this.CssClasses_.HEADER_SCROLL)) {
            mode = this.Mode_.SCROLL;
            this.element_.classList.add(this.CssClasses_.HAS_SCROLLING_HEADER);
          }
          if (mode === this.Mode_.STANDARD) {
            this.header_.classList.add(this.CssClasses_.CASTING_SHADOW);
            if (this.tabBar_) {
              this.tabBar_.classList.add(this.CssClasses_.CASTING_SHADOW);
            }
          } else if (mode === this.Mode_.SEAMED || mode === this.Mode_.SCROLL) {
            this.header_.classList.remove(this.CssClasses_.CASTING_SHADOW);
            if (this.tabBar_) {
              this.tabBar_.classList.remove(this.CssClasses_.CASTING_SHADOW);
            }
          } else if (mode === this.Mode_.WATERFALL) {
            this.content_.addEventListener('scroll', this.contentScrollHandler_.bind(this));
            this.contentScrollHandler_();
          }
        }
        if (this.drawer_) {
          var drawerButton = this.innerContainer_.querySelector('.' + this.CssClasses_.DRAWER_BTN);
          if (!drawerButton) {
            drawerButton = document.createElement('div');
            drawerButton.setAttribute('aria-expanded', 'false');
            drawerButton.setAttribute('role', 'button');
            drawerButton.setAttribute('tabindex', '0');
            drawerButton.classList.add(this.CssClasses_.DRAWER_BTN);
            var drawerButtonIcon = document.createElement('i');
            drawerButtonIcon.classList.add(this.CssClasses_.ICON);
            drawerButtonIcon.innerHTML = this.Constant_.MENU_ICON;
            drawerButton.appendChild(drawerButtonIcon);
          }
          if (this.drawer_.classList.contains(this.CssClasses_.ON_LARGE_SCREEN)) {
            drawerButton.classList.add(this.CssClasses_.ON_LARGE_SCREEN);
          } else if (this.drawer_.classList.contains(this.CssClasses_.ON_SMALL_SCREEN)) {
            drawerButton.classList.add(this.CssClasses_.ON_SMALL_SCREEN);
          }
          drawerButton.addEventListener('click', this.drawerToggleHandler_.bind(this));
          drawerButton.addEventListener('keydown', this.drawerToggleHandler_.bind(this));
          this.element_.classList.add(this.CssClasses_.HAS_DRAWER);
          if (this.element_.classList.contains(this.CssClasses_.FIXED_HEADER)) {
            this.header_.insertBefore(drawerButton, this.header_.firstChild);
          } else {
            this.innerContainer_.insertBefore(drawerButton, this.content_);
          }
          var obfuscator = document.createElement('div');
          obfuscator.classList.add(this.CssClasses_.OBFUSCATOR);
          this.innerContainer_.appendChild(obfuscator);
          obfuscator.addEventListener('click', this.drawerToggleHandler_.bind(this));
          this.obfuscator_ = obfuscator;
          this.drawer_.addEventListener('keydown', this.keyboardEventHandler_.bind(this));
          this.drawer_.setAttribute('aria-hidden', 'true');
        }
        this.screenSizeMediaQuery_ = window.matchMedia(this.Constant_.MAX_WIDTH);
        this.screenSizeMediaQuery_.addListener(this.screenSizeHandler_.bind(this));
        this.screenSizeHandler_();
        if (this.header_ && this.tabBar_) {
          this.element_.classList.add(this.CssClasses_.HAS_TABS);
          var tabContainer = document.createElement('div');
          tabContainer.classList.add(this.CssClasses_.TAB_CONTAINER);
          this.header_.insertBefore(tabContainer, this.tabBar_);
          this.header_.removeChild(this.tabBar_);
          var leftButton = document.createElement('div');
          leftButton.classList.add(this.CssClasses_.TAB_BAR_BUTTON);
          leftButton.classList.add(this.CssClasses_.TAB_BAR_LEFT_BUTTON);
          var leftButtonIcon = document.createElement('i');
          leftButtonIcon.classList.add(this.CssClasses_.ICON);
          leftButtonIcon.textContent = this.Constant_.CHEVRON_LEFT;
          leftButton.appendChild(leftButtonIcon);
          leftButton.addEventListener('click', function() {
            this.tabBar_.scrollLeft -= this.Constant_.TAB_SCROLL_PIXELS;
          }.bind(this));
          var rightButton = document.createElement('div');
          rightButton.classList.add(this.CssClasses_.TAB_BAR_BUTTON);
          rightButton.classList.add(this.CssClasses_.TAB_BAR_RIGHT_BUTTON);
          var rightButtonIcon = document.createElement('i');
          rightButtonIcon.classList.add(this.CssClasses_.ICON);
          rightButtonIcon.textContent = this.Constant_.CHEVRON_RIGHT;
          rightButton.appendChild(rightButtonIcon);
          rightButton.addEventListener('click', function() {
            this.tabBar_.scrollLeft += this.Constant_.TAB_SCROLL_PIXELS;
          }.bind(this));
          tabContainer.appendChild(leftButton);
          tabContainer.appendChild(this.tabBar_);
          tabContainer.appendChild(rightButton);
          var tabUpdateHandler = function() {
            if (this.tabBar_.scrollLeft > 0) {
              leftButton.classList.add(this.CssClasses_.IS_ACTIVE);
            } else {
              leftButton.classList.remove(this.CssClasses_.IS_ACTIVE);
            }
            if (this.tabBar_.scrollLeft < this.tabBar_.scrollWidth - this.tabBar_.offsetWidth) {
              rightButton.classList.add(this.CssClasses_.IS_ACTIVE);
            } else {
              rightButton.classList.remove(this.CssClasses_.IS_ACTIVE);
            }
          }.bind(this);
          this.tabBar_.addEventListener('scroll', tabUpdateHandler);
          tabUpdateHandler();
          var windowResizeHandler = function() {
            if (this.resizeTimeoutId_) {
              clearTimeout(this.resizeTimeoutId_);
            }
            this.resizeTimeoutId_ = setTimeout(function() {
              tabUpdateHandler();
              this.resizeTimeoutId_ = null;
            }.bind(this), this.Constant_.RESIZE_TIMEOUT);
          }.bind(this);
          window.addEventListener('resize', windowResizeHandler);
          if (this.tabBar_.classList.contains(this.CssClasses_.JS_RIPPLE_EFFECT)) {
            this.tabBar_.classList.add(this.CssClasses_.RIPPLE_IGNORE_EVENTS);
          }
          var tabs = this.tabBar_.querySelectorAll('.' + this.CssClasses_.TAB);
          var panels = this.content_.querySelectorAll('.' + this.CssClasses_.PANEL);
          for (var i = 0; i < tabs.length; i++) {
            new MaterialLayoutTab(tabs[i], tabs, panels, this);
          }
        }
        this.element_.classList.add(this.CssClasses_.IS_UPGRADED);
      }
    };
    function MaterialLayoutTab(tab, tabs, panels, layout) {
      function selectTab() {
        var href = tab.href.split('#')[1];
        var panel = layout.header_.querySelector('#' + href);
        layout.resetTabState_(tabs);
        layout.resetPanelState_(panels);
        tab.classList.add(layout.CssClasses_.IS_ACTIVE);
        panel.classList.add(layout.CssClasses_.IS_ACTIVE);
      }
      if (layout.tabBar_.classList.contains(layout.CssClasses_.JS_RIPPLE_EFFECT)) {
        var rippleContainer = document.createElement('span');
        rippleContainer.classList.add(layout.CssClasses_.RIPPLE_CONTAINER);
        rippleContainer.classList.add(layout.CssClasses_.JS_RIPPLE_EFFECT);
        var ripple = document.createElement('span');
        ripple.classList.add(layout.CssClasses_.RIPPLE);
        rippleContainer.appendChild(ripple);
        tab.appendChild(rippleContainer);
      }
      tab.addEventListener('click', function(e) {
        if (tab.getAttribute('href').charAt(0) === '#') {
          e.preventDefault();
          selectTab();
        }
      });
      tab.show = selectTab;
    }
    window['MaterialLayoutTab'] = MaterialLayoutTab;
    componentHandler.register({
      constructor: MaterialLayout,
      classAsString: 'MaterialLayout',
      cssClass: 'mdl-js-layout'
    });
    var MaterialDataTable = function MaterialDataTable(element) {
      this.element_ = element;
      this.init();
    };
    window['MaterialDataTable'] = MaterialDataTable;
    MaterialDataTable.prototype.Constant_ = {};
    MaterialDataTable.prototype.CssClasses_ = {
      DATA_TABLE: 'mdl-data-table',
      SELECTABLE: 'mdl-data-table--selectable',
      SELECT_ELEMENT: 'mdl-data-table__select',
      IS_SELECTED: 'is-selected',
      IS_UPGRADED: 'is-upgraded'
    };
    MaterialDataTable.prototype.selectRow_ = function(checkbox, row, opt_rows) {
      if (row) {
        return function() {
          if (checkbox.checked) {
            row.classList.add(this.CssClasses_.IS_SELECTED);
          } else {
            row.classList.remove(this.CssClasses_.IS_SELECTED);
          }
        }.bind(this);
      }
      if (opt_rows) {
        return function() {
          var i;
          var el;
          if (checkbox.checked) {
            for (i = 0; i < opt_rows.length; i++) {
              el = opt_rows[i].querySelector('td').querySelector('.mdl-checkbox');
              el['MaterialCheckbox'].check();
              opt_rows[i].classList.add(this.CssClasses_.IS_SELECTED);
            }
          } else {
            for (i = 0; i < opt_rows.length; i++) {
              el = opt_rows[i].querySelector('td').querySelector('.mdl-checkbox');
              el['MaterialCheckbox'].uncheck();
              opt_rows[i].classList.remove(this.CssClasses_.IS_SELECTED);
            }
          }
        }.bind(this);
      }
    };
    MaterialDataTable.prototype.createCheckbox_ = function(row, opt_rows) {
      var label = document.createElement('label');
      var labelClasses = ['mdl-checkbox', 'mdl-js-checkbox', 'mdl-js-ripple-effect', this.CssClasses_.SELECT_ELEMENT];
      label.className = labelClasses.join(' ');
      var checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.classList.add('mdl-checkbox__input');
      if (row) {
        checkbox.checked = row.classList.contains(this.CssClasses_.IS_SELECTED);
        checkbox.addEventListener('change', this.selectRow_(checkbox, row));
      } else if (opt_rows) {
        checkbox.addEventListener('change', this.selectRow_(checkbox, null, opt_rows));
      }
      label.appendChild(checkbox);
      componentHandler.upgradeElement(label, 'MaterialCheckbox');
      return label;
    };
    MaterialDataTable.prototype.init = function() {
      if (this.element_) {
        var firstHeader = this.element_.querySelector('th');
        var bodyRows = Array.prototype.slice.call(this.element_.querySelectorAll('tbody tr'));
        var footRows = Array.prototype.slice.call(this.element_.querySelectorAll('tfoot tr'));
        var rows = bodyRows.concat(footRows);
        if (this.element_.classList.contains(this.CssClasses_.SELECTABLE)) {
          var th = document.createElement('th');
          var headerCheckbox = this.createCheckbox_(null, rows);
          th.appendChild(headerCheckbox);
          firstHeader.parentElement.insertBefore(th, firstHeader);
          for (var i = 0; i < rows.length; i++) {
            var firstCell = rows[i].querySelector('td');
            if (firstCell) {
              var td = document.createElement('td');
              if (rows[i].parentNode.nodeName.toUpperCase() === 'TBODY') {
                var rowCheckbox = this.createCheckbox_(rows[i]);
                td.appendChild(rowCheckbox);
              }
              rows[i].insertBefore(td, firstCell);
            }
          }
          this.element_.classList.add(this.CssClasses_.IS_UPGRADED);
        }
      }
    };
    componentHandler.register({
      constructor: MaterialDataTable,
      classAsString: 'MaterialDataTable',
      cssClass: 'mdl-js-data-table'
    });
    var MaterialRipple = function MaterialRipple(element) {
      this.element_ = element;
      this.init();
    };
    window['MaterialRipple'] = MaterialRipple;
    MaterialRipple.prototype.Constant_ = {
      INITIAL_SCALE: 'scale(0.0001, 0.0001)',
      INITIAL_SIZE: '1px',
      INITIAL_OPACITY: '0.4',
      FINAL_OPACITY: '0',
      FINAL_SCALE: ''
    };
    MaterialRipple.prototype.CssClasses_ = {
      RIPPLE_CENTER: 'mdl-ripple--center',
      RIPPLE_EFFECT_IGNORE_EVENTS: 'mdl-js-ripple-effect--ignore-events',
      RIPPLE: 'mdl-ripple',
      IS_ANIMATING: 'is-animating',
      IS_VISIBLE: 'is-visible'
    };
    MaterialRipple.prototype.downHandler_ = function(event) {
      if (!this.rippleElement_.style.width && !this.rippleElement_.style.height) {
        var rect = this.element_.getBoundingClientRect();
        this.boundHeight = rect.height;
        this.boundWidth = rect.width;
        this.rippleSize_ = Math.sqrt(rect.width * rect.width + rect.height * rect.height) * 2 + 2;
        this.rippleElement_.style.width = this.rippleSize_ + 'px';
        this.rippleElement_.style.height = this.rippleSize_ + 'px';
      }
      this.rippleElement_.classList.add(this.CssClasses_.IS_VISIBLE);
      if (event.type === 'mousedown' && this.ignoringMouseDown_) {
        this.ignoringMouseDown_ = false;
      } else {
        if (event.type === 'touchstart') {
          this.ignoringMouseDown_ = true;
        }
        var frameCount = this.getFrameCount();
        if (frameCount > 0) {
          return;
        }
        this.setFrameCount(1);
        var bound = event.currentTarget.getBoundingClientRect();
        var x;
        var y;
        if (event.clientX === 0 && event.clientY === 0) {
          x = Math.round(bound.width / 2);
          y = Math.round(bound.height / 2);
        } else {
          var clientX = event.clientX ? event.clientX : event.touches[0].clientX;
          var clientY = event.clientY ? event.clientY : event.touches[0].clientY;
          x = Math.round(clientX - bound.left);
          y = Math.round(clientY - bound.top);
        }
        this.setRippleXY(x, y);
        this.setRippleStyles(true);
        window.requestAnimationFrame(this.animFrameHandler.bind(this));
      }
    };
    MaterialRipple.prototype.upHandler_ = function(event) {
      if (event && event.detail !== 2) {
        window.setTimeout(function() {
          this.rippleElement_.classList.remove(this.CssClasses_.IS_VISIBLE);
        }.bind(this), 0);
      }
    };
    MaterialRipple.prototype.init = function() {
      if (this.element_) {
        var recentering = this.element_.classList.contains(this.CssClasses_.RIPPLE_CENTER);
        if (!this.element_.classList.contains(this.CssClasses_.RIPPLE_EFFECT_IGNORE_EVENTS)) {
          this.rippleElement_ = this.element_.querySelector('.' + this.CssClasses_.RIPPLE);
          this.frameCount_ = 0;
          this.rippleSize_ = 0;
          this.x_ = 0;
          this.y_ = 0;
          this.ignoringMouseDown_ = false;
          this.boundDownHandler = this.downHandler_.bind(this);
          this.element_.addEventListener('mousedown', this.boundDownHandler);
          this.element_.addEventListener('touchstart', this.boundDownHandler);
          this.boundUpHandler = this.upHandler_.bind(this);
          this.element_.addEventListener('mouseup', this.boundUpHandler);
          this.element_.addEventListener('mouseleave', this.boundUpHandler);
          this.element_.addEventListener('touchend', this.boundUpHandler);
          this.element_.addEventListener('blur', this.boundUpHandler);
          this.getFrameCount = function() {
            return this.frameCount_;
          };
          this.setFrameCount = function(fC) {
            this.frameCount_ = fC;
          };
          this.getRippleElement = function() {
            return this.rippleElement_;
          };
          this.setRippleXY = function(newX, newY) {
            this.x_ = newX;
            this.y_ = newY;
          };
          this.setRippleStyles = function(start) {
            if (this.rippleElement_ !== null) {
              var transformString;
              var scale;
              var size;
              var offset = 'translate(' + this.x_ + 'px, ' + this.y_ + 'px)';
              if (start) {
                scale = this.Constant_.INITIAL_SCALE;
                size = this.Constant_.INITIAL_SIZE;
              } else {
                scale = this.Constant_.FINAL_SCALE;
                size = this.rippleSize_ + 'px';
                if (recentering) {
                  offset = 'translate(' + this.boundWidth / 2 + 'px, ' + this.boundHeight / 2 + 'px)';
                }
              }
              transformString = 'translate(-50%, -50%) ' + offset + scale;
              this.rippleElement_.style.webkitTransform = transformString;
              this.rippleElement_.style.msTransform = transformString;
              this.rippleElement_.style.transform = transformString;
              if (start) {
                this.rippleElement_.classList.remove(this.CssClasses_.IS_ANIMATING);
              } else {
                this.rippleElement_.classList.add(this.CssClasses_.IS_ANIMATING);
              }
            }
          };
          this.animFrameHandler = function() {
            if (this.frameCount_-- > 0) {
              window.requestAnimationFrame(this.animFrameHandler.bind(this));
            } else {
              this.setRippleStyles(false);
            }
          };
        }
      }
    };
    componentHandler.register({
      constructor: MaterialRipple,
      classAsString: 'MaterialRipple',
      cssClass: 'mdl-js-ripple-effect',
      widget: false
    });
  }());
})(require('process'));
