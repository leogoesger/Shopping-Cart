"use strict"
import axios from 'axios';

export function getBooks(){
  return function(dispatch){
    //only dispatch once AXIOS has been POSTED with Thunk
    axios.get("/api/books").then(function(response){
      dispatch({type: "GET_BOOKS", payload:response.data})
    })
    .catch(function(err){
      dispatach({type:"GET_BOOK_REJECTED", payload: err})
    })
  }
}

// POST A book
export function postBooks(book){
  return function(dispatch){
    //only dispatch once AXIOS has been POSTED with Thunk
    axios.post("/api/books", book).then(function(response){
      dispatch({type: "POST_BOOK", payload:response.data})
    })
    .catch(function(err){
      dispatach({type:"POST_BOOK_REJECTED", payload:"there was an error POST"})
    })
  }
}

// DELETE A book
export function deleteBooks(id){
  return function(dispatch){
    //only dispatch once AXIOS has been POSTED with Thunk
    axios.delete("/api/books/"+ id).then(function(response){
      dispatch({type: "DELETE_BOOK", payload:id})
    })
    .catch(function(err){
      dispatach({type:"DELETE_BOOK_REJECTED", payload:err})
    })
  }
}

// UPDATE A BOOK
export function updateBooks(book){
  return {
    type: "UPDATE_BOOK",
    payload: book
  }
}

export function resetButton(book){
  return {
    type: "RESET_BUTTON",
    payload: book
  }
}
