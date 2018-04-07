var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define a schema.
var submitSchema = new Schema({
  test_id: String,	
  question_id: String,
  candid_id: String,
  answer_given: String,
  isCorrect: Boolean
}, {
    versionKey: false // To not generate __v key
});

// Create a model.
var Submissions = mongoose.model('submission', submitSchema);

module.exports = Submissions;