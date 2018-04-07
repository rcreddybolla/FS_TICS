var chai = require('chai');
var expect = require ('chai').expect;
var should = require('should');
var request = require('request');
chai.use(require('chai-http'));
const RecruiterUrl = 'http://Localhost:3002';
const CandidateUrl = 'http://Localhost:3001';

describe ('Validate GET ALL / POST for Candidates', function() {
	this.timeout(5000); // How long to wait for a response (ms)
	
  it('Should return all Candidates', function() {
    return chai.request(CandidateUrl)
      .get('/')
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res).to.be.not.empty;
      })
   });

  it('Should return all Candidates for a Test ID', function() {
    return chai.request(RecruiterUrl)
      .get('/getCandidates'+'?test_id=5a8a90f7d6c1f4189b2b78f3')
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
       })
  });
	
	//Define value for Candidate Deteails to insert into system.
	var CandidateDetails = 
	{
		candid_name: 'TestCandidateName',
  		candid_email: 'TestCandidate@email.com',
  		candid_phone: '1234567890',
  		candid_phone2: '9876543210',
  		no_of_exp: 5,
  		dob: 1995-12-31,
  		gender: 'Male',
  		pref_loc: 'Bangalore',
  		recruiter_id: 'TestRecruiterID',
  		test_id: 'CreatedTestID',
  		hasPassed: true
	};

	//Insert Score to system and in return get _id stored in a global variable
	it('Should insert New Candidate Details with all valid inputs', function() {
		CandidateDetails.test_id=CreatedTestID;
    return chai.request(CandidateUrl)
       		.post('/newCandidate')
			    .send(CandidateDetails)
			    .then(function(res) {
        		expect(res).to.have.status(200);
        		expect(res).to.be.json;
            CreatedCandidateID = res.body.id;
		    })
	 });
});