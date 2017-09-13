var path = require('path');
var Books = require('../models/books.js');

var controller = {
  postBook : function(req, res){
    var book = req.body;

    Books.create(book, function(err,books){
      if(err){
        throw err;
      }
      res.json(books);
    })
  },

  getBooks : function(req, res){
    Books.find(function(err,books){
      if(err){
        throw err;
      }
      res.json(books);
    })
  },

  deleteBook : function(req, res){
    var query = {_id: req.params._id}
    Books.remove(query, function(err,books){
      if(err){
        console.log("Error");
      }
      res.json(books);
    })
  },

  updateBook : function(req, res){
    var book = req.body;
    var query = {_id: req.params._id};
    var update = {
      '$set':{
        title:book.title,
        description:book.description,
        image:book.image,
        price:book.price
      }
    };
    var options = {new: true}
    Books.findOneAndUpdate(query, update, options, function(err,books){
      if(err){
        throw err;
      }
      res.json(books);
    })
  },

  getImage : function(req,res){
    const imgFolder = path.join(__dirname, '../public/images/');
    const fs = require('fs');
    fs.readdir(imgFolder, function(err, files){
      if(err){
        return console.error(err)
      }
      const filesArr = [];
      files.forEach(function(file){
        filesArr.push({name: file})
      })
      res.json(filesArr);
    })
  }

}

module.exports = controller;
