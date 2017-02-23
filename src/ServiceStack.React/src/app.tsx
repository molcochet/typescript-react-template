/// <reference path='../typings/browser.d.ts'/>

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';

import reducers from './reducers';
import History from './History';
import Counter from './Counter';
import { ColorPicker } from './ColorPicker';
import ShapeMaker from './ShapeMaker';
import ShapeViewer from './ShapeViewer';
import { reduxify } from './core';
import Connect from './Connect';

var defaultState = {
    nextShapeId: 0, width: 100, height: 100, color: "#000000", shapes: [],
    currentUser: null, users: []
};

var history = {
    states: [],
    stateIndex: 0,
    reset() {
        this.states = [];
        this.stateIndex = -1;
    },
    prev() { return this.states[--this.stateIndex]; },
    next() { return this.states[++this.stateIndex]; },
    goTo(index) { return this.states[this.stateIndex = index]; },
    canPrev() { return this.stateIndex <= 0; },
    canNext() { return this.stateIndex >= this.states.length - 1; },
    pushState(nextState) {
        this.states.push(nextState);
        this.stateIndex = this.states.length - 1;
    }
};

var currentUser;
const onConnect = (user) => currentUser = user;

const updateHistory = store => next => action => {
    var result = next(action);

    if (action.type !== 'LOAD') {
        history.pushState(store.getState());
    }

    $.ss.postJSON(`/publish-channel/${currentUser.usersChannel}?selector=cmd.publishAction`, action);

    return result;
};

let store = createStore(
    (state, action) => {
        var reducer = reducers[action.type];
        var nextState = reducer != null
            ? reducer(state, action)
            : state;

        return nextState;
    },
    defaultState,
    applyMiddleware(updateHistory));

@reduxify(
    (state) => ({ color: state.color }),
    (dispatch) => ({ setColor: (color) => dispatch({ type: 'COLOR_CHANGE', color }) })
)
class ColorWrapper extends React.Component<any, any> {
    render() {
        return <ColorPicker color={this.props.color} onChange={this.props.setColor} />;
    }
}

ReactDOM.render(
    <h2>Preview 2</h2>,
    document.getElementById("content"));

