"use strict"
import axios from 'axios';

export function getCart(){
  return function(dispatch){
    axios.get('/api/cart')
    .then(function(response){
      dispatch({type: "GET_CART", payload:response.data})
    })
    .catch(function(err){
      dispatch({type: "GET_CART_ERROR", msg: "GET cart error"})
    })
  }
}

export function addToCart(book){
  return function(dispatch){
    axios.post('/api/cart', book)
    .then(function(response){
      dispatch({type: 'ADD_TO_CART', payload:response.data})
    })
    .catch(function(err){
      dispatch({type: 'ADD_TO_CART_ERROR', msg: 'Error add to cart'})
    })
  }
};

export function updateCartItem(_id, unit, cart){
  const currentBookToUpdate = cart
  const indexToUpdate = currentBookToUpdate.findIndex(
    function(book){
      console.log(book)
      return book._id === _id;
    }
  )
  const newBookToUpdate = {
    ...currentBookToUpdate[indexToUpdate],
    quantity: currentBookToUpdate[indexToUpdate].quantity + unit
  }
  let cartUpdate = [...currentBookToUpdate.slice(0, indexToUpdate), newBookToUpdate, ...currentBookToUpdate.slice(indexToUpdate + 1)]

  return function(dispatch){
    axios.post('/api/cart', cartUpdate)
    .then(function(response){
      dispatch({type: 'UPDATE_CART_ITEM', payload:response.data})
    })
    .catch(function(err){
      dispatch({type: 'UPDATE_CART_ERROR', msg: 'Error UPDATE to cart'})
    })
  }

};

export function deleteCartItem(cart){
  return function(dispatch){
    axios.post('/api/cart', cart)
    .then(function(response){
      dispatch({type: 'DELETE_CART_ITEM', payload:response.data})
    })
    .catch(function(err){
      dispatch({type: 'DELETE_CART_ITEM_ERROR', msg: 'Error DELETE to cart'})
    })
  }
};
