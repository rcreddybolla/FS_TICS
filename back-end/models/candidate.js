var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define a schema.
var candidateSchema = new Schema({
  candid_name: String,
  candid_email: String,
  candid_phone: String,
  candid_phone2: String,
  no_of_exp: Number,
  dob: Date,
  gender: String,
  pref_loc: String,
  recruiter_id: String,
  test_id: String,
  hasPassed: Boolean
}, {
    versionKey: false // To not generate __v key
});

// Create a model.
var Candidate = mongoose.model('candidate', candidateSchema);

module.exports = Candidate;