const { body, validationResult } = require('express-validator/check')
const { sanitizeBody } = require('express-validator/filter')

var User = require('../models/user');

// Display list of all Users
exports.user_list = function(req, res) {
  User.find({})
  .exec(function (err, list_users) {
    if (err) { return next(err); }
    res.send({ title: 'User List', list_users: list_users });
  });
};

// Create new User
exports.user_create = [
  body('name', 'Name required').isLength({ min: 1 }).trim(),
  sanitizeBody('name').trim().escape(),
  function(req, res, next) {
    const errors = validationResult(req);
    
    var user = new User(
      { name: req.body.name }
    );
       
    if (!errors.isEmpty()) {
      console.log(errors.array());
    return;
    }
    else {
      // Check if User with same name already exists.
      User.findOne({ 'name': req.body.name })
        .exec( function(err, found_genre) {
           if (err) { return next(err); }
           if (found_genre) {
             console.log('user: ' + user.name + ' already exists')
             return
           }
           else {
             user.save(function (err) {
               if (err) { return next(err); }
               console.log('user: ' + user.name + ' saved')
             });
           }
         });
    }
  }
];
