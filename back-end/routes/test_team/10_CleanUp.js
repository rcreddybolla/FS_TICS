var chai = require('chai');
var expect = require ('chai').expect;
var should = require('should');
var request = require('request');
chai.use(require('chai-http'));
const RecruiterUrl = 'http://Localhost:3002';


describe ('Delete all data created by testing and re-validate cleanup', function() {
	this.timeout(5000); // How long to wait for a response (ms)
//Delete question by question _id
	it('Should Delete Question by search of specific Question ID', function() {
    return chai.request(RecruiterUrl)
      .post('/deleteQues')
      .send({id:CreatedQuestionID})
      .then(function(res) {      	
			expect(res).to.have.status(200);
			expect(res).to.be.json;
		})
    });

    //Retrive question search by deleted question _id
	it('Should GET Empty response when search by Question ID which had deleted', function() {
    return chai.request(RecruiterUrl)
      .get('/'+'?_id='+CreatedQuestionID)
      .then(function(res) {
			expect(res).to.have.status(200);
			expect(res).to.be.json;
			expect(res.body).to.be.empty;
       	})
    });

//Delete test by Test _id
	it('Should GET Tests by search of specific Test ID', function() {
    return chai.request(RecruiterUrl)
      .post('/deleteTest')
      .send({id:CreatedTestID})
      .then(function(res) {      	
			expect(res).to.have.status(200);
			expect(res).to.be.json;
		})
    });

    //Retrive question search by deleted test _id
	it('Should GET Empty response when search by Test ID which had deleted', function() {
    return chai.request(RecruiterUrl)
      .get('/getTests'+'?_id='+CreatedTestID)
      .then(function(res) {
			expect(res).to.have.status(200);
			expect(res).to.be.json;
			expect(res.body).to.be.empty;
    	})
  	});
 });