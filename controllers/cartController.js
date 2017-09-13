var controller = {
  cartCreate : function(req, res){
    var cart = req.body;
    req.session.cart = cart;
    req.session.save(function(err){
      if(err){
        throw err;
      }
      res.json(req.session.cart)
    })
  },

  getCart: function(req, res){
    if (typeof req.session.cart !== 'undefined'){
      res.json(req.session.cart);
    }
  }

}

module.exports = controller;
