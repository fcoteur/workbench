var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CitySchema = new Schema(
  {
    id: {type: String},
    country: {type: String},
    name: {type: String},
    coord: {type: Object},
    geoname: {type: Object},
    langs: {type: Array},
    stat: {type: Array},
    stations: {type: Array},
    zoom: {type: Number}
  }
);

module.exports = mongoose.model('City', CitySchema);