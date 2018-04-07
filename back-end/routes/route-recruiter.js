var express = require('express');
var Question = require('../models/questions');
var Test = require('../models/test');
var Submit = require('../models/submissions');
var Scores = require('../models/scores');
var router = express.Router();
var mongoose = require('mongoose');
// var LdapStrategy = require('passport-ldapauth');
// var uniqueValidator = require('mongoose-unique-validator');


//LDAP


/* GET all questions page. */
router.get('/', function(req, res, next) {
  var searchQuery = {};

  if(req.query.question_name)
    searchQuery = { question_name: req.query.question_name };
	
  if(req.query._id)
    searchQuery = { _id: req.query._id};

	if(req.query.question_category)
    searchQuery = { question_category: req.query.question_category };

  Question.find(searchQuery, function(err, questions){
    if (err) {
      res.status(400);      
      res.send();
    }

    console.log("returning all the questions.");
    res.send(questions);
  })
});

/* Insert a question */
router.post('/insertQues', function(req, res, next) {
  var newQues = new Question(req.body);
  newQues._id = mongoose.Types.ObjectId();

  newQues.save(function(err) {
    if (err) {
      console.log("not saved!");
      res.status(400);
      res.send();
    }

    console.log("saved!");
    res.send({ id : newQues._id });
  });
});


// Create a new test
router.post('/createTest', function(req, res, next) {
  var newTest = new Test(req.body);
  newTest._id = mongoose.Types.ObjectId();

  newTest.save(function(err) {
    if (err) {
      console.log("not saved!");
      res.status(400);
      res.send();
    }

    console.log("saved!");
    res.send({ id : newTest._id });
  });
});

// Get all tests
router.get('/getTests', function(req, res, next) {
  var searchQuery = {};

  if(req.query._id)
    searchQuery = { _id: req.query._id };
  
  if(req.query.designation)
    searchQuery = { designation: req.query.designation };

  Test.find(searchQuery, function(err, tests){
    if (err) {
      res.status(400);      
      res.send();
    }

    console.log("returning all the tests.");
    res.send(tests);
  })
});



// Submit an answer
router.post('/submitAnswer', function(req, res, next) {
  var newSubmit = new Submit(req.body);
  newSubmit._id = mongoose.Types.ObjectId();

  newSubmit.save(function(err) {
    if (err) {
      console.log("not saved!");
      res.status(400);
      return res.send();
    }

    console.log("saved!");
    res.send({ id : newSubmit._id });
  });
});


// Delete a question
router.post('/deleteQues', function(req, res, next) {
  Question.remove({_id : req.body.id}, function(err) {
    if (err) {
      console.log("not removed!");
      res.status(400);      
      res.send();
    }

    
    console.log("removed!");
    res.send({status: 'ok'});
  });
});

// Delete a test
router.post('/deleteTest', function(req, res, next) {
  Test.remove({_id : req.body.id}, function(err) {
    if (err) {
      console.log("not removed!");
      res.status(400);      
      res.send();
    }

    console.log("removed!");
    res.send({status: 'ok'});
  });
});


router.get('/getAnswers', function(req, res, next) {
  var searchQuery = {};

  if(req.query.candid_id)
    searchQuery = { candid_id: req.query.candid_id };
  
  if(req.query.isCorrect)
    searchQuery = { isCorrect: req.query.isCorrect };

  Submit.find(searchQuery, function(err, tests){
    if (err) {
      res.status(400);      
      res.send();
    }

    console.log("returning all the answers.");
    res.send(tests);
  })
});

// Get distinct candidates based on the submissions
router.get('/getCandidates', function(req, res, next) {
  var searchQuery = '';
  searchQuery = { test_id: req.query.test_id };
  Submit.find().distinct('candid_id', searchQuery, function(err, candidates) {
    if (err) {
      res.status(400);
      res.send();
    }

    console.log("returning all distinct candidates");
    res.send(candidates);
  })
});

// Get submissions for specific candidate
router.get('/getCandidData', function(req, res, next) {
  var searchQuery = '';
  searchQuery = { candid_id: req.query.candid_id };
  Submit.find(searchQuery, function(err, answers){
    if (err) {
      res.status(400);      
      res.send();
    }

    console.log("returning all the answers of the candidate.");
    res.send(answers);
  })
});


// Updating the scores
router.post('/submitScore', function(req, res, next) {

  var newScore = new Scores(req.body);
  newScore._id = mongoose.Types.ObjectId();
  console.log(newScore._id);
  newScore.save(function(err) {
    if (err) {
      console.log("not saved!");
      res.status(400);
      return res.send();
    }
    
      console.log("saved!");
      res.send({ id : newScore._id });
  
  });
});

// Get scores for the specific test
router.get('/getScores', function(req, res, next) {
  var searchQuery = '';
  searchQuery = { test_id: req.query.test_id };
  Scores.find(searchQuery, function(err, scores){
    if (err) {
      res.status(400);      
      return res.send();
    }

    console.log("returning all the scores of the test.");
    res.send(scores);
  })
});


// update
// router.post('/updateUser', function(req, res, next) {
//   var user = new User(req.body);

//   User.update({_id : user.id}, user, function(err) {
//     if (err) {
//       console.log("not updated!");
//       res.status(400);      
//       res.send();
//     }

//     console.log("updated!");
//     res.send({status: 'ok'});
//   });
// });

module.exports = router;
