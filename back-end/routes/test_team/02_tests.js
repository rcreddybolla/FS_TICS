var chai = require('chai');
var expect = require ('chai').expect;
var should = require('should');
var request = require('request');
chai.use(require('chai-http'));
const RecruiterUrl = 'http://Localhost:3002';


describe ('Validate GET ALL / POST / GET BY ID for Test', function() {
	this.timeout(5000); // How long to wait for a response (ms)
	it('Should return all Test', function() {
    return chai.request(RecruiterUrl)
      .get('/getTests')
      .then(function(res) {
			expect(res).to.have.status(200);
			expect(res).to.be.json;
       	})
    });
	
	//Define value for test to insert into system.
	var TestDetails = 
	{
		recruiter_id: 'Test Recruiter ID',
		designation: 'Test Designation Description',
		question_IDs: [],
		skills: ['TestSkill01','TestSkill02','TestSkill03']
	};

	//Insert a test to system and in return get _id stored in a global variable
	it('Should insert a test with all valid inputs', function() {
		TestDetails.question_IDs=[CreatedQuestionID];
		return chai.request(RecruiterUrl)
       		.post('/createTest')
			.send(TestDetails)
			.then(function(res) {
        		expect(res).to.have.status(200);
        		expect(res).to.be.json;
        		CreatedTestID = res.body.id;
       	})
	});
	
	//Retrive test search by Test _id
	it('Should GET Test by search of specific Test ID', function() {
    return chai.request(RecruiterUrl)
      .get('/getTests'+'?_id='+CreatedTestID)
      .then(function(res) {
			expect(res).to.have.status(200);
			expect(res).to.be.json;
			expect(res.body[0].recruiter_id).to.equal('Test Recruiter ID');
			expect(res.body[0].designation).to.equal('Test Designation Description');
			expect(res.body[0].question_IDs[0]).to.equal(CreatedQuestionID);
			expect(res.body[0].skills[0]).to.equal('TestSkill01');
			expect(res.body[0].skills[1]).to.equal('TestSkill02');
			expect(res.body[0].skills[2]).to.equal('TestSkill03');
    	})
  	});
});