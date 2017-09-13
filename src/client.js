"use strict"
// REACT
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import thunk from 'redux-thunk';

import {applyMiddleware, createStore} from 'redux';
import logger from 'redux-logger'
import reducers from './reducers/index';
import {addToCart} from './actions/cartActions';
import {postBooks, deleteBooks, updateBooks} from './actions/booksActions';

//create store
const middleware = applyMiddleware(thunk, logger);

//PASS INITIAL STATE FROM SERVER STORE
const initialState = window.INITIAL_STATE
const store = createStore(reducers, initialState, middleware);

import routes from './routes'
const Routes = (
  <Provider store={store}>
    {routes}
  </Provider>
)
render(
  Routes, document.getElementById('app')
);
