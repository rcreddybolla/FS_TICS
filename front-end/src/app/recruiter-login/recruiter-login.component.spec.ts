import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruiterLoginComponent } from './recruiter-login.component';

describe('RecruiterLoginComponent', () => {
  let component: RecruiterLoginComponent;
  let fixture: ComponentFixture<RecruiterLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecruiterLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecruiterLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
