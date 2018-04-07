var chai = require('chai');
var expect = require ('chai').expect;
var should = require('should');
var request = require('request');
chai.use(require('chai-http'));
const RecruiterUrl = 'http://Localhost:3002';

describe ('Validate GET ALL / POST for Score', function() {
	this.timeout(5000); // How long to wait for a response (ms)
	it('Should return all Scores for a Test ID', function() {
    return chai.request(RecruiterUrl)
      .get('/getScores'+'?test_id='+CreatedTestID)
      .then(function(res) {
			expect(res).to.have.status(200);
			expect(res).to.be.json;
       	})
    });
	
	//Define value for Score to insert into system.
	var ScoreDetails = 
	{
		candid_id: '',
		candid_name: 'Test Candidate Name',
  		test_id: '',	
  		score: '15 / 20'
	};

	//Insert Score to system and in return get _id stored in a global variable
	it('Should insert Score with all valid inputs', function() {
		ScoreDetails.candid_id=CreatedCandidateID;
		ScoreDetails.test_id=CreatedTestID;
		return chai.request(RecruiterUrl)
       		.post('/submitScore')
			.send(ScoreDetails)
			.then(function(res) {
        		expect(res).to.have.status(200);
        		expect(res).to.be.json;
 		})
	});
});