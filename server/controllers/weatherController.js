const { body, validationResult } = require('express-validator/check')
const { sanitizeBody } = require('express-validator/filter')

var City = require('../models/city');

// Display list of all cities with name starting with xxx
exports.city_list = function(req, res) {
  startingLetters = req.params.start.charAt(0).toUpperCase() + req.params.start.slice(1);
  const regexp = new RegExp("^" + startingLetters)
  City.find({name: regexp})
  .exec(function (err, list) {
    if (err) { return next(err); }
    const output =[]
    const temp = list.map((city) => output.push({name: city.name, country: city.country, id: city.id}))
    res.send(output);
  });
};

