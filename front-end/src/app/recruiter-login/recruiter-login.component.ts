import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-recruiter-login',
  templateUrl: './recruiter-login.component.html',
  styleUrls: ['./recruiter-login.component.css']
})
export class RecruiterLoginComponent implements OnInit {

  userName: string;
  Password: string;

  constructor(private router: Router, private dataService: DataService) { }

  ngOnInit() {
    if (sessionStorage.getItem('RecruiterName')) {
      sessionStorage.removeItem('RecruiterName');
    }
  }

  login() {
    const url = location.host.split(':');
    const domain = url[0];
    window.location.href = 'http://' + domain + ':3000/login';
  }
}
