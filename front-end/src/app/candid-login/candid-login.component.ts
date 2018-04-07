import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { CandidDataService } from '../services/candid-data.service';
import { Candidate } from '../model/candidate';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ToastOptions } from 'ng2-toastr/src/toast-options';

@Component({
  selector: 'app-candid-login',
  templateUrl: './candid-login.component.html',
  styleUrls: ['./candid-login.component.css']
})
export class CandidLoginComponent implements OnInit {
  complexForm: FormGroup;
  genders = ['Male', 'Female', 'Other'];
  locations = ['Bangalore', 'Hyderabad'];
  selectedGender: string;
  selectedLocation: string;
  dob: Date;
  datee = new Date();
  testID: string;
  recruiter_id = '110';
  newCandidate: Candidate;
  ageMaxLimitDate: any = (new Date().getDate());
  ageMaxLimitMonth: any = (new Date().getMonth() + 1);
  ageMaxLimitYear: any = (new Date().getFullYear() - 18);
  ageMaxLimitYearString: any = (new Date().getFullYear() - 18).toString();

  reg = '(?:19)[0-9]{2}-.*-.*|(?:2' +
  this.ageMaxLimitYearString[1] + ')[' + this.ageMaxLimitYearString[2] + '-' + this.ageMaxLimitYearString[3] +
  ']{2}-.*-.*';

  constructor(private candidData: CandidDataService, private router: Router, fb: FormBuilder,
    public toastr: ToastsManager, vcr: ViewContainerRef, private route: ActivatedRoute) {
    this.route.params.subscribe( params => this.testID = params.id);
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    history.replaceState({}, '', '/welcome');
    this.selectedGender = (<HTMLInputElement>document.getElementById('selectedGender')).value;
    this.selectedLocation = 'Bangalore';
    this.newCandidate = Candidate.CreateDefault();
    if ((this.ageMaxLimitDate) < 10) {
      this.ageMaxLimitDate = '0' + this.ageMaxLimitDate;
    } else if ((this.ageMaxLimitMonth) < 10) {
      this.ageMaxLimitMonth = '0' + this.ageMaxLimitMonth;
    } else if ((this.ageMaxLimitYear) < 10) {
      this.ageMaxLimitYear = '0' + this.ageMaxLimitYear;
    }
    (<HTMLInputElement> document.getElementById('dob')).max =
    this.ageMaxLimitYear + '-' + this.ageMaxLimitMonth + '-' + this.ageMaxLimitDate;
  }

  insertCandidate(welcomeForm) {
    if (welcomeForm.form.valid) {
    // this.newCandidate.dob = this.dob;
    this.newCandidate.pref_loc = this.selectedLocation;
    this.newCandidate.gender = this.selectedGender;
    this.newCandidate.test_id = this.testID;
    this.newCandidate.recruiter_id = this.recruiter_id;
    this.candidData
        .insertNewCandidate(this.newCandidate)
        .subscribe(
         data => {
           this.newCandidate._id = data.id;
           const candidID = this.newCandidate._id;
           const candidName = this.newCandidate.candid_name;
           this.newCandidate = Candidate.CreateDefault();
           this.router.navigate(['instructions/' + candidID + '/' + candidName]);
        });
    } else {
      this.toastr.error('Please fill all details and retry.', 'Invalid Submission');
    }
  }
}
