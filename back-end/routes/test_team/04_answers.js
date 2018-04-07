var chai = require('chai');
var expect = require ('chai').expect;
var should = require('should');
var request = require('request');
chai.use(require('chai-http'));
const RecruiterUrl = 'http://Localhost:3002';


describe ('Validate GET ALL / POST / GET BY ID for Answers', function() {
	this.timeout(5000); // How long to wait for a response (ms)
	it('Should return all Answers', function() {
    return chai.request(RecruiterUrl)
      .get('/getAnswers')
      .then(function(res) {
			expect(res).to.have.status(200);
			expect(res).to.be.json;
       	})
    });
	
	//Define value for Answer to insert into system.
	var AnswerDetails = 
	{
		test_id: 'String',	
  		question_id: 'String',
  		candid_id: 'String',
  		answer_given: 'Given Answer',
  		isCorrect: true
  	};

	//Insert Answer to system and in return get _id stored in a global variable
	it('Should insert Answer with all valid inputs', function() {
		AnswerDetails.test_id=CreatedTestID;
		AnswerDetails.question_id=CreatedQuestionID;
		AnswerDetails.candid_id=CreatedCandidateID;
		return chai.request(RecruiterUrl)
       		.post('/submitAnswer')
			.send(AnswerDetails)
			.then(function(res) {
        		expect(res).to.have.status(200);
        		expect(res).to.be.json;
       	})
	});
	
	//Retrive Answer search by Candidate _id
	it('Should GET Answer by search of specific Candidate ID', function() {
    return chai.request(RecruiterUrl)
      .get('/getAnswers'+'?candid_id='+CreatedCandidateID)
      .then(function(res) {
			expect(res).to.have.status(200);
			expect(res).to.be.json;
		})
    });

	//Retrive Answer search by Correct Answer
	it('Should GET Answer by search of specific Correct Answer value TRUE', function() {
    return chai.request(RecruiterUrl)
      .get('/getAnswers'+'?isCorrect='+true)
      .then(function(res) {
			expect(res).to.have.status(200);
			expect(res).to.be.json;
		})
    });

    it('Should GET Answer by search of specific Correct Answer value FALSE', function() {
    return chai.request(RecruiterUrl)
      .get('/getAnswers'+'?isCorrect='+false)
      .then(function(res) {
			expect(res).to.have.status(200);
			expect(res).to.be.json;
		})
    });

    it('Should return Candidate Data (answers) search by Candidate ID', function() {
    return chai.request(RecruiterUrl)
          .get('/getCandidData'+'?candid_id='+CreatedCandidateID)
          .then(function(res) {
              expect(res).to.have.status(200);
              expect(res).to.be.json;
            })
    });
});