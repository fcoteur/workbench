const { body, validationResult } = require('express-validator/check')
const { sanitizeBody } = require('express-validator/filter')
const jwt = require('jsonwebtoken');

var User = require('../models/user');

// Display list of all Users
exports.user_details = function(req, res) {
  User.find({})
  .exec(function (err, list_users) {
    if (err) { return next(err); }
    res.send({ title: 'User List', list_users: list_users });
  });
};

exports.user_register = function(req, res) {
  const { email, password } = req.body;
  console.log( email, password )
  const user = new User({ email, password });
  user.save(function(err) {
    if (err) {
      res.status(500)
        .send("Error registering new user please try again.");
    } else {
      res.status(200).send("Welcome to the club!");
    }
  });
};

exports.user_authenticate = function(req, res) {
  const { email, password } = req.body;
  User.findOne({ email }, function(err, user) {
    if (err) {
      console.error(err);
      res.status(500)
        .json({
        error: 'Internal error please try again'
      });
    } else if (!user) {
      res.status(401)
        .json({
          error: 'Incorrect email or password'
        });
    } else {
      user.isCorrectPassword(password, function(err, same) {
        if (err) {
          res.status(500)
            .json({
              error: 'Internal error please try again'
          });
        } else if (!same) {
          res.status(401)
            .json({
              error: 'Incorrect email or password'
          });
        } else {
          // Issue token
          const payload = { email };
          jwt.sign(payload, process.env.SECRET,{expiresIn: '1h'}, (err, token) => {
            res.json({token});
          })
        }
      });
    }
  });
}