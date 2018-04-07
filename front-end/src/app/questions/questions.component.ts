import { Component, OnInit } from '@angular/core';
import { Questions } from '../model/questions';
import { DataService} from '../services/data.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {

  all_ques: Questions[];
  newQues: Questions;
  searchCriteria: string;
  no_of_answers: number;
  answers: string[] = [];
  answer_input = ["a", "B"];

  constructor(private dataService: DataService ) { }

  ngOnInit() {
    history.pushState({}, '', '/questions');
  	this.newQues = Questions.CreateDefault();
  	this.searchCriteria = "";
  	this.no_of_answers = 0;
  	this.getQuestions();
  }
  

   // Delete a question 
  deleteQuestion(question: Questions) {

    this.dataService.deleteQues(question)
    .subscribe(
      data => {
        this.all_ques.splice(this.all_ques.indexOf(question), 1);
        console.log('Question deleted!');
      })
  
  }

  // Display all the questions
  getQuestions() {
    this.dataService.getQuestions(this.searchCriteria, 'fromSimpleTest')
    .subscribe(
      data => {
         this.all_ques = [];
         data.forEach(
           element => {
             const newQues = new Questions(element._id,
                                element.question_name,
                                element.answers,
                                element.correct_answer,
                                element.question_type,
                                element.question_category);
             this.all_ques.push(newQues);
           });
      });
    }

  // Insert a new question
  insertQuestion(){

    if (this.newQues.question_name == '' || this.newQues.question_type == '' || this.newQues.question_category == ''
      || this.newQues.answers == null || this.newQues.correct_answer == '') {
      console.log('Please fill all the details.');
    }

  	// For inserting answer options array
  	for (var i = 0; i < this.answer_input.length; i++) {
  		var elemID = 'options' + i;
  		var newItem = (<HTMLInputElement>document.getElementById(elemID)).value;
  		this.answers.push(newItem);
  		console.log(newItem);
  	}
  	this.newQues.answers = this.answers;
  	this.dataService
    .insertNewQuestion(this.newQues)
    .subscribe(
      data => {
         this.newQues._id = data.id;
         this.all_ques.push(this.newQues);
         this.newQues = Questions.CreateDefault();
         this.answers = ['',''];
         console.log('Added question.');
      }
    )
  }


 


  // For adding answer fields
  addAnswers(){
  	this.answer_input.push('a');
  	console.log(this.answers);
  }

  // For removing answer fields
  removeAnswers(){
  	this.answer_input.pop();
  	console.log(this.answers);
  }


}
