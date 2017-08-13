var Users = require('../models/users.js')
var Books = require('../models/books.js')

module.exports = function ServerHandler () {
  this.getBooks = (req, res) => {
    Books
      .find({}, (err, result) => {
        if(err){throw err}
        result.unshift(req.user.twitter.id)
        console.log(result)
        res.json(result)
      })
  }
  this.addBooks = (req, res) => {
    var book = new Books()

    book.name     = req.query.name
    book.owner    = {
      id            : req.user.twitter.id,
      state         : req.user.state,
      fullname      : req.user.fullname,
      city          : req.user.city
    }
    book.pending  = {};

    book.save(function(err) {
      if(err){
        throw err;
        res.json({"success":false, "data": err})
      }
      res.json({"success":true, "data": book})
    });
  }
  this.updateProfile = (req, res) => {
    Users
      .findOneAndUpdate({'twitter.id':req.user.twitter.id},{fullname:req.query.fullname,city:req.query.city,state:req.query.state})
      .exec((err, result) => {
        if(err){
          throw err;
          res.json({"success":false, "data": err})
        }
        result.fullname = req.query.fullname
        result.state    = req.query.state
        result.city     = req.query.city
        res.json({"success":true, "data": result})
      })
  }
  this.addTrade = (req, res) => {
    var obj = {
      id            : req.user.twitter.id,
      state         : req.user.state,
      fullname      : req.user.fullname,
      city          : req.user.city,
      offer         : req.query.offer
    }
    Books
      .findOneAndUpdate({'owner.id':req.query.id, 'name':req.query.title}, {pending: obj})
      .exec((err, result) => {
        res.redirect('/')
      })
  }
  this.acceptTrade = (req, res) => {
    Books
      .deleteOne({'owner.id':req.user.twitter.id, 'name':req.query.name})
      .exec((err, result) => {
        res.redirect('/')
      })
  }
  this.denyTrade = (req, res) => {
    Books
      .findOneAndUpdate({'owner.id':req.user.twitter.id, 'name':req.query.name}, {pending: undefined})
      .exec((err, result) => {
        res.redirect('/')
      })
  }
}
