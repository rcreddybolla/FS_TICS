import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './recnavbar.component.html',
  styleUrls: ['./recnavbar.component.css'],
})
export class RecruiterNavbarComponent implements OnInit {
  recruiterName: string;
  recruiter_id: string;

  constructor() {
  }

  ngOnInit() {
    this.recruiterName = sessionStorage.getItem('RecruiterName');
  }

  logOut() {
    const url = location.host.split(':');
    const domain = url[0];
    window.location.href = 'http://' + domain + ':3000/logout';
  }
}
