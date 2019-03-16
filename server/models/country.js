var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CountrySchema = new Schema({
  name: {type: String},
  alpha2:  {type: String},
  countryCode:  {type: String}
  }
);

module.exports = mongoose.model('Country', CountrySchema);