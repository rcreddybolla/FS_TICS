import { Component, OnInit } from '@angular/core';
import { Test } from '../model/test';
import { DataService} from '../services/data.service';
import { Submissions } from '../model/submissions';
import { Questions } from '../model/questions';
import { Scores } from '../model/scores';
import { Router } from '@angular/router';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})

export class ReviewComponent implements OnInit {
  newTest: Test;
  allTests: Test[];
  ifTest: boolean;
  selectedTest = 'Click to select';
  newScore: Scores;
  allScores: Scores[];

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit() {
    history.pushState({}, '', '/review');
    this.newTest = Test.CreateDefault();
    this.newScore = Scores.CreateDefault();
    this.fetchTestID();
    this.selectedTest = 'Click to select';
  }

  fetchTestID() {
    this.dataService.getTestDetails('', 'viewTests')  // <-- ID of the Test
    .subscribe(
      data => {
          this.allTests = [];
          data.forEach(
           element => {
             const a = new Test(element._id,
                              element.recruiter_id,
                              element.designation,
                              element.question_IDs,
                              element.skills);
             this.newTest = a;
             this.allTests.push(this.newTest);
             this.newTest = Test.CreateDefault();
           });
      });
  }

  getallCandidates(test_id) {
      this.dataService.getScores(test_id)
      .subscribe(
        data => {
           this.allScores = [];
           data.forEach(element => {
             const a = new Scores(element._id,
                               element.candid_id,
                               element.candid_name,
                               element.test_id,
                               element.score);
             this.newScore = a;
             this.allScores.push(this.newScore);
             this.newScore = Scores.CreateDefault();
           });
        });
  }


}
