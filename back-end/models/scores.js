var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define a schema.
var scoreSchema = new Schema({
  candid_id: String,
  candid_name: String,
  test_id: String,	
  score: String
}, {
    versionKey: false // To not generate __v key
});

// scoreSchema.plugin(uniqueValidator);
// Create a model.
var Scores = mongoose.model('score', scoreSchema);

module.exports = Scores;