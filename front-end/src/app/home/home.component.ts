import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  recruiter_id: string;
  recruiter_name: string;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.route.params.subscribe( params => this.recruiter_name = params.name);
    this.route.params.subscribe( params => this.recruiter_id = params.id);
    if (!sessionStorage.getItem('RecruiterName')) {
      sessionStorage.setItem('RecruiterId', this.recruiter_id);
      sessionStorage.setItem('RecruiterName', this.recruiter_name);
    }
    history.pushState({}, '', '/dashboard');
  }

  ngOnInit() {
  }
}
