var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Candidate = require('../models/candidate');


/* GET all the candidates. */
router.get('/', function(req, res, next) {
  if (!req.query._id) {
    Candidate.find(function(err, candidate){
    if (err) {
      res.status(400);      
      return res.send();
    }
    
    console.log("returning all the candidates.");
    res.send(candidate);
  })
  }
  else{
     var searchQuery = { _id: req.query._id };
     Candidate.find(searchQuery, function(err, candidate){
    if (err) {
      res.status(400);      
      return res.send();
    }
    
    console.log("returning all the candidates.");
    res.send(candidate);
  })
  }
 
  console.log(searchQuery);
  
});


// Insert a candidate
router.post('/newCandidate', function(req, res, next) {
  var newCandid = new Candidate(req.body);
  newCandid._id = mongoose.Types.ObjectId();
  // newCandid.dob = new Date(newCandid.dob);

  newCandid.save(function(err) {
    if (err) {
      console.log("not saved!");
      res.status(400);
      return res.send();
    }

    console.log("saved!");
    res.send({ id : newCandid._id });
  });
});

module.exports = router;