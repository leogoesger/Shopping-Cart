"use strict"
import axios from 'axios';
import React from 'react';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {renderToString} from 'react-dom/server';
import {match, RouterContext} from 'react-router';

import reducers from './src/reducers/index';
import routes from './src/routes';


function handleRender(req, res){
    axios.get('http://localhost:3001/books')
    .then(function(response){

      // CREATE A REDUX STORE ON THE Server-side
      const store = createStore(reducers,{"books":{"books":response.data}})
      // GET INITIAL STATE FROM THE store
      const initialState = JSON.stringify(store.getState()).replace(/<\/script/g, '<\\/script').replace(/<!--/g,'<\\!--');
      // IMPLEMENT REACT-ROUTER ON THE SERVER TO INTERCEPT client requests and define what to do with them
      const Routes = {
        routes: routes,
        location: req.url
      }
      match(Routes, function(err, redirect, props){
        if(err){
          res.status(500).send("Error fullfilling the request");
        } else if(redirect){
          res.status(302, redirect.pathname + redirect.search)
        } else if(props){
          const reactComponent = renderToString(
            <Provider store={store}>
              <RouterContext {...props} />
            </Provider>
          )
          res.status(200).render('index', {reactComponent, initialState})
        } else {
          res.statis(404).send('Not Found')
        }
      })

    })
    .catch(function(err){
      console.log('#Initial Server-side rendering error', err);
    })
}

module.exports = handleRender;
