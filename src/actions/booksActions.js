"use strict"
import axios from 'axios';

export function getBooks(){
  return {
    type: "GET_BOOKS"
  }
}

// POST A book
export function postBooks(book){
  return function(dispatch){
    //only dispatch once AXIOS has been POSTED with Thunk
    axios.post("/books", book).then(function(response){
      dispatch({type: "POST_BOOK", payload:response.data})
    })
    .catch(function(err){
      dispatach({type:"POST_BOOK_REJECTED", payload:"there was an error posting"})
    })
  }
}

// DELETE A book
export function deleteBooks(id){
  return {
    type: "DELETE_BOOK",
    payload: id
  }
}

// UPDATE A BOOK
export function updateBooks(book){
  return {
    type: "UPDATE_BOOK",
    payload: book
  }
}
