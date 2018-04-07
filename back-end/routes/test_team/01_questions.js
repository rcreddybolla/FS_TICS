var chai = require('chai');
var expect = require ('chai').expect;
var should = require('should');
var request = require('request');
chai.use(require('chai-http'));
const RecruiterUrl = 'http://Localhost:3002';


describe ('Validate GET ALL / POST / GET BY ID / GET BY QUESTION NAME / GET BY CATEGORY for Questions', function() {
	this.timeout(5000); // How long to wait for a response (ms)
	it('Should return all Questions', function() {
    return chai.request(RecruiterUrl)
      .get('/')
      .then(function(res) {
			expect(res).to.have.status(200);
			expect(res).to.be.json;
       	})
    });
	
	//Define value for question to insert into system.
	var QuestionDetails = 
	{
		question_name: 'This question inserted via /insert question API by Test Team?',
  		answers: ['testyes','testno'],
  		correct_answer: 'testyes',
  		question_type: 'testsingle',
  		question_category: 'testgeneral'
	};

	//Insert a question to system and in return get _id stored in a global variable
	it('Should insert a question with all valid inputs', function() {
		return chai.request(RecruiterUrl)
       		.post('/insertQues')
			.send(QuestionDetails)
			.then(function(res) {
        		expect(res).to.have.status(200);
        		expect(res).to.be.json;
        		CreatedQuestionID = res.body.id;
       	})
	});
	
	//Retrive question search by question _id
	it('Should GET Question by search of specific Question ID', function() {
    return chai.request(RecruiterUrl)
      .get('/'+'?_id='+CreatedQuestionID)
      .then(function(res) {
			expect(res).to.have.status(200);
			expect(res).to.be.json;
			expect(res.body[0].question_name).to.equal('This question inserted via /insert question API by Test Team?');
			expect(res.body[0].answers[0]).to.equal('testyes');
			expect(res.body[0].answers[1]).to.equal('testno');
			expect(res.body[0].correct_answer).to.equal('testyes');
			expect(res.body[0].question_type).to.equal('testsingle');
			expect(res.body[0].question_category).to.equal('testgeneral');

			CreatedQuestionName = res.body[0].question_name;
        	CreatedQuestionCategory = res.body[0].question_category;
       	})
    });

	//Retrive question search by question name
	it('Should GET Questions by search of specific Question Name', function() {
    return chai.request(RecruiterUrl)
      .get('/'+'?question_name='+ CreatedQuestionName)
      .then(function(res) {
			expect(res).to.have.status(200);
			expect(res).to.be.json;
		})
    });

	//Retrive question search by question category
	it('Should GET Questions by search of specific Question Category', function() {
    return chai.request(RecruiterUrl)
      .get('/'+'?question_category='+ CreatedQuestionCategory)
      .then(function(res) {
			expect(res).to.have.status(200);
			expect(res).to.be.json;
       	})
    });
});