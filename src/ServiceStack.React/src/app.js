/// <reference path='../typings/browser.d.ts'/>
System.register(["react", "react-dom", "redux", "./reducers", "./ColorPicker", "./core"], function (exports_1, context_1) {
    "use strict";
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __moduleName = context_1 && context_1.id;
    var React, ReactDOM, redux_1, reducers_1, ColorPicker_1, core_1, defaultState, history, currentUser, onConnect, updateHistory, store, ColorWrapper;
    return {
        setters: [
            function (React_1) {
                React = React_1;
            },
            function (ReactDOM_1) {
                ReactDOM = ReactDOM_1;
            },
            function (redux_1_1) {
                redux_1 = redux_1_1;
            },
            function (reducers_1_1) {
                reducers_1 = reducers_1_1;
            },
            function (ColorPicker_1_1) {
                ColorPicker_1 = ColorPicker_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            }
        ],
        execute: function () {/// <reference path='../typings/browser.d.ts'/>
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
                prev: function () { return this.states[--this.stateIndex]; },
                next: function () { return this.states[++this.stateIndex]; },
                goTo: function (index) { return this.states[this.stateIndex = index]; },
                canPrev: function () { return this.stateIndex <= 0; },
                canNext: function () { return this.stateIndex >= this.states.length - 1; },
                pushState: function (nextState) {
                    this.states.push(nextState);
                    this.stateIndex = this.states.length - 1;
                }
            };
            onConnect = function (user) { return currentUser = user; };
            updateHistory = function (store) { return function (next) { return function (action) {
                var result = next(action);
                if (action.type !== 'LOAD') {
                    history.pushState(store.getState());
                }
                $.ss.postJSON("/publish-channel/" + currentUser.usersChannel + "?selector=cmd.publishAction", action);
                return result;
            }; }; };
            store = redux_1.createStore(function (state, action) {
                var reducer = reducers_1.default[action.type];
                var nextState = reducer != null
                    ? reducer(state, action)
                    : state;
                return nextState;
            }, defaultState, redux_1.applyMiddleware(updateHistory));
            ColorWrapper = (function (_super) {
                __extends(ColorWrapper, _super);
                function ColorWrapper() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                ColorWrapper.prototype.render = function () {
                    return React.createElement(ColorPicker_1.ColorPicker, { color: this.props.color, onChange: this.props.setColor });
                };
                return ColorWrapper;
            }(React.Component));
            ColorWrapper = __decorate([
                core_1.reduxify(function (state) { return ({ color: state.color }); }, function (dispatch) { return ({ setColor: function (color) { return dispatch({ type: 'COLOR_CHANGE', color: color }); } }); })
            ], ColorWrapper);
            ReactDOM.render(React.createElement("h2", null, "Preview"), document.getElementById("content"));
        }
    };
});
//# sourceMappingURL=app.js.map