import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidLoginComponent } from './candid-login.component';

describe('CandidLoginComponent', () => {
  let component: CandidLoginComponent;
  let fixture: ComponentFixture<CandidLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
