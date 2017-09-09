"use strict"
// REACT
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

import {applyMiddleware, createStore} from 'redux';
import logger from 'redux-logger'
import reducers from './reducers/index';
import {addToCart} from './actions/cartActions';
import {postBooks, deleteBooks, updateBooks} from './actions/booksActions';

//create store
const middleware = applyMiddleware(logger);
const store = createStore(reducers, middleware);


import BooksList from './components/pages/bookslist';
import Cart from './components/pages/carts';
import BooksForm from './components/pages/booksForm';
import Main from './main';

const Routes = (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Main}>
        <IndexRoute component={BooksList}/>
        <Route path="/admin" component={BooksForm}/>
        <Route path="/cart" component={Cart}/>
      </Route>
    </Router>
  </Provider>
)
render(
  Routes, document.getElementById('app')
);
