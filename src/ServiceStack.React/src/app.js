//Include typings files for all libraries add to the application
/// <reference path='../typings/browser.d.ts'/>
/// <reference path='../typings/index.d.ts'/>
"use strict";
var React = require("react");
var ReactDOM = require("react-dom");
var AppMain_1 = require("./components/AppMain");
var defaultState = {
    nextShapeId: 0, width: 100, height: 100, color: "#000000", shapes: [],
    currentUser: null, users: []
};
//let store = createStore(
//    (state, action) => {
//        var reducer = reducers[action.type];
//        var nextState = reducer != null
//            ? reducer(state, action)
//            : state;
//        return nextState;
//    },
//    defaultState);
ReactDOM.render(React.createElement(AppMain_1.AppMain, null), document.getElementById("content"));
//# sourceMappingURL=app.js.map