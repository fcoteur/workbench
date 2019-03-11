const { body, validationResult } = require('express-validator/check')
const { sanitizeBody } = require('express-validator/filter')

var Todo = require('../models/todo');

exports.todo_list = function(req, res) {
  const userId = req.params.userId;
  Todo.find({createdBy: userId})
  .sort('-created')
  .exec(function (err, list) {
    if (err) { return next(err); }
    res.send(list);
  });
};

exports.todo_create = [
  body('title', 'Title required').isLength({ min: 1 }).trim(),
  body('createdBy', 'createdBy required').isLength({ min: 1 }).trim(),
  sanitizeBody('title').trim().escape(),
  function(req, res, next) {
    const errors = validationResult(req);
    var todo = new Todo({ 
      title: req.body.title,
      createdBy: req.body.createdBy
    });
    console.log(todo)
    if (!errors.isEmpty()) {
      console.log(errors.array());
    return;
    }
    else {
      todo.save(function (err) {
        if (err) { return next(err); }
        res.send({id: todo._id, msg: 'created'})
      });
    }
  }
];

exports.todo_delete = function(req, res) {
  Todo.deleteOne({ _id: req.body._id})
  .exec(function (err ) {
    if (err) { return next(err); }
    res.send({id: req.body.id, msg: 'deleted'})
  });
};

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