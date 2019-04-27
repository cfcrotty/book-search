const db = require("../models");

const axios  = require("axios");

// Defining methods for the booksController
module.exports = {
  findAll: function(req, res) {
    db.Book
      .find(req.body)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.Book
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    axios.get("https://www.googleapis.com/books/v1/volumes?q="+req.body.search).then(response=>{
      var data = [];
      response.data.items.forEach((item,idx)=>{
        //item.volumeInfo.imageLinks.thumbnail || "" //item.volumeInfo.authors.join()

        data.push({link: item.volumeInfo.previewLink, 
          title: item.volumeInfo.title, 
          description: item.volumeInfo.description, 
          authors: item.volumeInfo.authors.join(), 
          image: item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.smallThumbnail : "https://via.placeholder.com/150"
        });
      });
      db.Book
      .create(data)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
    }).catch(error=>{
      res.status(422).json(error);
    });
  },
  update: function(req, res) {
    db.Book
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Book
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
