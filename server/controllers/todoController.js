const { body, validationResult } = require('express-validator/check')
const { sanitizeBody } = require('express-validator/filter')

var Todo = require('../models/todo');

// Display list of all Bookmarks
exports.todo_list = function(req, res) {
  Todo.find({})
  .sort('-created')
  .exec(function (err, list) {
    if (err) { return next(err); }
    res.send(list);
  });
};

// Create new Bookmark
exports.todo_create = [
  body('title', 'Title required').isLength({ min: 1 }).trim(),
  sanitizeBody('title').trim().escape(),
  function(req, res, next) {
    const errors = validationResult(req);
    
    var todo = new Todo({ 
      title: req.body.title,
    });
       
    if (!errors.isEmpty()) {
      console.log(errors.array());
    return;
    }
    else {
      todo.save(function (err) {
        if (err) { return next(err); }
        console.log('todo: ' + todo.title + ' saved')
        res.send({id: todo._id, msg: 'created'})
      });
    }
  }
];

// Delete Bookmark
exports.todo_delete = function(req, res) {
  Todo.deleteOne({ _id: req.body._id})
  .exec(function (err ) {
    if (err) { return next(err); }
    res.send({id: req.body.id, msg: 'deleted'})
  });
};

// Edit Bookmark
exports.todo_update = [
  body('title', 'Title required').isLength({ min: 1 }).trim(),
  sanitizeBody('title').trim().escape(),
  function(req, res, next) {
    const errors = validationResult(req);
            
    if (!errors.isEmpty()) {
      console.log(errors.array());
    return;
    }
    else {
      Todo.updateOne({ _id: req.body.id}, {title: req.body.title, done:req.body.done})
        .exec(function (err, list) {
          if (err) { return next(err); }
          res.send({id: req.body.id, msg: 'updated'});
        });
    }
  }
];