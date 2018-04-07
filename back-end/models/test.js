var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define a schema.
var testSchema = new Schema({
  recruiter_id: String,
  designation: String,
  question_IDs: Array,
  skills: Array
}, {
    versionKey: false // To not generate __v key
});

// Create a model.
var Test = mongoose.model('Test', testSchema);

module.exports = Test;