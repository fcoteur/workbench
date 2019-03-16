const { body, validationResult } = require('express-validator/check')
const { sanitizeBody } = require('express-validator/filter')

var City = require('../models/city');
var Country = require('../models/country');

// Display list of all cities with name from given country (two letter code)
exports.city_list = function(req, res) {
  const country = req.params.countryaplha
  City.find({country})
  .exec(function (err, list) {
    if (err) { return next(err); }
    const output =[]
    const temp = list.map((city) => output.push({name: city.name, country: city.country, id: city.id}))
    res.send(output);
  });
};

// to be worked out
exports.country_list = function(req, res) {
  Country.find({})
  .exec(function (err, list) {
    if (err) { return next(err); }
    const output =[]
    const temp = list.map((country) => output.push({name: country.name, alpha2: country.alpha2}))
    res.send(output);
  });
};