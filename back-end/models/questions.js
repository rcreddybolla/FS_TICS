var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define a schema.
var questionsSchema = new Schema({
  question_name: String,
  answers: Array,
  correct_answer: String,
  question_type: String,
  question_category: String
}, {
    versionKey: false // To not generate __v key
});

// Create a model.
var Questions = mongoose.model('Questions', questionsSchema);

module.exports = Questions;