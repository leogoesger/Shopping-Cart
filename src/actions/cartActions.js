export function addToCart(book){
  return {
    type: "ADD_TO_CART",
    payload: book
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
  return {
    type: "UPDATE_CART_ITEM",
    payload: cartUpdate
  }
};

export function deleteCartItem(cart){
  return {
    type: "DELETE_CART_ITEM",
    payload: cart
  }
};
