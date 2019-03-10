var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var TodoSchema = new Schema(
  {
    title: {type: String, required: true},
    done: {type: Boolean, required: true, default: false},
    created: { type: Date, default: Date.now },
    createdBy: { type: String, required: true}
  }
);

module.exports = mongoose.model('Todo', TodoSchema);