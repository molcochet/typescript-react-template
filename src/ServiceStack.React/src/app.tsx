//Include typings files for all libraries add to the application
/// <reference path='../typings/browser.d.ts'/>
/// <reference path='../typings/index.d.ts'/>

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import { AppMain } from './components/AppMain';

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


ReactDOM.render(
    <AppMain/>,
    document.getElementById("content"));

